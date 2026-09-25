import React, { useState, useEffect, useRef, useCallback } from 'react';
import { JUZ_DATA, SURAH_LIST } from './data/quranData.js';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import GameBoard from './components/GameBoard.jsx';
import CelebrationModal from './components/CelebrationModal.jsx';
import Toast from './components/Toast.jsx';
import ConfettiCanvas from './components/ConfettiCanvas.jsx';

function App() {
  // Navigation State
  const [currentJuz, setCurrentJuz] = useState(30);
  const [currentSurah, setCurrentSurah] = useState(112); // Surah Al-Ikhlaas
  const [currentAyah, setCurrentAyah] = useState(1);
  const [totalAyahs, setTotalAyahs] = useState(4);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Game Board State
  const [words, setWords] = useState([]);
  const [bankWords, setBankWords] = useState([]);
  const [placedSlots, setPlacedSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hintWordId, setHintWordId] = useState(null);
  const [playingWordId, setPlayingWordId] = useState(null);

  // Game Metrics & Score
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('quran_app_best_score') || '0', 10);
  });
  const [streak, setStreak] = useState(0);
  const [rankTitle, setRankTitle] = useState('طالب العلم');
  const [scoreBump, setScoreBump] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  // Audio State
  const [isAyahPlaying, setIsAyahPlaying] = useState(false);
  const [autoPlayWordVoice, setAutoPlayWordVoice] = useState(true);

  // Modal & Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [modal, setModal] = useState({
    isOpen: false,
    verseArabic: '',
    pointsEarned: 0,
    totalScore: 0,
    timeTaken: '0:00',
    hintsUsed: 0
  });

  // Audio & Confetti Refs
  const confettiRef = useRef(null);
  const ayahAudioRef = useRef(new Audio());
  const wordAudioRef = useRef(new Audio());
  const toastTimeoutRef = useRef(null);

  const currentJuzObj = JUZ_DATA.find((j) => j.number === currentJuz) || JUZ_DATA[29];
  const currentSurahObj = SURAH_LIST.find((s) => s.number === currentSurah) || SURAH_LIST[111];

  // Helper: Toast notification
  const showToast = useCallback((message, type = 'info') => {
    setToast({ show: true, message, type });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2800);
  }, []);

  // Update Rank Title based on score
  const updateRank = useCallback((newScore) => {
    let rank = 'طالب العلم';
    if (newScore >= 2000) rank = 'حافظ متقن';
    else if (newScore >= 1000) rank = 'حافظ واعد';
    else if (newScore >= 400) rank = 'قارئ مجتهد';
    setRankTitle(rank);
  }, []);

  // Add Score with bump animation
  const addScore = useCallback(
    (points) => {
      setScore((prev) => {
        const nextScore = prev + points;
        setBestScore((prevBest) => {
          if (nextScore > prevBest) {
            localStorage.setItem('quran_app_best_score', nextScore.toString());
            return nextScore;
          }
          return prevBest;
        });
        localStorage.setItem('quran_app_score', nextScore.toString());
        updateRank(nextScore);
        return nextScore;
      });

      setScoreBump(true);
      setTimeout(() => setScoreBump(false), 500);
    },
    [updateRank]
  );

  // Stop Ayah Audio
  const stopAyahAudio = useCallback(() => {
    ayahAudioRef.current.pause();
    ayahAudioRef.current.currentTime = 0;
    setIsAyahPlaying(false);
  }, []);

  // Play Ayah Audio
  const playAyahAudio = useCallback(() => {
    const s = currentSurah.toString().padStart(3, '0');
    const a = currentAyah.toString().padStart(3, '0');
    const url = `https://verses.quran.com/Alafasy/mp3/${s}${a}.mp3`;

    ayahAudioRef.current.src = url;
    ayahAudioRef.current
      .play()
      .then(() => {
        setIsAyahPlaying(true);
      })
      .catch((err) => {
        console.warn('Ayah audio play error:', err);
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

  // SpeechSynthesis Fallback
  const speakArabicText = useCallback((text, wordId) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        utterance.onend = () => setPlayingWordId(null);
        utterance.onerror = () => setPlayingWordId(null);
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
        setPlayingWordId(null);
      }
    } else {
      setPlayingWordId(null);
    }
  }, []);

  // Play Word Voice
  const playWordVoice = useCallback(
    (word) => {
      if (!word || !word.arabic) return;
      setPlayingWordId(word.id);

      if (word.audioUrl) {
        try {
          wordAudioRef.current.pause();
          wordAudioRef.current.currentTime = 0;
          wordAudioRef.current.src = word.audioUrl;

          const playPromise = wordAudioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                wordAudioRef.current.onended = () => {
                  setPlayingWordId(null);
                };
              })
              .catch((err) => {
                console.warn('CDN audio failed, fallback to Arabic SpeechSynthesis:', err);
                speakArabicText(word.arabic, word.id);
              });
            return;
          }
        } catch (e) {
          console.warn('Word audio play error:', e);
        }
      }

      speakArabicText(word.arabic, word.id);
    },
    [speakArabicText]
  );

  // Setup Ayah Audio Listeners on mount
  useEffect(() => {
    const audioEl = ayahAudioRef.current;
    const handleEnded = () => {
      setIsAyahPlaying(false);
    };
    audioEl.addEventListener('ended', handleEnded);
    return () => {
      audioEl.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Fallback Ayah Fetcher
  const fallbackLoadAyah = useCallback(
    async (surahNum, ayahNum) => {
      try {
        const res = await fetch(
          `https://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}/quran-uthmani`
        );
        const data = await res.json();
        if (data.code === 200 && data.data) {
          let text = data.data.text;
          if (surahNum !== 1 && text.startsWith('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ')) {
            text = text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '').trim();
          }

          const rawTokens = text.trim().split(/\s+/).filter((t) => t.length > 0);
          const parsedWords = rawTokens.map((token, idx) => {
            const s = surahNum.toString().padStart(3, '0');
            const a = ayahNum.toString().padStart(3, '0');
            const p = (idx + 1).toString().padStart(3, '0');
            const constructedUrl = `https://audio.qurancdn.com/wbw/${s}_${a}_${p}.mp3`;

            return {
              id: `word-${surahNum}-${ayahNum}-${idx}`,
              originalIndex: idx,
              position: idx + 1,
              arabic: token,
              translation: '',
              transliteration: '',
              audioUrl: constructedUrl
            };
          });

          setWords(parsedWords);
          setPlacedSlots(new Array(parsedWords.length).fill(null));
          setBankWords([...parsedWords].sort(() => Math.random() - 0.5));
          setHintsUsed(0);
          setStartTime(Date.now());
        }
      } catch (fallbackErr) {
        console.error('Failed to load verse data:', fallbackErr);
        showToast('تعذر تحميل كلمات الآية، يرجى التحقق من اتصال الإنترنت.', 'error');
      }
    },
    [showToast]
  );

  // Main Verse Fetcher
  const loadAyah = useCallback(
    async (surahNum, ayahNum) => {
      stopAyahAudio();
      setIsLoading(true);
      setPlacedSlots([]);
      setBankWords([]);

      const surahMeta = SURAH_LIST.find((s) => s.number === surahNum);
      const total = surahMeta ? surahMeta.ayahs : 4;
      setTotalAyahs(total);

      try {
        const response = await fetch(
          `https://api.quran.com/api/v4/verses/by_key/${surahNum}:${ayahNum}?words=true&word_fields=audio_url,text_uthmani`
        );

        if (!response.ok) {
          throw new Error(`Quran.com API error: ${response.status}`);
        }

        const data = await response.json();
        const rawWords = data.verse.words || [];

        const parsedWords = rawWords
          .filter((w) => w.char_type_name === 'word')
          .map((w, idx) => {
            let audioUrl = null;
            if (w.audio_url) {
              audioUrl = w.audio_url.startsWith('http')
                ? w.audio_url
                : `https://audio.qurancdn.com/${w.audio_url}`;
            } else {
              const s = surahNum.toString().padStart(3, '0');
              const a = ayahNum.toString().padStart(3, '0');
              const p = (idx + 1).toString().padStart(3, '0');
              audioUrl = `https://audio.qurancdn.com/wbw/${s}_${a}_${p}.mp3`;
            }

            return {
              id: `word-${surahNum}-${ayahNum}-${idx}`,
              originalIndex: idx,
              position: w.position || idx + 1,
              arabic: w.text_uthmani || w.text,
              translation: w.translation ? w.translation.text : '',
              transliteration: w.transliteration ? w.transliteration.text : '',
              audioUrl: audioUrl
            };
          });

        setWords(parsedWords);
        setPlacedSlots(new Array(parsedWords.length).fill(null));
        setBankWords([...parsedWords].sort(() => Math.random() - 0.5));
        setHintsUsed(0);
        setStartTime(Date.now());
      } catch (err) {
        console.warn('Falling back to AlQuran Cloud API:', err);
        await fallbackLoadAyah(surahNum, ayahNum);
      } finally {
        setIsLoading(false);
      }
    },
    [stopAyahAudio, fallbackLoadAyah]
  );

  // Initial load
  useEffect(() => {
    loadAyah(112, 1);
  }, [loadAyah]);

  // Select Juz handler
  const handleSelectJuz = (juzNumber) => {
    setCurrentJuz(juzNumber);
    const juzObj = JUZ_DATA.find((j) => j.number === juzNumber) || JUZ_DATA[29];
    setCurrentSurah(juzObj.startSurah);
    setCurrentAyah(juzObj.startAyah);
    loadAyah(juzObj.startSurah, juzObj.startAyah);
  };

  // Change Surah handler
  const handleChangeSurah = (surahNumber) => {
    setCurrentSurah(surahNumber);
    setCurrentAyah(1);
    loadAyah(surahNumber, 1);
  };

  // Change Ayah handler
  const handleChangeAyah = (ayahNumber) => {
    setCurrentAyah(ayahNumber);
    loadAyah(currentSurah, ayahNumber);
  };

  // Previous Ayah
  const handlePrevAyah = () => {
    if (currentAyah > 1) {
      handleChangeAyah(currentAyah - 1);
    } else if (currentSurah > 1) {
      const prevSurahObj = SURAH_LIST.find((s) => s.number === currentSurah - 1);
      if (prevSurahObj) {
        setCurrentSurah(currentSurah - 1);
        setCurrentAyah(prevSurahObj.ayahs);
        loadAyah(currentSurah - 1, prevSurahObj.ayahs);
      }
    }
  };

  // Next Ayah
  const handleNextAyah = () => {
    if (currentAyah < totalAyahs) {
      handleChangeAyah(currentAyah + 1);
    } else if (currentSurah < 114) {
      setCurrentSurah(currentSurah + 1);
      setCurrentAyah(1);
      loadAyah(currentSurah + 1, 1);
    }
  };

  // Place word into a specific slot
  const placeWordInSlot = (word, targetSlotIndex) => {
    setPlacedSlots((prevSlots) => {
      const nextSlots = [...prevSlots];

      // If word was in another slot, clear that slot
      const prevIdx = nextSlots.findIndex((w) => w && w.id === word.id);
      if (prevIdx !== -1) {
        nextSlots[prevIdx] = null;
      }

      // If target slot already has a word, return it to bank
      const existingWord = nextSlots[targetSlotIndex];
      if (existingWord && existingWord.id !== word.id) {
        setBankWords((prevBank) => [...prevBank, existingWord]);
      }

      nextSlots[targetSlotIndex] = word;
      return nextSlots;
    });

    // Remove word from bank
    setBankWords((prevBank) => prevBank.filter((w) => w.id !== word.id));

    if (autoPlayWordVoice) {
      playWordVoice(word);
    }
  };

  // Click on word in bank -> Auto-place into first available slot
  const handleWordClick = (word) => {
    if (autoPlayWordVoice) {
      playWordVoice(word);
    }

    const firstEmptyIndex = placedSlots.findIndex((s) => s === null);
    if (firstEmptyIndex === -1) {
      showToast('جميع الأماكن ممتلئة! اضغط على "تَحَقَّقْ مِنَ الإِجَابَةِ" أو أعد ترتيب الكلمات.', 'info');
      return;
    }

    placeWordInSlot(word, firstEmptyIndex);
  };

  // Click on placed word in slot -> Return to bank
  const handleSlotClick = (word, slotIdx) => {
    if (autoPlayWordVoice) {
      playWordVoice(word);
    }

    setPlacedSlots((prevSlots) => {
      const nextSlots = [...prevSlots];
      nextSlots[slotIdx] = null;
      return nextSlots;
    });

    setBankWords((prevBank) => [...prevBank, word]);
  };

  // Reset Ayah
  const handleResetAyah = () => {
    stopAyahAudio();
    setPlacedSlots(new Array(words.length).fill(null));
    setBankWords([...words].sort(() => Math.random() - 0.5));
    showToast('تمت إعادة الترتيب وإرجاع الكلمات بنجاح.', 'info');
  };

  // Hint action
  const handleGiveHint = () => {
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

    // Glow animation
    setHintWordId(correctWord.id);
    playWordVoice(correctWord);

    setTimeout(() => {
      setHintWordId(null);
      placeWordInSlot(correctWord, targetIndex);
      showToast(`مساعدة: تم وضع كلمة "${correctWord.arabic}" في مكانها الصحيح`, 'info');
    }, 450);
  };

  // Verify answer
  const handleCheckAnswer = () => {
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
      // Completed successfully!
      const nextStreak = streak + 1;
      setStreak(nextStreak);

      const durationSeconds = Math.round((Date.now() - startTime) / 1000);
      const mins = Math.floor(durationSeconds / 60);
      const secs = durationSeconds % 60;
      const timeFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;

      // Score calculation
      const basePoints = 100;
      const accuracyBonus = hintsUsed === 0 ? 50 : Math.max(0, 50 - hintsUsed * 15);
      const speedBonus = durationSeconds < 25 ? 40 : durationSeconds < 50 ? 20 : 5;
      const streakMultiplier = nextStreak >= 5 ? 2.0 : nextStreak >= 3 ? 1.5 : 1.0;
      const earnedPoints = Math.round((basePoints + accuracyBonus + speedBonus) * streakMultiplier);

      addScore(earnedPoints);

      showToast(`🎉 ما شاء الله! تم ترتيب الآية بنجاح (+${earnedPoints} نقطة)`, 'info');

      // Fire confetti
      if (confettiRef.current) {
        confettiRef.current.fire(3500);
      }

      // Play full Ayah recitation
      setTimeout(() => {
        playAyahAudio();
      }, 400);

      // Open celebration modal
      setTimeout(() => {
        setModal({
          isOpen: true,
          verseArabic: words.map((w) => w.arabic).join(' '),
          pointsEarned: earnedPoints,
          totalScore: score + earnedPoints,
          timeTaken: timeFormatted,
          hintsUsed: hintsUsed
        });
      }, 700);
    } else {
      showToast('بعض الكلمات ليست في الترتيب الصحيح. حاول مجدداً أو استعن بالمساعدة!', 'error');
    }
  };

  return (
    <div className="app-container">
      {/* 60FPS Confetti Canvas */}
      <ConfettiCanvas ref={confettiRef} />

      {/* 30 Juz Sidebar (Right Side in RTL) */}
      <Sidebar
        isOpen={sidebarOpen}
        juzList={JUZ_DATA}
        surahList={SURAH_LIST}
        currentJuz={currentJuz}
        onSelectJuz={handleSelectJuz}
        onCloseMobile={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="main-content" id="main-content">
        <Topbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          currentJuzObj={currentJuzObj}
          surahList={SURAH_LIST}
          currentSurah={currentSurah}
          onChangeSurah={handleChangeSurah}
          currentAyah={currentAyah}
          totalAyahs={totalAyahs}
          onChangeAyah={handleChangeAyah}
          onPrevAyah={handlePrevAyah}
          onNextAyah={handleNextAyah}
          autoPlayWordVoice={autoPlayWordVoice}
          onToggleWordVoice={() => {
            const next = !autoPlayWordVoice;
            setAutoPlayWordVoice(next);
            showToast(next ? 'صوت الكلمة: مُفَعَّل' : 'صوت الكلمة: مُعَطَّل', 'info');
          }}
          onGiveHint={handleGiveHint}
        />

        <GameBoard
          surahObj={currentSurahObj}
          currentAyah={currentAyah}
          score={score}
          scoreBump={scoreBump}
          isAyahPlaying={isAyahPlaying}
          onToggleAyahAudio={toggleAyahAudio}
          onReset={handleResetAyah}
          words={words}
          placedSlots={placedSlots}
          bankWords={bankWords}
          isLoading={isLoading}
          hintWordId={hintWordId}
          playingWordId={playingWordId}
          onWordClick={handleWordClick}
          onWordSpeak={playWordVoice}
          onSlotClick={handleSlotClick}
          onCheckAnswer={handleCheckAnswer}
          onDropWordOnSlot={placeWordInSlot}
        />
      </main>

      {/* Victory Celebration Modal */}
      <CelebrationModal
        isOpen={modal.isOpen}
        onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
        verseArabic={modal.verseArabic}
        pointsEarned={modal.pointsEarned}
        totalScore={modal.totalScore}
        timeTaken={modal.timeTaken}
        hintsUsed={modal.hintsUsed}
        onListenAgain={playAyahAudio}
        onNextAyah={() => {
          setModal((prev) => ({ ...prev, isOpen: false }));
          handleNextAyah();
        }}
      />

      {/* Toast Notification */}
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}

export default App;
