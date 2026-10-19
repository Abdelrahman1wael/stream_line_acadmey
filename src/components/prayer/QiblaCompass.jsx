import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';

const QiblaCompass = ({ qiblaBearing = 136, distanceToKaaba = 1200, cityName = '' }) => {
  const { t, lang } = useLanguage();
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [hasCompassSupport, setHasCompassSupport] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);

  // Attempt to listen to device orientation (mobile compass sensors)
  useEffect(() => {
    let handleOrientation = null;

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      handleOrientation = (event) => {
        let heading = null;
        if (event.webkitCompassHeading) {
          // iOS Safari native compass heading
          heading = event.webkitCompassHeading;
          setHasCompassSupport(true);
        } else if (event.alpha !== null) {
          // Android standard deviceorientation
          heading = 360 - event.alpha;
          setHasCompassSupport(true);
        }

        if (heading !== null) {
          setDeviceHeading(Math.round(heading));
        }
      };

      try {
        window.addEventListener('deviceorientation', handleOrientation, true);
      } catch (e) {
        // unsupported
      }
    }

    return () => {
      if (handleOrientation) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  // Needle angle relative to current device heading (or static if on desktop)
  const needleAngle = hasCompassSupport
    ? (qiblaBearing - deviceHeading + 360) % 360
    : qiblaBearing;

  return (
    <div className="qibla-compass-card">
      <div className="qibla-header">
        <div className="qibla-badge-icon">
          <i className="fa-solid fa-kaaba"></i>
        </div>
        <div>
          <h3 className="qibla-title">{t('qiblaCompassTitle')}</h3>
          <p className="qibla-sub">{t('qiblaCompassDesc')}</p>
        </div>
      </div>

      <div className="compass-visual-stage">
        {/* Outer Circular Dial */}
        <div className="compass-dial-ring">
          <div className="compass-cardinal compass-n">N</div>
          <div className="compass-cardinal compass-e">E</div>
          <div className="compass-cardinal compass-s">S</div>
          <div className="compass-cardinal compass-w">W</div>

          {/* Compass Rose Ring */}
          <div className="compass-inner-face">
            {/* Kaaba Direction Marker on Rim */}
            <div
              className="qibla-rim-marker"
              style={{ transform: `rotate(${qiblaBearing}deg)` }}
              title={`${t('qiblaBearing')}: ${qiblaBearing}°`}
            >
              <div className="rim-kaaba-icon">
                <i className="fa-solid fa-kaaba"></i>
              </div>
            </div>

            {/* Rotating Needle */}
            <div
              className="compass-needle-element"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              <div className="needle-head">
                <span className="needle-tip-arrow"></span>
              </div>
              <div className="needle-center-pivot"></div>
              <div className="needle-tail"></div>
            </div>

            {/* Center Info */}
            <div className="compass-center-display">
              <span className="qibla-degree-number">{qiblaBearing}°</span>
              <span className="qibla-degree-sub">{t('fromNorth')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Guidance footer */}
      <div className="qibla-details-grid">
        <div className="qibla-stat-box">
          <i className="fa-solid fa-compass text-emerald"></i>
          <div>
            <span className="stat-label">{t('qiblaAngle')}</span>
            <strong className="stat-value">{qiblaBearing}°</strong>
          </div>
        </div>

        <div className="qibla-stat-box">
          <i className="fa-solid fa-route text-gold"></i>
          <div>
            <span className="stat-label">{t('distanceToMakkah')}</span>
            <strong className="stat-value">
              {distanceToKaaba?.toLocaleString()} {t('unitKm')}
            </strong>
          </div>
        </div>

        <div className="qibla-stat-box">
          <i className="fa-solid fa-location-dot text-sky"></i>
          <div>
            <span className="stat-label">{t('currentCity')}</span>
            <strong className="stat-value">{cityName}</strong>
          </div>
        </div>
      </div>

      <div className="qibla-instruction-banner">
        <i className="fa-solid fa-circle-info"></i>
        <span>{t('qiblaInstructions')}</span>
      </div>
    </div>
  );
};

export default QiblaCompass;
