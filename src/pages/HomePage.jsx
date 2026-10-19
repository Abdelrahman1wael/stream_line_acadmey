import React, { useState } from 'react';
import humanBodyImage from '../assets/human_body_features.jpg';
import { useLanguage } from '../context/LanguageContext.jsx';

const HomePage = ({ onNavigateToGame, onNavigateToAzkar, onNavigateToPrayer, onNavigateToMp3Quran }) => {
  const { t, isRTL } = useLanguage();
  const [selectedPart, setSelectedPart] = useState('heart');

  const bodyParts = [
    {
      id: 'mind',
      organ: t('bodyMindTitle'),
      featureName: t('bodyMindFeature'),
      desc: t('bodyMindDesc'),
      icon: 'fa-solid fa-brain',
      badge: t('gameCardTag'),
      colorTheme: 'green',
      action: onNavigateToGame,
      btnLabel: t('btnEnterGame'),
      coords: { top: '12%', left: '50%' }, // Head & Forehead
      connectorSide: 'left',
    },
    {
      id: 'ears',
      organ: t('bodyEarsTitle'),
      featureName: t('bodyEarsFeature'),
      desc: t('bodyEarsDesc'),
      icon: 'fa-solid fa-headphones',
      badge: t('mp3quranCardTag'),
      colorTheme: 'blue',
      action: onNavigateToMp3Quran,
      btnLabel: t('btnEnterMp3Quran'),
      coords: { top: '16%', left: '44%' }, // Ears / Head side
      connectorSide: 'left',
    },
    {
      id: 'heart',
      organ: t('bodyHeartTitle'),
      featureName: t('bodyHeartFeature'),
      desc: t('bodyHeartDesc'),
      icon: 'fa-solid fa-heart-pulse',
      badge: t('azkarCardTag'),
      colorTheme: 'amber',
      action: onNavigateToAzkar,
      btnLabel: t('btnEnterAzkar'),
      coords: { top: '33%', left: '50%' }, // Glowing Heart & Chest
      connectorSide: 'right',
    },
    {
      id: 'limbs',
      organ: t('bodyLimbsTitle'),
      featureName: t('bodyLimbsFeature'),
      desc: t('bodyLimbsDesc'),
      icon: 'fa-solid fa-mosque',
      badge: t('prayerCardTag'),
      colorTheme: 'teal',
      action: onNavigateToPrayer,
      btnLabel: t('btnEnterPrayer'),
      coords: { top: '49%', left: '50%' }, // Folded Hands at waist
      connectorSide: 'right',
    },
  ];

  return (
    <div className="home-page-container">
      {/* Hero Section Dedicated to: Name, Description & Image */}
      <section className="home-hero-section">
        <div className="hero-grid-layout">
          
          {/* Main Column: Name, Description & CTA */}
          <div className="hero-text-content">
            <div className="hero-academy-tag">
              <span className="pulse-dot"></span>
              <i className="fa-solid fa-graduation-cap"></i>
              <span>{t('academyTag')}</span>
            </div>

            <h1 className="hero-main-title">
              {t('heroMainTitle')}
              <span className="hero-title-sub">{t('heroTitleSub')}</span>
            </h1>

            <p className="hero-main-description">
              {t('heroDesc')}
            </p>

            <div className="hero-cta-group">
              <div className="hero-quick-stats">
                <div className="quick-stat-item">
                  <strong>240+</strong>
                  <span>{t('statReciters')}</span>
                </div>
                <div className="quick-stat-divider"></div>
                <div className="quick-stat-item">
                  <strong>177+</strong>
                  <span>{t('statRadios')}</span>
                </div>
                <div className="quick-stat-divider"></div>
                <div className="quick-stat-item">
                  <strong>114</strong>
                  <span>{t('statSurah')}</span>
                </div>
                <div className="quick-stat-divider"></div>
                <div className="quick-stat-item">
                  <strong>70+</strong>
                  <span>{t('statDuas')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Spiritual Body Figure (Replaces Old Hero Image) */}
          <div className="hero-figure-wrapper">
            <div className="human-figure-card hero-figure-card">
              <div className="human-figure-inner">
                <img
                  src={humanBodyImage}
                  alt={t('showcaseBadge')}
                  className="human-figure-img"
                />
                <div className="figure-ambient-glow"></div>
              </div>

              {/* 4 Interactive Body Part Hotspots */}
              {bodyParts.map(part => (
                <div
                  key={part.id}
                  className={`body-hotspot-pin pin-${part.id} theme-${part.colorTheme} ${selectedPart === part.id ? 'is-active' : ''}`}
                  style={{ top: part.coords.top, left: part.coords.left }}
                  onMouseEnter={() => setSelectedPart(part.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    part.action();
                  }}
                  role="button"
                  tabIndex={0}
                  title={`${part.organ} - ${part.featureName}`}
                >
                  <span className="hotspot-pulse-ring"></span>
                  <button className="hotspot-core-btn" aria-label={part.organ}>
                    <i className={part.icon}></i>
                  </button>

                  {/* Hotspot Floating Callout Button */}
                  <div className={`hotspot-callout-pill callout-${part.connectorSide}`}>
                    <span className="callout-organ">{part.organ}</span>
                    <span className="callout-feature">{part.featureName}</span>
                    <i className={`fa-solid ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'} callout-icon`}></i>
                  </div>
                </div>
              ))}
            </div>

            <div className="hero-figure-caption">
              <i className="fa-solid fa-child-reaching text-gold"></i>
              <span>{t('showcaseSubtitle')}</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HomePage;

