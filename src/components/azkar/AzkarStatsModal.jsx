import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';

const AzkarStatsModal = ({
  isOpen,
  onClose,
  streak,
  totalCompleted,
  categoryStats
}) => {
  if (!isOpen) return null;
  const { t, lang } = useLanguage();

  const todayStr = new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog stats-modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-with-icon">
            <div className="title-icon-badge">
              <i className="fa-solid fa-chart-pie text-emerald"></i>
            </div>
            <div>
              <h3>{t('statsModalTitle')}</h3>
              <p className="modal-subtitle">{t('statsModalSubtitle')}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="modal-body">
          {/* Main 3 Metrics */}
          <div className="stats-metric-grid">
            <div className="metric-box streak-box">
              <div className="metric-icon">
                <i className="fa-solid fa-fire text-amber"></i>
              </div>
              <div className="metric-val">{streak}</div>
              <div className="metric-label">{t('streakDaysLabel')}</div>
              <p className="metric-desc">{t('streakDaysDesc')}</p>
            </div>

            <div className="metric-box completions-box">
              <div className="metric-icon">
                <i className="fa-solid fa-circle-check text-emerald"></i>
              </div>
              <div className="metric-val">{totalCompleted}</div>
              <div className="metric-label">{t('totalCompletionsLabel')}</div>
              <p className="metric-desc">{t('totalCompletionsDesc')}</p>
            </div>

            <div className="metric-box date-box">
              <div className="metric-icon">
                <i className="fa-solid fa-calendar-days text-sky"></i>
              </div>
              <div className="metric-date-val">{todayStr}</div>
              <div className="metric-label">{t('todayDateLabel')}</div>
              <p className="metric-desc">{t('todayDateDesc')}</p>
            </div>
          </div>

          {/* Section Progress Breakdown */}
          <div className="categories-progress-list">
            <h4>
              <i className="fa-solid fa-bars-progress text-amber"></i>
              <span>{t('catProgressTitle')}</span>
            </h4>

            {categoryStats && categoryStats.map((cat, idx) => {
              const percent = cat.total > 0 ? Math.round((cat.completed / cat.total) * 100) : 0;
              return (
                <div key={idx} className="cat-progress-item">
                  <div className="cat-progress-info">
                    <span className="cat-name">
                      <i className={`fa-solid ${cat.icon}`}></i>
                      <span>{cat.label}</span>
                    </span>
                    <span className="cat-counts">
                      {cat.completed} {t('fromLabel')} {cat.total} ({percent}%)
                    </span>
                  </div>
                  <div className="cat-progress-bar-bg">
                    <div
                      className="cat-progress-bar-fill"
                      style={{ width: `${percent}%`, backgroundColor: cat.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="stats-privacy-note">
            <i className="fa-solid fa-shield-halved"></i>
            <span>{t('privacyNote')}</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-modal-action-primary" onClick={onClose}>
            <span>{t('btnContinueDhikr')}</span>
            <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AzkarStatsModal;
