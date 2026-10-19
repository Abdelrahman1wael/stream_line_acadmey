import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { PRESET_CITIES, PRAYERS_INFO } from '../data/prayerCities.js';
import { getPrayerTimes, detectUserLocation } from '../services/prayerService.js';
import { getPrayerStatus } from '../utils/prayerTimesCalculator.js';
import PrayerHeader from '../components/prayer/PrayerHeader.jsx';
import PrayerTimesList from '../components/prayer/PrayerTimesList.jsx';
import DailyPrayerTracker from '../components/prayer/DailyPrayerTracker.jsx';
import QiblaCompass from '../components/prayer/QiblaCompass.jsx';
import PrayerSettingsModal from '../components/prayer/PrayerSettingsModal.jsx';
import MonthlyPrayerModal from '../components/prayer/MonthlyPrayerModal.jsx';
import AdhanPlayerModal from '../components/prayer/AdhanPlayerModal.jsx';
import PrayerVirtueModal from '../components/prayer/PrayerVirtueModal.jsx';

const STORAGE_KEYS = {
  CITY: 'streamline_prayer_city',
  METHOD: 'streamline_prayer_method',
  SCHOOL: 'streamline_prayer_school',
  IS_12H: 'streamline_prayer_12h',
  ADHAN_ID: 'streamline_prayer_adhan'
};

