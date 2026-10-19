import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';

const Footer = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="academy-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <i className="fa-solid fa-quran"></i>
            <span>{t('brandTitle')}</span>
          </div>
          <p className="footer-desc">
            {t('footerDesc')}
          </p>
        </div>

        <div className="footer-links">
          <h4>{t('footerSections')}</h4>
          <ul>
            <li>
              <button onClick={() => onNavigate('home')}>{t('navHome')}</button>
            </li>
            <li>
              <button onClick={() => onNavigate('game')}>{t('navGame')}</button>
            </li>
            <li>
              <button onClick={() => onNavigate('azkar')}>{t('navAzkar')}</button>
            </li>
            <li>
              <button onClick={() => onNavigate('prayer')}>{t('navPrayer')}</button>
            </li>
            <li>
              <button onClick={() => onNavigate('mp3quran')}>{t('navMp3Quran')}</button>
            </li>
          </ul>
        </div>

        <div className="footer-features">
          <h4>{t('footerFeatures')}</h4>
          <ul>
            <li><i className="fa-solid fa-check text-emerald"></i> {t('footerPerk1')}</li>
            <li><i className="fa-solid fa-check text-emerald"></i> {t('footerPerk2')}</li>
            <li><i className="fa-solid fa-check text-emerald"></i> {t('footerPerk3')}</li>
            <li><i className="fa-solid fa-check text-emerald"></i> {t('footerPerk4')}</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {t('brandTitle')} • {t('footerRights')}</p>
      </div>
    </footer>
  );
};

export default Footer;
