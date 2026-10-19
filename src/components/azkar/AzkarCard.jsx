import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';

const AzkarCard = ({
  zekr,
  index,
  remaining,
  isCompleted,
  fontSizeLevel,
  isPlaying,
  onTapCount,
  onUndo,
  onPlayAudio,
  onCopy,
  onShare
}) => {
  const { t } = useLanguage();
  const totalCount = zekr.count || 1;
  const progressPercent = Math.min(100, Math.round(((totalCount - remaining) / totalCount) * 100));

  // Font size multiplier
  const fontSizeStyle = {
    fontSize: fontSizeLevel === 1 ? '1.35rem' : fontSizeLevel === 2 ? '1.55rem' : fontSizeLevel === -1 ? '1.05rem' : '1.22rem',
    lineHeight: fontSizeLevel === 2 ? 2.3 : 2.1
  };

  return (
    <div
      className={`azkar-card ${isCompleted ? 'completed-card' : ''} ${isPlaying ? 'playing-card' : ''}`}
      id={`zekr-${zekr.id}`}
    >
      {/* Card Header */}
      <div className="azkar-card-header">
        <div className="card-header-right">
          <span className="zekr-number-badge">
            <span className="num">{index + 1}</span>
          </span>
          <span className="zekr-repeat-badge" title={t('timesUnit')}>
            <i className="fa-solid fa-repeat"></i>
            <span>{totalCount} {totalCount === 1 ? t('timeUnitSingle') : t('timesUnit')}</span>
          </span>
          {zekr.reference && (
            <span className="zekr-ref-pill">
              <i className="fa-solid fa-book-bookmark"></i>
              <span>{zekr.reference}</span>
            </span>
          )}
        </div>

        <div className="card-header-left">
          {/* Audio Button */}
          {zekr.audio && (
            <button
              className={`action-btn-icon audio-btn ${isPlaying ? 'active-playing' : ''}`}
              onClick={() => onPlayAudio(zekr)}
              title={isPlaying ? t('btnPause') : t('btnListen')}
              aria-label={isPlaying ? t('btnPause') : t('btnListen')}
            >
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-volume-high'}`}></i>
              {isPlaying && <span className="sound-wave-ping"></span>}
            </button>
          )}

          {/* Copy Button */}
          <button
            className="action-btn-icon copy-btn"
            onClick={() => onCopy(zekr.zekr)}
            title={t('btnCopy')}
            aria-label={t('btnCopy')}
          >
            <i className="fa-regular fa-copy"></i>
          </button>

          {/* Share Button */}
          <button
            className="action-btn-icon share-btn"
            onClick={() => onShare(zekr)}
            title={t('btnShare')}
            aria-label={t('btnShare')}
          >
            <i className="fa-solid fa-share-nodes"></i>
          </button>
        </div>
      </div>

      {/* Main Dhikr Text (Always authentic Arabic script with clear calligraphy) */}
      <div className="azkar-card-body" onClick={!isCompleted ? onTapCount : undefined}>
        <div className="zekr-text-box" style={fontSizeStyle}>
          <p className="zekr-arabic-text" dir="rtl">{zekr.zekr}</p>
        </div>

        {/* Progress Line */}
        <div className="zekr-progress-track">
          <div
            className="zekr-progress-bar"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Virtue / Hadith Benefit (الفضل) */}
      {zekr.description && (
        <div className="azkar-virtue-box">
          <div className="virtue-badge-header">
            <i className="fa-solid fa-sparkles text-amber"></i>
            <span className="virtue-title">{t('virtueTitle')}</span>
          </div>
          <p className="virtue-content">{zekr.description}</p>
        </div>
      )}

      {/* Card Footer: Interactive Counter / Completion State */}
      <div className="azkar-card-footer">
        {isCompleted ? (
          <div className="completed-state-wrapper">
            <div className="completed-badge-pill">
              <i className="fa-solid fa-circle-check"></i>
              <span>{t('completedBadge')} ({totalCount}/{totalCount})</span>
            </div>
            <button
              className="btn-undo-zekr"
              onClick={onUndo}
              title={t('undoBtn')}
            >
              <i className="fa-solid fa-rotate-left"></i>
              <span>{t('undoBtn')}</span>
            </button>
          </div>
        ) : (
          <div className="counter-action-wrapper">
            <div className="counter-stats-text">
              <span className="remaining-label">{t('remainingLabel')}</span>
              <strong className="remaining-val">{remaining}</strong>
              <span className="remaining-total">{t('fromLabel')} {totalCount}</span>
            </div>

            <button
              className="btn-tap-counter"
              onClick={onTapCount}
              title={t('tapToCount')}
            >
              <span className="counter-btn-num">{remaining}</span>
              <span className="counter-btn-sub">
                <i className="fa-solid fa-hand-pointer"></i>
                <span>{t('tapToCount')}</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AzkarCard;
