import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { AZKAR_CATEGORIES, AZKAR_DATA } from '../data/azkarData.js';
import AzkarCard from '../components/azkar/AzkarCard.jsx';
import TasbihCounter from '../components/azkar/TasbihCounter.jsx';
import AzkarStatsModal from '../components/azkar/AzkarStatsModal.jsx';
import AzkarCelebrationModal from '../components/azkar/AzkarCelebrationModal.jsx';
import { soundManager, triggerHaptic } from '../utils/audioUtils.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const AzkarPage = () => {
  const { t, lang, isRTL } = useLanguage();

  // 1. Auto detect category based on current time
  const getAutoCategory = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 15) return 'morning';
    if (hour >= 15 && hour < 20) return 'evening';
    return 'sleep';
  };

  const [activeTab, setActiveTab] = useState(getAutoCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'remaining', 'completed'
  const [fontSizeLevel, setFontSizeLevel] = useState(0); // -1, 0, 1, 2
  const [toastMessage, setToastMessage] = useState(null);

  // Audio player state
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const audioRef = useRef(null);

  // Modals state
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [celebrationTitle, setCelebrationTitle] = useState('');

  // Daily State Key (resets daily progress while keeping streaks)
  const todayKey = useMemo(() => {
    const d = new Date();
    return `azkar_${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}`;
  }, []);

  // Progress state: { [zekrId]: remainingCount }
  const [azkarProgress, setAzkarProgress] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(todayKey);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    // Initialize defaults
    const initial = {};
    AZKAR_DATA.forEach(item => {
      initial[item.id] = item.count || 1;
    });
    return initial;
  });

  // Streaks & Lifetime stats
  const [streak, setStreak] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('azkar_streak_days') || '1', 10);
    }
    return 1;
  });

  const [totalCompleted, setTotalCompleted] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('azkar_total_completed') || '0', 10);
    }
    return 0;
  });

  // Persist progress to LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(todayKey, JSON.stringify(azkarProgress));
    }
  }, [azkarProgress, todayKey]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Show toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Helper for localized category name & period
  const getCategoryTitle = (catId) => {
    const map = {
      morning: t('catMorning'),
      evening: t('catEvening'),
      sleep: t('catSleep'),
      prayer: t('catPrayer'),
      tasbih: t('catTasbih')
    };
    return map[catId] || catId;
  };

  const getCategoryPeriod = (catId) => {
    const map = {
      morning: t('periodMorning'),
      evening: t('periodEvening'),
      sleep: t('periodSleep'),
      prayer: t('periodPrayer'),
      tasbih: t('periodTasbih')
    };
    return map[catId] || '';
  };

  // Canonical category name in Arabic for filtering database
  const activeCategoryMeta = AZKAR_CATEGORIES.find(c => c.id === activeTab);
  const activeCategoryDbName = activeCategoryMeta ? activeCategoryMeta.label : 'أذكار الصباح';
  const activeCategoryDisplayTitle = getCategoryTitle(activeTab);

  // Filter items for current tab
  const categoryItems = useMemo(() => {
    if (activeTab === 'tasbih') return [];
    return AZKAR_DATA.filter(item => item.category === activeCategoryDbName);
  }, [activeTab, activeCategoryDbName]);

  // Filter with search & completion status
  const displayedItems = useMemo(() => {
    if (activeTab === 'tasbih') return [];

    return categoryItems.filter(item => {
      const remaining = azkarProgress[item.id] !== undefined ? azkarProgress[item.id] : item.count;
      const isCompleted = remaining === 0;

      // Filter Mode
      if (filterMode === 'remaining' && isCompleted) return false;
      if (filterMode === 'completed' && !isCompleted) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesText = item.zekr.toLowerCase().includes(query);
        const matchesRef = item.reference && item.reference.toLowerCase().includes(query);
        const matchesDesc = item.description && item.description.toLowerCase().includes(query);
        return matchesText || matchesRef || matchesDesc;
      }

      return true;
    });
  }, [categoryItems, azkarProgress, filterMode, searchQuery, activeTab]);

  // Statistics for the current category
  const categoryTotalCount = categoryItems.length;
  const categoryCompletedCount = categoryItems.filter(item => azkarProgress[item.id] === 0).length;
  const categoryPercent = categoryTotalCount > 0 ? Math.round((categoryCompletedCount / categoryTotalCount) * 100) : 0;

  // Handle tap count on an AzkarCard
  const handleTapCount = (zekr) => {
    const currentRemaining = azkarProgress[zekr.id] !== undefined ? azkarProgress[zekr.id] : zekr.count;
    if (currentRemaining <= 0) return;

    const newRemaining = currentRemaining - 1;
    setAzkarProgress(prev => ({
      ...prev,
      [zekr.id]: newRemaining
    }));

    if (newRemaining === 0) {
      soundManager.playZikrComplete();
      triggerHaptic('medium');

      // Check if all items in category are now completed
      const remainingOthers = categoryItems.filter(item => item.id !== zekr.id && azkarProgress[item.id] > 0);
      if (remainingOthers.length === 0) {
        // Section Complete!
        triggerSectionCelebration(activeCategoryDisplayTitle);
      }
    } else {
      soundManager.playTap();
      triggerHaptic('light');
    }
  };

  // Trigger celebration effects
  const triggerSectionCelebration = (categoryTitleText) => {
    soundManager.playSectionComplete();
    triggerHaptic('success');

    // Confetti animation
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
    } catch (e) {
      // Confetti fallback
    }

    // Increment completion stats
    const nextTotal = totalCompleted + 1;
    setTotalCompleted(nextTotal);
    localStorage.setItem('azkar_total_completed', nextTotal.toString());

    setCelebrationTitle(categoryTitleText);
    setShowCelebrationModal(true);
  };

  // Undo single zikr
  const handleUndo = (zekr) => {
    setAzkarProgress(prev => ({
      ...prev,
      [zekr.id]: zekr.count || 1
    }));
    showToast(lang === 'ar' ? 'تمت إعادة الذكر للبدء من جديد' : 'Reset remembrance to start over');
  };

  // Reset entire category
  const handleResetCategory = () => {
    const next = { ...azkarProgress };
    categoryItems.forEach(item => {
      next[item.id] = item.count || 1;
    });
    setAzkarProgress(next);
    setShowCelebrationModal(false);
    showToast(lang === 'ar' ? `تمت إعادة ضبط ${activeCategoryDisplayTitle}` : `Reset ${activeCategoryDisplayTitle}`);
  };

  // Audio Playback
  const handlePlayAudio = (zekr) => {
    if (!zekr.audio) return;

    if (playingAudioId === zekr.id) {
      // Stop currently playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlayingAudioId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(zekr.audio);
    audioRef.current = audio;
    setPlayingAudioId(zekr.id);

    audio.play().catch(err => {
      console.warn('Audio playback error:', err);
      showToast(lang === 'ar' ? 'تعذّر تشغيل المقطع الصوتي، يُرجى التأكد من اتصال الإنترنت' : 'Audio error, please check connection');
      setPlayingAudioId(null);
    });

    audio.onended = () => {
      setPlayingAudioId(null);
    };

    audio.onerror = () => {
      setPlayingAudioId(null);
      showToast(lang === 'ar' ? 'تعذّر تحميل التسجيل الصوتي' : 'Failed to load audio');
    };
  };

  // Copy Dhikr
  const handleCopy = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(lang === 'ar' ? 'تم نسخ نص الذكر إلى الحافظة' : 'Copied to clipboard');
      }).catch(() => {
        showToast(lang === 'ar' ? 'تعذر النسخ تلقائياً' : 'Could not copy');
      });
    } else {
      showToast(lang === 'ar' ? 'تم نسخ الذكر' : 'Copied');
    }
  };

  // Share Dhikr
  const handleShare = (zekr) => {
    const shareText = `${zekr.zekr}\n\n[${zekr.reference || t('azkarBadgeTitle')}]\nStreamLine Academy`;
    if (navigator.share) {
      navigator.share({
        title: t('azkarBadgeTitle'),
        text: shareText
      }).catch(() => {});
    } else {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
    }
  };

  // Share Section completion
  const handleShareCompletion = () => {
    const text = lang === 'ar'
      ? `الحمد لله! أتممت اليوم ${activeCategoryDisplayTitle} كاملة عبر منصة حصن المسلم بأكاديمية ستريم لاين. رطب لسانك بذكر الله! 🌿`
      : `Alhamdulillah! Completed all of ${activeCategoryDisplayTitle} today via StreamLine Academy. Keep your tongue moist with the remembrance of Allah! 🌿`;
    if (navigator.share) {
      navigator.share({
        title: activeCategoryDisplayTitle,
        text: text
      }).catch(() => {});
    } else {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  };

  // Compute category stats for the stats modal
  const allCategoryStats = useMemo(() => {
    return AZKAR_CATEGORIES.filter(c => c.id !== 'tasbih').map(cat => {
      const items = AZKAR_DATA.filter(d => d.category === cat.label);
      const completed = items.filter(d => azkarProgress[d.id] === 0).length;
      return {
        id: cat.id,
        label: getCategoryTitle(cat.id),
        icon: cat.icon,
        color: cat.color,
        total: items.length,
        completed
      };
    });
  }, [azkarProgress, lang]);

  // Today Date String
  const todayDateStr = useMemo(() => {
    return new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
      day: 'numeric',
      month: 'long'
    });
  }, [lang]);

  return (
    <div className="azkar-page-container">
      {/* Toast alert */}
      {toastMessage && (
        <div className="azkar-toast-notification">
          <i className="fa-solid fa-circle-check text-emerald"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Hero Banner */}
      <section className="azkar-hero-section">
        <div className="azkar-hero-container">
          <div className="azkar-hero-content">
            <div className="azkar-hero-badges">
              <span className="hero-pill-title">
                <i className="fa-solid fa-hands-praying"></i>
                <span>{t('azkarBadgeTitle')}</span>
              </span>
            </div>

            <h1 className="azkar-main-title">
              {t('azkarMainTitle')}
              <span className="azkar-title-sub">{t('azkarTitleSub')}</span>
            </h1>

            <p className="azkar-main-desc">
              {t('azkarHeroDesc')}
            </p>

            {/* Quick Metrics & Stats Bar */}
            <div className="azkar-quick-stats-bar">
              <div className="quick-stat-chip">
                <i className="fa-solid fa-fire text-amber"></i>
                <span>{t('statStreak')}</span>
                <strong>{streak} {t('statDays')}</strong>
              </div>

              <div className="quick-stat-chip">
                <i className="fa-solid fa-circle-check text-emerald"></i>
                <span>{t('statTotal')}</span>
                <strong>{totalCompleted} {t('statTimes')}</strong>
              </div>

              <div className="quick-stat-chip">
                <i className="fa-solid fa-calendar-day text-sky"></i>
                <span>{t('statToday')}</span>
                <strong>{todayDateStr}</strong>
              </div>

              <button
                className="btn-open-stats-modal"
                onClick={() => setShowStatsModal(true)}
                title={t('btnViewStats')}
              >
                <i className="fa-solid fa-chart-simple"></i>
                <span>{t('btnViewStats')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Tabs */}
      <nav className="azkar-tabs-navbar" aria-label="أقسام الأذكار">
        <div className="azkar-tabs-scroll">
          {AZKAR_CATEGORIES.map(cat => {
            const isAutoRecommended = getAutoCategory() === cat.id;
            const items = AZKAR_DATA.filter(d => d.category === cat.label);
            const completedCount = items.filter(d => azkarProgress[d.id] === 0).length;
            const isFullyCompleted = items.length > 0 && completedCount === items.length;

            return (
              <button
                key={cat.id}
                className={`azkar-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(cat.id);
                  setSearchQuery('');
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
              >
                <div className="tab-icon-wrap" style={{ color: cat.color }}>
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <div className="tab-text-wrap">
                  <span className="tab-main-label">{getCategoryTitle(cat.id)}</span>
                  <span className="tab-period-label">{getCategoryPeriod(cat.id)}</span>
                </div>

                {isFullyCompleted && (
                  <span className="tab-check-badge" title="Completed">
                    <i className="fa-solid fa-check"></i>
                  </span>
                )}

                {isAutoRecommended && activeTab !== cat.id && (
                  <span className="tab-now-pill">{t('tabSuggested')}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Azkar Content Area */}
      <main className="azkar-main-container">
        {activeTab === 'tasbih' ? (
          /* Interactive Digital Tasbih */
          <TasbihCounter
            onCelebrate={(msg) => {
              showToast(msg);
              try {
                confetti({ particleCount: 50, spread: 60 });
              } catch (e) {}
            }}
          />
        ) : (
          /* Daily Azkar Cards View */
          <div className="azkar-cards-section">
            {/* Controls Bar: Search, Filters & Font Sizing */}
            <div className="azkar-controls-bar">
              {/* Search Box */}
              <div className="azkar-search-box">
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="azkar-search-input"
                />
                {searchQuery && (
                  <button
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    title="Clear"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>

              {/* Status Filter Buttons */}
              <div className="azkar-filter-buttons">
                <button
                  className={`filter-btn ${filterMode === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterMode('all')}
                >
                  {t('filterAll')} ({categoryTotalCount})
                </button>
                <button
                  className={`filter-btn ${filterMode === 'remaining' ? 'active' : ''}`}
                  onClick={() => setFilterMode('remaining')}
                >
                  {t('filterRemaining')} ({categoryTotalCount - categoryCompletedCount})
                </button>
                <button
                  className={`filter-btn ${filterMode === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilterMode('completed')}
                >
                  {t('filterCompleted')} ({categoryCompletedCount})
                </button>
              </div>

              {/* Font Size Adjusters */}
              <div className="font-size-controls">
                <button
                  className="font-btn"
                  onClick={() => setFontSizeLevel(prev => Math.max(-1, prev - 1))}
                  title="A-"
                  disabled={fontSizeLevel <= -1}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <button
                  className="font-btn reset"
                  onClick={() => setFontSizeLevel(0)}
                  title="Default"
                >
                  <i className="fa-solid fa-font"></i>
                </button>
                <button
                  className="font-btn"
                  onClick={() => setFontSizeLevel(prev => Math.min(2, prev + 1))}
                  title="A+"
                  disabled={fontSizeLevel >= 2}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>

            {/* Empty state for search */}
            {displayedItems.length === 0 ? (
              <div className="azkar-empty-state">
                <div className="empty-icon-box">
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <h3>{t('emptyTitle')}</h3>
                <p>{t('emptyDesc')}</p>
                <button
                  className="btn-reset-filters"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterMode('all');
                  }}
                >
                  {t('btnResetFilters')}
                </button>
              </div>
            ) : (
              /* Azkar Grid / List */
              <div className="azkar-items-list">
                {displayedItems.map((zekr, idx) => {
                  const remaining = azkarProgress[zekr.id] !== undefined ? azkarProgress[zekr.id] : zekr.count;
                  const isCompleted = remaining === 0;
                  const isPlaying = playingAudioId === zekr.id;

                  return (
                    <AzkarCard
                      key={zekr.id}
                      zekr={zekr}
                      index={idx}
                      remaining={remaining}
                      isCompleted={isCompleted}
                      fontSizeLevel={fontSizeLevel}
                      isPlaying={isPlaying}
                      onTapCount={() => handleTapCount(zekr)}
                      onUndo={() => handleUndo(zekr)}
                      onPlayAudio={handlePlayAudio}
                      onCopy={handleCopy}
                      onShare={handleShare}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Bottom Progress Tracker (for daily Azkar tabs) */}
      {activeTab !== 'tasbih' && categoryTotalCount > 0 && (
        <div className="azkar-floating-progress-bar">
          <div className="progress-bar-container">
            <div className="progress-text-row">
              <span className="progress-current-cat">
                <i className={`fa-solid ${activeCategoryMeta?.icon}`}></i>
                <span>{activeCategoryDisplayTitle}</span>
              </span>
              <span className="progress-counts">
                {categoryCompletedCount} {t('fromLabel')} {categoryTotalCount} {t('completedOutOf')}
              </span>
              <span className="progress-percent-pill">{categoryPercent}%</span>
            </div>

            <div className="progress-track-line">
              <div
                className="progress-fill-line"
                style={{ width: `${categoryPercent}%` }}
              ></div>
            </div>

            {categoryPercent === 100 && (
              <div className="progress-complete-notice">
                <i className="fa-solid fa-circle-check text-emerald"></i>
                <span>{t('allCompletedToday')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Modal */}
      <AzkarStatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        streak={streak}
        totalCompleted={totalCompleted}
        categoryStats={allCategoryStats}
      />

      {/* Celebration Modal */}
      <AzkarCelebrationModal
        isOpen={showCelebrationModal}
        onClose={() => setShowCelebrationModal(false)}
        categoryTitle={celebrationTitle}
        onResetCategory={handleResetCategory}
        onGoToTasbih={() => {
          setShowCelebrationModal(false);
          setActiveTab('tasbih');
        }}
        onShareCompletion={handleShareCompletion}
      />
    </div>
  );
};

export default AzkarPage;
