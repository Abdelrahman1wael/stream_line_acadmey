import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { ADHAN_TRACKS, DUA_AFTER_ADHAN } from '../../data/prayerCities.js';

const AdhanPlayerModal = ({
  isOpen,
  onClose,
  initialPrayer = null,
  selectedAdhanId = 'makkah'
}) => {
  const { t, lang } = useLanguage();
  const [currentTrackId, setCurrentTrackId] = useState(selectedAdhanId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [copiedDua, setCopiedDua] = useState(false);
  const audioRef = useRef(null);

  const activeTrack = ADHAN_TRACKS.find((tr) => tr.id === currentTrackId) || ADHAN_TRACKS[0];

  useEffect(() => {
    if (isOpen) {
      setCurrentTrackId(selectedAdhanId);
      setIsPlaying(true);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    }
  }, [isOpen, selectedAdhanId]);

  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.src = activeTrack.audioUrl;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrackId, isOpen]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const formatSecs = (sec) => {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const copyDua = () => {
    const text = lang === 'ar' ? DUA_AFTER_ADHAN.ar : DUA_AFTER_ADHAN.en;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedDua(true);
      setTimeout(() => setCopiedDua(false), 2200);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="prayer-modal-backdrop" onClick={onClose}>
      <div className="prayer-modal-dialog adhan-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="modal-header-bar">
          <div className="modal-title-wrap">
            <i className="fa-solid fa-volume-high text-emerald"></i>
            <div>
              <h3 className="modal-heading">
                {t('adhanPlayerTitle')}{initialPrayer ? ` - ${lang === 'ar' ? initialPrayer.nameAr : initialPrayer.nameEn}` : ''}
              </h3>
              <p className="modal-sub">{lang === 'ar' ? activeTrack.nameAr : activeTrack.nameEn}</p>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="modal-scroll-body adhan-modal-content">
          {/* Reciter Selector Chips */}
          <div className="adhan-reciter-chips">
            {ADHAN_TRACKS.map((tr) => (
              <button
                key={tr.id}
                type="button"
                className={`adhan-chip ${tr.id === currentTrackId ? 'active' : ''}`}
                onClick={() => setCurrentTrackId(tr.id)}
              >
                <i className="fa-solid fa-mosque"></i>
                <span>{lang === 'ar' ? tr.nameAr : tr.nameEn}</span>
              </button>
            ))}
          </div>

          {/* Audio Wave / Visualizer & Controls */}
          <div className="adhan-player-stage">
            <div className={`adhan-anim-ring ${isPlaying ? 'pulsing' : ''}`}>
              <div className="adhan-speaker-icon">
                <i className={`fa-solid ${isPlaying ? 'fa-volume-high' : 'fa-volume-slash'}`}></i>
              </div>
            </div>

            <div className="adhan-progress-bar-wrap">
              <span className="time-stamp">{formatSecs(currentTime)}</span>
              <input
                type="range"
                className="adhan-range-slider"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
              />
              <span className="time-stamp">{formatSecs(duration)}</span>
            </div>

            <div className="adhan-ctrl-buttons">
              <button
                className="btn-play-pause-adhan"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                <span>{isPlaying ? t('btnPauseAdhan') : t('btnPlayAdhan')}</span>
              </button>
            </div>
          </div>

          {/* Dua After Adhan Card */}
          <div className="dua-after-adhan-card">
            <div className="dua-card-header">
              <div className="dua-title-tag">
                <i className="fa-solid fa-hands-praying text-gold"></i>
                <strong>{t('duaAfterAdhanTitle')}</strong>
              </div>
              <button
                className={`btn-copy-dua ${copiedDua ? 'copied' : ''}`}
                onClick={copyDua}
                title={t('btnCopy')}
              >
                <i className={`fa-solid ${copiedDua ? 'fa-check text-emerald' : 'fa-copy'}`}></i>
                <span>{copiedDua ? t('copiedSuccess') : t('btnCopy')}</span>
              </button>
            </div>

            <p className="dua-arabic-text">
              {DUA_AFTER_ADHAN.ar}
            </p>

            {lang === 'en' && (
              <p className="dua-english-translation">
                "{DUA_AFTER_ADHAN.en}"
              </p>
            )}

            <div className="dua-benefit-note">
              <i className="fa-solid fa-star text-gold"></i>
              <span>{t('duaAfterAdhanBenefit')}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer-bar">
          <button className="btn-modal-cancel" onClick={onClose}>
            {t('btnCloseDone')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdhanPlayerModal;
