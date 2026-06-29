import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.emoji}>🐄</Text>
      </View>
      <Text style={styles.title}>میرا مویشی</Text>
      <Text style={styles.subtitle}>مویشیوں کی بیماریوں کی تشخیص</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.replace('/language')}
      >
        <Text style={styles.btnText}>شروع کریں</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f9f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    backgroundColor: '#e0f0e0',
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#2d6a2d',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
  },
  emoji:    { fontSize: 64 },
  title:    { fontSize: 30, fontWeight: '700', color: '#1b5e20', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#558b2f', textAlign: 'center', paddingHorizontal: 40 },
  btn: {
    marginTop: 48,
    backgroundColor: '#2d6a2d',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  btnText: { color: 'white', fontSize: 16, fontWeight: '700' },
});