/**
 * Quran Data References: 30 Juz' and 114 Surahs metadata
 * Used for instant navigation, offline resilience, and mapping Juz to Surahs
 */

(function() {
const JUZ_DATA = [
  {
    number: 1,
    arabicName: "الم",
    englishName: "Alif Lam Meem",
    startSurah: 1,
    startAyah: 1,
    endSurah: 2,
    endAyah: 141,
    surahs: [
      { number: 1, name: "الفاتحة", englishName: "Al-Faatiha", ayahs: [1, 7] },
      { number: 2, name: "البقرة", englishName: "Al-Baqara", ayahs: [1, 141] }
    ]
  },
  {
    number: 2,
    arabicName: "سَيَقُولُ",
    englishName: "Sayaqool",
    startSurah: 2,
    startAyah: 142,
    endSurah: 2,
    endAyah: 252,
    surahs: [
      { number: 2, name: "البقرة", englishName: "Al-Baqara", ayahs: [142, 252] }
    ]
  },
  {
    number: 3,
    arabicName: "تِلْكَ الرُّسُلُ",
    englishName: "Tilka-r-Rusul",
    startSurah: 2,
    startAyah: 253,
    endSurah: 3,
    endAyah: 92,
    surahs: [
      { number: 2, name: "البقرة", englishName: "Al-Baqara", ayahs: [253, 286] },
      { number: 3, name: "آل عمران", englishName: "Aal-i-Imraan", ayahs: [1, 92] }
    ]
  },
  {
    number: 4,
    arabicName: "لَنْ تَنَالُوا",
    englishName: "Lan Tanaaloo",
    startSurah: 3,
    startAyah: 93,
    endSurah: 4,
    endAyah: 23,
    surahs: [
      { number: 3, name: "آل عمران", englishName: "Aal-i-Imraan", ayahs: [93, 200] },
      { number: 4, name: "النساء", englishName: "An-Nisaa", ayahs: [1, 23] }
    ]
  },
  {
    number: 5,
    arabicName: "وَالْمُحْصَنَاتُ",
    englishName: "Wal Muhsanat",
    startSurah: 4,
    startAyah: 24,
    endSurah: 4,
    endAyah: 147,
    surahs: [
      { number: 4, name: "النساء", englishName: "An-Nisaa", ayahs: [24, 147] }
    ]
  },
  {
    number: 6,
    arabicName: "لَا يُحِبُّ اللَّهُ",
    englishName: "La Yuhibbullah",
    startSurah: 4,
    startAyah: 148,
    endSurah: 5,
    endAyah: 81,
    surahs: [
      { number: 4, name: "النساء", englishName: "An-Nisaa", ayahs: [148, 176] },
      { number: 5, name: "المائدة", englishName: "Al-Maaida", ayahs: [1, 81] }
    ]
  },
  {
    number: 7,
    arabicName: "وَإِذَا سَمِعُوا",
    englishName: "Wa Iza Sami'oo",
    startSurah: 5,
    startAyah: 82,
    endSurah: 6,
    endAyah: 110,
    surahs: [
      { number: 5, name: "المائدة", englishName: "Al-Maaida", ayahs: [82, 120] },
      { number: 6, name: "الأنعام", englishName: "Al-An'aam", ayahs: [1, 110] }
    ]
  },
  {
    number: 8,
    arabicName: "وَلَوْ أَنَّنَا",
    englishName: "Wa Law Annana",
    startSurah: 6,
    startAyah: 111,
    endSurah: 7,
    endAyah: 87,
    surahs: [
      { number: 6, name: "الأنعام", englishName: "Al-An'aam", ayahs: [111, 165] },
      { number: 7, name: "الأعراف", englishName: "Al-A'raaf", ayahs: [1, 87] }
    ]
  },
  {
    number: 9,
    arabicName: "قَالَ الْمَلَأُ",
    englishName: "Qalal Mala'u",
    startSurah: 7,
    startAyah: 88,
    endSurah: 8,
    endAyah: 40,
    surahs: [
      { number: 7, name: "الأعراف", englishName: "Al-A'raaf", ayahs: [88, 206] },
      { number: 8, name: "الأنفال", englishName: "Al-Anfaal", ayahs: [1, 40] }
    ]
  },
  {
    number: 10,
    arabicName: "وَاعْلَمُوا",
    englishName: "Wa A'lamoo",
    startSurah: 8,
    startAyah: 41,
    endSurah: 9,
    endAyah: 92,
    surahs: [
      { number: 8, name: "الأنفال", englishName: "Al-Anfaal", ayahs: [41, 75] },
      { number: 9, name: "التوبة", englishName: "At-Tawba", ayahs: [1, 92] }
    ]
  },
  {
    number: 11,
    arabicName: "يَعْتَذِرُونَ",
    englishName: "Ya'taziroon",
    startSurah: 9,
    startAyah: 93,
    endSurah: 11,
    endAyah: 5,
    surahs: [
      { number: 9, name: "التوبة", englishName: "At-Tawba", ayahs: [93, 129] },
      { number: 10, name: "يونس", englishName: "Yunus", ayahs: [1, 109] },
      { number: 11, name: "هود", englishName: "Hud", ayahs: [1, 5] }
    ]
  },
  {
    number: 12,
    arabicName: "وَمَا مِنْ دَابَّةٍ",
    englishName: "Wa Mamin Daabbah",
    startSurah: 11,
    startAyah: 6,
    endSurah: 12,
    endAyah: 52,
    surahs: [
      { number: 11, name: "هود", englishName: "Hud", ayahs: [6, 123] },
      { number: 12, name: "يوسف", englishName: "Yusuf", ayahs: [1, 52] }
    ]
  },
  {
    number: 13,
    arabicName: "وَمَا أُبَرِّئُ",
    englishName: "Wa Ma Ubarri'u",
    startSurah: 12,
    startAyah: 53,
    endSurah: 14,
    endAyah: 52,
    surahs: [
      { number: 12, name: "يوسف", englishName: "Yusuf", ayahs: [53, 111] },
      { number: 13, name: "الرعد", englishName: "Ar-Ra'd", ayahs: [1, 43] },
      { number: 14, name: "إبراهيم", englishName: "Ibrahim", ayahs: [1, 52] }
    ]
  },
  {
    number: 14,
    arabicName: "رُبَمَا",
    englishName: "Rubama",
    startSurah: 15,
    startAyah: 1,
    endSurah: 16,
    endAyah: 128,
    surahs: [
      { number: 15, name: "الحجر", englishName: "Al-Hijr", ayahs: [1, 99] },
      { number: 16, name: "النحل", englishName: "An-Nahl", ayahs: [1, 128] }
    ]
  },
  {
    number: 15,
    arabicName: "سُبْحَانَ الَّذِي",
    englishName: "Subhaana-llazee",
    startSurah: 17,
    startAyah: 1,
    endSurah: 18,
    endAyah: 74,
    surahs: [
      { number: 17, name: "الإسراء", englishName: "Al-Israa", ayahs: [1, 111] },
      { number: 18, name: "الكهف", englishName: "Al-Kahf", ayahs: [1, 74] }
    ]
  },
  {
    number: 16,
    arabicName: "قَالَ أَلَمْ",
    englishName: "Qaala Alam",
    startSurah: 18,
    startAyah: 75,
    endSurah: 20,
    endAyah: 135,
    surahs: [
      { number: 18, name: "الكهف", englishName: "Al-Kahf", ayahs: [75, 110] },
      { number: 19, name: "مريم", englishName: "Maryam", ayahs: [1, 98] },
      { number: 20, name: "طه", englishName: "Taa-Haa", ayahs: [1, 135] }
    ]
  },
  {
    number: 17,
    arabicName: "اقْتَرَبَ",
    englishName: "Iqtaraba",
    startSurah: 21,
    startAyah: 1,
    endSurah: 22,
    endAyah: 78,
    surahs: [
      { number: 21, name: "الأنبياء", englishName: "Al-Anbiyaa", ayahs: [1, 112] },
      { number: 22, name: "الحج", englishName: "Al-Hajj", ayahs: [1, 78] }
    ]
  },
  {
    number: 18,
    arabicName: "قَدْ أَفْلَحَ",
    englishName: "Qadd Aflaha",
    startSurah: 23,
    startAyah: 1,
    endSurah: 25,
    endAyah: 20,
    surahs: [
      { number: 23, name: "المؤمنون", englishName: "Al-Muminoon", ayahs: [1, 118] },
      { number: 24, name: "النور", englishName: "An-Noor", ayahs: [1, 64] },
      { number: 25, name: "الفرقان", englishName: "Al-Furqaan", ayahs: [1, 20] }
    ]
  },
  {
    number: 19,
    arabicName: "وَقَالَ الَّذِينَ",
    englishName: "Wa Qalallazina",
    startSurah: 25,
    startAyah: 21,
    endSurah: 27,
    endAyah: 55,
    surahs: [
      { number: 25, name: "الفرقان", englishName: "Al-Furqaan", ayahs: [21, 77] },
      { number: 26, name: "الشعراء", englishName: "Ash-Shu'araa", ayahs: [1, 227] },
      { number: 27, name: "النمل", englishName: "An-Naml", ayahs: [1, 55] }
    ]
  },
  {
    number: 20,
    arabicName: "أَمَّنْ خَلَقَ",
    englishName: "Amman Khalaq",
    startSurah: 27,
    startAyah: 56,
    endSurah: 29,
    endAyah: 45,
    surahs: [
      { number: 27, name: "النمل", englishName: "An-Naml", ayahs: [56, 93] },
      { number: 28, name: "القصص", englishName: "Al-Qasas", ayahs: [1, 88] },
      { number: 29, name: "العنكبوت", englishName: "Al-Ankaboot", ayahs: [1, 45] }
    ]
  },
  {
    number: 21,
    arabicName: "اتْلُ مَا أُوحِيَ",
    englishName: "Utlu Ma Oohiya",
    startSurah: 29,
    startAyah: 46,
    endSurah: 33,
    endAyah: 30,
    surahs: [
      { number: 29, name: "العنكبوت", englishName: "Al-Ankaboot", ayahs: [46, 69] },
      { number: 30, name: "الروم", englishName: "Ar-Room", ayahs: [1, 60] },
      { number: 31, name: "لقمان", englishName: "Luqman", ayahs: [1, 34] },
      { number: 32, name: "السجدة", englishName: "As-Sajda", ayahs: [1, 30] },
      { number: 33, name: "الأحزاب", englishName: "Al-Ahzaab", ayahs: [1, 30] }
    ]
  },
  {
    number: 22,
    arabicName: "وَمَنْ يَقْنُتْ",
    englishName: "Wa Manyaqnut",
    startSurah: 33,
    startAyah: 31,
    endSurah: 36,
    endAyah: 27,
    surahs: [
      { number: 33, name: "الأحزاب", englishName: "Al-Ahzaab", ayahs: [31, 73] },
      { number: 34, name: "سبأ", englishName: "Saba", ayahs: [1, 54] },
      { number: 35, name: "فاطر", englishName: "Faatir", ayahs: [1, 45] },
      { number: 36, name: "يس", englishName: "Yaseen", ayahs: [1, 27] }
    ]
  },
  {
    number: 23,
    arabicName: "وَمَا لِيَ",
    englishName: "Wa Maliya",
    startSurah: 36,
    startAyah: 28,
    endSurah: 39,
    endAyah: 31,
    surahs: [
      { number: 36, name: "يس", englishName: "Yaseen", ayahs: [28, 83] },
      { number: 37, name: "الصافات", englishName: "As-Saaffaat", ayahs: [1, 182] },
      { number: 38, name: "ص", englishName: "Saad", ayahs: [1, 88] },
      { number: 39, name: "الزمر", englishName: "Az-Zumar", ayahs: [1, 31] }
    ]
  },
  {
    number: 24,
    arabicName: "فَمَنْ أَظْلَمُ",
    englishName: "Faman Azlamu",
    startSurah: 39,
    startAyah: 32,
    endSurah: 41,
    endAyah: 46,
    surahs: [
      { number: 39, name: "الزمر", englishName: "Az-Zumar", ayahs: [32, 75] },
      { number: 40, name: "غافر", englishName: "Ghafir", ayahs: [1, 85] },
      { number: 41, name: "فصلت", englishName: "Fussilat", ayahs: [1, 46] }
    ]
  },
  {
    number: 25,
    arabicName: "إِلَيْهِ يُرَدُّ",
    englishName: "Ilayhi Yuraddu",
    startSurah: 41,
    startAyah: 47,
    endSurah: 45,
    endAyah: 37,
    surahs: [
      { number: 41, name: "فصلت", englishName: "Fussilat", ayahs: [47, 54] },
      { number: 42, name: "الشورى", englishName: "Ash-Shura", ayahs: [1, 53] },
      { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", ayahs: [1, 89] },
      { number: 44, name: "الدخان", englishName: "Ad-Dukhaan", ayahs: [1, 59] },
      { number: 45, name: "الجاثية", englishName: "Al-Jaathiya", ayahs: [1, 37] }
    ]
  },
  {
    number: 26,
    arabicName: "حم",
    englishName: "Haa Meem",
    startSurah: 46,
    startAyah: 1,
    endSurah: 51,
    endAyah: 30,
    surahs: [
      { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", ayahs: [1, 35] },
      { number: 47, name: "محمد", englishName: "Muhammad", ayahs: [1, 38] },
      { number: 48, name: "الفتح", englishName: "Al-Fath", ayahs: [1, 29] },
      { number: 49, name: "الحجرات", englishName: "Al-Hujuraat", ayahs: [1, 18] },
      { number: 50, name: "ق", englishName: "Qaaf", ayahs: [1, 45] },
      { number: 51, name: "الذاريات", englishName: "Adh-Dhaariyat", ayahs: [1, 30] }
    ]
  },
  {
    number: 27,
    arabicName: "قَالَ فَمَا خَطْبُكُمْ",
    englishName: "Qaala Fama Khatbukum",
    startSurah: 51,
    startAyah: 31,
    endSurah: 57,
    endAyah: 29,
    surahs: [
      { number: 51, name: "الذاريات", englishName: "Adh-Dhaariyat", ayahs: [31, 60] },
      { number: 52, name: "الطور", englishName: "At-Toor", ayahs: [1, 49] },
      { number: 53, name: "النجم", englishName: "An-Najm", ayahs: [1, 62] },
      { number: 54, name: "القمر", englishName: "Al-Qamar", ayahs: [1, 55] },
      { number: 55, name: "الرحمن", englishName: "Ar-Rahmaan", ayahs: [1, 78] },
      { number: 56, name: "الواقعة", englishName: "Al-Waaqia", ayahs: [1, 96] },
      { number: 57, name: "الحديد", englishName: "Al-Hadid", ayahs: [1, 29] }
    ]
  },
  {
    number: 28,
    arabicName: "قَدْ سَمِعَ اللَّهُ",
    englishName: "Qadd Sami'allahu",
    startSurah: 58,
    startAyah: 1,
    endSurah: 66,
    endAyah: 12,
    surahs: [
      { number: 58, name: "المجادلة", englishName: "Al-Mujaadila", ayahs: [1, 22] },
      { number: 59, name: "الحشر", englishName: "Al-Hashr", ayahs: [1, 24] },
      { number: 60, name: "الممتحنة", englishName: "Al-Mumtahana", ayahs: [1, 13] },
      { number: 61, name: "الصف", englishName: "As-Saff", ayahs: [1, 14] },
      { number: 62, name: "الجمعة", englishName: "Al-Jumu'a", ayahs: [1, 11] },
      { number: 63, name: "المنافقون", englishName: "Al-Munaafiqoon", ayahs: [1, 11] },
      { number: 64, name: "التغابن", englishName: "At-Taghaabun", ayahs: [1, 18] },
      { number: 65, name: "الطلاق", englishName: "At-Talaaq", ayahs: [1, 12] },
      { number: 66, name: "التحريم", englishName: "At-Tahrim", ayahs: [1, 12] }
    ]
  },
  {
    number: 29,
    arabicName: "تَبَارَكَ الَّذِي",
    englishName: "Tabaarakallazee",
    startSurah: 67,
    startAyah: 1,
    endSurah: 77,
    endAyah: 50,
    surahs: [
      { number: 67, name: "الملك", englishName: "Al-Mulk", ayahs: [1, 30] },
      { number: 68, name: "القلم", englishName: "Al-Qalam", ayahs: [1, 52] },
      { number: 69, name: "الحاقة", englishName: "Al-Haaqqa", ayahs: [1, 52] },
      { number: 70, name: "المعارج", englishName: "Al-Ma'aarij", ayahs: [1, 44] },
      { number: 71, name: "نوح", englishName: "Nooh", ayahs: [1, 28] },
      { number: 72, name: "الجن", englishName: "Al-Jinn", ayahs: [1, 28] },
      { number: 73, name: "المزمل", englishName: "Al-Muzzammil", ayahs: [1, 20] },
      { number: 74, name: "المدثر", englishName: "Al-Muddaththir", ayahs: [1, 56] },
      { number: 75, name: "القيامة", englishName: "Al-Qiyaama", ayahs: [1, 40] },
      { number: 76, name: "الإنسان", englishName: "Al-Insaan", ayahs: [1, 31] },
      { number: 77, name: "المرسلات", englishName: "Al-Mursalaat", ayahs: [1, 50] }
    ]
  },
  {
    number: 30,
    arabicName: "عَمَّ",
    englishName: "Amma",
    startSurah: 78,
    startAyah: 1,
    endSurah: 114,
    endAyah: 6,
    surahs: [
      { number: 78, name: "النبأ", englishName: "An-Naba", ayahs: [1, 40] },
      { number: 79, name: "النازعات", englishName: "An-Naazi'aat", ayahs: [1, 46] },
      { number: 80, name: "عبس", englishName: "Abasa", ayahs: [1, 42] },
      { number: 81, name: "التكوير", englishName: "At-Takwir", ayahs: [1, 29] },
      { number: 82, name: "الانفطار", englishName: "Al-Infitaar", ayahs: [1, 19] },
      { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", ayahs: [1, 36] },
      { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaaq", ayahs: [1, 25] },
      { number: 85, name: "البروج", englishName: "Al-Burooj", ayahs: [1, 22] },
      { number: 86, name: "الطارق", englishName: "At-Taariq", ayahs: [1, 17] },
      { number: 87, name: "الأعلى", englishName: "Al-A'laa", ayahs: [1, 19] },
      { number: 88, name: "الغاشية", englishName: "Al-Ghaashiya", ayahs: [1, 26] },
      { number: 89, name: "الفجر", englishName: "Al-Fajr", ayahs: [1, 30] },
      { number: 90, name: "البلد", englishName: "Al-Balad", ayahs: [1, 20] },
      { number: 91, name: "الشمس", englishName: "Ash-Shams", ayahs: [1, 15] },
      { number: 92, name: "الليل", englishName: "Al-Lail", ayahs: [1, 21] },
      { number: 93, name: "الضحى", englishName: "Ad-Dhuhaa", ayahs: [1, 11] },
      { number: 94, name: "الشرح", englishName: "Ash-Sharh", ayahs: [1, 8] },
      { number: 95, name: "التين", englishName: "At-Tin", ayahs: [1, 8] },
      { number: 96, name: "العلق", englishName: "Al-Alaq", ayahs: [1, 19] },
      { number: 97, name: "القدر", englishName: "Al-Qadr", ayahs: [1, 5] },
      { number: 98, name: "البينة", englishName: "Al-Bayyina", ayahs: [1, 8] },
      { number: 99, name: "الزلزلة", englishName: "Az-Zalzala", ayahs: [1, 8] },
      { number: 100, name: "العاديات", englishName: "Al-Aadiyaat", ayahs: [1, 11] },
      { number: 101, name: "القارعة", englishName: "Al-Qaari'a", ayahs: [1, 11] },
      { number: 102, name: "التكاثر", englishName: "At-Takaathur", ayahs: [1, 8] },
      { number: 103, name: "العصر", englishName: "Al-Asr", ayahs: [1, 3] },
      { number: 104, name: "الهمزة", englishName: "Al-Humaza", ayahs: [1, 9] },
      { number: 105, name: "الفيل", englishName: "Al-Feel", ayahs: [1, 5] },
      { number: 106, name: "قريش", englishName: "Quraish", ayahs: [1, 4] },
      { number: 107, name: "الماعون", englishName: "Al-Maa'oon", ayahs: [1, 7] },
      { number: 108, name: "الكوثر", englishName: "Al-Kawthar", ayahs: [1, 3] },
      { number: 109, name: "الكافرون", englishName: "Al-Kaafiroon", ayahs: [1, 6] },
      { number: 110, name: "النصر", englishName: "An-Nasr", ayahs: [1, 3] },
      { number: 111, name: "المسد", englishName: "Al-Masad", ayahs: [1, 5] },
      { number: 112, name: "الإخلاص", englishName: "Al-Ikhlaas", ayahs: [1, 4] },
      { number: 113, name: "الفلق", englishName: "Al-Falaq", ayahs: [1, 5] },
      { number: 114, name: "الناس", englishName: "An-Naas", ayahs: [1, 6] }
    ]
  }
];

const SURAH_LIST = [
  { number: 1, name: "الفَاتِحَة", englishName: "Al-Faatiha", ayahs: 7, type: "Meccan" },
  { number: 2, name: "البَقَرَة", englishName: "Al-Baqara", ayahs: 286, type: "Medinan" },
  { number: 3, name: "آل عِمْرَان", englishName: "Aal-i-Imraan", ayahs: 200, type: "Medinan" },
  { number: 4, name: "النِّسَاء", englishName: "An-Nisaa", ayahs: 176, type: "Medinan" },
  { number: 5, name: "المَائِدَة", englishName: "Al-Maaida", ayahs: 120, type: "Medinan" },
  { number: 6, name: "الأَنْعَام", englishName: "Al-An'aam", ayahs: 165, type: "Meccan" },
  { number: 7, name: "الأَعْرَاف", englishName: "Al-A'raaf", ayahs: 206, type: "Meccan" },
  { number: 8, name: "الأَنْفَال", englishName: "Al-Anfaal", ayahs: 75, type: "Medinan" },
  { number: 9, name: "التَّوْبَة", englishName: "At-Tawba", ayahs: 129, type: "Medinan" },
  { number: 10, name: "يُونُس", englishName: "Yunus", ayahs: 109, type: "Meccan" },
  { number: 11, name: "هُود", englishName: "Hud", ayahs: 123, type: "Meccan" },
  { number: 12, name: "يُوسُف", englishName: "Yusuf", ayahs: 111, type: "Meccan" },
  { number: 13, name: "الرَّعْد", englishName: "Ar-Ra'd", ayahs: 43, type: "Medinan" },
  { number: 14, name: "إِبْرَاهِيم", englishName: "Ibrahim", ayahs: 52, type: "Meccan" },
  { number: 15, name: "الحِجْر", englishName: "Al-Hijr", ayahs: 99, type: "Meccan" },
  { number: 16, name: "النَّحْل", englishName: "An-Nahl", ayahs: 128, type: "Meccan" },
  { number: 17, name: "الإِسْرَاء", englishName: "Al-Israa", ayahs: 111, type: "Meccan" },
  { number: 18, name: "الكَهْف", englishName: "Al-Kahf", ayahs: 110, type: "Meccan" },
  { number: 19, name: "مَرْيَم", englishName: "Maryam", ayahs: 98, type: "Meccan" },
  { number: 20, name: "طه", englishName: "Taa-Haa", ayahs: 135, type: "Meccan" },
  { number: 21, name: "الأَنْبِيَاء", englishName: "Al-Anbiyaa", ayahs: 112, type: "Meccan" },
  { number: 22, name: "الحَجّ", englishName: "Al-Hajj", ayahs: 78, type: "Medinan" },
  { number: 23, name: "المُؤْمِنُون", englishName: "Al-Muminoon", ayahs: 118, type: "Meccan" },
  { number: 24, name: "النُّور", englishName: "An-Noor", ayahs: 64, type: "Medinan" },
  { number: 25, name: "الفُرْقَان", englishName: "Al-Furqaan", ayahs: 77, type: "Meccan" },
  { number: 26, name: "الشُّعَرَاء", englishName: "Ash-Shu'araa", ayahs: 227, type: "Meccan" },
  { number: 27, name: "النَّمْل", englishName: "An-Naml", ayahs: 93, type: "Meccan" },
  { number: 28, name: "القَصَص", englishName: "Al-Qasas", ayahs: 88, type: "Meccan" },
  { number: 29, name: "العَنْكَبُوت", englishName: "Al-Ankaboot", ayahs: 69, type: "Meccan" },
  { number: 30, name: "الرُّوم", englishName: "Ar-Room", ayahs: 60, type: "Meccan" },
  { number: 31, name: "لُقْمَان", englishName: "Luqman", ayahs: 34, type: "Meccan" },
  { number: 32, name: "السَّجْدَة", englishName: "As-Sajda", ayahs: 30, type: "Meccan" },
  { number: 33, name: "الأَحْزَاب", englishName: "Al-Ahzaab", ayahs: 73, type: "Medinan" },
  { number: 34, name: "سَبَأ", englishName: "Saba", ayahs: 54, type: "Meccan" },
  { number: 35, name: "فَاطِر", englishName: "Faatir", ayahs: 45, type: "Meccan" },
  { number: 36, name: "يس", englishName: "Yaseen", ayahs: 83, type: "Meccan" },
  { number: 37, name: "الصَّافَّات", englishName: "As-Saaffaat", ayahs: 182, type: "Meccan" },
  { number: 38, name: "ص", englishName: "Saad", ayahs: 88, type: "Meccan" },
  { number: 39, name: "الزُّمَر", englishName: "Az-Zumar", ayahs: 75, type: "Meccan" },
  { number: 40, name: "غَافِر", englishName: "Ghafir", ayahs: 85, type: "Meccan" },
  { number: 41, name: "فُصِّلَت", englishName: "Fussilat", ayahs: 54, type: "Meccan" },
  { number: 42, name: "الشُّورَى", englishName: "Ash-Shura", ayahs: 53, type: "Meccan" },
  { number: 43, name: "الزُّخْرُف", englishName: "Az-Zukhruf", ayahs: 89, type: "Meccan" },
  { number: 44, name: "الدُّخَان", englishName: "Ad-Dukhaan", ayahs: 59, type: "Meccan" },
  { number: 45, name: "الجَاثِيَة", englishName: "Al-Jaathiya", ayahs: 37, type: "Meccan" },
  { number: 46, name: "الأَحْقَاف", englishName: "Al-Ahqaf", ayahs: 35, type: "Meccan" },
  { number: 47, name: "مُحَمَّد", englishName: "Muhammad", ayahs: 38, type: "Medinan" },
  { number: 48, name: "الفَتْح", englishName: "Al-Fath", ayahs: 29, type: "Medinan" },
  { number: 49, name: "الحُجُرَات", englishName: "Al-Hujuraat", ayahs: 18, type: "Medinan" },
  { number: 50, name: "ق", englishName: "Qaaf", ayahs: 45, type: "Meccan" },
  { number: 51, name: "الذَّارِيَات", englishName: "Adh-Dhaariyat", ayahs: 60, type: "Meccan" },
  { number: 52, name: "الطُّور", englishName: "At-Toor", ayahs: 49, type: "Meccan" },
  { number: 53, name: "النَّجْم", englishName: "An-Najm", ayahs: 62, type: "Meccan" },
  { number: 54, name: "القَمَر", englishName: "Al-Qamar", ayahs: 55, type: "Meccan" },
  { number: 55, name: "الرَّحْمَٰن", englishName: "Ar-Rahmaan", ayahs: 78, type: "Medinan" },
  { number: 56, name: "الوَاقِعَة", englishName: "Al-Waaqia", ayahs: 96, type: "Meccan" },
  { number: 57, name: "الحَدِيد", englishName: "Al-Hadid", ayahs: 29, type: "Medinan" },
  { number: 58, name: "المُجَادِلَة", englishName: "Al-Mujaadila", ayahs: 22, type: "Medinan" },
  { number: 59, name: "الحَشْر", englishName: "Al-Hashr", ayahs: 24, type: "Medinan" },
  { number: 60, name: "المُمْتَحَنَة", englishName: "Al-Mumtahana", ayahs: 13, type: "Medinan" },
  { number: 61, name: "الصَّفّ", englishName: "As-Saff", ayahs: 14, type: "Medinan" },
  { number: 62, name: "الجُمُعَة", englishName: "Al-Jumu'a", ayahs: 11, type: "Medinan" },
  { number: 63, name: "المُنَافِقُون", englishName: "Al-Munaafiqoon", ayahs: 11, type: "Medinan" },
  { number: 64, name: "التَّغَابُن", englishName: "At-Taghaabun", ayahs: 18, type: "Medinan" },
  { number: 65, name: "الطَّلَاق", englishName: "At-Talaaq", ayahs: 12, type: "Medinan" },
  { number: 66, name: "التَّحْرِيم", englishName: "At-Tahrim", ayahs: 12, type: "Medinan" },
  { number: 67, name: "المُلْك", englishName: "Al-Mulk", ayahs: 30, type: "Meccan" },
  { number: 68, name: "القَلَم", englishName: "Al-Qalam", ayahs: 52, type: "Meccan" },
  { number: 69, name: "الحَاقَّة", englishName: "Al-Haaqqa", ayahs: 52, type: "Meccan" },
  { number: 70, name: "المَعَارِج", englishName: "Al-Ma'aarij", ayahs: 44, type: "Meccan" },
  { number: 71, name: "نُوح", englishName: "Nooh", ayahs: 28, type: "Meccan" },
  { number: 72, name: "الجِنّ", englishName: "Al-Jinn", ayahs: 28, type: "Meccan" },
  { number: 73, name: "المُزَّمِّل", englishName: "Al-Muzzammil", ayahs: 20, type: "Meccan" },
  { number: 74, name: "المُدَّثِّر", englishName: "Al-Muddaththir", ayahs: 56, type: "Meccan" },
  { number: 75, name: "القِيَامَة", englishName: "Al-Qiyaama", ayahs: 40, type: "Meccan" },
  { number: 76, name: "الإِنْسَان", englishName: "Al-Insaan", ayahs: 31, type: "Medinan" },
  { number: 77, name: "المُرْسَلَات", englishName: "Al-Mursalaat", ayahs: 50, type: "Meccan" },
  { number: 78, name: "النَّبَأ", englishName: "An-Naba", ayahs: 40, type: "Meccan" },
  { number: 79, name: "النَّازِعَات", englishName: "An-Naazi'aat", ayahs: 46, type: "Meccan" },
  { number: 80, name: "عَبَسَ", englishName: "Abasa", ayahs: 42, type: "Meccan" },
  { number: 81, name: "التَّكْوِير", englishName: "At-Takwir", ayahs: 29, type: "Meccan" },
  { number: 82, name: "الانْفِطَار", englishName: "Al-Infitaar", ayahs: 19, type: "Meccan" },
  { number: 83, name: "المُطَفِّفِين", englishName: "Al-Mutaffifin", ayahs: 36, type: "Meccan" },
  { number: 84, name: "الانْشِقَاق", englishName: "Al-Inshiqaaq", ayahs: 25, type: "Meccan" },
  { number: 85, name: "البُرُوج", englishName: "Al-Burooj", ayahs: 22, type: "Meccan" },
  { number: 86, name: "الطَّارِق", englishName: "At-Taariq", ayahs: 17, type: "Meccan" },
  { number: 87, name: "الأَعْلَى", englishName: "Al-A'laa", ayahs: 19, type: "Meccan" },
  { number: 88, name: "الغَاشِيَة", englishName: "Al-Ghaashiya", ayahs: 26, type: "Meccan" },
  { number: 89, name: "الفَجْر", englishName: "Al-Fajr", ayahs: 30, type: "Meccan" },
  { number: 90, name: "البَلَد", englishName: "Al-Balad", ayahs: 20, type: "Meccan" },
  { number: 91, name: "الشَّمْس", englishName: "Ash-Shams", ayahs: 15, type: "Meccan" },
  { number: 92, name: "اللَّيْل", englishName: "Al-Lail", ayahs: 21, type: "Meccan" },
  { number: 93, name: "الضُّحَى", englishName: "Ad-Dhuhaa", ayahs: 11, type: "Meccan" },
  { number: 94, name: "الشَّرْح", englishName: "Ash-Sharh", ayahs: 8, type: "Meccan" },
  { number: 95, name: "التِّين", englishName: "At-Tin", ayahs: 8, type: "Meccan" },
  { number: 96, name: "العَلَق", englishName: "Al-Alaq", ayahs: 19, type: "Meccan" },
  { number: 97, name: "القَدْر", englishName: "Al-Qadr", ayahs: 5, type: "Meccan" },
  { number: 98, name: "البَيِّنَة", englishName: "Al-Bayyina", ayahs: 8, type: "Medinan" },
  { number: 99, name: "الزَّلْزَلَة", englishName: "Az-Zalzala", ayahs: 8, type: "Medinan" },
  { number: 100, name: "العَادِيَات", englishName: "Al-Aadiyaat", ayahs: 11, type: "Meccan" },
  { number: 101, name: "القَارِعَة", englishName: "Al-Qaari'a", ayahs: 11, type: "Meccan" },
  { number: 102, name: "التَّكَاثُر", englishName: "At-Takaathur", ayahs: 8, type: "Meccan" },
  { number: 103, name: "العَصْر", englishName: "Al-Asr", ayahs: 3, type: "Meccan" },
  { number: 104, name: "الهُمَزَة", englishName: "Al-Humaza", ayahs: 9, type: "Meccan" },
  { number: 105, name: "الفِيل", englishName: "Al-Feel", ayahs: 5, type: "Meccan" },
  { number: 106, name: "قُرَيْش", englishName: "Quraish", ayahs: 4, type: "Meccan" },
  { number: 107, name: "المَاعُون", englishName: "Al-Maa'oon", ayahs: 7, type: "Meccan" },
  { number: 108, name: "الكَوْثَر", englishName: "Al-Kawthar", ayahs: 3, type: "Meccan" },
  { number: 109, name: "الكَافِرُون", englishName: "Al-Kaafiroon", ayahs: 6, type: "Meccan" },
  { number: 110, name: "النَّصْر", englishName: "An-Nasr", ayahs: 3, type: "Medinan" },
  { number: 111, name: "المَسَد", englishName: "Al-Masad", ayahs: 5, type: "Meccan" },
  { number: 112, name: "الإِخْلَاص", englishName: "Al-Ikhlaas", ayahs: 4, type: "Meccan" },
  { number: 113, name: "الفَلَق", englishName: "Al-Falaq", ayahs: 5, type: "Meccan" },
  { number: 114, name: "النَّاس", englishName: "An-Naas", ayahs: 6, type: "Meccan" }
];

if (typeof window !== 'undefined') {
  window.JUZ_DATA = JUZ_DATA;
  window.SURAH_LIST = SURAH_LIST;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JUZ_DATA, SURAH_LIST };
}
})();
