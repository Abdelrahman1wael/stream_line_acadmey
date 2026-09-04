/**
 * StreamLine Quran Academy - Interactive Ayah Learning Engine
 * Drag & Drop Word Ordering with Quran.com Audio & AlQuran Cloud API
 */

class QuranLearningApp {
  constructor() {
    // Application State
    this.currentJuz = 30; // Default to Juz 30 (Amma) containing Surah Al-Ikhlaas
    this.currentSurah = 112; // Surah Al-Ikhlaas matching screenshot
    this.currentAyah = 1;
    this.totalAyahs = 4;
    this.words = [];
    this.shuffledWords = [];
    this.placedSlots = []; // Array of length words.length, holding word or null
    this.hintsUsed = 0;
    this.streak = 0;

    // Score starts from 0
    localStorage.removeItem('quran_app_score');
    this.score = 0;
    this.bestScore = parseInt(localStorage.getItem('quran_app_best_score') || '0', 10);
    this.startTime = Date.now();
    this.isAyahPlaying = false;
    this.autoPlayWordVoice = true;

    // Audio Elements
    this.wordAudio = new Audio();
    this.ayahAudio = new Audio();

    // DOM Elements Cache
    this.dom = {
      sidebar: document.getElementById('sidebar'),
      mobileMenuBtn: document.getElementById('mobile-menu-btn'),
      juzList: document.getElementById('juz-list'),
      juzSearchInput: document.getElementById('juz-search-input'),
      currentJuzTitle: document.getElementById('current-juz-title'),
      scoreBadge: document.getElementById('score-badge'),
      scoreCounter: document.getElementById('score-counter'),
      streakCounter: document.getElementById('streak-counter'),
      rankTitle: document.getElementById('rank-title'),
      wordAudioToggle: document.getElementById('word-audio-toggle'),

      surahSelect: document.getElementById('surah-select'),
      ayahInput: document.getElementById('ayah-input'),
      prevAyahBtn: document.getElementById('prev-ayah-btn'),
      nextAyahBtn: document.getElementById('next-ayah-btn'),
      ayahTotalLabel: document.getElementById('ayah-total-label'),

      headerSurahArabic: document.getElementById('header-surah-arabic'),
      surahBadgeName: document.getElementById('surah-badge-name'),
      headerSurahEnglish: document.getElementById('header-surah-english'),
      headerRevelationBadge: document.getElementById('header-revelation-badge'),
      headerAyahIndicator: document.getElementById('header-ayah-indicator'),
      headerAyahBadgeText: document.getElementById('header-ayah-badge-text'),
      bismillahBanner: document.getElementById('bismillah-banner'),

      playAyahBtn: document.getElementById('play-ayah-btn'),
      playAyahIcon: document.getElementById('play-ayah-icon'),
      playAyahText: document.getElementById('play-ayah-text'),
      audioWaveBars: document.getElementById('audio-wave-bars'),
      hintBtn: document.getElementById('hint-btn'),
      resetBtn: document.getElementById('reset-btn'),
      checkAnswerBtn: document.getElementById('check-answer-btn'),
      progressBarFill: document.getElementById('progress-bar-fill'),
      progressText: document.getElementById('progress-text'),

      slotsContainer: document.getElementById('slots-container'),
      wordBankContainer: document.getElementById('word-bank-container'),
      loadingIndicator: document.getElementById('loading-indicator'),

      celebrationModal: document.getElementById('celebration-modal'),
      modalVerseArabic: document.getElementById('modal-verse-arabic'),
      modalPointsEarned: document.getElementById('modal-points-earned'),
      modalTotalScore: document.getElementById('modal-total-score'),
      modalTimeTaken: document.getElementById('modal-time-taken'),
      modalHintsUsed: document.getElementById('modal-hints-used'),
      modalListenAgainBtn: document.getElementById('modal-listen-again-btn'),
      modalNextAyahBtn: document.getElementById('modal-next-ayah-btn'),

      toast: document.getElementById('toast-notification'),
      toastMessage: document.getElementById('toast-message'),
      toastIcon: document.getElementById('toast-icon'),

      confettiCanvas: document.getElementById('confetti-canvas')
    };

    // Confetti System
    this.confetti = new ConfettiEngine(this.dom.confettiCanvas);

    // Initialize
    this.init();
  }

  init() {
    this.renderJuzSidebar();
    this.populateSurahSelector();
    this.setupEventListeners();
    this.setupAudioListeners();
    this.updateScoreUI();

    // Initial load: Surah Al-Ikhlaas (112), Ayah 1 (matches user screenshot)
    this.selectJuz(30, false);
    this.dom.surahSelect.value = 112;
    this.loadAyah(112, 1);
  }

