import React, { useState } from 'react';
import WordCard from './WordCard.jsx';

const TargetSlots = ({
  placedSlots,
  playingWordId,
  onSlotClick,
  onWordSpeak,
  onDropWord
}) => {
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragOver = (e, idx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(idx);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, idx) => {
    e.preventDefault();
    setDragOverIndex(null);
    const wordId = e.dataTransfer.getData('text/plain');
    if (wordId) {
      onDropWord(wordId, idx);
    }
  };

  const isAllCorrect =
    placedSlots.length > 0 &&
    placedSlots.every((w, idx) => w && w.originalIndex === idx);

  return (
    <div className="dashed-section drop-section">
      <div className="dashed-section-title">
        رَتِّبِ الكَلِمَاتِ هُنَا فِي التَّرْتِيبِ الصَّحِيحِ:
      </div>
      <div
        className={`target-drop-box ${isAllCorrect ? 'all-completed' : ''}`}
        id="slots-container"
        aria-label="منطقة ترتيب الكلمات"
      >
        {placedSlots.map((word, idx) => {
          const isDragOver = dragOverIndex === idx;

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
                <WordCard
                  word={word}
                  isPlaced={true}
                  isPlaying={playingWordId === word.id}
                  onSpeak={onWordSpeak}
                />
              ) : (
                <span className="slot-number">{idx + 1}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TargetSlots;
