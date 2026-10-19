/**
 * Curated high-reliability MP3Quran dataset
 * Source: https://mp3quran.net / https://mp3quran.net/api/v3
 * Provides instant zero-latency loading of top reciters, radios, live TV, and audio tafsir
 */

export const POPULAR_RECITERS = [
  {
    id: 54,
    name: "مشاري بن راشد العفاسي",
    englishName: "Mishary Rashid Alafasy",
    letter: "م",
    server: "https://server8.mp3quran.net/afs/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server8.mp3quran.net/afs/",
        surah_total: 114
      }
    ]
  },
  {
    id: 31,
    name: "عبد الباسط عبد الصمد (مرتل)",
    englishName: "Abdul Basit Abdul Samad (Murattal)",
    letter: "ع",
    server: "https://server7.mp3quran.net/basit/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server7.mp3quran.net/basit/",
        surah_total: 114
      },
      {
        id: 2,
        name: "المصحف المجود",
        server: "https://server7.mp3quran.net/basit/Mujawwad/",
        surah_total: 114
      },
      {
        id: 3,
        name: "رواية ورش عن نافع",
        server: "https://server7.mp3quran.net/basit/warsh/",
        surah_total: 114
      }
    ]
  },
  {
    id: 123,
    name: "ماهر المعيقلي",
    englishName: "Maher Al-Muaiqly",
    letter: "م",
    server: "https://server12.mp3quran.net/maher/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server12.mp3quran.net/maher/",
        surah_total: 114
      }
    ]
  },
  {
    id: 112,
    name: "محمد صديق المنشاوي (مرتل)",
    englishName: "Mohamed Siddiq Al-Minshawi (Murattal)",
    letter: "م",
    server: "https://server10.mp3quran.net/minsh/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server10.mp3quran.net/minsh/",
        surah_total: 114
      },
      {
        id: 2,
        name: "المصحف المجود",
        server: "https://server10.mp3quran.net/minsh/Mujawwad/",
        surah_total: 114
      }
    ]
  },
  {
    id: 88,
    name: "محمود خليل الحصري",
    englishName: "Mahmoud Khalil Al-Hussary",
    letter: "م",
    server: "https://server13.mp3quran.net/husr/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server13.mp3quran.net/husr/",
        surah_total: 114
      },
      {
        id: 2,
        name: "المصحف المعلم",
        server: "https://server13.mp3quran.net/husr/Moalim/",
        surah_total: 114
      },
      {
        id: 3,
        name: "ورش عن نافع",
        server: "https://server13.mp3quran.net/husr/warsh/",
        surah_total: 114
      }
    ]
  },
  {
    id: 7,
    name: "أحمد بن علي العجمي",
    englishName: "Ahmed Ali Al-Ajmy",
    letter: "أ",
    server: "https://server10.mp3quran.net/ajm/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server10.mp3quran.net/ajm/",
        surah_total: 114
      }
    ]
  },
  {
    id: 38,
    name: "سعد الغامدي",
    englishName: "Saad Al-Ghamdi",
    letter: "س",
    server: "https://server7.mp3quran.net/s_gmd/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server7.mp3quran.net/s_gmd/",
        surah_total: 114
      }
    ]
  },
  {
    id: 145,
    name: "ياسر الدوسري",
    englishName: "Yasser Al-Dosari",
    letter: "ي",
    server: "https://server11.mp3quran.net/yasser/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server11.mp3quran.net/yasser/",
        surah_total: 114
      }
    ]
  },
  {
    id: 53,
    name: "عبد الرحمن السديس",
    englishName: "Abdul Rahman Al-Sudais",
    letter: "ع",
    server: "https://server11.mp3quran.net/sds/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server11.mp3quran.net/sds/",
        surah_total: 114
      }
    ]
  },
  {
    id: 43,
    name: "سعود الشريم",
    englishName: "Saud Al-Shuraim",
    letter: "س",
    server: "https://server7.mp3quran.net/shur/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server7.mp3quran.net/shur/",
        surah_total: 114
      }
    ]
  },
  {
    id: 28,
    name: "خالد الجليل",
    englishName: "Khalid Al-Jalil",
    letter: "خ",
    server: "https://server10.mp3quran.net/jleel/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server10.mp3quran.net/jleel/",
        surah_total: 114
      }
    ]
  },
  {
    id: 6,
    name: "إدريس أبكر",
    englishName: "Idrees Abkar",
    letter: "إ",
    server: "https://server6.mp3quran.net/abkr/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server6.mp3quran.net/abkr/",
        surah_total: 114
      }
    ]
  },
  {
    id: 139,
    name: "ناصر القطامي",
    englishName: "Nasser Al-Qatami",
    letter: "ن",
    server: "https://server6.mp3quran.net/qtm/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server6.mp3quran.net/qtm/",
        surah_total: 114
      }
    ]
  },
  {
    id: 92,
    name: "فارس عباد",
    englishName: "Fares Abbad",
    letter: "ف",
    server: "https://server8.mp3quran.net/frs_a/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server8.mp3quran.net/frs_a/",
        surah_total: 114
      }
    ]
  },
  {
    id: 59,
    name: "عبد الله علي جابر",
    englishName: "Ali Jaber",
    letter: "ع",
    server: "https://server11.mp3quran.net/a_jbr/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server11.mp3quran.net/a_jbr/",
        surah_total: 114
      }
    ]
  },
  {
    id: 161,
    name: "هزاع البلوشي",
    englishName: "Hazza Al-Balushi",
    letter: "هـ",
    server: "https://server11.mp3quran.net/hazza/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server11.mp3quran.net/hazza/",
        surah_total: 114
      }
    ]
  },
  {
    id: 16,
    name: "بندر بليلة",
    englishName: "Bandar Baleela",
    letter: "ب",
    server: "https://server6.mp3quran.net/balila/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server6.mp3quran.net/balila/",
        surah_total: 114
      }
    ]
  },
  {
    id: 61,
    name: "عبد الله عواد الجهني",
    englishName: "Abdullah Awad Al-Juhany",
    letter: "ع",
    server: "https://server13.mp3quran.net/jhn/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server13.mp3quran.net/jhn/",
        surah_total: 114
      }
    ]
  },
  {
    id: 120,
    name: "محمود علي البنا (مرتل)",
    englishName: "Mahmoud Ali Al-Banna",
    letter: "م",
    server: "https://server8.mp3quran.net/bna/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server8.mp3quran.net/bna/",
        surah_total: 114
      }
    ]
  },
  {
    id: 115,
    name: "محمد محمود الطبلاوي",
    englishName: "Mohamed Mahmoud Al-Tablawi",
    letter: "م",
    server: "https://server12.mp3quran.net/tblw/",
    rewaya: "حفص عن عاصم - مرتل",
    totalSurahs: 114,
    surahList: Array.from({ length: 114 }, (_, i) => i + 1),
    moshaf: [
      {
        id: 1,
        name: "حفص عن عاصم - مرتل",
        server: "https://server12.mp3quran.net/tblw/",
        surah_total: 114
      }
    ]
  }
];

