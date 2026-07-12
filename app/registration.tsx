import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { UrduText } from '../components/UrduText';
import { getDeviceId } from '../lib/deviceId';
import { upsertFarmer } from '../lib/farmerApi';
import { PAKISTAN_DATA } from '../lib/pakistanData';
import { getLocalProfile, saveLocalProfile } from '../lib/profile';

type PickerProps = {
  field: string;
  label: string;
  value: string;
  options: string[];
  onSelect: (val: string) => void;
  placeholder: string;
  disabled: boolean;
  isUrdu: boolean;
  openDropdown: string | null;
  toggle: (name: string) => void;
};

function CascadePicker({
  field, label, value, options, onSelect,
  placeholder, disabled, isUrdu, openDropdown, toggle,
}: PickerProps) {
  return (
    <View style={styles.field}>
      <UrduText isUrdu={isUrdu} style={[styles.label, isUrdu && styles.rtl]}>{label}</UrduText>
      <TouchableOpacity
        style={[styles.picker, disabled && styles.pickerDisabled]}
        onPress={() => !disabled && toggle(field)}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <UrduText isUrdu={isUrdu} style={[styles.pickerText, !value && styles.pickerPlaceholder, isUrdu && styles.rtl]}>
          {value || placeholder}
        </UrduText>
        <Text style={styles.pickerArrow}>
          {disabled ? '🔒' : openDropdown === field ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {openDropdown === field && (
        <View style={styles.dropdown}>
          <ScrollView
            style={{ maxHeight: 200 }}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
          >
            {options.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[styles.dropdownItem, value === opt && styles.dropdownItemSelected]}
                onPress={() => onSelect(opt)}
              >
                <UrduText isUrdu={isUrdu} style={[styles.dropdownText, isUrdu && styles.rtl, value === opt && styles.dropdownTextSelected]}>
                  {opt}
                </UrduText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// Main Screen
export default function RegistrationScreen() {
  const router = useRouter();
  const { lang } = useLocalSearchParams<{ lang: string }>();
  const isUrdu = lang === 'ur';

  const [name, setName]         = useState('');
  const [phone, setPhone]       = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [tehsil, setTehsil]     = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // If this device already has a saved profile, this screen is being used
  // to *edit* it (reached via Home's "Profile" card) rather than for
  // first-time registration -- prefill so the farmer doesn't have to
  // re-enter their province/district/tehsil just to change their name.
  useEffect(() => {
    getLocalProfile().then(profile => {
      if (!profile) return;
      setIsEditMode(true);
      setName(profile.name);
      setPhone(profile.phone ?? '');

      // profile.province/district/tehsil are stored as English keys.
      // The picker state holds a *display* string (English or Urdu
      // depending on the active language), so convert before setting.
      const provDisplay = isUrdu ? PAKISTAN_DATA[profile.province]?.ur ?? profile.province : profile.province;
      setProvince(provDisplay);

      const distData = PAKISTAN_DATA[profile.province]?.districts?.[profile.district];
      setDistrict(isUrdu ? distData?.ur ?? profile.district : profile.district);

      const tehData = distData?.tehsils?.[profile.tehsil];
      setTehsil(isUrdu ? tehData?.ur ?? profile.tehsil : profile.tehsil);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (field: string) => {
    if (isEditMode) return; // profile is view-only once registered -- see note below
    if (field === 'district' && !province) return;
    if (field === 'tehsil'   && !district) return;
    setOpenDropdown(prev => (prev === field ? null : field));
  };

  // Key resolvers
  const provKey = isUrdu
    ? Object.keys(PAKISTAN_DATA).find(k => PAKISTAN_DATA[k].ur === province) ?? ''
    : province;

  const distKey = isUrdu
    ? (provKey
        ? Object.keys(PAKISTAN_DATA[provKey].districts).find(
            k => PAKISTAN_DATA[provKey].districts[k].ur === district
          ) ?? ''
        : '')
    : district;

  const tehKey = isUrdu
    ? (provKey && distKey
        ? Object.keys(PAKISTAN_DATA[provKey].districts[distKey].tehsils).find(
            k => PAKISTAN_DATA[provKey].districts[distKey].tehsils[k].ur === tehsil
          ) ?? ''
        : '')
    : tehsil;

  // Option lists
  const provinceOptions = Object.keys(PAKISTAN_DATA).map(k =>
    isUrdu ? PAKISTAN_DATA[k].ur : k
  );

  const districtOptions = provKey
    ? Object.keys(PAKISTAN_DATA[provKey].districts).map(k =>
        isUrdu ? PAKISTAN_DATA[provKey].districts[k].ur : k
      )
    : [];

  const tehsilOptions = distKey
    ? Object.keys(PAKISTAN_DATA[provKey].districts[distKey].tehsils).map(k =>
        isUrdu ? PAKISTAN_DATA[provKey].districts[distKey].tehsils[k].ur : k
      )
    : [];

  // Cascade handlers
  const handleProvince = (val: string) => { setProvince(val); setDistrict(''); setTehsil(''); setOpenDropdown(null); };
  const handleDistrict = (val: string) => { setDistrict(val); setTehsil(''); setOpenDropdown(null); };
  const handleTehsil   = (val: string) => { setTehsil(val); setOpenDropdown(null); };

  // Shared picker props
  const pickerShared = { isUrdu, openDropdown, toggle };

  const t = {
    title:    isUrdu ? 'مالک کی تفصیل'          : 'Owner Details',
    heading:  isEditMode
      ? (isUrdu ? 'آپ کی معلومات' : 'Your Information')
      : (isUrdu ? 'اپنی معلومات درج کریں' : 'Enter Your Information'),
    lockedNote: isUrdu
      ? '🔒 یہ معلومات محفوظ ہیں۔ تبدیلی کی سہولت جلد شامل کی جائے گی۔'
      : '🔒 This information is locked. Editing will be available soon.',
    name:     isUrdu ? 'مالک کا نام *'           : 'Owner Name *',
    phone:    isUrdu ? 'فون نمبر'               : 'Phone Number',
    province: isUrdu ? 'صوبہ *'                 : 'Province *',
    district: isUrdu ? 'ضلع *'                  : 'District *',
    tehsil:   isUrdu ? 'تحصیل *'               : 'Tehsil *',
    selProv:  isUrdu ? 'صوبہ منتخب کریں'        : 'Select Province',
    selDist:  isUrdu ? 'پہلے صوبہ منتخب کریں'   : 'Select Province first',
    selTeh:   isUrdu ? 'پہلے ضلع منتخب کریں'    : 'Select District first',
    btn:      isUrdu ? 'آگے بڑھیں'             : 'Continue',
    backBtn:  isUrdu ? 'ہوم پر واپس جائیں'      : 'Back to Home',
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        {isEditMode && (
          <TouchableOpacity
            style={[styles.backArrowBtn, isUrdu ? styles.backArrowBtnRight : styles.backArrowBtnLeft]}
            onPress={() => router.replace({ pathname: '/home', params: { lang, name } })}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backArrowText}>{isUrdu ? '›' : '‹'}</Text>
          </TouchableOpacity>
        )}
        <UrduText isUrdu={isUrdu} style={styles.topbarText}>{t.title}</UrduText>
      </View>

      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <UrduText isUrdu={isUrdu} style={styles.cardTitle}>{t.heading}</UrduText>

          {isEditMode && (
            <UrduText isUrdu={isUrdu} style={[styles.lockedNote, isUrdu && styles.rtl]}>
              {t.lockedNote}
            </UrduText>
          )}

          {/* Name */}
          <View style={styles.field}>
            <UrduText isUrdu={isUrdu} style={[styles.label, isUrdu && styles.rtl]}>{t.name}</UrduText>
            <TextInput
              style={[styles.input, isUrdu && styles.rtl, isEditMode && styles.inputLocked]}
              value={name}
              onChangeText={setName}
              placeholder={isUrdu ? 'احمد علی' : 'Ahmed Ali'}
              placeholderTextColor="#bbb"
              editable={!isEditMode}
            />
          </View>

          {/* Phone */}
          <View style={styles.field}>
            <UrduText isUrdu={isUrdu} style={[styles.label, isUrdu && styles.rtl]}>{t.phone}</UrduText>
            <TextInput
              style={[styles.input, isUrdu && styles.rtl, isEditMode && styles.inputLocked]}
              value={phone}
              onChangeText={setPhone}
              placeholder="0300-0000000"
              placeholderTextColor="#bbb"
              keyboardType="phone-pad"
              editable={!isEditMode}
            />
          </View>

          <CascadePicker
            {...pickerShared}
            field="province"
            label={t.province}
            value={province}
            options={provinceOptions}
            onSelect={handleProvince}
            placeholder={t.selProv}
            disabled={isEditMode}
          />

          <CascadePicker
            {...pickerShared}
            field="district"
            label={t.district}
            value={district}
            options={districtOptions}
            onSelect={handleDistrict}
            placeholder={province ? 'Select District' : t.selDist}
            disabled={isEditMode || !province}
          />

          <CascadePicker
            {...pickerShared}
            field="tehsil"
            label={t.tehsil}
            value={tehsil}
            options={tehsilOptions}
            onSelect={handleTehsil}
            placeholder={district ? 'Select Tehsil' : t.selTeh}
            disabled={isEditMode || !district}
          />

          {showError && (
            <UrduText isUrdu={isUrdu} style={styles.errorText}>
              {isUrdu ? 'تمام ضروری خانے پُر کریں' : 'All required fields must be filled'}
            </UrduText>
          )}

          {saveError && (
            <UrduText isUrdu={isUrdu} style={styles.errorText}>
              {saveError}
            </UrduText>
          )}

          {isEditMode ? (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => router.replace({ pathname: '/home', params: { lang, name } })}
            >
              <UrduText isUrdu={isUrdu} style={styles.btnText} numberOfLines={1} adjustsFontSizeToFit>
                {t.backBtn}
              </UrduText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btn}
              onPress={async () => {
                if (!name.trim() || !province || !district || !tehsil) {
                  setShowError(true);
                  return;
                }
                setShowError(false);
                setSaveError(null);
                setSaving(true);
                try {
                  const deviceId = await getDeviceId();
                  await upsertFarmer({
                    device_id: deviceId,
                    name: name.trim(),
                    phone: phone.trim() || null,
                    province: provKey,
                    district: distKey,
                    tehsil: tehKey,
                  });
                  // Registration is compulsory and is the source that tells
                  // the rest of the app "this device is registered" -- so we
                  // only cache locally and move on once the backend save has
                  // actually succeeded. A silent failure here would mean
                  // every diagnosis this farmer ever saves later gets
                  // rejected by the backend (it requires a farmer profile to
                  // exist first), with no way to tell why.
                  await saveLocalProfile({
                    name: name.trim(),
                    phone: phone.trim() || null,
                    province: provKey,
                    district: distKey,
                    tehsil: tehKey,
                  });
                  router.replace({ pathname: '/home', params: { lang, name: name.trim() } });
                } catch (err: any) {
                  setSaveError(
                    isUrdu
                      ? 'پروفائل محفوظ نہیں ہو سکی۔ انٹرنیٹ کنکشن چیک کریں اور دوبارہ کوشش کریں۔'
                      : `Could not save your profile. Check your connection and try again. (${err?.message ?? 'unknown error'})`
                  );
                } finally {
                  setSaving(false);
                }
              }}
              disabled={saving}
            >
              <UrduText
                isUrdu={isUrdu}
                style={styles.btnText}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {saving ? (isUrdu ? 'محفوظ ہو رہا ہے...' : 'Saving...') : t.btn}
              </UrduText>
            </TouchableOpacity>
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
  field:               { marginBottom: 14 },
  label:               { fontSize: 11, color: '#888', marginBottom: 4 },
  input:               { borderBottomWidth: 1.5, borderBottomColor: '#e0e0e0', paddingVertical: 8, fontSize: 13, color: '#222' },
  inputLocked:         { color: '#777', borderBottomColor: '#eee' },
  lockedNote:          { fontSize: 11, color: '#8a6d1a', backgroundColor: '#fff8e1', borderRadius: 8, padding: 10, marginBottom: 16, textAlign: 'center' },
  rtl:                 { textAlign: 'right' },
  btn:                 { backgroundColor: '#2d6a2d', borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 18 },
  btnText:             { color: 'white', fontSize: 14, fontWeight: '600' },
  picker:              { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1.5, borderBottomColor: '#e0e0e0', paddingVertical: 8 },
  pickerDisabled:      { opacity: 0.4 },
  pickerText:          { fontSize: 13, color: '#222', flex: 1 },
  pickerPlaceholder:   { color: '#bbb' },
  pickerArrow:         { fontSize: 10, color: '#888' },
  dropdown:            { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, marginTop: 4, backgroundColor: 'white', maxHeight: 200, overflow: 'hidden' },
  dropdownItem:        { paddingVertical: 10, paddingHorizontal: 12 },
  dropdownItemSelected:{ backgroundColor: '#e8f5e9' },
  dropdownText:        { fontSize: 13, color: '#222' },
  dropdownTextSelected:{ color: '#2d6a2d', fontWeight: '600' },
  errorText:           { color: '#c0392b', fontSize: 12, textAlign: 'center', marginTop: 10, marginBottom: 4 },
});