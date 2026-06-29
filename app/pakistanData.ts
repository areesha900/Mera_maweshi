type TehsilData = {
  ur: string;
  ucs: string[];
  ucs_ur: string[];
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
          Attock:       { ur: 'اٹک',         ucs: ['Attock City', 'Campbellpur', 'Dakhli Gujjar', 'Fatehjang Road'], ucs_ur: ['اٹک شہر', 'کیمبل پور', 'دخلی گجر', 'فتح جنگ روڈ'] },
          Hassanabdal:  { ur: 'حسن ابدال',   ucs: ['Hassanabdal City', 'Burhan', 'Hasan Abdal Cantt', 'Khanpur'], ucs_ur: ['حسن ابدال شہر', 'برہان', 'حسن ابدال کینٹ', 'خانپور'] },
          'Fateh Jang': { ur: 'فتح جنگ',     ucs: ['Fateh Jang City', 'Gandian', 'Hazro Road', 'Mohri'], ucs_ur: ['فتح جنگ شہر', 'گندیاں', 'حضرو روڈ', 'موہڑی'] },
          Jand:         { ur: 'جنڈ',          ucs: ['Jand City', 'Bahtar', 'Pindigheb Road', 'Rustam'], ucs_ur: ['جنڈ شہر', 'بہتر', 'پنڈی گھیب روڈ', 'رستم'] },
          'Pindi Gheb': { ur: 'پنڈی گھیب',   ucs: ['Pindi Gheb City', 'Chammb', 'Harnoli', 'Khanpur Hoti'], ucs_ur: ['پنڈی گھیب شہر', 'چھمب', 'ہرنولی', 'خانپور ہوتی'] },
          Hazro:        { ur: 'حضرو',         ucs: ['Hazro City', 'Bahtar', 'Hasan Abdal Road', 'Nathia Gali Road'], ucs_ur: ['حضرو شہر', 'بہتر', 'حسن ابدال روڈ', 'ناتھیا گلی روڈ'] },
        },
      },
      Bahawalnagar: {
        ur: 'بہاولنگر',
        tehsils: {
          Bahawalnagar: { ur: 'بہاولنگر', ucs: ['Bahawalnagar City', 'Chak No. 1 WB', 'Chak No. 5 WB', 'Chak No. 10 WB'], ucs_ur: ['بہاولنگر شہر', 'چک نمبر 1 ڈبلیو بی', 'چک نمبر 5 ڈبلیو بی', 'چک نمبر 10 ڈبلیو بی'] },
          Fortabbas:    { ur: 'فورٹ عباس',   ucs: ['Fort Abbas City', 'Chak No. 1 E', 'Chak No. 10 E', 'Hasilpur Road'], ucs_ur: ['فورٹ عباس شہر', 'چک نمبر 1 ای', 'چک نمبر 10 ای', 'حاصل پور روڈ'] },
          Chishtian:    { ur: 'چشتیاں',      ucs: ['Chishtian City', 'Chak No. 73 E', 'Chak No. 80 E', 'Minchinabad Road'], ucs_ur: ['چشتیاں شہر', 'چک نمبر 73 ای', 'چک نمبر 80 ای', 'منچن آباد روڈ'] },
          Haroonabad:   { ur: 'ہارون آباد',  ucs: ['Haroonabad City', 'Chak No. 24 WB', 'Chak No. 35 WB', 'Chak No. 50 WB'], ucs_ur: ['ہارون آباد شہر', 'چک نمبر 24 ڈبلیو بی', 'چک نمبر 35 ڈبلیو بی', 'چک نمبر 50 ڈبلیو بی'] },
          Minchinabad:  { ur: 'منچن آباد',   ucs: ['Minchinabad City', 'Chak No. 1 NB', 'Chak No. 5 NB', 'Chak No. 15 NB'], ucs_ur: ['منچن آباد شہر', 'چک نمبر 1 این بی', 'چک نمبر 5 این بی', 'چک نمبر 15 این بی'] },
        },
      },
      Bahawalpur: {
        ur: 'بہاولپور',
        tehsils: {
          'Bahawalpur City':    { ur: 'بہاولپور شہر',       ucs: ['Bahawalpur City', 'Chak No. 1 WB', 'Chak No. 5 WB', 'Model Town'], ucs_ur: ['بہاولپور شہر', 'چک نمبر 1 ڈبلیو بی', 'چک نمبر 5 ڈبلیو بی', 'ماڈل ٹاؤن'] },
          'Bahawalpur Saddar':  { ur: 'بہاولپور صدر',       ucs: ['Bahawalpur Saddar', 'Cantt', 'Civil Lines', 'Satellite Town'], ucs_ur: ['بہاولپور صدر', 'کینٹ', 'سول لائنز', 'سیٹلائٹ ٹاؤن'] },
          'Ahmadpur East':      { ur: 'احمد پور شرقیہ',     ucs: ['Ahmadpur East City', 'Chak No. 30 E', 'Chak No. 32 E', 'Chak No. 35 E'], ucs_ur: ['احمد پور شرقیہ شہر', 'چک نمبر 30 ای', 'چک نمبر 32 ای', 'چک نمبر 35 ای'] },
          Hasilpur:             { ur: 'حاصل پور',            ucs: ['Hasilpur City', 'Chak No. 1 P', 'Chak No. 10 P', 'Chak No. 20 P'], ucs_ur: ['حاصل پور شہر', 'چک نمبر 1 پی', 'چک نمبر 10 پی', 'چک نمبر 20 پی'] },
          Yazman:               { ur: 'یزمان',               ucs: ['Yazman City', 'Chak No. 57 WB', 'Chak No. 65 WB', 'Chak No. 73 WB'], ucs_ur: ['یزمان شہر', 'چک نمبر 57 ڈبلیو بی', 'چک نمبر 65 ڈبلیو بی', 'چک نمبر 73 ڈبلیو بی'] },
          'Khairpur Tamewali':  { ur: 'خیرپور تامے والی',   ucs: ['Khairpur Tamewali City', 'Chak No. 1', 'Chak No. 5', 'Chak No. 10'], ucs_ur: ['خیرپور تامے والی شہر', 'چک نمبر 1', 'چک نمبر 5', 'چک نمبر 10'] },
        },
      },
      Bhakkar: {
        ur: 'بھکر',
        tehsils: {
          Bhakkar:     { ur: 'بھکر',      ucs: ['Bhakkar City', 'Chak No. 1', 'Chak No. 5', 'Chak No. 10'], ucs_ur: ['بھکر شہر', 'چک نمبر 1', 'چک نمبر 5', 'چک نمبر 10'] },
          'Darya Khan': { ur: 'دریا خان', ucs: ['Darya Khan City', 'Chak No. 1 TDA', 'Chak No. 5 TDA', 'Chak No. 10 TDA'], ucs_ur: ['دریا خان شہر', 'چک نمبر 1 ٹی ڈی اے', 'چک نمبر 5 ٹی ڈی اے', 'چک نمبر 10 ٹی ڈی اے'] },
          Mankera:      { ur: 'منکیرہ',   ucs: ['Mankera City', 'Chak No. 1', 'Chak No. 5', 'Kundian'], ucs_ur: ['منکیرہ شہر', 'چک نمبر 1', 'چک نمبر 5', 'کندیاں'] },
          'Kalur Kot':  { ur: 'کلور کوٹ', ucs: ['Kalur Kot City', 'Chak No. 1', 'Chak No. 5', 'Chak No. 10'], ucs_ur: ['کلور کوٹ شہر', 'چک نمبر 1', 'چک نمبر 5', 'چک نمبر 10'] },
        },
      },
      Chakwal: {
        ur: 'چکوال',
        tehsils: {
          Chakwal:            { ur: 'چکوال',          ucs: ['Chakwal City', 'Dhudial', 'Kalar Kahar Road', 'Tilla Jogian'], ucs_ur: ['چکوال شہر', 'ڈھوڈیال', 'کلر کہار روڈ', 'تلہ جوگیاں'] },
          'Choa Saidan Shah': { ur: 'چوہا سیدن شاہ', ucs: ['Choa Saidan Shah City', 'Bhoun', 'Lehri', 'Pail'], ucs_ur: ['چوہا سیدن شاہ شہر', 'بھون', 'لہری', 'پیل'] },
          'Kallar Kahar':     { ur: 'کلر کہار',       ucs: ['Kallar Kahar City', 'Chhibi', 'Choah', 'Thoa'], ucs_ur: ['کلر کہار شہر', 'چھبی', 'چوآ', 'تھوآ'] },
        },
      },
      Chiniot: {
        ur: 'چنیوٹ',
        tehsils: {
          Chiniot: { ur: 'چنیوٹ', ucs: ['Chiniot City', 'Chak No. 1', 'Chak No. 5', 'Rabwah'], ucs_ur: ['چنیوٹ شہر', 'چک نمبر 1', 'چک نمبر 5', 'ربوہ'] },
          Lalian:  { ur: 'لالیاں', ucs: ['Lalian City', 'Chak No. 100', 'Chak No. 111', 'Chak No. 120'], ucs_ur: ['لالیاں شہر', 'چک نمبر 100', 'چک نمبر 111', 'چک نمبر 120'] },
          Bhawana: { ur: 'بھوانہ', ucs: ['Bhawana City', 'Chak No. 1', 'Chak No. 5', 'Chak No. 10'], ucs_ur: ['بھوانہ شہر', 'چک نمبر 1', 'چک نمبر 5', 'چک نمبر 10'] },
        },
      },
      'Dera Ghazi Khan': {
        ur: 'ڈیرہ غازی خان',
        tehsils: {
          'Dera Ghazi Khan': { ur: 'ڈیرہ غازی خان', ucs: ['DG Khan City', 'Choti', 'Sakhi Sarwar', 'Vehova'], ucs_ur: ['ڈی جی خان شہر', 'چوٹی', 'سخی سرور', 'ویہوا'] },
          'Kot Chutta':      { ur: 'کوٹ چھٹہ',       ucs: ['Kot Chutta City', 'Chah Sandan Wala', 'Kalu Khan', 'Lund'], ucs_ur: ['کوٹ چھٹہ شہر', 'چاہ سنڈاں والا', 'کالو خان', 'لنڈ'] },
        },
      },
      Faisalabad: {
        ur: 'فیصل آباد',
        tehsils: {
          'Faisalabad City':    { ur: 'فیصل آباد شہر', ucs: ['Clock Tower', 'Ghulam Muhammad Abad', 'Jinnah Colony', 'Madina Town', 'People Colony'], ucs_ur: ['کلاک ٹاور', 'غلام محمد آباد', 'جناح کالونی', 'مدینہ ٹاؤن', 'پیپلز کالونی'] },
          'Faisalabad Saddar': { ur: 'فیصل آباد صدر', ucs: ['Cantt', 'Civil Lines', 'Gulshan Colony', 'Mansoorabad', 'Samanabad'], ucs_ur: ['کینٹ', 'سول لائنز', 'گلشن کالونی', 'منصور آباد', 'سمن آباد'] },
          'Chak Jhumra':       { ur: 'چک جھمرہ',      ucs: ['Chak Jhumra City', 'Chak No. 40 JB', 'Chak No. 41 JB', 'Chak No. 44 JB'], ucs_ur: ['چک جھمرہ شہر', 'چک نمبر 40 جے بی', 'چک نمبر 41 جے بی', 'چک نمبر 44 جے بی'] },
          Jaranwala:           { ur: 'جڑانوالہ',       ucs: ['Jaranwala City', 'Chak No. 208', 'Chak No. 209', 'Chak No. 210'], ucs_ur: ['جڑانوالہ شہر', 'چک نمبر 208', 'چک نمبر 209', 'چک نمبر 210'] },
          Samundari:           { ur: 'سمندری',          ucs: ['Samundari City', 'Chak No. 72 JB', 'Chak No. 75 JB', 'Chak No. 80 JB'], ucs_ur: ['سمندری شہر', 'چک نمبر 72 جے بی', 'چک نمبر 75 جے بی', 'چک نمبر 80 جے بی'] },
          Tandlianwala:        { ur: 'تاندلیانوالہ',   ucs: ['Tandlianwala City', 'Chak 72 JB', 'Chak 73 JB', 'Chak 77 JB'], ucs_ur: ['تاندلیانوالہ شہر', 'چک 72 جے بی', 'چک 73 جے بی', 'چک 77 جے بی'] },
        },
      },
      Gujranwala: {
        ur: 'گوجرانوالہ',
        tehsils: {
          'Gujranwala City':   { ur: 'گوجرانوالہ شہر', ucs: ['Gujranwala City', 'Ali Town', 'Gulshan Iqbal', 'Satellite Town'], ucs_ur: ['گوجرانوالہ شہر', 'علی ٹاؤن', 'گلشن اقبال', 'سیٹلائٹ ٹاؤن'] },
          'Gujranwala Sadar':  { ur: 'گوجرانوالہ صدر', ucs: ['Gujranwala Saddar', 'Ali Pur Chatha', 'Wahndo', 'Wazirabad Road'], ucs_ur: ['گوجرانوالہ صدر', 'علی پور چٹھہ', 'وہنڈو', 'وزیرآباد روڈ'] },
          Kamoke:              { ur: 'کاموکی',           ucs: ['Kamoke City', 'Bara Kau', 'Dhaunkel', 'Kot Nainan'], ucs_ur: ['کاموکی شہر', 'بارہ کاؤ', 'ڈھونکل', 'کوٹ نینان'] },
          'Naushera Virkan':   { ur: 'نوشہرہ ورکاں',   ucs: ['Nowshera Virkan City', 'Eminabad', 'Kamonki', 'Qila Didar Singh'], ucs_ur: ['نوشہرہ ورکاں شہر', 'ایمن آباد', 'کمونکی', 'قلعہ دیدار سنگھ'] },
        },
      },
      Gujrat: {
        ur: 'گجرات',
        tehsils: {
          Gujrat:            { ur: 'گجرات',         ucs: ['Gujrat City', 'Cantt', 'Civil Lines', 'Model Town'], ucs_ur: ['گجرات شہر', 'کینٹ', 'سول لائنز', 'ماڈل ٹاؤن'] },
          Kharian:           { ur: 'کھاریاں',        ucs: ['Kharian City', 'Dinga', 'Kunjah', 'Lalamusa'], ucs_ur: ['کھاریاں شہر', 'ڈنگہ', 'کنجاہ', 'لالہ موسیٰ'] },
          'Sarai Alamgir':   { ur: 'سرائے عالمگیر', ucs: ['Sarai Alamgir City', 'Jhelum Road', 'Mangla', 'Rasul'], ucs_ur: ['سرائے عالمگیر شہر', 'جہلم روڈ', 'منگلہ', 'رسول'] },
          'Jalalpur Jattan': { ur: 'جلال پور جٹاں', ucs: ['Jalalpur Jattan City', 'Karah', 'Kotla Arab Ali Khan', 'Miana Gondal'], ucs_ur: ['جلال پور جٹاں شہر', 'کراہ', 'کوٹلہ عرب علی خان', 'میانہ گونڈل'] },
          Kunjah:            { ur: 'کنجاہ',          ucs: ['Kunjah City', 'Bhimber Road', 'Gujrat Road', 'Sangri'], ucs_ur: ['کنجاہ شہر', 'بھمبر روڈ', 'گجرات روڈ', 'سنگڑی'] },
        },
      },
      Hafizabad: {
        ur: 'حافظ آباد',
        tehsils: {
          Hafizabad:       { ur: 'حافظ آباد',  ucs: ['Hafizabad City', 'Kolo Tarar', 'Sheikhupura Road', 'Sukheke'], ucs_ur: ['حافظ آباد شہر', 'کولو تارڑ', 'شیخوپورہ روڈ', 'سکھیکے'] },
          'Pindi Bhattian': { ur: 'پنڈی بھٹیاں', ucs: ['Pindi Bhattian City', 'Chak Sardaran', 'Shafqatabad', 'Vanike Tarar'], ucs_ur: ['پنڈی بھٹیاں شہر', 'چک سرداراں', 'شفقت آباد', 'وانیکے تارڑ'] },
        },
      },
      Jhang: {
        ur: 'جھنگ',
        tehsils: {
          Jhang:            { ur: 'جھنگ',           ucs: ['Jhang City', 'Jhang Saddar', 'Kot Isa Shah', 'Mochiwala'], ucs_ur: ['جھنگ شہر', 'جھنگ صدر', 'کوٹ عیسیٰ شاہ', 'موچی والا'] },
          Shorkot:          { ur: 'شورکوٹ',         ucs: ['Shorkot City', '18 Hazari', 'Ahmad Nagar', 'Garh Maharaja'], ucs_ur: ['شورکوٹ شہر', '18 ہزاری', 'احمد نگر', 'گڑھ مہاراجہ'] },
          'Ahmad Pur Sial': { ur: 'احمد پور سیال', ucs: ['Ahmad Pur Sial City', 'Chak No. 1', 'Chak No. 10', 'Chak No. 20'], ucs_ur: ['احمد پور سیال شہر', 'چک نمبر 1', 'چک نمبر 10', 'چک نمبر 20'] },
          '18-Hazari':      { ur: '18 ہزاری',       ucs: ['18-Hazari Town', 'Athara Hazari', 'Chak No. 1', 'Chak No. 5'], ucs_ur: ['18 ہزاری ٹاؤن', 'اٹھارہ ہزاری', 'چک نمبر 1', 'چک نمبر 5'] },
        },
      },
      Jhelum: {
        ur: 'جہلم',
        tehsils: {
          Jhelum:           { ur: 'جہلم',         ucs: ['Jhelum City', 'Cantt', 'Dina', 'Sohawa'], ucs_ur: ['جہلم شہر', 'کینٹ', 'ڈینہ', 'سوہاوہ'] },
          'Pind Dadan Khan': { ur: 'پنڈ دادن خان', ucs: ['Pind Dadan Khan City', 'Khewra', 'Nandna', 'Pind Dadan Khan Road'], ucs_ur: ['پنڈ دادن خان شہر', 'کھیوڑہ', 'نندنہ', 'پنڈ دادن خان روڈ'] },
          Sohawa:           { ur: 'سوہاوہ',        ucs: ['Sohawa City', 'Chakwal Road', 'Domeli', 'Girjakh'], ucs_ur: ['سوہاوہ شہر', 'چکوال روڈ', 'ڈومیلی', 'گرجاکھ'] },
          Dina:             { ur: 'ڈینہ',           ucs: ['Dina City', 'Jhelum Road', 'Khewra', 'Pind Dadan Khan Road'], ucs_ur: ['ڈینہ شہر', 'جہلم روڈ', 'کھیوڑہ', 'پنڈ دادن خان روڈ'] },
        },
      },
      Kasur: {
        ur: 'قصور',
        tehsils: {
          Kasur:             { ur: 'قصور',           ucs: ['Kasur City', 'Chunian Road', 'Kot Radha Kishan Road', 'Pattoki Road'], ucs_ur: ['قصور شہر', 'چونیاں روڈ', 'کوٹ رادھا کشن روڈ', 'پتوکی روڈ'] },
          'Kot Radha Kishan': { ur: 'کوٹ رادھا کشن', ucs: ['Kot Radha Kishan City', 'Bhai Pheru', 'Kasur Road', 'Manga'], ucs_ur: ['کوٹ رادھا کشن شہر', 'بھائی پھیرو', 'قصور روڈ', 'منگا'] },
          Chunian:           { ur: 'چونیاں',          ucs: ['Chunian City', 'Bhai Pheru', 'Manga', 'Raiwind'], ucs_ur: ['چونیاں شہر', 'بھائی پھیرو', 'منگا', 'رائیونڈ'] },
          Pattoki:           { ur: 'پتوکی',           ucs: ['Pattoki City', 'Basirpur', 'Phool Nagar', 'Renala Khurd'], ucs_ur: ['پتوکی شہر', 'باسرپور', 'پھول نگر', 'رینالہ خورد'] },
        },
      },
      Khanewal: {
        ur: 'خانیوال',
        tehsils: {
          Khanewal:    { ur: 'خانیوال',   ucs: ['Khanewal City', 'Chak No. 1 WB', 'Chak No. 5 WB', 'Tulamba'], ucs_ur: ['خانیوال شہر', 'چک نمبر 1 ڈبلیو بی', 'چک نمبر 5 ڈبلیو بی', 'تلمبہ'] },
          'Mian Channu': { ur: 'میاں چنوں', ucs: ['Mian Channu City', 'Chak No. 1 WB', 'Chak No. 5 WB', 'Chak No. 10 WB'], ucs_ur: ['میاں چنوں شہر', 'چک نمبر 1 ڈبلیو بی', 'چک نمبر 5 ڈبلیو بی', 'چک نمبر 10 ڈبلیو بی'] },
          Kabirwala:   { ur: 'کبیروالہ', ucs: ['Kabirwala City', 'Chak No. 23 WB', 'Chak No. 35 WB', 'Chak No. 50 WB'], ucs_ur: ['کبیروالہ شہر', 'چک نمبر 23 ڈبلیو بی', 'چک نمبر 35 ڈبلیو بی', 'چک نمبر 50 ڈبلیو بی'] },
          Jahanian:    { ur: 'جہانیاں',  ucs: ['Jahanian City', 'Chak No. 1', 'Chak No. 5', 'Chak No. 10'], ucs_ur: ['جہانیاں شہر', 'چک نمبر 1', 'چک نمبر 5', 'چک نمبر 10'] },
        },
      },
      Khushab: {
        ur: 'خوشاب',
        tehsils: {
          Khushab:   { ur: 'خوشاب',   ucs: ['Khushab City', 'Joharabad', 'Quaidabad', 'Sargodha Road'], ucs_ur: ['خوشاب شہر', 'جوہرآباد', 'قائدآباد', 'سرگودھا روڈ'] },
          'Noorpur Thal':   { ur: 'نورپور',   ucs: ['Noorpur City', 'Chak No. 1', 'Chak No. 5', 'Khushab Road'], ucs_ur: ['نورپور شہر', 'چک نمبر 1', 'چک نمبر 5', 'خوشاب روڈ'] },
          Quaidabad: { ur: 'قائدآباد', ucs: ['Quaidabad City', 'Chak No. 1', 'Chak No. 5', 'Chak No. 10'], ucs_ur: ['قائدآباد شہر', 'چک نمبر 1', 'چک نمبر 5', 'چک نمبر 10'] },
          Naushera:  { ur: 'نوشہرہ',   ucs: ['Naushera City', 'Hadali', 'Khabeki', 'Khushab Road'], ucs_ur: ['نوشہرہ شہر', 'ہدالی', 'کھبیکی', 'خوشاب روڈ'] },
        },
      },
      'Kot Addu': {
        ur: 'کوٹ ادو',
        tehsils: {
          'Kot Addu':            { ur: 'کوٹ ادو',      ucs: ['Kot Addu City', 'Karor Lal Esan', 'Rangpur', 'Sawan'], ucs_ur: ['کوٹ ادو شہر', 'کروڑ لال عیسن', 'رنگ پور', 'ساون'] },
          'Chowk Sarwar Shaheed': { ur: 'چوک سرور شہید', ucs: ['Chowk Sarwar Shaheed City', 'Chak No. 1', 'Chak No. 5', 'Muzaffargarh Road'], ucs_ur: ['چوک سرور شہید شہر', 'چک نمبر 1', 'چک نمبر 5', 'مظفرگڑھ روڈ'] },
        },
      },
      Lahore: {
        ur: 'لاہور',
        tehsils: {
          'Lahore City':   { ur: 'لاہور شہر',    ucs: ['Data Ganj Bakhsh', 'Gulberg', 'Iqbal Town', 'Ravi', 'Samanabad'], ucs_ur: ['داتا گنج بخش', 'گلبرگ', 'اقبال ٹاؤن', 'راوی', 'سمن آباد'] },
          'Lahore Cantt':  { ur: 'لاہور کینٹ',   ucs: ['Cantonment', 'Defence', 'Gulshan Ravi', 'Nishtar Colony', 'Walton'], ucs_ur: ['کینٹونمنٹ', 'ڈیفنس', 'گلشن راوی', 'نشتر کالونی', 'والٹن'] },
          'Model Town':    { ur: 'ماڈل ٹاؤن',    ucs: ['Model Town', 'Garden Town', 'Johar Town', 'Muslim Town'], ucs_ur: ['ماڈل ٹاؤن', 'گارڈن ٹاؤن', 'جوہر ٹاؤن', 'مسلم ٹاؤن'] },
          Shalimar:        { ur: 'شالیمار',       ucs: ['Baghbanpura', 'Badami Bagh', 'Mughalpura', 'Shahdara'], ucs_ur: ['باغبانپورہ', 'بادامی باغ', 'مغلپورہ', 'شاہدرہ'] },
          Raiwind:         { ur: 'رائیونڈ',       ucs: ['Raiwind City', 'Bhai Pheru', 'Chunian Road', 'Manga Mandi'], ucs_ur: ['رائیونڈ شہر', 'بھائی پھیرو', 'چونیاں روڈ', 'منگا منڈی'] },
          'Allama Iqbal':  { ur: 'علامہ اقبال',  ucs: ['Allama Iqbal Town', 'Faisal Town', 'Gulshan Colony', 'Township'], ucs_ur: ['علامہ اقبال ٹاؤن', 'فیصل ٹاؤن', 'گلشن کالونی', 'ٹاؤن شپ'] },
          Nishter:         { ur: 'نشتر',          ucs: ['Anarkali', 'Nishter Colony', 'Shah Alam Market', 'Shad Bagh'], ucs_ur: ['انارکلی', 'نشتر کالونی', 'شاہ عالم مارکیٹ', 'شاد باغ'] },
          Saddar:          { ur: 'صدر',           ucs: ['Civil Lines', 'Gulberg', 'Shadman', 'Upper Mall'], ucs_ur: ['سول لائنز', 'گلبرگ', 'شادمان', 'اپر مال'] },
          Wahga:           { ur: 'واہگہ',         ucs: ['Wahga Border', 'Barki', 'Bedian', 'Halloki'], ucs_ur: ['واہگہ بارڈر', 'برکی', 'بیدیاں', 'ہلوکی'] },
          Ravi:            { ur: 'راوی',           ucs: ['Ravi Road', 'Baghbanpura', 'GT Road', 'Shahdara Town'], ucs_ur: ['راوی روڈ', 'باغبانپورہ', 'جی ٹی روڈ', 'شاہدرہ ٹاؤن'] },
        },
      },
      Layyah: {
        ur: 'لیہ',
        tehsils: {
          Layyah:           { ur: 'لیہ',           ucs: ['Layyah City', 'Chak No. 1 TDA', 'Chak No. 5 TDA', 'Fatehpur'], ucs_ur: ['لیہ شہر', 'چک نمبر 1 ٹی ڈی اے', 'چک نمبر 5 ٹی ڈی اے', 'فتح پور'] },
          'Karor Lal Esan': { ur: 'کروڑ لال عیسن', ucs: ['Karor City', 'Chak No. 1', 'Fatehpur', 'Kot Sultan'], ucs_ur: ['کروڑ شہر', 'چک نمبر 1', 'فتح پور', 'کوٹ سلطان'] },
          Chaubara:         { ur: 'چوبارہ',         ucs: ['Chaubara City', 'Chak No. 1', 'Chak No. 5', 'Chak No. 10'], ucs_ur: ['چوبارہ شہر', 'چک نمبر 1', 'چک نمبر 5', 'چک نمبر 10'] },
        },
      },
      Lodhran: {
        ur: 'لودھراں',
        tehsils: {
          Lodhran:      { ur: 'لودھراں',   ucs: ['Lodhran City', 'Chak No. 1 WA', 'Chak No. 5 WA', 'Dunyapur Road'], ucs_ur: ['لودھراں شہر', 'چک نمبر 1 ڈبلیو اے', 'چک نمبر 5 ڈبلیو اے', 'دنیاپور روڈ'] },
          Dunyapur:     { ur: 'دنیاپور',   ucs: ['Dunyapur City', 'Chak No. 1 WA', 'Chak No. 6 WA', 'Lodhran Road'], ucs_ur: ['دنیاپور شہر', 'چک نمبر 1 ڈبلیو اے', 'چک نمبر 6 ڈبلیو اے', 'لودھراں روڈ'] },
          'Kahror Pacca': { ur: 'کہرور پکا', ucs: ['Kahror Pacca City', 'Chak No. 1', 'Chak No. 5', 'Piplan'], ucs_ur: ['کہرور پکا شہر', 'چک نمبر 1', 'چک نمبر 5', 'پیپلاں'] },
        },
      },
      'Mandi Bahauddin': {
        ur: 'منڈی بہاءالدین',
        tehsils: {
          'Mandi Bahauddin': { ur: 'منڈی بہاءالدین', ucs: ['Mandi Bahauddin City', 'Miani', 'Phalia Road', 'Sargodha Road'], ucs_ur: ['منڈی بہاءالدین شہر', 'میانی', 'پھالیہ روڈ', 'سرگودھا روڈ'] },
          Phalia:            { ur: 'پھالیہ',          ucs: ['Phalia City', 'Chak No. 1', 'Chak No. 10', 'Mandi Bahauddin Road'], ucs_ur: ['پھالیہ شہر', 'چک نمبر 1', 'چک نمبر 10', 'منڈی بہاءالدین روڈ'] },
          Malakwal:          { ur: 'ملکوال',          ucs: ['Malakwal City', 'Chak Daulat', 'Kot Nawan', 'Wazirabad Road'], ucs_ur: ['ملکوال شہر', 'چک دولت', 'کوٹ نواں', 'وزیرآباد روڈ'] },
        },
      },
      Mianwali: {
        ur: 'میانوالی',
        tehsils: {
          Mianwali:  { ur: 'میانوالی',  ucs: ['Mianwali City', 'Chak No. 1', 'Chak No. 5', 'Piplan Road'], ucs_ur: ['میانوالی شہر', 'چک نمبر 1', 'چک نمبر 5', 'پیپلاں روڈ'] },
          'Isa Khel': { ur: 'عیسیٰ خیل', ucs: ['Isa Khel City', 'Daud Khel', 'Kala Bagh', 'Wan Bhachran'], ucs_ur: ['عیسیٰ خیل شہر', 'داؤد خیل', 'کالا باغ', 'ون بھچراں'] },
          Piplan:    { ur: 'پیپلاں',    ucs: ['Piplan City', 'Chak No. 1', 'Chak No. 5', 'Mianwali Road'], ucs_ur: ['پیپلاں شہر', 'چک نمبر 1', 'چک نمبر 5', 'میانوالی روڈ'] },
        },
      },
      Multan: {
        ur: 'ملتان',
        tehsils: {
          'Multan City':    { ur: 'ملتان شہر',    ucs: ['Bohar Gate', 'Daulat Gate', 'Haram Gate', 'Lohari Gate', 'Shah Rukn-e-Alam'], ucs_ur: ['بوہڑ گیٹ', 'دولت گیٹ', 'حرم گیٹ', 'لوہاری گیٹ', 'شاہ رکن عالم'] },
          'Multan Sadar':   { ur: 'ملتان صدر',   ucs: ['Cantt', 'Gulgasht', 'New Multan', 'Shalimar'], ucs_ur: ['کینٹ', 'گلگشت', 'نیا ملتان', 'شالیمار'] },
          Shujabad:         { ur: 'شجاع آباد',    ucs: ['Shujabad City', 'Jhangara', 'Kotla Qasim Khan', 'Mailsi Road'], ucs_ur: ['شجاع آباد شہر', 'جھنگارہ', 'کوٹلہ قاسم خان', 'میلسی روڈ'] },
          'Jalalpur Pirwala': { ur: 'جلال پور پیروالا', ucs: ['Jalalpur Pirwala City', 'Mian Channu Road', 'Tulamba', 'Sanawan'], ucs_ur: ['جلال پور پیروالا شہر', 'میاں چنوں روڈ', 'تلمبہ', 'سناواں'] },
        },
      },
      Murree: {
        ur: 'مری',
        tehsils: {
          Murree:          { ur: 'مری',           ucs: ['Murree City', 'Ghora Gali', 'Nathia Gali', 'Patriata'], ucs_ur: ['مری شہر', 'گھوڑا گلی', 'ناتھیا گلی', 'پتریاتہ'] },
          'Kotli Sattian': { ur: 'کوٹلی ستیاں',  ucs: ['Kotli Sattian City', 'Doonga Gali', 'Kahuta Road', 'Murree Road'], ucs_ur: ['کوٹلی ستیاں شہر', 'ڈونگہ گلی', 'کہوٹہ روڈ', 'مری روڈ'] },
        },
      },
      Muzaffargarh: {
        ur: 'مظفرگڑھ',
        tehsils: {
          Muzaffargarh: { ur: 'مظفرگڑھ', ucs: ['Muzaffargarh City', 'Leja', 'Shah Jamal', 'Tibba Sultanpur'], ucs_ur: ['مظفرگڑھ شہر', 'لیجہ', 'شاہ جمال', 'ٹبہ سلطان پور'] },
          Alipur:       { ur: 'علی پور',  ucs: ['Ali Pur City', 'Jatoi Road', 'Qadirpur Rawan', 'Sanawan'], ucs_ur: ['علی پور شہر', 'جتوئی روڈ', 'قادرپور راواں', 'سناواں'] },
          Jatoi:        { ur: 'جتوئی',    ucs: ['Jatoi City', 'Chak No. 1', 'Chak No. 5', 'Rangpur'], ucs_ur: ['جتوئی شہر', 'چک نمبر 1', 'چک نمبر 5', 'رنگ پور'] },
        },
      },
      'Nankana Sahib': {
        ur: 'ننکانہ صاحب',
        tehsils: {
          'Nankana Sahib': { ur: 'ننکانہ صاحب', ucs: ['Nankana Sahib City', 'Bucheki', 'Mangtanwala', 'Sangla Hill Road'], ucs_ur: ['ننکانہ صاحب شہر', 'بوچیکی', 'منگٹانوالہ', 'سانگلہ ہل روڈ'] },
          'Shah kot':         { ur: 'شاہ کوٹ',     ucs: ['Shah Kot City', 'Ferozewala Road', 'Muridke Road', 'Nankana Road'], ucs_ur: ['شاہ کوٹ شہر', 'فیروزوالہ روڈ', 'مریدکے روڈ', 'ننکانہ روڈ'] },
          'Sangla Hill':   { ur: 'سانگلہ ہل',   ucs: ['Sangla Hill City', 'Bhikhi', 'Kot Nainan', 'Sheikhupura Road'], ucs_ur: ['سانگلہ ہل شہر', 'بھکھی', 'کوٹ نینان', 'شیخوپورہ روڈ'] },
        },
      },
      Narowal: {
        ur: 'نارووال',
        tehsils: {
          Narowal:    { ur: 'نارووال',  ucs: ['Narowal City', 'Kot Nainan', 'Shakargarh Road', 'Zafarwal Road'], ucs_ur: ['نارووال شہر', 'کوٹ نینان', 'شکرگڑھ روڈ', 'ظفروال روڈ'] },
          Shakargarh: { ur: 'شکرگڑھ',  ucs: ['Shakargarh City', 'Charwa', 'Jassar', 'Narowal Road'], ucs_ur: ['شکرگڑھ شہر', 'چروہ', 'جاسر', 'نارووال روڈ'] },
          Zafarwal:   { ur: 'ظفروال',   ucs: ['Zafarwal City', 'Chawinda', 'Narowal Road', 'Pasrur Road'], ucs_ur: ['ظفروال شہر', 'چاونڈہ', 'نارووال روڈ', 'پسرور روڈ'] },
        },
      },
      Okara: {
        ur: 'اوکاڑہ',
        tehsils: {
          Okara:        { ur: 'اوکاڑہ',     ucs: ['Okara City', 'Cantt', 'Depalpur Road', 'Renala Road'], ucs_ur: ['اوکاڑہ شہر', 'کینٹ', 'دیپالپور روڈ', 'رینالہ روڈ'] },
          'Renala Khurd': { ur: 'رینالہ خورد', ucs: ['Renala Khurd City', 'Chak No. 1', 'Chak No. 10', 'Haveli Lakha'], ucs_ur: ['رینالہ خورد شہر', 'چک نمبر 1', 'چک نمبر 10', 'ہویلی لکھا'] },
          Depalpur:     { ur: 'دیپالپور',   ucs: ['Depalpur City', 'Basirpur', 'Chunian Road', 'Pattoki Road'], ucs_ur: ['دیپالپور شہر', 'باسرپور', 'چونیاں روڈ', 'پتوکی روڈ'] },
        },
      },
      Pakpattan: {
        ur: 'پاکپتن',
        tehsils: {
          Pakpattan: { ur: 'پاکپتن',   ucs: ['Pakpattan City', 'Arifwala Road', 'Chak No. 26 E', 'Chak No. 45 E'], ucs_ur: ['پاکپتن شہر', 'عارف والا روڈ', 'چک نمبر 26 ای', 'چک نمبر 45 ای'] },
          Arifwala:  { ur: 'عارف والا', ucs: ['Arifwala City', 'Chak No. 73 E', 'Chak No. 80 E', 'Chak No. 88 E'], ucs_ur: ['عارف والا شہر', 'چک نمبر 73 ای', 'چک نمبر 80 ای', 'چک نمبر 88 ای'] },
        },
      },
      'Rahim Yar Khan': {
        ur: 'رحیم یار خان',
        tehsils: {
          'Rahim Yar Khan': { ur: 'رحیم یار خان', ucs: ['Rahim Yar Khan City', 'Cantt', 'Khanpur Road', 'Sadiqabad Road'], ucs_ur: ['رحیم یار خان شہر', 'کینٹ', 'خان پور روڈ', 'صادق آباد روڈ'] },
          Sadiqabad:        { ur: 'صادق آباد',    ucs: ['Sadiqabad City', 'Chak No. 143 P', 'Chak No. 152 P', 'Liaquatpur Road'], ucs_ur: ['صادق آباد شہر', 'چک نمبر 143 پی', 'چک نمبر 152 پی', 'لیاقت پور روڈ'] },
          Liaqatpur:        { ur: 'لیاقت پور',    ucs: ['Liaquatpur City', 'Chak No. 1 P', 'Chak No. 5 P', 'Chak No. 10 P'], ucs_ur: ['لیاقت پور شہر', 'چک نمبر 1 پی', 'چک نمبر 5 پی', 'چک نمبر 10 پی'] },
          'Khanpur Katora':          { ur: 'خان پور',      ucs: ['Khanpur City', 'Chak No. 47 P', 'Chak No. 48 P', 'Hasil Pur'], ucs_ur: ['خان پور شہر', 'چک نمبر 47 پی', 'چک نمبر 48 پی', 'حاصل پور'] },
        },
      },
      Rajanpur: {
        ur: 'راجن پور',
        tehsils: {
          Rajanpur: { ur: 'راجن پور', ucs: ['Rajanpur City', 'Chak No. 1', 'Chak No. 5', 'Kot Mithan'], ucs_ur: ['راجن پور شہر', 'چک نمبر 1', 'چک نمبر 5', 'کوٹ مٹھن'] },
          Jampur:   { ur: 'جام پور',  ucs: ['Jampur City', 'Chak No. 1', 'Fazilpur', 'Sakhi Sarwar'], ucs_ur: ['جام پور شہر', 'چک نمبر 1', 'فاضل پور', 'سخی سرور'] },
          Rojhan:   { ur: 'روجھان',   ucs: ['Rojhan City', 'Chak No. 1', 'Chak No. 5', 'Hasilpur'], ucs_ur: ['روجھان شہر', 'چک نمبر 1', 'چک نمبر 5', 'حاصل پور'] },
        },
      },
      Rawalpindi: {
        ur: 'راولپنڈی',
        tehsils: {
          'Rawalpindi Saddar': { ur: 'راولپنڈی صدر',  ucs: ['Rawalpindi Saddar', 'Chaklala', 'Pirwadhai', 'Satellite Town'], ucs_ur: ['راولپنڈی صدر', 'چکلالہ', 'پیر ودھائی', 'سیٹلائٹ ٹاؤن'] },
          'Rawalpindi Cantt':  { ur: 'راولپنڈی کینٹ', ucs: ['Cantonment', 'Dhoke Hassu', 'Dhoke Kala Khan', 'Westridge'], ucs_ur: ['کینٹونمنٹ', 'ڈھوک حسو', 'ڈھوک کالا خان', 'ویسٹ رج'] },
          'Rawalpindi City':   { ur: 'راولپنڈی شہر',  ucs: ['City', 'Committee Chowk', 'Liaquat Bagh', 'Raja Bazaar'], ucs_ur: ['شہر', 'کمیٹی چوک', 'لیاقت باغ', 'راجہ بازار'] },
          Kahuta:              { ur: 'کہوٹہ',          ucs: ['Kahuta City', 'Kallar Syedan', 'Kot Fateh Khan', 'Pind Begwal'], ucs_ur: ['کہوٹہ شہر', 'کلر سیداں', 'کوٹ فتح خان', 'پنڈ بیگوال'] },
          Taxila:              { ur: 'ٹیکسلا',         ucs: ['Taxila City', 'Havelian Road', 'Khanpur', 'Wah Cantt'], ucs_ur: ['ٹیکسلا شہر', 'حویلیاں روڈ', 'خانپور', 'واہ کینٹ'] },
          'Kallar Sayeddan':   { ur: 'کلر سیداں',     ucs: ['Kallar Sayeddan City', 'Dhok Pathan', 'Kahuta Road', 'Murree Road'], ucs_ur: ['کلر سیداں شہر', 'ڈھوک پٹھان', 'کہوٹہ روڈ', 'مری روڈ'] },
          'Gujjar Khan':       { ur: 'گوجر خان',      ucs: ['Gujar Khan City', 'Daultala', 'Mangla', 'Mirpur Road'], ucs_ur: ['گوجر خان شہر', 'دولتالہ', 'منگلہ', 'میرپور روڈ'] },
        },
      },
      Sahiwal: {
        ur: 'ساہیوال',
        tehsils: {
          Sahiwal:      { ur: 'ساہیوال',    ucs: ['Sahiwal City', 'Cantt', 'Chichawatni Road', 'Pakpattan Road'], ucs_ur: ['ساہیوال شہر', 'کینٹ', 'چیچہ وطنی روڈ', 'پاکپتن روڈ'] },
          Chichawatni:  { ur: 'چیچہ وطنی', ucs: ['Chichawatni City', 'Arifwala Road', 'Harappa', 'Kamalia Road'], ucs_ur: ['چیچہ وطنی شہر', 'عارف والا روڈ', 'ہڑپہ', 'کمالیہ روڈ'] },
        },
      },
      Sargodha: {
        ur: 'سرگودھا',
        tehsils: {
          Sargodha:   { ur: 'سرگودھا',  ucs: ['Sargodha City', 'Cantt', 'Lahore Road', 'University Road'], ucs_ur: ['سرگودھا شہر', 'کینٹ', 'لاہور روڈ', 'یونیورسٹی روڈ'] },
          Sillanwali: { ur: 'سیلانوالی', ucs: ['Sillanwali City', 'Chak No. 1 NB', 'Chak No. 10 NB', 'Chak No. 20 NB'], ucs_ur: ['سیلانوالی شہر', 'چک نمبر 1 این بی', 'چک نمبر 10 این بی', 'چک نمبر 20 این بی'] },
          Bhalwal:    { ur: 'بھلوال',   ucs: ['Bhalwal City', 'Chak No. 1 NB', 'Chak No. 45 NB', 'Kot Momin Road'], ucs_ur: ['بھلوال شہر', 'چک نمبر 1 این بی', 'چک نمبر 45 این بی', 'کوٹ مومن روڈ'] },
          'Kot Momin': { ur: 'کوٹ مومن', ucs: ['Kot Momin City', 'Chak No. 1', 'Chak No. 5', 'Chak No. 10'], ucs_ur: ['کوٹ مومن شہر', 'چک نمبر 1', 'چک نمبر 5', 'چک نمبر 10'] },
          Shahpur:    { ur: 'شاہ پور',  ucs: ['Shahpur City', 'Bhera', 'Mitha Tiwana', 'Sahiwal Road'], ucs_ur: ['شاہ پور شہر', 'بھیرہ', 'میٹھہ ٹیونہ', 'ساہیوال روڈ'] },
          Sahiwal:    { ur: 'ساہیوال',  ucs: ['Sahiwal City', 'Chak No. 1', 'Chak No. 5', 'Sargodha Road'], ucs_ur: ['ساہیوال شہر', 'چک نمبر 1', 'چک نمبر 5', 'سرگودھا روڈ'] },
          Bhera:      { ur: 'بھیرہ',    ucs: ['Bhera City', 'Chak No. 1', 'Chak No. 5', 'Shahpur Road'], ucs_ur: ['بھیرہ شہر', 'چک نمبر 1', 'چک نمبر 5', 'شاہ پور روڈ'] },
        },
      },
      Sheikhupura: {
        ur: 'شیخوپورہ',
        tehsils: {
          Sheikhupura: { ur: 'شیخوپورہ', ucs: ['Sheikhupura City', 'Cantt', 'Lahore Road', 'Narang Mandi'], ucs_ur: ['شیخوپورہ شہر', 'کینٹ', 'لاہور روڈ', 'نارنگ منڈی'] },
          Ferozwala:   { ur: 'فیروزوالہ', ucs: ['Ferozewala City', 'Kala Shah Kaku', 'Narang Mandi', 'Shahdara'], ucs_ur: ['فیروزوالہ شہر', 'کالا شاہ کاکو', 'نارنگ منڈی', 'شاہدرہ'] },
          Muridke:     { ur: 'مریدکے',    ucs: ['Muridke City', 'Bhai Pheru', 'Nankana Sahib Road', 'Sangla Hill Road'], ucs_ur: ['مریدکے شہر', 'بھائی پھیرو', 'ننکانہ صاحب روڈ', 'سانگلہ ہل روڈ'] },
          Sharaqpur:   { ur: 'شرق پور',  ucs: ['Sharaqpur City', 'Chuharkana', 'Hafizabad Road', 'Sangla Hill Road'], ucs_ur: ['شرق پور شہر', 'چوہڑکانہ', 'حافظ آباد روڈ', 'سانگلہ ہل روڈ'] },
          Safdarabad:  { ur: 'صفدرآباد', ucs: ['Safdarabad City', 'Ferozewala Road', 'Muridke Road', 'Sheikhupura Road'], ucs_ur: ['صفدرآباد شہر', 'فیروزوالہ روڈ', 'مریدکے روڈ', 'شیخوپورہ روڈ'] },
        },
      },
      Sialkot: {
        ur: 'سیالکوٹ',
        tehsils: {
          Sialkot:  { ur: 'سیالکوٹ', ucs: ['Sialkot City', 'Cantt', 'Civil Lines', 'Sambrial Road'], ucs_ur: ['سیالکوٹ شہر', 'کینٹ', 'سول لائنز', 'سمبڑیال روڈ'] },
          Daska:    { ur: 'ڈسکہ',    ucs: ['Daska City', 'Badiana', 'Kotli Loharan', 'Pasrur Road'], ucs_ur: ['ڈسکہ شہر', 'بدیانہ', 'کوٹلی لوہاراں', 'پسرور روڈ'] },
          Pasrur:   { ur: 'پسرور',   ucs: ['Pasrur City', 'Chawinda', 'Raya', 'Zafarwal Road'], ucs_ur: ['پسرور شہر', 'چاونڈہ', 'رایہ', 'ظفروال روڈ'] },
          Sambrial: { ur: 'سمبڑیال', ucs: ['Sambrial City', 'Hajipura', 'Ugoki', 'Wazirabad Road'], ucs_ur: ['سمبڑیال شہر', 'حاجی پورہ', 'اوگوکی', 'وزیرآباد روڈ'] },
        },
      },
      Talagang: {
        ur: 'تلاگنگ',
        tehsils: {
          Talagang: { ur: 'تلاگنگ', ucs: ['Talagang City', 'Chhibi', 'Dhurnal', 'Kallar Kahar Road'], ucs_ur: ['تلاگنگ شہر', 'چھبی', 'دھرنال', 'کلر کہار روڈ'] },
          Lawa:     { ur: 'لاوا',    ucs: ['Lawa City', 'Chhibi Road', 'Choa Saidan Shah Road', 'Talagang Road'], ucs_ur: ['لاوا شہر', 'چھبی روڈ', 'چوہا سیدن شاہ روڈ', 'تلاگنگ روڈ'] },
        },
      },
      Taunsa: {
        ur: 'تونسہ',
        tehsils: {
          Taunsa:        { ur: 'تونسہ',       ucs: ['Taunsa City', 'Chaubara', 'Kot Chutta Road', 'Sakhi Sarwar'], ucs_ur: ['تونسہ شہر', 'چوبارہ', 'کوٹ چھٹہ روڈ', 'سخی سرور'] },
          Vehova:        { ur: 'ویہوا',        ucs: ['Vehova City', 'Choti', 'DG Khan Road', 'Taunsa Road'], ucs_ur: ['ویہوا شہر', 'چوٹی', 'ڈی جی خان روڈ', 'تونسہ روڈ'] },
          'Koh-e-Suleman': { ur: 'کوہِ سلیمان', ucs: ['Koh-e-Suleman Area', 'Choti', 'Sakhi Sarwar', 'Taunsa Road'], ucs_ur: ['کوہِ سلیمان علاقہ', 'چوٹی', 'سخی سرور', 'تونسہ روڈ'] },
        },
      },
      'Toba Tek Singh': {
        ur: 'ٹوبہ ٹیک سنگھ',
        tehsils: {
          'Toba Tek Singh': { ur: 'ٹوبہ ٹیک سنگھ', ucs: ['Toba Tek Singh City', 'Chak No. 1 GB', 'Chak No. 5 GB', 'Faisalabad Road'], ucs_ur: ['ٹوبہ ٹیک سنگھ شہر', 'چک نمبر 1 جی بی', 'چک نمبر 5 جی بی', 'فیصل آباد روڈ'] },
          Gojra:            { ur: 'گوجرہ',           ucs: ['Gojra City', 'Chak No. 214', 'Chak No. 279', 'Chak No. 333'], ucs_ur: ['گوجرہ شہر', 'چک نمبر 214', 'چک نمبر 279', 'چک نمبر 333'] },
          Kamalia:          { ur: 'کمالیہ',          ucs: ['Kamalia City', 'Chak No. 331', 'Chak No. 356', 'Chak No. 369'], ucs_ur: ['کمالیہ شہر', 'چک نمبر 331', 'چک نمبر 356', 'چک نمبر 369'] },
          'Pir Mahal':      { ur: 'پیر محل',         ucs: ['Pir Mahal City', 'Chak No. 1 GB', 'Chak No. 5 GB', 'Toba Road'], ucs_ur: ['پیر محل شہر', 'چک نمبر 1 جی بی', 'چک نمبر 5 جی بی', 'ٹوبہ روڈ'] },
        },
      },
      Vehari: {
        ur: 'وہاڑی',
        tehsils: {
          Vehari:   { ur: 'وہاڑی',    ucs: ['Vehari City', 'Burewala Road', 'Mailsi Road', 'Multan Road'], ucs_ur: ['وہاڑی شہر', 'بورے والا روڈ', 'میلسی روڈ', 'ملتان روڈ'] },
          Mailsi:   { ur: 'میلسی',    ucs: ['Mailsi City', 'Chak No. 31 WB', 'Chak No. 44 WB', 'Tibba Sultanpur'], ucs_ur: ['میلسی شہر', 'چک نمبر 31 ڈبلیو بی', 'چک نمبر 44 ڈبلیو بی', 'ٹبہ سلطان پور'] },
          Burewala: { ur: 'بورے والا', ucs: ['Burewala City', 'Gagoo', 'Harappa', 'Sahuka'], ucs_ur: ['بورے والا شہر', 'گاگو', 'ہڑپہ', 'ساہوکہ'] },
        },
      },
      Wazirabad: {
        ur: 'وزیرآباد',
        tehsils: {
          Wazirabad:      { ur: 'وزیرآباد',    ucs: ['Wazirabad City', 'Hafizabad Road', 'Rasul', 'Sohdra'], ucs_ur: ['وزیرآباد شہر', 'حافظ آباد روڈ', 'رسول', 'سوہدرہ'] },
          'Alipur Chatha': { ur: 'علی پور چٹھہ', ucs: ['Alipur Chatha City', 'Eminabad', 'Gujranwala Road', 'Wazirabad Road'], ucs_ur: ['علی پور چٹھہ شہر', 'ایمن آباد', 'گوجرانوالہ روڈ', 'وزیرآباد روڈ'] },
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
          Badin:                { ur: 'بدین',              ucs: ['Badin City', 'Kadhan', 'Tando Bago'], ucs_ur: ['بدین شہر', 'کڈھن', 'ٹنڈو باگو'] },
          Matli:                { ur: 'مٹلی',               ucs: ['Matli City', 'Sujawal Road'], ucs_ur: ['مٹلی شہر', 'سجاول روڈ'] },
          'Shaheed Fazil Rahu': { ur: 'شہید فاضل راہو',    ucs: ['Shaheed Fazil Rahu City', 'Badin Road'], ucs_ur: ['شہید فاضل راہو شہر', 'بدین روڈ'] },
          Talhar:               { ur: 'تالہار',              ucs: ['Talhar City', 'Badin Road'], ucs_ur: ['تالہار شہر', 'بدین روڈ'] },
          'Tando Bago':         { ur: 'ٹنڈو باگو',          ucs: ['Tando Bago City', 'Golarchi'], ucs_ur: ['ٹنڈو باگو شہر', 'گولارچی'] },
        },
      },
    
      Dadu: {
        ur: 'دادو',
        tehsils: {
          Dadu:                  { ur: 'دادو',               ucs: ['Dadu City', 'Sehwan Road'], ucs_ur: ['دادو شہر', 'سیہون روڈ'] },
          Johi:                  { ur: 'جوہی',               ucs: ['Johi City', 'Bhit Shah'], ucs_ur: ['جوہی شہر', 'بھٹ شاہ'] },
          'Khairpur Nathan Shah': { ur: 'خیرپور ناتھن شاہ',  ucs: ['Khairpur Nathan Shah City'], ucs_ur: ['خیرپور ناتھن شاہ شہر'] },
          Mehar:                 { ur: 'مہر',                ucs: ['Mehar City', 'Warah'], ucs_ur: ['مہر شہر', 'وارہ'] },
        },
      },

      Ghotki: {
        ur: 'گھوٹکی',
        tehsils: {
          Daharki:              { ur: 'دہرکی',       ucs: ['Daharki City', 'Obaro'], ucs_ur: ['دہرکی شہر', 'اوبارو'] },
          Ghotki:               { ur: 'گھوٹکی',     ucs: ['Ghotki City', 'Mirpur Mathelo Road'], ucs_ur: ['گھوٹکی شہر', 'میرپور ماتھیلو روڈ'] },
          'Khan Garh (Khanpur)': { ur: 'کھان گڑھ (خان پور)', ucs: ['Khan Garh City', 'Khanpur'], ucs_ur: ['کھان گڑھ شہر', 'خان پور'] },
          'Mirpur Mathelo':     { ur: 'میرپور ماتھیلو', ucs: ['Mirpur Mathelo City', 'Daharki Road'], ucs_ur: ['میرپور ماتھیلو شہر', 'دہرکی روڈ'] },
          Ubauro:               { ur: 'عبیدو',       ucs: ['Ubauro City', 'Ghotki Road'], ucs_ur: ['عبیدو شہر', 'گھوٹکی روڈ'] },
        },
      },
      
      Hyderabad: {
        ur: 'حیدرآباد',
        tehsils: {
          'Hyderabad City': { ur: 'حیدرآباد سٹی', ucs: ['Hirabad', 'Hussainabad', 'Tilak Incline'], ucs_ur: ['ہیرآباد', 'حسین آباد', 'ٹلک انکلائن'] },
          Hyderabad:        { ur: 'حیدرآباد',      ucs: ['Hyderabad Rural', 'Tando Jam'], ucs_ur: ['حیدرآباد دیہی', 'ٹنڈو جام'] },
          Latifabad:        { ur: 'لطیف آباد',     ucs: ['Latifabad', 'Qasimabad Area'], ucs_ur: ['لطیف آباد', 'قاسم آباد'] },
          Qasimabad:        { ur: 'قاسم آباد',     ucs: ['Qasimabad', 'Husri', 'Konkar'], ucs_ur: ['قاسم آباد', 'حسری', 'کونکر'] },
        },
      },

      Jacobabad: {
        ur: 'جیکب آباد',
        tehsils: {
          'Garhi Khairo': { ur: 'گڑھی خیرو', ucs: ['Garhi Khairo City', 'Jacobabad Road'], ucs_ur: ['گڑھی خیرو شہر', 'جیکب آباد روڈ'] },
          Jacobabad:      { ur: 'جیکب آباد', ucs: ['Jacobabad City', 'Kashmor Road'], ucs_ur: ['جیکب آباد شہر', 'کشمور روڈ'] },
          Thul:           { ur: 'ٹھل',       ucs: ['Thul City', 'Kandhkot Road'], ucs_ur: ['ٹھل شہر', 'کندھکوٹ روڈ'] },
        },
      },
      
      Jamshoro: {
        ur: 'جامشورو',
        tehsils: {
          Kotri:            { ur: 'کوٹری',           ucs: ['Kotri City', 'Hyderabad Road'], ucs_ur: ['کوٹری شہر', 'حیدرآباد روڈ'] },
          Sehwan:           { ur: 'سیہون',           ucs: ['Sehwan City', 'Laki Shah Saddar'], ucs_ur: ['سیہون شہر', 'لکی شاہ صدر'] },
          Manjhand:         { ur: 'منجھند',          ucs: ['Manjhand City', 'Jhirk'], ucs_ur: ['منجھند شہر', 'جھرک'] },
          'Thana Bulla Khan': { ur: 'تھانہ بلاخان', ucs: ['Thana Bulla Khan City', 'Kirthar Road'], ucs_ur: ['تھانہ بلاخان شہر', 'کرتھر روڈ'] },
        },
      },

      'Karachi Central': {
        ur: 'کراچی وسطی',
        tehsils: {
          'Gulberg Town':       { ur: 'گلبرگ ٹاؤن',       ucs: ['Gulberg', 'Paposh Nagar', 'Natha Khan Goth'], ucs_ur: ['گلبرگ', 'پاپوش نگر', 'ناتھا خان گوٹھ'] },
          'Liaquatabad Town':   { ur: 'لیاقت آباد ٹاؤن',   ucs: ['Liaquatabad', 'Nazimabad'], ucs_ur: ['لیاقت آباد', 'ناظم آباد'] },
          'New Karachi Town':   { ur: 'نیو کراچی ٹاؤن',    ucs: ['New Karachi', 'North Karachi'], ucs_ur: ['نیو کراچی', 'نارتھ کراچی'] },
          'North Nazimabad Town': { ur: 'نارتھ ناظم آباد ٹاؤن', ucs: ['North Nazimabad', 'Federal B Area'], ucs_ur: ['نارتھ ناظم آباد', 'فیڈرل بی ایریا'] },
          'Nazimabad Town':     { ur: 'ناظم آباد ٹاؤن',    ucs: ['Nazimabad', 'Buffer Zone'], ucs_ur: ['ناظم آباد', 'بفر زون'] },
        },
      },

      'Karachi East': {
        ur: 'کراچی مشرقی',
        tehsils: {
          'Jamshed Town':    { ur: 'جمشید ٹاؤن',     ucs: ['Jamshed Quarter', 'Soldier Bazar'], ucs_ur: ['جمشید کوارٹر', 'سولجر بازار'] },
          'Ferozabad':       { ur: 'فیروز آباد',       ucs: ['Ferozabad', 'Gulshan Iqbal North'], ucs_ur: ['فیروز آباد', 'گلشن اقبال نارتھ'] },
          'Gulshan-e-Iqbal': { ur: 'گلشن اقبال',       ucs: ['Gulshan-e-Iqbal', 'Gulistan-e-Johar'], ucs_ur: ['گلشن اقبال', 'گلستان جوہر'] },
          'Gulzar-e-Hijri':  { ur: 'گلزار ہجری',       ucs: ['Gulzar-e-Hijri', 'Scheme 33'], ucs_ur: ['گلزار ہجری', 'سکیم 33'] },
        },
      },
      
      'Karachi South': {
        ur: 'کراچی جنوبی',
        tehsils: {
          'Lyari Town':  { ur: 'لیاری ٹاؤن',  ucs: ['Lyari', 'Kalakot'], ucs_ur: ['لیاری', 'کالاکوٹ'] },
          'Saddar Town': { ur: 'صدر ٹاؤن',    ucs: ['Saddar', 'Civil Lines', 'Garden'], ucs_ur: ['صدر', 'سول لائنز', 'گارڈن'] },
          'Aram Bagh':   { ur: 'آرام باغ',     ucs: ['Aram Bagh', 'Kharadar'], ucs_ur: ['آرام باغ', 'کھارادر'] },
          'Civil Line':  { ur: 'سول لائن',     ucs: ['Civil Lines', 'Clifton', 'Defence'], ucs_ur: ['سول لائنز', 'کلفٹن', 'ڈیفنس'] },
          'Garden':      { ur: 'گارڈن',        ucs: ['Garden East', 'Garden West'], ucs_ur: ['گارڈن ایسٹ', 'گارڈن ویسٹ'] },
        },
      },

      'Karachi West': {
        ur: 'کراچی مغربی',
        tehsils: {
          'Orangi Town':  { ur: 'اورنگی ٹاؤن',  ucs: ['Orangi', 'SITE'], ucs_ur: ['اورنگی', 'سائیٹ'] },
          'Manghopir':    { ur: 'منگھوپیر',      ucs: ['Manghopir', 'Wali Muhammad Goth'], ucs_ur: ['منگھوپیر', 'ولی محمد گوٹھ'] },
          'Mominabad':    { ur: 'مومن آباد',      ucs: ['Mominabad', 'Qasba Colony'], ucs_ur: ['مومن آباد', 'قصبہ کالونی'] },
        },
      },
      
      Kashmore: {
        ur: 'کشمور',
        tehsils: {
          Kandhkot:  { ur: 'کندھکوٹ', ucs: ['Kandhkot City', 'Kashmore Road'], ucs_ur: ['کندھکوٹ شہر', 'کشمور روڈ'] },
          Kashmore:  { ur: 'کشمور',   ucs: ['Kashmore City', 'Jacobabad Road'], ucs_ur: ['کشمور شہر', 'جیکب آباد روڈ'] },
          Tangwani:  { ur: 'تنگوانی', ucs: ['Tangwani City', 'Miro Khan'], ucs_ur: ['تنگوانی شہر', 'میرو خان'] },
        },
      },

      Keamari: {
        ur: 'کیماڑی',
        tehsils: {
          'Keamari Town': { ur: 'کیماڑی ٹاؤن', ucs: ['Keamari', 'Harbour'], ucs_ur: ['کیماڑی', 'ہاربر'] },
          'Baldia Town':  { ur: 'بلدیہ ٹاؤن',  ucs: ['Baldia', 'Mochko'], ucs_ur: ['بلدیہ', 'موچکو'] },
          'S.I.T.E. Town': { ur: 'سائیٹ ٹاؤن', ucs: ['SITE', 'Shershah'], ucs_ur: ['سائیٹ', 'شیر شاہ'] },
          Maripur:        { ur: 'ماری پور',     ucs: ['Maripur', 'Manora'], ucs_ur: ['ماری پور', 'منوڑہ'] },
        },
      },

      Khairpur: {
        ur: 'خیرپور',
        tehsils: {
          'Faiz Ganj': { ur: 'فیض گنج',   ucs: ['Faiz Ganj City', 'Khairpur Road'], ucs_ur: ['فیض گنج شہر', 'خیرپور روڈ'] },
          Gambat:      { ur: 'گمبٹ',       ucs: ['Gambat City', 'Sukkur Road'], ucs_ur: ['گمبٹ شہر', 'سکھر روڈ'] },
          Khairpur:    { ur: 'خیرپور',     ucs: ['Khairpur City', 'Sukkur Road'], ucs_ur: ['خیرپور شہر', 'سکھر روڈ'] },
          Kingri:      { ur: 'کنگری',      ucs: ['Kingri City', 'Khairpur Road'], ucs_ur: ['کنگری شہر', 'خیرپور روڈ'] },
          'Kot Diji':  { ur: 'کوٹ ڈیجی',  ucs: ['Kot Diji City', 'Khairpur Road'], ucs_ur: ['کوٹ ڈیجی شہر', 'خیرپور روڈ'] },
          Nara:        { ur: 'نارہ',        ucs: ['Nara City', 'Desert Area'], ucs_ur: ['نارہ شہر', 'صحرائی علاقہ'] },
          'Sobho Dero': { ur: 'سوبھو ڈیرو', ucs: ['Sobho Dero City', 'Khairpur Road'], ucs_ur: ['سوبھو ڈیرو شہر', 'خیرپور روڈ'] },
          'Thari Mirwah': { ur: 'تھری میرواہ', ucs: ['Thari Mirwah City', 'Adilpur'], ucs_ur: ['تھری میرواہ شہر', 'عادل پور'] },
        },
      },

      Korangi: {
        ur: 'کورنگی',
        tehsils: {
          'Korangi Town':    { ur: 'کورنگی ٹاؤن',    ucs: ['Korangi', 'Korangi Creek Cantt'], ucs_ur: ['کورنگی', 'کورنگی کریک کینٹ'] },
          'Landhi Town':     { ur: 'لانڈھی ٹاؤن',    ucs: ['Landhi', 'Bin Qasim'], ucs_ur: ['لانڈھی', 'بن قاسم'] },
          'Shah Faisal Town': { ur: 'شاہ فیصل ٹاؤن', ucs: ['Shah Faisal', 'Faisal Cantt'], ucs_ur: ['شاہ فیصل', 'فیصل کینٹ'] },
          'Model Colony':    { ur: 'ماڈل کالونی',     ucs: ['Model Colony', 'Pak Colony'], ucs_ur: ['ماڈل کالونی', 'پاک کالونی'] },
        },
      },
      
      Larkana: {
        ur: 'لاڑکانہ',
        tehsils: {
          Bakrani:  { ur: 'بکرانی',   ucs: ['Bakrani City', 'Larkana Road'], ucs_ur: ['بکرانی شہر', 'لاڑکانہ روڈ'] },
          Dokri:    { ur: 'ڈوکری',    ucs: ['Dokri City', 'Naudero'], ucs_ur: ['ڈوکری شہر', 'نودیرو'] },
          Larkana:  { ur: 'لاڑکانہ', ucs: ['Larkana City', 'Naudero Road'], ucs_ur: ['لاڑکانہ شہر', 'نودیرو روڈ'] },
          Ratodero: { ur: 'رتوڈیرو',  ucs: ['Ratodero City', 'Shahdadkot Road'], ucs_ur: ['رتوڈیرو شہر', 'شہداد کوٹ روڈ'] },
        },
      },

      Malir: {
        ur: 'ملیر',
        tehsils: {
          'Bin Qasim':       { ur: 'بن قاسم',       ucs: ['Bin Qasim', 'Port Qasim'], ucs_ur: ['بن قاسم', 'پورٹ قاسم'] },
          'Gadap Town':      { ur: 'گڈاپ ٹاؤن',     ucs: ['Gadap', 'Superhighway'], ucs_ur: ['گڈاپ', 'سپرہائی وے'] },
          Airport:           { ur: 'ایئرپورٹ',       ucs: ['Airport', 'Gulshan Hadeed'], ucs_ur: ['ایئرپورٹ', 'گلشن حدید'] },
          'Ibrahim Hyderi':  { ur: 'ابراہیم حیدری',  ucs: ['Ibrahim Hyderi', 'Rehri Goth'], ucs_ur: ['ابراہیم حیدری', 'ریڑھی گوٹھ'] },
          'Murad Memon Goth': { ur: 'مراد میمن گوٹھ', ucs: ['Murad Memon Goth', 'Malir City'], ucs_ur: ['مراد میمن گوٹھ', 'ملیر شہر'] },
          'Shah Mureed':     { ur: 'شاہ مرید',       ucs: ['Shah Mureed', 'Gadap North'], ucs_ur: ['شاہ مرید', 'گڈاپ نارتھ'] },
        },
      },

      Matiari: {
        ur: 'مٹیاری',
        tehsils: {
          Hala:      { ur: 'ہالہ',      ucs: ['Hala City', 'New Hala'], ucs_ur: ['ہالہ شہر', 'نیا ہالہ'] },
          Matiari:   { ur: 'مٹیاری',   ucs: ['Matiari City', 'Bhit Shah Road'], ucs_ur: ['مٹیاری شہر', 'بھٹ شاہ روڈ'] },
          Saeedabad: { ur: 'سعید آباد', ucs: ['Saeedabad City', 'Hala Road'], ucs_ur: ['سعید آباد شہر', 'ہالہ روڈ'] },
        },
      },
      
      'Mirpur Khas': {
        ur: 'میرپور خاص',
        tehsils: {
          'Mirpur Khas':        { ur: 'میرپور خاص',    ucs: ['Mirpur Khas City', 'Digri Road'], ucs_ur: ['میرپور خاص شہر', 'دیگری روڈ'] },
          Digri:                { ur: 'دیگری',          ucs: ['Digri City', 'Mirpur Khas Road'], ucs_ur: ['دیگری شہر', 'میرپور خاص روڈ'] },
          'Kot Ghulam Mohammad': { ur: 'کوٹ غلام محمد', ucs: ['Kot Ghulam Mohammad City'], ucs_ur: ['کوٹ غلام محمد شہر'] },
          Jhuddo:               { ur: 'جھڈو',           ucs: ['Jhuddo City', 'Sindhri Road'], ucs_ur: ['جھڈو شہر', 'سندھڑی روڈ'] },
          Sindhri:              { ur: 'سندھڑی',         ucs: ['Sindhri City', 'Digri Road'], ucs_ur: ['سندھڑی شہر', 'دیگری روڈ'] },
          'Hussain Bux Marri':  { ur: 'حسین بخش ماڑی', ucs: ['Hussain Bux Marri City', 'Mirpur Khas Road'], ucs_ur: ['حسین بخش ماڑی شہر', 'میرپور خاص روڈ'] },
          Shujabad:             { ur: 'شجاع آباد',     ucs: ['Mirwah Gorchani', 'Makhan Samoon', 'Jhilori'], ucs_ur: ['میرواہ گورچانی', 'مکھن سموں', 'جھلوری'] },
        },
      },
      
      'Naushahro Feroze': {
        ur: 'نوشہرو فیروز',
        tehsils: {
          Bhiria:           { ur: 'بھریہ',           ucs: ['Bhiria City', 'Naushahro Feroze Road'], ucs_ur: ['بھریہ شہر', 'نوشہرو فیروز روڈ'] },
          Kandiaro:         { ur: 'کنڈیارو',         ucs: ['Kandiaro City', 'Moro Road'], ucs_ur: ['کنڈیارو شہر', 'مورو روڈ'] },
          Mehrabpur:        { ur: 'محراب پور',        ucs: ['Mehrabpur City', 'Hyderabad Road'], ucs_ur: ['محراب پور شہر', 'حیدرآباد روڈ'] },
          Moro:             { ur: 'مورو',             ucs: ['Moro City', 'Sukkur Road'], ucs_ur: ['مورو شہر', 'سکھر روڈ'] },
          'Naushahro Feroze': { ur: 'نوشہرو فیروز',  ucs: ['Naushahro Feroze City', 'Kandiaro Road'], ucs_ur: ['نوشہرو فیروز شہر', 'کنڈیارو روڈ'] },
        },
      },
      
      'Qambar Shahdadkot': {
        ur: 'قمبر شہداد کوٹ',
        tehsils: {
          Mirokhan:       { ur: 'میرو خان',      ucs: ['Mirokhan City', 'Shahdadkot Road'], ucs_ur: ['میرو خان شہر', 'شہداد کوٹ روڈ'] },
          Nasirabad:      { ur: 'نصیرآباد',      ucs: ['Nasirabad City', 'Qambar Road'], ucs_ur: ['نصیرآباد شہر', 'قمبر روڈ'] },
          Qambar:         { ur: 'قمبر',          ucs: ['Qambar City', 'Larkana Road'], ucs_ur: ['قمبر شہر', 'لاڑکانہ روڈ'] },
          'Qubo Saeed Khan': { ur: 'قبو سعید خان', ucs: ['Qubo Saeed Khan City'], ucs_ur: ['قبو سعید خان شہر'] },
          Shahdadkot:     { ur: 'شہداد کوٹ',    ucs: ['Shahdadkot City', 'Ratodero Road'], ucs_ur: ['شہداد کوٹ شہر', 'رتوڈیرو روڈ'] },
          'Sijawal Junejo': { ur: 'سجاول جونیجو', ucs: ['Sijawal Junejo City', 'Warah Road'], ucs_ur: ['سجاول جونیجو شہر', 'وارہ روڈ'] },
          Warah:          { ur: 'وارہ',          ucs: ['Warah City', 'Dadu Road'], ucs_ur: ['وارہ شہر', 'دادو روڈ'] },
        },
      },
      
      Sanghar: {
        ur: 'سانگھڑ',
        tehsils: {
          'Jam Nawaz Ali': { ur: 'جام نواز علی',  ucs: ['Jam Nawaz Ali City', 'Sanghar Road'], ucs_ur: ['جام نواز علی شہر', 'سانگھڑ روڈ'] },
          Khipro:          { ur: 'کھپرو',          ucs: ['Khipro City', 'Mirpur Khas Road'], ucs_ur: ['کھپرو شہر', 'میرپور خاص روڈ'] },
          Sanghar:         { ur: 'سانگھڑ',         ucs: ['Sanghar City', 'Nawabshah Road'], ucs_ur: ['سانگھڑ شہر', 'نواب شاہ روڈ'] },
          Shahdadpur:      { ur: 'شہداد پور',      ucs: ['Shahdadpur City', 'Hyderabad Road'], ucs_ur: ['شہداد پور شہر', 'حیدرآباد روڈ'] },
          Sinjhoro:        { ur: 'سنجھورو',        ucs: ['Sinjhoro City', 'Sanghar Road'], ucs_ur: ['سنجھورو شہر', 'سانگھڑ روڈ'] },
          'Tando Adam':    { ur: 'ٹنڈو آدم',       ucs: ['Tando Adam I', 'Tando Adam II', 'Tando Adam III', 'Tando Adam IV', 'Tando Adam Rural', 'Peeromal', 'Machhi' ], ucs_ur: ['ٹنڈو آدم ۱', 'ٹنڈو آدم ۲', 'ٹنڈو آدم ۳', 'ٹنڈو آدم ۴', 'ٹنڈو آدم دیہی', 'پیرومل', 'ماچھی' ] },
        },
      },
      
      'Shaheed Benazirabad': {
        ur: 'شہید بے نظیرآباد',
        tehsils: {
          'Kazi Ahmed':       { ur: 'قاضی احمد',      ucs: ['Kazi Ahmed City', 'Nawabshah Road'], ucs_ur: ['قاضی احمد شہر', 'نواب شاہ روڈ'] },
          Daur:               {ur: 'دور',              ucs: ['Daur', 'Bandhi', 'Bucheri', 'Mirza Bagh', 'Gul Muhammad Jakhrani'], ucs_ur: ['دور', 'باندھی', 'بچیری', 'مرزا باغ', 'گل محمد جکھرانی'] },
          'Nawabshah':        { ur: 'نواب شاہ',        ucs: ['Nawabshah City', 'Sakrand Road'], ucs_ur: ['نواب شاہ شہر', 'سکرنڈ روڈ'] },
          Sakrand:            { ur: 'سکرنڈ',           ucs: ['Sakrand City', 'Hyderabad Road'], ucs_ur: ['سکرنڈ شہر', 'حیدرآباد روڈ'] },
        },
      },      

      Shikarpur: {
        ur: 'شکارپور',
        tehsils: {
          'Garhi Yasin': { ur: 'گڑھی یاسین', ucs: ['Garhi Yasin City', 'Shikarpur Road'], ucs_ur: ['گڑھی یاسین شہر', 'شکارپور روڈ'] },
          Khanpur:       { ur: 'خان پور مہر', ucs: ['Khanpur City', 'Garhi Yasin Road'], ucs_ur: ['خان پور شہر', 'گڑھی یاسین روڈ'] },
          Lakhi:         { ur: 'لاکھی',       ucs: ['Lakhi City', 'Larkana Road'], ucs_ur: ['لاکھی شہر', 'لاڑکانہ روڈ'] },
          Shikarpur:     { ur: 'شکارپور',     ucs: ['Shikarpur City', 'Jacobabad Road'], ucs_ur: ['شکارپور شہر', 'جیکب آباد روڈ'] },
        },
      },
      
      Sujawal: {
        ur: 'سجاول',
        tehsils: {
          Jati:            { ur: 'جاتی',          ucs: ['Jati City', 'Coastal Area'], ucs_ur: ['جاتی شہر', 'ساحلی علاقہ'] },
          'Kharo Chan':    { ur: 'کھارو چھان',   ucs: ['Kharo Chan City'], ucs_ur: ['کھارو چھان شہر'] },
          'Mirpur Bathoro': { ur: 'میرپور بٹھورو', ucs: ['Mirpur Bathoro City', 'Sujawal Road'], ucs_ur: ['میرپور بٹھورو شہر', 'سجاول روڈ'] },
          'Shah Bandar':   { ur: 'شاہ بندر',      ucs: ['Shah Bandar City', 'Chuhar Jamali'], ucs_ur: ['شاہ بندر شہر', 'چوہڑ جمالی'] },
          Sujawal:         { ur: 'سجاول',         ucs: ['Sujawal City', 'Jungshahi'], ucs_ur: ['سجاول شہر', 'جنگشاہی'] },
        },
      },

      Sukkur: {
        ur: 'سکھر',
        tehsils: {
          'New Sukkur': { ur: 'نیو سکھر',   ucs: ['New Sukkur City', 'Pano Akil Road'], ucs_ur: ['نیو سکھر شہر', 'پانو عقیل روڈ'] },
          'Pano Akil':  { ur: 'پانو عقیل',  ucs: ['Pano Akil City', 'Rohri Road'], ucs_ur: ['پانو عقیل شہر', 'روہڑی روڈ'] },
          Rohri:        { ur: 'روہڑی',       ucs: ['Rohri City', 'Sukkur Road'], ucs_ur: ['روہڑی شہر', 'سکھر روڈ'] },
          Salehpat:     { ur: 'صالح پت',    ucs: ['Salehpat City', 'Rural Area'], ucs_ur: ['صالح پت شہر', 'دیہی علاقہ'] },
          Sukkur:       { ur: 'سکھر',        ucs: ['Sukkur City', 'Ghouspur'], ucs_ur: ['سکھر شہر', 'غوث پور'] },
        },
      },

      'Tando Allahyar': {
        ur: 'ٹنڈو اللہ یار',
        tehsils: {
          Chamber:        { ur: 'چیمبر',         ucs: ['Chamber City', 'Tando Allahyar Road'], ucs_ur: ['چیمبر شہر', 'ٹنڈو اللہ یار روڈ'] },
          'Jhando Mari':  { ur: 'جھنڈو ماری',   ucs: ['Jhando Mari City', 'Hyderabad Road'], ucs_ur: ['جھنڈو ماری شہر', 'حیدرآباد روڈ'] },
          'Tando Allahyar': { ur: 'ٹنڈو اللہ یار', ucs: ['Tando Allahyar City', 'Shahdadpur Road'], ucs_ur: ['ٹنڈو اللہ یار شہر', 'شہداد پور روڈ'] },
        },
      },

      'Tando Muhammad Khan': {
        ur: 'ٹنڈو محمد خان',
        tehsils: {
          'Bulri Shah Karim': { ur: 'بولڑی شاہ کریم', ucs: ['Bulri Shah Karim City', 'Hyderabad Road'], ucs_ur: ['بولڑی شاہ کریم شہر', 'حیدرآباد روڈ'] },
          'Tando Ghulam Hyder': { ur: 'ٹنڈو غلام حیدر', ucs: ['Tando Ghulam Hyder City'], ucs_ur: ['ٹنڈو غلام حیدر شہر'] },
          'Tando Muhammad Khan': { ur: 'ٹنڈو محمد خان', ucs: ['Tando Muhammad Khan City', 'Badin Road'], ucs_ur: ['ٹنڈو محمد خان شہر', 'بدین روڈ'] },
        },
      },

      Tharparkar: {
        ur: 'تھرپارکر',
        tehsils: {
          Chachro:      { ur: 'چھاچھرو',   ucs: ['Chachro City', 'Mithi Road'], ucs_ur: ['چھاچھرو شہر', 'مٹھی روڈ'] },
          Diplo:        { ur: 'ڈیپلو',     ucs: ['Diplo City', 'Mithi Road'], ucs_ur: ['ڈیپلو شہر', 'مٹھی روڈ'] },
          Dhali:        { ur: 'ڈھالی',     ucs: ['Dhali City', 'Chachro Road'], ucs_ur: ['ڈھالی شہر', 'چھاچھرو روڈ'] },
          Islamkot:     { ur: 'اسلام کوٹ', ucs: ['Islamkot City', 'Mithi Road'], ucs_ur: ['اسلام کوٹ شہر', 'مٹھی روڈ'] },
          Kaloi:        { ur: 'کلوئی',     ucs: ['Kaloi City', 'Tharparkar Road'], ucs_ur: ['کلوئی شہر', 'تھرپارکر روڈ'] },
          Mithi:        { ur: 'مٹھی',      ucs: ['Mithi City', 'Islamkot Road'], ucs_ur: ['مٹھی شہر', 'اسلام کوٹ روڈ'] },
          'Nagar Parkar': { ur: 'نگر پارکر', ucs: ['Nagar Parkar City', 'Mithi Road'], ucs_ur: ['نگر پارکر شہر', 'مٹھی روڈ'] },
        },
      },

      Thatta: {
        ur: 'ٹھٹہ',
        tehsils: {
          Ghorabari:    { ur: 'گھوڑا باری',  ucs: ['Ghorabari City', 'Thatta Road'], ucs_ur: ['گھوڑا باری شہر', 'ٹھٹہ روڈ'] },
          'Keti Bunder': { ur: 'کیٹی بندر',  ucs: ['Keti Bunder City', 'Coastal Area'], ucs_ur: ['کیٹی بندر شہر', 'ساحلی علاقہ'] },
          'Mirpur Sakro': { ur: 'میرپور ساکرو', ucs: ['Mirpur Sakro City', 'Gharo'], ucs_ur: ['میرپور ساکرو شہر', 'گھارو'] },
          Thatta:        { ur: 'ٹھٹہ',        ucs: ['Thatta City', 'Makli'], ucs_ur: ['ٹھٹہ شہر', 'مکلی'] },
        },
      },

      Umerkot: {
        ur: 'عمرکوٹ',
        tehsils: {
          Umerkot:  { ur: 'عمرکوٹ', ucs: ['Umerkot City', 'Mirpur Khas Road'], ucs_ur: ['عمرکوٹ شہر', 'میرپور خاص روڈ'] },
          Samaro:   { ur: 'سمارو',  ucs: ['Samaro City', 'Umerkot Road'], ucs_ur: ['سمارو شہر', 'عمرکوٹ روڈ'] },
          Kunri:    { ur: 'کنری',   ucs: ['Kunri City', 'Mirpur Khas Road'], ucs_ur: ['کنری شہر', 'میرپور خاص روڈ'] },
          Pithoro:  { ur: 'پیٹھورو', ucs: ['Pithoro City', 'Umerkot Road'], ucs_ur: ['پیٹھورو شہر', 'عمرکوٹ روڈ'] },
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
          Awaran:    { ur: 'آواران',    ucs: ['Awaran', 'Gishkaur', 'Shandi', 'Teertaaj', 'Waja Bagh'],   ucs_ur: ['آواران', 'گشکور', 'شندی', 'تیرتاج', 'واجہ باغ'] },
          Gishkaur:  { ur: 'گشکور',     ucs: ['Gishkaur', 'Kohlu'],                                      ucs_ur: ['گشکور', 'کوہلو'] },
          'Jhal Jhao': { ur: 'جھل جھاؤ', ucs: ['Jhao Camp', 'Korak Jhao'],                                 ucs_ur: ['جھاؤ کیمپ', 'کوراک جھاؤ'] },
          'Korak Jhao': { ur: 'کوراک جھاؤ', ucs: ['Korak Jhao', 'Mashkai'],                                 ucs_ur: ['کوراک جھاؤ', 'ماشکئی'] },
          Mashkai:   { ur: 'ماشکئی',    ucs: ['Gajjar', 'Nokjo', 'Parwar'],                               ucs_ur: ['گجر', 'نوکجو', 'پروار'] },
        },
      },
      
      Barkhan: {
        ur: 'بارکھان',
        tehsils: {
          Barkhan: { ur: 'بارکھان', ucs: ['Barkhan City', 'Barkhan Rural'], ucs_ur: ['بارکھان شہر', 'بارکھان دیہی'] },
        },
      },

      Barshore: {
        ur: 'بارشور',
        tehsils: {
          Barshore: { ur: 'بارشور', ucs: ['Barshore City', 'Barshore Rural'], ucs_ur: ['بارشور شہر', 'بارشور دیہی'] },
        },
      },

      Chagai: {
        ur: 'چاغی',
        tehsils: {
          Amuri:      { ur: 'امری',     ucs: ['Amuri'],      ucs_ur: ['امری'] },
          Chagai:     { ur: 'چاغی',     ucs: ['Chagai'],     ucs_ur: ['چاغی'] },
          Chilgazi:   { ur: 'چلغزی',    ucs: ['Chilgazi'],   ucs_ur: ['چلغزی'] },
          Dalbandin:  { ur: 'دالبندین', ucs: ['Dalbandin City', 'Dalbandin Rural'], ucs_ur: ['دالبندین شہر', 'دالبندین دیہی'] },
          'Nok Kundi': { ur: 'نوک کنڈی', ucs: ['Nok Kundi'], ucs_ur: ['نوک کنڈی'] },
          Yakmach:    { ur: 'یکماچ',    ucs: ['Yakmach'],    ucs_ur: ['یکماچ'] },
        },
      },

      Chaman: {
        ur: 'چمن',
        tehsils: {
          Chaman:        { ur: 'چمن',      ucs: ['Chaman City'],        ucs_ur: ['چمن شہر'] },
          'Chaman Saddar': { ur: 'چمن صدر', ucs: ['Chaman Saddar'],     ucs_ur: ['چمن صدر'] },
        },
      },
      
      'Dera Bugti': {
        ur: 'ڈیرہ بگٹی',
        tehsils: {
          Baiker:     { ur: 'بیکر',     ucs: ['Baiker'],     ucs_ur: ['بیکر'] },
          Phelawagh:  { ur: 'پھیلاوغ',  ucs: ['Phelawagh'],  ucs_ur: ['پھیلاوغ'] },
          'Dera Bugti': { ur: 'ڈیرہ بگٹی', ucs: ['Dera Bugti City', 'Dera Bugti Rural'], ucs_ur: ['ڈیرہ بگٹی شہر', 'ڈیرہ بگٹی دیہی'] },
          Sui:       { ur: 'سوی',       ucs: ['Sui City', 'Sui Rural'], ucs_ur: ['سوی شہر', 'سوی دیہی'] },
        },
      },
      
      Duki: {
        ur: 'دوکی',
        tehsils: {
          Duki:          { ur: 'دوکی',          ucs: ['Duki City', 'Duki Rural'],    ucs_ur: ['دوکی شہر', 'دوکی دیہی'] },
          Luni:          { ur: 'لونی',           ucs: ['Luni'],                       ucs_ur: ['لونی'] },
          Talao:         { ur: 'تلاؤ',           ucs: ['Talao'],                      ucs_ur: ['تلاؤ'] },
          'Thal Chutyali': { ur: 'تھل چوٹیالی',  ucs: ['Thal Chutyali'],             ucs_ur: ['تھل چوٹیالی'] },
        },
      },
      
      Gwadar: {
        ur: 'گوادر',
        tehsils: {
          Gwadar: { ur: 'گوادر', ucs: ['Gwadar City', 'Gwadar East', 'Gwadar West'],  ucs_ur: ['گوادر شہر', 'گوادر مشرق', 'گوادر مغرب'] },
          Jiwani: { ur: 'جیوانی', ucs: ['Jiwani'],                                    ucs_ur: ['جیوانی'] },
          Ormara: { ur: 'اورماڑہ', ucs: ['Ormara'],                                   ucs_ur: ['اورماڑہ'] },
          Pasni:  { ur: 'پسنی',   ucs: ['Pasni City', 'Pasni Rural', 'Shadi Kaur'],   ucs_ur: ['پسنی شہر', 'پسنی دیہی', 'شادی کور'] },
          Suntsar: { ur: 'سنتسر', ucs: ['Suntsar'],                                   ucs_ur: ['سنتسر'] },
        },
      },

      Harnai: {
        ur: 'ہرنائی',
        tehsils: {
          Harnai: { ur: 'ہرنائی', ucs: ['Harnai City', 'Harnai Rural'], ucs_ur: ['ہرنائی شہر', 'ہرنائی دیہی'] },
          Khost:  { ur: 'خوست',   ucs: ['Khost'],                       ucs_ur: ['خوست'] },
          Shahrig: { ur: 'شاہرگ', ucs: ['Shahrig'],                     ucs_ur: ['شاہرگ'] },
        },
      },

      Hub: {
        ur: 'حب',
        tehsils: {
          Gadani:   { ur: 'گڈانی',   ucs: ['Gadani', 'Sonmiani'],         ucs_ur: ['گڈانی', 'سونمیانی'] },
          Sonmiani: { ur: 'سونمیانی', ucs: ['Sonmiani'],                   ucs_ur: ['سونمیانی'] },
          Hub:      { ur: 'حب',      ucs: ['Hub City', 'Hub Sakran'],      ucs_ur: ['حب شہر', 'حب سکران'] },
          Sakran:   { ur: 'سکران',   ucs: ['Sakran'],                     ucs_ur: ['سکران'] },
          Dureji:   { ur: 'دریجی',   ucs: ['Dureji'],                     ucs_ur: ['دریجی'] },
        },
      },
      
      Jafarabad: {
        ur: 'جعفرآباد',
        tehsils: {
          Jafarabad: { ur: 'جعفرآباد', ucs: ['Jafarabad'],  ucs_ur: ['جعفرآباد'] },
          Jhatpat:   { ur: 'جھٹ پٹ',    ucs: ['Jhatpat'],   ucs_ur: ['جھٹ پٹ'] },
        },
      },

      'Jhal Magsi': {
        ur: 'جھل مگسی',
        tehsils: {
          Gandavah:  { ur: 'گنداوہ',   ucs: ['Gandavah'],              ucs_ur: ['گنداوہ'] },
          'Jhal Magsi': { ur: 'جھل مگسی', ucs: ['Jhal Magsi City', 'Jhal Magsi Rural'], ucs_ur: ['جھل مگسی شہر', 'جھل مگسی دیہی'] },
          Mirpur:    { ur: 'میرپور',    ucs: ['Mirpur'],                ucs_ur: ['میرپور'] },
        },
      },

      Kachhi: {
        ur: 'کچھی',
        tehsils: {
          Balanari: { ur: 'بالاناری', ucs: ['Balanari'],             ucs_ur: ['بالاناری'] },
          Bhag:     { ur: 'بھاگ',    ucs: ['Bhag'],                  ucs_ur: ['بھاگ'] },
          Dhadar:   { ur: 'دھاڈر',   ucs: ['Dhadar City', 'Dhadar Rural'], ucs_ur: ['دھاڈر شہر', 'دھاڈر دیہی'] },
          Khattan:  { ur: 'خطان',    ucs: ['Khattan'],               ucs_ur: ['خطان'] },
          Machh:    { ur: 'ماچھ',    ucs: ['Machh City', 'Machh Rural'], ucs_ur: ['ماچھ شہر', 'ماچھ دیہی'] },
          Sani:     { ur: 'سانی',    ucs: ['Sani'],                  ucs_ur: ['سانی'] },
        },
      },

      Kalat: {
        ur: 'کلات',
        tehsils: {
          Gazg:      { ur: 'گازگ',     ucs: ['Gazg'],                        ucs_ur: ['گازگ'] },
          Johan:     { ur: 'جوہان',    ucs: ['Johan'],                       ucs_ur: ['جوہان'] },
          Kalat:     { ur: 'کلات',     ucs: ['Kalat City', 'Kalat Rural'],   ucs_ur: ['کلات شہر', 'کلات دیہی'] },
          Mangocher: { ur: 'منگوچر',   ucs: ['Mangocher'],                   ucs_ur: ['منگوچر'] },
        },
      },
      
      Kech: {
        ur: 'کیچ',
        tehsils: {
          Balnigor: { ur: 'بالنیگور', ucs: ['Balnigor'],                              ucs_ur: ['بالنیگور'] },
          Buleda:   { ur: 'بلیدہ',    ucs: ['Buleda'],                                ucs_ur: ['بلیدہ'] },
          Dasht:    { ur: 'دشت',      ucs: ['Dasht'],                                 ucs_ur: ['دشت'] },
          Gayab:    { ur: 'غیاب',     ucs: ['Gayab'],                                 ucs_ur: ['غیاب'] },
          Hoshab:   { ur: 'ہوشاب',    ucs: ['Hoshab'],                                ucs_ur: ['ہوشاب'] },
          Mand:     { ur: 'مند',      ucs: ['Mand City', 'Mand Rural'],               ucs_ur: ['مند شہر', 'مند دیہی'] },
          Solband:  { ur: 'سولبند',   ucs: ['Solband'],                               ucs_ur: ['سولبند'] },
          Turbat:   { ur: 'تربت',     ucs: ['Turbat City', 'Turbat Rural', 'Zamuran'], ucs_ur: ['تربت شہر', 'تربت دیہی', 'زمران'] },
          Tump:     { ur: 'تمپ',      ucs: ['Tump City', 'Tump Rural'],               ucs_ur: ['تمپ شہر', 'تمپ دیہی'] },
          Zamuran:  { ur: 'زمران',     ucs: ['Zamuran'],                               ucs_ur: ['زمران'] },
        },
      },
      
      Kharan: {
        ur: 'خاران',
        tehsils: {
          Kharan:     { ur: 'خاران',    ucs: ['Kharan City', 'Kharan Rural'], ucs_ur: ['خاران شہر', 'خاران دیہی'] },
          Patkain:    { ur: 'پٹکین',    ucs: ['Patkain'],                     ucs_ur: ['پٹکین'] },
          'Sar Kharan': { ur: 'سر خاران', ucs: ['Sar Kharan'],               ucs_ur: ['سر خاران'] },
          Tohumulk:   { ur: 'تہوملک',   ucs: ['Tohumulk'],                   ucs_ur: ['تہوملک'] },
        },
      },

      Khuzdar: {
        ur: 'خضدار',
        tehsils: {
          Khuzdar: { ur: 'خضدار',   ucs: ['Khuzdar City', 'Khuzdar Rural'], ucs_ur: ['خضدار شہر', 'خضدار دیہی'] },
          Nal:   { ur: 'نال',    ucs: ['Nal City', 'Nal Rural'],   ucs_ur: ['نال شہر', 'نال دیہی'] },
          Wadh:  { ur: 'واڈھ',   ucs: ['Wadh City', 'Wadh Rural'], ucs_ur: ['واڈھ شہر', 'واڈھ دیہی'] },
          Zehri:   { ur: 'زہری',    ucs: ['Zehri'],                         ucs_ur: ['زہری'] },
          Baghbana: { ur: 'باغبانا', ucs: ['Baghbana'],                       ucs_ur: ['باغبانا'] },
          Aranji:  { ur: 'ارانجی',  ucs: ['Aranji'],                         ucs_ur: ['ارانجی'] },
          Gresha:  { ur: 'گریشہ',   ucs: ['Gresha', 'Karkh'],               ucs_ur: ['گریشہ', 'کرخ'] },
          Karkh:   { ur: 'کرخ',     ucs: ['Karkh'],                         ucs_ur: ['کرخ'] },
          Moola:   { ur: 'مولہ',    ucs: ['Moola'],                         ucs_ur: ['مولہ'] },
          Ornach:  { ur: 'اورناچ',   ucs: ['Ornach'],                        ucs_ur: ['اورناچ'] },
          Saroona: { ur: 'سرونہ',   ucs: ['Saroona'],                       ucs_ur: ['سرونہ'] },
        },
      },

      Kohlu: {
        ur: 'کوہلو',
        tehsils: {
          Grisani:          { ur: 'گریسانی',         ucs: ['Grisani'],          ucs_ur: ['گریسانی'] },
          Kahan:            { ur: 'کہان',             ucs: ['Kahan'],            ucs_ur: ['کہان'] },
          Kohlu:            { ur: 'کوہلو',            ucs: ['Kohlu City', 'Kohlu Rural'], ucs_ur: ['کوہلو شہر', 'کوہلو دیہی'] },
          Maiwand:          { ur: 'میوند',            ucs: ['Maiwand'],          ucs_ur: ['میوند'] },
          'Shaheed Jahangirabad': { ur: 'شہید جہانگیرآباد', ucs: ['Shaheed Jahangirabad'], ucs_ur: ['شہید جہانگیرآباد'] },
          Tamboo:           { ur: 'تمبو',             ucs: ['Tamboo'],           ucs_ur: ['تمبو'] },
        },
      },

      Lasbela: {
        ur: 'لسبیلہ',
        tehsils: {
          Bela:   { ur: 'بیلہ',   ucs: ['Bela City', 'Lakhra', 'Liari'],    ucs_ur: ['بیلہ شہر', 'لاکھڑا', 'لیاری'] },
          Kanraj: { ur: 'کنراج',  ucs: ['Kanraj', 'Winder'],               ucs_ur: ['کنراج', 'ونڈر'] },
          Lakhra: { ur: 'لاکھڑا',  ucs: ['Lakhra'],                         ucs_ur: ['لاکھڑا'] },
          Liari:  { ur: 'لیاری',   ucs: ['Liari'],                          ucs_ur: ['لیاری'] },
          Uthal:  { ur: 'اوتھل',  ucs: ['Uthal City', 'Uthal Rural'],      ucs_ur: ['اوتھل شہر', 'اوتھل دیہی'] },
        },
      },
      
      Loralai: {
        ur: 'لورالائی',
        tehsils: {
          Bori:    { ur: 'بوری',   ucs: ['Loralai City', 'Loralai Rural'], ucs_ur: ['لورالائی شہر', 'لورالائی دیہی'] },
          Mekhtar: { ur: 'مختار',  ucs: ['Mekhtar'],                       ucs_ur: ['مختار'] },
        },
      },

      Mastung: {
        ur: 'مستونگ',
        tehsils: {
          Dasht:      { ur: 'دشت',       ucs: ['Dasht'],         ucs_ur: ['دشت'] },
          Kardigap:   { ur: 'کردگاپ',    ucs: ['Kardigap'],      ucs_ur: ['کردگاپ'] },
          'Khad Kocha': { ur: 'خاد کوچہ', ucs: ['Khad Kocha'],   ucs_ur: ['خاد کوچہ'] },
          Mastung:    { ur: 'مستونگ',    ucs: ['Mastung City', 'Mastung Rural'], ucs_ur: ['مستونگ شہر', 'مستونگ دیہی'] },
        },
      },
    
      Musakhel: {
        ur: 'موسیٰ خیل',
        tehsils: {
          Darug:         { ur: 'داروگ',        ucs: ['Darug'],          ucs_ur: ['داروگ'] },
          Kingri:        { ur: 'کنگری',         ucs: ['Kingri'],         ucs_ur: ['کنگری'] },
          Musakhel:      { ur: 'موسیٰ خیل',    ucs: ['Musakhel City', 'Musakhel Rural'], ucs_ur: ['موسیٰ خیل شہر', 'موسیٰ خیل دیہی'] },
          'Tiyar Essot': { ur: 'تیار ایسوٹ',   ucs: ['Tiyar Essot'],    ucs_ur: ['تیار ایسوٹ'] },
          Toisar:        { ur: 'توئسر',         ucs: ['Toisar'],         ucs_ur: ['توئسر'] },
          'Zimri Plaseen': { ur: 'زمری پلاسین', ucs: ['Zimri Plaseen'],  ucs_ur: ['زمری پلاسین'] },
        },
      },

      Nasirabad: {
        ur: 'نصیرآباد',
        tehsils: {
          'Baba Kot':          { ur: 'بابا کوٹ',          ucs: ['Baba Kot'],                       ucs_ur: ['بابا کوٹ'] },
          Chattar:             { ur: 'چھتر',               ucs: ['Chattar'],                        ucs_ur: ['چھتر'] },
          'Dera Murad Jamali': { ur: 'ڈیرہ مراد جمالی',   ucs: ['Dera Murad Jamali City', 'Dera Murad Jamali Rural'], ucs_ur: ['ڈیرہ مراد جمالی شہر', 'ڈیرہ مراد جمالی دیہی'] },
          Landhi:              { ur: 'لانڈھی',             ucs: ['Landhi'],                         ucs_ur: ['لانڈھی'] },
          'Meer Hassan':       { ur: 'میر حسن',            ucs: ['Meer Hassan'],                    ucs_ur: ['میر حسن'] },
          Tamboo:              { ur: 'تمبو',                ucs: ['Tamboo City', 'Tamboo Rural'],    ucs_ur: ['تمبو شہر', 'تمبو دیہی'] },
        },
      },

      Nushki: {
        ur: 'نوشکی',
        tehsils: {
          Dak:    { ur: 'ڈاک',   ucs: ['Dak'],                             ucs_ur: ['ڈاک'] },
          Nushki: { ur: 'نوشکی', ucs: ['Nushki City', 'Nushki Rural'],    ucs_ur: ['نوشکی شہر', 'نوشکی دیہی'] },
        },
      },
      
      Panjgur: {
        ur: 'پنجگور',
        tehsils: {
          Gichk:   { ur: 'گچک',    ucs: ['Gichk'],                               ucs_ur: ['گچک'] },
          Gowargo: { ur: 'گوارگو',  ucs: ['Gowargo'],                             ucs_ur: ['گوارگو'] },
          Kallag:  { ur: 'کلاگ',    ucs: ['Kallag'],                              ucs_ur: ['کلاگ'] },
          Panjgur: { ur: 'پنجگور',  ucs: ['Panjgur City', 'Panjgur Rural'],      ucs_ur: ['پنجگور شہر', 'پنجگور دیہی'] },
          Paroom:  { ur: 'پاروم',   ucs: ['Paroom'],                              ucs_ur: ['پاروم'] },
        },
      },
      
      Pishin: {
        ur: 'پشین',
        tehsils: {
          Bostan:    { ur: 'بوستان',   ucs: ['Bostan'],                                 ucs_ur: ['بوستان'] },
          Hurramzai: { ur: 'حرامزئی',  ucs: ['Hurramzai City', 'Hurramzai Rural'],      ucs_ur: ['حرامزئی شہر', 'حرامزئی دیہی'] },
          Khanozai:  { ur: 'خانوزئی',  ucs: ['Khanozai'],                               ucs_ur: ['خانوزئی'] },
          Pishin:    { ur: 'پشین',     ucs: ['Pishin City', 'Pishin Rural'],             ucs_ur: ['پشین شہر', 'پشین دیہی'] },
          Saranan:   { ur: 'سرانان',   ucs: ['Saranan'],                                ucs_ur: ['سرانان'] },
        },
      },
      
      'Qilla Abdullah': {
        ur: 'قلعہ عبداللہ',
        tehsils: {
          Dobandi:          { ur: 'ڈوبنڈی',       ucs: ['Dobandi'],                                    ucs_ur: ['ڈوبنڈی'] },
          Gulistan:         { ur: 'گلستان',        ucs: ['Gulistan'],                                   ucs_ur: ['گلستان'] },
          'Qilla Abdullah': { ur: 'قلعہ عبداللہ', ucs: ['Qilla Abdullah City', 'Qilla Abdullah Rural'], ucs_ur: ['قلعہ عبداللہ شہر', 'قلعہ عبداللہ دیہی'] },
        },
      },

      'Qilla Saifullah': {
        ur: 'قلعہ سیف اللہ',
        tehsils: {
          Badini:           { ur: 'بدینی',          ucs: ['Badini'],                           ucs_ur: ['بدینی'] },
          'Kan Mehtarzai':  { ur: 'کان مہتر زئی',   ucs: ['Kan Mehtarzai'],                   ucs_ur: ['کان مہتر زئی'] },
          'Qilla Saifullah': { ur: 'قلعہ سیف اللہ', ucs: ['Qilla Saifullah City', 'Qilla Saifullah Rural'], ucs_ur: ['قلعہ سیف اللہ شہر', 'قلعہ سیف اللہ دیہی'] },
          Loiband:          { ur: 'لوئی بند',       ucs: ['Loiband'],                         ucs_ur: ['لوئی بند'] },
          'Muslim Bagh':    { ur: 'مسلم باغ',       ucs: ['Muslim Bagh City', 'Muslim Bagh Rural'], ucs_ur: ['مسلم باغ شہر', 'مسلم باغ دیہی'] },
          Shinki:           { ur: 'شنکئی',           ucs: ['Shinki'],                          ucs_ur: ['شنکئی'] },
        },
      },

      'Quetta': {
        ur: 'کوئٹہ',
        tehsils: {
          Chiltan:       { ur: 'چلتن',    ucs: ['Chiltan'],                   ucs_ur: ['چلتن'] },
          Sariab:        { ur: 'سریاب',   ucs: ['Sariab'],                                            ucs_ur: ['سریاب'] },
          Kuchlak:        { ur: 'کچلاک',    ucs: ['Kuchlak City', 'Kuchlak Rural'],                  ucs_ur: ['کچلاک شہر', 'کچلاک دیہی'] },
          'Quetta Saddar': { ur: 'کوئٹہ صدر', ucs: ['Brewery Road', 'Cantonment', 'City', 'Jinnah Road', 'Kirani Road', 'Pashtoonabad', 'Satellite Town', 'Shalkot'], ucs_ur: ['بریوری روڈ', 'کینٹونمنٹ', 'شہر', 'جناح روڈ', 'کیرانی روڈ', 'پشتون آباد', 'سیٹلائٹ ٹاؤن', 'شالکوٹ'] },
          Zarghoon:      { ur: 'زرغون',   ucs: ['Zarghoon'],                                           ucs_ur: ['زرغون'] },
          Punjpai:       { ur: 'پنجپائی',  ucs: ['Punjpai'],                                            ucs_ur: ['پنجپائی'] },
        },
      },
      
      'Shaheed Sikandarabad (Surab)': {
        ur:'(سراب)شہید سکندرآباد',
        tehsils: {
          'Dasht e Goran': { ur: 'دشت گوران',           ucs: ['Dasht e Goran'],         ucs_ur: ['دشت گوران'] },
          Gidder:          { ur: 'گیدر',                 ucs: ['Gidder'],                ucs_ur: ['گیدر'] },
          'Shaheed Meharabad Zehri': { ur: 'شہید مہرآباد زہری', ucs: ['Shaheed Meharabad Zehri'], ucs_ur: ['شہید مہرآباد زہری'] },
          Surab:           { ur: 'سراب',                 ucs: ['Surab City', 'Surab Rural'], ucs_ur: ['سراب شہر', 'سراب دیہی'] },
        },
      },
      
      Sherani: {
        ur: 'شیرانی',
        tehsils: {
          Sherani: { ur: 'شیرانی', ucs: ['Sherani City', 'Sherani Rural'], ucs_ur: ['شیرانی شہر', 'شیرانی دیہی'] },
        },
      },

      Sibi: {
        ur: 'سبی',
        tehsils: {
          Kutmandai: { ur: 'کٹ منڈئی', ucs: ['Kutmandai'],                     ucs_ur: ['کٹ منڈئی'] },
          Lehri:     { ur: 'لہری',     ucs: ['Lehri City', 'Lehri Rural'],     ucs_ur: ['لہری شہر', 'لہری دیہی'] },
          Sangan:    { ur: 'سنگان',    ucs: ['Sangan'],                        ucs_ur: ['سنگان'] },
          Sibi:      { ur: 'سبی',      ucs: ['Sibi City', 'Sibi Rural'],       ucs_ur: ['سبی شہر', 'سبی دیہی'] },
        },
      },
      
      Sohbatpur: {
        ur: 'صحبت پور',
        tehsils: {
          Faridabad:              { ur: 'فریدآباد',             ucs: ['Faridabad'],              ucs_ur: ['فریدآباد'] },
          Hayrvi:                 { ur: 'ہیروی',                ucs: ['Hayrvi'],                 ucs_ur: ['ہیروی'] },
          Manjipur:               { ur: 'منجی پور',             ucs: ['Manjipur'],               ucs_ur: ['منجی پور'] },
          Panhwar:                { ur: 'پنہور',                ucs: ['Panhwar'],                ucs_ur: ['پنہور'] },
          'Saeed Muhammad Kanrani': { ur: 'سعید محمد کنرانی',  ucs: ['Saeed Muhammad Kanrani'], ucs_ur: ['سعید محمد کنرانی'] },
          Sohbatpur:              { ur: 'صحبت پور',             ucs: ['Sohbatpur City', 'Sohbatpur Rural'], ucs_ur: ['صحبت پور شہر', 'صحبت پور دیہی'] },
        },
      },
      
      Taftan: {
        ur: 'تفتان',
        tehsils: {
          Mashkel:  { ur: 'ماشکیل', ucs: ['Mashkel'],           ucs_ur: ['ماشکیل'] },
          'Nok Kundi': { ur: 'نوک کنڈی', ucs: ['Nok Kundi'],   ucs_ur: ['نوک کنڈی'] },
          Taftan:   { ur: 'تفتان',  ucs: ['Taftan City', 'Taftan Rural'], ucs_ur: ['تفتان شہر', 'تفتان دیہی'] },
        },
      },

      'Usta Muhammad': {
        ur: 'اوستہ محمد',
        tehsils: {
          Gandakha:        { ur: 'گنڈاکھا',     ucs: ['Gandakha'],                        ucs_ur: ['گنڈاکھا'] },
          'Usta Muhammad': { ur: 'اوستہ محمد',  ucs: ['Usta Muhammad City', 'Usta Muhammad Rural'], ucs_ur: ['اوستہ محمد شہر', 'اوستہ محمد دیہی'] },
        },
      },
      
      Wadh: {
        ur: 'واڈھ',
        tehsils: {
          Nal:    { ur: 'نال',    ucs: ['Nal City', 'Nal Rural'],   ucs_ur: ['نال شہر', 'نال دیہی'] },
          Ornach: { ur: 'اورناچ', ucs: ['Ornach'],                  ucs_ur: ['اورناچ'] },
          Wadh:   { ur: 'واڈھ',   ucs: ['Wadh City', 'Wadh Rural'], ucs_ur: ['واڈھ شہر', 'واڈھ دیہی'] },
        },
      },

      Washuk: {
        ur: 'واشک',
        tehsils: {
          Besima:   { ur: 'بیسیمہ',  ucs: ['Besima'],                          ucs_ur: ['بیسیمہ'] },
          Mashkel:  { ur: 'ماشکیل',  ucs: ['Mashkel'],                         ucs_ur: ['ماشکیل'] },
          Nag:      { ur: 'ناگ',     ucs: ['Nag'],                             ucs_ur: ['ناگ'] },
          Shahgori: { ur: 'شاہ گوری', ucs: ['Shahgori'],                       ucs_ur: ['شاہ گوری'] },
          Washuk:   { ur: 'واشک',    ucs: ['Washuk City', 'Washuk Rural'],     ucs_ur: ['واشک شہر', 'واشک دیہی'] },
        },
      },
      
      Ziarat: {
        ur: 'زیارت',
        tehsils: {
          Sinjawi: { ur: 'سنجاوی', ucs: ['Sinjawi City', 'Sinjawi Rural'], ucs_ur: ['سنجاوی شہر', 'سنجاوی دیہی'] },
          Ziarat:  { ur: 'زیارت',  ucs: ['Ziarat City', 'Ziarat Rural'],   ucs_ur: ['زیارت شہر', 'زیارت دیہی'] },
        },
      },

      Zhob: {
        ur: 'ژوب',
        tehsils: {
          Ashwat:          { ur: 'اشوت',          ucs: ['Ashwat'],                           ucs_ur: ['اشوت'] },
          Kashatu:         { ur: 'کشاتو',          ucs: ['Kashatu'],                          ucs_ur: ['کشاتو'] },
          'Qamar Din Karez': { ur: 'قمرالدین کاریز', ucs: ['Qamar Din Karez'],               ucs_ur: ['قمرالدین کاریز'] },
          Sambaza:         { ur: 'سنبازہ',          ucs: ['Sambaza'],                         ucs_ur: ['سنبازہ'] },
          Zhob:            { ur: 'ژوب',             ucs: ['Zhob City', 'Zhob Rural'],        ucs_ur: ['ژوب شہر', 'ژوب دیہی'] },
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
          Abbottabad:      { ur: 'ایبٹ آباد',   ucs: [], ucs_ur: [] },
          Havelian:        { ur: 'حویلیاں',       ucs: [], ucs_ur: [] },
          Lora:            { ur: 'لورہ',           ucs: [], ucs_ur: [] },
          'Lower Tanawal': { ur: 'لوئر تناول',    ucs: [], ucs_ur: [] },
        },
      },

      Allai: {
        ur: 'الائی',
        tehsils: {
          Allai: { ur: 'الائی', ucs: [], ucs_ur: [] },
        },
      },

      Bajaur: {
        ur: 'باجوڑ',
        tehsils: {
          'Bar Chamarkand': { ur: 'بار چمارکنڈ', ucs: [], ucs_ur: [] },
          Barang:           { ur: 'برنگ',          ucs: [], ucs_ur: [] },
          'Khar Bajaur':    { ur: 'خار باجوڑ',    ucs: [], ucs_ur: [] },
          Mamund:           { ur: 'ممونڈ',          ucs: [], ucs_ur: [] },
          Nawagai:          { ur: 'نواگئی',         ucs: [], ucs_ur: [] },
          Salarzai:         { ur: 'سالارزئی',       ucs: [], ucs_ur: [] },
          'Utman Khel':     { ur: 'عثمان خیل',     ucs: [], ucs_ur: [] },
        },
      },

      Bannu: {
        ur: 'بنوں',
        tehsils: {
          'Baka Khel': { ur: 'باکا خیل', ucs: [], ucs_ur: [] },
          Bannu:       { ur: 'بنوں',      ucs: [], ucs_ur: [] },
          Domel:       { ur: 'ڈومیل',     ucs: [], ucs_ur: [] },
          Kakki:       { ur: 'کاکی',       ucs: [], ucs_ur: [] },
          Miryan:      { ur: 'میریاں',    ucs: [], ucs_ur: [] },
          Wazir:       { ur: 'وزیر',      ucs: [], ucs_ur: [] },
        },
      },

      Batagram: {
        ur: 'بٹگرام',
        tehsils: {
          Batagram: { ur: 'بٹگرام', ucs: [], ucs_ur: [] },
        },
      },

      Buner: {
        ur: 'بونیر',
        tehsils: {
          Chagharzai: { ur: 'چغرزئی', ucs: [], ucs_ur: [] },
          Daggar:     { ur: 'ڈگر',     ucs: [], ucs_ur: [] },
          Gadezai:    { ur: 'گادیزئی', ucs: [], ucs_ur: [] },
          Gagra:      { ur: 'گگڑہ',    ucs: [], ucs_ur: [] },
          'Khudu Khel': { ur: 'خودو خیل', ucs: [], ucs_ur: [] },
          Mandanr:    { ur: 'منڈانڑ',  ucs: [], ucs_ur: [] },
        },
      },

      'Central Dir': {
        ur: 'وسطی دیر',
        tehsils: {
          'Lar Jam': { ur: 'لار جام', ucs: [], ucs_ur: [] },
          Wari:      { ur: 'واری',     ucs: [], ucs_ur: [] },
          'Akhagram Karo': { ur: 'اخگرم کارو', ucs: [], ucs_ur: [] },
          'Nehag Dara': { ur: 'نہگ درہ', ucs: [], ucs_ur: [] },
          'Sahib Abad': { ur: 'صاحب آباد', ucs: [], ucs_ur: [] },
        },
      },

      Charsadda: {
        ur: 'چارسدہ',
        tehsils: {
          Charsadda: { ur: 'چارسدہ', ucs: [], ucs_ur: [] },
          Shabqadar: { ur: 'شبقدر',   ucs: [], ucs_ur: [] },
          Tangi:     { ur: 'تنگی',    ucs: [], ucs_ur: [] },
        },
      },

      'Dera Ismail Khan': {
        ur: 'ڈیرہ اسماعیل خان',
        tehsils: {
          Daraban:         { ur: 'درابن',           ucs: [], ucs_ur: [] },
          'Dera Ismail Khan': { ur: 'ڈیرہ اسماعیل خان', ucs: [], ucs_ur: [] },
          Drazanda:        { ur: 'ڈرازندہ',         ucs: [], ucs_ur: [] },
          Kulachi:         { ur: 'کلاچی',           ucs: [], ucs_ur: [] },
          Paharpur:        { ur: 'پہاڑ پور',        ucs: [], ucs_ur: [] },
          Paniala:         { ur: 'پنیالہ',          ucs: [], ucs_ur: [] },
          Paroa:           { ur: 'پروا',             ucs: [], ucs_ur: [] },
        },
      },

      Hangu: {
        ur: 'ہنگو',
        tehsils: {
          Doaba: { ur: 'دوآبہ', ucs: [], ucs_ur: [] },
          Hangu: { ur: 'ہنگو',  ucs: [], ucs_ur: [] },
          Tall:  { ur: 'ٹال',   ucs: [], ucs_ur: [] },
        },
      },

      Haripur: {
        ur: 'ہری پور',
        tehsils: {
          Ghazi:   { ur: 'غازی',    ucs: [], ucs_ur: [] },
          Haripur: { ur: 'ہری پور', ucs: [], ucs_ur: [] },
          Khanpur: { ur: 'خانپور',  ucs: [], ucs_ur: [] },
        },
      },

      Karak: {
        ur: 'کرک',
        tehsils: {
          'Banda Daud Shah': { ur: 'بندہ داؤد شاہ',  ucs: [], ucs_ur: [] },
          Karak:             { ur: 'کرک',              ucs: [], ucs_ur: [] },
          'Takht-e-Nasrati': { ur: 'تخت ناصرتی',      ucs: [], ucs_ur: [] },
        },
      },

      Khyber: {
        ur: 'خیبر',
        tehsils: {
          'Bagh Maidan':      { ur: 'باغ میدان',       ucs: [], ucs_ur: [] },
          Bara:               { ur: 'بارہ',              ucs: [], ucs_ur: [] },
          'Bazar Zakha Khel': { ur: 'بازار زاخہ خیل', ucs: [], ucs_ur: [] },
          'Fort Salop':       { ur: 'فورٹ سلوپ',       ucs: [], ucs_ur: [] },
          Jamrud:             { ur: 'جمرود',             ucs: [], ucs_ur: [] },
          'Landi Kotal':      { ur: 'لنڈی کوتل',        ucs: [], ucs_ur: [] },
          'Mula Gori':        { ur: 'ملا گوری',          ucs: [], ucs_ur: [] },
          'Painda Cheena':    { ur: 'پائندہ چینہ',       ucs: [], ucs_ur: [] },
        },
      },

      Kohat: {
        ur: 'کوہاٹ',
        tehsils: {
          'Dara Adam Khel': { ur: 'درہ آدم خیل', ucs: [], ucs_ur: [] },
          Gumbat:           { ur: 'گمبٹ',          ucs: [], ucs_ur: [] },
          Kohat:            { ur: 'کوہاٹ',         ucs: [], ucs_ur: [] },
          Lachi:            { ur: 'لاچی',           ucs: [], ucs_ur: [] },
        },
      },

      'Kolai-Palas': {
        ur: 'کولئی پالس',
        tehsils: {
          'Kolai (Bataira)': { ur: 'کولئی (بتیرہ)', ucs: [], ucs_ur: [] },
          Palas:             { ur: 'پالس',            ucs: [], ucs_ur: [] },
        },
      },

      Kurram: {
        ur: 'کرم',
        tehsils: {
          'Central Kurram': { ur: 'وسطی کرم',  ucs: [], ucs_ur: [] },
          'Lower Kurram':   { ur: 'زیریں کرم', ucs: [], ucs_ur: [] },
          'Upper Kurram':   { ur: 'بالائی کرم', ucs: [], ucs_ur: [] },
        },
      },

      'Lakki Marwat': {
        ur: 'لکی مروت',
        tehsils: {
          Bettani:       { ur: 'بیٹنی',      ucs: [], ucs_ur: [] },
          'Ghazni Khel': { ur: 'غزنی خیل',  ucs: [], ucs_ur: [] },
          'Lakki Marwat': { ur: 'لکی مروت', ucs: [], ucs_ur: [] },
          'Sari Naurang': { ur: 'سری نورنگ', ucs: [], ucs_ur: [] },
        },
      },

      'Lower Chitral': {
        ur: 'زیریں چترال',
        tehsils: {
          Chitral: { ur: 'چترال', ucs: [], ucs_ur: [] },
          Drosh:   { ur: 'دروش',  ucs: [], ucs_ur: [] },
        },
      },

      'Lower Dir': {
        ur: 'زیریں دیر',
        tehsils: {
          Adenzai:     { ur: 'آدن زئی',  ucs: [], ucs_ur: [] },
          Balambat:    { ur: 'بالمبٹ',   ucs: [], ucs_ur: [] },
          Khal:        { ur: 'خال',       ucs: [], ucs_ur: [] },
          'Lal Qilla': { ur: 'لال قلعہ', ucs: [], ucs_ur: [] },
          Munda:       { ur: 'مونڈہ',     ucs: [], ucs_ur: [] },
          'Samar Bagh': { ur: 'سمار باغ', ucs: [], ucs_ur: [] },
          Timergara:   { ur: 'تیمرگرہ',  ucs: [], ucs_ur: [] },
        },
      },

      'Lower Kohistan': {
        ur: 'زیریں کوہستان',
        tehsils: {
          Bankad: { ur: 'بنکاڈ', ucs: [], ucs_ur: [] },
          Pattan: { ur: 'پٹن',   ucs: [], ucs_ur: [] },
        },
      },

      'Lower South Waziristan': {
        ur: 'زیریں جنوبی وزیرستان',
        tehsils: {
          Birmil:      { ur: 'برمل',      ucs: [], ucs_ur: [] },
          Shakai:      { ur: 'شکئی',      ucs: [], ucs_ur: [] },
          'Toi Khulla': { ur: 'توئی خلہ', ucs: [], ucs_ur: [] },
          Wana:        { ur: 'وانہ',       ucs: [], ucs_ur: [] },
        },
      },

      Malakand: {
        ur: 'مالاکنڈ',
        tehsils: {
          'Sam Ranizai':  { ur: 'سام رانی زئی',  ucs: [], ucs_ur: [] },
          'Swat Ranizai': { ur: 'سوات رانی زئی', ucs: [], ucs_ur: [] },
          'Thana Baizai': { ur: 'تھانہ بیزئی',   ucs: [], ucs_ur: [] },
          'Utman Khel':   { ur: 'عثمان خیل',      ucs: [], ucs_ur: [] },
        },
      },

      Mansehra: {
        ur: 'مانسہرہ',
        tehsils: {
          'Baffa Pakhal': { ur: 'بافہ پکھال',  ucs: [], ucs_ur: [] },
          Balakot:        { ur: 'بالاکوٹ',      ucs: [], ucs_ur: [] },
          Darband:        { ur: 'دربند',         ucs: [], ucs_ur: [] },
          Mansehra:       { ur: 'مانسہرہ',      ucs: [], ucs_ur: [] },
          Oghi:           { ur: 'اوگی',          ucs: [], ucs_ur: [] },
          Tanawal:        { ur: 'تناول',         ucs: [], ucs_ur: [] },
        },
      },

      Mardan: {
        ur: 'مردان',
        tehsils: {
          'Garhi Kapura': { ur: 'گڑھی کپورہ', ucs: [], ucs_ur: [] },
          Katlang:        { ur: 'کٹلنگ',        ucs: [], ucs_ur: [] },
          Mardan:         { ur: 'مردان',         ucs: [], ucs_ur: [] },
          Rustam:         { ur: 'رستم',          ucs: [], ucs_ur: [] },
          'Takht Bhai':   { ur: 'تخت بھائی',    ucs: [], ucs_ur: [] },
        },
      },

      Mohmand: {
        ur: 'مہمند',
        tehsils: {
          'Ambar Utman Khel': { ur: 'امبر عثمان خیل', ucs: [], ucs_ur: [] },
          'Halim Zai':        { ur: 'حلیم زئی',        ucs: [], ucs_ur: [] },
          Pindiali:           { ur: 'پنڈیالی',          ucs: [], ucs_ur: [] },
          'Pran Ghar':        { ur: 'پران گھر',         ucs: [], ucs_ur: [] },
          Safi:               { ur: 'صافی',              ucs: [], ucs_ur: [] },
          'Upper Mohmand':    { ur: 'بالائی مہمند',     ucs: [], ucs_ur: [] },
          'Yake Ghund':       { ur: 'یکہ غند',          ucs: [], ucs_ur: [] },
        },
      },

      'North Waziristan': {
        ur: 'شمالی وزیرستان',
        tehsils: {
          'Datta Khel':  { ur: 'دتہ خیل',   ucs: [], ucs_ur: [] },
          Dossali:       { ur: 'دوسالی',     ucs: [], ucs_ur: [] },
          Gharyum:       { ur: 'غاریوم',     ucs: [], ucs_ur: [] },
          'Ghulam Khan': { ur: 'غلام خان',   ucs: [], ucs_ur: [] },
          'Mir Ali':     { ur: 'میر علی',    ucs: [], ucs_ur: [] },
          'Miran Shah':  { ur: 'میران شاہ',  ucs: [], ucs_ur: [] },
          Razmak:        { ur: 'رزمک',        ucs: [], ucs_ur: [] },
          Shewa:         { ur: 'شیوا',        ucs: [], ucs_ur: [] },
          Spinwam:       { ur: 'اسپین وام',   ucs: [], ucs_ur: [] },
        },
      },

      Nowshera: {
        ur: 'نوشہرہ',
        tehsils: {
          Jehangira: { ur: 'جہانگیرہ', ucs: [], ucs_ur: [] },
          Nowshera:  { ur: 'نوشہرہ',   ucs: [], ucs_ur: [] },
          Pabbi:     { ur: 'پبی',       ucs: [], ucs_ur: [] },
        },
      },

      Orakzai: {
        ur: 'اورکزئی',
        tehsils: {
          'Central Orakzai': { ur: 'وسطی اورکزئی',  ucs: [], ucs_ur: [] },
          'Ismail Zai':      { ur: 'اسماعیل زئی',   ucs: [], ucs_ur: [] },
          'Lower Orakzai':   { ur: 'زیریں اورکزئی', ucs: [], ucs_ur: [] },
          'Upper Orakzai':   { ur: 'بالائی اورکزئی', ucs: [], ucs_ur: [] },
        },
      },

      Peshawar: {
        ur: 'پشاور',
        tehsils: {
          Badhber:     { ur: 'بڈھ بیر',    ucs: [], ucs_ur: [] },
          Chamkani:    { ur: 'چمکنی',       ucs: [], ucs_ur: [] },
          'Hassan Khel': { ur: 'حسن خیل',  ucs: [], ucs_ur: [] },
          Mathra:      { ur: 'ماترہ',       ucs: [], ucs_ur: [] },
          'Peshawar City': { ur: 'پشاور شہر', ucs: [], ucs_ur: [] },
          Peshtakhara: { ur: 'پشت خرہ',    ucs: [], ucs_ur: [] },
          'Shah Alam':  { ur: 'شاہ عالم',  ucs: [], ucs_ur: [] },
        },
      },

      Shangla: {
        ur: 'شانگلہ',
        tehsils: {
          Alpuri:   { ur: 'الپوری',  ucs: [], ucs_ur: [] },
          Bisham:   { ur: 'بشام',    ucs: [], ucs_ur: [] },
          Chakesar: { ur: 'چکیسر',   ucs: [], ucs_ur: [] },
          Makhuzai: { ur: 'مخوزئی', ucs: [], ucs_ur: [] },
          Martung:  { ur: 'مارتنگ',  ucs: [], ucs_ur: [] },
          Puran:    { ur: 'پوران',   ucs: [], ucs_ur: [] },
          Shahpur:  { ur: 'شاہ پور', ucs: [], ucs_ur: [] },
        },
      },

      Swabi: {
        ur: 'صوابی',
        tehsils: {
          Lahor:  { ur: 'لہور',  ucs: [], ucs_ur: [] },
          Razar:  { ur: 'رزار',  ucs: [], ucs_ur: [] },
          Swabi:  { ur: 'صوابی', ucs: [], ucs_ur: [] },
          Topi:   { ur: 'ٹوپی',  ucs: [], ucs_ur: [] },
        },
      },

      Swat: {
        ur: 'سوات',
        tehsils: {
          Babuzai:  { ur: 'بابوزئی',  ucs: [], ucs_ur: [] },
          Barikot:  { ur: 'باریکوٹ', ucs: [], ucs_ur: [] },
          Charbagh: { ur: 'چارباغ',  ucs: [], ucs_ur: [] },
          Kabal:    { ur: 'کبل',      ucs: [], ucs_ur: [] },
        },
      },

      Tank: {
        ur: 'ٹانک',
        tehsils: {
          Jandola: { ur: 'جنڈولہ', ucs: [], ucs_ur: [] },
          Tank:    { ur: 'ٹانک',    ucs: [], ucs_ur: [] },
        },
      },

      Torghar: {
        ur: 'تورغر',
        tehsils: {
          'Daur Maira':        { ur: 'داؤر مئیرہ',     ucs: [], ucs_ur: [] },
          Judba:               { ur: 'جوڈبہ',           ucs: [], ucs_ur: [] },
          'Khander Hassanzai': { ur: 'کھنڈر حسن زئی', ucs: [], ucs_ur: [] },
        },
      },

      'Upper Chitral': {
        ur: 'بالائی چترال',
        tehsils: {
          Buni:   { ur: 'بونی',    ucs: [], ucs_ur: [] },
          Mastuj: { ur: 'مستوج',   ucs: [], ucs_ur: [] },
          Mulkoh: { ur: 'مولکہو', ucs: [], ucs_ur: [] },
          Torkoh: { ur: 'ترکہو',   ucs: [], ucs_ur: [] },
        },
      },

      'Upper Dir': {
        ur: 'بالائی دیر',
        tehsils: {
          Barawal:   { ur: 'بڑاول',   ucs: [], ucs_ur: [] },
          Dir:       { ur: 'دیر',      ucs: [], ucs_ur: [] },
          Kalkot:    { ur: 'کالکوٹ',  ucs: [], ucs_ur: [] },
          Sharingal: { ur: 'شرینگل',  ucs: [], ucs_ur: [] },
        },
      },

      'Upper Kohistan': {
        ur: 'بالائی کوہستان',
        tehsils: {
          Dassu:        { ur: 'داسو',   ucs: [], ucs_ur: [] },
          'Harban Basha': { ur: 'ہربن باشا', ucs: [], ucs_ur: [] },
          Kandia:       { ur: 'کندیا',  ucs: [], ucs_ur: [] },
          Seo:          { ur: 'سیو',    ucs: [], ucs_ur: [] },
        },
      },

      'Upper South Waziristan': {
        ur: 'بالائی جنوبی وزیرستان',
        tehsils: {
          Ladha:     { ur: 'لدھہ',    ucs: [], ucs_ur: [] },
          Makin:     { ur: 'مکین',    ucs: [], ucs_ur: [] },
          Sararogha: { ur: 'سرارغہ', ucs: [], ucs_ur: [] },
          Sarwakai:  { ur: 'سروکئی', ucs: [], ucs_ur: [] },
          Shaktoi:   { ur: 'شکتوئی', ucs: [], ucs_ur: [] },
          Shawal:    { ur: 'شاول',    ucs: [], ucs_ur: [] },
          Tiarza:    { ur: 'تیارزہ', ucs: [], ucs_ur: [] },
        },
      },

      'Upper Swat': {
        ur: 'بالائی سوات',
        tehsils: {
          Behrain:       { ur: 'بحرین',      ucs: [], ucs_ur: [] },
          'Khwaza Khela': { ur: 'خوازہ خیلہ', ucs: [], ucs_ur: [] },
          Matta:         { ur: 'مٹہ',         ucs: [], ucs_ur: [] },
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
          Astore: { ur: 'استور', ucs: ['Astore City', 'Bunji', 'Gurikot', 'Rama'], ucs_ur: ['استور شہر', 'بونجی', 'گوری کوٹ', 'رامہ'] },
          Shounter: { ur: 'شونٹر', ucs: ['Shounter'], ucs_ur: ['شونٹر'] },
        },
      },

      Diamer: {
        ur: 'دیامر',
        tehsils: {
          Babusar: { ur: 'بابوسر', ucs: ['Babusar'], ucs_ur: ['بابوسر'] },
          Chilas: { ur: 'چلاس', ucs: ['Chilas City', 'Darel', 'Harban', 'Tangir'], ucs_ur: ['چلاس شہر', 'دارل', 'ہربن', 'تنگیر'] },
          Darel: { ur: 'دارل', ucs: ['Darel City', 'Dain', 'Niat', 'Sazin'], ucs_ur: ['دارل شہر', 'داین', 'نیات', 'سازین'] },
          Goharabad: { ur: 'گوہرآباد', ucs: ['Goharabad'], ucs_ur: ['گوہرآباد'] },
          Tangir: { ur: 'تنگیر', ucs: ['Tangir City'], ucs_ur: ['تنگیر شہر'] },
        },
      },

      Ghanche: {
        ur: 'گانچھے',
        tehsils: {
          Daghoni: { ur: 'دغونی', ucs: ['Daghoni'], ucs_ur: ['دغونی'] },
          Khaplu: { ur: 'خپلو', ucs: ['Khaplu City', 'Chorbat', 'Gultari', 'Saltoro'], ucs_ur: ['خپلو شہر', 'چوربٹ', 'گلتری', 'سالتورو'] },
          Mashabrum: { ur: 'ماشابرم', ucs: ['Mashabrum'], ucs_ur: ['ماشابرم'] },
          Chorbat: { ur: 'چوربٹ', ucs: ['Chorbat City', 'Gultari', 'Saltoro'], ucs_ur: ['چوربٹ شہر', 'گلتری', 'سالتورو'] },
          Keris: { ur: 'کیریس', ucs: ['Keris'], ucs_ur: ['کیریس'] },
          Haldi: { ur: 'ہلدی', ucs: ['Haldi'], ucs_ur: ['ہلدی'] },
        },
      },

      Ghizer: {
        ur: 'غذر',
        tehsils: {
          Gupis: { ur: 'گوپس', ucs: ['Gupis City', 'Chatorkhand', 'Phandar', 'Teru'], ucs_ur: ['گوپس شہر', 'چاتورکھند', 'پھنڈر', 'تیرو'] },
          Punial: { ur: 'پنیال', ucs: ['Punial City', 'Gakuch', 'Shishkat', 'Shounter'], ucs_ur: ['پنیال شہر', 'گاکچ', 'شیشکت', 'شونٹر'] },
          Yasin: { ur: 'یاسین', ucs: ['Yasin City', 'Bisham', 'Darkot', 'Rupal'], ucs_ur: ['یاسین شہر', 'بشام', 'دارکوٹ', 'روپل'] },
          Phander: { ur: 'پھنڈر', ucs: ['Phander City', 'Chatorkhand', 'Teru'], ucs_ur: ['پھنڈر شہر', 'چاتورکھند', 'تیرو'] },
          Ishkoman: { ur: 'اشکومان', ucs: ['Ishkoman City', 'Gakuch'], ucs_ur: ['اشکومان شہر', 'گاکچ', 'شیشکت', 'شونٹر'] },
        },
      },

      Gilgit: {
        ur: 'گلگت',
        tehsils: {
          Gilgit: { ur: 'گلگت', ucs: ['City', 'Danyore', 'Juglot', 'Kargah', 'Nomal', 'Sher Qila'], ucs_ur: ['شہر', 'دانیور', 'جوگلوٹ', 'کارگاہ', 'نومل', 'شیر قلعہ'] },
          Danyor: { ur: 'دانیور', ucs: ['Danyor City', 'Barmas', 'Chalt', 'Nilt'], ucs_ur: ['دانیور شہر', 'برماس', 'چلت', 'نلت'] },
          Jaglot: { ur: 'جوگلوٹ', ucs: ['Jaglot City', 'Danyore', 'Nomal'], ucs_ur: ['جوگلوٹ شہر', 'دانیور', 'نومل'] },
        },
      },

      Hunza: {
        ur: 'ہنزہ',
        tehsils: {
          Aliabad: { ur: 'علی آباد', ucs: ['Aliabad City', 'Altit', 'Duikar', 'Ganish'], ucs_ur: ['علی آباد شہر', 'الٹت', 'دوئیکر', 'گانیش'] },
          Gojal: { ur: 'گوجال', ucs: ['Gojal City', 'Sost', 'Passu', 'Hussaini'], ucs_ur: ['گوجال شہر', 'سوسٹ', 'پاسو', 'حسینی'] },
          Shinaki: { ur: 'شیناکی', ucs: ['Shinaki City', 'Altit', 'Duikar', 'Ganish'], ucs_ur: ['شیناکی شہر', 'الٹت', 'دوئیکر', 'گانیش'] },
        },
      },

      Kharmang: {
        ur: 'کھرمینگ',
        tehsils: {
          Kharmang: { ur: 'کھرمینگ', ucs: ['Kharmang City', 'Gultari', 'Haldi'], ucs_ur: ['کھرمینگ شہر', 'گلتری', 'ہلدی'] },
        },
      },

      Shigar: {
        ur: 'شگر',
        tehsils: {
          Shigar: { ur: 'شگر', ucs: ['Shigar City', 'Askole', 'Basha', 'Kiris'], ucs_ur: ['شگر شہر', 'اسکولے', 'باشہ', 'کیریس'] },
          Gulabpur: { ur: 'گلاب پور', ucs: ['Gulabpur'], ucs_ur: ['گلاب پور'] },
        },
      },

      Skardu: {
        ur: 'سکردو',
        tehsils: {
          Gultari: { ur: 'گلتری', ucs: ['Gultari City', 'Haldi', 'Keris'], ucs_ur: ['گلتری شہر', 'ہلدی', 'کیریس'] },
          Skardu: { ur: 'سکردو', ucs: ['Skardu City', 'Khaplu', 'Shigar', 'Rondu', 'Keris'], ucs_ur: ['سکردو شہر', 'خپلو', 'شگر', 'روندو', 'کیریس'] },
          Rondu: { ur: 'روندو', ucs: ['Rondu City', 'Skardu', 'Shigar', 'Keris'], ucs_ur: ['روندو شہر', 'سکردو', 'شگر', 'کیریس'] },
          Gamba: { ur: 'گمبا', ucs: ['Gamba City', 'Skardu', 'Shigar', 'Keris'], ucs_ur: ['گمبا شہر', 'سکردو', 'شگر', 'کیریس'] },
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
          Bagh: { ur: 'باغ', ucs: ['Bagh City', 'Dhirkot', 'Haveli', 'Sudhan Gali'], ucs_ur: ['باغ شہر', 'دھیرکوٹ', 'حویلی', 'سدھن گلی'] },
          Birpani: { ur: 'بیرپانی', ucs: ['Birpani City', 'Dhirkot', 'Haveli', 'Sudhan Gali'], ucs_ur: ['بیرپانی شہر', 'دھیرکوٹ', 'حویلی', 'سدھن گلی'] },
          Dhirkot: { ur: 'دھیرکوٹ', ucs: ['Dhirkot City', 'Bakote', 'Garhia', 'Narian'], ucs_ur: ['دھیرکوٹ شہر', 'باکوٹ', 'گڑھیا', 'ناریاں'] },
          'Hari Ghel': { ur: 'ہری گھیل', ucs: ['Hari Ghel City', 'Dhirkot', 'Haveli', 'Sudhan Gali'], ucs_ur: ['ہری گھیل شہر', 'دھیرکوٹ', 'حویلی', 'سدھن گلی'] },
          Rera: { ur: 'ریرا', ucs: ['Rera City', 'Dhirkot', 'Haveli', 'Sudhan Gali'], ucs_ur: ['ریرا شہر', 'دھیرکوٹ', 'حویلی', 'سدھن گلی'] },
        },
      },

      Bhimber: {
        ur: 'بھمبر',
        tehsils: {
          Barnala: { ur: 'برنالہ', ucs: ['Barnala City', 'Chowki Sarwar Shaheed', 'Samahni'], ucs_ur: ['برنالہ شہر', 'چوکی سرور شہید', 'سماہنی'] },
          Bhimber: { ur: 'بھمبر', ucs: ['Bhimber City', 'Barnala', 'Chowki Sarwar Shaheed', 'Samahni'], ucs_ur: ['بھمبر شہر', 'برنالہ', 'چوکی سرور شہید', 'سماہنی'] },
          Samahni: { ur: 'سماہنی', ucs: ['Samahni City', 'Chowki Sarwar Shaheed', 'Barnala'], ucs_ur: ['سماہنی شہر', 'چوکی سرور شہید', 'برنالہ'] },
        },
      },

      'Hattian Bala': {
        ur: 'ہٹیاں بالا',
        tehsils: {
          Chakar: { ur: 'چکر', ucs: ['Chakar City', 'Chakothi', 'Leepa', 'Sharda'], ucs_ur: ['چکر شہر', 'چکوٹھی', 'لیپا', 'شاردہ'] },
          'Hattian Bala': { ur: 'ہٹیاں بالا', ucs: ['Hattian Bala City', 'Chakothi', 'Leepa', 'Sharda'], ucs_ur: ['ہٹیاں بالا شہر', 'چکوٹھی', 'لیپا', 'شاردہ'] },
          Leepa: { ur: 'لیپا', ucs: ['Leepa City', 'Chakothi', 'Hattian Bala', 'Sharda'], ucs_ur: ['لیپا شہر', 'چکوٹھی', 'ہٹیاں بالا', 'شاردہ'] },
        },
      },

      Haveli: {
        ur: 'حویلی',
        tehsils: {
          Haveli: { ur: 'حویلی', ucs: ['Forward Kahuta City', 'Kahuta', 'Pattika', 'Thorar'], ucs_ur: ['فارورڈ کہوٹہ شہر', 'کہوٹہ', 'پٹیکہ', 'تھوڑر'] },
          Khurshidabad: { ur: 'خورشید آباد', ucs: ['Khurshidabad City', 'Kahuta', 'Pattika', 'Thorar'], ucs_ur: ['خورشید آباد شہر', 'کہوٹہ', 'پٹیکہ', 'تھوڑر'] },
          Mumtazabad: { ur: 'ممتاز آباد', ucs: ['Mumtazabad City', 'Kahuta', 'Pattika', 'Thorar'], ucs_ur: ['ممتاز آباد شہر', 'کہوٹہ', 'پٹیکہ', 'تھوڑر'] },
        },
      },

      Kotli: {
        ur: 'کوٹلی',
        tehsils: {
          Charhoi: { ur: 'چڑھوئی', ucs: ['Charhoi City', 'Khuiratta', 'Fatehpur', 'Sehnsa'], ucs_ur: ['چڑھوئی شہر', 'خوئیرٹہ', 'فتح پور', 'سہنسہ'] },
          'Duliah Jattan': { ur: 'ڈولیہ جٹاں', ucs: ['Duliah Jattan City', 'Khuiratta', 'Fatehpur', 'Sehnsa'], ucs_ur: ['ڈولیہ جٹاں شہر', 'خوئیرٹہ', 'فتح پور', 'سہنسہ'] },
          Fatehpur: { ur: 'فتح پور', ucs: ['Fatehpur City', 'Khuiratta', 'Charhoi', 'Sehnsa'], ucs_ur: ['فتح پور شہر', 'خوئیرٹہ', 'چڑھوئی', 'سہنسہ'] },
          Khuiratta: { ur: 'خوئیرٹہ', ucs: ['Khuiratta City', 'Charhoi', 'Fatehpur', 'Sehnsa'], ucs_ur: ['خوئیرٹہ شہر', 'چڑھوئی', 'فتح پور', 'سہنسہ'] },
          Kotli: { ur: 'کوٹلی', ucs: ['Kotli City', 'Charhoi', 'Fatehpur', 'Sehnsa'], ucs_ur: ['کوٹلی شہر', 'چڑھوئی', 'فتح پور', 'سہنسہ'] },
          Sehnsa: { ur: 'سہنسہ', ucs: ['Sehnsa City', 'Khuiratta', 'Sarsawa', 'Tatta Pani'], ucs_ur: ['سہنسہ شہر', 'خوئیرٹہ', 'سرساوہ', 'ٹٹہ پانی'] },
        },
      },

      Mirpur: {
        ur: 'میرپور',
        tehsils: {
          Dadyal: { ur: 'ڈڈیال', ucs: ['Dadyal City', 'Chakswari', 'Khari Sharif', 'Samahni'], ucs_ur: ['ڈڈیال شہر', 'چکسواری', 'خاری شریف', 'سماہنی'] },
          Islamgarh: { ur: 'اسلام گڑھ', ucs: ['Islamgarh City', 'Chakswari', 'Dadyal', 'Samahni'], ucs_ur: ['اسلام گڑھ شہر', 'چکسواری', 'ڈڈیال', 'سماہنی'] },
          Mirpur: { ur: 'میرپور', ucs: ['Mirpur City', 'Chakswari', 'Dadyal', 'Palandri Road'], ucs_ur: ['میرپور شہر', 'چکسواری', 'ڈڈیال', 'پلندری روڈ'] },
        },
      },

      Muzaffarabad: {
        ur: 'مظفرآباد',
        tehsils: {
          Muzaffarabad: { ur: 'مظفرآباد', ucs: ['Muzaffarabad City', 'Chattar Kalas', 'Nela', 'Patika', 'Trar'], ucs_ur: ['مظفرآباد شہر', 'چھتر کلاس', 'نیلا', 'پاتیکہ', 'ترار'] },
          Nasirabad: { ur: 'نصیرآباد', ucs: ['Nasirabad City', 'Chakothi', 'Danna', 'Leepa'], ucs_ur: ['نصیرآباد شہر', 'چکوٹھی', 'ڈنہ', 'لیپا'] },
        },
      },

      Neelum: {
        ur: 'نیلم',
        tehsils: {
          Athmuqam: { ur: 'اٹھ مقام', ucs: ['Athmuqam City', 'Dawarian', 'Minimarg', 'Taobat'], ucs_ur: ['اٹھ مقام شہر', 'دواریاں', 'منی مرگ', 'تاؤبٹ'] },
          Sharda: { ur: 'شاردہ', ucs: ['Sharda City', 'Athmuqam', 'Kel', 'Kutton'], ucs_ur: ['شاردہ شہر', 'اٹھ مقام', 'کیل', 'کٹن'] },
        },
      },

      Poonch: {
        ur: 'پونچھ',
        tehsils: {
          Abbaspur: { ur: 'عباسپور', ucs: ['Abbaspur City'], ucs_ur: ['عباس پور شہر'] },
          Hajira: { ur: 'حجیرہ', ucs: ['Hajira City'], ucs_ur: ['حجیرہ شہر'] },
          Rawalakot: { ur: 'راولا کوٹ', ucs: ['Rawalakot City'], ucs_ur: ['راولا کوٹ شہر'] },
          Thorar: { ur: 'تھوڑر', ucs: ['Thorar City'], ucs_ur: ['تھوڑر شہر'] },
        },
      },

      Sudhnoti: {
        ur: 'سدھنوتی',
        tehsils: {
          Mang: { ur: 'منگ', ucs: ['Mang City'], ucs_ur: ['منگ شہر'] },
          Pallandri: { ur: 'پلندری', ucs: ['Pallandri City', 'Khendar', 'Kontrilla', 'Sarola'], ucs_ur: ['پلندری شہر', 'کھنڈر', 'کونٹرلہ', 'سرولہ'] },
          'Tarar Khel': { ur: 'تارڑ خیل', ucs: ['Tarar Khel City', 'Mang', 'Tandar'], ucs_ur: ['تارڑ خیل شہر', 'منگ', 'تندر'] },
          Balouch: { ur: 'بلوچ', ucs: ['Balouch City', 'Mang', 'Tandar'], ucs_ur: ['بلوچ شہر', 'منگ', 'تندر'] },
        },
      },
    },
  },
};
