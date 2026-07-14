import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UrduText } from '../components/UrduText';
import { getDeviceId } from '../lib/deviceId';
import { DiagnosisRecord, listDiagnoses, updateDiagnosisStatus } from '../lib/farmerApi';

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
const DAYS_UR = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];
const URDU_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

function toUrduDigits(n: number): string {
  return String(n).replace(/[0-9]/g, d => URDU_DIGITS[Number(d)]);
}

function formatTime(d: Date, isUrdu: boolean): string {
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const isPM = hours >= 12;
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const minutesStr = String(minutes).padStart(2, '0');
  return isUrdu
    ? `${toUrduDigits(hours)}:${toUrduDigits(Number(minutesStr))} ${isPM ? 'شام' : 'صبح'}`
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
    ? `${DAYS_UR[weekday]}، ${toUrduDigits(day)} ${MONTHS_UR[month]} ${toUrduDigits(year)} · ${time}`
    : `${DAYS_EN[weekday]}, ${MONTHS_EN[month]} ${day}, ${year} · ${time}`;
}

// Prefer the model's disease pick since it's grounded in real case data;
// fall back to the LLM's if the model path failed for that record.
function primaryDisease(item: DiagnosisRecord): { en: string; ur: string } | null {
  if (item.model_disease_en) return { en: item.model_disease_en, ur: item.model_disease_ur ?? item.model_disease_en };
  if (item.llm_disease_en) return { en: item.llm_disease_en, ur: item.llm_disease_ur ?? item.llm_disease_en };
  return null;
}

