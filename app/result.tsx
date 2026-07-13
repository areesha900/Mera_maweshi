import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UrduText } from '../components/UrduText';
import { getDeviceId } from '../lib/deviceId';
import { DiagnoseResponse, DiagnosisResult, fetchDiagnosis } from '../lib/diagnosisApi';
import { saveDiagnosis, upsertFarmer } from '../lib/farmerApi';
import { getLocalProfile } from '../lib/profile';
import { SYMPTOM_CATEGORIES } from '../lib/symptomsData';

// Backend/LLM text can occasionally glue scripts together with no space
// (e.g. a stray run of Cyrillic/Devanagari fused to Urdu). RN's <Text> can't
// break mid-word, so one long unbroken run can force a card wider than its
// container. This inserts an invisible zero-width space every `maxRun`
// characters inside any "word" longer than that, so it always has a place
// to wrap -- it doesn't change what's displayed, only where it can break.
//
// IMPORTANT: this must never insert a break inside an Arabic/Urdu cursive
// run. Arabic letters are shaped based on their neighbours (initial/medial/
// final/isolated forms), and a zero-width space is a non-joining character --
// it forces the letters on either side of it into isolated/final forms even
// though nothing actually wraps there. That's what caused Urdu text (first
// aid steps, disease names, reasoning) to render as disconnected letters
// instead of proper joined Nastaliq script. So we only chunk runs made of
// non-Arabic characters and leave any Arabic-script run completely untouched,
// no matter how long it is -- Urdu words don't need this fix in the first
// place since RN wraps fine at real spaces.
const ARABIC_SCRIPT_CHARS =
  '\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF\\u200C\\u200D';
const NON_ARABIC_RUN = new RegExp(`[^${ARABIC_SCRIPT_CHARS}]+`, 'g');

function wrapLongTokens(text?: string | null, maxRun = 18): string {
  if (!text) return text ?? '';
  return text
    .split(' ')
    .map(word => {
      if (word.length <= maxRun) return word;
      return word.replace(NON_ARABIC_RUN, run =>
        run.length > maxRun
          ? run.replace(new RegExp(`(.{${maxRun}})`, 'g'), '$1\u200B')
          : run
      );
    })
    .join(' ');
}

