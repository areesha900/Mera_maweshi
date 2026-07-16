import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UrduText } from '../components/UrduText';
import { getDeviceId } from '../lib/deviceId';
import { DiagnosisRecord, updateDiagnosisStatus } from '../lib/farmerApi';

// Reached only by tapping a record on the History screen. The full record
// is passed in as a JSON param (same pattern symptoms.tsx -> result.tsx
// already uses) rather than re-fetched, since there's no GET-by-id endpoint
// on the backend -- listDiagnoses() only returns the whole list.
//
// NOTE: DiagnosisRecord (see lib/farmerApi.ts) only persists disease name,
// confidence, and the first-aid snapshot for each source -- it does NOT
// store the differential (secondary guesses) or the LLM's reasoning text.
// Those only exist on the live DiagnoseResponse in result.tsx, right after
// a fresh diagnosis. So unlike Result, this screen can't show "also
// considered: X (11%)" or a reasoning paragraph -- that data was never
// saved.

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

const ANIMAL_LABELS: Record<string, { en: string; ur: string; icon: string; color: string }> = {
  Cattle:  { en: 'Cattle',  ur: 'گائے',  icon: '🐄', color: '#ffebee' },
  Buffalo: { en: 'Buffalo', ur: 'بھینس', icon: '🐃', color: '#e8f5e9' },
  Goat:    { en: 'Goat',    ur: 'بکری',  icon: '🐐', color: '#f3e5f5' },
  Sheep:   { en: 'Sheep',   ur: 'بھیڑ',  icon: '🐑', color: '#fff3e0' },
};
const SEX_LABELS: Record<string, { en: string; ur: string }> = {
  Male:   { en: 'Male',   ur: 'نر' },
  Female: { en: 'Female', ur: 'مادہ' },
};
const AGE_LABELS: Record<string, { en: string; ur: string }> = {
  'New Born': { en: 'New Born', ur: 'نوزائیدہ' },
  'Growing':  { en: 'Growing',  ur: 'جوان' },
  'Adult':    { en: 'Adult',    ur: 'بالغ' },
};
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_UR = ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'];
const DAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_UR = ['اتوار', 'سوموار', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];

function formatTime(d: Date, isUrdu: boolean): string {
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const isPM = hours >= 12;
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const minutesStr = String(minutes).padStart(2, '0');
  return isUrdu
    ? `${hours}:${minutesStr} ${isPM ? 'شام' : 'صبح'}`
    : `${hours}:${minutesStr} ${isPM ? 'PM' : 'AM'}`;
}

function formatDate(iso: string, isUrdu: boolean): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const weekday = d.getDay();
  const time = formatTime(d, isUrdu);
  return isUrdu
    ? `${DAYS_UR[weekday]}، ${day} ${MONTHS_UR[month]} ${year} · ${time}`
    : `${DAYS_EN[weekday]}, ${MONTHS_EN[month]} ${day}, ${year} · ${time}`;
}

