import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UrduText } from '../components/UrduText';

export default function HomeScreen() {
  const router = useRouter();
  const { lang, name } = useLocalSearchParams<{ lang: string; name: string }>();
  const isUrdu = lang === 'ur';

  const t = {
    appName:    isUrdu ? 'میرا مویشی'                      : 'Mera Maweshi',
    appSub:     isUrdu ? 'مویشیوں کی بیماریوں کی تشخیص'   : 'Livestock Disease Diagnosis',
    greeting:   isUrdu ? `السلام علیکم، ${name || 'صاحب'} 👋` : `Welcome, ${name || 'Friend'} 👋`,
    diagLabel:  isUrdu ? 'تشخیص کریں'       : 'Start Diagnosis',
    diagDesc:   isUrdu ? 'بیماری کی تشخیص کریں' : 'Diagnose your livestock',
    histLabel:  isUrdu ? 'پرانی تشخیص'      : 'History',
    histDesc:   isUrdu ? 'گزشتہ ریکارڈ دیکھیں'  : 'View past diagnoses',
    profLabel:  isUrdu ? 'پروفائل'           : 'Profile',
    profDesc:   isUrdu ? 'اپنی معلومات تبدیل کریں' : 'Update your information',
    langLabel:  isUrdu ? 'زبان تبدیل کریں'   : 'Change Language',
    langDesc:   isUrdu ? 'اردو · انگریزی'    : 'Urdu · English',
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <UrduText isUrdu={isUrdu} style={styles.appName}>{t.appName}</UrduText>
        <UrduText isUrdu={isUrdu} style={styles.appSub}>{t.appSub}</UrduText>
      </View>

      <View style={styles.body}>
        <UrduText isUrdu={isUrdu} style={[styles.greeting, isUrdu && styles.rtl]}>{t.greeting}</UrduText>

        {/* Diagnosis */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push({ pathname: '/symptoms', params: { lang, name } })}
        >
          <View style={[styles.iconWrap, { backgroundColor: '#e8f5e9' }]}>
            <Text style={styles.icon}>🔍</Text>
          </View>
          <View style={styles.cardText}>
            <UrduText isUrdu={isUrdu} style={[styles.cardLabel, isUrdu && styles.rtl]}>{t.diagLabel}</UrduText>
            <UrduText isUrdu={isUrdu} style={[styles.cardDesc, isUrdu && styles.rtl]}>{t.diagDesc}</UrduText>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* History */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push({ pathname: '/history', params: { lang } })}
        >
          <View style={[styles.iconWrap, { backgroundColor: '#fce4ec' }]}>
            <Text style={styles.icon}>📋</Text>
          </View>
          <View style={styles.cardText}>
            <UrduText isUrdu={isUrdu} style={[styles.cardLabel, isUrdu && styles.rtl]}>{t.histLabel}</UrduText>
            <UrduText isUrdu={isUrdu} style={[styles.cardDesc, isUrdu && styles.rtl]}>{t.histDesc}</UrduText>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push({ pathname: '/registration', params: { lang, name } })}
        >
          <View style={[styles.iconWrap, { backgroundColor: '#e3f2fd' }]}>
            <Text style={styles.icon}>👤</Text>
          </View>
          <View style={styles.cardText}>
            <UrduText isUrdu={isUrdu} style={[styles.cardLabel, isUrdu && styles.rtl]}>{t.profLabel}</UrduText>
            <UrduText isUrdu={isUrdu} style={[styles.cardDesc, isUrdu && styles.rtl]}>{t.profDesc}</UrduText>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Language */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/language')}
        >
          <View style={[styles.iconWrap, { backgroundColor: '#f3e5f5' }]}>
            <Text style={styles.icon}>🌐</Text>
          </View>
          <View style={styles.cardText}>
            <UrduText isUrdu={isUrdu} style={[styles.cardLabel, isUrdu && styles.rtl]}>{t.langLabel}</UrduText>
            <UrduText isUrdu={isUrdu} style={[styles.cardDesc, isUrdu && styles.rtl]}>{t.langDesc}</UrduText>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
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
  },
  appName: { color: 'white', fontSize: 20, fontWeight: '700' },
  appSub:  { color: 'rgba(255,255,255,0.75)', fontSize: 11, marginTop: 4 },
  body:    { padding: 16, paddingTop: 20 },
  greeting: { fontSize: 13, color: '#555', marginBottom: 16 },
  rtl: { textAlign: 'right' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#e8f5e9',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon:      { fontSize: 20 },
  cardText:  { flex: 1 },
  cardLabel: { fontSize: 13, fontWeight: '700', color: '#1b5e20' },
  cardDesc:  { fontSize: 11, color: '#888', marginTop: 2 },
  arrow:     { color: '#ccc', fontSize: 22 },
});