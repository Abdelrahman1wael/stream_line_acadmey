// Kids Quran Word Sorting Game with 30-Juz Sidebar & Drag-and-Drop Only Mechanics

// ==========================================================================
// 1. Quran Juz Data (All 30 Juz Metadata & Built-in Ayahs)
// ==========================================================================
const juzDataList = [
    {
        number: 1,
        name: "الجزء 1 (الم)",
        surahsSummary: "الفاتحة 1 - البقرة 141",
        surahs: [
            { number: 1, name: "سُورَةُ الْفَاتِحَةِ", startAyah: 1, endAyah: 7, totalAyahs: 7 },
            { number: 2, name: "سُورَةُ الْبَقَرَةِ", startAyah: 1, endAyah: 141, totalAyahs: 141 }
        ]
    },
    {
        number: 2,
        name: "الجزء 2 (سَيَقُولُ)",
        surahsSummary: "البقرة 142 - البقرة 252",
        surahs: [
            { number: 2, name: "سُورَةُ الْبَقَرَةِ", startAyah: 142, endAyah: 252, totalAyahs: 111 }
        ]
    },
    {
        number: 3,
        name: "الجزء 3 (تِلْكَ الرُّسُلُ)",
        surahsSummary: "البقرة 253 - آل عمران 92",
        surahs: [
            { number: 2, name: "سُورَةُ الْبَقَرَةِ", startAyah: 253, endAyah: 286, totalAyahs: 34 },
            { number: 3, name: "سُورَةُ آلِ عِمْرَانَ", startAyah: 1, endAyah: 92, totalAyahs: 92 }
        ]
    },
    {
        number: 4,
        name: "الجزء 4 (لَنْ تَنَالُوا)",
        surahsSummary: "آل عمران 93 - النساء 23",
        surahs: [
            { number: 3, name: "سُورَةُ آلِ عِمْرَانَ", startAyah: 93, endAyah: 200, totalAyahs: 108 },
            { number: 4, name: "سُورَةُ النِّسَاءِ", startAyah: 1, endAyah: 23, totalAyahs: 23 }
        ]
    },
    {
        number: 5,
        name: "الجزء 5 (وَالْمُحْصَنَاتُ)",
        surahsSummary: "النساء 24 - النساء 147",
        surahs: [
            { number: 4, name: "سُورَةُ النِّسَاءِ", startAyah: 24, endAyah: 147, totalAyahs: 124 }
        ]
    },
    {
        number: 6,
        name: "الجزء 6 (لَا يُحِبُّ اللَّهُ)",
        surahsSummary: "النساء 148 - المائدة 81",
        surahs: [
            { number: 4, name: "سُورَةُ النِّسَاءِ", startAyah: 148, endAyah: 176, totalAyahs: 29 },
            { number: 5, name: "سُورَةُ الْمَائِدَةِ", startAyah: 1, endAyah: 81, totalAyahs: 81 }
        ]
    },
    {
        number: 7,
        name: "الجزء 7 (وَإِذَا سَمِعُوا)",
        surahsSummary: "المائدة 82 - الأنعام 110",
        surahs: [
            { number: 5, name: "سُورَةُ الْمَائِدَةِ", startAyah: 82, endAyah: 120, totalAyahs: 39 },
            { number: 6, name: "سُورَةُ الأَنْعَامِ", startAyah: 1, endAyah: 110, totalAyahs: 110 }
        ]
    },
    {
        number: 8,
        name: "الجزء 8 (وَلَوْ أَنَّنَا)",
        surahsSummary: "الأنعام 111 - الأعراف 87",
        surahs: [
            { number: 6, name: "سُورَةُ الأَنْعَامِ", startAyah: 111, endAyah: 165, totalAyahs: 55 },
            { number: 7, name: "سُورَةُ الأَعْرَافِ", startAyah: 1, endAyah: 87, totalAyahs: 87 }
        ]
    },
    {
        number: 9,
        name: "الجزء 9 (قَالَ الْمَلَأُ)",
        surahsSummary: "الأعراف 88 - الأنفال 40",
        surahs: [
            { number: 7, name: "سُورَةُ الأَعْرَافِ", startAyah: 88, endAyah: 206, totalAyahs: 119 },
            { number: 8, name: "سُورَةُ الأَنْفَالِ", startAyah: 1, endAyah: 40, totalAyahs: 40 }
        ]
    },
    {
        number: 10,
        name: "الجزء 10 (وَاعْلَمُوا)",
        surahsSummary: "الأنفال 41 - التوبة 92",
        surahs: [
            { number: 8, name: "سُورَةُ الأَنْفَالِ", startAyah: 41, endAyah: 75, totalAyahs: 35 },
            { number: 9, name: "سُورَةُ التَّوْبَةِ", startAyah: 1, endAyah: 92, totalAyahs: 92 }
        ]
    },
    {
        number: 11,
        name: "الجزء 11 (يَعْتَذِرُونَ)",
        surahsSummary: "التوبة 93 - هود 5",
        surahs: [
            { number: 9, name: "سُورَةُ التَّوْبَةِ", startAyah: 93, endAyah: 129, totalAyahs: 37 },
            { number: 10, name: "سُورَةُ يُونُسَ", startAyah: 1, endAyah: 109, totalAyahs: 109 },
            { number: 11, name: "سُورَةُ هُودٍ", startAyah: 1, endAyah: 5, totalAyahs: 5 }
        ]
    },
    {
        number: 12,
        name: "الجزء 12 (وَمَا مِنْ دَابَّةٍ)",
        surahsSummary: "هود 6 - يوسف 52",
        surahs: [
            { number: 11, name: "سُورَةُ هُودٍ", startAyah: 6, endAyah: 123, totalAyahs: 118 },
            { number: 12, name: "سُورَةُ يُوسُفَ", startAyah: 1, endAyah: 52, totalAyahs: 52 }
        ]
    },
    {
        number: 13,
        name: "الجزء 13 (وَمَا أُبَرِّئُ)",
        surahsSummary: "يوسف 53 - إبراهيم 52",
        surahs: [
            { number: 12, name: "سُورَةُ يُوسُفَ", startAyah: 53, endAyah: 111, totalAyahs: 59 },
            { number: 13, name: "سُورَةُ الرَّعْدِ", startAyah: 1, endAyah: 43, totalAyahs: 43 },
            { number: 14, name: "سُورَةُ إِبْرَاهِيمَ", startAyah: 1, endAyah: 52, totalAyahs: 52 }
        ]
    },
    {
        number: 14,
        name: "الجزء 14 (رُبَمَا)",
        surahsSummary: "الحجر 1 - النحل 128",
        surahs: [
            { number: 15, name: "سُورَةُ الْحِجْرِ", startAyah: 1, endAyah: 99, totalAyahs: 99 },
            { number: 16, name: "سُورَةُ النَّحْلِ", startAyah: 1, endAyah: 128, totalAyahs: 128 }
        ]
    },
    {
        number: 15,
        name: "الجزء 15 (سُبْحَانَ الَّذِي)",
        surahsSummary: "الإسراء 1 - الكهف 74",
        surahs: [
            { number: 17, name: "سُورَةُ الإِسْرَاءِ", startAyah: 1, endAyah: 111, totalAyahs: 111 },
            { number: 18, name: "سُورَةُ الْكَهْفِ", startAyah: 1, endAyah: 74, totalAyahs: 74 }
        ]
    },
    {
        number: 16,
        name: "الجزء 16 (قَالَ أَلَمْ)",
        surahsSummary: "الكهف 75 - طه 135",
        surahs: [
            { number: 18, name: "سُورَةُ الْكَهْفِ", startAyah: 75, endAyah: 110, totalAyahs: 36 },
            { number: 19, name: "سُورَةُ مَرْيَمَ", startAyah: 1, endAyah: 98, totalAyahs: 98 },
            { number: 20, name: "سُورَةُ طٰهَ", startAyah: 1, endAyah: 135, totalAyahs: 135 }
        ]
    },
    {
        number: 17,
        name: "الجزء 17 (اقْتَرَبَ لِلنَّاسِ)",
        surahsSummary: "الأنبياء 1 - الحج 78",
        surahs: [
            { number: 21, name: "سُورَةُ الأَنْبِيَاءِ", startAyah: 1, endAyah: 112, totalAyahs: 112 },
            { number: 22, name: "سُورَةُ الْحَجِّ", startAyah: 1, endAyah: 78, totalAyahs: 78 }
        ]
    },
    {
        number: 18,
        name: "الجزء 18 (قَدْ أَفْلَحَ)",
        surahsSummary: "المؤمنون 1 - الفرقان 20",
        surahs: [
            { number: 23, name: "سُورَةُ الْمُؤْمِنُونَ", startAyah: 1, endAyah: 118, totalAyahs: 118 },
            { number: 24, name: "سُورَةُ النُّورِ", startAyah: 1, endAyah: 64, totalAyahs: 64 },
            { number: 25, name: "سُورَةُ الْفُرْقَانِ", startAyah: 1, endAyah: 20, totalAyahs: 20 }
        ]
    },
    {
        number: 19,
        name: "الجزء 19 (وَقَالَ الَّذِينَ)",
        surahsSummary: "الفرقان 21 - النمل 55",
        surahs: [
            { number: 25, name: "سُورَةُ الْفُرْقَانِ", startAyah: 21, endAyah: 77, totalAyahs: 57 },
            { number: 26, name: "سُورَةُ الشُّعَرَاءِ", startAyah: 1, endAyah: 227, totalAyahs: 227 },
            { number: 27, name: "سُورَةُ النَّمْلِ", startAyah: 1, endAyah: 55, totalAyahs: 55 }
        ]
    },
    {
        number: 20,
        name: "الجزء 20 (أَمَّنْ خَلَقَ)",
        surahsSummary: "النمل 56 - العنكبوت 45",
        surahs: [
            { number: 27, name: "سُورَةُ النَّمْلِ", startAyah: 56, endAyah: 93, totalAyahs: 38 },
            { number: 28, name: "سُورَةُ الْقَصَصِ", startAyah: 1, endAyah: 88, totalAyahs: 88 },
            { number: 29, name: "سُورَةُ الْعَنْكَبُوتِ", startAyah: 1, endAyah: 45, totalAyahs: 45 }
        ]
    },
    {
        number: 21,
        name: "الجزء 21 (اتْلُ مَا أُوحِيَ)",
        surahsSummary: "العنكبوت 46 - الأحزاب 30",
        surahs: [
            { number: 29, name: "سُورَةُ الْعَنْكَبُوتِ", startAyah: 46, endAyah: 69, totalAyahs: 24 },
            { number: 30, name: "سُورَةُ الرُّومِ", startAyah: 1, endAyah: 60, totalAyahs: 60 },
            { number: 31, name: "سُورَةُ لُقْمَانَ", startAyah: 1, endAyah: 34, totalAyahs: 34 },
            { number: 32, name: "سُورَةُ السَّجْدَةِ", startAyah: 1, endAyah: 30, totalAyahs: 30 },
            { number: 33, name: "سُورَةُ الأَحْزَابِ", startAyah: 1, endAyah: 30, totalAyahs: 30 }
        ]
    },
    {
        number: 22,
        name: "الجزء 22 (وَمَنْ يَقْنُتْ)",
        surahsSummary: "الأحزاب 31 - يس 27",
        surahs: [
            { number: 33, name: "سُورَةُ الأَحْزَابِ", startAyah: 31, endAyah: 73, totalAyahs: 43 },
            { number: 34, name: "سُورَةُ سَبَإٍ", startAyah: 1, endAyah: 54, totalAyahs: 54 },
            { number: 35, name: "سُورَةُ فَاطِرٍ", startAyah: 1, endAyah: 45, totalAyahs: 45 },
            { number: 36, name: "سُورَةُ يٰسٓ", startAyah: 1, endAyah: 27, totalAyahs: 27 }
        ]
    },
    {
        number: 23,
        name: "الجزء 23 (وَمَا أَنْزَلْنَا)",
        surahsSummary: "يس 28 - الزمر 31",
        surahs: [
            { number: 36, name: "سُورَةُ يٰسٓ", startAyah: 28, endAyah: 83, totalAyahs: 56 },
            { number: 37, name: "سُورَةُ الصَّافَّاتِ", startAyah: 1, endAyah: 182, totalAyahs: 182 },
            { number: 38, name: "سُورَةُ صٓ", startAyah: 1, endAyah: 88, totalAyahs: 88 },
            { number: 39, name: "سُورَةُ الزُّمَرِ", startAyah: 1, endAyah: 31, totalAyahs: 31 }
        ]
    },
    {
        number: 24,
        name: "الجزء 24 (فَمَنْ أَظْلَمُ)",
        surahsSummary: "الزمر 32 - فصلت 46",
        surahs: [
            { number: 39, name: "سُورَةُ الزُّمَرِ", startAyah: 32, endAyah: 75, totalAyahs: 44 },
            { number: 40, name: "سُورَةُ غَافِرٍ", startAyah: 1, endAyah: 85, totalAyahs: 85 },
            { number: 41, name: "سُورَةُ فُصِّلَتْ", startAyah: 1, endAyah: 46, totalAyahs: 46 }
        ]
    },
    {
        number: 25,
        name: "الجزء 25 (إِلَيْهِ يُرَدُّ)",
        surahsSummary: "فصلت 47 - الجاثية 37",
        surahs: [
            { number: 41, name: "سُورَةُ فُصِّلَتْ", startAyah: 47, endAyah: 54, totalAyahs: 8 },
            { number: 42, name: "سُورَةُ الشُّورَى", startAyah: 1, endAyah: 53, totalAyahs: 53 },
            { number: 43, name: "سُورَةُ الزُّخْرُفِ", startAyah: 1, endAyah: 89, totalAyahs: 89 },
            { number: 44, name: "سُورَةُ الدُّخَانِ", startAyah: 1, endAyah: 59, totalAyahs: 59 },
            { number: 45, name: "سُورَةُ الْجَاثِيَةِ", startAyah: 1, endAyah: 37, totalAyahs: 37 }
        ]
    },
    {
        number: 26,
        name: "الجزء 26 (حم)",
        surahsSummary: "الأحقاف 1 - الذاريات 30",
        surahs: [
            { number: 46, name: "سُورَةُ الأَحْقَافِ", startAyah: 1, endAyah: 35, totalAyahs: 35 },
            { number: 47, name: "سُورَةُ مُحَمَّدٍ", startAyah: 1, endAyah: 38, totalAyahs: 38 },
            { number: 48, name: "سُورَةُ الْفَتْحِ", startAyah: 1, endAyah: 29, totalAyahs: 29 },
            { number: 49, name: "سُورَةُ الْحُجُرَاتِ", startAyah: 1, endAyah: 18, totalAyahs: 18 },
            { number: 50, name: "سُورَةُ قٓ", startAyah: 1, endAyah: 45, totalAyahs: 45 },
            { number: 51, name: "سُورَةُ الذَّارِيَاتِ", startAyah: 1, endAyah: 30, totalAyahs: 30 }
        ]
    },
    {
        number: 27,
        name: "الجزء 27 (قَالَ فَمَا خَطْبُكُمْ)",
        surahsSummary: "الذاريات 31 - الحديد 29",
        surahs: [
            { number: 51, name: "سُورَةُ الذَّارِيَاتِ", startAyah: 31, endAyah: 60, totalAyahs: 30 },
            { number: 52, name: "سُورَةُ الطُّورِ", startAyah: 1, endAyah: 49, totalAyahs: 49 },
            { number: 53, name: "سُورَةُ النَّجْمِ", startAyah: 1, endAyah: 62, totalAyahs: 62 },
            { number: 54, name: "سُورَةُ الْقَمَرِ", startAyah: 1, endAyah: 55, totalAyahs: 55 },
            { number: 55, name: "سُورَةُ الرَّحْمَٰنِ", startAyah: 1, endAyah: 78, totalAyahs: 78 },
            { number: 56, name: "سُورَةُ الْوَاقِعَةِ", startAyah: 1, endAyah: 96, totalAyahs: 96 },
            { number: 57, name: "سُورَةُ الْحَدِيدِ", startAyah: 1, endAyah: 29, totalAyahs: 29 }
        ]
    },
    {
        number: 28,
        name: "الجزء 28 (قَدْ سَمِعَ اللَّهُ)",
        surahsSummary: "المجادلة 1 - التحريم 12",
        surahs: [
            { number: 58, name: "سُورَةُ الْمُجَادَلَةِ", startAyah: 1, endAyah: 22, totalAyahs: 22 },
            { number: 59, name: "سُورَةُ الْحَشْرِ", startAyah: 1, endAyah: 24, totalAyahs: 24 },
            { number: 60, name: "سُورَةُ الْمُمْتَحَنَةِ", startAyah: 1, endAyah: 13, totalAyahs: 13 },
            { number: 61, name: "سُورَةُ الصَّفِّ", startAyah: 1, endAyah: 14, totalAyahs: 14 },
            { number: 62, name: "سُورَةُ الْجُمُعَةِ", startAyah: 1, endAyah: 11, totalAyahs: 11 },
            { number: 63, name: "سُورَةُ الْمُنَافِقُونَ", startAyah: 1, endAyah: 11, totalAyahs: 11 },
            { number: 64, name: "سُورَةُ التَّغَابُنِ", startAyah: 1, endAyah: 18, totalAyahs: 18 },
            { number: 65, name: "سُورَةُ الطَّلَاقِ", startAyah: 1, endAyah: 12, totalAyahs: 12 },
            { number: 66, name: "سُورَةُ التَّحْرِيمِ", startAyah: 1, endAyah: 12, totalAyahs: 12 }
        ]
    },
    {
        number: 29,
        name: "الجزء 29 (تَبَارَكَ الَّذِي)",
        surahsSummary: "الملك 1 - المرسلات 50",
        surahs: [
            { number: 67, name: "سُورَةُ الْمُلْكِ", startAyah: 1, endAyah: 30, totalAyahs: 30 },
            { number: 68, name: "سُورَةُ الْقَلَمِ", startAyah: 1, endAyah: 52, totalAyahs: 52 },
            { number: 69, name: "سُورَةُ الْحَاقَّةِ", startAyah: 1, endAyah: 52, totalAyahs: 52 },
            { number: 70, name: "سُورَةُ الْمَعَارِجِ", startAyah: 1, endAyah: 44, totalAyahs: 44 },
            { number: 71, name: "سُورَةُ نُوحٍ", startAyah: 1, endAyah: 28, totalAyahs: 28 },
            { number: 72, name: "سُورَةُ الْجِنِّ", startAyah: 1, endAyah: 28, totalAyahs: 28 },
            { number: 73, name: "سُورَةُ الْمُزَّمِّلِ", startAyah: 1, endAyah: 20, totalAyahs: 20 },
            { number: 74, name: "سُورَةُ الْمُدَّثِّرِ", startAyah: 1, endAyah: 56, totalAyahs: 56 },
            { number: 75, name: "سُورَةُ الْقِيَامَةِ", startAyah: 1, endAyah: 40, totalAyahs: 40 },
            { number: 76, name: "سُورَةُ الإِنْسَانِ", startAyah: 1, endAyah: 31, totalAyahs: 31 },
            { number: 77, name: "سُورَةُ الْمُرْسَلَاتِ", startAyah: 1, endAyah: 50, totalAyahs: 50 }
        ]
    },
    {
        number: 30,
        name: "الجزء 30 (عَمَّ يَتَسَاءَلُونَ)",
        surahsSummary: "النبأ 1 - الناس 6",
        surahs: [
            { number: 78, name: "سُورَةُ النَّبَإِ", startAyah: 1, endAyah: 40, totalAyahs: 40 },
            { number: 79, name: "سُورَةُ النَّازِعَاتِ", startAyah: 1, endAyah: 46, totalAyahs: 46 },
            { number: 80, name: "سُورَةُ عَبَسَ", startAyah: 1, endAyah: 42, totalAyahs: 42 },
            { number: 81, name: "سُورَةُ التَّكْوِيرِ", startAyah: 1, endAyah: 29, totalAyahs: 29 },
            { number: 82, name: "سُورَةُ الانْفِطَارِ", startAyah: 1, endAyah: 19, totalAyahs: 19 },
            { number: 83, name: "سُورَةُ الْمُطَفِّفِينَ", startAyah: 1, endAyah: 36, totalAyahs: 36 },
            { number: 84, name: "سُورَةُ الانْشِقَاقِ", startAyah: 1, endAyah: 25, totalAyahs: 25 },
            { number: 85, name: "سُورَةُ الْبُرُوجِ", startAyah: 1, endAyah: 22, totalAyahs: 22 },
            { number: 86, name: "سُورَةُ الطَّارِقِ", startAyah: 1, endAyah: 17, totalAyahs: 17 },
            { number: 87, name: "سُورَةُ الأَعْلَى", startAyah: 1, endAyah: 19, totalAyahs: 19 },
            { number: 88, name: "سُورَةُ الْغَاشِيَةِ", startAyah: 1, endAyah: 26, totalAyahs: 26 },
            { number: 89, name: "سُورَةُ الْفَجْرِ", startAyah: 1, endAyah: 30, totalAyahs: 30 },
            { number: 90, name: "سُورَةُ الْبَلَدِ", startAyah: 1, endAyah: 20, totalAyahs: 20 },
            { number: 91, name: "سُورَةُ الشَّمْسِ", startAyah: 1, endAyah: 15, totalAyahs: 15 },
            { number: 92, name: "سُورَةُ اللَّيْلِ", startAyah: 1, endAyah: 21, totalAyahs: 21 },
            { number: 93, name: "سُورَةُ الضُّحَى", startAyah: 1, endAyah: 11, totalAyahs: 11 },
            { number: 94, name: "سُورَةُ الشَّرْحِ", startAyah: 1, endAyah: 8, totalAyahs: 8 },
            { number: 95, name: "سُورَةُ التِّينِ", startAyah: 1, endAyah: 8, totalAyahs: 8 },
            { number: 96, name: "سُورَةُ الْعَلَقِ", startAyah: 1, endAyah: 19, totalAyahs: 19 },
            { number: 97, name: "سُورَةُ الْقَدْرِ", startAyah: 1, endAyah: 5, totalAyahs: 5 },
            { number: 98, name: "سُورَةُ الْبَيِّنَةِ", startAyah: 1, endAyah: 8, totalAyahs: 8 },
            { number: 99, name: "سُورَةُ الزَّلْزَلَةِ", startAyah: 1, endAyah: 8, totalAyahs: 8 },
            { number: 100, name: "سُورَةُ الْعَادِيَاتِ", startAyah: 1, endAyah: 11, totalAyahs: 11 },
            { number: 101, name: "سُورَةُ الْقَارِعَةِ", startAyah: 1, endAyah: 11, totalAyahs: 11 },
            { number: 102, name: "سُورَةُ التَّكَاثُرِ", startAyah: 1, endAyah: 8, totalAyahs: 8 },
            { number: 103, name: "سُورَةُ الْعَصْرِ", startAyah: 1, endAyah: 3, totalAyahs: 3 },
            { number: 104, name: "سُورَةُ الْهُمَزَةِ", startAyah: 1, endAyah: 9, totalAyahs: 9 },
            { number: 105, name: "سُورَةُ الْفِيلِ", startAyah: 1, endAyah: 5, totalAyahs: 5 },
            { number: 106, name: "سُورَةُ قُرَيْشٍ", startAyah: 1, endAyah: 4, totalAyahs: 4 },
            { number: 107, name: "سُورَةُ الْمَاعُونِ", startAyah: 1, endAyah: 7, totalAyahs: 7 },
            { number: 108, name: "سُورَةُ الْكَوْثَرِ", startAyah: 1, endAyah: 3, totalAyahs: 3 },
            { number: 109, name: "سُورَةُ الْكَافِرُونَ", startAyah: 1, endAyah: 6, totalAyahs: 6 },
            { number: 110, name: "سُورَةُ النَّصْرِ", startAyah: 1, endAyah: 3, totalAyahs: 3 },
            { number: 111, name: "سُورَةُ الْمَسَدِ", startAyah: 1, endAyah: 5, totalAyahs: 5 },
            { number: 112, name: "سُورَةُ الإِخْلَاصِ", startAyah: 1, endAyah: 4, totalAyahs: 4 },
            { number: 113, name: "سُورَةُ الْفَلَقِ", startAyah: 1, endAyah: 5, totalAyahs: 5 },
            { number: 114, name: "سُورَةُ النَّاسِ", startAyah: 1, endAyah: 6, totalAyahs: 6 }
        ]
    }
];

