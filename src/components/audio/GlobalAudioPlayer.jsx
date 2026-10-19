import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

const formatSeconds = (sec) => {
  if (!sec || isNaN(sec)) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const GlobalAudioPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    isLoop,
    isContinuous,
    isPlayerMinimized,
    setIsPlayerMinimized,
    togglePlay,
    seekTo,
    setVolume,
    toggleMute,
    toggleLoop,
    toggleContinuous,
    setSpeed,
    playNextSurah,
    playPrevSurah,
    closePlayer
  } = useAudio();

  const { t, isRTL } = useLanguage();
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  if (!currentTrack) return null;

  const isRadio = currentTrack.type === 'radio';
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`global-audio-player-dock ${isPlayerMinimized ? 'minimized' : ''}`}>
      {/* Minimized Bar */}
      {isPlayerMinimized ? (
        <div className="mini-player-strip">
          <div className="mini-info" onClick={() => setIsPlayerMinimized(false)}>
            <div className={`mini-indicator ${isPlaying ? 'pulse' : ''}`}>
              <i className={isRadio ? "fa-solid fa-tower-broadcast" : "fa-solid fa-compact-disc fa-spin"}></i>
            </div>
            <span className="mini-title">{currentTrack.title}</span>
            <span className="mini-sub">{currentTrack.subtitle || currentTrack.reciterName}</span>
          </div>

          <div className="mini-controls">
            <button className="mini-btn play-pause" onClick={togglePlay} aria-label="Play/Pause">
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : isPlaying ? (
                <i className="fa-solid fa-pause"></i>
              ) : (
                <i className="fa-solid fa-play"></i>
              )}
            </button>
            <button className="mini-btn" onClick={() => setIsPlayerMinimized(false)} title="توسيع المشغل">
              <i className="fa-solid fa-chevron-up"></i>
            </button>
            <button className="mini-btn close" onClick={closePlayer} title="إغلاق المشغل">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      ) : (
        /* Full Floating Player Card */
        <div className="player-inner-card">
          {/* Top Progress Scrub Bar (for non-radio tracks) */}
          {!isRadio ? (
            <div className="player-progress-bar-wrapper">
              <span className="time-badge">{formatSeconds(currentTime)}</span>
              <input
                type="range"
                className="progress-slider"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                aria-label="Audio progress"
              />
              <span className="time-badge">{formatSeconds(duration)}</span>
            </div>
          ) : (
            <div className="radio-live-header-bar">
              <div className="live-broadcast-pill">
                <span className="live-pulsing-dot"></span>
                <span>{t('radioLiveBroadcast') || 'بث مباشر حي 24/7'}</span>
              </div>
              <span className="radio-network-tag">MP3Quran Live Stream</span>
            </div>
          )}

          <div className="player-main-content-row">
            {/* Track Metadata & Art */}
            <div className="player-meta-section">
              <div className="player-album-art">
                <i className={isRadio ? "fa-solid fa-radio text-emerald" : "fa-solid fa-quran text-gold"}></i>
              </div>
              <div className="player-titles">
                <h4 className="player-track-name">{currentTrack.title}</h4>
                <p className="player-track-sub">
                  {currentTrack.subtitle || currentTrack.reciterName || 'تلاوة عطرة'}
                </p>
              </div>
            </div>

            {/* Central Controls: Prev, Play/Pause, Next */}
            <div className="player-center-controls">
              {!isRadio && (
                <button
                  className="control-btn prev-btn"
                  onClick={playPrevSurah}
                  title={t('playerPrevSurah') || 'السورة السابقة'}
                  aria-label="Previous Surah"
                >
                  <i className={`fa-solid ${isRTL ? 'fa-forward-step' : 'fa-backward-step'}`}></i>
                </button>
              )}

              <button
                className="control-btn main-play-btn"
                onClick={togglePlay}
                disabled={isLoading}
                aria-label="Play/Pause"
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : isPlaying ? (
                  <i className="fa-solid fa-pause"></i>
                ) : (
                  <i className="fa-solid fa-play"></i>
                )}
              </button>

              {!isRadio && (
                <button
                  className="control-btn next-btn"
                  onClick={playNextSurah}
                  title={t('playerNextSurah') || 'السورة التالية'}
                  aria-label="Next Surah"
                >
                  <i className={`fa-solid ${isRTL ? 'fa-backward-step' : 'fa-forward-step'}`}></i>
                </button>
              )}
            </div>

            {/* Right Tools: Loop, Continuous, Speed, Volume, Download, Actions */}
            <div className="player-tools-section">
              {!isRadio && (
                <>
                  {/* Repeat / Loop toggle */}
                  <button
                    className={`tool-btn ${isLoop ? 'active' : ''}`}
                    onClick={toggleLoop}
                    title={isLoop ? (t('repeatEnabled') || 'التكرار مفعل') : (t('enableRepeat') || 'تكرار السورة')}
                  >
                    <i className="fa-solid fa-repeat"></i>
                  </button>

                  {/* Continuous play toggle */}
                  <button
                    className={`tool-btn ${isContinuous ? 'active' : ''}`}
                    onClick={toggleContinuous}
                    title={isContinuous ? (t('continuousEnabled') || 'التشغيل المتتالي مفعل') : (t('enableContinuous') || 'تشغيل متتالي')}
                  >
                    <i className="fa-solid fa-list-ol"></i>
                  </button>

                  {/* Speed Selector */}
                  <div className="speed-selector-wrapper">
                    <button
                      className="tool-btn speed-btn"
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      title="سرعة التشغيل"
                    >
                      <span>{playbackRate}x</span>
                    </button>
                    {showSpeedMenu && (
                      <div className="speed-dropdown-menu">
                        {[0.75, 1, 1.25, 1.5].map((rate) => (
                          <button
                            key={rate}
                            className={`speed-opt ${playbackRate === rate ? 'active' : ''}`}
                            onClick={() => {
                              setSpeed(rate);
                              setShowSpeedMenu(false);
                            }}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Volume Slider */}
              <div className="volume-slider-group">
                <button className="tool-btn vol-btn" onClick={toggleMute} title="كتم/تشغيل الصوت">
                  <i
                    className={`fa-solid ${
                      isMuted || volume === 0
                        ? 'fa-volume-xmark text-muted'
                        : volume < 0.5
                        ? 'fa-volume-low'
                        : 'fa-volume-high'
                    }`}
                  ></i>
                </button>
                <input
                  type="range"
                  className="volume-slider"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  aria-label="Volume control"
                />
              </div>

              {/* Download MP3 */}
              {currentTrack.audioUrl && (
                <a
                  href={currentTrack.audioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="tool-btn download-btn"
                  title={t('downloadMp3') || 'تحميل بصيغة MP3'}
                >
                  <i className="fa-solid fa-cloud-arrow-down"></i>
                </a>
              )}

              {/* Minimize & Close */}
              <button
                className="tool-btn"
                onClick={() => setIsPlayerMinimized(true)}
                title="تصغير المشغل"
              >
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <button
                className="tool-btn close-btn"
                onClick={closePlayer}
                title="إغلاق المشغل"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalAudioPlayer;
