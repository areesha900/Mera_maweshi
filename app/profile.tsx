import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UrduText } from '../components/UrduText';
import { PAKISTAN_DATA } from '../lib/pakistanData';
import { CachedProfile, getLocalProfile } from '../lib/profile';

type InfoRowProps = {
  label: string;
  value: string;
  isUrdu: boolean;
  last?: boolean;
};

function InfoRow({ label, value, isUrdu, last }: InfoRowProps) {
  return (
    <View style={[styles.infoRow, last && styles.infoRowLast, isUrdu && styles.infoRowRtl]}>
      <UrduText isUrdu={isUrdu} style={styles.infoLabel}>{label}</UrduText>
      <UrduText isUrdu={isUrdu} style={styles.infoValue}>{value}</UrduText>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { lang, name: nameParam } = useLocalSearchParams<{ lang: string; name: string }>();
  const isUrdu = lang === 'ur';

  const [profile, setProfile] = useState<CachedProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocalProfile().then(p => {
      if (!p) {
        router.replace({ pathname: '/registration', params: { lang } });
        return;
      }
      setProfile(p);
      setLoading(false);
    });
  }, []);

  const provinceDisplay = profile
    ? (isUrdu ? PAKISTAN_DATA[profile.province]?.ur ?? profile.province : profile.province)
    : '';

  const districtData = profile ? PAKISTAN_DATA[profile.province]?.districts?.[profile.district] : undefined;
  const districtDisplay = profile
    ? (isUrdu ? districtData?.ur ?? profile.district : profile.district)
    : '';

  const tehsilData = districtData?.tehsils?.[profile?.tehsil ?? ''];
  const tehsilDisplay = profile
    ? (isUrdu ? tehsilData?.ur ?? profile.tehsil : profile.tehsil)
    : '';

  const t = {
    title:      isUrdu ? 'مالک کی تفصیل'          : 'Owner Details',
    heading:    isUrdu ? 'آپ کی معلومات'          : 'Your Information',
    lockedNote: isUrdu ? '🔒 ان معلومات میں تبدیلی نہیں کی جا سکتی۔' : '🔒 This information cannot be edited.',
    name:       isUrdu ? 'مالک کا نام'             : 'Owner Name',
    phone:      isUrdu ? 'فون نمبر'                : 'Phone Number',
    province:   isUrdu ? 'صوبہ'                   : 'Province',
    district:   isUrdu ? 'ضلع'                    : 'District',
    tehsil:     isUrdu ? 'تحصیل'                  : 'Tehsil',
    backBtn:    isUrdu ? 'ہوم پر واپس جائیں'       : 'Back to Home',
  };

  const goHome = () => router.replace({ pathname: '/home', params: { lang, name: nameParam || profile?.name } });

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity
          style={[styles.backArrowBtn, isUrdu ? styles.backArrowBtnRight : styles.backArrowBtnLeft]}
          onPress={goHome}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrowText}>{isUrdu ? '›' : '‹'}</Text>
        </TouchableOpacity>
        <UrduText isUrdu={isUrdu} style={styles.topbarText}>{t.title}</UrduText>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <UrduText isUrdu={isUrdu} style={styles.cardTitle}>{t.heading}</UrduText>

          {!loading && profile && (
            <>
              <UrduText isUrdu={isUrdu} style={[styles.lockedNote, isUrdu && styles.rtl]}>
                {t.lockedNote}
              </UrduText>

              <View style={styles.infoList}>
                <InfoRow isUrdu={isUrdu} label={t.name} value={profile.name} />
                <InfoRow isUrdu={isUrdu} label={t.phone} value={profile.phone || '—'} />
                <InfoRow isUrdu={isUrdu} label={t.province} value={provinceDisplay} />
                <InfoRow isUrdu={isUrdu} label={t.district} value={districtDisplay} />
                <InfoRow isUrdu={isUrdu} label={t.tehsil} value={tehsilDisplay} last />
              </View>

              <TouchableOpacity style={styles.btn} onPress={goHome}>
                <UrduText isUrdu={isUrdu} style={styles.btnText} numberOfLines={1} adjustsFontSizeToFit>
                  {t.backBtn}
                </UrduText>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#f4f9f4' },
  topbar:      { backgroundColor: '#2d6a2d', paddingTop: 56, paddingBottom: 18, alignItems: 'center', position: 'relative' },
  backArrowBtn: {
    position: 'absolute',
    bottom: 14,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowBtnLeft:  { left: 12 },
  backArrowBtnRight: { right: 12 },
  backArrowText: { color: 'white', fontSize: 24, fontWeight: '700' },
  topbarText:  { color: 'white', fontSize: 16, fontWeight: '600' },
  body:        { padding: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 18,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eef3ee',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1b5e20',
    textAlign: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8f5e9',
  },
  lockedNote: { fontSize: 11, color: '#8a6d1a', backgroundColor: '#fff8e1', borderRadius: 8, padding: 10, marginBottom: 16, textAlign: 'center' },
  infoList:   { marginBottom: 4 },
  infoRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#f2f2f2' },
  infoRowLast:{ borderBottomWidth: 0 },
  infoRowRtl: { flexDirection: 'row-reverse' },
  infoLabel:  { fontSize: 12.5, color: '#888' },
  infoValue:  { fontSize: 13.5, color: '#222', fontWeight: '600', textAlign: 'right' },
  rtl:        { textAlign: 'right' },
  btn:        { backgroundColor: '#2d6a2d', borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 18 },
  btnText:    { color: 'white', fontSize: 14, fontWeight: '600' },
});