// Offline Curated Ayahs (Instant load without network wait)
const offlineAyahCache = {
    // Surah Al-Fatihah (1:1 to 1:7)
    "1:1": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    "1:2": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    "1:3": "الرَّحْمَٰنِ الرَّحِيمِ",
    "1:4": "مَالِكِ يَوْمِ الدِّينِ",
    "1:5": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    "1:6": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    "1:7": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",

    // Ayat Al-Kursi (2:255)
    "2:255": "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",

    // Juz 30 - Short Surahs
    "103:1": "وَالْعَصْرِ",
    "103:2": "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
    "103:3": "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",

    "108:1": "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
    "108:2": "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
    "108:3": "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",

    "110:1": "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ",
    "110:2": "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا",
    "110:3": "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا",

    "112:1": "قُلْ هُوَ اللَّهُ أَحَدٌ",
    "112:2": "اللَّهُ الصَّمَدُ",
    "112:3": "لَمْ يَلِدْ وَلَمْ يُولَدْ",
    "112:4": "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",

    "113:1": "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
    "113:2": "مِن شَرِّ مَا خَلَقَ",
    "113:3": "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
    "113:4": "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
    "113:5": "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",

    "114:1": "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
    "114:2": "مَلِكِ النَّاسِ",
    "114:3": "إِلَٰهِ النَّاسِ",
    "114:4": "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
    "114:5": "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
    "114:6": "مِنَ الْجِنَّةِ وَالنَّاسِ"
};