const PrayerTimesPage = () => {
  const { t, lang, isRTL } = useLanguage();

  // Active top view tab: 'timings', 'qibla', 'monthly', 'virtues'
  const [activeTab, setActiveTab] = useState('timings');

  // Stored preferences
  const [city, setCity] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.CITY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return PRESET_CITIES[0]; // Default: Cairo
  });

  const [method, setMethod] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.METHOD);
      if (saved) return parseInt(saved, 10);
    }
    return 5; // Default: Egyptian General Authority
  });

  const [school, setSchool] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.SCHOOL);
      if (saved) return parseInt(saved, 10);
    }
    return 0; // Standard (Shafi'i/Maliki/Hanbali)
  });

  const [is12Hour, setIs12Hour] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.IS_12H);
      if (saved !== null) return saved === 'true';
    }
    return true;
  });

  const [selectedAdhanId, setSelectedAdhanId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.ADHAN_ID) || 'makkah';
    }
    return 'makkah';
  });

  // Prayer data state
  const [prayerData, setPrayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Live ticking status
  const [prayerStatus, setPrayerStatus] = useState(null);

  // Modals state
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showMonthlyModal, setShowMonthlyModal] = useState(false);
  const [showAdhanModal, setShowAdhanModal] = useState(false);
  const [activeAdhanPrayer, setActiveAdhanPrayer] = useState(null);
  const [showVirtueModal, setShowVirtueModal] = useState(false);
  const [selectedVirtuePrayer, setSelectedVirtuePrayer] = useState(null);

  // Daily prayer tracker state key
  const todayTrackerKey = useMemo(() => {
    const d = new Date();
    return `prayer_tracker_${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}`;
  }, []);

  const [trackerState, setTrackerState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(todayTrackerKey);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {};
  });

  // Save tracker progress
  const handleToggleTracker = (id, val) => {
    setTrackerState((prev) => {
      const next = { ...prev, [id]: val };
      try {
        localStorage.setItem(todayTrackerKey, JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const handleResetTracker = () => {
    setTrackerState({});
    try {
      localStorage.removeItem(todayTrackerKey);
    } catch (e) {
      // ignore
    }
    showToast(t('trackerResetSuccess'));
  };

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Fetch Prayer Data
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getPrayerTimes({
      latitude: city.lat,
      longitude: city.lng,
      method,
      school,
      date: new Date()
    }).then((data) => {
      if (isMounted) {
        setPrayerData(data);
        if (data && data.timings) {
          setPrayerStatus(getPrayerStatus(data.timings, new Date()));
        }
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [city, method, school]);

  // Live ticking countdown every second
  useEffect(() => {
    if (!prayerData || !prayerData.timings) return;

    const interval = setInterval(() => {
      setPrayerStatus(getPrayerStatus(prayerData.timings, new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerData]);

  // Handle GPS location detection
  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    try {
      const coords = await detectUserLocation();
      const detectedCity = {
        id: 'current_gps',
        nameAr: 'موقعي الحالي',
        nameEn: 'My Current Location',
        countryAr: 'إحداثيات GPS',
        countryEn: 'GPS Coordinates',
        lat: coords.latitude,
        lng: coords.longitude,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        method
      };

      setCity(detectedCity);
      localStorage.setItem(STORAGE_KEYS.CITY, JSON.stringify(detectedCity));
      showToast(t('locationDetectedSuccess'));
    } catch (err) {
      showToast(t('locationDetectFailed'));
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Save Settings from modal
  const handleSaveSettings = (newSettings) => {
    setCity(newSettings.city);
    setMethod(newSettings.method);
    setSchool(newSettings.school);
    setIs12Hour(newSettings.is12Hour);
    setSelectedAdhanId(newSettings.selectedAdhan);

    try {
      localStorage.setItem(STORAGE_KEYS.CITY, JSON.stringify(newSettings.city));
      localStorage.setItem(STORAGE_KEYS.METHOD, String(newSettings.method));
      localStorage.setItem(STORAGE_KEYS.SCHOOL, String(newSettings.school));
      localStorage.setItem(STORAGE_KEYS.IS_12H, String(newSettings.is12Hour));
      localStorage.setItem(STORAGE_KEYS.ADHAN_ID, newSettings.selectedAdhan);
    } catch (e) {
      // ignore
    }

    showToast(t('settingsSavedSuccess'));
  };

  // Open Adhan Modal for a specific prayer
  const handlePlayAdhan = (prayer) => {
    setActiveAdhanPrayer(prayer);
    setShowAdhanModal(true);
  };

  // Open Virtue Modal
  const handleViewVirtue = (prayer) => {
    setSelectedVirtuePrayer(prayer);
    setShowVirtueModal(true);
  };

  return (
    <div className="prayer-page-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="prayer-toast-bubble">
          <i className="fa-solid fa-circle-check text-emerald"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Hero Header */}
      <PrayerHeader
        city={city}
        prayerData={prayerData}
        prayerStatus={prayerStatus}
        isDetectingLocation={isDetectingLocation}
        onDetectLocation={handleDetectLocation}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenAdhanModal={() => {
          setActiveAdhanPrayer(PRAYERS_INFO.find((p) => p.id === prayerStatus?.nextPrayerKey) || PRAYERS_INFO[0]);
          setShowAdhanModal(true);
        }}
        onOpenMonthlyModal={() => setShowMonthlyModal(true)}
        is12Hour={is12Hour}
      />

      {/* Navigation Sub-Tabs Bar */}
      <div className="prayer-tabs-navbar">
        <button
          className={`prayer-tab-btn ${activeTab === 'timings' ? 'active' : ''}`}
          onClick={() => setActiveTab('timings')}
        >
          <i className="fa-solid fa-clock"></i>
          <span>{t('tabPrayerTimings')}</span>
        </button>

        <button
          className={`prayer-tab-btn ${activeTab === 'tracker' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracker')}
        >
          <i className="fa-solid fa-clipboard-check"></i>
          <span>{t('tabPrayerTracker')}</span>
          <span className="tab-pill-count">
            {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Sunan', 'Duha', 'Witr'].filter((k) => trackerState[k]).length}/8
          </span>
        </button>

        <button
          className={`prayer-tab-btn ${activeTab === 'qibla' ? 'active' : ''}`}
          onClick={() => setActiveTab('qibla')}
        >
          <i className="fa-solid fa-compass"></i>
          <span>{t('tabQiblaCompass')}</span>
        </button>

        <button
          className={`prayer-tab-btn ${activeTab === 'virtues' ? 'active' : ''}`}
          onClick={() => setActiveTab('virtues')}
        >
          <i className="fa-solid fa-hands-praying"></i>
          <span>{t('tabPrayerVirtues')}</span>
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="prayer-tab-content-wrapper">
        {loading && !prayerData ? (
          <div className="prayer-loading-banner">
            <i className="fa-solid fa-spinner fa-spin text-emerald"></i>
            <p>{t('loadingPrayerTimes')}</p>
          </div>
        ) : (
          <>
            {/* Tab 1: Timings & Schedule */}
            {activeTab === 'timings' && (
              <div className="tab-pane-timings">
                <PrayerTimesList
                  timings={prayerData?.timings}
                  prayerStatus={prayerStatus}
                  is12Hour={is12Hour}
                  onPlayAdhan={handlePlayAdhan}
                  onViewVirtue={handleViewVirtue}
                />
              </div>
            )}

            {/* Tab 2: Daily Prayer Checklist & Sunnah Tracker */}
            {activeTab === 'tracker' && (
              <div className="tab-pane-tracker">
                <DailyPrayerTracker
                  trackerState={trackerState}
                  onToggleItem={handleToggleTracker}
                  onResetTracker={handleResetTracker}
                />
              </div>
            )}

            {/* Tab 3: Qibla Compass */}
            {activeTab === 'qibla' && (
              <div className="tab-pane-qibla">
                <QiblaCompass
                  qiblaBearing={prayerData?.qibla || 136}
                  distanceToKaaba={prayerData?.distanceToKaaba || 1200}
                  cityName={lang === 'ar' ? city.nameAr : city.nameEn}
                />
              </div>
            )}

            {/* Tab 4: Virtues & Sunan */}
            {activeTab === 'virtues' && (
              <div className="tab-pane-virtues">
                <div className="virtues-overview-card">
                  <div className="virtues-overview-header">
                    <div className="virtues-icon-badge">
                      <i className="fa-solid fa-hands-praying text-emerald"></i>
                    </div>
                    <div>
                      <h3 className="virtues-overview-title">{t('virtuesOverviewTitle')}</h3>
                      <p className="virtues-overview-desc">{t('virtuesOverviewDesc')}</p>
                    </div>
                  </div>

                  <div className="hadith-feature-box">
                    <p className="hadith-text">
                      «مَا مِنْ امْرِئٍ مُسْلِمٍ تَحْضُرُهُ صَلَاةٌ مَكْتُوبَةٌ فَيُحْسِنُ وُضُوءَهَا وَخُشُوعَهَا وَرُكُوعَهَا، إِلَّا كَانَتْ كَفَّارَةً لِمَا قَبْلَهَا مِنْ الذُّنُوبِ مَا لَمْ يُؤْتِ كَبِيرَةً، وَذَلِكَ الدَّهْرَ كُلَّهُ»
                    </p>
                    <span className="hadith-source">صحيح مسلم</span>
                  </div>

                  <div className="virtues-cards-list">
                    {PRAYERS_INFO.map((prayer) => {
                      const name = lang === 'ar' ? prayer.nameAr : prayer.nameEn;
                      const virtue = lang === 'ar' ? prayer.virtueAr : prayer.virtueEn;
                      const sunnah = lang === 'ar' ? prayer.sunnahDescAr : prayer.sunnahDescEn;

                      return (
                        <div key={prayer.id} className="virtue-item-card">
                          <div className="virtue-card-head">
                            <div className="prayer-badge-icon" style={{ '--icon-accent': prayer.color }}>
                              <i className={prayer.icon}></i>
                            </div>
                            <div>
                              <h4 className="virtue-card-name">{name}</h4>
                              <span className="virtue-rakats-tag">
                                {!prayer.isNotObligatory ? `${prayer.rakats} ${t('rakatUnit')}` : t('tagSunnah')}
                              </span>
                            </div>
                          </div>

                          <p className="virtue-quote-body">{virtue}</p>

                          <div className="virtue-sunnah-box">
                            <i className="fa-solid fa-star text-gold"></i>
                            <span>{sunnah}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Settings Modal */}
      <PrayerSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        currentCity={city}
        currentMethod={method}
        currentSchool={school}
        is12Hour={is12Hour}
        selectedAdhan={selectedAdhanId}
        onSaveSettings={handleSaveSettings}
      />

      {/* Monthly Prayer Timetable Modal */}
      <MonthlyPrayerModal
        isOpen={showMonthlyModal}
        onClose={() => setShowMonthlyModal(false)}
        city={city}
        method={method}
        school={school}
        is12Hour={is12Hour}
      />

      {/* Adhan Audio Player Modal */}
      <AdhanPlayerModal
        isOpen={showAdhanModal}
        onClose={() => setShowAdhanModal(false)}
        initialPrayer={activeAdhanPrayer}
        selectedAdhanId={selectedAdhanId}
      />

      {/* Prayer Virtue Modal */}
      <PrayerVirtueModal
        isOpen={showVirtueModal}
        onClose={() => setShowVirtueModal(false)}
        prayer={selectedVirtuePrayer}
      />
    </div>
  );
};

export default PrayerTimesPage;
