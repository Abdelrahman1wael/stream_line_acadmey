import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { PRESET_CITIES, CALCULATION_METHODS, JURISTIC_METHODS, ADHAN_TRACKS } from '../../data/prayerCities.js';

const PrayerSettingsModal = ({
  isOpen,
  onClose,
  currentCity,
  currentMethod,
  currentSchool,
  is12Hour,
  selectedAdhan,
  onSaveSettings
}) => {
  const { t, lang } = useLanguage();

  const [citySearch, setCitySearch] = useState('');
  const [selectedCityId, setSelectedCityId] = useState(currentCity.id);
  const [methodId, setMethodId] = useState(currentMethod);
  const [schoolId, setSchoolId] = useState(currentSchool);
  const [timeFormat12, setTimeFormat12] = useState(is12Hour);
  const [adhanId, setAdhanId] = useState(selectedAdhan);

  if (!isOpen) return null;

  const filteredCities = PRESET_CITIES.filter((c) => {
    const q = citySearch.toLowerCase().trim();
    if (!q) return true;
    return (
      c.nameAr.includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.countryAr.includes(q) ||
      c.countryEn.toLowerCase().includes(q)
    );
  });

  const handleSave = () => {
    const chosenCity = PRESET_CITIES.find((c) => c.id === selectedCityId) || currentCity;
    onSaveSettings({
      city: chosenCity,
      method: methodId,
      school: schoolId,
      is12Hour: timeFormat12,
      selectedAdhan: adhanId
    });
    onClose();
  };

  return (
    <div className="prayer-modal-backdrop" onClick={onClose}>
      <div className="prayer-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-title-wrap">
            <i className="fa-solid fa-sliders text-emerald"></i>
            <div>
              <h3 className="modal-heading">{t('prayerSettingsModalTitle')}</h3>
              <p className="modal-sub">{t('prayerSettingsModalSub')}</p>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="modal-scroll-body">
          {/* Section 1: City & Location Selector */}
          <div className="setting-group-box">
            <label className="setting-label">
              <i className="fa-solid fa-location-dot"></i>
              <span>{t('chooseCityLabel')}</span>
            </label>
            <div className="city-search-input-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder={t('searchCityPlaceholder')}
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
              />
            </div>

            <div className="preset-cities-grid">
              {filteredCities.map((c) => {
                const isSelected = c.id === selectedCityId;
                const name = lang === 'ar' ? c.nameAr : c.nameEn;
                const country = lang === 'ar' ? c.countryAr : c.countryEn;

                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`city-pill-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedCityId(c.id);
                      if (c.method) setMethodId(c.method);
                    }}
                  >
                    <span className="city-pill-name">{name}</span>
                    <span className="city-pill-country">{country}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Calculation Method */}
          <div className="setting-group-box">
            <label className="setting-label">
              <i className="fa-solid fa-calculator"></i>
              <span>{t('calculationMethodLabel')}</span>
            </label>
            <select
              className="setting-select-control"
              value={methodId}
              onChange={(e) => setMethodId(parseInt(e.target.value, 10))}
            >
              {CALCULATION_METHODS.map((m) => (
                <option key={m.id} value={m.id}>
                  {lang === 'ar' ? m.nameAr : m.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Section 3: Juristic Method for Asr */}
          <div className="setting-group-box">
            <label className="setting-label">
              <i className="fa-solid fa-scale-balanced"></i>
              <span>{t('juristicMethodLabel')}</span>
            </label>
            <div className="toggle-options-row">
              {JURISTIC_METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`toggle-option-btn ${schoolId === m.id ? 'active' : ''}`}
                  onClick={() => setSchoolId(m.id)}
                >
                  {lang === 'ar' ? m.nameAr : m.nameEn}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Time Format */}
          <div className="setting-group-box">
            <label className="setting-label">
              <i className="fa-solid fa-clock"></i>
              <span>{t('timeFormatLabel')}</span>
            </label>
            <div className="toggle-options-row">
              <button
                type="button"
                className={`toggle-option-btn ${timeFormat12 ? 'active' : ''}`}
                onClick={() => setTimeFormat12(true)}
              >
                {t('format12h')} (01:45 PM)
              </button>
              <button
                type="button"
                className={`toggle-option-btn ${!timeFormat12 ? 'active' : ''}`}
                onClick={() => setTimeFormat12(false)}
              >
                {t('format24h')} (13:45)
              </button>
            </div>
          </div>

          {/* Section 5: Adhan Reciter */}
          <div className="setting-group-box">
            <label className="setting-label">
              <i className="fa-solid fa-volume-high"></i>
              <span>{t('adhanVoiceLabel')}</span>
            </label>
            <select
              className="setting-select-control"
              value={adhanId}
              onChange={(e) => setAdhanId(e.target.value)}
            >
              {ADHAN_TRACKS.map((track) => (
                <option key={track.id} value={track.id}>
                  {lang === 'ar' ? track.nameAr : track.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-footer-bar">
          <button className="btn-modal-cancel" onClick={onClose}>
            {t('btnCancel')}
          </button>
          <button className="btn-modal-save" onClick={handleSave}>
            <i className="fa-solid fa-check"></i>
            <span>{t('btnSaveSettings')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrayerSettingsModal;