// ==========================================================================
// 2. Application State
// ==========================================================================
let currentJuzNumber = 1;
let currentSurahNumber = 1;
let currentAyahNumber = 1;
let currentAyahData = null;
let score = 0;

let poolCards = [];    // Array of word card objects in pool
let answerCards = [];  // Array of word card objects placed in answer zone

// Active Drag State
let activeDrag = {
    cardId: null,
    sourceZone: null,   // 'pool' or 'answer'
    originalIndex: null
};

// Kids Mode State
let kidsSpeechSpeed = 0.65; // Gentle pace for kids
let isSlowSpeed = true;
let solvedAyahCount = 0;
let hintTimeoutId = null;

// ==========================================================================
// Web Audio Synthesizer for Kids Fun & Positive Reinforcement (Offline)
// ==========================================================================
let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// 1. Pop sound on picking up a card
function playAudioPop() {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
}

// 2. Snap sound on dropping card into answer slot
function playAudioSnap() {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
}

// 3. Victory fanfare chord on correct arrangement
function playAudioVictory() {
    try {
        const ctx = getAudioContext();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
            gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
            gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + idx * 0.12 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.45);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + idx * 0.12);
            osc.stop(ctx.currentTime + idx * 0.12 + 0.45);
        });
    } catch (e) {}
}

