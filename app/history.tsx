import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UrduText } from '../components/UrduText';

const AGE_LABELS: Record<string, { en: string; ur: string }> = {
  'New Born': { en: 'New Born', ur: 'نوزائیدہ' },
  'Growing':  { en: 'Growing',  ur: 'جوان' },
  'Adult':    { en: 'Adult',    ur: 'بالغ' },
};

const HISTORY = [
  { id: 1, disease_en: 'Lumpy Skin Disease', disease_ur: 'گانٹھ دار جلد کی بیماری', animal: 'Cattle', animal_ur: 'گائے', age: 'Growing', date_en: 'June 18, 2026', date_ur: '۱۸ جون ۲۰۲۶', status: 'ongoing', icon: '🐄', color: '#ffebee' },
  { id: 2, disease_en: 'Foot and Mouth Disease', disease_ur: 'منہ کھر', animal: 'Buffalo', animal_ur: 'بھینس', age: 'Adult', date_en: 'May 2, 2026', date_ur: '۲ مئی ۲۰۲۶', status: 'treated', icon: '🐃', color: '#e8f5e9' },
  { id: 3, disease_en: 'Drenching Pneumonia', disease_ur: 'نمونیا', animal: 'Goat', animal_ur: 'بکری', age: 'New Born', date_en: 'Mar 14, 2026', date_ur: '۱۴ مارچ ۲۰۲۶', status: 'treated', icon: '🐐', color: '#f3e5f5' },
  { id: 4, disease_en: 'Theileriosis', disease_ur: 'تھیلیریوسس', animal: 'Cattle', animal_ur: 'گائے', age: 'Growing', date_en: 'Jan 5, 2026', date_ur: '۵ جنوری ۲۰۲۶', status: 'treated', icon: '🐄', color: '#fff3e0' },
];

export default function HistoryScreen() {
  const router = useRouter();
  const { lang, name } = useLocalSearchParams<{ lang: string; name: string }>();
  const isUrdu = lang === 'ur';

  const t = {
    title:   isUrdu ? 'پرانی تشخیص' : 'Diagnosis History',
    ongoing: isUrdu ? 'جاری'        : 'Ongoing',
    treated: isUrdu ? 'ٹھیک'        : 'Treated',
    empty:   isUrdu ? 'کوئی ریکارڈ نہیں' : 'No records yet',
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <UrduText
          isUrdu={isUrdu}
          style={styles.topbarText}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {t.title}
        </UrduText>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {HISTORY.map(item => (
          <View key={item.id} style={styles.item}>
            <View style={[styles.iconWrap, { backgroundColor: item.color }]}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.info}>
              <UrduText isUrdu={isUrdu} style={[styles.disease, isUrdu && styles.rtl]}>
                {isUrdu ? item.disease_ur : item.disease_en}
              </UrduText>
              <UrduText isUrdu={isUrdu} style={[styles.animal, isUrdu && styles.rtl]}>
                {isUrdu ? item.animal_ur : item.animal} · {isUrdu ? AGE_LABELS[item.age].ur : AGE_LABELS[item.age].en}
              </UrduText>
              <UrduText isUrdu={isUrdu} style={[styles.date, isUrdu && styles.rtl]}>
                {isUrdu ? item.date_ur : item.date_en}
              </UrduText>
            </View>
            <View style={[styles.badge, item.status === 'treated' ? styles.badgeTreated : styles.badgeOngoing]}>
              <UrduText isUrdu={isUrdu} style={[styles.badgeText, item.status === 'treated' ? styles.badgeTreatedText : styles.badgeOngoingText]}>
                {item.status === 'treated' ? t.treated : t.ongoing}
              </UrduText>
            </View>
          </View>
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>

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
  },
  topbarText: { color: 'white', fontSize: 16, fontWeight: '600' },
  body: { padding: 14 },
  rtl: { textAlign: 'right' },

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