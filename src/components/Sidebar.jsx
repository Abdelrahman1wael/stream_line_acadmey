import React, { useState, useMemo } from 'react';

const Sidebar = ({
  isOpen,
  juzList,
  surahList,
  currentJuz,
  onSelectJuz,
  onCloseMobile
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJuzList = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return juzList;

    return juzList.filter((juz) => {
      return (
        juz.number.toString().includes(term) ||
        juz.arabicName.includes(term) ||
        juz.englishName.toLowerCase().includes(term)
      );
    });
  }, [juzList, searchTerm]);

  return (
    <aside
      className={`sidebar ${isOpen ? 'open' : ''}`}
      id="sidebar"
      aria-label="قائمة الأجزاء الثلاثين"
    >
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-icon">
            <i className="fa-solid fa-quran"></i>
          </div>
          <div>
            <h1 className="brand-title">أكاديمية ستريم لاين</h1>
            <span className="brand-subtitle">ترتيب كلمات القرآن</span>
          </div>
        </div>

        <div className="juz-search-box">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            id="juz-search-input"
            placeholder="ابحث عن جزء (1-30) أو سورة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      {/* Scrollable 30 Juz' List */}
      <nav className="juz-list" id="juz-list" aria-label="قائمة الأجزاء">
        {filteredJuzList.length === 0 ? (
          <div
            style={{
              padding: '20px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.88rem'
            }}
          >
            لا يوجد جزء يطابق "{searchTerm}"
          </div>
        ) : (
          filteredJuzList.map((juz) => {
            const firstSurah = surahList.find((s) => s.number === juz.startSurah);
            const lastSurah = surahList.find((s) => s.number === juz.endSurah);
            const surahSpan =
              firstSurah && lastSurah
                ? `سورة ${firstSurah.name} (${juz.startAyah}) ← سورة ${lastSurah.name} (${juz.endAyah})`
                : `سورة ${juz.startSurah} ← ${juz.endSurah}`;

            const isActive = juz.number === currentJuz;

            return (
              <div
                key={juz.number}
                className={`juz-card ${isActive ? 'active' : ''}`}
                data-juz={juz.number}
                onClick={() => {
                  onSelectJuz(juz.number);
                  if (window.innerWidth <= 900 && onCloseMobile) {
                    onCloseMobile();
                  }
                }}
              >
                <div className="juz-info">
                  <div className="juz-badge">{juz.number}</div>
                  <div className="juz-meta">
                    <span className="juz-label">الجزء {juz.number}</span>
                    <span className="juz-sub">{surahSpan}</span>
                  </div>
                </div>
                <div className="juz-arabic-title">{juz.arabicName}</div>
              </div>
            );
          })
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