// 4. Soft try-again encouragement sound
function playAudioTryAgain() {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
}

// ==========================================================================
// 3. DOM Elements
// ==========================================================================
const sidebarElem = document.getElementById("sidebar-juz");
const sidebarOverlayElem = document.getElementById("sidebar-overlay");
const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
const btnCloseSidebar = document.getElementById("btn-close-sidebar");
const juzSearchInput = document.getElementById("juz-search-input");
const juzListContainer = document.getElementById("juz-list");
const currentJuzBadge = document.getElementById("current-juz-badge");

const surahSelect = document.getElementById("surah-select");
const ayahSelect = document.getElementById("ayah-select");
const surahNameElem = document.getElementById("surah-name");
const ayahNumElem = document.getElementById("ayah-num");
const scoreDisplayElem = document.getElementById("score-display");
const loadingIndicator = document.getElementById("loading-indicator");

// Kids Learning Mode DOM Elements
const btnHint = document.getElementById("btn-hint");
const btnSpeedToggle = document.getElementById("btn-speed-toggle");
const speedIcon = document.getElementById("speed-icon");
const speedLabel = document.getElementById("speed-label");
const btnGuideText = document.getElementById("btn-guide-text");
const guideBox = document.getElementById("guide-box");
const guideTextElem = document.getElementById("guide-text");
const celebrationOverlay = document.getElementById("celebration-overlay");
const btnCelebrateNext = document.getElementById("btn-celebrate-next");
const solvedCountElem = document.getElementById("solved-count");

const answerZone = document.getElementById("answer-zone");
const poolZone = document.getElementById("pool-zone");
const feedbackElem = document.getElementById("feedback-message");

const btnListen = document.getElementById("btn-listen");
const btnReset = document.getElementById("btn-reset");
const btnCheck = document.getElementById("btn-check");
const btnNext = document.getElementById("btn-next");

// Theme State & Switcher
let currentTheme = 'boys';
const themeBtnBoys = document.getElementById("theme-btn-boys");
const themeBtnGirls = document.getElementById("theme-btn-girls");
const mascotIconElem = document.getElementById("mascot-icon");
const mascotTitleElem = document.getElementById("mascot-title");
const mascotSubtitleElem = document.getElementById("mascot-subtitle");
const celebrationBalloonsElem = document.getElementById("celebration-balloons");
const celebrationTitleElem = document.getElementById("celebration-title");
const celebrationSubtitleElem = document.getElementById("celebration-subtitle");

function setTheme(theme) {
    currentTheme = theme;
    if (theme === 'girls') {
        document.body.classList.remove('theme-boys');
        document.body.classList.add('theme-girls');
        if (themeBtnGirls) themeBtnGirls.classList.add('active');
        if (themeBtnBoys) themeBtnBoys.classList.remove('active');

        if (mascotIconElem) mascotIconElem.textContent = "🦸‍♀️";
        if (mascotTitleElem) mascotTitleElem.textContent = "وَضْعُ زَهْرَاتِ الْقُرْآنِ";
        if (mascotSubtitleElem) mascotSubtitleElem.textContent = "رَتِّبِي وَتَعَلَّمِي كَلَامَ اللهِ يَا زَهْرَةُ! 🌸";

        if (celebrationBalloonsElem) celebrationBalloonsElem.textContent = "🌸 💖 🌟 🎈";
        if (celebrationTitleElem) celebrationTitleElem.textContent = "مُمْتَازٌ جِدًّا يَا زَهْرَةَ الْقُرْآنِ! 🌸";
        if (celebrationSubtitleElem) celebrationSubtitleElem.textContent = "لَقَدْ رَتَّبْتِ الآيَةَ الْكَرِيمَةَ بِالشَّكْلِ الصَّحِيحِ!";
    } else {
        document.body.classList.remove('theme-girls');
        document.body.classList.add('theme-boys');
        if (themeBtnBoys) themeBtnBoys.classList.add('active');
        if (themeBtnGirls) themeBtnGirls.classList.remove('active');

        if (mascotIconElem) mascotIconElem.textContent = "🦸‍♂️";
        if (mascotTitleElem) mascotTitleElem.textContent = "وَضْعُ الأَبْطَالِ الصِّغَارِ";
        if (mascotSubtitleElem) mascotSubtitleElem.textContent = "رَتِّبْ وَتَعَلَّمْ كَلَامَ اللهِ يَا بَطَلُ! 🎈";

        if (celebrationBalloonsElem) celebrationBalloonsElem.textContent = "🎈 🎉 🌟 🎈";
        if (celebrationTitleElem) celebrationTitleElem.textContent = "مُمْتَازٌ جِدًّا يَا بَطَلَ الْقُرْآنِ! 🌟";
        if (celebrationSubtitleElem) celebrationSubtitleElem.textContent = "لَقَدْ رَتَّبْتَ الآيَةَ الْكَرِيمَةَ بِالشَّكْلِ الصَّحِيحِ!";
    }
    localStorage.setItem('quran_theme', theme);
}

// ==========================================================================
// 4. Initialization
// ==========================================================================
function initApp() {
    renderJuzSidebar();
    setupEventListeners();
    setupDropZones();

    // Load saved or default theme
    const savedTheme = localStorage.getItem('quran_theme') || 'boys';
    setTheme(savedTheme);

    // Default start with Juz 1, Surah 1, Ayah 1
    selectJuz(1, false);
}

