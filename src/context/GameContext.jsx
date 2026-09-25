import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { JUZ_DATA, SURAH_LIST } from '../data/quranData.js';
import { loadVerseWords, getAyahAudioUrl } from '../services/quranService.js';
import { calculateCompletionScore, getRankByScore } from '../services/scoringService.js';
import audioService from '../services/audioService.js';
import { formatDuration } from '../utils/timeUtils.js';
import { getStoredNumber, setStoredNumber } from '../utils/storageUtils.js';

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  // Navigation State
  const [currentJuz, setCurrentJuz] = useState(30);
  const [currentSurah, setCurrentSurah] = useState(112); // Al-Ikhlaas
  const [currentAyah, setCurrentAyah] = useState(1);
  const [totalAyahs, setTotalAyahs] = useState(4);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Puzzle State
  const [words, setWords] = useState([]);
  const [bankWords, setBankWords] = useState([]);
  const [placedSlots, setPlacedSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hintWordId, setHintWordId] = useState(null);
  const [playingWordId, setPlayingWordId] = useState(null);

  // Metrics & Score
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => getStoredNumber('quran_app_best_score', 0));
  const [streak, setStreak] = useState(0);
  const [rankTitle, setRankTitle] = useState('طالب العلم');
  const [scoreBump, setScoreBump] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  // Audio Settings
  const [isAyahPlaying, setIsAyahPlaying] = useState(false);
  const [autoPlayWordVoice, setAutoPlayWordVoice] = useState(true);

  // Modals & Feedback
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [modal, setModal] = useState({
    isOpen: false,
    verseArabic: '',
    pointsEarned: 0,
    totalScore: 0,
    timeTaken: '0:00',
    hintsUsed: 0
  });

  const confettiRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const currentJuzObj = JUZ_DATA.find((j) => j.number === currentJuz) || JUZ_DATA[29];
  const currentSurahObj = SURAH_LIST.find((s) => s.number === currentSurah) || SURAH_LIST[111];

  // Toast Helper
  const showToast = useCallback((message, type = 'info') => {
    setToast({ show: true, message, type });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2800);
  }, []);

  // Score Updater
  const addScore = useCallback((points) => {
    setScore((prev) => {
      const nextScore = prev + points;
      setBestScore((prevBest) => {
        if (nextScore > prevBest) {
          setStoredNumber('quran_app_best_score', nextScore);
          return nextScore;
        }
        return prevBest;
      });
      setStoredNumber('quran_app_score', nextScore);
      setRankTitle(getRankByScore(nextScore));
      return nextScore;
    });

    setScoreBump(true);
    setTimeout(() => setScoreBump(false), 500);
  }, []);

  // Audio Handlers
  const stopAyahAudio = useCallback(() => {
    audioService.stopAyah();
    setIsAyahPlaying(false);
  }, []);

  const playAyahAudio = useCallback(() => {
    const url = getAyahAudioUrl(currentSurah, currentAyah);
    audioService
      .playAyah(
        url,
        () => setIsAyahPlaying(false),
        () => {
          setIsAyahPlaying(false);
          showToast('تعذر تشغيل التلاوة الصوتية', 'error');
        }
      )
      .then(() => setIsAyahPlaying(true))
      .catch((err) => {
        console.warn('Ayah playback error:', err);
        showToast('تعذر تشغيل التلاوة الصوتية', 'error');
      });
  }, [currentSurah, currentAyah, showToast]);

  const toggleAyahAudio = useCallback(() => {
    if (isAyahPlaying) {
      stopAyahAudio();
    } else {
      playAyahAudio();
    }
  }, [isAyahPlaying, stopAyahAudio, playAyahAudio]);

  const playWordVoice = useCallback((word) => {
    if (!word || !word.arabic) return;
    setPlayingWordId(word.id);
    audioService.playWord(word, () => setPlayingWordId(null));
  }, []);

  // Verse Loader
  const loadAyah = useCallback(
    async (surahNum, ayahNum) => {
      stopAyahAudio();
      setIsLoading(true);
      setPlacedSlots([]);
      setBankWords([]);

      const surahMeta = SURAH_LIST.find((s) => s.number === surahNum);
      setTotalAyahs(surahMeta ? surahMeta.ayahs : 4);

      try {
        const parsedWords = await loadVerseWords(surahNum, ayahNum);
        setWords(parsedWords);
        setPlacedSlots(new Array(parsedWords.length).fill(null));
        setBankWords([...parsedWords].sort(() => Math.random() - 0.5));
        setHintsUsed(0);
        setStartTime(Date.now());
      } catch (err) {
        console.error('Failed to load verse:', err);
        showToast('تعذر تحميل كلمات الآية، يرجى التحقق من اتصال الإنترنت.', 'error');
      } finally {
        setIsLoading(false);
      }
    },
    [stopAyahAudio, showToast]
  );

  useEffect(() => {
    loadAyah(112, 1);
  }, [loadAyah]);

  // Navigation Handlers
  const selectJuz = useCallback(
    (juzNumber) => {
      setCurrentJuz(juzNumber);
      const juzObj = JUZ_DATA.find((j) => j.number === juzNumber) || JUZ_DATA[29];
      setCurrentSurah(juzObj.startSurah);
      setCurrentAyah(juzObj.startAyah);
      loadAyah(juzObj.startSurah, juzObj.startAyah);
    },
    [loadAyah]
  );

  const changeSurah = useCallback(
    (surahNumber) => {
      setCurrentSurah(surahNumber);
      setCurrentAyah(1);
      loadAyah(surahNumber, 1);
    },
    [loadAyah]
  );

  const changeAyah = useCallback(
    (ayahNumber) => {
      setCurrentAyah(ayahNumber);
      loadAyah(currentSurah, ayahNumber);
    },
    [currentSurah, loadAyah]
  );

  const prevAyah = useCallback(() => {
    if (currentAyah > 1) {
      changeAyah(currentAyah - 1);
    } else if (currentSurah > 1) {
      const prevSurahObj = SURAH_LIST.find((s) => s.number === currentSurah - 1);
      if (prevSurahObj) {
        setCurrentSurah(currentSurah - 1);
        setCurrentAyah(prevSurahObj.ayahs);
        loadAyah(currentSurah - 1, prevSurahObj.ayahs);
      }
    }
  }, [currentAyah, currentSurah, changeAyah, loadAyah]);

  const nextAyah = useCallback(() => {
    if (currentAyah < totalAyahs) {
      changeAyah(currentAyah + 1);
    } else if (currentSurah < 114) {
      setCurrentSurah(currentSurah + 1);
      setCurrentAyah(1);
      loadAyah(currentSurah + 1, 1);
    }
  }, [currentAyah, totalAyahs, currentSurah, changeAyah, loadAyah]);

  // Game Mechanics
  const placeWordInSlot = useCallback(
    (word, targetSlotIndex) => {
      setPlacedSlots((prevSlots) => {
        const nextSlots = [...prevSlots];
        const prevIdx = nextSlots.findIndex((w) => w && w.id === word.id);
        if (prevIdx !== -1) {
          nextSlots[prevIdx] = null;
        }

        const existingWord = nextSlots[targetSlotIndex];
        if (existingWord && existingWord.id !== word.id) {
          setBankWords((prevBank) => [...prevBank, existingWord]);
        }

        nextSlots[targetSlotIndex] = word;
        return nextSlots;
      });

      setBankWords((prevBank) => prevBank.filter((w) => w.id !== word.id));

      if (autoPlayWordVoice) {
        playWordVoice(word);
      }
    },
    [autoPlayWordVoice, playWordVoice]
  );

  const handleWordClick = useCallback(
    (word) => {
      if (autoPlayWordVoice) {
        playWordVoice(word);
      }
      const firstEmptyIndex = placedSlots.findIndex((s) => s === null);
      if (firstEmptyIndex === -1) {
        showToast('جميع الأماكن ممتلئة! اضغط على "تَحَقَّقْ مِنَ الإِجَابَةِ" أو أعد ترتيب الكلمات.', 'info');
        return;
      }
      placeWordInSlot(word, firstEmptyIndex);
    },
    [autoPlayWordVoice, playWordVoice, placedSlots, showToast, placeWordInSlot]
  );

  const handleSlotClick = useCallback(
    (word, slotIdx) => {
      if (autoPlayWordVoice) {
        playWordVoice(word);
      }
      setPlacedSlots((prevSlots) => {
        const nextSlots = [...prevSlots];
        nextSlots[slotIdx] = null;
        return nextSlots;
      });
      setBankWords((prevBank) => [...prevBank, word]);
    },
    [autoPlayWordVoice, playWordVoice]
  );

  const resetAyah = useCallback(() => {
    stopAyahAudio();
    setPlacedSlots(new Array(words.length).fill(null));
    setBankWords([...words].sort(() => Math.random() - 0.5));
    showToast('تمت إعادة الترتيب وإرجاع الكلمات بنجاح.', 'info');
  }, [stopAyahAudio, words, showToast]);

  const giveHint = useCallback(() => {
    let targetIndex = -1;
    for (let i = 0; i < words.length; i++) {
      const placed = placedSlots[i];
      if (!placed || placed.originalIndex !== i) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex === -1) {
      showToast('جميع الكلمات مرتبة بالترتيب الصحيح بالفعل! 🎉', 'info');
      return;
    }

    const correctWord = words[targetIndex];
    setHintsUsed((prev) => prev + 1);
    setHintWordId(correctWord.id);
    playWordVoice(correctWord);

    setTimeout(() => {
      setHintWordId(null);
      placeWordInSlot(correctWord, targetIndex);
      showToast(`مساعدة: تم وضع كلمة "${correctWord.arabic}" في مكانها الصحيح`, 'info');
    }, 450);
  }, [words, placedSlots, showToast, playWordVoice, placeWordInSlot]);

  const checkAnswer = useCallback(() => {
    const placedCount = placedSlots.filter((w) => w !== null).length;
    const total = words.length;

    if (placedCount === 0) {
      showToast('اضغط على الكلمات من بنك الكلمات أو اسحبها لترتيبها أولاً!', 'info');
      return;
    }

    if (placedCount < total) {
      showToast(`يرجى ترتيب جميع الكلمات (${placedCount} من ${total}) قبل التحقق!`, 'error');
      return;
    }

    const isCorrect = placedSlots.every((w, idx) => w && w.originalIndex === idx);

    if (isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);

      const durationSeconds = Math.round((Date.now() - startTime) / 1000);
      const earnedPoints = calculateCompletionScore({
        hintsUsed,
        durationSeconds,
        streak: nextStreak
      });

      addScore(earnedPoints);
      showToast(`🎉 ما شاء الله! تم ترتيب الآية بنجاح (+${earnedPoints} نقطة)`, 'info');

      if (confettiRef.current) {
        confettiRef.current.fire(3500);
      }

      setTimeout(() => {
        playAyahAudio();
      }, 400);

      setTimeout(() => {
        setModal({
          isOpen: true,
          verseArabic: words.map((w) => w.arabic).join(' '),
          pointsEarned: earnedPoints,
          totalScore: score + earnedPoints,
          timeTaken: formatDuration(durationSeconds),
          hintsUsed
        });
      }, 700);
    } else {
      showToast('بعض الكلمات ليست في الترتيب الصحيح. حاول مجدداً أو استعن بالمساعدة!', 'error');
    }
  }, [placedSlots, words, streak, startTime, hintsUsed, addScore, showToast, playAyahAudio, score]);

  const toggleWordVoice = useCallback(() => {
    setAutoPlayWordVoice((prev) => {
      const next = !prev;
      showToast(next ? 'صوت الكلمة: مُفَعَّل' : 'صوت الكلمة: مُعَطَّل', 'info');
      return next;
    });
  }, [showToast]);

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const value = {
    currentJuz,
    currentSurah,
    currentAyah,
    totalAyahs,
    currentJuzObj,
    currentSurahObj,
    words,
    bankWords,
    placedSlots,
    isLoading,
    hintWordId,
    playingWordId,
    score,
    bestScore,
    streak,
    rankTitle,
    scoreBump,
    isAyahPlaying,
    autoPlayWordVoice,
    toast,
    modal,
    sidebarOpen,
    confettiRef,
    setSidebarOpen,
    selectJuz,
    changeSurah,
    changeAyah,
    prevAyah,
    nextAyah,
    placeWordInSlot,
    handleWordClick,
    handleSlotClick,
    resetAyah,
    giveHint,
    checkAnswer,
    playWordVoice,
    toggleAyahAudio,
    playAyahAudio,
    toggleWordVoice,
    closeModal,
    showToast
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;
