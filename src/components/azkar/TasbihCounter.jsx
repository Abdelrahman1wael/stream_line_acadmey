import React, { useState, useEffect } from 'react';
import { TASBIH_PRESETS } from '../../data/azkarData.js';
import { soundManager, triggerHaptic } from '../../utils/audioUtils.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

const TasbihCounter = ({ onCelebrate }) => {
  const { t, lang } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState(TASBIH_PRESETS[0]);
  const [customZikr, setCustomZikr] = useState('');
  const [target, setTarget] = useState(33); // 33, 100, or 0 for unlimited
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [todayTotal, setTodayTotal] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tasbih_today_total');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrateEnabled, setVibrateEnabled] = useState(true);
  const [isPressing, setIsPressing] = useState(false);

  // Save lifetime total
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasbih_today_total', todayTotal.toString());
    }
  }, [todayTotal]);

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setTarget(preset.target);
    setCount(0);
  };

  const handleCountClick = () => {
    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 150);

    const nextCount = count + 1;
    const nextTotal = todayTotal + 1;
    setTodayTotal(nextTotal);

    if (soundEnabled) {
      soundManager.playTap();
    }
    if (vibrateEnabled) {
      triggerHaptic('light');
    }

    if (target > 0 && nextCount >= target) {
      // Completed one cycle!
      setCount(0);
      setCycles(prev => prev + 1);
      if (soundEnabled) {
        soundManager.playZikrComplete();
      }
      if (vibrateEnabled) {
        triggerHaptic('success');
      }
      if (onCelebrate) {
        const msg = lang === 'ar'
          ? `ما شاء الله! أتممت دورة التسبيح (${target} مرة)`
          : `Alhamdulillah! Completed cycle (${target} times)`;
        onCelebrate(msg);
      }
    } else {
      setCount(nextCount);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleFullReset = () => {
    const confirmMsg = lang === 'ar'
      ? 'هل تريد تصفير عداد المسبحة والدورات؟'
      : 'Reset all tasbih counter and completed cycles?';
    if (window.confirm(confirmMsg)) {
      setCount(0);
      setCycles(0);
    }
  };

  // SVG Progress calculation
  const radius = 105;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = target > 0 ? count / target : (count % 100) / 100;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const currentDhikrTitle = customZikr.trim() ? customZikr : selectedPreset.name;

  return (
    <div className="tasbih-container">
      {/* Top Banner */}
      <div className="tasbih-header-card">
        <div className="tasbih-header-info">
          <div className="tasbih-badge">
            <i className="fa-solid fa-fingerprint"></i>
            <span>{t('tasbihBadge')}</span>
          </div>
          <h2>{t('tasbihTitle')}</h2>
          <p className="tasbih-subtitle">
            {t('tasbihSubtitle')}
          </p>
        </div>

        {/* Global Lifetime Stats */}
        <div className="tasbih-stats-pill-group">
          <div className="stat-pill">
            <span className="stat-pill-label">{t('tasbihTodayTotal')}</span>
            <strong className="stat-pill-val">{todayTotal}</strong>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-label">{t('tasbihCompletedCycles')}</span>
            <strong className="stat-pill-val text-amber">{cycles}</strong>
          </div>
        </div>
      </div>

      {/* Preset Dhikr Selector */}
      <div className="tasbih-presets-section">
        <div className="presets-title-row">
          <i className="fa-solid fa-list-check text-emerald"></i>
          <span>{t('tasbihChooseDhikr')}</span>
        </div>
        <div className="presets-grid">
          {TASBIH_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              className={`preset-chip-btn ${selectedPreset.name === preset.name && !customZikr ? 'active' : ''}`}
              onClick={() => {
                setCustomZikr('');
                handleSelectPreset(preset);
              }}
            >
              <span className="preset-chip-name" dir="rtl">{preset.name}</span>
              <span className="preset-chip-target">({preset.target})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Target Chooser */}
      <div className="tasbih-target-selector">
        <span className="target-label">{t('tasbihTargetLabel')}</span>
        <div className="target-buttons">
          <button
            className={`target-btn ${target === 33 ? 'active' : ''}`}
            onClick={() => { setTarget(33); setCount(0); }}
          >
            {t('target33')}
          </button>
          <button
            className={`target-btn ${target === 100 ? 'active' : ''}`}
            onClick={() => { setTarget(100); setCount(0); }}
          >
            {t('target100')}
          </button>
          <button
            className={`target-btn ${target === 0 ? 'active' : ''}`}
            onClick={() => { setTarget(0); setCount(0); }}
          >
            {t('targetFree')}
          </button>
        </div>
      </div>

      {/* Main Interactive Dial / Counter Button */}
      <div className="tasbih-dial-wrapper">
        <div
          className={`tasbih-circular-dial ${isPressing ? 'dial-pressed' : ''}`}
          onClick={handleCountClick}
          role="button"
          tabIndex={0}
          aria-label={t('tapToGlorify')}
        >
          {/* SVG Progress Circle */}
          <svg className="tasbih-svg-ring" viewBox="0 0 240 240">
            <circle
              className="ring-bg"
              cx="120"
              cy="120"
              r={radius}
            />
            <circle
              className="ring-progress"
              cx="120"
              cy="120"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>

          {/* Inner Button Content */}
          <div className="tasbih-inner-content">
            <div className="dial-dhikr-name" dir="rtl">{currentDhikrTitle}</div>
            <div className="dial-big-number">{count}</div>
            <div className="dial-target-sub">
              {target > 0 ? `${t('targetCurrentSub')} ${target}` : t('targetContinuous')}
            </div>
            <div className="dial-tap-hint">
              <i className="fa-solid fa-hand-pointer animate-bounce"></i>
              <span>{t('tapToGlorify')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dhikr Virtue Note */}
      {selectedPreset.virtue && !customZikr && (
        <div className="tasbih-virtue-card">
          <i className="fa-solid fa-heart-pulse text-amber"></i>
          <span>{selectedPreset.virtue}</span>
        </div>
      )}

      {/* Controls Bar: Reset & Sound / Vibrate */}
      <div className="tasbih-controls-bar">
        <button
          className="btn-control-secondary"
          onClick={handleReset}
          title={t('btnResetCycle')}
        >
          <i className="fa-solid fa-rotate-left"></i>
          <span>{t('btnResetCycle')}</span>
        </button>

        <div className="tasbih-toggles">
          <button
            className={`toggle-icon-btn ${soundEnabled ? 'active' : ''}`}
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              soundManager.toggleSound(next);
            }}
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            <i className={`fa-solid ${soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
          </button>

          <button
            className={`toggle-icon-btn ${vibrateEnabled ? 'active' : ''}`}
            onClick={() => setVibrateEnabled(!vibrateEnabled)}
            title={vibrateEnabled ? 'Disable vibration' : 'Enable vibration'}
          >
            <i className="fa-solid fa-mobile-screen"></i>
          </button>
        </div>

        <button
          className="btn-control-danger"
          onClick={handleFullReset}
          title={t('btnResetAll')}
        >
          <i className="fa-solid fa-arrows-rotate"></i>
          <span>{t('btnResetAll')}</span>
        </button>
      </div>
    </div>
  );
};

export default TasbihCounter;
