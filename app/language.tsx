import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UrduText } from '../components/UrduText';
import { getDeviceId } from '../lib/deviceId';
import { getFarmer } from '../lib/farmerApi';
import { getLocalProfile, saveLocalProfile } from '../lib/profile';

export default function LanguageScreen() {
  const [selected, setSelected] = useState<'en' | 'ur'>('en');
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  // Registration only ever needs to happen once per device. On every
  // subsequent launch we should skip straight to Home with the farmer's
  // saved name -- never make them re-register.
  const handleContinue = async () => {
    setChecking(true);
    try {
      // Fast path: we've registered on this device before.
      let profile = await getLocalProfile();

      // No local cache (fresh install, or app storage was cleared) --
      // check the backend before assuming this is a new farmer, in case
      // the device_id survived but the local cache didn't.
      if (!profile) {
        try {
          const deviceId = await getDeviceId();
          const farmer = await getFarmer(deviceId);
          profile = {
            name: farmer.name,
            phone: farmer.phone,
            province: farmer.province,
            district: farmer.district,
            tehsil: farmer.tehsil,
          };
          await saveLocalProfile(profile);
        } catch {
          profile = null; // truly not registered yet (or offline) -- send to registration
        }
      }

      if (profile) {
        router.replace({ pathname: '/home', params: { lang: selected, name: profile.name } });
      } else {
        router.replace({ pathname: '/registration', params: { lang: selected } });
      }
    } finally {
      setChecking(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <UrduText
          style={styles.topbarText}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          زبان منتخب کریں
        </UrduText>
      </View>

      <View style={styles.body}>
        <UrduText style={styles.prompt}>اپنی زبان چنیں</UrduText>

        <TouchableOpacity
          style={[styles.option, selected === 'en' && styles.optionSelected]}
          onPress={() => setSelected('en')}
        >
          <Text style={styles.flag}>🇬🇧</Text>
          <View style={styles.langInfo}>
            <Text style={styles.langName}>English</Text>
            <Text style={styles.langNative}>English</Text>
          </View>
          {selected === 'en' && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, selected === 'ur' && styles.optionSelected]}
          onPress={() => setSelected('ur')}
        >
          <Text style={styles.flag}>🇵🇰</Text>
          <View style={styles.langInfo}>
            <Text style={styles.langName}>Urdu</Text>
            <UrduText style={styles.langNative}>اردو</UrduText>
          </View>
          {selected === 'ur' && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={handleContinue}
          disabled={checking}
        >
          {checking ? (
            <ActivityIndicator color="white" />
          ) : (
            <UrduText
              isUrdu={selected === 'ur'}
              style={styles.btnText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {selected === 'ur' ? 'آگے بڑھیں' : 'Continue'}
            </UrduText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9f4' },
  topbar: {
    backgroundColor: '#2d6a2d',
    paddingTop: 56,
    paddingBottom: 18,
    alignItems: 'center',
  },
  topbarText: { color: 'white', fontSize: 16, fontWeight: '600' },
  body: { padding: 20, paddingTop: 24 },
  prompt: { fontSize: 13, color: '#555', textAlign: 'center', marginBottom: 20 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    gap: 14,
  },
  optionSelected: { borderColor: '#2d6a2d', backgroundColor: '#f0faf0' },
  flag: { fontSize: 26 },
  langInfo: { flex: 1 },
  langName: { fontSize: 14, fontWeight: '600', color: '#222' },
  langNative: { fontSize: 12, color: '#888', marginTop: 2 },
  check: { color: '#2d6a2d', fontSize: 20, fontWeight: '700' },
  btn: {
    backgroundColor: '#2d6a2d',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  btnText: { color: 'white', fontSize: 15, fontWeight: '600' },
});