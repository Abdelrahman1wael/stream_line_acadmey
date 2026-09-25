import React from 'react';
import WordCard from './WordCard.jsx';

const WordBank = ({
  bankWords,
  isLoading,
  hintWordId,
  playingWordId,
  onWordClick,
  onWordSpeak
}) => {
  const handleDragStart = (e, word) => {
    e.dataTransfer.setData('text/plain', word.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
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
          bankWords.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              isPlaced={false}
              isHintGlowing={hintWordId === word.id}
              isPlaying={playingWordId === word.id}
              onDragStart={handleDragStart}
              onSpeak={onWordSpeak}
              onClick={(e) => {
                if (e.target.closest('.word-speak-btn')) return;
                onWordClick(word);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WordBank;
