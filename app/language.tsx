import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LanguageScreen() {
  const [selected, setSelected] = useState<'en' | 'ur'>('en');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.topbarText}>زبان منتخب کریں</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.prompt}>اپنی زبان چنیں</Text>

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
            <Text style={styles.langNative}>اردو</Text>
          </View>
          {selected === 'ur' && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.replace({ pathname: '/home', params: { lang: selected } })}
        >
          <Text style={styles.btnText}>
            {selected === 'ur' ? 'آگے بڑھیں' : 'Continue'}
          </Text>
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