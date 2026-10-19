import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';

const AzkarCelebrationModal = ({
  isOpen,
  onClose,
  categoryTitle,
  onResetCategory,
  onGoToTasbih,
  onShareCompletion
}) => {
  if (!isOpen) return null;
  const { t } = useLanguage();

  return (
    <div className="modal-overlay celebration-overlay" onClick={onClose}>
      <div className="modal-dialog celebration-modal-card" onClick={e => e.stopPropagation()}>
        <div className="celebration-hero-badge">
          <div className="trophy-pulse-ring"></div>
          <i className="fa-solid fa-crown text-amber"></i>
        </div>

        <h2 className="celebration-title">{t('celebrationTitle')}</h2>
        <p className="celebration-category">
          {t('completedFully')} <strong>{categoryTitle}</strong> {t('completedFullySuffix')}
        </p>

        <div className="celebration-dua-box">
          <i className="fa-solid fa-hands-holding text-emerald"></i>
          <p>
            {t('celebrationDua')}
          </p>
        </div>

        <div className="celebration-actions-list">
          <button
            className="btn-celebrate-share"
            onClick={onShareCompletion}
          >
            <i className="fa-solid fa-share-nodes"></i>
            <span>{t('btnShareAchievement')}</span>
          </button>

          {onGoToTasbih && (
            <button
              className="btn-celebrate-tasbih"
              onClick={onGoToTasbih}
            >
              <i className="fa-solid fa-fingerprint"></i>
              <span>{t('btnGoToTasbih')}</span>
            </button>
          )}

          <div className="celebration-bottom-actions">
            <button
              className="btn-celebrate-reset"
              onClick={onResetCategory}
            >
              <i className="fa-solid fa-rotate-left"></i>
              <span>{t('btnReplayWird')}</span>
            </button>

            <button
              className="btn-celebrate-close"
              onClick={onClose}
            >
              <span>{t('btnCloseDone')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AzkarCelebrationModal;
