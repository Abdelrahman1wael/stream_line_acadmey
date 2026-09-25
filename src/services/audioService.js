/**
 * Audio Recitation & Speech Synthesis Service
 */

class AudioService {
  constructor() {
    this.ayahAudio = new Audio();
    this.wordAudio = new Audio();
  }

  playAyah(url, onEnded, onError) {
    this.stopAyah();
    this.ayahAudio.src = url;
    this.ayahAudio.onended = onEnded;
    this.ayahAudio.onerror = onError;
    return this.ayahAudio.play();
  }

  stopAyah() {
    this.ayahAudio.pause();
    this.ayahAudio.currentTime = 0;
  }

  playWord(word, onEnded) {
    if (!word) return;

    if (word.audioUrl) {
      try {
        this.wordAudio.pause();
        this.wordAudio.currentTime = 0;
        this.wordAudio.src = word.audioUrl;
        this.wordAudio.onended = onEnded;

        const promise = this.wordAudio.play();
        if (promise !== undefined) {
          promise.catch(() => {
            this.speakArabic(word.arabic, onEnded);
          });
          return;
        }
      } catch {
        this.speakArabic(word.arabic, onEnded);
        return;
      }
    }

    this.speakArabic(word.arabic, onEnded);
  }

  speakArabic(text, onEnded) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        utterance.onend = onEnded;
        utterance.onerror = onEnded;
        window.speechSynthesis.speak(utterance);
      } catch {
        if (onEnded) onEnded();
      }
    } else {
      if (onEnded) onEnded();
    }
  }
}

export const audioService = new AudioService();
export default audioService;
