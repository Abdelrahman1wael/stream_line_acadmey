import React, { useState } from 'react';

const GameBoard = ({
  surahObj,
  currentAyah,
  score,
  scoreBump,
  isAyahPlaying,
  onToggleAyahAudio,
  onReset,
  words,
  placedSlots,
  bankWords,
  isLoading,
  hintWordId,
  playingWordId,
  onWordClick,
  onWordSpeak,
  onSlotClick,
  onCheckAnswer,
  onDropWordOnSlot
}) => {
  const [dragOverSlotIndex, setDragOverSlotIndex] = useState(null);

  // Format surah name with Al- if needed
  const surahName = surahObj
    ? surahObj.name.startsWith('ال')
      ? surahObj.name
      : `ال${surahObj.name}`
    : 'الإِخْلَاصِ';

  const handleDragStart = (e, word) => {
    e.dataTransfer.setData('text/plain', word.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, slotIdx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSlotIndex(slotIdx);
  };

  const handleDragLeave = () => {
    setDragOverSlotIndex(null);
  };

  const handleDrop = (e, slotIdx) => {
    e.preventDefault();
    setDragOverSlotIndex(null);
    const wordId = e.dataTransfer.getData('text/plain');
    if (!wordId) return;
    const word = words.find((w) => w.id === wordId);
    if (word) {
      onDropWordOnSlot(word, slotIdx);
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
            onClick={onReset}
          >
            <i className="fa-solid fa-arrows-rotate"></i>
            <span>إِعَادَةُ التَّرْتِيبِ</span>
          </button>

          <button
            className={`btn-action-listen ${isAyahPlaying ? 'playing' : ''}`}
            id="play-ayah-btn"
            title="استمع لتلاوة الآية كاملة"
            onClick={onToggleAyahAudio}
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
        <div className="dashed-section drop-section">
          <div className="dashed-section-title">
            رَتِّبِ الكَلِمَاتِ هُنَا فِي التَّرْتِيبِ الصَّحِيحِ:
          </div>
          <div
            className={`target-drop-box ${
              placedSlots.length > 0 && placedSlots.every((w, idx) => w && w.originalIndex === idx)
                ? 'all-completed'
                : ''
            }`}
            id="slots-container"
            aria-label="منطقة ترتيب الكلمات"
          >
            {placedSlots.map((word, idx) => {
              const isDragOver = dragOverSlotIndex === idx;

              return (
                <div
                  key={idx}
                  className={`ayah-slot ${word ? 'filled' : ''} ${isDragOver ? 'drag-over' : ''}`}
                  data-slot-index={idx}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, idx)}
                  onClick={(e) => {
                    if (e.target.closest('.word-speak-btn')) return;
                    if (word) onSlotClick(word, idx);
                  }}
                >
                  {word ? (
                    <div
                      className={`word-card placed ${
                        playingWordId === word.id ? 'playing-audio' : ''
                      }`}
                      data-word-id={word.id}
                    >
                      <button
                        className="word-speak-btn"
                        title="استمع لنطق الكلمة"
                        aria-label="استمع لنطق الكلمة"
                        onClick={(e) => {
                          e.stopPropagation();
                          onWordSpeak(word);
                        }}
                      >
                        <i className="fa-solid fa-volume-high"></i>
                      </button>
                      <div className="word-arabic">{word.arabic}</div>
                    </div>
                  ) : (
                    <span className="slot-number">{idx + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Lower Dashed Section: Word Bank */}
        <div className="dashed-section bank-section">
          <div className="dashed-section-title">
            اِضْغَطْ عَلَى الكَلِمَةِ لِتَضَعَهَا فِي المَكَانِ المُنَاسِبِ:
          </div>
          <div
            className="word-bank-box"
            id="word-bank-container"
            aria-label="بنك الكلمات المتاحة"
          >
            {isLoading ? (
              <div className="loading-indicator" id="loading-indicator" style={{ display: 'flex' }}>
                <div className="spinner"></div>
                <span>جاري تحميل كلمات الآية الكريمة...</span>
              </div>
            ) : (
              bankWords.map((word) => {
                const isHintGlowing = hintWordId === word.id;
                const isPlaying = playingWordId === word.id;

                return (
                  <div
                    key={word.id}
                    className={`word-card ${isHintGlowing ? 'hint-glow' : ''} ${
                      isPlaying ? 'playing-audio' : ''
                    }`}
                    id={word.id}
                    draggable
                    data-word-id={word.id}
                    onDragStart={(e) => handleDragStart(e, word)}
                    onClick={(e) => {
                      if (e.target.closest('.word-speak-btn')) return;
                      onWordClick(word);
                    }}
                  >
                    <button
                      className="word-speak-btn"
                      title="استمع لنطق الكلمة"
                      aria-label="استمع لنطق الكلمة"
                      onClick={(e) => {
                        e.stopPropagation();
                        onWordSpeak(word);
                      }}
                    >
                      <i className="fa-solid fa-volume-high"></i>
                    </button>
                    <div className="word-arabic">{word.arabic}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bottom Full-Width Verification Button */}
        <button
          className="btn-verify"
          id="check-answer-btn"
          title="تحقق من صحة ترتيب الكلمات"
          onClick={onCheckAnswer}
        >
          <span>تَحَقَّقْ مِنَ الإِجَابَةِ</span>
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
