import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { PRAYERS_INFO, EXTRA_TIMES_INFO } from '../../data/prayerCities.js';
import { formatPrayerTime } from '../../utils/prayerTimesCalculator.js';

const PrayerTimesList = ({
  timings,
  prayerStatus,
  is12Hour,
  onPlayAdhan,
  onViewVirtue
}) => {
  const { t, lang, isRTL } = useLanguage();

  if (!timings) return null;

  return (
    <div className="prayer-times-section">
      <div className="section-title-wrap">
        <div>
          <h2 className="section-title-heading">
            <i className="fa-solid fa-mosque text-emerald"></i>
            <span>{t('dailyPrayerSchedule')}</span>
          </h2>
          <p className="section-subtitle-text">{t('dailyScheduleSub')}</p>
        </div>
      </div>

      <div className="prayer-cards-grid">
        {PRAYERS_INFO.map((prayer) => {
          const rawTime = timings[prayer.id];
          const formattedTime = formatPrayerTime(rawTime, is12Hour, isRTL);
          const isNext = prayerStatus?.nextPrayerKey === prayer.id;
          const isActive = prayerStatus?.activePrayerKey === prayer.id;

          const prayerName = lang === 'ar' ? prayer.nameAr : prayer.nameEn;
          const sunnahDesc = lang === 'ar' ? prayer.sunnahDescAr : prayer.sunnahDescEn;

          let cardStatusClass = '';
          if (isNext) cardStatusClass = 'is-next';
          else if (isActive) cardStatusClass = 'is-active';

          return (
            <div
              key={prayer.id}
              className={`prayer-time-card ${cardStatusClass}`}
              data-prayer={prayer.id}
              style={{ '--card-accent': prayer.color }}
            >
              {/* Card status tag */}
              {isNext && (
                <div className="card-badge-pill next-badge">
                  <span className="badge-pulse"></span>
                  <span>{t('badgeNext')}</span>
                </div>
              )}
              {isActive && (
                <div className="card-badge-pill active-badge">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>{t('badgeActive')}</span>
                </div>
              )}

              <div className="card-header-row">
                <div className="card-icon-avatar">
                  <i className={prayer.icon}></i>
                </div>
                <div className="card-title-group">
                  <h3 className="prayer-arabic-name">{prayerName}</h3>
                  <span className="prayer-english-sub">
                    {lang === 'ar' ? prayer.nameEn : prayer.nameAr}
                  </span>
                </div>
              </div>

              <div className="card-time-main">
                <span className="prayer-clock-digits">{formattedTime}</span>
              </div>

              {/* Rakat & Sunnah pill */}
              <div className="card-sunnah-chip" title={sunnahDesc}>
                {!prayer.isNotObligatory && (
                  <span className="rakat-badge">
                    <i className="fa-solid fa-person-praying"></i>
                    <span>{prayer.rakats} {t('rakatUnit')}</span>
                  </span>
                )}
                <span className="sunnah-text-truncate" dir="auto">{sunnahDesc}</span>
              </div>

              <div className="card-footer-actions">
                {!prayer.isNotObligatory && (
                  <button
                    className="btn-card-action btn-card-adhan"
                    onClick={() => onPlayAdhan(prayer)}
                    title={t('listenAdhan')}
                  >
                    <i className="fa-solid fa-volume-high"></i>
                    <span>{t('adhanBtn')}</span>
                  </button>
                )}

                <button
                  className="btn-card-action btn-card-virtue"
                  onClick={() => onViewVirtue(prayer)}
                  title={t('virtueBtn')}
                >
                  <i className="fa-solid fa-circle-info"></i>
                  <span>{t('virtueBtn')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Extra Night Times: Qiyam & Midnight */}
      <div className="extra-times-card-wrap">
        <div className="extra-times-card">
          <div className="extra-times-header">
            <div className="extra-times-icon">
              <i className="fa-solid fa-moon"></i>
            </div>
            <div>
              <h4 className="extra-times-title">{t('nightTimesTitle')}</h4>
              <p className="extra-times-sub">{t('nightTimesSub')}</p>
            </div>
          </div>

          <div className="extra-times-grid">
            {EXTRA_TIMES_INFO.map((item) => {
              const timeStr = timings[item.id];
              const formattedTime = formatPrayerTime(timeStr, is12Hour, isRTL);
              const title = lang === 'ar' ? item.nameAr : item.nameEn;
              const virtue = lang === 'ar' ? item.virtueAr : item.virtueEn;

              return (
                <div key={item.id} className="extra-time-item">
                  <div className="extra-item-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="extra-item-details">
                    <span className="extra-item-label">{title}</span>
                    <strong className="extra-item-val">{formattedTime}</strong>
                    <span className="extra-item-virtue">{virtue}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesList;
