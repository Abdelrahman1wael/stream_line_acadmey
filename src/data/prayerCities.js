// Preset cities, calculation methods, and prayer metadata

export const CALCULATION_METHODS = [
  { id: 5, key: 'egypt', nameAr: 'الهيئة المصرية العامة للمساحة', nameEn: 'Egyptian General Authority of Survey', fajrAngle: 19.5, ishaAngle: 17.5 },
  { id: 4, key: 'makkah', nameAr: 'جامعة أم القرى - مكة المكرمة', nameEn: 'Umm Al-Qura University, Makkah', fajrAngle: 18.5, ishaParam: '90 min' },
  { id: 3, key: 'mwl', nameAr: 'رابطة العالم الإسلامي', nameEn: 'Muslim World League (MWL)', fajrAngle: 18.0, ishaAngle: 17.0 },
  { id: 2, key: 'isna', nameAr: 'الجمعية الإسلامية لأمريكا الشمالية (ISNA)', nameEn: 'Islamic Society of North America', fajrAngle: 15.0, ishaAngle: 15.0 },
  { id: 1, key: 'karachi', nameAr: 'جامعة العلوم الإسلامية بكراتشي', nameEn: 'University of Islamic Sciences, Karachi', fajrAngle: 18.0, ishaAngle: 18.0 },
  { id: 8, key: 'gulf', nameAr: 'الهيئة العامة للشؤون الإسلامية - الإمارات', nameEn: 'UAE / Gulf Region', fajrAngle: 18.2, ishaAngle: 18.2 },
  { id: 9, key: 'kuwait', nameAr: 'وزارة الأوقاف الكويتية', nameEn: 'Ministry of Awqaf, Kuwait', fajrAngle: 18.0, ishaAngle: 17.5 },
  { id: 10, key: 'qatar', nameAr: 'وزارة الأوقاف والشؤون الإسلامية - قطر', nameEn: 'Ministry of Awqaf, Qatar', fajrAngle: 18.0, ishaParam: '90 min' },
  { id: 13, key: 'diyanet', nameAr: 'رئاسة الشؤون الدينية - تركيا (Diyanet)', nameEn: 'Diyanet İşleri Başkanlığı, Turkey', fajrAngle: 18.0, ishaAngle: 17.0 }
];

export const JURISTIC_METHODS = [
  { id: 0, key: 'standard', nameAr: 'الجمهور (الشافعي، المالكي، الحنبلي)', nameEn: 'Standard (Shafi\'i, Maliki, Hanbali)', shadowFactor: 1 },
  { id: 1, key: 'hanafi', nameAr: 'المذهب الحنفي', nameEn: 'Hanafi', shadowFactor: 2 }
];