export default function HistoryDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lang, name, record: recordParam } = useLocalSearchParams<{
    lang: string; name: string; record: string;
  }>();
  const isUrdu = lang === 'ur';

  const initialRecord: DiagnosisRecord = JSON.parse(recordParam);
  const [record, setRecord] = useState<DiagnosisRecord>(initialRecord);
  const [toggling, setToggling] = useState(false);

  const t = {
    title:      isUrdu ? 'تشخیص کی تفصیل'      : 'Diagnosis Details',
    ongoing:    isUrdu ? 'جاری'                : 'Ongoing',
    treated:    isUrdu ? 'ٹھیک'                : 'Treated',
    llmLabel:   isUrdu ? '🤖 اے آئی تشخیص'      : '🤖 AI Diagnosis',
    modelLabel: isUrdu ? '📊 ہمارا ماڈل'        : '📊 Model Diagnosis',
    confidence: isUrdu ? '% یقین'               : '% confidence',
    unavailable: isUrdu ? 'دستیاب نہیں'          : 'unavailable',
    firstAid:   isUrdu ? 'ابتدائی طبی امداد'    : 'First Aid Advice',
    aiSource:   isUrdu ? '🤖 اے آئی'             : '🤖 AI',
    modelSource: isUrdu ? '📊 ماڈل'              : '📊 Model',
    vetMsg:     isUrdu
      ? 'یہ سنگین بیماری ہے — فوری ڈاکٹر سے رابطہ کریں'
      : 'This is serious — contact a vet immediately',
    backBtn:    isUrdu ? 'واپس جائیں'  : 'Back to History',
    statusErrorTitle: isUrdu ? 'خرابی' : 'Could not update',
    statusErrorMsg: isUrdu
      ? 'حالت اپ ڈیٹ نہیں ہو سکی۔ انٹرنیٹ کنکشن چیک کریں اور دوبارہ کوشش کریں۔'
      : 'Could not update the status. Check your connection and try again.',
  };

  const animal = ANIMAL_LABELS[record.animal_type] ?? {
    en: record.animal_type, ur: record.animal_type, icon: '🐾', color: '#eeeeee',
  };
  const sex = SEX_LABELS[record.sex] ?? { en: record.sex, ur: record.sex };
  const age = AGE_LABELS[record.age_range] ?? { en: record.age_range, ur: record.age_range };

  // Same optimistic-update-with-revert pattern as the toggle on the History
  // list -- feels instant, and rolls back if the save fails.
  const toggleStatus = async () => {
    if (toggling) return;
    const prevStatus = record.status;
    const nextStatus = prevStatus === 'treated' ? 'ongoing' : 'treated';

    setToggling(true);
    setRecord(r => ({ ...r, status: nextStatus }));

    try {
      const deviceId = await getDeviceId();
      await updateDiagnosisStatus(record.id, deviceId, nextStatus);
    } catch {
      setRecord(r => ({ ...r, status: prevStatus }));
      Alert.alert(t.statusErrorTitle, t.statusErrorMsg);
    } finally {
      setToggling(false);
    }
  };

  const goBack = () => router.push({ pathname: '/history', params: { lang, name } });

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity
          style={[styles.backArrowBtn, isUrdu ? styles.backArrowBtnRight : styles.backArrowBtnLeft]}
          onPress={goBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrowText}>{isUrdu ? '›' : '‹'}</Text>
        </TouchableOpacity>
        <UrduText isUrdu={isUrdu} style={styles.topbarText} numberOfLines={1} adjustsFontSizeToFit>
          {t.title}
        </UrduText>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        {/* Status toggle + summary, at the very top */}
        <View style={[styles.summary, isUrdu && styles.rowReverse]}>
          <View style={[styles.iconWrap, { backgroundColor: animal.color }]}>
            <Text style={styles.icon}>{animal.icon}</Text>
          </View>
          <View style={[styles.summaryMeta, isUrdu && styles.rtlAlign]}>
            <UrduText isUrdu={isUrdu} style={[styles.summaryAnimal, isUrdu && styles.rtl]}>
              {isUrdu ? animal.ur : animal.en} · {isUrdu ? sex.ur : sex.en} · {isUrdu ? age.ur : age.en}
            </UrduText>
            <UrduText isUrdu={isUrdu} style={[styles.summaryDate, isUrdu && styles.rtl]}>
              {formatDate(record.created_at, isUrdu)}
            </UrduText>
          </View>
          <TouchableOpacity
            style={[styles.badge, record.status === 'treated' ? styles.badgeTreated : styles.badgeOngoing]}
            onPress={toggleStatus}
            disabled={toggling}
            activeOpacity={0.7}
          >
            <UrduText isUrdu={isUrdu} style={[styles.badgeText, record.status === 'treated' ? styles.badgeTreatedText : styles.badgeOngoingText]}>
              {record.status === 'treated' ? t.treated : t.ongoing}
            </UrduText>
          </TouchableOpacity>
        </View>

        {/* AI diagnosis */}
        <DiagnosisCard
          label={t.llmLabel}
          diseaseEn={record.llm_disease_en}
          diseaseUr={record.llm_disease_ur}
          confidence={record.llm_confidence}
          isUrdu={isUrdu}
          confSuffix={t.confidence}
          unavailableText={t.unavailable}
          accentColor="#1565c0"
        />

        {/* Model diagnosis */}
        <DiagnosisCard
          label={t.modelLabel}
          diseaseEn={record.model_disease_en}
          diseaseUr={record.model_disease_ur}
          confidence={record.model_confidence}
          isUrdu={isUrdu}
          confSuffix={t.confidence}
          unavailableText={t.unavailable}
          accentColor="#e53935"
        />

        {/* First aid */}
        <FirstAidCard
          snapshot={record.first_aid_snapshot}
          isUrdu={isUrdu}
          title={t.firstAid}
          aiLabel={t.aiSource}
          modelLabel={t.modelSource}
        />

        {/* Serious warning -- last thing before the back button, not first */}
        {record.serious && (
          <View style={[styles.vetBanner, isUrdu && styles.rowReverse]}>
            <Text style={styles.vetIcon}>🏥</Text>
            <UrduText isUrdu={isUrdu} style={[styles.vetText, isUrdu && styles.rtl]}>{t.vetMsg}</UrduText>
          </View>
        )}

        <TouchableOpacity style={styles.backBtn} onPress={goBack} activeOpacity={0.8}>
          <UrduText isUrdu={isUrdu} style={styles.backBtnText} numberOfLines={1} adjustsFontSizeToFit>
            {t.backBtn}
          </UrduText>
        </TouchableOpacity>

        <View style={{ height: 20 + insets.bottom }} />
      </ScrollView>
    </View>
  );
}

