import { StyleSheet, Text, TextProps } from 'react-native';
import { useUrduFontLoaded } from '../app/_layout';

interface UrduTextProps extends TextProps {
  // Pass isUrdu={isUrdu} when the text is conditional on language.
  // Omit (defaults to true) for text that's always Urdu, e.g. static labels.
  isUrdu?: boolean;
}

// Noto Nastaliq Urdu ships 4 static weights. Android will silently fall back
// to the system font if you ask for a fontWeight that wasn't registered for
// the given fontFamily -- that's what caused some labels to render in a plain
// Arabic font while others rendered in Nastaliq. So instead of applying one
// font file + a fontWeight on top, we pick the font file that matches the
// requested weight and zero out fontWeight so nothing tries to synthesize it.
function familyForWeight(weight?: string | number): string {
  const w = typeof weight === 'string' ? parseInt(weight, 10) : weight;
  if (!w || Number.isNaN(w)) return 'NotoNastaliqUrdu_400Regular'; // 'normal' or unset
  if (w < 450) return 'NotoNastaliqUrdu_400Regular';
  if (w < 550) return 'NotoNastaliqUrdu_500Medium';
  if (w < 650) return 'NotoNastaliqUrdu_600SemiBold';
  return 'NotoNastaliqUrdu_700Bold'; // 700, 800, 900, 'bold'
}

// Nastaliq's tall loops and diagonal strokes make it read noticeably bigger
// than a system sans-serif at the same fontSize, so we scale it down a bit
// wherever it's applied. Tweak NASTALIQ_SIZE_SCALE if it still feels off.
const NASTALIQ_SIZE_SCALE = 0.68;

/**
 * Drop-in replacement for <Text> that applies the Nastaliq Urdu font
 * whenever the content is Urdu and the font has finished loading.
 * Falls back to the default system font otherwise -- never blocks render.
 */
export function UrduText({ isUrdu = true, style, ...props }: UrduTextProps) {
  const urduFontLoaded = useUrduFontLoaded();

  if (!isUrdu || !urduFontLoaded) {
    return <Text style={style} {...props} />;
  }

  const flat = StyleSheet.flatten(style) || {};
  const urduFont: {
    fontFamily: string;
    fontWeight: 'normal';
    fontSize?: number;
    lineHeight?: number;
  } = {
    fontFamily: familyForWeight(flat.fontWeight),
    fontWeight: 'normal', // weight is now baked into the font file, not synthesized
  };
  if (typeof flat.fontSize === 'number') {
    urduFont.fontSize = flat.fontSize * NASTALIQ_SIZE_SCALE;
  }
  // Scale lineHeight down too (only when the caller set one explicitly),
  // so Urdu paragraphs don't keep English-sized vertical spacing now that
  // the glyphs themselves are smaller.
  if (typeof flat.lineHeight === 'number') {
    urduFont.lineHeight = flat.lineHeight * NASTALIQ_SIZE_SCALE;
  }

  return <Text style={[style, urduFont]} {...props} />;
}