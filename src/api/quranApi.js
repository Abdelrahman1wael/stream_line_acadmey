/**
 * Quran API Layer
 * Connects to Quran.com API v4 and AlQuran Cloud fallback API
 */

const QURAN_COM_BASE = 'https://api.quran.com/api/v4';
const ALQURAN_CLOUD_BASE = 'https://api.alquran.cloud/v1';

export const fetchVerseWithWords = async (surahNumber, ayahNumber) => {
  const url = `${QURAN_COM_BASE}/verses/by_key/${surahNumber}:${ayahNumber}?words=true&word_fields=audio_url,text_uthmani`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Quran.com API error: ${response.status}`);
  }
  return response.json();
};

export const fetchVerseFallback = async (surahNumber, ayahNumber) => {
  const url = `${ALQURAN_CLOUD_BASE}/ayah/${surahNumber}:${ayahNumber}/quran-uthmani`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`AlQuran Cloud API error: ${response.status}`);
  }
  return response.json();
};
