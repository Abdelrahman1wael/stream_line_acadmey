import React, { useMemo } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { soundManager, triggerHaptic } from '../../utils/audioUtils.js';

const OBLIGATORY_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const TRACKER_ITEMS = [
  { id: 'Fajr', nameAr: 'صلاة الفجر', nameEn: 'Fajr Prayer', isFard: true, icon: 'fa-solid fa-cloud-sun' },
  { id: 'Dhuhr', nameAr: 'صلاة الظهر', nameEn: 'Dhuhr Prayer', isFard: true, icon: 'fa-solid fa-sun-plant-wilt' },
  { id: 'Asr', nameAr: 'صلاة العصر', nameEn: 'Asr Prayer', isFard: true, icon: 'fa-solid fa-cloud-sun' },
  { id: 'Maghrib', nameAr: 'صلاة المغرب', nameEn: 'Maghrib Prayer', isFard: true, icon: 'fa-solid fa-sunset' },
  { id: 'Isha', nameAr: 'صلاة العشاء', nameEn: 'Isha Prayer', isFard: true, icon: 'fa-solid fa-moon' },
  { id: 'Sunan', nameAr: 'السنن الرواتب (12 ركعة)', nameEn: 'Sunan Rawatib (12 Rakahs)', isFard: false, icon: 'fa-solid fa-hands-praying' },
  { id: 'Duha', nameAr: 'صلاة الضحى', nameEn: 'Duha Prayer', isFard: false, icon: 'fa-solid fa-sun' },
  { id: 'Witr', nameAr: 'صلاة الوتر وقيام الليل', nameEn: 'Witr & Qiyam Prayer', isFard: false, icon: 'fa-solid fa-star-and-crescent' }
];

const DailyPrayerTracker = ({ trackerState, onToggleItem, onResetTracker }) => {
  const { t, lang } = useLanguage();

  const completedFardCount = useMemo(() => {
    return OBLIGATORY_KEYS.filter((k) => trackerState[k]).length;
  }, [trackerState]);

  const totalCompletedCount = useMemo(() => {
    return Object.values(trackerState).filter(Boolean).length;
  }, [trackerState]);

  const fardPercentage = Math.round((completedFardCount / OBLIGATORY_KEYS.length) * 100);

  const handleToggle = (id) => {
    const nextVal = !trackerState[id];
    soundManager.playTap();
    triggerHaptic('light');

    if (nextVal) {
      // If completing the 5th obligatory prayer, trigger celebration
      if (OBLIGATORY_KEYS.includes(id) && completedFardCount === 4) {
        soundManager.playSectionComplete();
        triggerHaptic('success');
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
      } else {
        soundManager.playZikrComplete();
      }
    }

    onToggleItem(id, nextVal);
  };

  return (
    <div className="daily-prayer-tracker-card">
      <div className="tracker-header-wrap">
        <div className="tracker-title-group">
          <div className="tracker-badge-icon">
            <i className="fa-solid fa-clipboard-check"></i>
          </div>
          <div>
            <h3 className="tracker-title">{t('trackerTitle')}</h3>
            <p className="tracker-desc">{t('trackerDesc')}</p>
          </div>
        </div>

        <div className="tracker-score-pill">
          <span className="score-ratio">
            <strong>{completedFardCount}</strong> / {OBLIGATORY_KEYS.length}
          </span>
          <span className="score-label">{t('fardCompleted')}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="tracker-progress-wrapper">
        <div className="tracker-bar-bg">
          <div
            className="tracker-bar-fill"
            style={{ width: `${fardPercentage}%` }}
          ></div>
        </div>
        <div className="tracker-bar-text">
          <span>{fardPercentage}% {t('trackerCompletion')}</span>
          {completedFardCount === 5 && (
            <span className="congrats-text">
              <i className="fa-solid fa-circle-check text-emerald"></i> {t('allFardDone')}
            </span>
          )}
        </div>
      </div>

      {/* Checklist items */}
      <div className="tracker-items-grid">
        {TRACKER_ITEMS.map((item) => {
          const isChecked = !!trackerState[item.id];
          const name = lang === 'ar' ? item.nameAr : item.nameEn;

          return (
            <div
              key={item.id}
              className={`tracker-item-btn ${isChecked ? 'completed' : ''} ${item.isFard ? 'item-fard' : 'item-nafl'}`}
              onClick={() => handleToggle(item.id)}
              role="button"
              tabIndex={0}
            >
              <div className="tracker-item-checkbox">
                <i className={`fa-solid ${isChecked ? 'fa-check' : ''}`}></i>
              </div>

              <div className="tracker-item-icon">
                <i className={item.icon}></i>
              </div>

              <div className="tracker-item-info">
                <span className="item-name">{name}</span>
                <span className="item-type-badge">
                  {item.isFard ? t('tagFard') : t('tagSunnah')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="tracker-footer-row">
        <span className="tracker-note">
          <i className="fa-solid fa-shield-halved text-emerald"></i> {t('trackerAutoSave')}
        </span>
        <button
          className="btn-reset-tracker"
          onClick={onResetTracker}
          title={t('btnResetTracker')}
        >
          <i className="fa-solid fa-rotate-left"></i>
          <span>{t('btnResetTracker')}</span>
        </button>
      </div>
    </div>
  );
};

export default DailyPrayerTracker;
