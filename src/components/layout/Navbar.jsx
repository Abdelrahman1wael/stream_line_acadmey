import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';

const Navbar = ({ currentPage, onNavigate, score }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();

  const handleNavClick = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="standard-navbar">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div className="navbar-brand" onClick={() => handleNavClick('home')} role="button" tabIndex={0}>
          <div className="brand-icon">
            <i className="fa-solid fa-quran"></i>
          </div>
          <div className="brand-details">
            <span className="brand-title">{t('brandTitle')}</span>
            <span className="brand-subtitle">{t('brandSubtitle')}</span>
          </div>
        </div>

        {/* Desktop Navigation Links (Centered, Standard Modern Web Standard) */}
        <nav className="navbar-links" aria-label="التنقل الرئيسي">
          <button
            className={`nav-link-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <i className="fa-solid fa-house"></i>
            <span>{t('navHome')}</span>
          </button>

          <button
            className={`nav-link-item ${currentPage === 'game' ? 'active' : ''}`}
            onClick={() => handleNavClick('game')}
          >
            <i className="fa-solid fa-puzzle-piece"></i>
            <span>{t('navGame')}</span>
          </button>

          <button
            className={`nav-link-item ${currentPage === 'azkar' ? 'active' : ''}`}
            onClick={() => handleNavClick('azkar')}
          >
            <i className="fa-solid fa-hands-praying"></i>
            <span>{t('navAzkar')}</span>
          </button>

          <button
            className={`nav-link-item ${currentPage === 'prayer' ? 'active' : ''}`}
            onClick={() => handleNavClick('prayer')}
          >
            <i className="fa-solid fa-mosque"></i>
            <span>{t('navPrayer')}</span>
          </button>

          <button
            className={`nav-link-item ${currentPage === 'mp3quran' ? 'active' : ''}`}
            onClick={() => handleNavClick('mp3quran')}
          >
            <i className="fa-solid fa-headphones"></i>
            <span>{t('navMp3Quran')}</span>
            <span className="nav-pill-new">{t('navNew')}</span>
          </button>
        </nav>

        {/* Left Actions (Score, Language Switcher, & Mobile Menu toggle) */}
        <div className="navbar-actions">
          {/* Language Switcher Button */}
          <button
            className="lang-toggle-button"
            onClick={toggleLanguage}
            title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            aria-label="Toggle language"
          >
            <i className="fa-solid fa-globe"></i>
            <span className="lang-label">{lang === 'ar' ? 'English' : 'عربي'}</span>
          </button>

          {currentPage === 'game' && (
            <div className="nav-score-chip" title="Score">
              <i className="fa-solid fa-star text-gold"></i>
              <span className="score-label">{t('navScore')}</span>
              <strong className="score-value">{score}</strong>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="تبديل القائمة"
            aria-expanded={mobileMenuOpen}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (World Standard Responsive Mobile Menu) */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <button
            className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <i className="fa-solid fa-house"></i>
            <span>{t('navHome')}</span>
          </button>

          <button
            className={`mobile-nav-link ${currentPage === 'game' ? 'active' : ''}`}
            onClick={() => handleNavClick('game')}
          >
            <i className="fa-solid fa-puzzle-piece"></i>
            <span>{t('navGame')}</span>
          </button>

          <button
            className={`mobile-nav-link ${currentPage === 'azkar' ? 'active' : ''}`}
            onClick={() => handleNavClick('azkar')}
          >
            <i className="fa-solid fa-hands-praying"></i>
            <span>{t('navAzkar')}</span>
          </button>

          <button
            className={`mobile-nav-link ${currentPage === 'prayer' ? 'active' : ''}`}
            onClick={() => handleNavClick('prayer')}
          >
            <i className="fa-solid fa-mosque"></i>
            <span>{t('navPrayer')}</span>
          </button>

          <button
            className={`mobile-nav-link ${currentPage === 'mp3quran' ? 'active' : ''}`}
            onClick={() => handleNavClick('mp3quran')}
          >
            <i className="fa-solid fa-headphones"></i>
            <span>{t('navMp3Quran')}</span>
            <span className="nav-pill-new">{t('navNew')}</span>
          </button>

          <button
            className="mobile-nav-link mobile-lang-link"
            onClick={() => {
              toggleLanguage();
              setMobileMenuOpen(false);
            }}
          >
            <i className="fa-solid fa-globe"></i>
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
