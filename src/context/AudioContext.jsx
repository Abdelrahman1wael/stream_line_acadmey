import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { SURAH_LIST } from '../data/quranData.js';
import { getSurahAudioUrl } from '../services/mp3QuranService.js';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoop, setIsLoop] = useState(false);
  const [isContinuous, setIsContinuous] = useState(true);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);

  const audioRef = useRef(null);
  const currentTrackRef = useRef(currentTrack);
  const isContinuousRef = useRef(isContinuous);
  const isLoopRef = useRef(isLoop);
  const playbackRateRef = useRef(playbackRate);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  useEffect(() => {
    isContinuousRef.current = isContinuous;
  }, [isContinuous]);

  useEffect(() => {
    isLoopRef.current = isLoop;
    if (audioRef.current) {
      audioRef.current.loop = isLoop;
    }
  }, [isLoop]);

  useEffect(() => {
    playbackRateRef.current = playbackRate;
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Play a track
  const playTrack = useCallback((track) => {
    if (!audioRef.current) return;

    if (currentTrackRef.current?.audioUrl === track.audioUrl) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
      return;
    }

    currentTrackRef.current = track;
    setCurrentTrack(track);
    setIsLoading(true);
    setCurrentTime(0);
    setDuration(0);

    audioRef.current.src = track.audioUrl;
    audioRef.current.playbackRate = playbackRateRef.current;
    audioRef.current.loop = isLoopRef.current;
    audioRef.current.play().catch((err) => {
      console.warn('Autoplay prevented or network error:', err);
      setIsLoading(false);
      setIsPlaying(false);
    });
  }, []);

  const handlePlayNext = useCallback(() => {
    const track = currentTrackRef.current;
    if (!track || track.type !== 'surah' || !track.serverUrl) return;
    const currentNum = track.surahNumber || 1;
    const nextNum = currentNum < 114 ? currentNum + 1 : 1;
    const nextSurah = SURAH_LIST.find((s) => s.number === nextNum) || {
      name: `سورة ${nextNum}`,
      englishName: `Surah ${nextNum}`
    };

    const nextUrl = getSurahAudioUrl(track.serverUrl, nextNum);
    playTrack({
      ...track,
      surahNumber: nextNum,
      surahName: nextSurah.name,
      title: `${nextSurah.name} (${nextNum})`,
      audioUrl: nextUrl
    });
  }, [playTrack]);

  const handlePlayPrev = useCallback(() => {
    const track = currentTrackRef.current;
    if (!track || track.type !== 'surah' || !track.serverUrl) return;
    const currentNum = track.surahNumber || 1;
    const prevNum = currentNum > 1 ? currentNum - 1 : 114;
    const prevSurah = SURAH_LIST.find((s) => s.number === prevNum) || {
      name: `سورة ${prevNum}`,
      englishName: `Surah ${prevNum}`
    };

    const prevUrl = getSurahAudioUrl(track.serverUrl, prevNum);
    playTrack({
      ...track,
      surahNumber: prevNum,
      surahName: prevSurah.name,
      title: `${prevSurah.name} (${prevNum})`,
      audioUrl: prevUrl
    });
  }, [playTrack]);

  // Initialize audio element once on mount
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      if (currentTrackRef.current?.type === 'surah' && isContinuousRef.current && !isLoopRef.current) {
        handlePlayNext();
      }
    };
    const handleError = (e) => {
      console.warn('Audio playback error:', e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, [handlePlayNext]);

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  };

  const seekTo = (time) => {
    if (!audioRef.current || !duration) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleSetVolume = (val) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolume(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleLoop = () => {
    setIsLoop((prev) => !prev);
  };

  const toggleContinuous = () => {
    setIsContinuous((prev) => !prev);
  };

  const setSpeed = (rate) => {
    setPlaybackRate(rate);
  };

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setCurrentTrack(null);
    currentTrackRef.current = null;
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider
      value={{
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
        playTrack,
        togglePlay,
        seekTo,
        setVolume: handleSetVolume,
        toggleMute,
        toggleLoop,
        toggleContinuous,
        setSpeed,
        playNextSurah: handlePlayNext,
        playPrevSurah: handlePlayPrev,
        closePlayer
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export default AudioContext;
