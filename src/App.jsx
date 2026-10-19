import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { AudioProvider } from './context/AudioContext.jsx';
import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import GamePage from './pages/GamePage.jsx';
import AzkarPage from './pages/AzkarPage.jsx';
import PrayerTimesPage from './pages/PrayerTimesPage.jsx';
import Mp3QuranPage from './pages/Mp3QuranPage.jsx';

function AppContent() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#game') return 'game';
      if (window.location.hash === '#azkar') return 'azkar';
      if (window.location.hash === '#prayer') return 'prayer';
      if (window.location.hash === '#mp3quran' || window.location.hash === '#audio') return 'mp3quran';
    }
    return 'home';
  });

  const { score } = useGame();

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      if (page === 'game') window.location.hash = '#game';
      else if (page === 'azkar') window.location.hash = '#azkar';
      else if (page === 'prayer') window.location.hash = '#prayer';
      else if (page === 'mp3quran') window.location.hash = '#mp3quran';
      else window.location.hash = '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'game') setCurrentPage('game');
      else if (hash === 'azkar') setCurrentPage('azkar');
      else if (hash === 'prayer') setCurrentPage('prayer');
      else if (hash === 'mp3quran' || hash === 'audio') setCurrentPage('mp3quran');
      else setCurrentPage('home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      score={score}
    >
      {currentPage === 'home' && (
        <HomePage
          onNavigateToGame={() => handleNavigate('game')}
          onNavigateToAzkar={() => handleNavigate('azkar')}
          onNavigateToPrayer={() => handleNavigate('prayer')}
          onNavigateToMp3Quran={() => handleNavigate('mp3quran')}
        />
      )}
      {currentPage === 'game' && <GamePage />}
      {currentPage === 'azkar' && <AzkarPage />}
      {currentPage === 'prayer' && <PrayerTimesPage />}
      {currentPage === 'mp3quran' && <Mp3QuranPage />}
    </Layout>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AudioProvider>
        <GameProvider>
          <AppContent />
        </GameProvider>
      </AudioProvider>
    </LanguageProvider>
  );
}

export default App;