export const POPULAR_RADIOS = [
  {
    id: 101,
    name: "إذاعة القرآن الكريم - القاهرة",
    englishName: "Quran Radio - Cairo",
    category: "general",
    url: "https://stream.radiojar.com/8s5u8pdtmtrtv"
  },
  {
    id: 102,
    name: "إذاعة مشاري العفاسي",
    englishName: "Mishary Alafasy Radio",
    category: "reciter",
    url: "https://backup.qurango.net/radio/mishary_alafasi"
  },
  {
    id: 103,
    name: "إذاعة عبد الباسط عبد الصمد",
    englishName: "Abdul Basit Abdul Samad Radio",
    category: "reciter",
    url: "https://backup.qurango.net/radio/abdulbasit_abdulsamad_mojawwad"
  },
  {
    id: 104,
    name: "إذاعة محمد صديق المنشاوي",
    englishName: "Mohamed Siddiq Al-Minshawi Radio",
    category: "reciter",
    url: "https://backup.qurango.net/radio/mohammed_siddiq_alminshawi"
  },
  {
    id: 105,
    name: "إذاعة ماهر المعيقلي",
    englishName: "Maher Al-Muaiqly Radio",
    category: "reciter",
    url: "https://backup.qurango.net/radio/maher"
  },
  {
    id: 106,
    name: "إذاعة محمود خليل الحصري",
    englishName: "Mahmoud Khalil Al-Hussary Radio",
    category: "reciter",
    url: "https://backup.qurango.net/radio/mahmoud_khalil_alhussary"
  },
  {
    id: 107,
    name: "إذاعة تلاوات خاشعة",
    englishName: "Khushoo Recitations Radio",
    category: "general",
    url: "https://backup.qurango.net/radio/salma"
  },
  {
    id: 108,
    name: "إذاعة سعد الغامدي",
    englishName: "Saad Al-Ghamdi Radio",
    category: "reciter",
    url: "https://backup.qurango.net/radio/saad_alghamdi"
  },
  {
    id: 109,
    name: "إذاعة أحمد بن علي العجمي",
    englishName: "Ahmed Al-Ajmy Radio",
    category: "reciter",
    url: "https://backup.qurango.net/radio/ahmad_alajmy"
  },
  {
    id: 110,
    name: "إذاعة ياسر الدوسري",
    englishName: "Yasser Al-Dosari Radio",
    category: "reciter",
    url: "https://backup.qurango.net/radio/yasser_aldosari"
  },
  {
    id: 111,
    name: "إذاعة خالد الجليل",
    englishName: "Khalid Al-Jalil Radio",
    category: "reciter",
    url: "https://backup.qurango.net/radio/khalid_aljaleel"
  },
  {
    id: 112,
    name: "إذاعة إدريس أبكر",
    englishName: "Idrees Abkar Radio",
    category: "reciter",
    url: "https://backup.qurango.net/radio/idrees_abkr"
  },
  {
    id: 113,
    name: "إذاعة الرقية الشرعية",
    englishName: "Ruqyah Shariah Radio",
    category: "general",
    url: "https://backup.qurango.net/radio/roqiah"
  },
  {
    id: 114,
    name: "إذاعة تفسير القرآن الكريم",
    englishName: "Quran Tafsir Radio",
    category: "tafsir",
    url: "https://backup.qurango.net/radio/tafseer"
  },
  {
    id: 115,
    name: "إذاعة سورة البقرة لعدة قراء",
    englishName: "Surah Al-Baqarah Multi-Reciters",
    category: "general",
    url: "https://backup.qurango.net/radio/albaqarah"
  },
  {
    id: 116,
    name: "إذاعة الفتاوى الإسلامية",
    englishName: "Islamic Fatwas Radio",
    category: "tafsir",
    url: "https://backup.qurango.net/radio/fatwa"
  },
  {
    id: 117,
    name: "إذاعة أذكار الصباح والمساء",
    englishName: "Morning & Evening Azkar Radio",
    category: "general",
    url: "https://backup.qurango.net/radio/athkar_azkar"
  },
  {
    id: 118,
    name: "إذاعة ناصر القطامي",
    englishName: "Nasser Al-Qatami Radio",
    category: "reciter",
    url: "https://backup.qurango.net/radio/nasser_alqatami"
  },
  {
    id: 119,
    name: "إذاعة فارس عباد",
    englishName: "Fares Abbad Radio",
    category: "reciter",
    url: "https://backup.qurango.net/radio/fares_abbad"
  },
  {
    id: 120,
    name: "إذاعة القرآن الكريم - مكة المكرمة",
    englishName: "Holy Quran Radio - Makkah",
    category: "general",
    url: "https://backup.qurango.net/radio/tarateel"
  }
];

