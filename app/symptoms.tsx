import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SYMPTOM_CATEGORIES } from '../lib/symptomsData';

const ANIMALS = [
  { key: 'Cattle',  en: 'Cattle',  ur: 'گائے',  icon: '🐄' },
  { key: 'Buffalo', en: 'Buffalo', ur: 'بھینس', icon: '🐃' },
  { key: 'Goat',    en: 'Goat',    ur: 'بکری',  icon: '🐐' },
  { key: 'Sheep',   en: 'Sheep',   ur: 'بھیڑ',  icon: '🐑' },
];

const SEX_OPTIONS = [
  { key: 'Male',   en: 'Male',   ur: 'نر',   icon: '🚹' },
  { key: 'Female', en: 'Female', ur: 'مادہ', icon: '🚺' },
];

const AGE_OPTIONS = [
  { key: 'New Born', en: 'New Born', ur: 'نوزائیدہ' },
  { key: 'Growing',  en: 'Growing',  ur: 'جوان' },
  { key: 'Adult',    en: 'Adult',    ur: 'بالغ' },
];

export default function SymptomsScreen() {
  const router = useRouter();
  const { lang, name } = useLocalSearchParams<{ lang: string; name: string }>();
  const isUrdu = lang === 'ur';

  const [selectedAnimal, setSelectedAnimal] = useState('Cattle');
  const [selectedSex, setSelectedSex]       = useState('Male');
  const [selectedAge, setSelectedAge]       = useState('Adult');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());

  const toggleSymptom = (key: string) => {
    setSelectedSymptoms(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const handleDiagnose = () => {
    router.push({
      pathname: '/result',
      params: {
        lang,
        name,
        animal: selectedAnimal,
        sex: selectedSex,
        age: selectedAge,
        symptoms: JSON.stringify([...selectedSymptoms]),
      },
    });
  };

  const t = {
    title:    isUrdu ? 'علامات منتخب کریں' : 'Select Symptoms',
    selected: isUrdu ? 'منتخب علامات'      : 'Selected Symptoms',
    none:     isUrdu ? 'کوئی علامت نہیں'   : 'None selected',
    btn:      isUrdu ? 'تشخیص کریں'        : 'Diagnose',
    sexLabel: isUrdu ? 'جنس'               : 'Sex',
    ageLabel: isUrdu ? 'عمر'               : 'Age',
  };

  const selectedList = [...selectedSymptoms];

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.topbarText}>{t.title}</Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Animal selector */}
        <View style={styles.animalRow}>
          {ANIMALS.map(a => (
            <TouchableOpacity
              key={a.key}
              style={[styles.animalBtn, selectedAnimal === a.key && styles.animalBtnSelected]}
              onPress={() => setSelectedAnimal(a.key)}
            >
              <Text style={styles.animalIcon}>{a.icon}</Text>
              <Text style={[styles.animalLabel, selectedAnimal === a.key && styles.animalLabelSelected]}>
                {isUrdu ? a.ur : a.en}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sex selector */}
        <View style={styles.selectorGroup}>
          <Text style={[styles.selectorLabel, isUrdu && styles.rtl]}>{t.sexLabel}</Text>
          <View style={styles.selectorRow}>
            {SEX_OPTIONS.map(s => (
              <TouchableOpacity
                key={s.key}
                style={[styles.selectorBtn, selectedSex === s.key && styles.selectorBtnSelected]}
                onPress={() => setSelectedSex(s.key)}
              >
                <Text style={styles.selectorIcon}>{s.icon}</Text>
                <Text numberOfLines={0} style={[styles.selectorBtnText, selectedSex === s.key && styles.selectorBtnTextSelected]}>
                  {isUrdu ? s.ur : s.en}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Age selector */}
        <View style={styles.selectorGroup}>
          <Text style={[styles.selectorLabel, isUrdu && styles.rtl]}>{t.ageLabel}</Text>
          <View style={styles.selectorRow}>
            {AGE_OPTIONS.map(a => (
              <TouchableOpacity
                key={a.key}
                style={[styles.selectorBtn, selectedAge === a.key && styles.selectorBtnSelected]}
                onPress={() => setSelectedAge(a.key)}
              >
                <Text numberOfLines={0} style={[styles.selectorBtnText, selectedAge === a.key && styles.selectorBtnTextSelected]}>
                  {isUrdu ? a.ur : a.en}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Symptom categories */}
        {SYMPTOM_CATEGORIES.map(cat => (
          <View key={cat.key} style={styles.section}>
            <Text style={[styles.sectionTitle, isUrdu && styles.rtl]}>
              {isUrdu ? cat.ur : cat.en}
            </Text>
            <View style={[styles.chips, isUrdu && styles.rowReverse]}>
              {cat.symptoms.map(s => (
                <TouchableOpacity
                  key={s.key}
                  style={[styles.chip, selectedSymptoms.has(s.key) && styles.chipActive]}
                  onPress={() => toggleSymptom(s.key)}
                >
                  <Text
                    numberOfLines={0}
                    style={[styles.chipText, selectedSymptoms.has(s.key) && styles.chipTextActive]}
                  >
                    {isUrdu ? s.ur : s.en}{selectedSymptoms.has(s.key) ? ' ✓' : '  '}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Selected summary */}
        <View style={styles.summaryBar}>
          <Text style={[styles.summaryTitle, isUrdu && styles.rtl]}>
            {t.selected}: <Text style={styles.summaryCount}>{selectedList.length}</Text>
          </Text>
          <Text style={[styles.summaryList, isUrdu && styles.rtl]}>
            {selectedList.length === 0 ? t.none : selectedList.map(key => {
              for (const cat of SYMPTOM_CATEGORIES) {
                const s = cat.symptoms.find(s => s.key === key);
                if (s) return isUrdu ? s.ur : s.en;
              }
              return key;
            }).join(' · ')}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.diagnoseBtn, selectedList.length === 0 && styles.diagnoseBtnDisabled]}
          onPress={handleDiagnose}
          disabled={selectedList.length === 0}
        >
          <Text style={styles.diagnoseBtnText}>{t.btn}</Text>
        </TouchableOpacity>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f9f4' },
  topbar: {
    backgroundColor: '#2d6a2d',
    paddingTop: 56,
    paddingBottom: 16,
    alignItems: 'center',
  },
  topbarText: { color: 'white', fontSize: 16, fontWeight: '600' },
  body: { flex: 1, padding: 12 },
  rtl: { textAlign: 'right' },

  animalRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    marginTop: 4,
  },
  animalBtn: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  animalBtnSelected: {
    borderColor: '#2d6a2d',
    backgroundColor: '#f0faf0',
  },
  animalIcon: { fontSize: 22, marginBottom: 4 },
  animalLabel: { fontSize: 9, color: '#555', textAlign: 'center' },
  animalLabelSelected: { color: '#1b5e20', fontWeight: '700' },

  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2d6a2d',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e8f5e9',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: '#f1f8f1',
    borderWidth: 1.5,
    borderColor: '#c8e6c9',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  chipActive: {
    backgroundColor: '#2d6a2d',
    borderColor: '#2d6a2d',
  },
  chipText: {
    fontSize: 11,
    color: '#2d6a2d',
  },
  chipTextActive: {
    color: 'white',
    fontWeight: '600',
  },

  summaryBar: {
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#a5d6a7',
  },
  summaryTitle: { fontWeight: '700', fontSize: 12, color: '#1b5e20', marginBottom: 4 },
  summaryCount: { color: '#388e3c' },
  summaryList: { fontSize: 11, color: '#555' },

  diagnoseBtn: {
    backgroundColor: '#1b5e20',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  diagnoseBtnDisabled: {
    backgroundColor: '#a5d6a7',
  },
  diagnoseBtnText: { color: 'white', fontSize: 15, fontWeight: '700' },

  selectorGroup: { marginBottom: 10 },
  selectorLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#555',
    marginBottom: 6,
    paddingHorizontal: 2,
  },
  selectorRow: { flexDirection: 'row', gap: 8 },
  selectorBtn: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 2,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    gap: 2,
  },
  selectorBtnSelected: {
    borderColor: '#2d6a2d',
    backgroundColor: '#f0faf0',
  },
  selectorIcon: { fontSize: 16 },
  selectorBtnText: { fontSize: 9.5, color: '#555', textAlign: 'center' },
  selectorBtnTextSelected: { color: '#1b5e20', fontWeight: '700' },
  rowReverse: { flexDirection: 'row-reverse' },
});