export default function ResultScreen() {
  const router = useRouter();
  const { lang, name, animal, sex, age, symptoms } = useLocalSearchParams<{
    lang: string; name: string; animal: string; sex: string; age: string; symptoms: string;
  }>();
  const isUrdu = lang === 'ur';

  const symptomList: string[] = symptoms ? JSON.parse(symptoms) : [];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DiagnoseResponse | null>(null);

  const runDiagnosis = () => {
    setLoading(true);
    setError(null);
    fetchDiagnosis({
      animal: animal ?? 'Cattle',
      sex: sex ?? 'Male',
      age: age ?? 'Adult',
      symptoms: symptomList,
      lang,
    })
      .then(result => {
        setData(result);
        // Best-effort save to history -- a farmer's diagnosis is already
        // shown on screen at this point regardless of whether this save
        // succeeds, so a flaky connection here shouldn't block or retry
        // against the UI; it just means this one diagnosis won't show up
        // in History later.
        getDeviceId().then(async deviceId => {
          const payload = {
            device_id: deviceId,
            animal_type: animal ?? 'Cattle',
            sex: sex ?? 'Male',
            age_range: age ?? 'Adult',
            symptoms: symptomList,
            llm: result.llm,
            model: result.model,
          };
          try {
            await saveDiagnosis(payload);
          } catch (err: any) {
            // The backend rejects saves when it has no farmer profile for
            // this device_id -- this can happen even on an already-
            // registered device if the backend's database was ever reset
            // (e.g. a redeploy that fell back to ephemeral storage), since
            // the phone's local "am I registered" cache survives that but
            // the server-side record doesn't. Self-heal once: re-send the
            // farmer profile we still have cached locally, then retry the
            // save. If we have no local profile either, there's nothing to
            // recover from and we just log, same as before.
            const isUnknownDeviceId = String(err?.message ?? '').includes('Unknown device_id');
            if (!isUnknownDeviceId) {
              console.warn('Could not save diagnosis to history:', err);
              return;
            }
            try {
              const cachedProfile = await getLocalProfile();
              if (!cachedProfile) throw err;
              await upsertFarmer({ device_id: deviceId, ...cachedProfile });
              await saveDiagnosis(payload);
            } catch (recoverErr) {
              console.warn('Could not save diagnosis to history (recovery failed):', recoverErr);
            }
          }
        });
      })
      .catch(err => setError(err.message ?? String(err)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    runDiagnosis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symptoms, animal, sex, age]);

  const t = {
    title:      isUrdu ? 'تشخیص کا نتیجہ'    : 'Diagnosis Result',
    loading:    isUrdu ? 'تشخیص ہو رہی ہے...' : 'Diagnosing...',
    errorTitle: isUrdu ? 'خرابی'              : 'Something went wrong',
    retry:      isUrdu ? 'دوبارہ کوشش کریں'   : 'Retry',
    llmLabel:   isUrdu ? '🤖 اے آئی تشخیص'    : '🤖 AI Diagnosis (LLM)',
    modelLabel: isUrdu ? '📊 ہمارا ماڈل'       : '📊 Our Trained Model',
    confidence: isUrdu ? '% یقین'             : '% confidence',
    vetMsg:     isUrdu
      ? 'یہ سنگین بیماری ہے — فوری ڈاکٹر سے رابطہ کریں'
      : 'This is serious — contact a vet immediately',
    newBtn:        isUrdu ? 'نئی تشخیص کریں' : 'New Diagnosis',
    homeBtn:       isUrdu ? 'ہوم'             : 'Home',
    symptomsLabel: isUrdu ? 'منتخب علامات'   : 'Selected Symptoms',
    agree:         isUrdu ? '✓ دونوں طریقے متفق ہیں' : '✓ Both methods agree',
    unavailable:   isUrdu ? 'دستیاب نہیں'     : 'unavailable',
  };

  const symptomLabel = (s: string) => {
    for (const cat of SYMPTOM_CATEGORIES) {
      const found = cat.symptoms.find(sym => sym.key === s);
      if (found) return isUrdu ? found.ur : found.en;
    }
    return s.replace(/_/g, ' ');
  };

  const bothAgree =
    data?.llm && data?.model && data.llm.disease_en === data.model.disease_en;
  const anySerious = Boolean(data?.llm?.serious || data?.model?.serious);

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity
          style={[styles.backArrowBtn, isUrdu ? styles.backArrowBtnRight : styles.backArrowBtnLeft]}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrowText}>{isUrdu ? '›' : '‹'}</Text>
        </TouchableOpacity>
        <UrduText
          isUrdu={isUrdu}
          style={styles.topbarText}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {t.title}
        </UrduText>
      </View>

      {loading && (
        <View style={styles.centerFill}>
          <ActivityIndicator size="large" color="#2d6a2d" />
          <UrduText isUrdu={isUrdu} style={styles.loadingText}>{t.loading}</UrduText>
        </View>
      )}

      {!loading && error && !data && (
        <View style={styles.centerFill}>
          <View style={styles.errorCard}>
            <View style={styles.errorIconWrap}>
              <Text style={styles.errorIcon}>⚠️</Text>
            </View>
            <UrduText isUrdu={isUrdu} style={styles.errorTitle}>{t.errorTitle}</UrduText>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={runDiagnosis} activeOpacity={0.8}>
              <UrduText isUrdu={isUrdu} style={styles.retryBtnText}>{t.retry}</UrduText>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!loading && data && (
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

          {bothAgree && (
            <View style={styles.agreeBanner}>
              <View style={styles.agreeIconWrap}>
                <Text style={styles.agreeIcon}>✓</Text>
              </View>
              <UrduText isUrdu={isUrdu} style={styles.agreeText}>{t.agree}</UrduText>
            </View>
          )}

          {/* Diagnosis cards */}
          <DiagnosisCard
            label={t.llmLabel}
            result={data.llm}
            error={data.llm_error}
            isUrdu={isUrdu}
            confSuffix={t.confidence}
            unavailableText={t.unavailable}
            accentColor="#1565c0"
          />
          <DiagnosisCard
            label={t.modelLabel}
            result={data.model}
            error={data.model_error}
            isUrdu={isUrdu}
            confSuffix={t.confidence}
            unavailableText={t.unavailable}
            accentColor="#e53935"
          />

          {/* Selected symptoms */}
          <View style={styles.adviceCard}>
            <UrduText isUrdu={isUrdu} style={[styles.adviceTitle, isUrdu && styles.rtl]}>{t.symptomsLabel}</UrduText>
            <View style={[styles.chips, isUrdu && styles.rowReverse]}>
              {symptomList.map(s => (
                <View key={s} style={styles.chip}>
                  <UrduText isUrdu={isUrdu} style={styles.chipText}>{symptomLabel(s)}</UrduText>
                </View>
              ))}
            </View>
          </View>

          {/* First Aid */}
          <FirstAidCard llm={data.llm} model={data.model} isUrdu={isUrdu} />

          {/* Vet warning */}
          {anySerious && (
            <View style={[styles.vetBanner, isUrdu && styles.rowReverse]}>
              <Text style={styles.vetIcon}>🏥</Text>
              <UrduText isUrdu={isUrdu} style={[styles.vetText, isUrdu && styles.rtl]}>{t.vetMsg}</UrduText>
            </View>
          )}

          {/* Buttons */}
          <TouchableOpacity
            style={styles.newBtn}
            onPress={() => router.push({ pathname: '/symptoms', params: { lang, name } })}
            activeOpacity={0.8}
          >
            <UrduText
              isUrdu={isUrdu}
              style={styles.newBtnText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {t.newBtn}
            </UrduText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => router.push({ pathname: '/home', params: { lang, name } })}
            activeOpacity={0.8}
          >
            <UrduText
              isUrdu={isUrdu}
              style={styles.homeBtnText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {t.homeBtn}
            </UrduText>
          </TouchableOpacity>

          <View style={{ height: 60 }} />
        </ScrollView>
      )}
    </View>
  );
}

function DiagnosisCard({
  label, result, error, isUrdu, confSuffix, unavailableText, accentColor,
}: {
  label: string;
  result: DiagnosisResult | null | undefined;
  error?: string | null;
  isUrdu: boolean;
  confSuffix: string;
  unavailableText: string;
  accentColor: string;
}) {
  return (
    <View style={[styles.diseaseCard, { borderLeftColor: accentColor }]}>
      <View style={[styles.cardLabelBadge, isUrdu && styles.alignEnd, { backgroundColor: accentColor + '18' }]}>
        <UrduText isUrdu={isUrdu} style={[styles.diseaseLabel, { color: accentColor }]}>{label}</UrduText>
      </View>

      {!result ? (
        <UrduText isUrdu={isUrdu} style={[styles.cardError, isUrdu && styles.rtl]}>{error || unavailableText}</UrduText>
      ) : (
        <>
          <UrduText isUrdu={isUrdu} style={[styles.diseaseName, isUrdu && styles.rtl]}>
            {wrapLongTokens(isUrdu ? result.disease_ur : result.disease_en)}
          </UrduText>
          {isUrdu && <Text style={styles.diseaseEn}>{wrapLongTokens(result.disease_en)}</Text>}

          <View style={styles.confidenceRow}>
            <View style={styles.confBar}>
              <View style={[styles.confFill, { width: `${result.confidence}%`, backgroundColor: accentColor }]} />
            </View>
            <View style={[styles.confPill, { backgroundColor: accentColor }]}>
              <UrduText isUrdu={isUrdu} style={styles.confLabel}>
                {result.confidence}{confSuffix}
              </UrduText>
            </View>
          </View>

          {(isUrdu ? result.reasoning_ur : result.reasoning_en) && (
            <UrduText isUrdu={isUrdu} style={[styles.reasoning, isUrdu && styles.rtl]}>
              {wrapLongTokens(isUrdu ? result.reasoning_ur : result.reasoning_en)}
            </UrduText>
          )}

          {result.differential && result.differential.length > 1 && (
            <View style={styles.differentialWrap}>
              {result.differential.slice(1).map(d => (
                <UrduText key={d.disease_en} isUrdu={isUrdu} style={[styles.differentialText, isUrdu && styles.rtl]}>
                  · {wrapLongTokens(isUrdu ? d.disease_ur : d.disease_en)} ({d.confidence.toFixed(0)}%)
                </UrduText>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

function FirstAidCard({
  llm, model, isUrdu,
}: {
  llm: DiagnosisResult | null | undefined;
  model: DiagnosisResult | null | undefined;
  isUrdu: boolean;
}) {
  const sections = [
    { result: llm, color: '#1565c0', label: isUrdu ? '🤖 اے آئی' : '🤖 AI' },
    { result: model, color: '#e53935', label: isUrdu ? '📊 ماڈل' : '📊 Model' },
  ].filter(s => s.result);

  if (sections.length === 0) return null;

  return (
    <View style={styles.adviceCard}>
      <View style={[styles.miniAdviceHeader, isUrdu && styles.rowReverse]}>
        <Text style={styles.miniAdviceIcon}>🩺</Text>
        <UrduText isUrdu={isUrdu} style={[styles.adviceTitle, isUrdu && styles.rtl, { marginBottom: 0 }]}>
          {isUrdu ? 'ابتدائی طبی امداد' : 'First Aid'}
        </UrduText>
      </View>

      {sections.map((s, idx) => (
        <View key={idx} style={idx > 0 ? styles.firstAidSection : undefined}>
          {sections.length > 1 && (
            <UrduText isUrdu={isUrdu} style={[styles.firstAidSourceLabel, { color: s.color }, isUrdu && styles.rtl]}>
              {s.label}
            </UrduText>
          )}
          {(isUrdu ? s.result!.first_aid_ur : s.result!.first_aid_en).map((item, i) => (
            <View key={i} style={[styles.adviceItem, isUrdu && styles.adviceItemRtl]}>
              <View style={[styles.dot, { backgroundColor: s.color }]} />
              <UrduText isUrdu={isUrdu} style={[styles.adviceTextSmall, isUrdu && styles.rtl]}>{wrapLongTokens(item)}</UrduText>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9f4' },
  topbar: {
    backgroundColor: '#1b5e20',
    paddingTop: 56,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    position: 'relative',
  },
  backArrowBtn: {
    position: 'absolute',
    bottom: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowBtnLeft:  { left: 12 },
  backArrowBtnRight: { right: 12 },
  backArrowText: { color: 'white', fontSize: 24, fontWeight: '700' },
  topbarText: { color: 'white', fontSize: 14, fontWeight: '600' },
  body: { flex: 1, padding: 12 },
  rtl: { textAlign: 'right' },

  centerFill: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  loadingText: { color: '#2d6a2d', fontSize: 13, fontWeight: '600' },

  errorCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  errorIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffebee',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  errorIcon: { fontSize: 28 },
  errorTitle: { fontSize: 17, fontWeight: '700', color: '#c62828', marginBottom: 8 },
  errorText: { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 19, marginBottom: 20 },
  retryBtn: { backgroundColor: '#2d6a2d', borderRadius: 12, paddingVertical: 13, paddingHorizontal: 32, width: '100%', alignItems: 'center' },
  retryBtnText: { color: 'white', fontWeight: '600', fontSize: 14 },

  agreeBanner: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  agreeIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#1b5e20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agreeIcon: { color: 'white', fontSize: 14, fontWeight: '700' },
  agreeText: { flex: 1, color: '#1b5e20', fontSize: 12, fontWeight: '700' },

  diseaseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    width: '100%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardLabelBadge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  diseaseLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardError: { fontSize: 12, color: '#999', fontStyle: 'italic' },
  diseaseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1b1b1b',
    marginBottom: 4,
    flexShrink: 1,
  },
  diseaseEn: { fontSize: 12, color: '#888', marginBottom: 10, flexShrink: 1 },
  confidenceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, marginBottom: 12 },
  confBar: { flex: 1, height: 5, backgroundColor: '#eee', borderRadius: 3, overflow: 'hidden' },
  confFill: { height: '100%', borderRadius: 3 },
  confPill: { borderRadius: 7, paddingVertical: 2, paddingHorizontal: 6 },
  confLabel: { fontSize: 9, fontWeight: '700', color: 'white' },
  reasoning: { fontSize: 12, color: '#666', lineHeight: 17, marginBottom: 10, fontStyle: 'italic', flexShrink: 1 },
  differentialWrap: { marginBottom: 10 },
  differentialText: { fontSize: 11, color: '#999', lineHeight: 16, flexShrink: 1 },

  miniAdviceHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  miniAdviceIcon: { fontSize: 14 },
  miniAdviceTitle: { fontSize: 12, fontWeight: '700', color: '#1b5e20' },
  adviceItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 7, marginBottom: 7 },
  adviceItemRtl: { flexDirection: 'row-reverse', marginBottom: 14 },
  dot: { width: 5, height: 5, borderRadius: 2.5, marginTop: 6, flexShrink: 0 },
  adviceTextSmall: { flex: 1, fontSize: 12, color: '#444', lineHeight: 17 },

  adviceCard: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  adviceTitle: { fontSize: 13, fontWeight: '700', color: '#1b5e20', marginBottom: 12 },
  firstAidSection: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  firstAidSourceLabel: { fontSize: 12, fontWeight: '700', marginBottom: 8 },

  chips: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' },
  chip: {
    backgroundColor: '#e8f5e9',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
    flexShrink: 0,
  },
  chipText: { fontSize: 10, color: '#2d6a2d', fontWeight: '600' },
  rowReverse: { flexDirection: 'row-reverse' },

  vetBanner: {
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  vetIcon: { fontSize: 22 },
  vetText: { flex: 1, fontSize: 12, color: '#e65100', lineHeight: 20 },

  newBtn: {
    backgroundColor: '#2d6a2d',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  newBtnText: { color: 'white', fontSize: 14, fontWeight: '600' },
  homeBtn: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#2d6a2d',
  },
  homeBtnText: { color: '#2d6a2d', fontSize: 14, fontWeight: '600' },
  alignEnd: { alignSelf: 'flex-end' },
});