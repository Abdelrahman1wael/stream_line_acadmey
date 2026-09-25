/**
 * Quran Business Logic Service
 * Transforms raw API responses into structured word ordering entities
 */

import { fetchVerseWithWords, fetchVerseFallback } from '../api/quranApi.js';
import { padNumber } from '../utils/arabicUtils.js';

export const getAyahAudioUrl = (surahNumber, ayahNumber) => {
  const s = padNumber(surahNumber, 3);
  const a = padNumber(ayahNumber, 3);
  return `https://verses.quran.com/Alafasy/mp3/${s}${a}.mp3`;
};

export const getWordAudioUrl = (surahNumber, ayahNumber, position, rawAudioUrl) => {
  if (rawAudioUrl) {
    return rawAudioUrl.startsWith('http')
      ? rawAudioUrl
      : `https://audio.qurancdn.com/${rawAudioUrl}`;
  }
  const s = padNumber(surahNumber, 3);
  const a = padNumber(ayahNumber, 3);
  const p = padNumber(position, 3);
  return `https://audio.qurancdn.com/wbw/${s}_${a}_${p}.mp3`;
};

export const loadVerseWords = async (surahNumber, ayahNumber) => {
  try {
    const data = await fetchVerseWithWords(surahNumber, ayahNumber);
    const rawWords = data.verse?.words || [];

    return rawWords
      .filter((w) => w.char_type_name === 'word')
      .map((w, idx) => ({
        id: `word-${surahNumber}-${ayahNumber}-${idx}`,
        originalIndex: idx,
        position: w.position || idx + 1,
        arabic: w.text_uthmani || w.text,
        translation: w.translation?.text || '',
        transliteration: w.transliteration?.text || '',
        audioUrl: getWordAudioUrl(surahNumber, ayahNumber, idx + 1, w.audio_url)
      }));
  } catch (err) {
    console.warn('Primary Quran API failed, using fallback:', err);
    return loadVerseWordsFallback(surahNumber, ayahNumber);
  }
};

export const loadVerseWordsFallback = async (surahNumber, ayahNumber) => {
  const data = await fetchVerseFallback(surahNumber, ayahNumber);
  if (data.code === 200 && data.data) {
    let text = data.data.text;
    if (surahNumber !== 1 && text.startsWith('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ')) {
      text = text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '').trim();
    }

    const tokens = text.trim().split(/\s+/).filter((t) => t.length > 0);
    return tokens.map((token, idx) => ({
      id: `word-${surahNumber}-${ayahNumber}-${idx}`,
      originalIndex: idx,
      position: idx + 1,
      arabic: token,
      translation: '',
      transliteration: '',
      audioUrl: getWordAudioUrl(surahNumber, ayahNumber, idx + 1, null)
    }));
  }
  throw new Error('Fallback failed to return verse data');
};
