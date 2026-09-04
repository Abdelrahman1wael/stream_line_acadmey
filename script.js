/**
 * لُعْبَةُ تَرْتِيبِ كَلِمَاتِ الْقُرْآنِ الْكَرِيمِ
 * Quran Word Ordering Game for Kids (All 30 Juz & Drag-and-Drop)
 */

(function () {
    'use strict';

    // ==========================================
    // 1. ALL 30 JUZ METADATA & SURAH MAPPING
    // ==========================================
    const ALL_30_JUZ = [
        {
            number: 1,
            name: "الْجُزْءُ 1 (الم)",
            surahsSummary: "الفاتحة 1 - البقرة 141",
            surahs: [
                { number: 1, name: "سُورَةُ الْفَاتِحَةِ", startAyah: 1, endAyah: 7, totalAyahs: 7 },
                { number: 2, name: "سُورَةُ الْبَقَرَةِ", startAyah: 1, endAyah: 141, totalAyahs: 141 }
            ]
        },
        {
            number: 2,
            name: "الْجُزْءُ 2 (سَيَقُولُ)",
            surahsSummary: "البقرة 142 - 252",
            surahs: [
                { number: 2, name: "سُورَةُ الْبَقَرَةِ", startAyah: 142, endAyah: 252, totalAyahs: 111 }
            ]
        },
        {
            number: 3,
            name: "الْجُزْءُ 3 (تِلْكَ الرُّسُلُ)",
            surahsSummary: "البقرة 253 - آل عمران 92",
            surahs: [
                { number: 2, name: "سُورَةُ الْبَقَرَةِ", startAyah: 253, endAyah: 286, totalAyahs: 34 },
                { number: 3, name: "سُورَةُ آلِ عِمْرَانَ", startAyah: 1, endAyah: 92, totalAyahs: 92 }
            ]
        },
        {
            number: 4,
            name: "الْجُزْءُ 4 (لَنْ تَنَالُوا)",
            surahsSummary: "آل عمران 93 - النساء 23",
            surahs: [
                { number: 3, name: "سُورَةُ آلِ عِمْرَانَ", startAyah: 93, endAyah: 200, totalAyahs: 108 },
                { number: 4, name: "سُورَةُ النِّسَاءِ", startAyah: 1, endAyah: 23, totalAyahs: 23 }
            ]
        },
        {
            number: 5,
            name: "الْجُزْءُ 5 (وَالْمُحْصَنَاتُ)",
            surahsSummary: "النساء 24 - 147",
            surahs: [
                { number: 4, name: "سُورَةُ النِّسَاءِ", startAyah: 24, endAyah: 147, totalAyahs: 124 }
            ]
        },
        {
            number: 6,
            name: "الْجُزْءُ 6 (لَا يُحِبُّ اللَّهُ)",
            surahsSummary: "النساء 148 - المائدة 81",
            surahs: [
                { number: 4, name: "سُورَةُ النِّسَاءِ", startAyah: 148, endAyah: 176, totalAyahs: 29 },
                { number: 5, name: "سُورَةُ الْمَائِدَةِ", startAyah: 1, endAyah: 81, totalAyahs: 81 }
            ]
        },
        {
            number: 7,
            name: "الْجُزْءُ 7 (وَإِذَا سَمِعُوا)",
            surahsSummary: "المائدة 82 - الأنعام 110",
            surahs: [
                { number: 5, name: "سُورَةُ الْمَائِدَةِ", startAyah: 82, endAyah: 120, totalAyahs: 39 },
                { number: 6, name: "سُورَةُ الأَنْعَامِ", startAyah: 1, endAyah: 110, totalAyahs: 110 }
            ]
        },
        {
            number: 8,
            name: "الْجُزْءُ 8 (وَلَوْ أَنَّنَا)",
            surahsSummary: "الأنعام 111 - الأعراف 87",
            surahs: [
                { number: 6, name: "سُورَةُ الأَنْعَامِ", startAyah: 111, endAyah: 165, totalAyahs: 55 },
                { number: 7, name: "سُورَةُ الأَعْرَافِ", startAyah: 1, endAyah: 87, totalAyahs: 87 }
            ]
        },
        {
            number: 9,
            name: "الْجُزْءُ 9 (قَالَ الْمَلَأُ)",
            surahsSummary: "الأعراف 88 - الأنفال 40",
            surahs: [
                { number: 7, name: "سُورَةُ الأَعْرَافِ", startAyah: 88, endAyah: 206, totalAyahs: 119 },
                { number: 8, name: "سُورَةُ الأَنْفَالِ", startAyah: 1, endAyah: 40, totalAyahs: 40 }
            ]
        },
        {
            number: 10,
            name: "الْجُزْءُ 10 (وَاعْلَمُوا)",
            surahsSummary: "الأنفال 41 - التوبة 92",
            surahs: [
                { number: 8, name: "سُورَةُ الأَنْفَالِ", startAyah: 41, endAyah: 75, totalAyahs: 35 },
                { number: 9, name: "سُورَةُ التَّوْبَةِ", startAyah: 1, endAyah: 92, totalAyahs: 92 }
            ]
        },
        {
            number: 11,
            name: "الْجُزْءُ 11 (يَعْتَذِرُونَ)",
            surahsSummary: "التوبة 93 - هود 5",
            surahs: [
                { number: 9, name: "سُورَةُ التَّوْبَةِ", startAyah: 93, endAyah: 129, totalAyahs: 37 },
                { number: 10, name: "سُورَةُ يُونُسَ", startAyah: 1, endAyah: 109, totalAyahs: 109 },
                { number: 11, name: "سُورَةُ هُودٍ", startAyah: 1, endAyah: 5, totalAyahs: 5 }
            ]
        },
        {
            number: 12,
            name: "الْجُزْءُ 12 (وَمَا مِنْ دَابَّةٍ)",
            surahsSummary: "هود 6 - يوسف 52",
            surahs: [
                { number: 11, name: "سُورَةُ هُودٍ", startAyah: 6, endAyah: 123, totalAyahs: 118 },
                { number: 12, name: "سُورَةُ يُوسُفَ", startAyah: 1, endAyah: 52, totalAyahs: 52 }
            ]
        },
        {
            number: 13,
            name: "الْجُزْءُ 13 (وَمَا أُبَرِّئُ)",
            surahsSummary: "يوسف 53 - إبراهيم 52",
            surahs: [
                { number: 12, name: "سُورَةُ يُوسُفَ", startAyah: 53, endAyah: 111, totalAyahs: 59 },
                { number: 13, name: "سُورَةُ الرَّعْدِ", startAyah: 1, endAyah: 43, totalAyahs: 43 },
                { number: 14, name: "سُورَةُ إِبْرَاهِيمَ", startAyah: 1, endAyah: 52, totalAyahs: 52 }
            ]
        },
        {
            number: 14,
            name: "الْجُزْءُ 14 (رُبَمَا)",
            surahsSummary: "الحجر 1 - النحل 128",
            surahs: [
                { number: 15, name: "سُورَةُ الْحِجْرِ", startAyah: 1, endAyah: 99, totalAyahs: 99 },
                { number: 16, name: "سُورَةُ النَّحْلِ", startAyah: 1, endAyah: 128, totalAyahs: 128 }
            ]
        },
        {
            number: 15,
            name: "الْجُزْءُ 15 (سُبْحَانَ الَّذِي)",
            surahsSummary: "الإسراء 1 - الكهف 74",
            surahs: [
                { number: 17, name: "سُورَةُ الإِسْرَاءِ", startAyah: 1, endAyah: 111, totalAyahs: 111 },
                { number: 18, name: "سُورَةُ الْكَهْفِ", startAyah: 1, endAyah: 74, totalAyahs: 74 }
            ]
        },
        {
            number: 16,
            name: "الْجُزْءُ 16 (قَالَ أَلَمْ)",
            surahsSummary: "الكهف 75 - طه 135",
            surahs: [
                { number: 18, name: "سُورَةُ الْكَهْفِ", startAyah: 75, endAyah: 110, totalAyahs: 36 },
                { number: 19, name: "سُورَةُ مَرْيَمَ", startAyah: 1, endAyah: 98, totalAyahs: 98 },
                { number: 20, name: "سُورَةُ طه", startAyah: 1, endAyah: 135, totalAyahs: 135 }
            ]
        },
        {
            number: 17,
            name: "الْجُزْءُ 17 (اقْتَرَبَ)",
            surahsSummary: "الأنبياء 1 - الحج 78",
            surahs: [
                { number: 21, name: "سُورَةُ الأَنْبِيَاءِ", startAyah: 1, endAyah: 112, totalAyahs: 112 },
                { number: 22, name: "سُورَةُ الْحَجِّ", startAyah: 1, endAyah: 78, totalAyahs: 78 }
            ]
        },
        {
            number: 18,
            name: "الْجُزْءُ 18 (قَدْ أَفْلَحَ)",
            surahsSummary: "المؤمنون 1 - الفرقان 20",
            surahs: [
                { number: 23, name: "سُورَةُ الْمُؤْمِنُونَ", startAyah: 1, endAyah: 118, totalAyahs: 118 },
                { number: 24, name: "سُورَةُ النُّورِ", startAyah: 1, endAyah: 64, totalAyahs: 64 },
                { number: 25, name: "سُورَةُ الْفُرْقَانِ", startAyah: 1, endAyah: 20, totalAyahs: 20 }
            ]
        },
        {
            number: 19,
            name: "الْجُزْءُ 19 (وَقَالَ الَّذِينَ)",
            surahsSummary: "الفرقان 21 - النمل 55",
            surahs: [
                { number: 25, name: "سُورَةُ الْفُرْقَانِ", startAyah: 21, endAyah: 77, totalAyahs: 57 },
                { number: 26, name: "سُورَةُ الشُّعَرَاءِ", startAyah: 1, endAyah: 227, totalAyahs: 227 },
                { number: 27, name: "سُورَةُ النَّمْلِ", startAyah: 1, endAyah: 55, totalAyahs: 55 }
            ]
        },
        {
            number: 20,
            name: "الْجُزْءُ 20 (أَمَّنْ خَلَقَ)",
            surahsSummary: "النمل 56 - العنكبوت 45",
            surahs: [
                { number: 27, name: "سُورَةُ النَّمْلِ", startAyah: 56, endAyah: 93, totalAyahs: 38 },
                { number: 28, name: "سُورَةُ الْقَصَصِ", startAyah: 1, endAyah: 88, totalAyahs: 88 },
                { number: 29, name: "سُورَةُ الْعَنْكَبُوتِ", startAyah: 1, endAyah: 45, totalAyahs: 45 }
            ]
        },
        {
            number: 21,
            name: "الْجُزْءُ 21 (اتْلُ مَا أُوحِيَ)",
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
            name: "الْجُزْءُ 22 (وَمَنْ يَقْنُتْ)",
            surahsSummary: "الأحزاب 31 - يس 27",
            surahs: [
                { number: 33, name: "سُورَةُ الأَحْزَابِ", startAyah: 31, endAyah: 73, totalAyahs: 43 },
                { number: 34, name: "سُورَةُ سَبَإٍ", startAyah: 1, endAyah: 54, totalAyahs: 54 },
                { number: 35, name: "سُورَةُ فَاطِرٍ", startAyah: 1, endAyah: 45, totalAyahs: 45 },
                { number: 36, name: "سُورَةُ يس", startAyah: 1, endAyah: 27, totalAyahs: 27 }
            ]
        },
        {
            number: 23,
            name: "الْجُزْءُ 23 (وَمَا لِيَ)",
            surahsSummary: "يس 28 - الزمر 31",
            surahs: [
                { number: 36, name: "سُورَةُ يس", startAyah: 28, endAyah: 83, totalAyahs: 56 },
                { number: 37, name: "سُورَةُ الصَّافَّاتِ", startAyah: 1, endAyah: 182, totalAyahs: 182 },
                { number: 38, name: "سُورَةُ ص", startAyah: 1, endAyah: 88, totalAyahs: 88 },
                { number: 39, name: "سُورَةُ الزُّمَرِ", startAyah: 1, endAyah: 31, totalAyahs: 31 }
            ]
        },
        {
            number: 24,
            name: "الْجُزْءُ 24 (فَمَنْ أَظْلَمُ)",
            surahsSummary: "الزمر 32 - فصلت 46",
            surahs: [
                { number: 39, name: "سُورَةُ الزُّمَرِ", startAyah: 32, endAyah: 75, totalAyahs: 44 },
                { number: 40, name: "سُورَةُ غَافِرٍ", startAyah: 1, endAyah: 85, totalAyahs: 85 },
                { number: 41, name: "سُورَةُ فُصِّلَتْ", startAyah: 1, endAyah: 46, totalAyahs: 46 }
            ]
        },
        {
            number: 25,
            name: "الْجُزْءُ 25 (إِلَيْهِ يُرَدُّ)",
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
            name: "الْجُزْءُ 26 (حم)",
            surahsSummary: "الأحقاف 1 - الذاريات 30",
            surahs: [
                { number: 46, name: "سُورَةُ الأَحْقَافِ", startAyah: 1, endAyah: 35, totalAyahs: 35 },
                { number: 47, name: "سُورَةُ مُحَمَّدٍ", startAyah: 1, endAyah: 38, totalAyahs: 38 },
                { number: 48, name: "سُورَةُ الْفَتْحِ", startAyah: 1, endAyah: 29, totalAyahs: 29 },
                { number: 49, name: "سُورَةُ الْحُجُرَاتِ", startAyah: 1, endAyah: 18, totalAyahs: 18 },
                { number: 50, name: "سُورَةُ ق", startAyah: 1, endAyah: 45, totalAyahs: 45 },
                { number: 51, name: "سُورَةُ الذَّارِيَاتِ", startAyah: 1, endAyah: 30, totalAyahs: 30 }
            ]
        },
        {
            number: 27,
            name: "الْجُزْءُ 27 (قَالَ فَمَا خَطْبُكُمْ)",
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
            name: "الْجُزْءُ 28 (قَدْ سَمِعَ اللَّهُ)",
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
            name: "الْجُزْءُ 29 (تَبَارَكَ الَّذِي)",
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
            name: "الْجُزْءُ 30 (عَمَّ يَتَسَاءَلُونَ)",
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
                { number: 92, name: "سُورَةُ اللَّيْلِ", startAyah: 1, endAyah: 21, totalAyahs: 21 },
                { number: 93, name: "سُورَةُ الضُّحَى", startAyah: 1, endAyah: 11, totalAyahs: 11 },
                { number: 94, name: "سُورَةُ الشَّرْحِ", startAyah: 1, endAyah: 8, totalAyahs: 8 },
                { number: 95, name: "سُورَةُ التِّينِ", startAyah: 1, endAyah: 8, totalAyahs: 8 },
                { number: 96, name: "سُورَةُ الْعَلَقِ", startAyah: 1, endAyah: 19, totalAyahs: 19 },
                { number: 97, name: "سُورَةُ الْقَدْرِ", startAyah: 1, endAyah: 5, totalAyahs: 5 },
                { number: 98, name: "سُورَةُ الْبَيِّنَةِ", startAyah: 1, endAyah: 8, totalAyahs: 8 },
                { number: 99, name: "سُورَةُ الزَّلْزَلَةِ", startAyah: 1, endAyah: 8, totalAyahs: 8 },
                { number: 100, name: "سُورَةُ الْعَادِيَاتِ", startAyah: 1, endAyah: 11, totalAyahs: 11 },
                { number: 101, name: "سُورَةُ الْقَارِعَةِ", startAyah: 1, endAyah: 11, totalAyahs: 11 },
                { number: 102, name: "سُورَةُ التَّكَاثُرِ", startAyah: 1, endAyah: 8, totalAyahs: 8 },
                { number: 103, name: "سُورَةُ الْعَصْرِ", startAyah: 1, endAyah: 3, totalAyahs: 3 },
                { number: 104, name: "سُورَةُ الْهُمَزَةِ", startAyah: 1, endAyah: 9, totalAyahs: 9 },
                { number: 105, name: "سُورَةُ الْفِيلِ", startAyah: 1, endAyah: 5, totalAyahs: 5 },
                { number: 106, name: "سُورَةُ قُرَيْشٍ", startAyah: 1, endAyah: 4, totalAyahs: 4 },
                { number: 107, name: "سُورَةُ الْمَاعُونِ", startAyah: 1, endAyah: 7, totalAyahs: 7 },
                { number: 108, name: "سُورَةُ الْكَوْثَرِ", startAyah: 1, endAyah: 3, totalAyahs: 3 },
                { number: 109, name: "سُورَةُ الْكَافِرُونَ", startAyah: 1, endAyah: 6, totalAyahs: 6 },
                { number: 110, name: "سُورَةُ النَّصْرِ", startAyah: 1, endAyah: 3, totalAyahs: 3 },
                { number: 111, name: "سُورَةُ الْمَسَدِ", startAyah: 1, endAyah: 5, totalAyahs: 5 },
                { number: 112, name: "سُورَةُ الإِخْلَاصِ", startAyah: 1, endAyah: 4, totalAyahs: 4 },
                { number: 113, name: "سُورَةُ الْفَلَقِ", startAyah: 1, endAyah: 5, totalAyahs: 5 },
                { number: 114, name: "سُورَةُ النَّاسِ", startAyah: 1, endAyah: 6, totalAyahs: 6 }
            ]
        }
    ];

    // ==========================================
    // 2. BUILT-IN OFFLINE AYAT DATABASE (INSTANT LATENCY-FREE PLAY)
    // ==========================================
    const BUILTIN_AYAT_DB = {
        "112:1": { text: "قُلْ هُوَ اللَّهُ أَحَدٌ", words: ["قُلْ", "هُوَ", "اللَّهُ", "أَحَدٌ"] },
        "112:2": { text: "اللَّهُ الصَّمَدُ", words: ["اللَّهُ", "الصَّمَدُ"] },
        "112:3": { text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", words: ["لَمْ", "يَلِدْ", "وَلَمْ", "يُولَدْ"] },
        "112:4": { text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", words: ["وَلَمْ", "يَكُن", "لَّهُ", "كُفُوًا", "أَحَدٌ"] },

        "108:1": { text: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", words: ["إِنَّا", "أَعْطَيْنَاكَ", "الْكَوْثَرَ"] },
        "108:2": { text: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", words: ["فَصَلِّ", "لِرَبِّكَ", "وَانْحَرْ"] },
        "108:3": { text: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", words: ["إِنَّ", "شَانِئَكَ", "هُوَ", "الْأَبْتَرُ"] },

        "113:1": { text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", words: ["قُلْ", "أَعُوذُ", "بِرَبِّ", "الْفَلَقِ"] },
        "113:2": { text: "مِن شَرِّ مَا خَلَقَ", words: ["مِن", "شَرِّ", "مَا", "خَلَقَ"] },
        "113:3": { text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", words: ["وَمِن", "شَرِّ", "غَاسِقٍ", "إِذَا", "وَقَبَ"] },
        "113:4": { text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", words: ["وَمِن", "شَرِّ", "النَّفَّاثَاتِ", "فِي", "الْعُقَدِ"] },
        "113:5": { text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", words: ["وَمِن", "شَرِّ", "حَاسِدٍ", "إِذَا", "حَسَدَ"] },

        "114:1": { text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", words: ["قُلْ", "أَعُوذُ", "بِرَبِّ", "النَّاسِ"] },
        "114:2": { text: "مَلِكِ النَّاسِ", words: ["مَلِكِ", "النَّاسِ"] },
        "114:3": { text: "إِلَٰهِ النَّاسِ", words: ["إِلَٰهِ", "النَّاسِ"] },
        "114:4": { text: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", words: ["مِن", "شَرِّ", "الْوَسْوَاسِ", "الْخَنَّاسِ"] },
        "114:5": { text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", words: ["الَّذِي", "يُوَسْوِسُ", "فِي", "صُدُورِ", "النَّاسِ"] },
        "114:6": { text: "مِنَ الْجِنَّةِ وَالنَّاسِ", words: ["مِنَ", "الْجِنَّةِ", "وَالنَّاسِ"] },

        "110:1": { text: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", words: ["إِذَا", "جَاءَ", "نَصْرُ", "اللَّهِ", "وَالْفَتْحُ"] },
        "110:2": { text: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", words: ["وَرَأَيْتَ", "النَّاسَ", "يَدْخُلُونَ", "فِي", "دِينِ", "اللَّهِ", "أَفْوَاجًا"] },
        "110:3": { text: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", words: ["فَسَبِّحْ", "بِحَمْدِ", "رَبِّكَ", "وَاسْتَغْفِرْهُ", "إِنَّهُ", "كَانَ", "تَوَّابًا"] },

        "103:1": { text: "وَالْعَصْرِ", words: ["وَالْعَصْرِ"] },
        "103:2": { text: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", words: ["إِنَّ", "الْإِنسَانَ", "لَفِي", "خُسْرٍ"] },
        "103:3": { text: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", words: ["إِلَّا", "الَّذِينَ", "آمَنُوا", "وَعَمِلُوا", "الصَّالِحَاتِ", "وَتَوَاصَوْا", "بِالْحَقِّ", "وَتَوَاصَوْا", "بِالصَّبْرِ"] },

        "1:1": { text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", words: ["بِسْمِ", "اللَّهِ", "الرَّحْمَٰنِ", "الرَّحِيمِ"] },
        "1:2": { text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", words: ["الْحَمْدُ", "لِلَّهِ", "رَبِّ", "الْعَالَمِينَ"] },
        "1:3": { text: "الرَّحْمَٰنِ الرَّحِيمِ", words: ["الرَّحْمَٰنِ", "الرَّحِيمِ"] },
        "1:4": { text: "مَالِكِ يَوْمِ الدِّينِ", words: ["مَالِكِ", "يَوْمِ", "الدِّينِ"] },
        "1:5": { text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", words: ["إِيَّاكَ", "نَعْبُدُ", "وَإِيَّاكَ", "نَسْتَعِينُ"] },
        "1:6": { text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", words: ["اهْدِنَا", "الصِّرَاطَ", "الْمُسْتَقِيمَ"] },
        "1:7": { text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", words: ["صِرَاطَ", "الَّذِينَ", "أَنْعَمْتَ", "عَلَيْهِمْ", "غَيْرِ", "الْمَغْضُوبِ", "عَلَيْهِمْ", "وَلَا", "الضَّالِّينَ"] }
    };

    // ==========================================
    // 3. APP STATE
    // ==========================================
    let currentJuzNumber = 30; // Default to Juz 30 (Al-Ikhlas)
    let currentSurahNumber = 112; // Surah Al-Ikhlas
    let currentAyahNumber = 1; // Ayah 1
    let currentAyahData = null;
    let currentScore = 70; // 70 points matching user screenshot
    let currentTheme = localStorage.getItem('quran_game_theme') || 'theme-boys';
    let isSolved = false;

    // Mobile Pointer Drag State
    let touchDragElement = null;
    let touchGhostElement = null;
    let touchStartX = 0;
    let touchStartY = 0;
    let isDraggingTouch = false;

    // ==========================================
    // 4. DOM ELEMENTS
    // ==========================================
    const bodyEl = document.body;
    const btnThemeBoys = document.getElementById('btn-theme-boys');
    const btnThemeGirls = document.getElementById('btn-theme-girls');

    // Sidebar Elements
    const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
    const btnCloseSidebar = document.getElementById('btn-close-sidebar');
    const juzSidebar = document.getElementById('juz-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const juzSearchInput = document.getElementById('juz-search-input');
    const juzItemsContainer = document.getElementById('juz-items-container');
    const currentJuzBadge = document.getElementById('current-juz-badge');
    const filterTags = document.querySelectorAll('.filter-tag');

    // Navigation Dropdowns
    const surahSelect = document.getElementById('surah-select');
    const ayahSelect = document.getElementById('ayah-select');

    // Header Badges
    const badgeSurah = document.getElementById('badge-surah');
    const badgeAyah = document.getElementById('badge-ayah');
    const scoreVal = document.getElementById('score-val');
    const mascotAvatar = document.getElementById('mascot-avatar');
    const mascotText = document.getElementById('mascot-text');

    // Action Buttons
    const btnListen = document.getElementById('btn-listen');
    const btnReset = document.getElementById('btn-reset');
    const btnCheck = document.getElementById('btn-check');
    const btnNextAyah = document.getElementById('btn-next-ayah');

    // Zones
    const targetDropzone = document.getElementById('target-dropzone');
    const sourcePool = document.getElementById('source-pool');
    const feedbackToast = document.getElementById('feedback-toast');
    const audioPlayer = document.getElementById('ayah-audio-player');

    // Celebration Modal
    const celebrationModal = document.getElementById('celebration-modal');
    const celebrationHeading = document.getElementById('celebration-heading');
    const celebrationMessage = document.getElementById('celebration-message');
    const celebrationVerseText = document.getElementById('celebration-verse-text');
    const celebrationVerseRef = document.getElementById('celebration-verse-ref');
    const btnCelebrationNext = document.getElementById('btn-celebration-next');
    const btnCelebrationListen = document.getElementById('btn-celebration-listen');

    // ==========================================
    // 5. WEB AUDIO SYNTHESIZER (FAST ZERO-DEPENDENCY SOUNDS)
    // ==========================================
    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) audioCtx = new AudioContextClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    }

    function playTone(freq, type, duration, delay = 0, gainLevel = 0.15) {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const startTime = ctx.currentTime + delay;

            osc.type = type;
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(gainLevel, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(startTime);
            osc.stop(startTime + duration);
        } catch (e) {}
    }

    function playCardPickupSound() { playTone(380, 'sine', 0.08, 0, 0.12); }
    function playCardDropSound() { playTone(320, 'triangle', 0.07, 0, 0.15); }
    function playSuccessChime() {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
            playTone(freq, 'sine', 0.28, idx * 0.09, 0.18);
        });
    }
    function playErrorBuzz() {
        playTone(220, 'sawtooth', 0.18, 0, 0.15);
        playTone(180, 'sawtooth', 0.2, 0.08, 0.12);
    }

    // ==========================================
    // 6. THEMES (BOYS & GIRLS)
    // ==========================================
    function applyTheme(themeName) {
        currentTheme = themeName;
        localStorage.setItem('quran_game_theme', themeName);

        if (themeName === 'theme-girls') {
            bodyEl.classList.remove('theme-boys');
            bodyEl.classList.add('theme-girls');
            btnThemeGirls.classList.add('active');
            btnThemeGirls.setAttribute('aria-pressed', 'true');
            btnThemeBoys.classList.remove('active');
            btnThemeBoys.setAttribute('aria-pressed', 'false');

            mascotAvatar.textContent = '👧';
            mascotText.textContent = 'مَرْحَبًا بِكِ يَا أَمِيرَةَ الْقُرْآنِ! رَتِّبِي الْكَلِمَاتِ لِتَفُوزِي! 🌸';
            celebrationHeading.textContent = 'مُمْتَازٌ جِدًّا يَا أَمِيرَةَ الْقُرْآنِ! 🌸';
            celebrationMessage.textContent = 'لَقَدْ رَتَّبْتِ كَلِمَاتِ الآيَةِ الْكَرِيمَةِ بِالشَّكْلِ الصَّحِيحِ!';
        } else {
            bodyEl.classList.remove('theme-girls');
            bodyEl.classList.add('theme-boys');
            btnThemeBoys.classList.add('active');
            btnThemeBoys.setAttribute('aria-pressed', 'true');
            btnThemeGirls.classList.remove('active');
            btnThemeGirls.setAttribute('aria-pressed', 'false');

            mascotAvatar.textContent = '🦸‍♂️';
            mascotText.textContent = 'مَرْحَبًا بِكَ يَا بَطَلَ الْقُرْآنِ! رَتِّبِ الْكَلِمَاتِ لِتَفُوزَ! ⭐';
            celebrationHeading.textContent = 'مُمْتَازٌ جِدًّا يَا بَطَلَ الْقُرْآنِ! 🌟';
            celebrationMessage.textContent = 'لَقَدْ رَتَّبْتَ كَلِمَاتِ الآيَةِ الْكَرِيمَةِ بِالشَّكْلِ الصَّحِيحِ!';
        }
    }

    // ==========================================
    // 7. SIDEBAR (ALL 30 JUZ)
    // ==========================================
    function renderJuzSidebar(juzList = ALL_30_JUZ) {
        juzItemsContainer.innerHTML = '';

        if (juzList.length === 0) {
            juzItemsContainer.innerHTML = '<div style="text-align:center; padding: 24px; color:#94a3b8; font-weight:700;">لَا تُوجَدُ نَتَائِجُ مُطَابِقَةٌ لِلْبَحْثِ 🔍</div>';
            return;
        }

        juzList.forEach(juz => {
            const isCurrentJuz = (juz.number === currentJuzNumber);
            const card = document.createElement('div');
            card.className = `juz-accordion-card ${isCurrentJuz ? 'active-juz expanded' : ''}`;
            card.id = `juz-card-${juz.number}`;

            // Card Header
            const header = document.createElement('div');
            header.className = 'juz-card-header';
            header.innerHTML = `
                <div class="juz-header-info">
                    <span class="juz-number-badge">📖 ${juz.name}</span>
                    <span class="juz-surahs-summary">${juz.surahsSummary}</span>
                </div>
                <span class="juz-expand-arrow">▼</span>
            `;

            // Surahs List inside this Juz
            const surahsList = document.createElement('div');
            surahsList.className = 'juz-surahs-list';

            juz.surahs.forEach(surah => {
                const isCurrentSurah = (surah.number === currentSurahNumber);
                const surahBtn = document.createElement('button');
                surahBtn.type = 'button';
                surahBtn.className = `surah-item-btn ${isCurrentSurah ? 'current-surah' : ''}`;
                surahBtn.innerHTML = `
                    <span>${surah.name}</span>
                    <span class="surah-ayah-count">${surah.totalAyahs} آيَة</span>
                `;

                surahBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectSurahFromSidebar(juz.number, surah.number, surah.startAyah);
                });

                surahsList.appendChild(surahBtn);
            });

            // Toggle Accordion on header click
            header.addEventListener('click', () => {
                const wasExpanded = card.classList.contains('expanded');
                // Close other cards for clean accordion feel
                document.querySelectorAll('.juz-accordion-card').forEach(c => c.classList.remove('expanded'));
                if (!wasExpanded) {
                    card.classList.add('expanded');
                }
            });

            card.appendChild(header);
            card.appendChild(surahsList);
            juzItemsContainer.appendChild(card);
        });
    }

    function selectSurahFromSidebar(juzNum, surahNum, startAyah = 1) {
        currentJuzNumber = juzNum;
        currentSurahNumber = surahNum;
        currentAyahNumber = startAyah;

        currentJuzBadge.textContent = `جُزْءُ ${currentJuzNumber}`;

        updateTopNavSelectors();
        loadCurrentAyah();

        // Close sidebar if on small screen
        if (window.innerWidth < 1024) {
            closeSidebar();
        } else {
            renderJuzSidebar();
        }
    }

    function openSidebar() {
        juzSidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        btnToggleSidebar.setAttribute('aria-expanded', 'true');
    }

    function closeSidebar() {
        juzSidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        btnToggleSidebar.setAttribute('aria-expanded', 'false');
    }

    // Filter Chips Handling
    function setupFilterChips() {
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');

                const filterType = tag.getAttribute('data-filter');
                if (filterType === 'juz30') {
                    renderJuzSidebar(ALL_30_JUZ.filter(j => j.number === 30));
                } else if (filterType === 'juz29') {
                    renderJuzSidebar(ALL_30_JUZ.filter(j => j.number === 29));
                } else if (filterType === 'short') {
                    renderJuzSidebar(ALL_30_JUZ.filter(j => j.number >= 28));
                } else {
                    renderJuzSidebar(ALL_30_JUZ);
                }
            });
        });

        // Search Input in Sidebar
        juzSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!query) {
                renderJuzSidebar(ALL_30_JUZ);
                return;
            }

            const filtered = ALL_30_JUZ.filter(j => {
                const matchName = j.name.toLowerCase().includes(query);
                const matchNum = j.number.toString() === query;
                const matchSurah = j.surahs.some(s => s.name.toLowerCase().includes(query));
                return matchName || matchNum || matchSurah;
            });

            renderJuzSidebar(filtered);
        });
    }

    // ==========================================
    // 8. TOP SELECTORS INITIALIZATION
    // ==========================================
    function getSurahObj(surahNum) {
        for (const juz of ALL_30_JUZ) {
            const s = juz.surahs.find(item => item.number === surahNum);
            if (s) return s;
        }
        return { number: surahNum, name: "سورة", startAyah: 1, endAyah: 7, totalAyahs: 7 };
    }

    function updateTopNavSelectors() {
        // Find surahs in current Juz
        const currentJuzObj = ALL_30_JUZ.find(j => j.number === currentJuzNumber) || ALL_30_JUZ[29];

        surahSelect.innerHTML = '';
        currentJuzObj.surahs.forEach(surah => {
            const opt = document.createElement('option');
            opt.value = surah.number;
            opt.textContent = surah.name;
            if (surah.number === currentSurahNumber) opt.selected = true;
            surahSelect.appendChild(opt);
        });

        updateAyahDropdown();
    }

    function updateAyahDropdown() {
        ayahSelect.innerHTML = '';
        const surahObj = getSurahObj(currentSurahNumber);
        const count = surahObj.totalAyahs || 7;

        for (let i = 1; i <= count; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = `الآيَةُ ${i}`;
            if (i === currentAyahNumber) opt.selected = true;
            ayahSelect.appendChild(opt);
        }
    }

    // ==========================================
    // 9. AYAH LOADING (OFFLINE + QURAN.COM API v4 FALLBACK)
    // ==========================================
    async function loadCurrentAyah() {
        isSolved = false;
        btnNextAyah.style.display = 'none';
        btnCheck.style.display = 'flex';
        feedbackToast.className = 'feedback-toast';
        feedbackToast.style.display = 'none';

        const surahObj = getSurahObj(currentSurahNumber);
        badgeSurah.textContent = surahObj.name;
        badgeAyah.textContent = `الآيَةُ ${currentAyahNumber}`;
        scoreVal.textContent = currentScore;
        currentJuzBadge.textContent = `جُزْءُ ${currentJuzNumber}`;

        const key = `${currentSurahNumber}:${currentAyahNumber}`;

        if (BUILTIN_AYAT_DB[key]) {
            currentAyahData = BUILTIN_AYAT_DB[key];
            buildGameZones(currentAyahData);
            setupAudioPlayer();
            return;
        }

        // Show loading state while fetching from Quran.com API v4
        targetDropzone.innerHTML = '<div style="color:#64748b; font-weight:700;">جَارٍ تَحْمِيلُ كَلِمَاتِ الآيَةِ الْكَرِيمَةِ... ⏳</div>';
        sourcePool.innerHTML = '';

        try {
            const resp = await fetch(`https://api.quran.com/api/v4/verses/by_key/${key}?words=true&word_fields=text_uthmani,audio_url`);
            if (resp.ok) {
                const data = await resp.json();
                const verse = data.verse;
                const words = verse.words
                    .filter(w => w.char_type_name === 'word')
                    .map(w => w.text_uthmani);

                currentAyahData = {
                    text: verse.words.map(w => w.text_uthmani).join(' '),
                    words: words
                };
                BUILTIN_AYAT_DB[key] = currentAyahData; // Cache it
                buildGameZones(currentAyahData);
                setupAudioPlayer();
                return;
            }
        } catch (err) {
            console.warn("Quran.com API fetch error, using fallback text generator:", err);
        }

        // Fallback placeholder words if network offline
        currentAyahData = {
            text: `آية ${currentAyahNumber} من ${surahObj.name}`,
            words: ["بِسْمِ", "اللَّهِ", "الرَّحْمَٰنِ", "الرَّحِيمِ"]
        };
        buildGameZones(currentAyahData);
        setupAudioPlayer();
    }

    // ==========================================
    // 10. DRAG & DROP ZONES & NUMBERED SLOTS
    // ==========================================
    function buildGameZones(ayahData) {
        targetDropzone.innerHTML = '';
        sourcePool.innerHTML = '';

        const wordCount = ayahData.words.length;

        // 1. Build Target Numbered Slots (خانات الترتيب المرقمة)
        for (let i = 0; i < wordCount; i++) {
            const slot = document.createElement('div');
            slot.className = 'target-slot slot-empty';
            slot.dataset.slotIndex = i;
            slot.setAttribute('data-slot-num', toArabicNumerals(i + 1));
            slot.setAttribute('aria-label', `خانة رقم ${i + 1}`);

            // Desktop Dragover on Slot
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.classList.add('slot-drag-over');
            });

            slot.addEventListener('dragleave', () => {
                slot.classList.remove('slot-drag-over');
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('slot-drag-over');
                if (!draggedCard) return;

                placeCardInSlot(draggedCard, slot);
            });

            targetDropzone.appendChild(slot);
        }

        // 2. Scramble Words for Pool
        let scrambled = [...ayahData.words];
        if (scrambled.length > 1) {
            let attempts = 0;
            do {
                scrambled = shuffleArray([...ayahData.words]);
                attempts++;
            } while (arraysEqual(scrambled, ayahData.words) && attempts < 10);
        }

        // 3. Build Word Cards in Pool
        scrambled.forEach((wordText, index) => {
            const card = createWordCard(wordText, `word-${index}`);
            sourcePool.appendChild(card);
        });
    }

    function toArabicNumerals(num) {
        const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return num.toString().split('').map(d => arabicDigits[parseInt(d, 10)]).join('');
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    // ==========================================
    // 11. WORD CARD CREATION & DRAG-AND-DROP LOGIC
    // ==========================================
    let draggedCard = null;

    function createWordCard(wordText, id) {
        const card = document.createElement('div');
        card.className = 'word-card';
        card.id = id;
        card.setAttribute('draggable', 'true');
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `كلمة ${wordText}`);

        // Card Content: Drag Handle + Arabic Tashkeel Text
        card.innerHTML = `
            <span class="card-drag-handle" title="اسحب الكلمة">⠿</span>
            <span class="card-word-text">${wordText}</span>
        `;

        // Click / Tap Event: Auto move to next empty slot or return to pool
        card.addEventListener('click', () => {
            if (isSolved) return;
            handleCardClick(card);
        });

        // Desktop HTML5 DnD Handlers
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);

        // Mobile Pointer / Touch DnD Handlers
        card.addEventListener('pointerdown', handlePointerDown);

        return card;
    }

    function placeCardInSlot(card, targetSlot) {
        const existingCardInSlot = targetSlot.querySelector('.word-card');
        const oldParent = card.parentElement;

        if (existingCardInSlot && existingCardInSlot !== card) {
            // Swap: move existing card to old parent or pool
            if (oldParent && oldParent.classList.contains('target-slot')) {
                oldParent.appendChild(existingCardInSlot);
                oldParent.classList.remove('slot-empty');
            } else {
                sourcePool.appendChild(existingCardInSlot);
            }
        } else if (oldParent && oldParent.classList.contains('target-slot') && oldParent !== targetSlot) {
            oldParent.classList.add('slot-empty');
        }

        targetSlot.appendChild(card);
        targetSlot.classList.remove('slot-empty');
        playCardDropSound();
        updateSlotsEmptyState();
        clearCardFeedback();
    }

    function returnCardToPool(card) {
        const oldParent = card.parentElement;
        if (oldParent && oldParent.classList.contains('target-slot')) {
            oldParent.classList.add('slot-empty');
        }
        sourcePool.appendChild(card);
        playCardPickupSound();
        updateSlotsEmptyState();
        clearCardFeedback();
    }

    function handleCardClick(card) {
        const parent = card.parentElement;

        if (parent === sourcePool) {
            // Find first empty target slot
            const emptySlot = targetDropzone.querySelector('.target-slot.slot-empty');
            if (emptySlot) {
                placeCardInSlot(card, emptySlot);
            }
        } else if (parent && parent.classList.contains('target-slot')) {
            // Return to pool
            returnCardToPool(card);
        }
    }

    function updateSlotsEmptyState() {
        const slots = targetDropzone.querySelectorAll('.target-slot');
        slots.forEach(slot => {
            if (slot.querySelector('.word-card')) {
                slot.classList.remove('slot-empty');
            } else {
                slot.classList.add('slot-empty');
            }
        });
    }

    function clearCardFeedback() {
        document.querySelectorAll('.word-card').forEach(c => {
            c.classList.remove('card-correct', 'card-wrong');
        });
        feedbackToast.style.display = 'none';
    }

    // ==========================================
    // 12. DESKTOP HTML5 DRAG AND DROP
    // ==========================================
    function handleDragStart(e) {
        if (isSolved) {
            e.preventDefault();
            return;
        }
        draggedCard = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.id);
        playCardPickupSound();
    }

    function handleDragEnd() {
        if (draggedCard) {
            draggedCard.classList.remove('dragging');
            draggedCard = null;
        }
        document.querySelectorAll('.target-slot').forEach(s => s.classList.remove('slot-drag-over'));
        sourcePool.classList.remove('drag-over');
        updateSlotsEmptyState();
    }

    // Pool zone dragover & drop
    sourcePool.addEventListener('dragover', (e) => {
        e.preventDefault();
        sourcePool.classList.add('drag-over');
    });

    sourcePool.addEventListener('dragleave', () => {
        sourcePool.classList.remove('drag-over');
    });

    sourcePool.addEventListener('drop', (e) => {
        e.preventDefault();
        sourcePool.classList.remove('drag-over');
        if (!draggedCard) return;
        returnCardToPool(draggedCard);
    });

    // ==========================================
    // 13. TOUCH / MOBILE DRAG AND DROP
    // ==========================================
    function handlePointerDown(e) {
        if (isSolved || e.pointerType === 'mouse') return;

        const card = this;
        touchDragElement = card;
        touchStartX = e.clientX;
        touchStartY = e.clientY;
        isDraggingTouch = false;

        card.setPointerCapture(e.pointerId);

        const onPointerMove = (moveEvent) => {
            const dx = moveEvent.clientX - touchStartX;
            const dy = moveEvent.clientY - touchStartY;

            if (!isDraggingTouch && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
                isDraggingTouch = true;
                playCardPickupSound();
                card.classList.add('dragging');

                touchGhostElement = card.cloneNode(true);
                touchGhostElement.className = 'word-card drag-touch-ghost';
                touchGhostElement.style.width = `${card.offsetWidth}px`;
                document.body.appendChild(touchGhostElement);
            }

            if (isDraggingTouch && touchGhostElement) {
                touchGhostElement.style.left = `${moveEvent.clientX}px`;
                touchGhostElement.style.top = `${moveEvent.clientY}px`;

                const elemBelow = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
                const slotBelow = elemBelow ? elemBelow.closest('.target-slot') : null;

                document.querySelectorAll('.target-slot').forEach(s => s.classList.remove('slot-drag-over'));
                if (slotBelow) slotBelow.classList.add('slot-drag-over');
            }
        };

        const onPointerUp = (upEvent) => {
            card.releasePointerCapture(e.pointerId);
            card.removeEventListener('pointermove', onPointerMove);
            card.removeEventListener('pointerup', onPointerUp);
            card.removeEventListener('pointercancel', onPointerUp);

            if (isDraggingTouch) {
                card.classList.remove('dragging');
                if (touchGhostElement && touchGhostElement.parentNode) {
                    touchGhostElement.parentNode.removeChild(touchGhostElement);
                }
                touchGhostElement = null;

                const elemBelow = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
                const slotBelow = elemBelow ? elemBelow.closest('.target-slot') : null;
                const poolBelow = elemBelow ? elemBelow.closest('.words-pool-box') : null;

                if (slotBelow) {
                    placeCardInSlot(card, slotBelow);
                } else if (poolBelow) {
                    returnCardToPool(card);
                }

                document.querySelectorAll('.target-slot').forEach(s => s.classList.remove('slot-drag-over'));
                updateSlotsEmptyState();
            }

            touchDragElement = null;
            isDraggingTouch = false;
        };

        card.addEventListener('pointermove', onPointerMove);
        card.addEventListener('pointerup', onPointerUp);
        card.addEventListener('pointercancel', onPointerUp);
    }

    // ==========================================
    // 14. AUDIO RECITATION (EVERYAYAH / QURAN.COM)
    // ==========================================
    function formatAudioId(surahNum, ayahNum) {
        const s = String(surahNum).padStart(3, '0');
        const a = String(ayahNum).padStart(3, '0');
        return `${s}${a}`;
    }

    function setupAudioPlayer() {
        const audioKey = formatAudioId(currentSurahNumber, currentAyahNumber);
        audioPlayer.src = `https://everyayah.com/data/Alafasy_128kbps/${audioKey}.mp3`;
        audioPlayer.load();

        btnListen.classList.remove('playing');
        btnListen.querySelector('span:first-child').textContent = 'اسْتَمِعْ لِلآيَةِ';
    }

    function toggleAudio() {
        if (audioPlayer.paused) {
            audioPlayer.play().then(() => {
                btnListen.classList.add('playing');
                btnListen.querySelector('span:first-child').textContent = 'جَارٍ الِاسْتِمَاعُ...';
            }).catch(() => {
                showToast('تَعَذَّرَ تَشْغِيلُ الصَّوْتِ (تَأَكَّدْ مِنَ الِاتِّصَالِ بِالْإِنْتَرْنِت)', 'error');
            });
        } else {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            btnListen.classList.remove('playing');
            btnListen.querySelector('span:first-child').textContent = 'اسْتَمِعْ لِلآيَةِ';
        }
    }

    audioPlayer.addEventListener('ended', () => {
        btnListen.classList.remove('playing');
        btnListen.querySelector('span:first-child').textContent = 'اسْتَمِعْ لِلآيَةِ';
    });

    // ==========================================
    // 15. CHECK ANSWER & VALIDATION
    // ==========================================
    function checkAnswer() {
        if (!currentAyahData) return;

        const expectedWords = currentAyahData.words;
        const slots = [...targetDropzone.querySelectorAll('.target-slot')];

        // 1. Check if all slots are filled
        const emptySlots = slots.filter(s => !s.querySelector('.word-card'));
        if (emptySlots.length > 0) {
            showToast('يُرْجَى مَلْءُ جَمِيعِ الْخَانَاتِ بِالْكَلِمَاتِ أَوَّلًا! 📥', 'info');
            playErrorBuzz();
            return;
        }

        // 2. Collect placed words
        const placedWords = slots.map(s => {
            const card = s.querySelector('.word-card');
            const textElem = card ? card.querySelector('.card-word-text') : null;
            return textElem ? textElem.textContent.trim() : (card ? card.textContent.trim() : '');
        });

        const isCorrect = arraysEqual(placedWords, expectedWords);

        if (isCorrect) {
            // === CORRECT ===
            isSolved = true;
            playSuccessChime();

            slots.forEach(s => {
                const c = s.querySelector('.word-card');
                if (c) c.classList.add('card-correct');
            });

            currentScore += 10;
            scoreVal.textContent = currentScore;

            const successGreeting = (currentTheme === 'theme-girls') ? 'أَحْسَنْتِ يَا أَمِيرَةَ الْقُرْآنِ! 🌸' : 'أَحْسَنْتَ يَا بَطَلَ الْقُرْآنِ! 🌟';
            showToast(`مُمْتَازٌ! إِجَابَةٌ صَحِيحَةٌ! ${successGreeting}`, 'success');

            launchConfetti();

            setTimeout(() => {
                audioPlayer.play().catch(() => {});
            }, 300);

            btnCheck.style.display = 'none';
            btnNextAyah.style.display = 'flex';

            setTimeout(() => {
                openCelebrationModal();
            }, 800);

        } else {
            // === INCORRECT ===
            playErrorBuzz();
            slots.forEach(s => {
                const c = s.querySelector('.word-card');
                if (c) c.classList.add('card-wrong');
            });

            const retryGreeting = (currentTheme === 'theme-girls') ? 'حَاوِلِي مَرَّةً أُخْرَى يَا أَمِيرَةُ! 💪🌸' : 'حَاوِلْ مَرَّةً أُخْرَى يَا بَطَلُ! 💪⭐';
            showToast(`التَّرْتِيبُ غَيْرُ صَحِيحٍ، ${retryGreeting}`, 'error');

            setTimeout(() => {
                slots.forEach(s => {
                    const c = s.querySelector('.word-card');
                    if (c) c.classList.remove('card-wrong');
                });
            }, 700);
        }
    }

    function showToast(message, type) {
        feedbackToast.textContent = message;
        feedbackToast.className = `feedback-toast ${type}`;
        feedbackToast.style.display = 'block';
    }

    // ==========================================
    // 16. CELEBRATION MODAL & NAVIGATION
    // ==========================================
    function openCelebrationModal() {
        const surahObj = getSurahObj(currentSurahNumber);
        celebrationVerseText.textContent = currentAyahData.text;
        celebrationVerseRef.textContent = `${surahObj.name} - الآيَةُ ${currentAyahNumber}`;
        celebrationModal.classList.add('open');
        celebrationModal.setAttribute('aria-hidden', 'false');
    }

    function closeCelebrationModal() {
        celebrationModal.classList.remove('open');
        celebrationModal.setAttribute('aria-hidden', 'true');
    }

    function goToNextAyah() {
        closeCelebrationModal();
        const surahObj = getSurahObj(currentSurahNumber);

        if (currentAyahNumber < surahObj.totalAyahs) {
            currentAyahNumber++;
        } else {
            // Next Surah in current Juz
            const juzObj = ALL_30_JUZ.find(j => j.number === currentJuzNumber) || ALL_30_JUZ[29];
            const currentIdx = juzObj.surahs.findIndex(s => s.number === currentSurahNumber);

            if (currentIdx + 1 < juzObj.surahs.length) {
                const nextSurah = juzObj.surahs[currentIdx + 1];
                currentSurahNumber = nextSurah.number;
                currentAyahNumber = 1;
            } else {
                // Next Juz
                currentJuzNumber = (currentJuzNumber % 30) + 1;
                const nextJuzObj = ALL_30_JUZ.find(j => j.number === currentJuzNumber);
                currentSurahNumber = nextJuzObj.surahs[0].number;
                currentAyahNumber = 1;
            }
        }

        updateTopNavSelectors();
        loadCurrentAyah();
        renderJuzSidebar();
    }

    // ==========================================
    // 17. CANVAS CONFETTI
    // ==========================================
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let particles = [];
    let confettiAnimationId = null;

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function launchConfetti() {
        if (!ctx) return;
        particles = [];
        const colors = currentTheme === 'theme-girls'
            ? ['#ec4899', '#f43f5e', '#a855f7', '#fbbf24', '#ffffff', '#f472b6']
            : ['#0284c7', '#22c55e', '#f59e0b', '#7c3aed', '#ffffff', '#38bdf8'];

        for (let i = 0; i < 90; i++) {
            particles.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 300,
                y: canvas.height / 2 + (Math.random() - 0.5) * 100,
                vx: (Math.random() - 0.5) * 14,
                vy: (Math.random() - 1.2) * 14,
                size: Math.random() * 9 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 12,
                opacity: 1
            });
        }

        if (!confettiAnimationId) animateConfetti();
    }

    function animateConfetti() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.25;
            p.rotation += p.rotSpeed;
            p.opacity -= 0.009;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });

        particles = particles.filter(p => p.opacity > 0 && p.y < canvas.height + 50);

        if (particles.length > 0) {
            confettiAnimationId = requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confettiAnimationId = null;
        }
    }

    // ==========================================
    // 18. EVENT LISTENERS
    // ==========================================
    // Sidebar Controls
    btnToggleSidebar.addEventListener('click', openSidebar);
    btnCloseSidebar.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Themes
    btnThemeBoys.addEventListener('click', () => applyTheme('theme-boys'));
    btnThemeGirls.addEventListener('click', () => applyTheme('theme-girls'));

    // Top Selectors
    surahSelect.addEventListener('change', (e) => {
        currentSurahNumber = parseInt(e.target.value, 10);
        currentAyahNumber = 1;
        updateAyahDropdown();
        loadCurrentAyah();
        renderJuzSidebar();
    });

    ayahSelect.addEventListener('change', (e) => {
        currentAyahNumber = parseInt(e.target.value, 10);
        loadCurrentAyah();
    });

    // Control Buttons
    btnListen.addEventListener('click', toggleAudio);
    btnReset.addEventListener('click', () => {
        playCardPickupSound();
        loadCurrentAyah();
    });
    btnCheck.addEventListener('click', checkAnswer);
    btnNextAyah.addEventListener('click', goToNextAyah);

    // Modal
    btnCelebrationNext.addEventListener('click', goToNextAyah);
    btnCelebrationListen.addEventListener('click', () => {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    });

    celebrationModal.addEventListener('click', (e) => {
        if (e.target === celebrationModal) closeCelebrationModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (celebrationModal.classList.contains('open')) {
                goToNextAyah();
            } else if (btnNextAyah.style.display !== 'none') {
                goToNextAyah();
            } else {
                checkAnswer();
            }
        }
    });

    // ==========================================
    // 19. APP BOOTSTRAP
    // ==========================================
    applyTheme(currentTheme);
    setupFilterChips();
    renderJuzSidebar();
    updateTopNavSelectors();
    loadCurrentAyah();

})();