// Render the 30 Juz cards inside the sidebar
function renderJuzSidebar(filteredList = juzDataList) {
    juzListContainer.innerHTML = "";

    if (filteredList.length === 0) {
        juzListContainer.innerHTML = `<div style="text-align:center; padding:20px; color:#9E9E9E;">لَا تُوجَدُ نَتَائِجُ مُطَابِقَةٌ</div>`;
        return;
    }

    filteredList.forEach(juz => {
        const item = document.createElement("div");
        item.className = `juz-item ${juz.number === currentJuzNumber ? 'active' : ''}`;
        item.id = `juz-item-${juz.number}`;

        item.innerHTML = `
            <div class="juz-number-badge">${juz.number}</div>
            <div class="juz-info">
                <div class="juz-name">${juz.name}</div>
                <div class="juz-surahs-preview">${juz.surahsSummary}</div>
            </div>
        `;

        item.addEventListener("click", () => {
            selectJuz(juz.number, true);
            // On mobile screen, close sidebar after selection
            if (window.innerWidth <= 992) {
                closeSidebar();
            }
        });

        juzListContainer.appendChild(item);
    });
}

// Select a specific Juz
function selectJuz(juzNum, shouldLoadFirstAyah = true) {
    currentJuzNumber = juzNum;
    const selectedJuz = juzDataList.find(j => j.number === juzNum);
    if (!selectedJuz) return;

    // Update active highlight in sidebar
    document.querySelectorAll(".juz-item").forEach(el => el.classList.remove("active"));
    const activeItem = document.getElementById(`juz-item-${juzNum}`);
    if (activeItem) activeItem.classList.add("active");

    currentJuzBadge.textContent = selectedJuz.name;

    // Populate Surahs for this Juz in dropdown
    populateSurahSelector(selectedJuz);

    if (shouldLoadFirstAyah) {
        const firstSurah = selectedJuz.surahs[0];
        loadAyahBySurahAndNumber(firstSurah.number, firstSurah.startAyah);
    } else {
        // Initial load
        loadAyahBySurahAndNumber(1, 1);
    }
}

// Populate the Surahs dropdown according to selected Juz
function populateSurahSelector(juz) {
    surahSelect.innerHTML = "";
    juz.surahs.forEach(surah => {
        const opt = document.createElement("option");
        opt.value = surah.number;
        opt.textContent = surah.name;
        surahSelect.appendChild(opt);
    });

    // When surah changes, update Ayah numbers
    surahSelect.onchange = () => {
        const surahNum = parseInt(surahSelect.value);
        currentSurahNumber = surahNum;
        populateAyahSelector(juz, surahNum);
        loadAyahBySurahAndNumber(currentSurahNumber, parseInt(ayahSelect.value));
    };

    // Populate first surah's ayahs
    const initialSurah = juz.surahs[0];
    currentSurahNumber = initialSurah.number;
    populateAyahSelector(juz, initialSurah.number);
}

// Populate Ayah numbers for chosen surah within this Juz
function populateAyahSelector(juz, surahNum) {
    ayahSelect.innerHTML = "";
    const surahMeta = juz.surahs.find(s => s.number === surahNum);
    if (!surahMeta) return;

    const start = surahMeta.startAyah;
    const end = surahMeta.endAyah;

    for (let a = start; a <= end; a++) {
        const opt = document.createElement("option");
        opt.value = a;
        opt.textContent = `الآيَةُ ${a}`;
        ayahSelect.appendChild(opt);
    }

    ayahSelect.onchange = () => {
        currentAyahNumber = parseInt(ayahSelect.value);
        loadAyahBySurahAndNumber(currentSurahNumber, currentAyahNumber);
    };
}

// ==========================================================================
// 5. Ayah Loading (Quran.com API + Audio Integration + Local Cache)
// ==========================================================================
async function loadAyahBySurahAndNumber(surahNum, ayahNum) {
    currentSurahNumber = surahNum;
    currentAyahNumber = ayahNum;

    surahSelect.value = surahNum;
    ayahSelect.value = ayahNum;

    const juzObj = juzDataList.find(j => j.number === currentJuzNumber);
    const surahObj = juzObj ? juzObj.surahs.find(s => s.number === surahNum) : null;
    const surahName = surahObj ? surahObj.name : `سورة رقم ${surahNum}`;

    surahNameElem.textContent = surahName;
    ayahNumElem.textContent = `الآيَةُ ${ayahNum}`;
    scoreDisplayElem.textContent = `⭐ النِّقَاط: ${score}`;

    const surahStr = String(surahNum).padStart(3, '0');
    const ayahStr = String(ayahNum).padStart(3, '0');
    // Authentic Mishari Rashid Alafasy Ayah Audio directly from Quran.com
    const ayahAudioUrl = `https://verses.quran.com/Alafasy/mp3/${surahStr}${ayahStr}.mp3`;

    // 1. Try fetching from official Quran.com API v4
    showLoading(true);
    try {
        const res = await fetch(`https://api.quran.com/api/v4/verses/by_key/${surahNum}:${ayahNum}?words=true&word_fields=text_uthmani,audio_url`);
        if (res.ok) {
            const json = await res.json();
            if (json && json.verse && json.verse.words) {
                const rawWords = json.verse.words.filter(w => w.char_type_name === 'word');
                const wordsList = rawWords.map((w, idx) => {
                    const wordNum = String(idx + 1).padStart(3, '0');
                    const defaultWbwUrl = `https://audio.qurancdn.com/wbw/${surahStr}_${ayahStr}_${wordNum}.mp3`;
                    let finalAudioUrl = defaultWbwUrl;
                    if (w.audio_url) {
                        finalAudioUrl = w.audio_url.startsWith('http') ? w.audio_url : `https://audio.qurancdn.com/${w.audio_url}`;
                    }
                    return {
                        text: w.text_uthmani || w.text,
                        audioUrl: finalAudioUrl
                    };
                });

                const fullText = wordsList.map(w => w.text).join(" ");
                processAyahWithQuranVoice(surahName, ayahNum, fullText, wordsList, ayahAudioUrl);
                return;
            }
        }
    } catch (err) {
        console.warn("Quran.com API error, falling back to cached text with Quran.com audio:", err);
    } finally {
        showLoading(false);
    }

    // 2. Fallback: Local Cache or simple split with Quran.com CDN audio
    const cacheKey = `${surahNum}:${ayahNum}`;
    let fallbackText = offlineAyahCache[cacheKey] || offlineAyahCache["1:1"];

    const rawWords = fallbackText.split(/\s+/).filter(w => w.trim().length > 0);
    const wordsList = rawWords.map((w, idx) => {
        const wordNum = String(idx + 1).padStart(3, '0');
        return {
            text: w,
            audioUrl: `https://audio.qurancdn.com/wbw/${surahStr}_${ayahStr}_${wordNum}.mp3`
        };
    });

    processAyahWithQuranVoice(surahName, ayahNum, fallbackText, wordsList, ayahAudioUrl);
}

function processAyahWithQuranVoice(surahName, ayahNum, ayahText, wordObjects, ayahAudioUrl) {
    currentAyahData = {
        surah: surahName,
        ayahNumber: ayahNum,
        text: ayahText,
        words: wordObjects.map(w => w.text),
        wordObjects: wordObjects,
        audioUrl: ayahAudioUrl
    };

    // Reset zones
    answerCards = [];
    poolCards = wordObjects.map((item, idx) => ({
        id: `word-${idx}-${Date.now()}`,
        text: item.text,
        audioUrl: item.audioUrl,
        originalIndex: idx
    }));

    // Scramble pool cards
    scrambleArray(poolCards);

    // Reset UI banners
    feedbackElem.style.display = "none";
    feedbackElem.className = "feedback-message";
    btnNext.style.display = "none";
    btnCheck.style.display = "block";

    renderZones();
}

function showLoading(show) {
    loadingIndicator.style.display = show ? "flex" : "none";
}

// Scramble array helper
function scrambleArray(arr) {
    let attempts = 0;
    do {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        attempts++;
    } while (arr.length > 1 && isAlreadyInOrder(arr) && attempts < 10);
}

function isAlreadyInOrder(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].originalIndex !== i) return false;
    }
    return true;
}

// ==========================================================================
// 6. Card Rendering & Drag & Drop Only Engine
// ==========================================================================

// ==========================================================================
// 6. Card Rendering & Universal Drag & Drop Only Engine
// ==========================================================================

// Global pointer drag state
let pointerDragState = {
    isDown: false,
    isDragging: false,
    cardElement: null,
    cardId: null,
    sourceZone: null,
    originalIndex: null,
    startX: 0,
    startY: 0,
    ghostElement: null,
    pointerId: null
};

function renderZones() {
    renderCardList(poolZone, poolCards, 'pool');
    renderCardList(answerZone, answerCards, 'answer');
}

