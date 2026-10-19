import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAudio } from '../context/AudioContext.jsx';
import { SURAH_LIST } from '../data/quranData.js';
import {
  fetchAllReciters,
  fetchAllRadios,
  LIVE_TV_CHANNELS,
  AUDIO_TAFSIR_SOURCES,
  getSurahAudioUrl,
  getTafsirAudioUrl,
  formatSurahNumber
} from '../services/mp3QuranService.js';

const ARABIC_LETTERS = ['الكل', 'أ', 'إ', 'ب', 'ت', 'ج', 'ح', 'خ', 'د', 'ر', 'ز', 'س', 'ش', 'ص', 'ط', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'];

const Mp3QuranPage = () => {
  const { t, lang, isRTL } = useLanguage();
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  // Active Tab: 'reciters', 'radios', 'livetv', 'tafsir'
  const [activeTab, setActiveTab] = useState('reciters');

  // Reciters State
  const [reciters, setReciters] = useState([]);
  const [loadingReciters, setLoadingReciters] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState(null);
  const [selectedMoshafIndex, setSelectedMoshafIndex] = useState(0);
  const [reciterSearch, setReciterSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('الكل');
  const [surahSearch, setSurahSearch] = useState('');

  // Radios State
  const [radios, setRadios] = useState([]);
  const [loadingRadios, setLoadingRadios] = useState(true);
  const [radioSearch, setRadioSearch] = useState('');
  const [radioCategory, setRadioCategory] = useState('all');

  // Live TV State
  const [activeChannelId, setActiveChannelId] = useState('makkah');

  // Tafsir State
  const [selectedTafsirSource, setSelectedTafsirSource] = useState(AUDIO_TAFSIR_SOURCES[0]);
  const [tafsirSurahSearch, setTafsirSurahSearch] = useState('');

  // Fetch initial reciters
  useEffect(() => {
    let mounted = true;
    setLoadingReciters(true);
    fetchAllReciters(lang).then((data) => {
      if (mounted) {
        setReciters(data);
        if (data.length > 0 && !selectedReciter) {
          setSelectedReciter(data[0]);
        }
        setLoadingReciters(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [lang]);

  // Fetch radios
  useEffect(() => {
    let mounted = true;
    setLoadingRadios(true);
    fetchAllRadios(lang).then((data) => {
      if (mounted) {
        setRadios(data);
        setLoadingRadios(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [lang]);

  // Active Moshaf of selected reciter
  const activeMoshaf = useMemo(() => {
    if (!selectedReciter) return null;
    if (selectedReciter.moshaf && selectedReciter.moshaf.length > selectedMoshafIndex) {
      return selectedReciter.moshaf[selectedMoshafIndex];
    }
    return {
      name: selectedReciter.rewaya || 'حفص عن عاصم',
      server: selectedReciter.server,
      surah_total: selectedReciter.totalSurahs || 114
    };
  }, [selectedReciter, selectedMoshafIndex]);

  // Filtered reciters
  const filteredReciters = useMemo(() => {
    return reciters.filter((r) => {
      const matchSearch =
        !reciterSearch ||
        r.name.toLowerCase().includes(reciterSearch.toLowerCase()) ||
        (r.englishName && r.englishName.toLowerCase().includes(reciterSearch.toLowerCase()));

      const matchLetter =
        selectedLetter === 'الكل' ||
        r.letter === selectedLetter ||
        r.name.startsWith(selectedLetter);

      return matchSearch && matchLetter;
    });
  }, [reciters, reciterSearch, selectedLetter]);

  // Filtered Surahs for chosen reciter
  const availableSurahs = useMemo(() => {
    if (!selectedReciter) return SURAH_LIST;
    const list = selectedReciter.surahList || Array.from({ length: 114 }, (_, i) => i + 1);
    const surahSet = new Set(list);

    return SURAH_LIST.filter((s) => {
      const isAvailable = surahSet.size === 0 || surahSet.has(s.number);
      if (!isAvailable) return false;
      if (!surahSearch) return true;
      const q = surahSearch.toLowerCase();
      return (
        s.name.includes(q) ||
        s.englishName.toLowerCase().includes(q) ||
        String(s.number).includes(q)
      );
    });
  }, [selectedReciter, surahSearch]);

  // Filtered Radios
  const filteredRadios = useMemo(() => {
    return radios.filter((rd) => {
      const matchCat = radioCategory === 'all' || rd.category === radioCategory;
      const matchSearch =
        !radioSearch ||
        rd.name.toLowerCase().includes(radioSearch.toLowerCase()) ||
        (rd.englishName && rd.englishName.toLowerCase().includes(radioSearch.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [radios, radioCategory, radioSearch]);

  // Filtered Tafsir Surahs
  const filteredTafsirSurahs = useMemo(() => {
    return SURAH_LIST.filter((s) => {
      if (!tafsirSurahSearch) return true;
      const q = tafsirSurahSearch.toLowerCase();
      return (
        s.name.includes(q) ||
        s.englishName.toLowerCase().includes(q) ||
        String(s.number).includes(q)
      );
    });
  }, [tafsirSurahSearch]);

  // Play Surah handler
  const handlePlaySurah = (surah) => {
    if (!activeMoshaf || !activeMoshaf.server) return;
    const audioUrl = getSurahAudioUrl(activeMoshaf.server, surah.number);
    playTrack({
      type: 'surah',
      title: `${surah.name} (${surah.number})`,
      subtitle: `${selectedReciter.name} - ${activeMoshaf.name}`,
      reciterName: selectedReciter.name,
      reciterId: selectedReciter.id,
      surahNumber: surah.number,
      surahName: surah.name,
      serverUrl: activeMoshaf.server,
      audioUrl
    });
  };

  // Play Radio handler
  const handlePlayRadio = (rd) => {
    playTrack({
      type: 'radio',
      title: rd.name,
      subtitle: t('radioLiveBroadcast') || 'إذاعة مباشرة 24/7',
      reciterName: rd.name,
      audioUrl: rd.url,
      isLive: true
    });
  };

  // Play Tafsir handler
  const handlePlayTafsir = (surah) => {
    if (!selectedTafsirSource) return;
    const audioUrl = getTafsirAudioUrl(selectedTafsirSource.baseUrl, surah.number);
    playTrack({
      type: 'tafsir',
      title: `تفسير ${surah.name}`,
      subtitle: selectedTafsirSource.name,
      reciterName: selectedTafsirSource.scholar,
      surahNumber: surah.number,
      surahName: surah.name,
      audioUrl
    });
  };

  const activeChannel = LIVE_TV_CHANNELS.find((c) => c.id === activeChannelId) || LIVE_TV_CHANNELS[0];

  return (
    <div className="mp3quran-page-container">
      {/* Top Hero Banner */}
      <section className="mp3quran-hero-banner">
        <div className="mp3quran-hero-content">
          <div className="mp3quran-badge-pill">
            <span className="live-pulsing-dot"></span>
            <i className="fa-solid fa-headphones"></i>
            <span>{t('mp3quranHeroTag') || 'مكتبة MP3Quran الرسمية'}</span>
          </div>

          <h1 className="mp3quran-main-title">
            {t('mp3quranMainTitle') || 'المكتبة الصوتية الشاملة وإذاعات القرآن الكريم'}
          </h1>
          <p className="mp3quran-main-desc">
            {t('mp3quranMainDesc') ||
              'استمع لكبار قراء العالم الإسلامي بأعلى جودة صوتية مع تلاوات خاشعة ومصاحف كاملة، وأكثر من 170 إذاعة قرآنية مباشرة 24/7، وبث حي ومباشر للحرمين الشريفين من مكة المكرمة والمدينة المنورة.'}
          </p>

          {/* Quick Stat Chips */}
          <div className="mp3quran-stat-chips">
            <div className="stat-chip">
              <i className="fa-solid fa-microphone-lines text-gold"></i>
              <strong>240+</strong>
              <span>{t('statReciters') || 'قارئ معتمد'}</span>
            </div>
            <div className="stat-chip">
              <i className="fa-solid fa-tower-broadcast text-emerald"></i>
              <strong>177+</strong>
              <span>{t('statRadios') || 'إذاعة مباشرة'}</span>
            </div>
            <div className="stat-chip">
              <i className="fa-solid fa-kaaba text-blue"></i>
              <strong>24/7</strong>
              <span>{t('statLiveTv') || 'بث الحرمين'}</span>
            </div>
            <div className="stat-chip">
              <i className="fa-solid fa-book-open-reader text-purple"></i>
              <strong>114</strong>
              <span>{t('statTafsir') || 'تفسير السور'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Navigation Bar */}
      <div className="mp3quran-tabs-nav-bar">
        <button
          className={`tab-nav-btn ${activeTab === 'reciters' ? 'active' : ''}`}
          onClick={() => setActiveTab('reciters')}
        >
          <i className="fa-solid fa-microphone"></i>
          <span>{t('tabReciters') || 'المصحف والقراء'}</span>
          <span className="tab-count-tag">{reciters.length || 240}</span>
        </button>

        <button
          className={`tab-nav-btn ${activeTab === 'radios' ? 'active' : ''}`}
          onClick={() => setActiveTab('radios')}
        >
          <i className="fa-solid fa-radio"></i>
          <span>{t('tabRadios') || 'إذاعات القرآن الكريم'}</span>
          <span className="tab-count-tag live-tag">177+ {t('badgeLive') || 'مباشر'}</span>
        </button>

        <button
          className={`tab-nav-btn ${activeTab === 'livetv' ? 'active' : ''}`}
          onClick={() => setActiveTab('livetv')}
        >
          <i className="fa-solid fa-tv"></i>
          <span>{t('tabLiveTv') || 'بث الحرمين المباشر'}</span>
        </button>

        <button
          className={`tab-nav-btn ${activeTab === 'tafsir' ? 'active' : ''}`}
          onClick={() => setActiveTab('tafsir')}
        >
          <i className="fa-solid fa-book-quran"></i>
          <span>{t('tabAudioTafsir') || 'التفسير الصوتي'}</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: RECITERS & MOSHAFS                                       */}
      {/* ============================================================== */}
      {activeTab === 'reciters' && (
        <section className="tab-view-content reciters-view">
          <div className="reciters-two-col-layout">
            {/* Left/Sidebar Column: Reciters Directory */}
            <aside className="reciters-sidebar-panel">
              <div className="reciters-search-box">
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                <input
                  type="text"
                  placeholder={t('searchReciterPlaceholder') || 'ابحث باسم القارئ (مثل: العفاسي، عبد الباسط)...'}
                  value={reciterSearch}
                  onChange={(e) => setReciterSearch(e.target.value)}
                  className="reciter-search-input"
                />
                {reciterSearch && (
                  <button className="clear-search-btn" onClick={() => setReciterSearch('')}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>

              {/* Arabic Alphabet Filter Strip */}
              <div className="letter-filter-scroll">
                {ARABIC_LETTERS.map((letter) => (
                  <button
                    key={letter}
                    className={`letter-pill ${selectedLetter === letter ? 'active' : ''}`}
                    onClick={() => setSelectedLetter(letter)}
                  >
                    {letter}
                  </button>
                ))}
              </div>

              {/* Reciters List */}
              <div className="reciters-scroll-list">
                {loadingReciters ? (
                  <div className="loading-state-box">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>{t('loadingReciters') || 'جارٍ تحميل قائمة القراء...'}</span>
                  </div>
                ) : filteredReciters.length === 0 ? (
                  <div className="empty-results-box">
                    <i className="fa-solid fa-user-slash"></i>
                    <p>{t('noRecitersFound') || 'لم يتم العثور على قراء يطابقون البحث'}</p>
                  </div>
                ) : (
                  filteredReciters.map((r) => {
                    const isSelected = selectedReciter?.id === r.id;
                    const isCurrentlyPlayingThisReciter =
                      currentTrack?.reciterId === r.id && isPlaying;

                    return (
                      <div
                        key={r.id}
                        className={`reciter-list-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedReciter(r);
                          setSelectedMoshafIndex(0);
                        }}
                      >
                        <div className="reciter-avatar-circle">
                          <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="reciter-details">
                          <h4 className="reciter-name">{r.name}</h4>
                          <span className="reciter-meta">
                            {r.rewaya || 'حفص عن عاصم'} • {r.totalSurahs || 114} سورة
                          </span>
                        </div>
                        {isCurrentlyPlayingThisReciter && (
                          <div className="playing-wave-indicator">
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </aside>

            {/* Main Column: Selected Reciter Moshaf & Surah Grid */}
            <main className="reciter-detail-main">
              {selectedReciter && (
                <div className="reciter-hero-card">
                  <div className="reciter-header-info">
                    <div className="reciter-badge-icon">
                      <i className="fa-solid fa-book-open-reader"></i>
                    </div>
                    <div>
                      <h2 className="reciter-hero-title">{selectedReciter.name}</h2>
                      <p className="reciter-hero-sub">
                        {lang === 'ar' ? selectedReciter.rewaya : selectedReciter.englishName}
                      </p>
                    </div>
                  </div>

                  {/* Moshaf selection if reciter has multiple versions */}
                  {selectedReciter.moshaf && selectedReciter.moshaf.length > 1 && (
                    <div className="moshaf-selector-row">
                      <label className="moshaf-label">
                        <i className="fa-solid fa-layer-group"></i>
                        <span>{t('chooseMoshaf') || 'اختر المصحف أو الرواية:'}</span>
                      </label>
                      <div className="moshaf-pills">
                        {selectedReciter.moshaf.map((m, idx) => (
                          <button
                            key={m.id || idx}
                            className={`moshaf-pill-btn ${selectedMoshafIndex === idx ? 'active' : ''}`}
                            onClick={() => setSelectedMoshafIndex(idx)}
                          >
                            {m.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Surah Search Filter within chosen reciter */}
                  <div className="surah-filter-toolbar">
                    <div className="surah-search-input-box">
                      <i className="fa-solid fa-magnifying-glass"></i>
                      <input
                        type="text"
                        placeholder={t('searchSurahPlaceholder') || 'ابحث عن سورة (مثل: الكهف، البقرة، 18)...'}
                        value={surahSearch}
                        onChange={(e) => setSurahSearch(e.target.value)}
                      />
                      {surahSearch && (
                        <button className="clear-btn" onClick={() => setSurahSearch('')}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      )}
                    </div>
                    <span className="surahs-count-badge">
                      {availableSurahs.length} {t('surahsCount') || 'سورة متوفرة'}
                    </span>
                  </div>
                </div>
              )}

              {/* 114 Surahs Grid */}
              <div className="surahs-audio-grid">
                {availableSurahs.map((surah) => {
                  const isTrackActive =
                    currentTrack?.surahNumber === surah.number &&
                    currentTrack?.reciterId === selectedReciter?.id;
                  const isTrackPlaying = isTrackActive && isPlaying;
                  const downloadUrl = activeMoshaf?.server
                    ? getSurahAudioUrl(activeMoshaf.server, surah.number)
                    : null;

                  return (
                    <div
                      key={surah.number}
                      className={`surah-audio-card ${isTrackActive ? 'active' : ''}`}
                    >
                      <div className="surah-card-header">
                        <span className="surah-number-badge">
                          {formatSurahNumber(surah.number)}
                        </span>
                        <div className="surah-names">
                          <h4 className="surah-arabic-name">{surah.name}</h4>
                          <span className="surah-english-name">{surah.englishName}</span>
                        </div>
                        <span className={`surah-type-badge ${surah.type === 'Meccan' ? 'meccan' : 'medinan'}`}>
                          {surah.type === 'Meccan' ? (t('meccan') || 'مكية') : (t('medinan') || 'مدنية')}
                        </span>
                      </div>

                      <div className="surah-card-meta">
                        <span>
                          <i className="fa-solid fa-align-right"></i> {surah.ayahs} {t('ayahsUnit') || 'آية'}
                        </span>
                      </div>

                      <div className="surah-card-actions">
                        <button
                          className={`btn-play-surah ${isTrackPlaying ? 'playing' : ''}`}
                          onClick={() => {
                            if (isTrackActive) {
                              togglePlay();
                            } else {
                              handlePlaySurah(surah);
                            }
                          }}
                          aria-label={`Play Surah ${surah.name}`}
                        >
                          {isTrackPlaying ? (
                            <>
                              <i className="fa-solid fa-pause"></i>
                              <span>{t('btnPause') || 'إيقاف'}</span>
                            </>
                          ) : (
                            <>
                              <i className="fa-solid fa-play"></i>
                              <span>{t('btnListen') || 'استماع'}</span>
                            </>
                          )}
                        </button>

                        {downloadUrl && (
                          <a
                            href={downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="btn-download-surah"
                            title={t('downloadMp3') || 'تحميل السورة MP3'}
                          >
                            <i className="fa-solid fa-download"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </main>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* TAB 2: LIVE RADIOS (177+ STATIONS)                              */}
      {/* ============================================================== */}
      {activeTab === 'radios' && (
        <section className="tab-view-content radios-view">
          <div className="radios-controls-card">
            <div className="radio-search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder={t('searchRadiosPlaceholder') || 'ابحث عن إذاعة (مثل: القاهرة، تلاوات خاشعة، العفاسي)...'}
                value={radioSearch}
                onChange={(e) => setRadioSearch(e.target.value)}
              />
              {radioSearch && (
                <button className="clear-btn" onClick={() => setRadioSearch('')}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            <div className="radio-category-pills">
              <button
                className={`cat-pill ${radioCategory === 'all' ? 'active' : ''}`}
                onClick={() => setRadioCategory('all')}
              >
                <i className="fa-solid fa-globe"></i>
                <span>{t('radioCatAll') || 'جميع الإذاعات'} ({radios.length})</span>
              </button>

              <button
                className={`cat-pill ${radioCategory === 'reciter' ? 'active' : ''}`}
                onClick={() => setRadioCategory('reciter')}
              >
                <i className="fa-solid fa-microphone-lines"></i>
                <span>{t('radioCatReciters') || 'إذاعات القراء'}</span>
              </button>

              <button
                className={`cat-pill ${radioCategory === 'general' ? 'active' : ''}`}
                onClick={() => setRadioCategory('general')}
              >
                <i className="fa-solid fa-heart"></i>
                <span>{t('radioCatKhushoo') || 'تلاوات خاشعة وعامة'}</span>
              </button>

              <button
                className={`cat-pill ${radioCategory === 'tafsir' ? 'active' : ''}`}
                onClick={() => setRadioCategory('tafsir')}
              >
                <i className="fa-solid fa-book"></i>
                <span>{t('radioCatTafsir') || 'التفسير والفتاوى'}</span>
              </button>
            </div>
          </div>

          {loadingRadios ? (
            <div className="loading-state-box">
              <i className="fa-solid fa-spinner fa-spin"></i>
              <span>{t('loadingRadios') || 'جارٍ تحميل محطات الإذاعة المباشرة...'}</span>
            </div>
          ) : (
            <div className="radios-cards-grid">
              {filteredRadios.map((rd) => {
                const isThisRadioActive =
                  currentTrack?.audioUrl === rd.url;
                const isThisRadioPlaying = isThisRadioActive && isPlaying;

                return (
                  <div
                    key={rd.id}
                    className={`radio-station-card ${isThisRadioActive ? 'active' : ''}`}
                  >
                    <div className="station-top-row">
                      <div className="station-icon-bubble">
                        <i className="fa-solid fa-tower-broadcast"></i>
                      </div>
                      <div className="live-status-pill">
                        <span className="live-pulsing-dot"></span>
                        <span>{t('badgeLive') || 'مباشر'}</span>
                      </div>
                    </div>

                    <h3 className="station-title">{rd.name}</h3>
                    <p className="station-category-tag">
                      {rd.category === 'reciter'
                        ? (t('radioCatReciters') || 'إذاعة قارئ')
                        : rd.category === 'tafsir'
                        ? (t('radioCatTafsir') || 'تفسير وفتاوى')
                        : (t('radioCatKhushoo') || 'إذاعة عامة وتلاوات')}
                    </p>

                    <button
                      className={`btn-play-radio ${isThisRadioPlaying ? 'playing' : ''}`}
                      onClick={() => {
                        if (isThisRadioActive) {
                          togglePlay();
                        } else {
                          handlePlayRadio(rd);
                        }
                      }}
                    >
                      {isThisRadioPlaying ? (
                        <>
                          <i className="fa-solid fa-pause"></i>
                          <span>{t('btnPause') || 'إيقاف البث'}</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-play"></i>
                          <span>{t('btnListenLive') || 'استماع الآن'}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ============================================================== */}
      {/* TAB 3: LIVE TV MAKKAH & MADINAH                                */}
      {/* ============================================================== */}
      {activeTab === 'livetv' && (
        <section className="tab-view-content livetv-view">
          <div className="livetv-channel-switcher">
            {LIVE_TV_CHANNELS.map((ch) => (
              <button
                key={ch.id}
                className={`channel-switch-btn ${activeChannelId === ch.id ? 'active' : ''}`}
                onClick={() => setActiveChannelId(ch.id)}
              >
                <i className={ch.id === 'makkah' ? "fa-solid fa-kaaba" : "fa-solid fa-mosque"}></i>
                <div className="channel-btn-text">
                  <strong>{ch.name}</strong>
                  <span>{ch.location}</span>
                </div>
                <span className="live-pill">
                  <span className="live-pulsing-dot"></span>
                  {t('badgeLive') || 'مباشر'}
                </span>
              </button>
            ))}
          </div>

          <div className="livetv-video-container-card">
            <div className="video-header-bar">
              <div className="video-title-area">
                <i className="fa-solid fa-circle-dot text-emerald pulse"></i>
                <h3>{activeChannel.name}</h3>
                <span className="location-pill">{activeChannel.location}</span>
              </div>
              <a
                href={activeChannel.streamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="external-stream-link"
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                <span>{t('openDirectStream') || 'فتح البث المباشر المباشر'}</span>
              </a>
            </div>

            <div className="video-player-frame-wrapper">
              <iframe
                title={activeChannel.name}
                src={activeChannel.backupEmbed}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="livetv-iframe"
              ></iframe>
            </div>

            <div className="livetv-footer-info">
              <div className="info-item">
                <i className="fa-solid fa-clock text-gold"></i>
                <div>
                  <strong>{t('live247Broadcast') || 'بث رسمي مستمر 24/7'}</strong>
                  <p>{t('liveBroadcastDesc') || 'نقل حي ومباشر للصلوات الخمس والأذان والطواف من الحرمين الشريفين.'}</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-shield-halved text-emerald"></i>
                <div>
                  <strong>{t('verifiedOfficialStream') || 'بث رسمي موثوق'}</strong>
                  <p>{t('verifiedStreamDesc') || 'مصدر البث الرسمي المعتمد من هيئة الإذاعة والتلفزيون وموقع MP3Quran.'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* TAB 4: AUDIO TAFSIR                                            */}
      {/* ============================================================== */}
      {activeTab === 'tafsir' && (
        <section className="tab-view-content tafsir-view">
          <div className="tafsir-sources-selector-card">
            <h3>
              <i className="fa-solid fa-book-open-reader text-emerald"></i>
              <span>{t('chooseTafsirSource') || 'اختر كتاب التفسير الصوتي:'}</span>
            </h3>

            <div className="tafsir-source-buttons">
              {AUDIO_TAFSIR_SOURCES.map((source) => (
                <button
                  key={source.id}
                  className={`tafsir-source-btn ${selectedTafsirSource.id === source.id ? 'active' : ''}`}
                  onClick={() => setSelectedTafsirSource(source)}
                >
                  <i className="fa-solid fa-scroll text-gold"></i>
                  <div className="btn-details">
                    <strong>{source.name}</strong>
                    <span>{source.scholar}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="tafsir-search-row">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder={t('searchTafsirSurah') || 'ابحث عن سورة للاستماع إلى تفسيرها...'}
                value={tafsirSurahSearch}
                onChange={(e) => setTafsirSurahSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="tafsir-surahs-grid">
            {filteredTafsirSurahs.map((surah) => {
              const isTafsirActive =
                currentTrack?.type === 'tafsir' &&
                currentTrack?.surahNumber === surah.number;
              const isTafsirPlaying = isTafsirActive && isPlaying;
              const downloadUrl = getTafsirAudioUrl(
                selectedTafsirSource.baseUrl,
                surah.number
              );

              return (
                <div
                  key={surah.number}
                  className={`tafsir-surah-card ${isTafsirActive ? 'active' : ''}`}
                >
                  <div className="card-top">
                    <span className="surah-num">{formatSurahNumber(surah.number)}</span>
                    <h4>تفسير {surah.name}</h4>
                    <span className="scholar-tag">{selectedTafsirSource.scholar}</span>
                  </div>

                  <div className="card-actions">
                    <button
                      className={`btn-play-tafsir ${isTafsirPlaying ? 'playing' : ''}`}
                      onClick={() => {
                        if (isTafsirActive) {
                          togglePlay();
                        } else {
                          handlePlayTafsir(surah);
                        }
                      }}
                    >
                      {isTafsirPlaying ? (
                        <>
                          <i className="fa-solid fa-pause"></i>
                          <span>{t('btnPause') || 'إيقاف'}</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-play"></i>
                          <span>{t('listenTafsir') || 'استماع للتفسير'}</span>
                        </>
                      )}
                    </button>

                    {downloadUrl && (
                      <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="btn-download-tafsir"
                        title={t('downloadMp3') || 'تحميل التفسير MP3'}
                      >
                        <i className="fa-solid fa-download"></i>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Mp3QuranPage;
