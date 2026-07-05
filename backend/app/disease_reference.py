# Static, offline knowledge base for the 37 diseases in maweshi_preprocessed.csv.

DISEASE_REFERENCE = {
    "Anaplasmosis": {
        "ur": "اینا پلازموسس (خون کا انفیکشن)",
        "serious": True,
        "first_aid_en": ["Isolate and keep the animal calm and shaded", "Ensure access to clean water", "Contact a vet for anti-protozoal treatment as soon as possible"],
        "first_aid_ur": ["جانور کو الگ اور سایہ دار جگہ پر رکھیں", "صاف پانی کی فراہمی یقینی بنائیں", "جلد از جلد ڈاکٹر سے اینٹی پروٹوزول علاج کے لیے رابطہ کریں"],
    },
    "Anthrax": {
        "ur": "اینتھریکس (خنجاق)",
        "serious": True,
        "first_aid_en": ["Do NOT open or move the carcass if the animal has died — highly contagious", "Isolate sick animals immediately", "Contact a vet and local livestock authority urgently"],
        "first_aid_ur": ["اگر جانور مر گیا ہو تو لاش کو مت کھولیں یا حرکت نہ دیں — یہ انتہائی متعدی ہے", "بیمار جانور کو فوری طور پر الگ کریں", "فوری طور پر ڈاکٹر اور مقامی لائیو اسٹاک حکام سے رابطہ کریں"],
    },
    "Arthritis": {
        "ur": "جوڑوں کی سوزش",
        "serious": False,
        "first_aid_en": ["Provide a soft, dry resting area", "Limit forced movement", "Consult a vet for anti-inflammatory treatment"],
        "first_aid_ur": ["نرم اور خشک آرام کی جگہ فراہم کریں", "زبردستی چلانے سے گریز کریں", "سوزش کم کرنے کے علاج کے لیے ڈاکٹر سے رابطہ کریں"],
    },
    "Babesiosis": {
        "ur": "بابیسیوسس (ٹِک بخار)",
        "serious": True,
        "first_aid_en": ["Isolate the animal and keep it shaded/calm", "Check for and remove ticks", "Contact a vet promptly for anti-parasitic treatment"],
        "first_aid_ur": ["جانور کو الگ اور سایہ میں رکھیں", "چچڑیاں چیک کر کے ہٹائیں", "جلد ڈاکٹر سے رابطہ کریں"],
    },
    "Black Quarter": {
        "ur": "بلیک کوارٹر",
        "serious": True,
        "first_aid_en": ["Isolate affected animal from the herd", "Do not delay — this progresses fast and is often fatal without treatment", "Contact a vet immediately for antibiotic treatment"],
        "first_aid_ur": ["متاثرہ جانور کو ریوڑ سے الگ کریں", "علاج میں تاخیر نہ کریں — یہ تیزی سے بڑھتی ہے", "فوری طور پر ڈاکٹر سے رابطہ کریں"],
    },
    "Digestive System Disorder": {
        "ur": "نظام انہضام کی خرابی",
        "serious": False,
        "first_aid_en": ["Withhold rich feed temporarily, allow only water/soft feed", "Monitor for worsening symptoms", "Consult a vet if symptoms persist beyond a day"],
        "first_aid_ur": ["فی الحال بھاری خوراک بند کر دیں، صرف پانی/نرم خوراک دیں", "علامات پر نظر رکھیں", "ایک دن بعد بھی بہتری نہ ہو تو ڈاکٹر سے رابطہ کریں"],
    },
    "Drenching Pneumonia": {
        "ur": "ڈرینچنگ نمونیا",
        "serious": True,
        "first_aid_en": ["Stop drenching immediately if in progress", "Keep the animal upright and warm", "Contact a vet urgently — aspiration pneumonia can be fatal"],
        "first_aid_ur": ["اگر دوا پلانے کا عمل جاری ہے تو فوراً روک دیں", "جانور کو سیدھا اور گرم رکھیں", "فوری طور پر ڈاکٹر سے رابطہ کریں"],
    },
    "Fasciolosis": {
        "ur": "جگر کے کیڑے (فاسیولوسس)",
        "serious": False,
        "first_aid_en": ["Improve feed quality and avoid waterlogged grazing areas", "Contact a vet for deworming (flukicide) treatment"],
        "first_aid_ur": ["خوراک کا معیار بہتر کریں اور گیلی چراگاہوں سے بچائیں", "کیڑے مار دوا کے لیے ڈاکٹر سے رابطہ کریں"],
    },
    "Foot Rot": {
        "ur": "پاؤں کی سڑن",
        "serious": False,
        "first_aid_en": ["Keep the animal on dry ground", "Clean and inspect the affected foot for lesions", "Consult a vet for antibiotic/foot treatment"],
        "first_aid_ur": ["جانور کو خشک جگہ پر رکھیں", "متاثرہ پاؤں صاف کریں اور زخم چیک کریں", "علاج کے لیے ڈاکٹر سے رابطہ کریں"],
    },
    "Foot and Mouth Disease (FMD)": {
        "ur": "منہ کھر کی بیماری",
        "serious": True,
        "first_aid_en": ["Isolate the animal from the rest of the herd immediately", "Clean and disinfect mouth and feet lesions", "Provide soft food and clean water", "Contact a vet as soon as possible"],
        "first_aid_ur": ["جانور کو باقی مویشیوں سے فوری الگ کریں", "منہ اور پاؤں کے زخموں کو صاف اور جراثیم سے پاک کریں", "نرم خوراک اور صاف پانی دیں", "جلد از جلد ڈاکٹر سے رابطہ کریں"],
    },
    "GID": {
        "ur": "گِڈ (دماغی کیڑا)",
        "serious": True,
        "first_aid_en": ["Keep the animal safe from injury if circling/uncoordinated", "Restrict movement near hazards", "Contact a vet — may require surgical treatment"],
        "first_aid_ur": ["اگر جانور چکر لگا رہا ہو تو اسے خطرناک جگہوں سے دور رکھیں", "حرکت محدود کریں", "ڈاکٹر سے رابطہ کریں — سرجری کی ضرورت ہو سکتی ہے"],
    },
    "Haemorrhagic Septicaemia": {
        "ur": "خون بہاؤ کی وبا (ایچ ایس)",
        "serious": True,
        "first_aid_en": ["Isolate affected animals immediately", "This can be rapidly fatal — do not delay treatment", "Contact a vet urgently for antibiotic treatment"],
        "first_aid_ur": ["متاثرہ جانور کو فوری الگ کریں", "یہ تیزی سے جان لیوا ہو سکتی ہے — تاخیر نہ کریں", "فوری طور پر ڈاکٹر سے رابطہ کریں"],
    },
    "Hyperthermia": {
        "ur": "جسم کی زیادہ حرارت",
        "serious": True,
        "first_aid_en": ["Move the animal to shade immediately", "Provide cool water and wet the body to cool down", "Contact a vet if no improvement within an hour"],
        "first_aid_ur": ["جانور کو فوری سایہ میں لے جائیں", "ٹھنڈا پانی دیں اور جسم کو گیلا کریں", "ایک گھنٹے میں بہتری نہ آئے تو ڈاکٹر سے رابطہ کریں"],
    },
    "Hypothermia": {
        "ur": "جسم کی کم حرارت",
        "serious": True,
        "first_aid_en": ["Move the animal to a warm, dry, sheltered area", "Cover with blankets/dry bedding", "Contact a vet, especially for young animals"],
        "first_aid_ur": ["جانور کو گرم اور خشک جگہ پر لے جائیں", "کمبل یا خشک بستر سے ڈھانپیں", "خصوصاً چھوٹے جانوروں کے لیے ڈاکٹر سے رابطہ کریں"],
    },
    "Impaction/Constipation": {
        "ur": "قبض / خوراک کا رکاؤ",
        "serious": False,
        "first_aid_en": ["Ensure plenty of clean water is available", "Encourage gentle movement/exercise", "Consult a vet if no improvement in 24 hours"],
        "first_aid_ur": ["کافی مقدار میں صاف پانی دستیاب رکھیں", "ہلکی پھلکی حرکت کروائیں", "24 گھنٹوں میں بہتری نہ ہو تو ڈاکٹر سے رابطہ کریں"],
    },
    "Infectious Diarrhea": {
        "ur": "متعدی اسہال",
        "serious": True,
        "first_aid_en": ["Isolate the animal to prevent spread", "Provide clean water to prevent dehydration (oral rehydration if available)", "Contact a vet promptly, especially for young animals"],
        "first_aid_ur": ["پھیلاؤ روکنے کے لیے جانور کو الگ کریں", "پانی کی کمی سے بچانے کے لیے صاف پانی دیں", "خصوصاً چھوٹے جانوروں کے لیے فوری ڈاکٹر سے رابطہ کریں"],
    },
    "Injury Trauma": {
        "ur": "چوٹ / زخم",
        "serious": False,
        "first_aid_en": ["Clean the wound gently with clean water", "Stop any active bleeding with gentle pressure", "Contact a vet for deeper wounds or if bleeding persists"],
        "first_aid_ur": ["زخم کو صاف پانی سے آہستہ صاف کریں", "خون بہنے کی صورت میں ہلکا دباؤ ڈالیں", "گہرے زخم یا مسلسل خون بہنے پر ڈاکٹر سے رابطہ کریں"],
    },
    "Jaundice": {
        "ur": "یرقان",
        "serious": True,
        "first_aid_en": ["Provide easily digestible feed", "Ensure clean water access", "Contact a vet — jaundice often signals liver/blood disease needing diagnosis"],
        "first_aid_ur": ["ہلکی اور آسانی سے ہضم ہونے والی خوراک دیں", "صاف پانی کی فراہمی یقینی بنائیں", "ڈاکٹر سے رابطہ کریں — یرقان اکثر جگر یا خون کی بیماری کی علامت ہے"],
    },
    "Lactic Acidosis": {
        "ur": "لیکٹک ایسڈوسس",
        "serious": True,
        "first_aid_en": ["Stop grain/concentrate feed immediately", "Provide water only, monitor closely", "Contact a vet urgently — can worsen quickly"],
        "first_aid_ur": ["فوری طور پر اناج والی خوراک بند کریں", "صرف پانی دیں اور نگرانی کریں", "فوری ڈاکٹر سے رابطہ کریں"],
    },
    "Mange Infestation": {
        "ur": "خارش (مینج)",
        "serious": False,
        "first_aid_en": ["Isolate the animal to prevent spread to others", "Keep the skin clean and dry", "Contact a vet for anti-parasitic treatment"],
        "first_aid_ur": ["پھیلاؤ روکنے کے لیے جانور کو الگ کریں", "جلد کو صاف اور خشک رکھیں", "علاج کے لیے ڈاکٹر سے رابطہ کریں"],
    },
    "Mastitis": {
        "ur": "تھن کی سوزش (ماسٹائٹس)",
        "serious": True,
        "first_aid_en": ["Gently and completely milk out the affected udder", "Keep the udder clean and dry", "Contact a vet for antibiotic treatment"],
        "first_aid_ur": ["متاثرہ تھن کو آہستگی سے مکمل دودھ نکالیں", "تھن کو صاف اور خشک رکھیں", "علاج کے لیے ڈاکٹر سے رابطہ کریں"],
    },
    "Milk Fever": {
        "ur": "دودھ بخار (کیلشیم کی کمی)",
        "serious": True,
        "first_aid_en": ["Keep the animal warm and comfortable, avoid forcing it to stand", "Contact a vet urgently — usually needs IV calcium treatment"],
        "first_aid_ur": ["جانور کو گرم اور آرام دہ رکھیں، زبردستی کھڑا نہ کریں", "فوری ڈاکٹر سے رابطہ کریں — عام طور پر کیلشیم کے انجکشن کی ضرورت ہوتی ہے"],
    },
    "PPR": {
        "ur": "پی پی آر (بکری بھیڑ کا طاعون)",
        "serious": True,
        "first_aid_en": ["Isolate affected animals immediately — highly contagious", "Provide soft food and clean water", "Contact a vet and local livestock authority urgently"],
        "first_aid_ur": ["متاثرہ جانور کو فوری الگ کریں — انتہائی متعدی بیماری ہے", "نرم خوراک اور صاف پانی دیں", "فوری طور پر ڈاکٹر اور لائیو اسٹاک حکام سے رابطہ کریں"],
    },
    "Phosphorus Deficiency": {
        "ur": "فاسفورس کی کمی",
        "serious": False,
        "first_aid_en": ["Provide a mineral supplement/mineral block if available", "Improve overall diet quality", "Consult a vet for confirmation and supplementation plan"],
        "first_aid_ur": ["ممکن ہو تو معدنی سپلیمنٹ فراہم کریں", "خوراک کا معیار بہتر بنائیں", "تصدیق کے لیے ڈاکٹر سے رابطہ کریں"],
    },
    "Plant/Feed Toxicity": {
        "ur": "زہریلی خوراک / پودے",
        "serious": True,
        "first_aid_en": ["Remove the animal from the suspected feed/plant source immediately", "Provide clean water", "Contact a vet urgently — describe what the animal may have eaten"],
        "first_aid_ur": ["جانور کو مشتبہ خوراک یا پودے سے فوری دور کریں", "صاف پانی دیں", "فوری ڈاکٹر سے رابطہ کریں اور بتائیں جانور نے کیا کھایا ہو سکتا ہے"],
    },
    "Pyrexia/ Infection/ Inflammation": {
        "ur": "بخار / انفیکشن / سوزش",
        "serious": False,
        "first_aid_en": ["Keep the animal in a cool, shaded, well-ventilated area", "Ensure access to clean water", "Contact a vet if fever persists beyond a day"],
        "first_aid_ur": ["جانور کو ٹھنڈی اور ہوادار جگہ پر رکھیں", "صاف پانی کی فراہمی یقینی بنائیں", "ایک دن سے زیادہ بخار رہے تو ڈاکٹر سے رابطہ کریں"],
    },
    "Rabies and Injury": {
        "ur": "ریبیز اور زخم",
        "serious": True,
        "first_aid_en": ["Avoid direct contact with the animal's saliva — wear gloves", "Isolate the animal securely", "Contact a vet and authorities immediately — this is a serious human health risk too"],
        "first_aid_ur": ["جانور کے لعاب سے براہ راست رابطے سے گریز کریں — دستانے پہنیں", "جانور کو محفوظ طریقے سے الگ کریں", "فوری طور پر ڈاکٹر اور حکام سے رابطہ کریں — یہ انسانوں کے لیے بھی خطرناک ہے"],
    },
    "Sheep n Goat Pox": {
        "ur": "بھیڑ بکری کی چیچک",
        "serious": True,
        "first_aid_en": ["Isolate affected animals immediately", "Keep skin lesions clean", "Contact a vet and local livestock authority — highly contagious"],
        "first_aid_ur": ["متاثرہ جانور کو فوری الگ کریں", "جلد کے زخموں کو صاف رکھیں", "ڈاکٹر اور لائیو اسٹاک حکام سے رابطہ کریں — انتہائی متعدی بیماری ہے"],
    },
    "Theileriosis": {
        "ur": "تھیلیریوسس (ٹِک بخار)",
        "serious": True,
        "first_aid_en": ["Isolate and shade the animal", "Check for and remove ticks", "Contact a vet promptly for anti-parasitic treatment"],
        "first_aid_ur": ["جانور کو الگ اور سایہ میں رکھیں", "چچڑیاں چیک کر کے ہٹائیں", "جلد ڈاکٹر سے رابطہ کریں"],
    },
    "Throat Infection": {
        "ur": "گلے کا انفیکشن",
        "serious": False,
        "first_aid_en": ["Provide soft, easy-to-swallow feed", "Ensure clean water access", "Contact a vet if breathing/swallowing is difficult"],
        "first_aid_ur": ["نرم اور آسانی سے نگلی جانے والی خوراک دیں", "صاف پانی کی فراہمی یقینی بنائیں", "سانس لینے یا نگلنے میں دشواری ہو تو ڈاکٹر سے رابطہ کریں"],
    },
    "Tick Infestation": {
        "ur": "چچڑیوں کا حملہ",
        "serious": False,
        "first_aid_en": ["Manually remove visible ticks carefully", "Clean the affected skin areas", "Contact a vet for an appropriate acaricide treatment"],
        "first_aid_ur": ["نظر آنے والی چچڑیاں احتیاط سے ہٹائیں", "متاثرہ جلد کو صاف کریں", "علاج کے لیے ڈاکٹر سے رابطہ کریں"],
    },
    "Trypanosomiasis": {
        "ur": "ٹریپینوسومیاسس (سرا بیماری)",
        "serious": True,
        "first_aid_en": ["Isolate and keep the animal calm", "Protect from biting flies where possible", "Contact a vet urgently for anti-trypanosomal treatment"],
        "first_aid_ur": ["جانور کو الگ اور پرسکون رکھیں", "ممکن ہو تو کاٹنے والی مکھیوں سے بچائیں", "فوری ڈاکٹر سے رابطہ کریں"],
    },
    "Tympany/ Bloat": {
        "ur": "پیٹ پھولنا",
        "serious": True,
        "first_aid_en": ["Keep the animal standing and moving gently if possible", "Withhold further feed immediately", "Contact a vet urgently — severe bloat can be fatal quickly"],
        "first_aid_ur": ["ممکن ہو تو جانور کو کھڑا اور ہلکی حرکت میں رکھیں", "فوری طور پر مزید خوراک دینا بند کریں", "فوری طور پر ڈاکٹر سے رابطہ کریں — شدید صورت جان لیوا ہو سکتی ہے"],
    },
    "Upper Respiratory Tract Infection": {
        "ur": "بالائی نظام تنفس کا انفیکشن",
        "serious": False,
        "first_aid_en": ["Keep the animal in a warm, well-ventilated area away from dust", "Ensure clean water access", "Contact a vet if breathing difficulty worsens"],
        "first_aid_ur": ["جانور کو گرم، ہوادار اور گرد سے پاک جگہ پر رکھیں", "صاف پانی کی فراہمی یقینی بنائیں", "سانس کی تکلیف بڑھے تو ڈاکٹر سے رابطہ کریں"],
    },
    "Urine Retention": {
        "ur": "پیشاب کی بندش",
        "serious": True,
        "first_aid_en": ["Do not delay — this can become an emergency quickly", "Keep the animal calm and comfortable", "Contact a vet urgently"],
        "first_aid_ur": ["تاخیر نہ کریں — یہ جلد ایمرجنسی بن سکتی ہے", "جانور کو پرسکون اور آرام دہ رکھیں", "فوری طور پر ڈاکٹر سے رابطہ کریں"],
    },
    "Vitamins and Minerals Deficiency": {
        "ur": "وٹامنز اور معدنیات کی کمی",
        "serious": False,
        "first_aid_en": ["Improve overall diet with balanced fodder", "Provide a mineral/vitamin supplement if available", "Consult a vet for a proper supplementation plan"],
        "first_aid_ur": ["متوازن چارے سے خوراک بہتر بنائیں", "ممکن ہو تو وٹامن/معدنی سپلیمنٹ فراہم کریں", "مناسب منصوبے کے لیے ڈاکٹر سے رابطہ کریں"],
    },
    "Worm Infestation": {
        "ur": "کیڑوں کا حملہ",
        "serious": False,
        "first_aid_en": ["Ensure clean feed and water to reduce reinfection", "Keep the living area clean of feces", "Contact a vet for an appropriate deworming schedule"],
        "first_aid_ur": ["دوبارہ انفیکشن سے بچنے کے لیے صاف خوراک اور پانی دیں", "رہائشی جگہ کو فضلے سے صاف رکھیں", "مناسب کیڑے مار دوا کے شیڈول کے لیے ڈاکٹر سے رابطہ کریں"],
    },
}

DEFAULT_REFERENCE = {
    "ur": "",
    "serious": False,
    "first_aid_en": ["Monitor the animal closely", "Ensure clean water and appropriate feed", "Contact a vet for a proper diagnosis"],
    "first_aid_ur": ["جانور پر گہری نظر رکھیں", "صاف پانی اور مناسب خوراک یقینی بنائیں", "درست تشخیص کے لیے ڈاکٹر سے رابطہ کریں"],
}


def get_reference(disease_name: str) -> dict:
    return DISEASE_REFERENCE.get(disease_name, {**DEFAULT_REFERENCE, "ur": disease_name})
