type TehsilData = {
  ur: string;
};

type DistrictData = {
  ur: string;
  tehsils: Record<string, TehsilData>;
};

type ProvinceData = {
  ur: string;
  districts: Record<string, DistrictData>;
};

export const PAKISTAN_DATA: Record<string, ProvinceData> = {

  Punjab: {
    ur: 'پنجاب',
    districts: {
      Attock: {
        ur: 'اٹک',
        tehsils: {
          Attock:       { ur: 'اٹک' },
          'Fateh Jang': { ur: 'فتح جنگ' },
          Hassanabdal:  { ur: 'حسن ابدال' },
          Hazro:        { ur: 'حضرو' },
          Jand:         { ur: 'جنڈ' },
          'Pindi Gheb': { ur: 'پنڈی گھیب' },
        },
      },
      Bahawalnagar: {
        ur: 'بہاولنگر',
        tehsils: {
          Bahawalnagar: { ur: 'بہاولنگر' },
          Chishtian:    { ur: 'چشتیاں' },
          Fortabbas:    { ur: 'فورٹ عباس' },
          Haroonabad:   { ur: 'ہارون آباد' },
          Minchinabad:  { ur: 'منچن آباد' },
        },
      },
      Bahawalpur: {
        ur: 'بہاولپور',
        tehsils: {
          'Ahmadpur East':      { ur: 'احمد پور شرقیہ' },
          'Bahawalpur City':    { ur: 'بہاولپور شہر' },
          'Bahawalpur Saddar':  { ur: 'بہاولپور صدر' },
          Hasilpur:             { ur: 'حاصل پور' },
          Yazman:               { ur: 'یزمان' },
          'Khairpur Tamewali':  { ur: 'خیرپور تامے والی' },
        },
      },
      Bhakkar: {
        ur: 'بھکر',
        tehsils: {
          Bhakkar:     { ur: 'بھکر' },
          'Darya Khan': { ur: 'دریا خان' },
          'Kalur Kot':  { ur: 'کلور کوٹ' },
          Mankera:      { ur: 'منکیرہ' },
        },
      },
      Chakwal: {
        ur: 'چکوال',
        tehsils: {
          Chakwal:            { ur: 'چکوال' },
          'Choa Saidan Shah': { ur: 'چوہا سیدن شاہ' },
          'Kallar Kahar':     { ur: 'کلر کہار' },
        },
      },
      Chiniot: {
        ur: 'چنیوٹ',
        tehsils: {
          Bhawana: { ur: 'بھوانہ' },
          Chiniot: { ur: 'چنیوٹ' },
          Lalian:  { ur: 'لالیاں' },
        },
      },
      'Dera Ghazi Khan': {
        ur: 'ڈیرہ غازی خان',
        tehsils: {
          'Dera Ghazi Khan': { ur: 'ڈیرہ غازی خان' },
          'Kot Chutta':      { ur: 'کوٹ چھٹہ' },
        },
      },
      Faisalabad: {
        ur: 'فیصل آباد',
        tehsils: {
          'Chak Jhumra':       { ur: 'چک جھمرہ' },
          'Faisalabad City':    { ur: 'فیصل آباد شہر' },
          'Faisalabad Saddar': { ur: 'فیصل آباد صدر' },
          Jaranwala:           { ur: 'جڑانوالہ' },
          Samundari:           { ur: 'سمندری' },
          Tandlianwala:        { ur: 'تاندلیانوالہ' },
        },
      },
      Gujranwala: {
        ur: 'گوجرانوالہ',
        tehsils: {
          'Gujranwala City':   { ur: 'گوجرانوالہ شہر' },
          'Gujranwala Sadar':  { ur: 'گوجرانوالہ صدر' },
          Kamoke:              { ur: 'کاموکی' },
          'Naushera Virkan':   { ur: 'نوشہرہ ورکاں' },
        },
      },
      Gujrat: {
        ur: 'گجرات',
        tehsils: {
          Gujrat:            { ur: 'گجرات' },
          Kharian:           { ur: 'کھاریاں' },
          Kunjah:            { ur: 'کنجاہ' },
          'Jalalpur Jattan': { ur: 'جلال پور جٹاں' },
          'Sarai Alamgir':   { ur: 'سرائے عالمگیر' },
        },
      },
      Hafizabad: {
        ur: 'حافظ آباد',
        tehsils: {
          Hafizabad:       { ur: 'حافظ آباد' },
          'Pindi Bhattian': { ur: 'پنڈی بھٹیاں' },
        },
      },
      Jhang: {
        ur: 'جھنگ',
        tehsils: {
          'Ahmad Pur Sial': { ur: 'احمد پور سیال' },
          'Athara Hazari':      { ur: 'اٹھارہ ہزاری' },
          Jhang:            { ur: 'جھنگ' },
          Shorkot:          { ur: 'شورکوٹ' },
        },
      },
      Jhelum: {
        ur: 'جہلم',
        tehsils: {
          Dina:             { ur: 'ڈینہ' },
          Jhelum:           { ur: 'جہلم' },
          'Pind Dadan Khan': { ur: 'پنڈ دادن خان' },
          Sohawa:           { ur: 'سوہاوہ' },
        },
      },
      Kasur: {
        ur: 'قصور',
        tehsils: {
          Chunian:           { ur: 'چونیاں' },
          Kasur:             { ur: 'قصور' },
          'Kot Radha Kishan': { ur: 'کوٹ رادھا کشن' },
          Pattoki:           { ur: 'پتوکی' },
        },
      },
      Khanewal: {
        ur: 'خانیوال',
        tehsils: {
          Kabirwala:   { ur: 'کبیروالہ' },
          Khanewal:    { ur: 'خانیوال' },
          Jahanian:    { ur: 'جہانیاں' },
          'Mian Channu': { ur: 'میاں چنوں' },
        },
      },
      Khushab: {
        ur: 'خوشاب',
        tehsils: {
          Khushab:   { ur: 'خوشاب' },
          Naushera:  { ur: 'نوشہرہ' },
          'Noorpur Thal':   { ur: 'نورپور' },
          Quaidabad: { ur: 'قائدآباد' },
        },
      },
      'Kot Addu': {
        ur: 'کوٹ ادو',
        tehsils: {
          'Chowk Sarwar Shaheed': { ur: 'چوک سرور شہید' },
          'Kot Addu':            { ur: 'کوٹ ادو' },
        },
      },
      Lahore: {
        ur: 'لاہور',
        tehsils: {
          'Allama Iqbal Town':  { ur: 'علامہ اقبال ٹاؤن' },
          'Lahore Cantt':  { ur: 'لاہور کینٹ' },
          'Lahore City':   { ur: 'لاہور شہر' },
          'Model Town':    { ur: 'ماڈل ٹاؤن' },
          Nishter:         { ur: 'نشتر' },
          Raiwind:         { ur: 'رائیونڈ' },
          Ravi:            { ur: 'راوی' },
          Saddar:          { ur: 'صدر' },
          Shalimar:        { ur: 'شالیمار' },
          Wahga:           { ur: 'واہگہ' },
        },
      },
      Layyah: {
        ur: 'لیہ',
        tehsils: {
          Chaubara:         { ur: 'چوبارہ' },
          'Karor Lal Esan': { ur: 'کروڑ لال عیسن' },
          Layyah:           { ur: 'لیہ' },
        },
      },
      Lodhran: {
        ur: 'لودھراں',
        tehsils: {
          Lodhran:      { ur: 'لودھراں' },
          Dunyapur:     { ur: 'دنیاپور' },
          'Kahror Pacca': { ur: 'کہرور پکا' },
        },
      },
      'Mandi Bahauddin': {
        ur: 'منڈی بہاءالدین',
        tehsils: {
          Malakwal:          { ur: 'ملکوال' },
          'Mandi Bahauddin': { ur: 'منڈی بہاءالدین' },
          Phalia:            { ur: 'پھالیہ' },
        },
      },
      Mianwali: {
        ur: 'میانوالی',
        tehsils: {
          'Isa Khel': { ur: 'عیسیٰ خیل' },
          Mianwali:  { ur: 'میانوالی' },
          Piplan:    { ur: 'پیپلاں' },
        },
      },
      Multan: {
        ur: 'ملتان',
        tehsils: {
          'Jalalpur Pirwala': { ur: 'جلال پور پیروالا' },
          'Multan City':    { ur: 'ملتان شہر' },
          'Multan Sadar':   { ur: 'ملتان صدر' },
          Shujabad:         { ur: 'شجاع آباد' },
        },
      },
      Murree: {
        ur: 'مری',
        tehsils: {
          'Kotli Sattian': { ur: 'کوٹلی ستیاں' },
          Murree:          { ur: 'مری' },
        },
      },
      Muzaffargarh: {
        ur: 'مظفرگڑھ',
        tehsils: {
          Alipur:       { ur: 'علی پور' },
          Jatoi:        { ur: 'جتوئی' },
          Muzaffargarh: { ur: 'مظفرگڑھ' },
        },
      },
      'Nankana Sahib': {
        ur: 'ننکانہ صاحب',
        tehsils: {
          'Nankana Sahib': { ur: 'ننکانہ صاحب' },
          'Sangla Hill':   { ur: 'سانگلہ ہل' },
          'Shah kot':         { ur: 'شاہ کوٹ' },
        },
      },
      Narowal: {
        ur: 'نارووال',
        tehsils: {
          Narowal:    { ur: 'نارووال' },
          Shakargarh: { ur: 'شکرگڑھ' },
          Zafarwal:   { ur: 'ظفروال' },
        },
      },
      Okara: {
        ur: 'اوکاڑہ',
        tehsils: {
          Depalpur:     { ur: 'دیپالپور' },
          Okara:        { ur: 'اوکاڑہ' },
          'Renala Khurd': { ur: 'رینالہ خورد' },
        },
      },
      Pakpattan: {
        ur: 'پاکپتن',
        tehsils: {
          Arifwala:  { ur: 'عارف والا' },
          Pakpattan: { ur: 'پاکپتن' },
        },
      },
      'Rahim Yar Khan': {
        ur: 'رحیم یار خان',
        tehsils: {
          'Khanpur Katora':          { ur: 'خان پور' },
          Liaqatpur:        { ur: 'لیاقت پور' },
          'Rahim Yar Khan': { ur: 'رحیم یار خان' },
          Sadiqabad:        { ur: 'صادق آباد' },
        },
      },
      Rajanpur: {
        ur: 'راجن پور',
        tehsils: {
          Jampur:   { ur: 'جام پور' },
          Rajanpur: { ur: 'راجن پور' },
          Rojhan:   { ur: 'روجھان' },
        },
      },
      Rawalpindi: {
        ur: 'راولپنڈی',
        tehsils: {
          'Rawalpindi Cantt':  { ur: 'راولپنڈی کینٹ' },
          'Rawalpindi City':   { ur: 'راولپنڈی شہر' },
          'Rawalpindi Saddar': { ur: 'راولپنڈی صدر' },
          'Gujjar Khan':       { ur: 'گوجر خان' },
          'Kallar Sayeddan':   { ur: 'کلر سیداں' },
          Kahuta:              { ur: 'کہوٹہ' },
          Taxila:              { ur: 'ٹیکسلا' },
        },
      },
      Sahiwal: {
        ur: 'ساہیوال',
        tehsils: {
          Chichawatni:  { ur: 'چیچہ وطنی' },
          Sahiwal:      { ur: 'ساہیوال' },
        },
      },
      Sargodha: {
        ur: 'سرگودھا',
        tehsils: {
          Bhalwal:    { ur: 'بھلوال' },
          Bhera:      { ur: 'بھیرہ' },
          'Kot Momin': { ur: 'کوٹ مومن' },
          Sahiwal:    { ur: 'ساہیوال' },
          Sargodha:   { ur: 'سرگودھا' },
          Sillanwali: { ur: 'سیلانوالی' },
          Shahpur:    { ur: 'شاہ پور' },
        },
      },
      Sheikhupura: {
        ur: 'شیخوپورہ',
        tehsils: {
          Ferozwala:   { ur: 'فیروزوالہ' },
          Muridke:     { ur: 'مریدکے' },
          Safdarabad:  { ur: 'صفدرآباد' },
          Sharaqpur:   { ur: 'شرق پور' },
          Sheikhupura: { ur: 'شیخوپورہ' },
        },
      },
      Sialkot: {
        ur: 'سیالکوٹ',
        tehsils: {
          Daska:    { ur: 'ڈسکہ' },
          Pasrur:   { ur: 'پسرور' },
          Sambrial: { ur: 'سمبڑیال' },
          Sialkot:  { ur: 'سیالکوٹ' },
        },
      },
      Talagang: {
        ur: 'تلاگنگ',
        tehsils: {
          Lawa:     { ur: 'لاوا' },
          'Multan Khurd': { ur: 'ملتان خورد' },
          Talagang: { ur: 'تلاگنگ' },
        },
      },
      Taunsa: {
        ur: 'تونسہ',
        tehsils: {
          'Koh-e-Suleman': { ur: 'کوہِ سلیمان' },
          Taunsa:        { ur: 'تونسہ' },
          Vehova:        { ur: 'ویہوا' },
        },
      },
      'Toba Tek Singh': {
        ur: 'ٹوبہ ٹیک سنگھ',
        tehsils: {
          Gojra:            { ur: 'گوجرہ' },
          Kamalia:          { ur: 'کمالیہ' },
          'Toba Tek Singh': { ur: 'ٹوبہ ٹیک سنگھ' },
          'Pir Mahal':      { ur: 'پیر محل' },
        },
      },
      Vehari: {
        ur: 'وہاڑی',
        tehsils: {
          Burewala: { ur: 'بورے والا' },
          Mailsi:   { ur: 'میلسی' },
          Vehari:   { ur: 'وہاڑی' },
        },
      },
      Wazirabad: {
        ur: 'وزیرآباد',
        tehsils: {
          'Alipur Chatha': { ur: 'علی پور چٹھہ' },
          Wazirabad:      { ur: 'وزیرآباد' },
        },
      },
    },
  },
  

  Sindh: {
    ur: 'سندھ',
    districts: {
      
      Badin: {
        ur: 'بدین',
        tehsils: {
          Badin:                { ur: 'بدین' },
          Matli:                { ur: 'مٹلی' },
          'Shaheed Fazil Rahu': { ur: 'شہید فاضل راہو' },
          Talhar:               { ur: 'تالہار' },
          'Tando Bago':         { ur: 'ٹنڈو باگو' },
        },
      },
    
      Dadu: {
        ur: 'دادو',
        tehsils: {
          Dadu:                  { ur: 'دادو' },
          Johi:                  { ur: 'جوہی' },
          'Khairpur Nathan Shah': { ur: 'خیرپور ناتھن شاہ' },
          Mehar:                 { ur: 'مہر' },
        },
      },

      Ghotki: {
        ur: 'گھوٹکی',
        tehsils: {
          Daharki:              { ur: 'دہرکی' },
          Ghotki:               { ur: 'گھوٹکی' },
          'Khan Garh (Khanpur)': { ur: 'کھان گڑھ (خان پور)' },
          'Mirpur Mathelo':     { ur: 'میرپور ماتھیلو' },
          Ubauro:               { ur: 'عبیدو' },
        },
      },
      
      Hyderabad: {
        ur: 'حیدرآباد',
        tehsils: {
          'Hyderabad City': { ur: 'حیدرآباد سٹی' },
          Hyderabad:        { ur: 'حیدرآباد' },
          Latifabad:        { ur: 'لطیف آباد' },
          Qasimabad:        { ur: 'قاسم آباد' },
        },
      },

      Jacobabad: {
        ur: 'جیکب آباد',
        tehsils: {
          'Garhi Khairo': { ur: 'گڑھی خیرو' },
          Jacobabad:      { ur: 'جیکب آباد' },
          Thul:           { ur: 'ٹھل' },
        },
      },
      
      Jamshoro: {
        ur: 'جامشورو',
        tehsils: {
          Kotri:            { ur: 'کوٹری' },
          Sehwan:           { ur: 'سیہون' },
          Manjhand:         { ur: 'منجھند' },
          'Thana Bulla Khan': { ur: 'تھانہ بلاخان' },
        },
      },

      'Karachi Central': {
        ur: 'کراچی وسطی',
        tehsils: {
          'Gulberg Town':       { ur: 'گلبرگ ٹاؤن' },
          'Liaquatabad Town':   { ur: 'لیاقت آباد ٹاؤن' },
          'New Karachi Town':   { ur: 'نیو کراچی ٹاؤن' },
          'North Nazimabad Town': { ur: 'نارتھ ناظم آباد ٹاؤن' },
          'Nazimabad Town':     { ur: 'ناظم آباد ٹاؤن' },
        },
      },

      'Karachi East': {
        ur: 'کراچی مشرقی',
        tehsils: {
          'Jamshed Town':    { ur: 'جمشید ٹاؤن' },
          'Ferozabad':       { ur: 'فیروز آباد' },
          'Gulshan-e-Iqbal': { ur: 'گلشن اقبال' },
          'Gulzar-e-Hijri':  { ur: 'گلزار ہجری' },
        },
      },
      
      'Karachi South': {
        ur: 'کراچی جنوبی',
        tehsils: {
          'Lyari Town':  { ur: 'لیاری ٹاؤن' },
          'Saddar Town': { ur: 'صدر ٹاؤن' },
          'Aram Bagh':   { ur: 'آرام باغ' },
          'Civil Line':  { ur: 'سول لائن' },
          'Garden':      { ur: 'گارڈن' },
        },
      },

      'Karachi West': {
        ur: 'کراچی مغربی',
        tehsils: {
          'Orangi Town':  { ur: 'اورنگی ٹاؤن' },
          'Manghopir':    { ur: 'منگھوپیر' },
          'Mominabad':    { ur: 'مومن آباد' },
        },
      },
      
      Kashmore: {
        ur: 'کشمور',
        tehsils: {
          Kandhkot:  { ur: 'کندھکوٹ' },
          Kashmore:  { ur: 'کشمور' },
          Tangwani:  { ur: 'تنگوانی' },
        },
      },

      Keamari: {
        ur: 'کیماڑی',
        tehsils: {
          'Keamari Town': { ur: 'کیماڑی ٹاؤن' },
          'Baldia Town':  { ur: 'بلدیہ ٹاؤن' },
          'S.I.T.E. Town': { ur: 'سائیٹ ٹاؤن' },
          Maripur:        { ur: 'ماری پور' },
        },
      },

      Khairpur: {
        ur: 'خیرپور',
        tehsils: {
          'Faiz Ganj': { ur: 'فیض گنج' },
          Gambat:      { ur: 'گمبٹ' },
          Khairpur:    { ur: 'خیرپور' },
          Kingri:      { ur: 'کنگری' },
          'Kot Diji':  { ur: 'کوٹ ڈیجی' },
          Nara:        { ur: 'نارہ' },
          'Sobho Dero': { ur: 'سوبھو ڈیرو' },
          'Thari Mirwah': { ur: 'تھری میرواہ' },
        },
      },

      Korangi: {
        ur: 'کورنگی',
        tehsils: {
          'Korangi Town':    { ur: 'کورنگی ٹاؤن' },
          'Landhi Town':     { ur: 'لانڈھی ٹاؤن' },
          'Shah Faisal Town': { ur: 'شاہ فیصل ٹاؤن' },
          'Model Colony':    { ur: 'ماڈل کالونی' },
        },
      },
      
      Larkana: {
        ur: 'لاڑکانہ',
        tehsils: {
          Bakrani:  { ur: 'بکرانی' },
          Dokri:    { ur: 'ڈوکری' },
          Larkana:  { ur: 'لاڑکانہ' },
          Ratodero: { ur: 'رتوڈیرو' },
        },
      },

      Malir: {
        ur: 'ملیر',
        tehsils: {
          'Bin Qasim':       { ur: 'بن قاسم' },
          'Gadap Town':      { ur: 'گڈاپ ٹاؤن' },
          Airport:           { ur: 'ایئرپورٹ' },
          'Ibrahim Hyderi':  { ur: 'ابراہیم حیدری' },
          'Murad Memon Goth': { ur: 'مراد میمن گوٹھ' },
          'Shah Mureed':     { ur: 'شاہ مرید' },
        },
      },

      Matiari: {
        ur: 'مٹیاری',
        tehsils: {
          Hala:      { ur: 'ہالہ' },
          Matiari:   { ur: 'مٹیاری' },
          Saeedabad: { ur: 'سعید آباد' },
        },
      },
      
      'Mirpur Khas': {
        ur: 'میرپور خاص',
        tehsils: {
          'Mirpur Khas':        { ur: 'میرپور خاص' },
          Digri:                { ur: 'دیگری' },
          'Kot Ghulam Mohammad': { ur: 'کوٹ غلام محمد' },
          Jhuddo:               { ur: 'جھڈو' },
          Sindhri:              { ur: 'سندھڑی' },
          'Hussain Bux Marri':  { ur: 'حسین بخش ماڑی' },
          Shujabad:             { ur: 'شجاع آباد' },
        },
      },
      
      'Naushahro Feroze': {
        ur: 'نوشہرو فیروز',
        tehsils: {
          Bhiria:           { ur: 'بھریہ' },
          Kandiaro:         { ur: 'کنڈیارو' },
          Mehrabpur:        { ur: 'محراب پور' },
          Moro:             { ur: 'مورو' },
          'Naushahro Feroze': { ur: 'نوشہرو فیروز' },
        },
      },
      
      'Qambar Shahdadkot': {
        ur: 'قمبر شہداد کوٹ',
        tehsils: {
          Mirokhan:       { ur: 'میرو خان' },
          Nasirabad:      { ur: 'نصیرآباد' },
          Qambar:         { ur: 'قمبر' },
          'Qubo Saeed Khan': { ur: 'قبو سعید خان' },
          Shahdadkot:     { ur: 'شہداد کوٹ' },
          'Sijawal Junejo': { ur: 'سجاول جونیجو' },
          Warah:          { ur: 'وارہ' },
        },
      },
      
      Sanghar: {
        ur: 'سانگھڑ',
        tehsils: {
          'Jam Nawaz Ali': { ur: 'جام نواز علی' },
          Khipro:          { ur: 'کھپرو' },
          Sanghar:         { ur: 'سانگھڑ' },
          Shahdadpur:      { ur: 'شہداد پور' },
          Sinjhoro:        { ur: 'سنجھورو' },
          'Tando Adam':    { ur: 'ٹنڈو آدم' },
        },
      },
      
      'Shaheed Benazirabad': {
        ur: 'شہید بے نظیرآباد',
        tehsils: {
          'Kazi Ahmed':       { ur: 'قاضی احمد' },
          Daur:               {ur: 'دور' },
          'Nawabshah':        { ur: 'نواب شاہ' },
          Sakrand:            { ur: 'سکرنڈ' },
        },
      },      

      Shikarpur: {
        ur: 'شکارپور',
        tehsils: {
          'Garhi Yasin': { ur: 'گڑھی یاسین' },
          Khanpur:       { ur: 'خان پور مہر' },
          Lakhi:         { ur: 'لاکھی' },
          Shikarpur:     { ur: 'شکارپور' },
        },
      },
      
      Sujawal: {
        ur: 'سجاول',
        tehsils: {
          Jati:            { ur: 'جاتی' },
          'Kharo Chan':    { ur: 'کھارو چھان' },
          'Mirpur Bathoro': { ur: 'میرپور بٹھورو' },
          'Shah Bandar':   { ur: 'شاہ بندر' },
          Sujawal:         { ur: 'سجاول' },
        },
      },

      Sukkur: {
        ur: 'سکھر',
        tehsils: {
          'New Sukkur': { ur: 'نیو سکھر' },
          'Pano Akil':  { ur: 'پانو عقیل' },
          Rohri:        { ur: 'روہڑی' },
          Salehpat:     { ur: 'صالح پت' },
          Sukkur:       { ur: 'سکھر' },
        },
      },

      'Tando Allahyar': {
        ur: 'ٹنڈو اللہ یار',
        tehsils: {
          Chamber:        { ur: 'چیمبر' },
          'Jhando Mari':  { ur: 'جھنڈو ماری' },
          'Tando Allahyar': { ur: 'ٹنڈو اللہ یار' },
        },
      },

      'Tando Muhammad Khan': {
        ur: 'ٹنڈو محمد خان',
        tehsils: {
          'Bulri Shah Karim': { ur: 'بولڑی شاہ کریم' },
          'Tando Ghulam Hyder': { ur: 'ٹنڈو غلام حیدر' },
          'Tando Muhammad Khan': { ur: 'ٹنڈو محمد خان' },
        },
      },

      Tharparkar: {
        ur: 'تھرپارکر',
        tehsils: {
          Chachro:      { ur: 'چھاچھرو' },
          Diplo:        { ur: 'ڈیپلو' },
          Dhali:        { ur: 'ڈھالی' },
          Islamkot:     { ur: 'اسلام کوٹ' },
          Kaloi:        { ur: 'کلوئی' },
          Mithi:        { ur: 'مٹھی' },
          'Nagar Parkar': { ur: 'نگر پارکر' },
        },
      },

      Thatta: {
        ur: 'ٹھٹہ',
        tehsils: {
          Ghorabari:    { ur: 'گھوڑا باری' },
          'Keti Bunder': { ur: 'کیٹی بندر' },
          'Mirpur Sakro': { ur: 'میرپور ساکرو' },
          Thatta:        { ur: 'ٹھٹہ' },
        },
      },

      Umerkot: {
        ur: 'عمرکوٹ',
        tehsils: {
          Umerkot:  { ur: 'عمرکوٹ' },
          Samaro:   { ur: 'سمارو' },
          Kunri:    { ur: 'کنری' },
          Pithoro:  { ur: 'پیٹھورو' },
        },
      },

    },
  },


  Balochistan: {
    ur: 'بلوچستان',
    districts: {

      Awaran: {
        ur: 'آواران',
        tehsils: {
          Awaran:    { ur: 'آواران' },
          Gishkaur:  { ur: 'گشکور' },
          'Jhal Jhao': { ur: 'جھل جھاؤ' },
          'Korak Jhao': { ur: 'کوراک جھاؤ' },
          Mashkai:   { ur: 'ماشکئی' },
        },
      },
      
      Barkhan: {
        ur: 'بارکھان',
        tehsils: {
          Barkhan: { ur: 'بارکھان' },
        },
      },

      Barshore: {
        ur: 'بارشور',
        tehsils: {
          Barshore: { ur: 'بارشور' },
        },
      },

      Chagai: {
        ur: 'چاغی',
        tehsils: {
          Amuri:      { ur: 'امری' },
          Chagai:     { ur: 'چاغی' },
          Chilgazi:   { ur: 'چلغزی' },
          Dalbandin:  { ur: 'دالبندین' },
          'Nok Kundi': { ur: 'نوک کنڈی' },
          Yakmach:    { ur: 'یکماچ' },
        },
      },

      Chaman: {
        ur: 'چمن',
        tehsils: {
          Chaman:        { ur: 'چمن' },
          'Chaman Saddar': { ur: 'چمن صدر' },
        },
      },
      
      'Dera Bugti': {
        ur: 'ڈیرہ بگٹی',
        tehsils: {
          Baiker:     { ur: 'بیکر' },
          Phelawagh:  { ur: 'پھیلاوغ' },
          'Dera Bugti': { ur: 'ڈیرہ بگٹی' },
          Sui:       { ur: 'سوی' },
        },
      },
      
      Duki: {
        ur: 'دوکی',
        tehsils: {
          Duki:          { ur: 'دوکی' },
          Luni:          { ur: 'لونی' },
          Talao:         { ur: 'تلاؤ' },
          'Thal Chutyali': { ur: 'تھل چوٹیالی' },
        },
      },
      
      Gwadar: {
        ur: 'گوادر',
        tehsils: {
          Gwadar: { ur: 'گوادر' },
          Jiwani: { ur: 'جیوانی' },
          Ormara: { ur: 'اورماڑہ' },
          Pasni:  { ur: 'پسنی' },
          Suntsar: { ur: 'سنتسر' },
        },
      },

      Harnai: {
        ur: 'ہرنائی',
        tehsils: {
          Harnai: { ur: 'ہرنائی' },
          Khost:  { ur: 'خوست' },
          Shahrig: { ur: 'شاہرگ' },
        },
      },

      Hub: {
        ur: 'حب',
        tehsils: {
          Gadani:   { ur: 'گڈانی' },
          Sonmiani: { ur: 'سونمیانی' },
          Hub:      { ur: 'حب' },
          Sakran:   { ur: 'سکران' },
          Dureji:   { ur: 'دریجی' },
        },
      },
      
      Jafarabad: {
        ur: 'جعفرآباد',
        tehsils: {
          Jafarabad: { ur: 'جعفرآباد' },
          Jhatpat:   { ur: 'جھٹ پٹ' },
        },
      },

      'Jhal Magsi': {
        ur: 'جھل مگسی',
        tehsils: {
          Gandavah:  { ur: 'گنداوہ' },
          'Jhal Magsi': { ur: 'جھل مگسی' },
          Mirpur:    { ur: 'میرپور' },
        },
      },

      Kachhi: {
        ur: 'کچھی',
        tehsils: {
          Balanari: { ur: 'بالاناری' },
          Bhag:     { ur: 'بھاگ' },
          Dhadar:   { ur: 'دھاڈر' },
          Khattan:  { ur: 'خطان' },
          Machh:    { ur: 'ماچھ' },
          Sani:     { ur: 'سانی' },
        },
      },

      Kalat: {
        ur: 'کلات',
        tehsils: {
          Gazg:      { ur: 'گازگ' },
          Johan:     { ur: 'جوہان' },
          Kalat:     { ur: 'کلات' },
          Mangocher: { ur: 'منگوچر' },
        },
      },
      
      Kech: {
        ur: 'کیچ',
        tehsils: {
          Balnigor: { ur: 'بالنیگور' },
          Buleda:   { ur: 'بلیدہ' },
          Dasht:    { ur: 'دشت' },
          Gayab:    { ur: 'غیاب' },
          Hoshab:   { ur: 'ہوشاب' },
          Mand:     { ur: 'مند' },
          Solband:  { ur: 'سولبند' },
          Turbat:   { ur: 'تربت' },
          Tump:     { ur: 'تمپ' },
          Zamuran:  { ur: 'زمران' },
        },
      },
      
      Kharan: {
        ur: 'خاران',
        tehsils: {
          Kharan:     { ur: 'خاران' },
          Patkain:    { ur: 'پٹکین' },
          'Sar Kharan': { ur: 'سر خاران' },
          Tohumulk:   { ur: 'تہوملک' },
        },
      },

      Khuzdar: {
        ur: 'خضدار',
        tehsils: {
          Khuzdar: { ur: 'خضدار' },
          Nal:   { ur: 'نال' },
          Wadh:  { ur: 'واڈھ' },
          Zehri:   { ur: 'زہری' },
          Baghbana: { ur: 'باغبانا' },
          Aranji:  { ur: 'ارانجی' },
          Gresha:  { ur: 'گریشہ' },
          Karkh:   { ur: 'کرخ' },
          Moola:   { ur: 'مولہ' },
          Ornach:  { ur: 'اورناچ' },
          Saroona: { ur: 'سرونہ' },
        },
      },

      Kohlu: {
        ur: 'کوہلو',
        tehsils: {
          Grisani:          { ur: 'گریسانی' },
          Kahan:            { ur: 'کہان' },
          Kohlu:            { ur: 'کوہلو' },
          Maiwand:          { ur: 'میوند' },
          'Shaheed Jahangirabad': { ur: 'شہید جہانگیرآباد' },
          Tamboo:           { ur: 'تمبو' },
        },
      },

      Lasbela: {
        ur: 'لسبیلہ',
        tehsils: {
          Bela:   { ur: 'بیلہ' },
          Kanraj: { ur: 'کنراج' },
          Lakhra: { ur: 'لاکھڑا' },
          Liari:  { ur: 'لیاری' },
          Uthal:  { ur: 'اوتھل' },
        },
      },
      
      Loralai: {
        ur: 'لورالائی',
        tehsils: {
          Bori:    { ur: 'بوری' },
          Mekhtar: { ur: 'مختار' },
        },
      },

      Mastung: {
        ur: 'مستونگ',
        tehsils: {
          Dasht:      { ur: 'دشت' },
          Kardigap:   { ur: 'کردگاپ' },
          'Khad Kocha': { ur: 'خاد کوچہ' },
          Mastung:    { ur: 'مستونگ' },
        },
      },
    
      Musakhel: {
        ur: 'موسیٰ خیل',
        tehsils: {
          Darug:         { ur: 'داروگ' },
          Kingri:        { ur: 'کنگری' },
          Musakhel:      { ur: 'موسیٰ خیل' },
          'Tiyar Essot': { ur: 'تیار ایسوٹ' },
          Toisar:        { ur: 'توئسر' },
          'Zimri Plaseen': { ur: 'زمری پلاسین' },
        },
      },

      Nasirabad: {
        ur: 'نصیرآباد',
        tehsils: {
          'Baba Kot':          { ur: 'بابا کوٹ' },
          Chattar:             { ur: 'چھتر' },
          'Dera Murad Jamali': { ur: 'ڈیرہ مراد جمالی' },
          Landhi:              { ur: 'لانڈھی' },
          'Meer Hassan':       { ur: 'میر حسن' },
          Tamboo:              { ur: 'تمبو' },
        },
      },

      Nushki: {
        ur: 'نوشکی',
        tehsils: {
          Dak:    { ur: 'ڈاک' },
          Nushki: { ur: 'نوشکی' },
        },
      },
      
      Panjgur: {
        ur: 'پنجگور',
        tehsils: {
          Gichk:   { ur: 'گچک' },
          Gowargo: { ur: 'گوارگو' },
          Kallag:  { ur: 'کلاگ' },
          Panjgur: { ur: 'پنجگور' },
          Paroom:  { ur: 'پاروم' },
        },
      },
      
      Pishin: {
        ur: 'پشین',
        tehsils: {
          Bostan:    { ur: 'بوستان' },
          Hurramzai: { ur: 'حرامزئی' },
          Khanozai:  { ur: 'خانوزئی' },
          Pishin:    { ur: 'پشین' },
          Saranan:   { ur: 'سرانان' },
        },
      },
      
      'Qilla Abdullah': {
        ur: 'قلعہ عبداللہ',
        tehsils: {
          Dobandi:          { ur: 'ڈوبنڈی' },
          Gulistan:         { ur: 'گلستان' },
          'Qilla Abdullah': { ur: 'قلعہ عبداللہ' },
        },
      },

      'Qilla Saifullah': {
        ur: 'قلعہ سیف اللہ',
        tehsils: {
          Badini:           { ur: 'بدینی' },
          'Kan Mehtarzai':  { ur: 'کان مہتر زئی' },
          'Qilla Saifullah': { ur: 'قلعہ سیف اللہ' },
          Loiband:          { ur: 'لوئی بند' },
          'Muslim Bagh':    { ur: 'مسلم باغ' },
          Shinki:           { ur: 'شنکئی' },
        },
      },

      'Quetta': {
        ur: 'کوئٹہ',
        tehsils: {
          Chiltan:       { ur: 'چلتن' },
          Sariab:        { ur: 'سریاب' },
          Kuchlak:        { ur: 'کچلاک' },
          'Quetta Saddar': { ur: 'کوئٹہ صدر' },
          Zarghoon:      { ur: 'زرغون' },
          Punjpai:       { ur: 'پنجپائی' },
        },
      },
      
      'Shaheed Sikandarabad (Surab)': {
        ur:'(سراب)شہید سکندرآباد',
        tehsils: {
          'Dasht e Goran': { ur: 'دشت گوران' },
          Gidder:          { ur: 'گیدر' },
          'Shaheed Meharabad Zehri': { ur: 'شہید مہرآباد زہری' },
          Surab:           { ur: 'سراب' },
        },
      },
      
      Sherani: {
        ur: 'شیرانی',
        tehsils: {
          Sherani: { ur: 'شیرانی' },
        },
      },

      Sibi: {
        ur: 'سبی',
        tehsils: {
          Kutmandai: { ur: 'کٹ منڈئی' },
          Lehri:     { ur: 'لہری' },
          Sangan:    { ur: 'سنگان' },
          Sibi:      { ur: 'سبی' },
        },
      },
      
      Sohbatpur: {
        ur: 'صحبت پور',
        tehsils: {
          Faridabad:              { ur: 'فریدآباد' },
          Hayrvi:                 { ur: 'ہیروی' },
          Manjipur:               { ur: 'منجی پور' },
          Panhwar:                { ur: 'پنہور' },
          'Saeed Muhammad Kanrani': { ur: 'سعید محمد کنرانی' },
          Sohbatpur:              { ur: 'صحبت پور' },
        },
      },
      
      Taftan: {
        ur: 'تفتان',
        tehsils: {
          Mashkel:  { ur: 'ماشکیل' },
          'Nok Kundi': { ur: 'نوک کنڈی' },
          Taftan:   { ur: 'تفتان' },
        },
      },

      'Usta Muhammad': {
        ur: 'اوستہ محمد',
        tehsils: {
          Gandakha:        { ur: 'گنڈاکھا' },
          'Usta Muhammad': { ur: 'اوستہ محمد' },
        },
      },
      
      Wadh: {
        ur: 'واڈھ',
        tehsils: {
          Nal:    { ur: 'نال' },
          Ornach: { ur: 'اورناچ' },
          Wadh:   { ur: 'واڈھ' },
        },
      },

      Washuk: {
        ur: 'واشک',
        tehsils: {
          Besima:   { ur: 'بیسیمہ' },
          Mashkel:  { ur: 'ماشکیل' },
          Nag:      { ur: 'ناگ' },
          Shahgori: { ur: 'شاہ گوری' },
          Washuk:   { ur: 'واشک' },
        },
      },
      
      Ziarat: {
        ur: 'زیارت',
        tehsils: {
          Sinjawi: { ur: 'سنجاوی' },
          Ziarat:  { ur: 'زیارت' },
        },
      },

      Zhob: {
        ur: 'ژوب',
        tehsils: {
          Ashwat:          { ur: 'اشوت' },
          Kashatu:         { ur: 'کشاتو' },
          'Qamar Din Karez': { ur: 'قمرالدین کاریز' },
          Sambaza:         { ur: 'سنبازہ' },
          Zhob:            { ur: 'ژوب' },
        },
      },

    },
  },


  'Khyber Pakhtunkhwa': {
    ur: 'خیبر پختونخوا',
    districts: {

      Abbottabad: {
        ur: 'ایبٹ آباد',
        tehsils: {
          Abbottabad:      { ur: 'ایبٹ آباد' },
          Havelian:        { ur: 'حویلیاں' },
          Lora:            { ur: 'لورہ' },
          'Lower Tanawal': { ur: 'لوئر تناول' },
        },
      },

      Allai: {
        ur: 'الائی',
        tehsils: {
          Allai: { ur: 'الائی' },
        },
      },

      Bajaur: {
        ur: 'باجوڑ',
        tehsils: {
          'Bar Chamarkand': { ur: 'بار چمارکنڈ' },
          Barang:           { ur: 'برنگ' },
          'Khar Bajaur':    { ur: 'خار باجوڑ' },
          Mamund:           { ur: 'ممونڈ' },
          Nawagai:          { ur: 'نواگئی' },
          Salarzai:         { ur: 'سالارزئی' },
          'Utman Khel':     { ur: 'عثمان خیل' },
        },
      },

      Bannu: {
        ur: 'بنوں',
        tehsils: {
          'Baka Khel': { ur: 'باکا خیل' },
          Bannu:       { ur: 'بنوں' },
          Domel:       { ur: 'ڈومیل' },
          Kakki:       { ur: 'کاکی' },
          Miryan:      { ur: 'میریاں' },
          Wazir:       { ur: 'وزیر' },
        },
      },

      Batagram: {
        ur: 'بٹگرام',
        tehsils: {
          Batagram: { ur: 'بٹگرام' },
        },
      },

      Buner: {
        ur: 'بونیر',
        tehsils: {
          Chagharzai: { ur: 'چغرزئی' },
          Daggar:     { ur: 'ڈگر' },
          Gadezai:    { ur: 'گادیزئی' },
          Gagra:      { ur: 'گگڑہ' },
          'Khudu Khel': { ur: 'خودو خیل' },
          Mandanr:    { ur: 'منڈانڑ' },
        },
      },

      'Central Dir': {
        ur: 'وسطی دیر',
        tehsils: {
          'Lar Jam': { ur: 'لار جام' },
          Wari:      { ur: 'واری' },
          'Akhagram Karo': { ur: 'اخگرم کارو' },
          'Nehag Dara': { ur: 'نہگ درہ' },
          'Sahib Abad': { ur: 'صاحب آباد' },
        },
      },

      Charsadda: {
        ur: 'چارسدہ',
        tehsils: {
          Charsadda: { ur: 'چارسدہ' },
          Shabqadar: { ur: 'شبقدر' },
          Tangi:     { ur: 'تنگی' },
        },
      },

      'Dera Ismail Khan': {
        ur: 'ڈیرہ اسماعیل خان',
        tehsils: {
          Daraban:         { ur: 'درابن' },
          'Dera Ismail Khan': { ur: 'ڈیرہ اسماعیل خان' },
          Drazanda:        { ur: 'ڈرازندہ' },
          Kulachi:         { ur: 'کلاچی' },
          Paharpur:        { ur: 'پہاڑ پور' },
          Paniala:         { ur: 'پنیالہ' },
          Paroa:           { ur: 'پروا' },
        },
      },

      Hangu: {
        ur: 'ہنگو',
        tehsils: {
          Doaba: { ur: 'دوآبہ' },
          Hangu: { ur: 'ہنگو' },
          Tall:  { ur: 'ٹال' },
        },
      },

      Haripur: {
        ur: 'ہری پور',
        tehsils: {
          Ghazi:   { ur: 'غازی' },
          Haripur: { ur: 'ہری پور' },
          Khanpur: { ur: 'خانپور' },
        },
      },

      Karak: {
        ur: 'کرک',
        tehsils: {
          'Banda Daud Shah': { ur: 'بندہ داؤد شاہ' },
          Karak:             { ur: 'کرک' },
          'Takht-e-Nasrati': { ur: 'تخت ناصرتی' },
        },
      },

      Khyber: {
        ur: 'خیبر',
        tehsils: {
          'Bagh Maidan':      { ur: 'باغ میدان' },
          Bara:               { ur: 'بارہ' },
          'Bazar Zakha Khel': { ur: 'بازار زاخہ خیل' },
          'Fort Salop':       { ur: 'فورٹ سلوپ' },
          Jamrud:             { ur: 'جمرود' },
          'Landi Kotal':      { ur: 'لنڈی کوتل' },
          'Mula Gori':        { ur: 'ملا گوری' },
          'Painda Cheena':    { ur: 'پائندہ چینہ' },
        },
      },

      Kohat: {
        ur: 'کوہاٹ',
        tehsils: {
          'Dara Adam Khel': { ur: 'درہ آدم خیل' },
          Gumbat:           { ur: 'گمبٹ' },
          Kohat:            { ur: 'کوہاٹ' },
          Lachi:            { ur: 'لاچی' },
        },
      },

      'Kolai-Palas': {
        ur: 'کولئی پالس',
        tehsils: {
          'Kolai (Bataira)': { ur: 'کولئی (بتیرہ)' },
          Palas:             { ur: 'پالس' },
        },
      },

      Kurram: {
        ur: 'کرم',
        tehsils: {
          'Central Kurram': { ur: 'وسطی کرم' },
          'Lower Kurram':   { ur: 'زیریں کرم' },
          'Upper Kurram':   { ur: 'بالائی کرم' },
        },
      },

      'Lakki Marwat': {
        ur: 'لکی مروت',
        tehsils: {
          Bettani:       { ur: 'بیٹنی' },
          'Ghazni Khel': { ur: 'غزنی خیل' },
          'Lakki Marwat': { ur: 'لکی مروت' },
          'Sari Naurang': { ur: 'سری نورنگ' },
        },
      },

      'Lower Chitral': {
        ur: 'زیریں چترال',
        tehsils: {
          Chitral: { ur: 'چترال' },
          Drosh:   { ur: 'دروش' },
        },
      },

      'Lower Dir': {
        ur: 'زیریں دیر',
        tehsils: {
          Adenzai:     { ur: 'آدن زئی' },
          Balambat:    { ur: 'بالمبٹ' },
          Khal:        { ur: 'خال' },
          'Lal Qilla': { ur: 'لال قلعہ' },
          Munda:       { ur: 'مونڈہ' },
          'Samar Bagh': { ur: 'سمار باغ' },
          Timergara:   { ur: 'تیمرگرہ' },
        },
      },

      'Lower Kohistan': {
        ur: 'زیریں کوہستان',
        tehsils: {
          Bankad: { ur: 'بنکاڈ' },
          Pattan: { ur: 'پٹن' },
        },
      },

      'Lower South Waziristan': {
        ur: 'زیریں جنوبی وزیرستان',
        tehsils: {
          Birmil:      { ur: 'برمل' },
          Shakai:      { ur: 'شکئی' },
          'Toi Khulla': { ur: 'توئی خلہ' },
          Wana:        { ur: 'وانہ' },
        },
      },

      Malakand: {
        ur: 'مالاکنڈ',
        tehsils: {
          'Sam Ranizai':  { ur: 'سام رانی زئی' },
          'Swat Ranizai': { ur: 'سوات رانی زئی' },
          'Thana Baizai': { ur: 'تھانہ بیزئی' },
          'Utman Khel':   { ur: 'عثمان خیل' },
        },
      },

      Mansehra: {
        ur: 'مانسہرہ',
        tehsils: {
          'Baffa Pakhal': { ur: 'بافہ پکھال' },
          Balakot:        { ur: 'بالاکوٹ' },
          Darband:        { ur: 'دربند' },
          Mansehra:       { ur: 'مانسہرہ' },
          Oghi:           { ur: 'اوگی' },
          Tanawal:        { ur: 'تناول' },
        },
      },

      Mardan: {
        ur: 'مردان',
        tehsils: {
          'Garhi Kapura': { ur: 'گڑھی کپورہ' },
          Katlang:        { ur: 'کٹلنگ' },
          Mardan:         { ur: 'مردان' },
          Rustam:         { ur: 'رستم' },
          'Takht Bhai':   { ur: 'تخت بھائی' },
        },
      },

      Mohmand: {
        ur: 'مہمند',
        tehsils: {
          'Ambar Utman Khel': { ur: 'امبر عثمان خیل' },
          'Halim Zai':        { ur: 'حلیم زئی' },
          Pindiali:           { ur: 'پنڈیالی' },
          'Pran Ghar':        { ur: 'پران گھر' },
          Safi:               { ur: 'صافی' },
          'Upper Mohmand':    { ur: 'بالائی مہمند' },
          'Yake Ghund':       { ur: 'یکہ غند' },
        },
      },

      'North Waziristan': {
        ur: 'شمالی وزیرستان',
        tehsils: {
          'Datta Khel':  { ur: 'دتہ خیل' },
          Dossali:       { ur: 'دوسالی' },
          Gharyum:       { ur: 'غاریوم' },
          'Ghulam Khan': { ur: 'غلام خان' },
          'Mir Ali':     { ur: 'میر علی' },
          'Miran Shah':  { ur: 'میران شاہ' },
          Razmak:        { ur: 'رزمک' },
          Shewa:         { ur: 'شیوا' },
          Spinwam:       { ur: 'اسپین وام' },
        },
      },

      Nowshera: {
        ur: 'نوشہرہ',
        tehsils: {
          Jehangira: { ur: 'جہانگیرہ' },
          Nowshera:  { ur: 'نوشہرہ' },
          Pabbi:     { ur: 'پبی' },
        },
      },

      Orakzai: {
        ur: 'اورکزئی',
        tehsils: {
          'Central Orakzai': { ur: 'وسطی اورکزئی' },
          'Ismail Zai':      { ur: 'اسماعیل زئی' },
          'Lower Orakzai':   { ur: 'زیریں اورکزئی' },
          'Upper Orakzai':   { ur: 'بالائی اورکزئی' },
        },
      },

      Peshawar: {
        ur: 'پشاور',
        tehsils: {
          Badhber:     { ur: 'بڈھ بیر' },
          Chamkani:    { ur: 'چمکنی' },
          'Hassan Khel': { ur: 'حسن خیل' },
          Mathra:      { ur: 'ماترہ' },
          'Peshawar City': { ur: 'پشاور شہر' },
          Peshtakhara: { ur: 'پشت خرہ' },
          'Shah Alam':  { ur: 'شاہ عالم' },
        },
      },

      Shangla: {
        ur: 'شانگلہ',
        tehsils: {
          Alpuri:   { ur: 'الپوری' },
          Bisham:   { ur: 'بشام' },
          Chakesar: { ur: 'چکیسر' },
          Makhuzai: { ur: 'مخوزئی' },
          Martung:  { ur: 'مارتنگ' },
          Puran:    { ur: 'پوران' },
          Shahpur:  { ur: 'شاہ پور' },
        },
      },

      Swabi: {
        ur: 'صوابی',
        tehsils: {
          Lahor:  { ur: 'لہور' },
          Razar:  { ur: 'رزار' },
          Swabi:  { ur: 'صوابی' },
          Topi:   { ur: 'ٹوپی' },
        },
      },

      Swat: {
        ur: 'سوات',
        tehsils: {
          Babuzai:  { ur: 'بابوزئی' },
          Barikot:  { ur: 'باریکوٹ' },
          Charbagh: { ur: 'چارباغ' },
          Kabal:    { ur: 'کبل' },
        },
      },

      Tank: {
        ur: 'ٹانک',
        tehsils: {
          Jandola: { ur: 'جنڈولہ' },
          Tank:    { ur: 'ٹانک' },
        },
      },

      Torghar: {
        ur: 'تورغر',
        tehsils: {
          'Daur Maira':        { ur: 'داؤر مئیرہ' },
          Judba:               { ur: 'جوڈبہ' },
          'Khander Hassanzai': { ur: 'کھنڈر حسن زئی' },
        },
      },

      'Upper Chitral': {
        ur: 'بالائی چترال',
        tehsils: {
          Buni:   { ur: 'بونی' },
          Mastuj: { ur: 'مستوج' },
          Mulkoh: { ur: 'مولکہو' },
          Torkoh: { ur: 'ترکہو' },
        },
      },

      'Upper Dir': {
        ur: 'بالائی دیر',
        tehsils: {
          Barawal:   { ur: 'بڑاول' },
          Dir:       { ur: 'دیر' },
          Kalkot:    { ur: 'کالکوٹ' },
          Sharingal: { ur: 'شرینگل' },
        },
      },

      'Upper Kohistan': {
        ur: 'بالائی کوہستان',
        tehsils: {
          Dassu:        { ur: 'داسو' },
          'Harban Basha': { ur: 'ہربن باشا' },
          Kandia:       { ur: 'کندیا' },
          Seo:          { ur: 'سیو' },
        },
      },

      'Upper South Waziristan': {
        ur: 'بالائی جنوبی وزیرستان',
        tehsils: {
          Ladha:     { ur: 'لدھہ' },
          Makin:     { ur: 'مکین' },
          Sararogha: { ur: 'سرارغہ' },
          Sarwakai:  { ur: 'سروکئی' },
          Shaktoi:   { ur: 'شکتوئی' },
          Shawal:    { ur: 'شاول' },
          Tiarza:    { ur: 'تیارزہ' },
        },
      },

      'Upper Swat': {
        ur: 'بالائی سوات',
        tehsils: {
          Behrain:       { ur: 'بحرین' },
          'Khwaza Khela': { ur: 'خوازہ خیلہ' },
          Matta:         { ur: 'مٹہ' },
        },
      },

    },
  },


  'Gilgit-Baltistan': {
    ur: 'گلگت بلتستان',
    districts: {

      Astore: {
        ur: 'استور',
        tehsils: {
          Astore: { ur: 'استور' },
          Shounter: { ur: 'شونٹر' },
        },
      },

      Diamer: {
        ur: 'دیامر',
        tehsils: {
          Babusar: { ur: 'بابوسر' },
          Chilas: { ur: 'چلاس' },
          Darel: { ur: 'دارل' },
          Goharabad: { ur: 'گوہرآباد' },
          Tangir: { ur: 'تنگیر' },
        },
      },

      Ghanche: {
        ur: 'گانچھے',
        tehsils: {
          Daghoni: { ur: 'دغونی' },
          Khaplu: { ur: 'خپلو' },
          Mashabrum: { ur: 'ماشابرم' },
          Chorbat: { ur: 'چوربٹ' },
          Keris: { ur: 'کیریس' },
          Haldi: { ur: 'ہلدی' },
        },
      },

      Ghizer: {
        ur: 'غذر',
        tehsils: {
          Gupis: { ur: 'گوپس' },
          Punial: { ur: 'پنیال' },
          Yasin: { ur: 'یاسین' },
          Phander: { ur: 'پھنڈر' },
          Ishkoman: { ur: 'اشکومان' },
        },
      },

      Gilgit: {
        ur: 'گلگت',
        tehsils: {
          Gilgit: { ur: 'گلگت' },
          Danyor: { ur: 'دانیور' },
          Jaglot: { ur: 'جوگلوٹ' },
        },
      },

      Hunza: {
        ur: 'ہنزہ',
        tehsils: {
          Aliabad: { ur: 'علی آباد' },
          Gojal: { ur: 'گوجال' },
          Shinaki: { ur: 'شیناکی' },
        },
      },

      Kharmang: {
        ur: 'کھرمینگ',
        tehsils: {
          Kharmang: { ur: 'کھرمینگ' },
        },
      },

      Shigar: {
        ur: 'شگر',
        tehsils: {
          Shigar: { ur: 'شگر' },
          Gulabpur: { ur: 'گلاب پور' },
        },
      },

      Skardu: {
        ur: 'سکردو',
        tehsils: {
          Gultari: { ur: 'گلتری' },
          Skardu: { ur: 'سکردو' },
          Rondu: { ur: 'روندو' },
          Gamba: { ur: 'گمبا' },
        },
      },




    },
  },

  
  'Azad Kashmir': {
    ur: 'آزاد کشمیر',
    districts: {

      Bagh: {
        ur: 'باغ',
        tehsils: {
          Bagh: { ur: 'باغ' },
          Birpani: { ur: 'بیرپانی' },
          Dhirkot: { ur: 'دھیرکوٹ' },
          'Hari Ghel': { ur: 'ہری گھیل' },
          Rera: { ur: 'ریرا' },
        },
      },

      Bhimber: {
        ur: 'بھمبر',
        tehsils: {
          Barnala: { ur: 'برنالہ' },
          Bhimber: { ur: 'بھمبر' },
          Samahni: { ur: 'سماہنی' },
        },
      },

      'Hattian Bala': {
        ur: 'ہٹیاں بالا',
        tehsils: {
          Chakar: { ur: 'چکر' },
          'Hattian Bala': { ur: 'ہٹیاں بالا' },
          Leepa: { ur: 'لیپا' },
        },
      },

      Haveli: {
        ur: 'حویلی',
        tehsils: {
          Haveli: { ur: 'حویلی' },
          Khurshidabad: { ur: 'خورشید آباد' },
          Mumtazabad: { ur: 'ممتاز آباد' },
        },
      },

      Kotli: {
        ur: 'کوٹلی',
        tehsils: {
          Charhoi: { ur: 'چڑھوئی' },
          'Duliah Jattan': { ur: 'ڈولیہ جٹاں' },
          Fatehpur: { ur: 'فتح پور' },
          Khuiratta: { ur: 'خوئیرٹہ' },
          Kotli: { ur: 'کوٹلی' },
          Sehnsa: { ur: 'سہنسہ' },
        },
      },

      Mirpur: {
        ur: 'میرپور',
        tehsils: {
          Dadyal: { ur: 'ڈڈیال' },
          Islamgarh: { ur: 'اسلام گڑھ' },
          Mirpur: { ur: 'میرپور' },
        },
      },

      Muzaffarabad: {
        ur: 'مظفرآباد',
        tehsils: {
          Muzaffarabad: { ur: 'مظفرآباد' },
          Nasirabad: { ur: 'نصیرآباد' },
        },
      },

      Neelum: {
        ur: 'نیلم',
        tehsils: {
          Athmuqam: { ur: 'اٹھ مقام' },
          Sharda: { ur: 'شاردہ' },
        },
      },

      Poonch: {
        ur: 'پونچھ',
        tehsils: {
          Abbaspur: { ur: 'عباسپور' },
          Hajira: { ur: 'حجیرہ' },
          Rawalakot: { ur: 'راولا کوٹ' },
          Thorar: { ur: 'تھوڑر' },
        },
      },

      Sudhnoti: {
        ur: 'سدھنوتی',
        tehsils: {
          Mang: { ur: 'منگ' },
          Pallandri: { ur: 'پلندری' },
          'Tarar Khel': { ur: 'تارڑ خیل' },
          Balouch: { ur: 'بلوچ' },
        },
      },
    },
  },
};