export const PRESET_CITIES = [
  // Egypt
  { id: 'cairo', nameAr: 'القاهرة', nameEn: 'Cairo', countryAr: 'مصر', countryEn: 'Egypt', lat: 30.0444, lng: 31.2357, timezone: 'Africa/Cairo', method: 5 },
  { id: 'alexandria', nameAr: 'الإسكندرية', nameEn: 'Alexandria', countryAr: 'مصر', countryEn: 'Egypt', lat: 31.2001, lng: 29.9187, timezone: 'Africa/Cairo', method: 5 },
  { id: 'giza', nameAr: 'الجيزة', nameEn: 'Giza', countryAr: 'مصر', countryEn: 'Egypt', lat: 30.0131, lng: 31.2089, timezone: 'Africa/Cairo', method: 5 },
  { id: 'mansoura', nameAr: 'المنصورة', nameEn: 'Mansoura', countryAr: 'مصر', countryEn: 'Egypt', lat: 31.0409, lng: 31.3785, timezone: 'Africa/Cairo', method: 5 },
  { id: 'tanta', nameAr: 'طنطا', nameEn: 'Tanta', countryAr: 'مصر', countryEn: 'Egypt', lat: 30.7865, lng: 31.0004, timezone: 'Africa/Cairo', method: 5 },
  { id: 'aswan', nameAr: 'أسوان', nameEn: 'Aswan', countryAr: 'مصر', countryEn: 'Egypt', lat: 24.0889, lng: 32.8998, timezone: 'Africa/Cairo', method: 5 },

  // Saudi Arabia & Gulf
  { id: 'makkah', nameAr: 'مكة المكرمة', nameEn: 'Makkah', countryAr: 'السعودية', countryEn: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, timezone: 'Asia/Riyadh', method: 4 },
  { id: 'madinah', nameAr: 'المدينة المنورة', nameEn: 'Madinah', countryAr: 'السعودية', countryEn: 'Saudi Arabia', lat: 24.5247, lng: 39.5692, timezone: 'Asia/Riyadh', method: 4 },
  { id: 'riyadh', nameAr: 'الرياض', nameEn: 'Riyadh', countryAr: 'السعودية', countryEn: 'Saudi Arabia', lat: 24.7136, lng: 46.6753, timezone: 'Asia/Riyadh', method: 4 },
  { id: 'jeddah', nameAr: 'جدة', nameEn: 'Jeddah', countryAr: 'السعودية', countryEn: 'Saudi Arabia', lat: 21.4858, lng: 39.1925, timezone: 'Asia/Riyadh', method: 4 },
  { id: 'dubai', nameAr: 'دبي', nameEn: 'Dubai', countryAr: 'الإمارات', countryEn: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, timezone: 'Asia/Dubai', method: 8 },
  { id: 'abudhabi', nameAr: 'أبو ظبي', nameEn: 'Abu Dhabi', countryAr: 'الإمارات', countryEn: 'United Arab Emirates', lat: 24.4539, lng: 54.3773, timezone: 'Asia/Dubai', method: 8 },
  { id: 'doha', nameAr: 'الدوحة', nameEn: 'Doha', countryAr: 'قطر', countryEn: 'Qatar', lat: 25.2854, lng: 51.5310, timezone: 'Asia/Qatar', method: 10 },
  { id: 'kuwait', nameAr: 'الكويت', nameEn: 'Kuwait City', countryAr: 'الكويت', countryEn: 'Kuwait', lat: 29.3759, lng: 47.9774, timezone: 'Asia/Kuwait', method: 9 },
  { id: 'muscat', nameAr: 'مسقط', nameEn: 'Muscat', countryAr: 'عُمان', countryEn: 'Oman', lat: 23.5880, lng: 58.3829, timezone: 'Asia/Muscat', method: 8 },
  { id: 'manama', nameAr: 'المنامة', nameEn: 'Manama', countryAr: 'البحرين', countryEn: 'Bahrain', lat: 26.2285, lng: 50.5860, timezone: 'Asia/Bahrain', method: 8 },

  // Levant & Arab World
  { id: 'jerusalem', nameAr: 'القدس الشريف', nameEn: 'Jerusalem', countryAr: 'فلسطين', countryEn: 'Palestine', lat: 31.7683, lng: 35.2137, timezone: 'Asia/Jerusalem', method: 3 },
  { id: 'gaza', nameAr: 'غزة', nameEn: 'Gaza', countryAr: 'فلسطين', countryEn: 'Palestine', lat: 31.5017, lng: 34.4668, timezone: 'Asia/Gaza', method: 3 },
  { id: 'amman', nameAr: 'عمّان', nameEn: 'Amman', countryAr: 'الأردن', countryEn: 'Jordan', lat: 31.9454, lng: 35.9284, timezone: 'Asia/Amman', method: 3 },
  { id: 'damascus', nameAr: 'دمشق', nameEn: 'Damascus', countryAr: 'سوريا', countryEn: 'Syria', lat: 33.5138, lng: 36.2765, timezone: 'Asia/Damascus', method: 3 },
  { id: 'beirut', nameAr: 'بيروت', nameEn: 'Beirut', countryAr: 'لبنان', countryEn: 'Lebanon', lat: 33.8938, lng: 35.5018, timezone: 'Asia/Beirut', method: 3 },
  { id: 'baghdad', nameAr: 'بغداد', nameEn: 'Baghdad', countryAr: 'العراق', countryEn: 'Iraq', lat: 33.3152, lng: 44.3661, timezone: 'Asia/Baghdad', method: 3 },
  { id: 'sanaa', nameAr: 'صنعاء', nameEn: 'Sana\'a', countryAr: 'اليمن', countryEn: 'Yemen', lat: 15.3694, lng: 44.1910, timezone: 'Asia/Riyadh', method: 4 },
  { id: 'tripoli', nameAr: 'طرابلس', nameEn: 'Tripoli', countryAr: 'ليبيا', countryEn: 'Libya', lat: 32.8872, lng: 13.1913, timezone: 'Africa/Tripoli', method: 5 },
  { id: 'tunis', nameAr: 'تونس', nameEn: 'Tunis', countryAr: 'تونس', countryEn: 'Tunisia', lat: 36.8065, lng: 10.1815, timezone: 'Africa/Tunis', method: 3 },
  { id: 'algiers', nameAr: 'الجزائر', nameEn: 'Algiers', countryAr: 'الجزائر', countryEn: 'Algeria', lat: 36.7538, lng: 3.0588, timezone: 'Africa/Algiers', method: 3 },
  { id: 'casablanca', nameAr: 'الدار البيضاء', nameEn: 'Casablanca', countryAr: 'المغرب', countryEn: 'Morocco', lat: 33.5731, lng: -7.5898, timezone: 'Africa/Casablanca', method: 3 },
  { id: 'rabat', nameAr: 'الرباط', nameEn: 'Rabat', countryAr: 'المغرب', countryEn: 'Morocco', lat: 34.0209, lng: -6.8416, timezone: 'Africa/Casablanca', method: 3 },
  { id: 'khartoum', nameAr: 'الخرطوم', nameEn: 'Khartoum', countryAr: 'السودان', countryEn: 'Sudan', lat: 15.5007, lng: 32.5599, timezone: 'Africa/Khartoum', method: 5 },

  // Europe & Americas & International
  { id: 'istanbul', nameAr: 'إسطنبول', nameEn: 'Istanbul', countryAr: 'تركيا', countryEn: 'Turkey', lat: 41.0082, lng: 28.9784, timezone: 'Europe/Istanbul', method: 13 },
  { id: 'london', nameAr: 'لندن', nameEn: 'London', countryAr: 'المملكة المتحدة', countryEn: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London', method: 3 },
  { id: 'paris', nameAr: 'باريس', nameEn: 'Paris', countryAr: 'فرنسا', countryEn: 'France', lat: 48.8566, lng: 2.3522, timezone: 'Europe/Paris', method: 3 },
  { id: 'berlin', nameAr: 'برلين', nameEn: 'Berlin', countryAr: 'ألمانيا', countryEn: 'Germany', lat: 52.5200, lng: 13.4050, timezone: 'Europe/Berlin', method: 3 },
  { id: 'newyork', nameAr: 'نيويورك', nameEn: 'New York', countryAr: 'الولايات المتحدة', countryEn: 'United States', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York', method: 2 },
  { id: 'toronto', nameAr: 'تورونتو', nameEn: 'Toronto', countryAr: 'كندا', countryEn: 'Canada', lat: 43.6532, lng: -79.3832, timezone: 'America/Toronto', method: 2 },
  { id: 'jakarta', nameAr: 'جاكرتا', nameEn: 'Jakarta', countryAr: 'إندونيسيا', countryEn: 'Indonesia', lat: -6.2088, lng: 106.8456, timezone: 'Asia/Jakarta', method: 3 },
  { id: 'kualalumpur', nameAr: 'كوالالمبور', nameEn: 'Kuala Lumpur', countryAr: 'ماليزيا', countryEn: 'Malaysia', lat: 3.1390, lng: 101.6869, timezone: 'Asia/Kuala_Lumpur', method: 3 }
];

export const ADHAN_TRACKS = [
  {
    id: 'makkah',
    nameAr: 'أذان المسجد الحرام (مكة المكرمة)',
    nameEn: 'Makkah Al-Mukarramah Adhan',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a1.mp3'
  },
  {
    id: 'madinah',
    nameAr: 'أذان المسجد النبوي الشريف',
    nameEn: 'Madinah Al-Munawwarah Adhan',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a3.mp3'
  },
  {
    id: 'afasy',
    nameAr: 'أذان الشيخ مشاري راشد العفاسي',
    nameEn: 'Sheikh Mishari Al-Afasy Adhan',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a8.mp3'
  },
  {
    id: 'abdulbasit',
    nameAr: 'أذان الشيخ عبد الباسط عبد الصمد',
    nameEn: 'Sheikh Abdul Basit Adhan',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a2.mp3'
  }
];

export const PRAYERS_INFO = [
  {
    id: 'Fajr',
    nameAr: 'الفجر',
    nameEn: 'Fajr',
    icon: 'fa-solid fa-cloud-sun',
    color: '#0284c7',
    rakats: 2,
    sunnahBefore: 2,
    sunnahAfter: 0,
    sunnahDescAr: 'ركعتا الفجر خيرٌ من الدنيا وما فيها (سنة مؤكدة قبل الصلاة)',
    sunnahDescEn: '2 Rak\'ahs before prayer (The two Rak\'ahs of Fajr are better than this world and all it contains)',
    virtueAr: '«مَن صلَّى الصُّبحَ فهو في ذمَّةِ اللهِ» (صحيح مسلم)',
    virtueEn: '«Whoever prays the morning prayer is under the protection of Allah» (Sahih Muslim)'
  },
  {
    id: 'Sunrise',
    nameAr: 'الشروق',
    nameEn: 'Sunrise',
    icon: 'fa-solid fa-sun',
    color: '#f59e0b',
    isNotObligatory: true,
    rakats: 0,
    sunnahDescAr: 'وقت شروق الشمس وانتهاء وقت الفجر، يُستحب بعده صلاة الضحى (ركعتان فأكثر)',
    sunnahDescEn: 'Sunrise marks the end of Fajr time. Followed by Duha prayer (2+ Rak\'ahs)',
    virtueAr: '«يُصْبِحُ علَى كُلِّ سُلَامَى مِن أَحَدِكُمْ صَدَقَةٌ... وَيُجْزِئُ مِن ذلكَ رَكْعَتَانِ يَرْكَعُهُما مِنَ الضُّحَى»',
    virtueEn: '«Two Rak\'ahs performed at Duha time suffice for charity on every bone and joint»'
  },
  {
    id: 'Dhuhr',
    nameAr: 'الظهر',
    nameEn: 'Dhuhr',
    icon: 'fa-solid fa-sun',
    color: '#eab308',
    rakats: 4,
    sunnahBefore: 4,
    sunnahAfter: 2,
    sunnahDescAr: '4 ركعات قبل الظهر وركعتان بعدها من السنن الرواتب',
    sunnahDescEn: '4 Rak\'ahs before Dhuhr and 2 Rak\'ahs after (Sunan Rawatib)',
    virtueAr: '«مَنْ حَافَظَ عَلَى أَرْبَعِ رَكَعَاتٍ قَبْلَ الظُّهْرِ، وَأَرْبَعٍ بَعْدَهَا، حَرَّمَهُ اللَّهُ عَلَى النَّارِ»',
    virtueEn: '«Whoever maintains 4 Rak\'ahs before Dhuhr and 4 after, Allah will make him forbidden for the Fire»'
  },
  {
    id: 'Asr',
    nameAr: 'العصر',
    nameEn: 'Asr',
    icon: 'fa-solid fa-cloud-sun',
    color: '#f97316',
    rakats: 4,
    sunnahBefore: 4, // non-muakkadah
    sunnahAfter: 0,
    sunnahDescAr: 'الصلاة الوسطى؛ يُستحب 4 ركعات قبلها («رَحِمَ اللَّهُ امْرَأً صَلَّى قَبْلَ الْعَصْرِ أَرْبَعًا»)',
    sunnahDescEn: 'The Middle Prayer; 4 optional Rak\'ahs before («May Allah have mercy on who prays 4 before Asr»)',
    virtueAr: '«مَن صلَّى البَرْدَيْنِ دخلَ الجَنَّةَ» (الفجر والعصر - متفق عليه)',
    virtueEn: '«Whoever prays the two cool prayers (Fajr & Asr) will enter Paradise» (Bukhari & Muslim)'
  },
  {
    id: 'Maghrib',
    nameAr: 'المغرب',
    nameEn: 'Maghrib',
    icon: 'fa-solid fa-mountain-sun',
    color: '#ec4899',
    rakats: 3,
    sunnahBefore: 2,
    sunnahAfter: 2,
    sunnahDescAr: 'ركعتان بعد المغرب من السنن الرواتب المؤكدة',
    sunnahDescEn: '2 Rak\'ahs after Maghrib (Emphasized Sunnah Rawatib)',
    virtueAr: 'وقت استجابة الدعاء وموعد إفطار الصائمين عند غروب الشمس',
    virtueEn: 'A blessed time of accepted supplication and the time for fasting believers to break fast'
  },
  {
    id: 'Isha',
    nameAr: 'العشاء',
    nameEn: 'Isha',
    icon: 'fa-solid fa-moon',
    color: '#6366f1',
    rakats: 4,
    sunnahBefore: 0,
    sunnahAfter: 2,
    sunnahDescAr: 'ركعتان بعد العشاء سنة راتبة، ثم صلاة الوتر والقيام',
    sunnahDescEn: '2 Rak\'ahs after Isha (Sunnah Rawatib), followed by Witr and Qiyam',
    virtueAr: '«مَن صَلَّى العِشَاءَ في جَمَاعَةٍ فَكَأنَّما قَامَ نِصْفَ اللَّيْلِ» (صحيح مسلم)',
    virtueEn: '«Whoever prays Isha in congregation, it is as if he prayed half the night» (Sahih Muslim)'
  }
];

export const EXTRA_TIMES_INFO = [
  {
    id: 'Qiyam',
    nameAr: 'ثلث الليل الأخير (قيام الليل)',
    nameEn: 'Last Third of Night (Qiyam)',
    icon: 'fa-solid fa-star-and-crescent',
    color: '#8b5cf6',
    virtueAr: '«يَنْزِلُ رَبُّنَا تَبَارَكَ وَتَعَالَى كُلَّ لَيْلَةٍ إِلَى السَّمَاءِ الدُّنْيَا حِينَ يَبْقَى ثُلُثُ اللَّيْلِ الآخِرُ فَيَقُولُ: مَنْ يَدْعُونِي فَأَسْتَجِيبَ لَهُ»',
    virtueEn: '«Our Lord descends every night to the lowest heaven when the last third remains, saying: Who calls upon Me that I may answer him?»'
  },
  {
    id: 'Midnight',
    nameAr: 'منتصف الليل الإسلامي',
    nameEn: 'Islamic Midnight',
    icon: 'fa-solid fa-compass-drafting',
    color: '#475569',
    virtueAr: 'انتهاء وقت العشاء الاختياري (منتصف المسافة الزمنية بين غروب الشمس وطلوع الفجر)',
    virtueEn: 'Marks the end of the preferred time for Isha prayer'
  }
];

export const DUA_AFTER_ADHAN = {
  ar: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ القَائِمَةِ، آتِ مُحَمَّداً الوَسِيلَةَ وَالفَضِيلَةَ، وَابْعَثْهُ مَقَاماً مَحْمُوداً الَّذِي وَعَدْتَهُ، [إِنَّكَ لَا تُخْلِفُ المِيعَادَ].',
  en: 'O Allah, Owner of this perfect call and established prayer, grant Muhammad the Vessel and excellence, and resurrect him to the praised station which You have promised him.'
};
