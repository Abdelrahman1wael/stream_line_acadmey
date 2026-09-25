import React from 'react';
import { useGame } from '../../hooks/useGame.js';
import { formatSurahName } from '../../utils/arabicUtils.js';
import TargetSlots from './TargetSlots.jsx';
import WordBank from './WordBank.jsx';

const GameBoard = () => {
  const {
    currentSurahObj,
    currentAyah,
    score,
    scoreBump,
    isAyahPlaying,
    toggleAyahAudio,
    resetAyah,
    words,
    placedSlots,
    bankWords,
    isLoading,
    hintWordId,
    playingWordId,
    handleWordClick,
    playWordVoice,
    handleSlotClick,
    checkAnswer,
    placeWordInSlot
  } = useGame();

  const surahName = currentSurahObj ? formatSurahName(currentSurahObj.name) : 'الإِخْلَاصِ';

  const handleDropWord = (wordId, slotIdx) => {
    const word = words.find((w) => w.id === wordId);
    if (word) {
      placeWordInSlot(word, slotIdx);
    }
  };

  return (
    <div className="workspace">
      <div className="game-board-container" id="game-board-container">
        {/* Top Yellow Bordered Header Card */}
        <div className="game-header-card" id="ayah-header-card">
          <h1 className="game-title">لُعْبَةُ تَرْتِيبِ كَلِمَاتِ القُرْآنِ</h1>

          {/* Badges Row: Score, Ayah, Surah */}
          <div className="game-badges-row">
            <div
              className={`badge-pill badge-score ${scoreBump ? 'bump' : ''}`}
              id="score-badge"
              title="مجموع النقاط"
            >
              <i className="fa-solid fa-star star-icon"></i>
              <span className="score-label">النِّقَاط:</span>
              <strong id="score-counter">{score}</strong>
            </div>

            <div
              className="badge-pill badge-ayah"
              id="header-ayah-indicator"
              title={`الآية ${currentAyah}`}
            >
              <span id="header-ayah-badge-text">الآيَةُ {currentAyah}</span>
            </div>

            <div
              className="badge-pill badge-surah"
              id="header-surah-arabic"
              title={`سورة ${surahName}`}
            >
              <span id="surah-badge-name">سُورَةُ {surahName}</span>
            </div>
          </div>
        </div>

        {/* Actions Row: Reset and Listen to Ayah */}
        <div className="game-actions-row">
          <button
            className="btn-action-reset"
            id="reset-btn"
            title="إعادة ترتيب الكلمات"
            onClick={resetAyah}
          >
            <i className="fa-solid fa-arrows-rotate"></i>
            <span>إِعَادَةُ التَّرْتِيبِ</span>
          </button>

          <button
            className={`btn-action-listen ${isAyahPlaying ? 'playing' : ''}`}
            id="play-ayah-btn"
            title="استمع لتلاوة الآية كاملة"
            onClick={toggleAyahAudio}
          >
            <i
              className={isAyahPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-volume-high'}
              id="play-ayah-icon"
            ></i>
            <span id="play-ayah-text">
              {isAyahPlaying ? 'إيقاف التلاوة' : 'اِسْتَمِعْ لِلآيَةِ'}
            </span>
            <div className="audio-wave" id="audio-wave-bars">
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
            </div>
          </button>
        </div>

        {/* Upper Dashed Section: Target Drop Zone */}
        <TargetSlots
          placedSlots={placedSlots}
          playingWordId={playingWordId}
          onSlotClick={handleSlotClick}
          onWordSpeak={playWordVoice}
          onDropWord={handleDropWord}
        />

        {/* Lower Dashed Section: Word Bank */}
        <WordBank
          bankWords={bankWords}
          isLoading={isLoading}
          hintWordId={hintWordId}
          playingWordId={playingWordId}
          onWordClick={handleWordClick}
          onWordSpeak={playWordVoice}
        />

        {/* Bottom Full-Width Verification Button */}
        <button
          className="btn-verify"
          id="check-answer-btn"
          title="تحقق من صحة ترتيب الكلمات"
          onClick={checkAnswer}
        >
          <span>تَحَقَّقْ مِنَ الإِجَابَةِ</span>
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
