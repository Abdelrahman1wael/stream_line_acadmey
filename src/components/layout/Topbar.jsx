import React from 'react';
import { useGame } from '../../hooks/useGame.js';
import { SURAH_LIST } from '../../data/quranData.js';

const Topbar = () => {
  const {
    setSidebarOpen,
    currentJuzObj,
    currentSurah,
    changeSurah,
    currentAyah,
    totalAyahs,
    changeAyah,
    prevAyah,
    nextAyah,
    autoPlayWordVoice,
    toggleWordVoice,
    giveHint
  } = useGame();

  const surahsInJuz = currentJuzObj?.surahs?.map((s) => s.number) || [];

  return (
    <header className="topbar">
      <div className="topbar-right-controls">
        <button
          className="mobile-toggle"
          id="mobile-menu-btn"
          title="فتح قائمة الأجزاء"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="current-juz-tag">
          <i className="fa-solid fa-book-bookmark text-emerald"></i>
          <span className="juz-tag-label">الجزء:</span>
          <strong id="current-juz-title">
            {currentJuzObj
              ? `الجزء ${currentJuzObj.number} (${currentJuzObj.arabicName})`
              : 'الجزء الثلاثون (عَمَّ)'}
          </strong>
        </div>
      </div>

      <div className="topbar-left-controls">
        {/* Surah and Ayah Selectors */}
        <div className="topbar-picker">
          <div className="picker-item">
            <span className="picker-label">
              <i className="fa-solid fa-book-open"></i> السورة:
            </span>
            <div className="select-wrapper">
              <select
                id="surah-select"
                className="styled-select"
                aria-label="اختر السورة"
                value={currentSurah}
                onChange={(e) => changeSurah(parseInt(e.target.value, 10))}
              >
                {SURAH_LIST.map((surah) => {
                  const isInJuz = surahsInJuz.includes(surah.number);
                  return (
                    <option
                      key={surah.number}
                      value={surah.number}
                      style={{
                        fontWeight: isInJuz ? '700' : 'normal',
                        color: isInJuz ? '#047857' : undefined
                      }}
                    >
                      {surah.number}. سورة {surah.name}
                    </option>
                  );
                })}
              </select>
              <i className="fa-solid fa-chevron-down select-arrow"></i>
            </div>
          </div>

          <div className="picker-item">
            <span className="picker-label">
              <i className="fa-solid fa-list-ol"></i> الآية:
            </span>
            <div className="ayah-stepper">
              <button
                className="stepper-btn"
                id="next-ayah-btn"
                title="الآية التالية"
                onClick={nextAyah}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
              <input
                type="number"
                id="ayah-input"
                className="stepper-input"
                value={currentAyah}
                min="1"
                max={totalAyahs}
                aria-label="رقم الآية"
                onChange={(e) => {
                  let val = parseInt(e.target.value, 10);
                  if (isNaN(val)) return;
                  if (val < 1) val = 1;
                  if (val > totalAyahs) val = totalAyahs;
                  changeAyah(val);
                }}
              />
              <button
                className="stepper-btn"
                id="prev-ayah-btn"
                title="الآية السابقة"
                onClick={prevAyah}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            </div>
            <span className="ayah-total-label" id="ayah-total-label">
              من {totalAyahs}
            </span>
          </div>
        </div>

        <button
          className={`audio-settings-toggle ${autoPlayWordVoice ? 'active' : ''}`}
          id="word-audio-toggle"
          title="نطق الكلمة عند النقر"
          onClick={toggleWordVoice}
        >
          <i className="fa-solid fa-volume-high"></i>
          <span>صوت الكلمة</span>
        </button>

        <button
          className="btn-hint"
          id="hint-btn"
          title="مساعدة: وضع الكلمة التالية"
          onClick={giveHint}
        >
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <span>مساعدة</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
