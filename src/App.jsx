import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext.jsx';
import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import GamePage from './pages/GamePage.jsx';

function AppContent() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#game') {
      return 'game';
    }
    return 'home';
  });

  const { score } = useGame();

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.location.hash = page === 'game' ? '#game' : '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPage(hash === 'game' ? 'game' : 'home');
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
      {currentPage === 'home' ? (
        <HomePage onNavigateToGame={() => handleNavigate('game')} />
      ) : (
        <GamePage />
      )}
    </Layout>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