function renderCardList(containerElem, cardsArray, zoneName) {
    containerElem.innerHTML = "";

    // 1. Render all current cards in this zone
    cardsArray.forEach((card, index) => {
        const cardElem = document.createElement("div");
        cardElem.className = `word-card ${zoneName === 'answer' ? 'placed' : ''}`;
        cardElem.id = card.id;
        cardElem.dataset.id = card.id;
        cardElem.dataset.zone = zoneName;
        cardElem.dataset.index = index;

        // Card Content: Drag Handle + Quranic Word + Audio Speaker button
        cardElem.innerHTML = `
            <span class="card-drag-handle" title="اسحب البطاقة">⠿</span>
            <span class="word-card-text">${card.text}</span>
            <span class="word-card-speaker" title="انقر لسماع الكلمة">🔊</span>
        `;

        // Attach Universal Pointer Events (Supports Mouse, Touch, Stylus)
        cardElem.addEventListener("pointerdown", handleCardPointerDown);
        cardElem.addEventListener("pointermove", handleCardPointerMove);
        cardElem.addEventListener("pointerup", handleCardPointerUp);
        cardElem.addEventListener("pointercancel", handleCardPointerCancel);

        containerElem.appendChild(cardElem);
    });

    // 2. Kids Mode: In Answer Zone, render empty numbered ghost slots for remaining words
    if (zoneName === 'answer' && currentAyahData && currentAyahData.words) {
        const totalWords = currentAyahData.words.length;
        const placedCount = cardsArray.length;

        for (let s = placedCount; s < totalWords; s++) {
            const slotElem = document.createElement("div");
            slotElem.className = "card-slot-placeholder";
            slotElem.dataset.slot = (s + 1);
            containerElem.appendChild(slotElem);
        }
    }

    // 3. If Pool Zone is completely empty, show congratulations hint
    if (zoneName === 'pool' && cardsArray.length === 0) {
        const hint = document.createElement("div");
        hint.className = "zone-empty-hint";
        hint.textContent = "✨ رَائِعٌ جِدًّا! كُلُّ الْبِطَاقَاتِ وُضِعَتْ، تَحَقَّقْ مِنَ الإِجَابَةِ أَدْنَاهُ!";
        containerElem.appendChild(hint);
    }
}

// --------------------------------------------------------------------------
// Universal Pointer Drag Handlers (Mouse, Trackpad, iPad/Tablets, Mobile)
// --------------------------------------------------------------------------
function handleCardPointerDown(e) {
    // Only primary button (left click or touch)
    if (e.button !== 0) return;

    // Kids audio pop on picking card
    playAudioPop();

    pointerDragState.isDown = true;
    pointerDragState.isDragging = false;
    pointerDragState.cardElement = this;
    pointerDragState.cardId = this.dataset.id;
    pointerDragState.sourceZone = this.dataset.zone;
    pointerDragState.originalIndex = parseInt(this.dataset.index);
    pointerDragState.startX = e.clientX;
    pointerDragState.startY = e.clientY;
    pointerDragState.pointerId = e.pointerId;

    try {
        this.setPointerCapture(e.pointerId);
    } catch (err) {
        // Fallback if capture not supported
    }
}

function handleCardPointerMove(e) {
    if (!pointerDragState.isDown) return;

    const deltaX = e.clientX - pointerDragState.startX;
    const deltaY = e.clientY - pointerDragState.startY;
    const distance = Math.hypot(deltaX, deltaY);

    // If moved past threshold (5px), activate dragging mode
    if (!pointerDragState.isDragging && distance > 5) {
        pointerDragState.isDragging = true;

        const card = pointerDragState.cardElement;
        card.classList.add("is-dragging");

        // Create floating ghost element
        const ghost = card.cloneNode(true);
        ghost.classList.add("touch-drag-ghost");
        ghost.style.left = `${e.clientX}px`;
        ghost.style.top = `${e.clientY}px`;
        document.body.appendChild(ghost);
        pointerDragState.ghostElement = ghost;
    }

    if (pointerDragState.isDragging && pointerDragState.ghostElement) {
        pointerDragState.ghostElement.style.left = `${e.clientX}px`;
        pointerDragState.ghostElement.style.top = `${e.clientY}px`;

        // Temporarily hide ghost to inspect element directly beneath cursor
        pointerDragState.ghostElement.style.display = "none";
        const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        pointerDragState.ghostElement.style.display = "";

        const targetZoneElem = elemBelow ? elemBelow.closest(".cards-zone") : null;

        document.querySelectorAll(".cards-zone").forEach(z => z.classList.remove("drag-over"));
        removeDropIndicators();

        if (targetZoneElem) {
            targetZoneElem.classList.add("drag-over");
            updateDropIndicator(targetZoneElem, e.clientX, e.clientY);
        }
    }
}

function handleCardPointerUp(e) {
    if (!pointerDragState.isDown) return;

    const cardElem = pointerDragState.cardElement;
    const cardId = pointerDragState.cardId;
    const sourceZone = pointerDragState.sourceZone;
    const wasDragging = pointerDragState.isDragging;

    // Release pointer capture
    if (pointerDragState.pointerId !== null && cardElem) {
        try {
            cardElem.releasePointerCapture(pointerDragState.pointerId);
        } catch (err) {}
    }

    // Clean up ghost element
    if (pointerDragState.ghostElement) {
        pointerDragState.ghostElement.remove();
        pointerDragState.ghostElement = null;
    }

    if (cardElem) {
        cardElem.classList.remove("is-dragging");
    }

    document.querySelectorAll(".cards-zone").forEach(z => z.classList.remove("drag-over"));
    removeDropIndicators();

    if (wasDragging) {
        // Dragged and dropped: find drop zone underneath
        const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        const targetZoneElem = elemBelow ? elemBelow.closest(".cards-zone") : null;

        if (targetZoneElem) {
            const targetZone = targetZoneElem.dataset.zone;
            const insertIndex = getDropIndex(targetZoneElem, e.clientX, e.clientY);
            executeCardMove(cardId, sourceZone, targetZone, insertIndex);
        }
    } else {
        // Just clicked/tapped without dragging:
        // CARD DRAG AND DROP ONLY -> play authentic Quran.com word audio, do NOT move!
        const cardObj = (sourceZone === 'pool' ? poolCards : answerCards).find(c => c.id === cardId);
        if (cardObj) {
            playWordAudio(cardObj);
        }
    }

    // Reset state
    pointerDragState.isDown = false;
    pointerDragState.isDragging = false;
    pointerDragState.cardElement = null;
    pointerDragState.cardId = null;
    pointerDragState.pointerId = null;
}

function handleCardPointerCancel(e) {
    if (pointerDragState.ghostElement) {
        pointerDragState.ghostElement.remove();
        pointerDragState.ghostElement = null;
    }
    if (pointerDragState.cardElement) {
        pointerDragState.cardElement.classList.remove("is-dragging");
    }
    document.querySelectorAll(".cards-zone").forEach(z => z.classList.remove("drag-over"));
    removeDropIndicators();

    pointerDragState.isDown = false;
    pointerDragState.isDragging = false;
    pointerDragState.cardElement = null;
}

function setupDropZones() {
    // Drop zones styling and helper setup
}

// Calculate insertion index based on cursor position relative to cards
function getDropIndex(zoneElem, clientX, clientY) {
    const cards = Array.from(zoneElem.querySelectorAll(".word-card:not(.is-dragging)"));
    if (cards.length === 0) return 0;

    for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect();
        // Since RTL: cards flow from right to left
        const midPointX = rect.left + rect.width / 2;

        // In RTL, items with smaller X are further to the left (higher index in LTR, or right-to-left)
        if (clientX > midPointX) {
            return i;
        }
    }

    return cards.length;
}

// Visual drop indicator spacer
function updateDropIndicator(zoneElem, clientX, clientY) {
    removeDropIndicators();

    const indicator = document.createElement("div");
    indicator.className = "drop-indicator";
    indicator.id = "active-drop-indicator";

    const cards = Array.from(zoneElem.querySelectorAll(".word-card:not(.is-dragging)"));
    if (cards.length === 0) {
        zoneElem.appendChild(indicator);
        return;
    }

    const dropIdx = getDropIndex(zoneElem, clientX, clientY);
    if (dropIdx >= cards.length) {
        zoneElem.appendChild(indicator);
    } else {
        zoneElem.insertBefore(indicator, cards[dropIdx]);
    }
}

