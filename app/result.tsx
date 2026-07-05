import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DiagnoseResponse, DiagnosisResult, fetchDiagnosis } from '../lib/diagnosisApi';
import { SYMPTOM_CATEGORIES } from '../lib/symptomsData';

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
      .then(setData)
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
        <Text style={styles.topbarText}>{t.title}</Text>
      </View>

      {loading && (
        <View style={styles.centerFill}>
          <ActivityIndicator size="large" color="#2d6a2d" />
          <Text style={styles.loadingText}>{t.loading}</Text>
        </View>
      )}

      {!loading && error && !data && (
        <View style={styles.centerFill}>
          <View style={styles.errorCard}>
            <View style={styles.errorIconWrap}>
              <Text style={styles.errorIcon}>⚠️</Text>
            </View>
            <Text style={styles.errorTitle}>{t.errorTitle}</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={runDiagnosis} activeOpacity={0.8}>
              <Text style={styles.retryBtnText}>{t.retry}</Text>
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
              <Text style={styles.agreeText}>{t.agree}</Text>
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
            <Text style={[styles.adviceTitle, isUrdu && styles.rtl]}>{t.symptomsLabel}</Text>
            <View style={[styles.chips, isUrdu && styles.rowReverse]}>
              {symptomList.map(s => (
                <View key={s} style={styles.chip}>
                  <Text style={styles.chipText}>{symptomLabel(s)}</Text>
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
              <Text style={[styles.vetText, isUrdu && styles.rtl]}>{t.vetMsg}</Text>
            </View>
          )}

          {/* Buttons */}
          <TouchableOpacity
            style={styles.newBtn}
            onPress={() => router.push({ pathname: '/symptoms', params: { lang, name } })}
            activeOpacity={0.8}
          >
            <Text style={styles.newBtnText}>{t.newBtn}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => router.push({ pathname: '/home', params: { lang, name } })}
            activeOpacity={0.8}
          >
            <Text style={styles.homeBtnText}>{t.homeBtn}</Text>
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
        <Text style={[styles.diseaseLabel, { color: accentColor }]}>{label}</Text>
      </View>

      {!result ? (
        <Text style={[styles.cardError, isUrdu && styles.rtl]}>{error || unavailableText}</Text>
      ) : (
        <>
          <Text style={[styles.diseaseName, isUrdu && styles.rtl]}>
            {isUrdu ? result.disease_ur : result.disease_en}
          </Text>
          {isUrdu && <Text style={styles.diseaseEn}>{result.disease_en}</Text>}

          <View style={styles.confidenceRow}>
            <View style={styles.confBar}>
              <View style={[styles.confFill, { width: `${result.confidence}%`, backgroundColor: accentColor }]} />
            </View>
            <View style={[styles.confPill, { backgroundColor: accentColor }]}>
              <Text style={styles.confLabel}>
                {result.confidence}{confSuffix}
              </Text>
            </View>
          </View>

          {(isUrdu ? result.reasoning_ur : result.reasoning_en) && (
            <Text style={[styles.reasoning, isUrdu && styles.rtl]}>
              {isUrdu ? result.reasoning_ur : result.reasoning_en}
            </Text>
          )}

          {result.differential && result.differential.length > 1 && (
            <View style={styles.differentialWrap}>
              {result.differential.slice(1).map(d => (
                <Text key={d.disease_en} style={[styles.differentialText, isUrdu && styles.rtl]}>
                  · {isUrdu ? d.disease_ur : d.disease_en} ({d.confidence.toFixed(0)}%)
                </Text>
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
        <Text style={[styles.adviceTitle, isUrdu && styles.rtl, { marginBottom: 0 }]}>
          {isUrdu ? 'ابتدائی طبی امداد' : 'First Aid'}
        </Text>
      </View>

      {sections.map((s, idx) => (
        <View key={idx} style={idx > 0 ? styles.firstAidSection : undefined}>
          {sections.length > 1 && (
            <Text style={[styles.firstAidSourceLabel, { color: s.color }, isUrdu && styles.rtl]}>
              {s.label}
            </Text>
          )}
          {(isUrdu ? s.result!.first_aid_ur : s.result!.first_aid_en).map((item, i) => (
            <View key={i} style={[styles.adviceItem, isUrdu && styles.adviceItemRtl]}>
              <View style={[styles.dot, { backgroundColor: s.color }]} />
              <Text style={[styles.adviceTextSmall, isUrdu && styles.rtl]}>{item}</Text>
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
  },
  topbarText: { color: 'white', fontSize: 16, fontWeight: '600' },
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
  },
  diseaseEn: { fontSize: 12, color: '#888', marginBottom: 10 },
  confidenceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, marginBottom: 12 },
  confBar: { flex: 1, height: 5, backgroundColor: '#eee', borderRadius: 3, overflow: 'hidden' },
  confFill: { height: '100%', borderRadius: 3 },
  confPill: { borderRadius: 7, paddingVertical: 2, paddingHorizontal: 6 },
  confLabel: { fontSize: 9, fontWeight: '700', color: 'white' },
  reasoning: { fontSize: 12, color: '#666', lineHeight: 17, marginBottom: 10, fontStyle: 'italic' },
  differentialWrap: { marginBottom: 10 },
  differentialText: { fontSize: 11, color: '#999', lineHeight: 16 },

  miniAdviceHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  miniAdviceIcon: { fontSize: 14 },
  miniAdviceTitle: { fontSize: 12, fontWeight: '700', color: '#1b5e20' },
  adviceItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 7, marginBottom: 7 },
  adviceItemRtl: { flexDirection: 'row-reverse' },
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
  firstAidSourceLabel: { fontSize: 11, fontWeight: '700', marginBottom: 8 },

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
  vetText: { flex: 1, fontSize: 12, color: '#e65100', lineHeight: 18 },

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