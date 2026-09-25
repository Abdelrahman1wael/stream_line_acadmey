import React from 'react';

const WordCard = ({
  word,
  isPlaced = false,
  isHintGlowing = false,
  isPlaying = false,
  onSpeak,
  onClick,
  onDragStart
}) => {
  return (
    <div
      className={`word-card ${isPlaced ? 'placed' : ''} ${isHintGlowing ? 'hint-glow' : ''} ${
        isPlaying ? 'playing-audio' : ''
      }`}
      id={word.id}
      draggable={!isPlaced}
      data-word-id={word.id}
      onDragStart={onDragStart ? (e) => onDragStart(e, word) : undefined}
      onClick={onClick}
    >
      <button
        className="word-speak-btn"
        title="استمع لنطق الكلمة"
        aria-label="استمع لنطق الكلمة"
        onClick={(e) => {
          e.stopPropagation();
          onSpeak(word);
        }}
      >
        <i className="fa-solid fa-volume-high"></i>
      </button>
      <div className="word-arabic">{word.arabic}</div>
    </div>
  );
};

export default WordCard;