function removeDropIndicators() {
    const ind = document.getElementById("active-drop-indicator");
    if (ind) ind.remove();
}

// --------------------------------------------------------------------------
// Touch Drag and Drop Handlers (Mobile & iPad support)
// --------------------------------------------------------------------------
function handleTouchStart(e) {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const cardElem = this;

    touchDragState.isDragging = true;
    touchDragState.cardElement = cardElem;
    touchDragState.cardId = cardElem.dataset.id;
    touchDragState.sourceZone = cardElem.dataset.zone;
    touchDragState.originalIndex = parseInt(cardElem.dataset.index);

    activeDrag = {
        cardId: touchDragState.cardId,
        sourceZone: touchDragState.sourceZone,
        originalIndex: touchDragState.originalIndex
    };

    // Create floating clone
    const ghost = cardElem.cloneNode(true);
    ghost.classList.add("touch-drag-ghost");
    ghost.style.left = `${touch.clientX}px`;
    ghost.style.top = `${touch.clientY}px`;
    document.body.appendChild(ghost);
    touchDragState.ghostElement = ghost;

    cardElem.classList.add("is-dragging");
}

function handleTouchMove(e) {
    if (!touchDragState.isDragging || !touchDragState.ghostElement) return;
    e.preventDefault(); // Prevent page scroll while dragging card

    const touch = e.touches[0];
    touchDragState.ghostElement.style.left = `${touch.clientX}px`;
    touchDragState.ghostElement.style.top = `${touch.clientY}px`;

    // Detect zone beneath touch point
    const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetZoneElem = elemBelow ? elemBelow.closest(".cards-zone") : null;

    document.querySelectorAll(".cards-zone").forEach(z => z.classList.remove("drag-over"));
    removeDropIndicators();

    if (targetZoneElem) {
        targetZoneElem.classList.add("drag-over");
        updateDropIndicator(targetZoneElem, touch.clientX, touch.clientY);
    }
}

function handleTouchEnd(e) {
    if (!touchDragState.isDragging) return;

    if (touchDragState.cardElement) {
        touchDragState.cardElement.classList.remove("is-dragging");
    }

    if (touchDragState.ghostElement) {
        touchDragState.ghostElement.remove();
        touchDragState.ghostElement = null;
    }

    // Identify final drop location
    const changedTouch = e.changedTouches[0];
    const elemBelow = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
    const targetZoneElem = elemBelow ? elemBelow.closest(".cards-zone") : null;

    document.querySelectorAll(".cards-zone").forEach(z => z.classList.remove("drag-over"));
    removeDropIndicators();

    if (targetZoneElem) {
        const targetZone = targetZoneElem.dataset.zone;
        const insertIndex = getDropIndex(targetZoneElem, changedTouch.clientX, changedTouch.clientY);
        executeCardMove(touchDragState.cardId, touchDragState.sourceZone, targetZone, insertIndex);
    }

    touchDragState.isDragging = false;
    touchDragState.cardElement = null;
    touchDragState.cardId = null;
}

// --------------------------------------------------------------------------
// Core Card Move & Reordering Logic
// --------------------------------------------------------------------------
function executeCardMove(cardId, sourceZone, targetZone, targetIndex = null) {
    if (!cardId || !sourceZone || !targetZone) return;

    let movedCard = null;

    // 1. Reordering within Answer Zone
    if (sourceZone === 'answer' && targetZone === 'answer') {
        const oldIndex = answerCards.findIndex(c => c.id === cardId);
        if (oldIndex === -1) return;

        movedCard = answerCards.splice(oldIndex, 1)[0];
        // Adjust insert index if old was before target
        let adjustedTarget = targetIndex !== null ? targetIndex : answerCards.length;
        if (oldIndex < adjustedTarget) {
            adjustedTarget = Math.max(0, adjustedTarget - 1);
        }
        answerCards.splice(adjustedTarget, 0, movedCard);

        renderZones();
        return;
    }

    // 2. Moving from Pool Zone to Answer Zone
    if (sourceZone === 'pool' && targetZone === 'answer') {
        const oldIndex = poolCards.findIndex(c => c.id === cardId);
        if (oldIndex === -1) return;

        movedCard = poolCards.splice(oldIndex, 1)[0];
        const adjustedTarget = targetIndex !== null ? targetIndex : answerCards.length;
        answerCards.splice(adjustedTarget, 0, movedCard);

        playAudioSnap();
        renderZones();
        playWordAudio(movedCard);
        return;
    }

    // 3. Moving from Answer Zone back to Pool Zone
    if (sourceZone === 'answer' && targetZone === 'pool') {
        const oldIndex = answerCards.findIndex(c => c.id === cardId);
        if (oldIndex === -1) return;

        movedCard = answerCards.splice(oldIndex, 1)[0];
        const adjustedTarget = targetIndex !== null ? targetIndex : poolCards.length;
        poolCards.splice(adjustedTarget, 0, movedCard);

        playAudioPop();
        renderZones();
        return;
    }

    // 4. Reordering within Pool Zone
    if (sourceZone === 'pool' && targetZone === 'pool') {
        const oldIndex = poolCards.findIndex(c => c.id === cardId);
        if (oldIndex === -1) return;

        movedCard = poolCards.splice(oldIndex, 1)[0];
        let adjustedTarget = targetIndex !== null ? targetIndex : poolCards.length;
        if (oldIndex < adjustedTarget) {
            adjustedTarget = Math.max(0, adjustedTarget - 1);
        }
        poolCards.splice(adjustedTarget, 0, movedCard);

        renderZones();
        return;
    }
}

// Reset current Ayah cards
function resetCurrentAyah() {
    if (currentAyahData) {
        processAyahText(currentAyahData.surah, currentAyahData.ayahNumber, currentAyahData.text);
    }
}

// ==========================================================================
// 7. Verification & Gameplay Progression
// ==========================================================================
function checkAnswer() {
    if (!currentAyahData) return;

    if (answerCards.length !== currentAyahData.words.length) {
        showFeedback("مَا زَالَتْ هُنَاكَ كَلِمَاتٌ فِي بِنْكِ الْبِطَاقَاتِ! اسْحَبْ كُلَّ الْبِطَاقَاتِ أَوَّلًا.", "error");
        playAudioTryAgain();
        return;
    }

    const userText = answerCards.map(w => w.text).join(" ");
    const correctText = currentAyahData.words.join(" ");

    if (userText === correctText) {
        const successMsg = currentTheme === 'girls'
            ? "أَحْسَنْتِ يَا زَهْرَةَ الْقُرْآنِ! 🌸 إِجَابَةٌ صَحِيحَةٌ وَتَرْتِيبٌ مُمَتَازٌ!"
            : "أَحْسَنْتَ يَا بَطَلَ الْقُرْآنِ! 🌟 إِجَابَةٌ صَحِيحَةٌ وَتَرْتِيبٌ مُمَتَازٌ!";
        showFeedback(successMsg, "success");
        score += 10;
        solvedAyahCount++;
        scoreDisplayElem.textContent = `⭐ النِّقَاط: ${score}`;
        if (solvedCountElem) solvedCountElem.textContent = solvedAyahCount;

        const cards = answerZone.querySelectorAll(".word-card");
        cards.forEach(c => c.classList.add("correct"));

        btnCheck.style.display = "none";
        btnNext.style.display = "block";

        // Positive Kids Audio & Celebration Modal
        playAudioVictory();
        if (celebrationOverlay) {
            celebrationOverlay.classList.add("active");
        }

        playAyahAudio();
    } else {
        const errorMsg = currentTheme === 'girls'
            ? "حَاوِلِي مَرَّةً أُخْرَى يَا زَهْرَةُ! تَأَكَّدِي مِنْ تَرْتِيبِ الْبِطَاقَاتِ بِسَحْبِهَا فِي المَكَانِ الصَّحِيحِ."
            : "حَاوِلْ مَرَّةً أُخْرَى يَا بَطَلُ! تَأَكَّدْ مِنْ تَرْتِيبِ الْبِطَاقَاتِ بِسَحْبِهَا فِي المَكَانِ الصَّحِيحِ.";
        showFeedback(errorMsg, "error");
        playAudioTryAgain();

        const cards = answerZone.querySelectorAll(".word-card");
        cards.forEach(c => c.classList.add("wrong"));
    }
}

