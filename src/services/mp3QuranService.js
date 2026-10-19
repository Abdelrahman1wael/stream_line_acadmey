/**
 * MP3Quran API Service
 * Integrates directly with official https://mp3quran.net / https://mp3quran.net/api/v3
 * Includes caching, fault tolerance, and graceful fallback to curated dataset
 */

import {
  POPULAR_RECITERS,
  POPULAR_RADIOS,
  LIVE_TV_CHANNELS,
  AUDIO_TAFSIR_SOURCES,
  getSurahAudioUrl,
  getTafsirAudioUrl,
  formatSurahNumber
} from '../data/mp3QuranData.js';

const API_BASE = 'https://mp3quran.net/api/v3';

// Cache keys
const CACHE_KEYS = {
  RECITERS_AR: 'mp3quran_reciters_ar_v1',
  RECITERS_EN: 'mp3quran_reciters_en_v1',
  RADIOS_AR: 'mp3quran_radios_ar_v1',
  RADIOS_EN: 'mp3quran_radios_en_v1',
  TIMESTAMP: 'mp3quran_cache_time_v1'
};

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export const fetchAllReciters = async (language = 'ar') => {
  const cacheKey = language === 'ar' ? CACHE_KEYS.RECITERS_AR : CACHE_KEYS.RECITERS_EN;

  // Check localStorage cache
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(cacheKey);
      const time = localStorage.getItem(CACHE_KEYS.TIMESTAMP);
      if (cached && time && Date.now() - parseInt(time, 10) < CACHE_TTL_MS) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  // Try live API with a timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${API_BASE}/reciters?language=${language}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.reciters) && data.reciters.length > 0) {
        // Normalize reciter objects
        const normalized = data.reciters.map((r) => {
          const defaultMoshaf = r.moshaf && r.moshaf[0] ? r.moshaf[0] : null;
          return {
            id: r.id,
            name: r.name,
            englishName: r.name, // or localized name
            letter: r.letter || '',
            server: defaultMoshaf?.server || '',
            rewaya: defaultMoshaf?.name || 'حفص عن عاصم',
            totalSurahs: defaultMoshaf?.surah_total || 114,
            surahList: defaultMoshaf?.surah_list
              ? defaultMoshaf.surah_list.split(',').map((n) => parseInt(n.trim(), 10)).filter(Boolean)
              : Array.from({ length: 114 }, (_, i) => i + 1),
            moshaf: r.moshaf || []
          };
        });

        // Store to cache
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(cacheKey, JSON.stringify(normalized));
            localStorage.setItem(CACHE_KEYS.TIMESTAMP, Date.now().toString());
          } catch (e) {
            // storage full or private mode
          }
        }

        return normalized;
      }
    }
  } catch (err) {
    console.warn('MP3Quran API reciters fetch error or timed out, using fallback dataset:', err);
  }

  // Fallback to top curated reciters
  return POPULAR_RECITERS;
};

export const fetchAllRadios = async (language = 'ar') => {
  const cacheKey = language === 'ar' ? CACHE_KEYS.RADIOS_AR : CACHE_KEYS.RADIOS_EN;

  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${API_BASE}/radios?language=${language}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.radios) && data.radios.length > 0) {
        const normalized = data.radios.map((rd) => {
          let category = 'general';
          const n = rd.name.toLowerCase();
          if (n.includes('تفسير') || n.includes('فتاوى') || n.includes('fatwa') || n.includes('tafseer')) {
            category = 'tafsir';
          } else if (
            n.includes('الشيخ') ||
            n.includes('عبد') ||
            n.includes('محمد') ||
            n.includes('ماهر') ||
            n.includes('مشاري') ||
            n.includes('سعد') ||
            n.includes('ياسر') ||
            n.includes('أحمد') ||
            n.includes('خالد') ||
            n.includes('الحصري')
          ) {
            category = 'reciter';
          }

          return {
            id: rd.id,
            name: rd.name,
            englishName: rd.name,
            url: rd.url,
            category
          };
        });

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(cacheKey, JSON.stringify(normalized));
          } catch (e) {
            // ignore
          }
        }

        return normalized;
      }
    }
  } catch (err) {
    console.warn('MP3Quran API radios fetch error or timed out, using fallback radios:', err);
  }

  return POPULAR_RADIOS;
};

export {
  POPULAR_RECITERS,
  POPULAR_RADIOS,
  LIVE_TV_CHANNELS,
  AUDIO_TAFSIR_SOURCES,
  getSurahAudioUrl,
  getTafsirAudioUrl,
  formatSurahNumber
};