  updateScoreUI() {
    if (this.dom.scoreCounter) {
      this.dom.scoreCounter.textContent = this.score;
    }
    this.updateRankTitle();
  }

  updateRankTitle() {
    let rank = 'طالب العلم';
    if (this.score >= 2000) {
      rank = 'حافظ متقن';
    } else if (this.score >= 1000) {
      rank = 'حافظ واعد';
    } else if (this.score >= 400) {
      rank = 'قارئ مجتهد';
    }
    if (this.dom.rankTitle) {
      this.dom.rankTitle.textContent = rank;
    }
  }

  addScore(points) {
    this.score += points;
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('quran_app_best_score', this.bestScore.toString());
    }
    localStorage.setItem('quran_app_score', this.score.toString());

    // Update Counter with bump animation
    if (this.dom.scoreCounter) {
      this.dom.scoreCounter.textContent = this.score;
    }
    this.updateRankTitle();
    if (this.dom.scoreBadge) {
      this.dom.scoreBadge.classList.remove('bump');
      void this.dom.scoreBadge.offsetWidth; // trigger reflow
      this.dom.scoreBadge.classList.add('bump');
    }
  }

  getJuzData() {
    return (typeof window !== 'undefined' && Array.isArray(window.JUZ_DATA)) ? window.JUZ_DATA : [];
  }

  getSurahList() {
    return (typeof window !== 'undefined' && Array.isArray(window.SURAH_LIST)) ? window.SURAH_LIST : [];
  }

  /* ==========================================================================
     Sidebar & Juz Management (Right Side)
     ========================================================================== */

  renderJuzSidebar(filterText = '') {
    this.dom.juzList.innerHTML = '';
    const term = filterText.toLowerCase().trim();
    const juzList = this.getJuzData();
    const surahList = this.getSurahList();

    const filtered = juzList.filter(juz => {
      if (!term) return true;
      return (
        juz.number.toString().includes(term) ||
        juz.arabicName.includes(term) ||
        juz.englishName.toLowerCase().includes(term)
      );
    });

    if (filtered.length === 0) {
      this.dom.juzList.innerHTML = `
        <div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
          لا يوجد جزء يطابق "${filterText}"
        </div>`;
      return;
    }

    filtered.forEach(juz => {
      const card = document.createElement('div');
      card.className = `juz-card ${juz.number === this.currentJuz ? 'active' : ''}`;
      card.dataset.juz = juz.number;

      const firstSurah = surahList.find(s => s.number === juz.startSurah);
      const lastSurah = surahList.find(s => s.number === juz.endSurah);
      const surahSpan = firstSurah && lastSurah
        ? `سورة ${firstSurah.name} (${juz.startAyah}) ← سورة ${lastSurah.name} (${juz.endAyah})`
        : `سورة ${juz.startSurah} ← ${juz.endSurah}`;

      card.innerHTML = `
        <div class="juz-info">
          <div class="juz-badge">${juz.number}</div>
          <div class="juz-meta">
            <span class="juz-label">الجزء ${juz.number}</span>
            <span class="juz-sub">${surahSpan}</span>
          </div>
        </div>
        <div class="juz-arabic-title">${juz.arabicName}</div>
      `;

      card.addEventListener('click', () => {
        this.selectJuz(juz.number);
        // On mobile, close sidebar after picking
        if (window.innerWidth <= 900) {
          this.dom.sidebar.classList.remove('open');
        }
      });

      this.dom.juzList.appendChild(card);
    });
  }

  selectJuz(juzNumber, loadVerse = true) {
    this.currentJuz = juzNumber;
    const list = this.getJuzData();
    const juzObj = list.find(j => j.number === juzNumber) || list[list.length - 1] || {
      number: 30,
      englishName: 'Amma',
      arabicName: 'عَمَّ',
      startSurah: 78,
      startAyah: 1,
      surahs: [{ number: 112, name: 'الإخلاص', englishName: 'Al-Ikhlaas' }]
    };

    // Update active class in sidebar
    document.querySelectorAll('.juz-card').forEach(c => {
      c.classList.toggle('active', parseInt(c.dataset.juz) === juzNumber);
    });

    // Update Topbar header
    if (this.dom.currentJuzTitle) {
      this.dom.currentJuzTitle.textContent = `الجزء ${juzObj.number} (${juzObj.arabicName})`;
    }

    // Filter/highlight Surahs in current Juz
    this.updateSurahSelectorForJuz(juzObj);

    if (loadVerse) {
      // Pick start Surah and Ayah of this Juz
      this.currentSurah = juzObj.startSurah;
      this.currentAyah = juzObj.startAyah;
      this.dom.surahSelect.value = this.currentSurah;
      this.loadAyah(this.currentSurah, this.currentAyah);
    }
  }

  /* ==========================================================================
     Surah & Ayah Picker
     ========================================================================== */

  populateSurahSelector() {
    this.dom.surahSelect.innerHTML = '';
    const surahList = this.getSurahList();
    surahList.forEach(surah => {
      const opt = document.createElement('option');
      opt.value = surah.number;
      opt.textContent = `${surah.number}. سورة ${surah.name}`;
      this.dom.surahSelect.appendChild(opt);
    });
  }

  updateSurahSelectorForJuz(juzObj) {
    if (!juzObj || !juzObj.surahs) return;
    const surahsInJuz = juzObj.surahs.map(s => s.number);
    Array.from(this.dom.surahSelect.options).forEach(opt => {
      const num = parseInt(opt.value);
      if (surahsInJuz.includes(num)) {
        opt.style.fontWeight = '700';
        opt.style.color = '#047857';
      } else {
        opt.style.fontWeight = 'normal';
        opt.style.color = '';
      }
    });
  }

  updateAyahBounds(surahNumber) {
    const surahList = this.getSurahList();
    const surah = surahList.find(s => s.number === surahNumber);
    this.totalAyahs = surah ? surah.ayahs : 4;
    this.dom.ayahInput.max = this.totalAyahs;
    if (this.dom.ayahTotalLabel) {
      this.dom.ayahTotalLabel.textContent = `من ${this.totalAyahs}`;
    }

    // Update Header Badges
    if (surah) {
      const formattedSurah = `سُورَةُ ${surah.name.startsWith('ال') ? surah.name : 'ال' + surah.name}`;
      if (this.dom.surahBadgeName) {
        this.dom.surahBadgeName.textContent = formattedSurah;
      } else if (this.dom.headerSurahArabic) {
        this.dom.headerSurahArabic.textContent = formattedSurah;
      }
      if (this.dom.headerSurahEnglish) this.dom.headerSurahEnglish.textContent = surah.englishName;
      if (this.dom.headerRevelationBadge) this.dom.headerRevelationBadge.textContent = surah.type === 'Meccan' ? 'مكية' : 'مدنية';
      if (this.dom.bismillahBanner) this.dom.bismillahBanner.style.display = (surah.number === 9) ? 'none' : 'block';
    }
  }

  /* ==========================================================================
     Verse Fetching & Word Audio Preparation
     ========================================================================== */

  async loadAyah(surahNumber, ayahNumber) {
    this.currentSurah = surahNumber;
    this.currentAyah = ayahNumber;
    this.dom.ayahInput.value = ayahNumber;
    this.updateAyahBounds(surahNumber);

    if (this.dom.headerAyahBadgeText) {
      this.dom.headerAyahBadgeText.textContent = `الآيَةُ ${ayahNumber}`;
    }
    if (this.dom.headerAyahIndicator) {
      this.dom.headerAyahIndicator.setAttribute('title', `الآية ${ayahNumber} • الجزء ${this.currentJuz}`);
    }

    // Stop previous audio
    this.stopAyahAudio();

    // Show loading state
    this.dom.slotsContainer.innerHTML = '';
    this.dom.wordBankContainer.innerHTML = '';
    this.dom.loadingIndicator.style.display = 'flex';
    this.dom.wordBankContainer.appendChild(this.dom.loadingIndicator);

    // Reset game metrics
    this.hintsUsed = 0;
    this.startTime = Date.now();
    this.dom.slotsContainer.classList.remove('all-completed');

    try {
      // Step 1: Fetch word-by-word data from Quran.com API v4
      const response = await fetch(`https://api.quran.com/api/v4/verses/by_key/${surahNumber}:${ayahNumber}?words=true&word_fields=audio_url,text_uthmani`);
      
      if (!response.ok) {
        throw new Error(`Quran.com API error: ${response.status}`);
      }

      const data = await response.json();
      const rawWords = data.verse.words || [];

      // Filter to keep only actual words (char_type_name === 'word')
      // and skip the end verse glyph 'end'
      this.words = rawWords.filter(w => w.char_type_name === 'word').map((w, idx) => {
        let audioUrl = null;
        if (w.audio_url) {
          audioUrl = w.audio_url.startsWith('http') 
            ? w.audio_url 
            : `https://audio.qurancdn.com/${w.audio_url}`;
        } else {
          // Construct official QuranCDN word-by-word URL: wbw/SSS_AAA_WWW.mp3
          const s = surahNumber.toString().padStart(3, '0');
          const a = ayahNumber.toString().padStart(3, '0');
          const p = (idx + 1).toString().padStart(3, '0');
          audioUrl = `https://audio.qurancdn.com/wbw/${s}_${a}_${p}.mp3`;
        }

        return {
          id: `word-${surahNumber}-${ayahNumber}-${idx}`,
          originalIndex: idx,
          position: w.position || (idx + 1),
          arabic: w.text_uthmani || w.text,
          translation: w.translation ? w.translation.text : '',
          transliteration: w.transliteration ? w.transliteration.text : '',
          audioUrl: audioUrl
        };
      });

      // Prepare full Ayah audio URL (from AlQuran Cloud / Quran CDN)
      this.prepareAyahAudio(surahNumber, ayahNumber);

      // Render Puzzle
      this.setupPuzzle();

    } catch (err) {
      console.warn('Falling back to AlQuran Cloud API for verse text:', err);
      await this.fallbackLoadAyah(surahNumber, ayahNumber);
    } finally {
      this.dom.loadingIndicator.style.display = 'none';
    }
  }

  // Resilient fallback using AlQuran Cloud API if Quran.com has network latency
  async fallbackLoadAyah(surahNumber, ayahNumber) {
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/quran-uthmani`);
      const data = await res.json();
      if (data.code === 200 && data.data) {
        let text = data.data.text;
        // Strip Bismillah prefix if present (except Al-Fatiha)
        if (surahNumber !== 1 && text.startsWith('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ')) {
          text = text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '').trim();
        }

        const rawTokens = text.trim().split(/\s+/).filter(t => t.length > 0);
        this.words = rawTokens.map((token, idx) => {
          const s = surahNumber.toString().padStart(3, '0');
          const a = ayahNumber.toString().padStart(3, '0');
          const p = (idx + 1).toString().padStart(3, '0');
          const constructedUrl = `https://audio.qurancdn.com/wbw/${s}_${a}_${p}.mp3`;

          return {
            id: `word-${surahNumber}-${ayahNumber}-${idx}`,
            originalIndex: idx,
            position: idx + 1,
            arabic: token,
            translation: '',
            transliteration: '',
            audioUrl: constructedUrl
          };
        });

        this.prepareAyahAudio(surahNumber, ayahNumber);
        this.setupPuzzle();
      }
    } catch (fallbackErr) {
      console.error('Failed to load verse data:', fallbackErr);
      this.showToast('تعذر تحميل كلمات الآية، يرجى التحقق من اتصال الإنترنت.', 'error');
    }
  }

  prepareAyahAudio(surahNumber, ayahNumber) {
    const s = surahNumber.toString().padStart(3, '0');
    const a = ayahNumber.toString().padStart(3, '0');
    this.currentAyahAudioUrl = `https://verses.quran.com/Alafasy/mp3/${s}${a}.mp3`;
    this.ayahAudio.src = this.currentAyahAudioUrl;
  }

  /* ==========================================================================
     Drag & Drop Puzzle Setup & Interactivity
     ========================================================================== */

  setupPuzzle() {
    this.dom.slotsContainer.innerHTML = '';
    this.dom.wordBankContainer.innerHTML = '';
    this.placedSlots = new Array(this.words.length).fill(null);

    // 1. Create Drop Slots (Ordered 1 to N, RTL direction)
    this.words.forEach((_, idx) => {
      const slot = document.createElement('div');
      slot.className = 'ayah-slot';
      slot.dataset.slotIndex = idx;
      slot.innerHTML = `<span class="slot-number">${idx + 1}</span>`;

      // HTML5 Drag & Drop listeners on slot
      slot.addEventListener('dragover', (e) => this.handleDragOver(e, slot));
      slot.addEventListener('dragleave', (e) => this.handleDragLeave(e, slot));
      slot.addEventListener('drop', (e) => this.handleDrop(e, slot));

      // Click on slot to remove already placed word
      slot.addEventListener('click', (e) => {
        if (e.target.closest('.word-speak-btn')) return;
        const placedWord = this.placedSlots[idx];
        if (placedWord) {
          this.playWordVoice(placedWord);
          this.returnWordToBank(placedWord, idx);
        }
      });

      this.dom.slotsContainer.appendChild(slot);
    });

    // 2. Shuffle Words for the Word Bank
    this.shuffledWords = [...this.words].sort(() => Math.random() - 0.5);

    // Render word tiles into Word Bank
    this.shuffledWords.forEach(word => {
      const tile = this.createWordTile(word);
      this.dom.wordBankContainer.appendChild(tile);
    });

    this.updateProgress();
  }

  createWordTile(word) {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.id = word.id;
    card.draggable = true;
    card.dataset.wordId = word.id;

    // Word tile with speaker icon button and clear Arabic text
    card.innerHTML = `
      <button class="word-speak-btn" title="استمع لنطق الكلمة" aria-label="استمع لنطق الكلمة">
        <i class="fa-solid fa-volume-high"></i>
      </button>
      <div class="word-arabic">${word.arabic}</div>
    `;

    // Audio button click: listen without moving
    const speakBtn = card.querySelector('.word-speak-btn');
    if (speakBtn) {
      speakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playWordVoice(word, card);
      });
    }

    // HTML5 Drag events
    card.addEventListener('dragstart', (e) => this.handleDragStart(e, word, card));
    card.addEventListener('dragend', () => this.handleDragEnd(card));

    // Tap/Click on the word card to hear voice AND place into first available slot!
    card.addEventListener('click', (e) => {
      if (e.target.closest('.word-speak-btn')) return;
      this.playWordVoice(word, card);
      this.placeWordInFirstAvailableSlot(word);
    });

    return card;
  }

  /* ==========================================================================
     Drag & Drop Event Handlers
     ========================================================================== */

  handleDragStart(e, word, card) {
    e.dataTransfer.setData('text/plain', word.id);
    e.dataTransfer.effectAllowed = 'move';
    card.classList.add('dragging');

    if (this.autoPlayWordVoice) {
      this.playWordVoice(word, card);
    }
  }

  handleDragEnd(card) {
    card.classList.remove('dragging');
    document.querySelectorAll('.ayah-slot').forEach(s => s.classList.remove('drag-over'));
  }

  handleDragOver(e, slot) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    slot.classList.add('drag-over');
  }

  handleDragLeave(e, slot) {
    slot.classList.remove('drag-over');
  }

  handleDrop(e, slot) {
    e.preventDefault();
    slot.classList.remove('drag-over');

    const wordId = e.dataTransfer.getData('text/plain');
    if (!wordId) return;

    const word = this.words.find(w => w.id === wordId);
    if (!word) return;

    const targetSlotIndex = parseInt(slot.dataset.slotIndex);
    this.placeWordInSlot(word, targetSlotIndex);
  }

  /* ==========================================================================
     Word Placement Engine
     ========================================================================== */

  placeWordInSlot(word, targetSlotIndex) {
    // If the word was previously in another slot, clear that slot
    const previousSlotIndex = this.placedSlots.findIndex(w => w && w.id === word.id);
    if (previousSlotIndex !== -1) {
      this.placedSlots[previousSlotIndex] = null;
      this.renderSlot(previousSlotIndex);
    }

    // If target slot already has a word, return that old word to the bank
    const existingWord = this.placedSlots[targetSlotIndex];
    if (existingWord && existingWord.id !== word.id) {
      this.returnWordToBank(existingWord, targetSlotIndex);
    }

    // Place the new word
    this.placedSlots[targetSlotIndex] = word;

    // Remove tile from word bank if it's there
    const bankTile = this.dom.wordBankContainer.querySelector(`[data-word-id="${word.id}"]`);
    if (bankTile) {
      bankTile.remove();
    }

    this.renderSlot(targetSlotIndex);
    this.updateProgress();
  }

  placeWordInFirstAvailableSlot(word) {
    const emptyIndex = this.placedSlots.findIndex(w => w === null);
    if (emptyIndex === -1) {
      this.showToast('جميع الأماكن ممتلئة! اضغط على "تَحَقَّقْ مِنَ الإِجَابَةِ" أو أعد ترتيب الكلمات.', 'info');
      return;
    }
    this.placeWordInSlot(word, emptyIndex);
  }

  returnWordToBank(word, slotIndex) {
    this.placedSlots[slotIndex] = null;
    this.renderSlot(slotIndex);

    // Recreate card in word bank
    const tile = this.createWordTile(word);
    this.dom.wordBankContainer.appendChild(tile);

    this.updateProgress();
  }

  renderSlot(slotIndex) {
    const slot = this.dom.slotsContainer.querySelector(`[data-slot-index="${slotIndex}"]`);
    if (!slot) return;

    const word = this.placedSlots[slotIndex];
    if (!word) {
      slot.className = 'ayah-slot';
      slot.innerHTML = `<span class="slot-number">${slotIndex + 1}</span>`;
      return;
    }

    slot.className = 'ayah-slot filled';
    slot.innerHTML = `
      <div class="word-card placed" data-word-id="${word.id}">
        <button class="word-speak-btn" title="استمع لنطق الكلمة" aria-label="استمع لنطق الكلمة">
          <i class="fa-solid fa-volume-high"></i>
        </button>
        <div class="word-arabic">${word.arabic}</div>
      </div>
    `;

    // Audio button inside slot
    const speakBtn = slot.querySelector('.word-speak-btn');
    if (speakBtn) {
      speakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playWordVoice(word, slot.querySelector('.word-card'));
      });
    }

    // Auto-play voice on place if enabled
    const cardEl = slot.querySelector('.word-card');
    if (cardEl && this.autoPlayWordVoice) {
      this.playWordVoice(word, cardEl);
    }
  }

  /* ==========================================================================
     Audio Playback: Guaranteed Every Word Can Be Heard
     ========================================================================== */

  playWordVoice(word, cardElement = null) {
    if (!word || !word.arabic) return;

    if (cardElement) {
      cardElement.classList.add('playing-audio');
    }

    // 1. Try HTML5 Audio with QuranCDN URL
    if (word.audioUrl) {
      try {
        this.wordAudio.pause();
        this.wordAudio.currentTime = 0;
        this.wordAudio.src = word.audioUrl;

        const playPromise = this.wordAudio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            this.wordAudio.onended = () => {
              if (cardElement) cardElement.classList.remove('playing-audio');
            };
          }).catch(err => {
            console.warn('Word audio CDN play failed, switching to Arabic SpeechSynthesis:', err);
            this.speakArabicText(word.arabic, cardElement);
          });
          return;
        }
      } catch (e) {
        console.warn('Audio play exception:', e);
      }
    }

    // 2. High-quality Arabic SpeechSynthesis fallback (100% reliable)
    this.speakArabicText(word.arabic, cardElement);
  }

  speakArabicText(text, cardElement = null) {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel(); // Stop any pending speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.85; // Natural Quranic recitation pace
        utterance.pitch = 1.0;
        utterance.onend = () => {
          if (cardElement) cardElement.classList.remove('playing-audio');
        };
        utterance.onerror = () => {
          if (cardElement) cardElement.classList.remove('playing-audio');
        };
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
        if (cardElement) cardElement.classList.remove('playing-audio');
      }
    } else {
      if (cardElement) cardElement.classList.remove('playing-audio');
    }
  }

  toggleAyahAudio() {
    if (this.isAyahPlaying) {
      this.stopAyahAudio();
    } else {
      this.playAyahAudio();
    }
  }

  playAyahAudio() {
    if (!this.ayahAudio.src) {
      this.prepareAyahAudio(this.currentSurah, this.currentAyah);
    }

    this.ayahAudio.play().then(() => {
      this.isAyahPlaying = true;
      this.dom.playAyahIcon.className = 'fa-solid fa-pause';
      this.dom.playAyahText.textContent = 'إيقاف التلاوة';
      this.dom.playAyahBtn.classList.add('playing');
    }).catch(err => {
      console.warn('Ayah audio play error:', err);
      this.showToast('تعذر تشغيل التلاوة الصوتية', 'error');
    });
  }

  stopAyahAudio() {
    this.ayahAudio.pause();
    this.ayahAudio.currentTime = 0;
    this.isAyahPlaying = false;
    this.dom.playAyahIcon.className = 'fa-solid fa-volume-high';
    this.dom.playAyahText.textContent = 'اِسْتَمِعْ لِلآيَةِ';
    this.dom.playAyahBtn.classList.remove('playing');
  }

  /* ==========================================================================
     Hint & Reset Actions
     ========================================================================== */

  giveHint() {
    // Find first slot that is either empty or holds the wrong word
    let targetIndex = -1;
    for (let i = 0; i < this.words.length; i++) {
      const placed = this.placedSlots[i];
      if (!placed || placed.originalIndex !== i) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex === -1) {
      this.showToast('جميع الكلمات مرتبة بالترتيب الصحيح بالفعل! 🎉', 'info');
      return;
    }

    const correctWord = this.words[targetIndex];
    this.hintsUsed++;

    // Locate the correct word tile (might be in the bank or in another slot)
    let bankTile = this.dom.wordBankContainer.querySelector(`[data-word-id="${correctWord.id}"]`);

    if (bankTile) {
      bankTile.classList.add('hint-glow');
      this.playWordVoice(correctWord, bankTile);

      setTimeout(() => {
        bankTile.classList.remove('hint-glow');
        this.placeWordInSlot(correctWord, targetIndex);
        this.showToast(`مساعدة: تم وضع كلمة "${correctWord.arabic}" في مكانها الصحيح`, 'info');
      }, 500);
    } else {
      this.placeWordInSlot(correctWord, targetIndex);
      this.playWordVoice(correctWord);
      this.showToast(`مساعدة: تم تصحيح موضع كلمة "${correctWord.arabic}"`, 'info');
    }
  }

  resetAyah() {
    this.stopAyahAudio();
    this.setupPuzzle();
    this.showToast('تمت إعادة الترتيب وإرجاع الكلمات بنجاح.', 'info');
  }

  /* ==========================================================================
     Verification Engine (Check Answer Button)
     ========================================================================== */

  handleManualCheck() {
    const placedCount = this.placedSlots.filter(w => w !== null).length;
    const total = this.words.length;

    if (placedCount === 0) {
      this.showToast('اضغط على الكلمات من بنك الكلمات أو اسحبها لترتيبها أولاً!', 'info');
      return;
    }

    if (placedCount < total) {
      this.showToast(`يرجى ترتيب جميع الكلمات (${placedCount} من ${total}) قبل التحقق!`, 'error');
      return;
    }

    // Check if every slot has the word with matching original index
    const isCorrect = this.placedSlots.every((w, idx) => w && w.originalIndex === idx);

    if (isCorrect) {
      this.onAyahCompleted();
    } else {
      this.showToast('بعض الكلمات ليست في الترتيب الصحيح. حاول مجدداً أو استعن بالمساعدة!', 'error');
    }
  }

  updateProgress() {
    const placedCount = this.placedSlots.filter(w => w !== null).length;
    const total = this.words.length;
    const percentage = total > 0 ? (placedCount / total) * 100 : 0;

    if (this.dom.progressBarFill) {
      this.dom.progressBarFill.style.width = `${percentage}%`;
    }
    if (this.dom.progressText) {
      this.dom.progressText.textContent = `${placedCount} / ${total}`;
    }
  }

  onAyahCompleted() {
    this.streak++;
    if (this.dom.streakCounter) {
      this.dom.streakCounter.textContent = this.streak;
    }
    this.dom.slotsContainer.classList.add('all-completed');

    const durationSeconds = Math.round((Date.now() - this.startTime) / 1000);
    const mins = Math.floor(durationSeconds / 60);
    const secs = durationSeconds % 60;
    const timeFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;

    // Score Calculation
    const basePoints = 100;
    const accuracyBonus = this.hintsUsed === 0 ? 50 : Math.max(0, 50 - this.hintsUsed * 15);
    const speedBonus = durationSeconds < 25 ? 40 : durationSeconds < 50 ? 20 : 5;
    const streakMultiplier = this.streak >= 5 ? 2.0 : this.streak >= 3 ? 1.5 : 1.0;
    const earnedPoints = Math.round((basePoints + accuracyBonus + speedBonus) * streakMultiplier);

    // Award Points
    this.addScore(earnedPoints);

    // Update modal details
    this.dom.modalVerseArabic.textContent = this.words.map(w => w.arabic).join(' ');
    this.dom.modalPointsEarned.textContent = `+${earnedPoints}`;
    this.dom.modalTotalScore.textContent = `${this.score} نقطة`;
    this.dom.modalTimeTaken.textContent = timeFormatted;
    this.dom.modalHintsUsed.textContent = this.hintsUsed;

    // Toast with Score
    this.showToast(`🎉 ما شاء الله! تم ترتيب الآية بنجاح (+${earnedPoints} نقطة)`, 'info');

    // Trigger celebrations
    this.confetti.fire(3500);

    // Play full Ayah recitation
    setTimeout(() => {
      this.playAyahAudio();
    }, 400);

    // Open celebration modal
    setTimeout(() => {
      this.dom.celebrationModal.classList.add('open');
      this.dom.celebrationModal.setAttribute('aria-hidden', 'false');
    }, 700);
  }

  /* ==========================================================================
     Event Listeners Setup
     ========================================================================== */

  setupEventListeners() {
    // Mobile sidebar drawer
    this.dom.mobileMenuBtn.addEventListener('click', () => {
      this.dom.sidebar.classList.toggle('open');
    });

    // Juz Search filter
    this.dom.juzSearchInput.addEventListener('input', (e) => {
      this.renderJuzSidebar(e.target.value);
    });

    // Surah dropdown change
    this.dom.surahSelect.addEventListener('change', (e) => {
      const selectedSurah = parseInt(e.target.value);
      this.loadAyah(selectedSurah, 1);
    });

    // Ayah input change
    this.dom.ayahInput.addEventListener('change', (e) => {
      let val = parseInt(e.target.value) || 1;
      if (val < 1) val = 1;
      if (val > this.totalAyahs) val = this.totalAyahs;
      this.loadAyah(this.currentSurah, val);
    });

    // Previous / Next Ayah Stepper Buttons
    this.dom.prevAyahBtn.addEventListener('click', () => {
      if (this.currentAyah > 1) {
        this.loadAyah(this.currentSurah, this.currentAyah - 1);
      } else if (this.currentSurah > 1) {
        const prevSurahObj = this.getSurahList().find(s => s.number === this.currentSurah - 1);
        this.dom.surahSelect.value = this.currentSurah - 1;
        this.loadAyah(this.currentSurah - 1, prevSurahObj.ayahs);
      }
    });

    this.dom.nextAyahBtn.addEventListener('click', () => {
      if (this.currentAyah < this.totalAyahs) {
        this.loadAyah(this.currentSurah, this.currentAyah + 1);
      } else if (this.currentSurah < 114) {
        this.dom.surahSelect.value = this.currentSurah + 1;
        this.loadAyah(this.currentSurah + 1, 1);
      }
    });

    // Toolbar Buttons
    this.dom.playAyahBtn.addEventListener('click', () => this.toggleAyahAudio());
    this.dom.hintBtn.addEventListener('click', () => this.giveHint());
    this.dom.resetBtn.addEventListener('click', () => this.resetAyah());

    // Check Answer Button
    if (this.dom.checkAnswerBtn) {
      this.dom.checkAnswerBtn.addEventListener('click', () => this.handleManualCheck());
    }

    // Word Voice Toggle
    this.dom.wordAudioToggle.addEventListener('click', () => {
      this.autoPlayWordVoice = !this.autoPlayWordVoice;
      this.dom.wordAudioToggle.classList.toggle('active', this.autoPlayWordVoice);
      this.showToast(
        this.autoPlayWordVoice ? 'صوت الكلمة: مُفَعَّل' : 'صوت الكلمة: مُعَطَّل',
        'info'
      );
    });

    // Modal Actions
    this.dom.modalListenAgainBtn.addEventListener('click', () => {
      this.playAyahAudio();
    });

    this.dom.modalNextAyahBtn.addEventListener('click', () => {
      this.dom.celebrationModal.classList.remove('open');
      this.dom.celebrationModal.setAttribute('aria-hidden', 'true');
      this.dom.nextAyahBtn.click();
    });

    // Close modal on outside click
    this.dom.celebrationModal.addEventListener('click', (e) => {
      if (e.target === this.dom.celebrationModal) {
        this.dom.celebrationModal.classList.remove('open');
        this.dom.celebrationModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  setupAudioListeners() {
    this.ayahAudio.addEventListener('ended', () => {
      this.stopAyahAudio();
    });
  }

  showToast(message, type = 'info') {
    this.dom.toastMessage.textContent = message;
    if (type === 'error') {
      this.dom.toastIcon.className = 'fa-solid fa-circle-exclamation text-danger';
    } else {
      this.dom.toastIcon.className = 'fa-solid fa-circle-check text-emerald';
    }

    this.dom.toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dom.toast.classList.remove('show');
    }, 2800);
  }
}

/* ==========================================================================
   Smooth 60FPS Confetti Engine
   ========================================================================== */

class ConfettiEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.resize();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(durationMs = 3000) {
    this.particles = [];
    const colors = ['#f59e0b', '#10b981', '#34d399', '#fbbf24', '#ffffff', '#6ee7b7', '#0284c7'];

    for (let i = 0; i < 110; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() * 200 - 100),
        y: this.canvas.height / 2 - 50,
        r: Math.random() * 7 + 4,
        d: Math.random() * 110,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
        tiltAngle: 0,
        vx: (Math.random() - 0.5) * 16,
        vy: Math.random() * -18 - 4,
        gravity: 0.4
      });
    }

    const startTime = Date.now();
    cancelAnimationFrame(this.animationId);

    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach(p => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += p.vy;
        p.x += p.vx;
        p.vy += p.gravity;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        this.ctx.beginPath();
        this.ctx.lineWidth = p.r / 2;
        this.ctx.strokeStyle = p.color;
        this.ctx.moveTo(p.x + p.tilt + p.r, p.y);
        this.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        this.ctx.stroke();
      });

      if (Date.now() - startTime < durationMs) {
        this.animationId = requestAnimationFrame(step);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    };

    step();
  }
}

// Instantiate application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.quranApp = new QuranLearningApp();
});
