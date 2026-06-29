import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="language" />
      <Stack.Screen name="registration" />
      <Stack.Screen name="home" />
      <Stack.Screen name="symptoms" />
      <Stack.Screen name="result" />
      <Stack.Screen name="history" />
    </Stack>
  );
}