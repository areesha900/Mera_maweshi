// import { Stack } from 'expo-router';

// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="index" />
//       <Stack.Screen name="language" />
//       <Stack.Screen name="registration" />
//       <Stack.Screen name="home" />
//       <Stack.Screen name="symptoms" />
//       <Stack.Screen name="result" />
//       <Stack.Screen name="history" />
//     </Stack>
//   );
// }



// import { NotoNastaliqUrdu_400Regular } from '@expo-google-fonts/noto-nastaliq-urdu';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { createContext, useContext } from 'react';

// const UrduFontContext = createContext(false);
// export const useUrduFontLoaded = () => useContext(UrduFontContext);

// export default function RootLayout() {
//   const [urduFontLoaded] = useFonts({
//     NotoNastaliqUrdu: NotoNastaliqUrdu_400Regular,
//   });

//   return (
//     <UrduFontContext.Provider value={urduFontLoaded}>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="index" />
//         <Stack.Screen name="language" />
//         <Stack.Screen name="registration" />
//         <Stack.Screen name="home" />
//         <Stack.Screen name="symptoms" />
//         <Stack.Screen name="result" />
//         <Stack.Screen name="history" />
//       </Stack>
//     </UrduFontContext.Provider>
//   );
// }


import {
  NotoNastaliqUrdu_400Regular,
  NotoNastaliqUrdu_500Medium,
  NotoNastaliqUrdu_600SemiBold,
  NotoNastaliqUrdu_700Bold,
} from '@expo-google-fonts/noto-nastaliq-urdu';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { createContext, useContext } from 'react';

const UrduFontContext = createContext(false);
export const useUrduFontLoaded = () => useContext(UrduFontContext);

export default function RootLayout() {
  const [urduFontLoaded] = useFonts({
    NotoNastaliqUrdu_400Regular,
    NotoNastaliqUrdu_500Medium,
    NotoNastaliqUrdu_600SemiBold,
    NotoNastaliqUrdu_700Bold,
  });

  return (
    <UrduFontContext.Provider value={urduFontLoaded}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="language" />
        <Stack.Screen name="registration" />
        <Stack.Screen name="home" />
        <Stack.Screen name="symptoms" />
        <Stack.Screen name="result" />
        <Stack.Screen name="history" />
      </Stack>
    </UrduFontContext.Provider>
  );
}