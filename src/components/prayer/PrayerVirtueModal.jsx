import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';

const PrayerVirtueModal = ({ isOpen, onClose, prayer }) => {
  const { t, lang } = useLanguage();

  if (!isOpen || !prayer) return null;

  const prayerName = lang === 'ar' ? prayer.nameAr : prayer.nameEn;
  const virtueText = lang === 'ar' ? prayer.virtueAr : prayer.virtueEn;
  const sunnahDesc = lang === 'ar' ? prayer.sunnahDescAr : prayer.sunnahDescEn;

  return (
    <div className="prayer-modal-backdrop" onClick={onClose}>
      <div className="prayer-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-title-wrap">
            <div className="modal-prayer-avatar" style={{ '--avatar-accent': prayer.color }}>
              <i className={prayer.icon}></i>
            </div>
            <div>
              <h3 className="modal-heading">
                {t('virtueOfPrayer')}: {prayerName}
              </h3>
              <span className="modal-sub">
                {!prayer.isNotObligatory ? `${prayer.rakats} ${t('rakatUnit')}` : t('tagSunnah')}
              </span>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="modal-scroll-body">
          {/* Main Hadith / Virtue Box */}
          <div className="virtue-hadith-card">
            <div className="virtue-quote-icon">
              <i className="fa-solid fa-quote-right"></i>
            </div>
            <p className="virtue-hadith-text">
              {virtueText}
            </p>
          </div>

          {/* Sunan Rawatib Details */}
          <div className="virtue-detail-block">
            <h4 className="detail-block-title">
              <i className="fa-solid fa-hands-praying text-emerald"></i>
              <span>{t('sunnahRawatibTitle')}</span>
            </h4>
            <p className="detail-block-text">{sunnahDesc}</p>
          </div>

          {/* Etiquettes of Prayer */}
          <div className="virtue-detail-block">
            <h4 className="detail-block-title">
              <i className="fa-solid fa-heart text-gold"></i>
              <span>{t('prayerEtiquettesTitle')}</span>
            </h4>
            <ul className="prayer-etiquettes-list">
              <li><i className="fa-solid fa-check text-emerald"></i> {t('etiquette1')}</li>
              <li><i className="fa-solid fa-check text-emerald"></i> {t('etiquette2')}</li>
              <li><i className="fa-solid fa-check text-emerald"></i> {t('etiquette3')}</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer-bar">
          <button className="btn-modal-cancel" onClick={onClose}>
            {t('btnClose')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrayerVirtueModal;