function showFeedback(msg, type) {
    feedbackElem.textContent = msg;
    feedbackElem.className = `feedback-message ${type === 'success' ? 'feedback-success' : 'feedback-error'}`;
    feedbackElem.style.display = "block";
}

// Next Ayah in the current Surah / Juz
function nextAyah() {
    if (celebrationOverlay) {
        celebrationOverlay.classList.remove("active");
    }

    const juzObj = juzDataList.find(j => j.number === currentJuzNumber);
    if (!juzObj) return;

    const surahObj = juzObj.surahs.find(s => s.number === currentSurahNumber);
    if (!surahObj) return;

    if (currentAyahNumber < surahObj.endAyah) {
        // Next ayah in same surah
        loadAyahBySurahAndNumber(currentSurahNumber, currentAyahNumber + 1);
    } else {
        // Next surah in this Juz
        const currentSurahIdx = juzObj.surahs.findIndex(s => s.number === currentSurahNumber);
        if (currentSurahIdx + 1 < juzObj.surahs.length) {
            const nextSurah = juzObj.surahs[currentSurahIdx + 1];
            loadAyahBySurahAndNumber(nextSurah.number, nextSurah.startAyah);
        } else {
            // Next Juz!
            const nextJuzNum = (currentJuzNumber % 30) + 1;
            selectJuz(nextJuzNum, true);
        }
    }
}

// ==========================================================================
// 8. Kids Learning Mode Helpers (Smart Hint, Speed, Guide)
// ==========================================================================
function triggerSmartHint() {
    if (!currentAyahData || !currentAyahData.words) return;

    if (hintTimeoutId) clearTimeout(hintTimeoutId);
    document.querySelectorAll(".card-hint-highlight").forEach(c => c.classList.remove("card-hint-highlight"));

    const targetIdx = answerCards.length;
    if (targetIdx >= currentAyahData.words.length) {
        showFeedback("لَقَدْ وَضَعْتَ كُلَّ الْبِطَاقَاتِ! اضْغَطْ عَلَى 'تَحَقَّقْ مِنَ الإِجَابَةِ'.", "success");
        return;
    }

    const nextWordText = currentAyahData.words[targetIdx];
    const matchingCard = poolCards.find(c => c.text === nextWordText);

    if (matchingCard) {
        const cardElem = document.getElementById(matchingCard.id);
        if (cardElem) {
            cardElem.classList.add("card-hint-highlight");
            cardElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            playWordAudio(matchingCard);

            hintTimeoutId = setTimeout(() => {
                cardElem.classList.remove("card-hint-highlight");
            }, 3500);
        }
    } else {
        showFeedback("الْبِطَاقَةُ التَّالِيَةُ مَوْجُودَةٌ بِالْفِعْلِ فِي مَنْطَقَةِ التَّرْتِيبِ!", "error");
    }
}

function toggleSpeechSpeed() {
    isSlowSpeed = !isSlowSpeed;
    if (isSlowSpeed) {
        kidsSpeechSpeed = 0.65;
        if (speedIcon) speedIcon.textContent = "🐢";
        if (speedLabel) speedLabel.textContent = "سُرْعَةٌ هَادِئَةٌ";
    } else {
        kidsSpeechSpeed = 0.85;
        if (speedIcon) speedIcon.textContent = "🐇";
        if (speedLabel) speedLabel.textContent = "سُرْعَةٌ عَادِيَّةٌ";
    }
    playAudioPop();
}

function toggleGuideText() {
    if (!currentAyahData) return;
    if (guideBox.style.display === "none" || !guideBox.style.display) {
        guideBox.style.display = "block";
        guideTextElem.textContent = currentAyahData.text;
    } else {
        guideBox.style.display = "none";
    }
    playAudioPop();
}

// ==========================================================================
// 9. Sidebar & Event Listeners
// ==========================================================================
function setupEventListeners() {
    // Sidebar Toggle
    btnToggleSidebar.addEventListener("click", toggleSidebar);
    btnCloseSidebar.addEventListener("click", closeSidebar);
    sidebarOverlayElem.addEventListener("click", closeSidebar);

    // Search filter in Sidebar
    juzSearchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
            renderJuzSidebar(juzDataList);
            return;
        }

        const filtered = juzDataList.filter(j => {
            const matchName = j.name.toLowerCase().includes(query);
            const matchNum = j.number.toString() === query;
            const matchSurah = j.surahs.some(s => s.name.toLowerCase().includes(query));
            return matchName || matchNum || matchSurah;
        });

        renderJuzSidebar(filtered);
    });

    // Theme Switcher Controls
    if (themeBtnBoys) themeBtnBoys.addEventListener("click", () => { setTheme('boys'); playAudioPop(); });
    if (themeBtnGirls) themeBtnGirls.addEventListener("click", () => { setTheme('girls'); playAudioPop(); });

    // Kids Mode Controls
    if (btnHint) btnHint.addEventListener("click", triggerSmartHint);
    if (btnSpeedToggle) btnSpeedToggle.addEventListener("click", toggleSpeechSpeed);
    if (btnGuideText) btnGuideText.addEventListener("click", toggleGuideText);
    if (btnCelebrateNext) btnCelebrateNext.addEventListener("click", nextAyah);

    // Control buttons
    btnReset.addEventListener("click", resetCurrentAyah);
    btnCheck.addEventListener("click", checkAnswer);
    btnNext.addEventListener("click", nextAyah);
    btnListen.addEventListener("click", playAyahAudio);
}

function toggleSidebar() {
    if (window.innerWidth <= 992) {
        sidebarElem.classList.toggle("open");
        sidebarOverlayElem.classList.toggle("active");
    } else {
        sidebarElem.classList.toggle("collapsed");
    }
}

function closeSidebar() {
    sidebarElem.classList.remove("open");
    sidebarOverlayElem.classList.remove("active");
}

// ==========================================================================
// 10. Authentic Quran.com Voice & Recitation Audio
// ==========================================================================
let currentAyahAudio = null;
let currentWordAudio = null;

function playWordAudio(card) {
    if (!card) return;

    if (currentWordAudio) {
        currentWordAudio.pause();
        currentWordAudio.currentTime = 0;
    }

    if (card.audioUrl) {
        const audio = new Audio(card.audioUrl);
        audio.playbackRate = kidsSpeechSpeed;
        currentWordAudio = audio;

        audio.play().catch(err => {
            console.warn("Quran.com word audio failed, fallback to speech synthesis:", err);
            speakArabicText(card.text);
        });
    } else {
        speakArabicText(card.text);
    }
}

function playAyahAudio() {
    if (!currentAyahData) return;

    // Toggle pause if currently playing
    if (currentAyahAudio && !currentAyahAudio.paused) {
        currentAyahAudio.pause();
        currentAyahAudio.currentTime = 0;
        btnListen.innerHTML = `🔊 اسْتَمِعْ لِلْآيَةِ كَامِلَةً (Quran.com)`;
        btnListen.classList.remove("playing");
        return;
    }

    const audioUrl = currentAyahData.audioUrl;
    if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.playbackRate = kidsSpeechSpeed;
        currentAyahAudio = audio;

        btnListen.innerHTML = `⏸️ إِيقَافُ التِّلَاوَةِ (Quran.com)`;
        btnListen.classList.add("playing");

        audio.play().catch(err => {
            console.warn("Quran.com ayah audio failed, fallback to speech synthesis:", err);
            btnListen.innerHTML = `🔊 اسْتَمِعْ لِلْآيَةِ كَامِلَةً (Quran.com)`;
            btnListen.classList.remove("playing");
            speakArabicText(currentAyahData.text);
        });

        audio.onended = () => {
            btnListen.innerHTML = `🔊 اسْتَمِعْ لِلْآيَةِ كَامِلَةً (Quran.com)`;
            btnListen.classList.remove("playing");
        };

        audio.onerror = () => {
            btnListen.innerHTML = `🔊 اسْتَمِعْ لِلْآيَةِ كَامِلَةً (Quran.com)`;
            btnListen.classList.remove("playing");
        };
    } else {
        speakArabicText(currentAyahData.text);
    }
}

function speakArabicText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = kidsSpeechSpeed; // Kids friendly speech rate (0.65 or 0.85)
        window.speechSynthesis.speak(utterance);
    }
}

// Start app on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initApp);