export const LIVE_TV_CHANNELS = [
  {
    id: 'makkah',
    name: 'قناة القرآن الكريم - مكة المكرمة',
    englishName: 'Makkah Quran Live TV',
    location: 'المسجد الحرام، مكة المكرمة',
    locationEn: 'Al-Masjid Al-Haram, Makkah',
    badge: 'بث مباشر 24/7',
    badgeEn: 'Live 24/7',
    // High reliability embed or direct stream
    streamUrl: 'https://win.holol.com/live/quran/playlist.m3u8',
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCv_wD_Q2l07C5XkQ3aB85Lw', // fallback
    backupEmbed: 'https://www.youtube-nocookie.com/embed/Pj_1n4R5dJ8?autoplay=1&mute=1'
  },
  {
    id: 'madinah',
    name: 'قناة السنة النبوية - المدينة المنورة',
    englishName: 'Madinah Sunnah Live TV',
    location: 'المسجد النبوي الشريف، المدينة المنورة',
    locationEn: 'Al-Masjid An-Nabawi, Madinah',
    badge: 'بث مباشر 24/7',
    badgeEn: 'Live 24/7',
    streamUrl: 'https://win.holol.com/live/sunnah/playlist.m3u8',
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCXw-kH_g79w9C4-l8nSgUew',
    backupEmbed: 'https://www.youtube-nocookie.com/embed/4bC2u2P7wK8?autoplay=1&mute=1'
  }
];

export const AUDIO_TAFSIR_SOURCES = [
  {
    id: 1,
    name: "تفسير السعدي (تيسير الكريم الرحمن)",
    englishName: "Tafsir As-Saadi",
    scholar: "الشيخ عبد الرحمن السعدي",
    scholarEn: "Sheikh Abdur-Rahman As-Sa'di",
    baseUrl: "https://server17.mp3quran.net/tafseer/saadi/"
  },
  {
    id: 2,
    name: "الخلاصة من تفسير الطبري",
    englishName: "Summary of Tafsir Al-Tabari",
    scholar: "الإمام محمد بن جرير الطبري",
    scholarEn: "Imam Ibn Jarir Al-Tabari",
    baseUrl: "https://server17.mp3quran.net/tafseer/tabri/"
  }
];

export const formatSurahNumber = (num) => {
  return String(num).padStart(3, '0');
};

export const getSurahAudioUrl = (serverUrl, surahNumber) => {
  if (!serverUrl) return '';
  const cleanServer = serverUrl.endsWith('/') ? serverUrl : `${serverUrl}/`;
  return `${cleanServer}${formatSurahNumber(surahNumber)}.mp3`;
};

export const getTafsirAudioUrl = (baseUrl, surahNumber) => {
  if (!baseUrl) return '';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${cleanBase}${formatSurahNumber(surahNumber)}.mp3`;
};