export default function HistoryScreen() {
  const router = useRouter();
  const { lang, name } = useLocalSearchParams<{ lang: string; name: string }>();
  const isUrdu = lang === 'ur';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<DiagnosisRecord[]>([]);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const t = {
    title:   isUrdu ? 'پرانی تشخیص' : 'Diagnosis History',
    ongoing: isUrdu ? 'جاری'        : 'Ongoing',
    treated: isUrdu ? 'ٹھیک'        : 'Treated',
    empty:   isUrdu ? 'ابھی کوئی ریکارڈ نہیں' : 'No records yet',
    errorTitle: isUrdu ? 'خرابی' : 'Something went wrong',
    retry:   isUrdu ? 'دوبارہ کوشش کریں' : 'Retry',
    statusErrorTitle: isUrdu ? 'خرابی' : 'Could not update',
    statusErrorMsg: isUrdu
      ? 'حالت اپ ڈیٹ نہیں ہو سکی۔ انٹرنیٹ کنکشن چیک کریں اور دوبارہ کوشش کریں۔'
      : 'Could not update the status. Check your connection and try again.',
  };

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    getDeviceId()
      .then(id => {
        setDeviceId(id);
        return listDiagnoses(id);
      })
      .then(data => setRecords(data))
      .catch(err => setError(err.message ?? String(err)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Farmer taps the status badge to flip it themselves -- ongoing <-> treated.
  // Updates optimistically so it feels instant, and reverts if the save fails.
  const toggleStatus = (item: DiagnosisRecord) => {
    if (!deviceId || togglingId !== null) return;
    const nextStatus = item.status === 'treated' ? 'ongoing' : 'treated';

    setTogglingId(item.id);
    setRecords(prev => prev.map(r => (r.id === item.id ? { ...r, status: nextStatus } : r)));

    updateDiagnosisStatus(item.id, deviceId, nextStatus)
      .catch(() => {
        // Revert on failure and let the farmer know, rather than silently
        // showing a status that never actually got saved.
        setRecords(prev => prev.map(r => (r.id === item.id ? { ...r, status: item.status } : r)));
        Alert.alert(t.statusErrorTitle, t.statusErrorMsg);
      })
      .finally(() => setTogglingId(null));
  };

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
        </View>
      )}

      {!loading && error && (
        <View style={styles.centerFill}>
          <View style={styles.errorCard}>
            <UrduText isUrdu={isUrdu} style={styles.errorTitle}>{t.errorTitle}</UrduText>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={load} activeOpacity={0.8}>
              <UrduText isUrdu={isUrdu} style={styles.retryBtnText}>{t.retry}</UrduText>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!loading && !error && (
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          {records.length === 0 && (
            <View style={styles.emptyWrap}>
              <UrduText isUrdu={isUrdu} style={styles.emptyText}>{t.empty}</UrduText>
            </View>
          )}

          {records.map(item => {
            const animal = ANIMAL_LABELS[item.animal_type] ?? {
              en: item.animal_type, ur: item.animal_type, icon: '🐾', color: '#eeeeee',
            };
            const sex = SEX_LABELS[item.sex] ?? { en: item.sex, ur: item.sex };
            const age = AGE_LABELS[item.age_range] ?? { en: item.age_range, ur: item.age_range };
            const disease = primaryDisease(item);

            return (
              <View key={item.id} style={[styles.item, isUrdu && styles.itemReversed]}>
                <View style={[styles.iconWrap, { backgroundColor: animal.color }]}>
                  <Text style={styles.icon}>{animal.icon}</Text>
                </View>
                <View style={styles.info}>
                  <UrduText isUrdu={isUrdu} style={[styles.disease, isUrdu && styles.rtl]}>
                    {disease ? (isUrdu ? disease.ur : disease.en) : (isUrdu ? 'نامعلوم' : 'Unknown')}
                  </UrduText>
                  <UrduText isUrdu={isUrdu} style={[styles.animal, isUrdu && styles.rtl]}>
                    {isUrdu ? animal.ur : animal.en} · {isUrdu ? sex.ur : sex.en} · {isUrdu ? age.ur : age.en}
                  </UrduText>
                  <UrduText isUrdu={isUrdu} style={[styles.date, isUrdu && styles.rtl]}>
                    {formatDate(item.created_at, isUrdu)}
                  </UrduText>
                </View>
                <TouchableOpacity
                  style={[styles.badge, item.status === 'treated' ? styles.badgeTreated : styles.badgeOngoing]}
                  onPress={() => toggleStatus(item)}
                  disabled={togglingId === item.id}
                  activeOpacity={0.7}
                >
                  <UrduText isUrdu={isUrdu} style={[styles.badgeText, item.status === 'treated' ? styles.badgeTreatedText : styles.badgeOngoingText]}>
                    {item.status === 'treated' ? t.treated : t.ongoing}
                  </UrduText>
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={{ height: 30 }} />
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.push({ pathname: '/home', params: { lang, name } })}
      >
        <UrduText
          isUrdu={isUrdu}
          style={styles.backBtnText}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {isUrdu ? 'واپس جائیں' : 'Go Back'}
        </UrduText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9f4' },
  topbar: {
    backgroundColor: '#1b5e20',
    paddingTop: 56,
    paddingBottom: 16,
    alignItems: 'center',
    position: 'relative',
  },
  backArrowBtn: {
    position: 'absolute',
    bottom: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowBtnLeft:  { left: 12 },
  backArrowBtnRight: { right: 12 },
  backArrowText: { color: 'white', fontSize: 24, fontWeight: '700' },
  topbarText: { color: 'white', fontSize: 16, fontWeight: '600' },
  body: { padding: 14 },
  rtl: { textAlign: 'right' },

  centerFill: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },

  errorCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  errorTitle: { fontSize: 17, fontWeight: '700', color: '#c62828', marginBottom: 8 },
  errorText: { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 19, marginBottom: 20 },
  retryBtn: { backgroundColor: '#2d6a2d', borderRadius: 12, paddingVertical: 13, paddingHorizontal: 32, width: '100%', alignItems: 'center' },
  retryBtnText: { color: 'white', fontWeight: '600', fontSize: 14 },

  emptyWrap: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 13, color: '#888' },

  item: {
    backgroundColor: 'white',
    borderRadius: 12,
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
  itemReversed: { flexDirection: 'row-reverse' },
  iconWrap: {
    width: 44, height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: { fontSize: 22 },
  info: { flex: 1 },
  disease: { fontSize: 13, fontWeight: '700', color: '#222' },
  animal: { fontSize: 11, color: '#558b2f', marginTop: 2 },
  date: { fontSize: 10, color: '#888', marginTop: 2 },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    flexShrink: 0,
  },
  badgeTreated: { backgroundColor: '#e8f5e9' },
  badgeOngoing: { backgroundColor: '#fff3e0' },
  badgeText: { fontSize: 10, fontWeight: '700' },
  badgeTreatedText: { color: '#2d6a2d' },
  badgeOngoingText: { color: '#e65100' },

  backBtn: {
    marginHorizontal: 14,
    marginTop: 14,
    marginBottom: 35,
    backgroundColor: '#2d6a2d',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  backBtnText: { color: 'white', fontSize: 14, fontWeight: '600' },
});