function DiagnosisCard({
  label, diseaseEn, diseaseUr, confidence, isUrdu, confSuffix, unavailableText, accentColor,
}: {
  label: string;
  diseaseEn?: string | null;
  diseaseUr?: string | null;
  confidence?: number | null;
  isUrdu: boolean;
  confSuffix: string;
  unavailableText: string;
  accentColor: string;
}) {
  const hasResult = Boolean(diseaseEn);
  return (
    <View style={[styles.diseaseCard, { borderLeftColor: accentColor }]}>
      <View style={[styles.cardLabelBadge, isUrdu && styles.alignEnd, { backgroundColor: accentColor + '18' }]}>
        <UrduText isUrdu={isUrdu} style={[styles.diseaseLabel, { color: accentColor }]}>{label}</UrduText>
      </View>

      {!hasResult ? (
        <UrduText isUrdu={isUrdu} style={[styles.cardError, isUrdu && styles.rtl]}>{unavailableText}</UrduText>
      ) : (
        <>
          <UrduText isUrdu={isUrdu} style={[styles.diseaseName, isUrdu && styles.rtl]}>
            {wrapLongTokens(isUrdu ? (diseaseUr ?? diseaseEn) : diseaseEn)}
          </UrduText>
          {isUrdu && <Text style={styles.diseaseEn}>{wrapLongTokens(diseaseEn)}</Text>}

          {typeof confidence === 'number' && (
            <View style={styles.confidenceRow}>
              <View style={styles.confBar}>
                <View style={[styles.confFill, { width: `${confidence}%`, backgroundColor: accentColor }]} />
              </View>
              <View style={[styles.confPill, { backgroundColor: accentColor }]}>
                <UrduText isUrdu={isUrdu} style={styles.confLabel}>
                  {confidence}{confSuffix}
                </UrduText>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
}

function FirstAidCard({
  snapshot, isUrdu, title, aiLabel, modelLabel,
}: {
  snapshot: DiagnosisRecord['first_aid_snapshot'];
  isUrdu: boolean;
  title: string;
  aiLabel: string;
  modelLabel: string;
}) {
  const sections = [
    { items: snapshot?.llm, color: '#1565c0', label: aiLabel },
    { items: snapshot?.model, color: '#e53935', label: modelLabel },
  ].filter(s => s.items);

  if (sections.length === 0) return null;

  return (
    <View style={styles.adviceCard}>
      <View style={[styles.miniAdviceHeader, isUrdu && styles.rowReverse]}>
        <Text style={styles.miniAdviceIcon}>🩺</Text>
        <UrduText isUrdu={isUrdu} style={[styles.adviceTitle, isUrdu && styles.rtl, { marginBottom: 0 }]}>
          {title}
        </UrduText>
      </View>

      {sections.map((s, idx) => (
        <View key={idx} style={idx > 0 ? styles.firstAidSection : undefined}>
          {sections.length > 1 && (
            <UrduText isUrdu={isUrdu} style={[styles.firstAidSourceLabel, { color: s.color }, isUrdu && styles.rtl]}>
              {s.label}
            </UrduText>
          )}
          {(isUrdu ? s.items!.ur : s.items!.en).map((item, i) => (
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
  rtlAlign: { alignItems: 'flex-end' },
  rowReverse: { flexDirection: 'row-reverse' },
  alignEnd: { alignSelf: 'flex-end' },

  summary: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  iconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  icon: { fontSize: 22 },
  summaryMeta: { flex: 1 },
  summaryAnimal: { fontSize: 12, color: '#558b2f', fontWeight: '600' },
  summaryDate: { fontSize: 10.5, color: '#888', marginTop: 2 },

  badge: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 7, flexShrink: 0 },
  badgeTreated: { backgroundColor: '#e8f5e9' },
  badgeOngoing: { backgroundColor: '#fff3e0' },
  badgeText: { fontSize: 11, fontWeight: '700' },
  badgeTreatedText: { color: '#2d6a2d' },
  badgeOngoingText: { color: '#e65100' },

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
  cardLabelBadge: { alignSelf: 'flex-start', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8, marginBottom: 10 },
  diseaseLabel: { fontSize: 11, fontWeight: '700' },
  cardError: { fontSize: 12, color: '#999', fontStyle: 'italic' },
  diseaseName: { fontSize: 18, fontWeight: '700', color: '#1b1b1b', marginBottom: 4, flexShrink: 1 },
  diseaseEn: { fontSize: 12, color: '#888', marginBottom: 10, flexShrink: 1 },
  confidenceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  confBar: { flex: 1, height: 5, backgroundColor: '#eee', borderRadius: 3, overflow: 'hidden' },
  confFill: { height: '100%', borderRadius: 3 },
  confPill: { borderRadius: 7, paddingVertical: 2, paddingHorizontal: 6 },
  confLabel: { fontSize: 9, fontWeight: '700', color: 'white' },

  miniAdviceHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  miniAdviceIcon: { fontSize: 14 },
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

  backBtn: { backgroundColor: '#2d6a2d', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 4 },
  backBtnText: { color: 'white', fontSize: 14, fontWeight: '600' },
});
