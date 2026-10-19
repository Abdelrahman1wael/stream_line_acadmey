import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { formatPrayerTime, formatHijriDate } from '../../utils/prayerTimesCalculator.js';
import { PRAYERS_INFO } from '../../data/prayerCities.js';

const PrayerHeader = ({
  city,
  prayerData,
  prayerStatus,
  isDetectingLocation,
  onDetectLocation,
  onOpenSettings,
  onOpenAdhanModal,
  onOpenMonthlyModal,
  is12Hour
}) => {
  const { t, lang, isRTL } = useLanguage();

  const nextInfo = PRAYERS_INFO.find((p) => p.id === prayerStatus?.nextPrayerKey) || PRAYERS_INFO[0];
  const activeInfo = PRAYERS_INFO.find((p) => p.id === prayerStatus?.activePrayerKey) || PRAYERS_INFO[0];

  const cityName = lang === 'ar' ? city.nameAr : city.nameEn;
  const countryName = lang === 'ar' ? city.countryAr : city.countryEn;

  const nextPrayerName = lang === 'ar' ? nextInfo.nameAr : nextInfo.nameEn;
  const activePrayerName = lang === 'ar' ? activeInfo.nameAr : activeInfo.nameEn;

  const nextPrayerTimeStr = prayerData?.timings?.[prayerStatus?.nextPrayerKey] || '--:--';
  const formattedNextTime = formatPrayerTime(nextPrayerTimeStr, is12Hour, isRTL);

  const hijriStr = prayerData?.hijri ? formatHijriDate(prayerData.hijri, lang) : '';

  return (
    <div className="prayer-hero-container">
      {/* Top Banner: Location & Date strip */}
      <div className="prayer-top-bar">
        <div className="prayer-location-badge">
          <div className="location-pin-icon">
            <i className="fa-solid fa-location-dot"></i>
          </div>
          <div className="location-info">
            <span className="location-name">{cityName}، {countryName}</span>
            <span className="location-sub">
              {prayerData?.source === 'api' ? t('sourceVerified') : t('sourceAstro')}
            </span>
          </div>

          <button
            className={`btn-detect-gps ${isDetectingLocation ? 'loading' : ''}`}
            onClick={onDetectLocation}
            title={t('detectGpsTooltip')}
            aria-label="Detect GPS"
          >
            <i className={`fa-solid ${isDetectingLocation ? 'fa-spinner fa-spin' : 'fa-crosshairs'}`}></i>
            <span className="gps-btn-text">{t('btnAutoLocate')}</span>
          </button>
        </div>

        <div className="prayer-dates-badge">
          <div className="date-item hijri-pill">
            <i className="fa-solid fa-moon-stars"></i>
            <span>{hijriStr || t('loadingHijri')}</span>
          </div>
          <div className="date-item gregorian-pill">
            <i className="fa-solid fa-calendar-day"></i>
            <span>
              {new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        <div className="prayer-top-actions">
          <button
            className="prayer-action-btn"
            onClick={onOpenMonthlyModal}
            title={t('monthlyTimetable')}
          >
            <i className="fa-solid fa-calendar-days"></i>
            <span>{t('monthlyTimetable')}</span>
          </button>

          <button
            className="prayer-action-btn btn-settings"
            onClick={onOpenSettings}
            title={t('prayerSettings')}
          >
            <i className="fa-solid fa-sliders"></i>
            <span>{t('prayerSettings')}</span>
          </button>
        </div>
      </div>

      {/* Main Countdown Spotlight Card */}
      <div className="prayer-countdown-spotlight">
        <div className="spotlight-glass-bg"></div>

        <div className="spotlight-content">
          <div className="spotlight-status-header">
            <div className="next-prayer-pill">
              <span className="pulse-beacon"></span>
              <i className={nextInfo.icon}></i>
              <span>{t('nextPrayerTitle')}: <strong>{nextPrayerName}</strong></span>
              <span className="prayer-time-target">({formattedNextTime})</span>
            </div>

            <button
              className="btn-preview-adhan"
              onClick={onOpenAdhanModal}
              title={t('listenAdhan')}
            >
              <i className="fa-solid fa-volume-high"></i>
              <span>{t('listenAdhan')}</span>
            </button>
          </div>

          <div className="countdown-timer-display">
            <div className="countdown-digits-wrapper">
              <div className="digit-block">
                <span className="digit-val">{String(prayerStatus?.hours || 0).padStart(2, '0')}</span>
                <span className="digit-unit">{t('unitHours')}</span>
              </div>
              <span className="digit-colon">:</span>
              <div className="digit-block">
                <span className="digit-val">{String(prayerStatus?.minutes || 0).padStart(2, '0')}</span>
                <span className="digit-unit">{t('unitMinutes')}</span>
              </div>
              <span className="digit-colon">:</span>
              <div className="digit-block">
                <span className="digit-val highlight-secs">{String(prayerStatus?.seconds || 0).padStart(2, '0')}</span>
                <span className="digit-unit">{t('unitSeconds')}</span>
              </div>
            </div>
            <p className="countdown-subtext">
              {t('remainingUntil')} <strong>{nextPrayerName}</strong>
            </p>
          </div>

          {/* Interval Progress Bar */}
          <div className="prayer-interval-progress-box">
            <div className="progress-labels">
              <span>
                <i className={activeInfo.icon}></i> {activePrayerName} (
                {formatPrayerTime(prayerData?.timings?.[prayerStatus?.activePrayerKey], is12Hour, isRTL)})
              </span>
              <span className="progress-percent-val">{prayerStatus?.progressPercent || 0}%</span>
              <span>
                <i className={nextInfo.icon}></i> {nextPrayerName} ({formattedNextTime})
              </span>
            </div>
            <div className="progress-track-bar">
              <div
                className="progress-fill-bar"
                style={{ width: `${prayerStatus?.progressPercent || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerHeader;
