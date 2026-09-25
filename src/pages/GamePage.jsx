import React from 'react';
import Sidebar from '../components/layout/Sidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';
import GameBoard from '../components/game/GameBoard.jsx';
import CelebrationModal from '../components/ui/CelebrationModal.jsx';
import Toast from '../components/ui/Toast.jsx';
import ConfettiCanvas from '../components/ui/ConfettiCanvas.jsx';
import { useGame } from '../hooks/useGame.js';

const GamePage = () => {
  const { confettiRef } = useGame();

  return (
    <div className="game-page-wrapper">
      {/* 60FPS Confetti Canvas */}
      <ConfettiCanvas ref={confettiRef} />

      {/* 30 Juz Navigation Sidebar */}
      <Sidebar />

      {/* Main Game Center Area */}
      <div className="game-main-area">
        <Topbar />
        <GameBoard />
      </div>

      {/* Victory Celebration Modal */}
      <CelebrationModal />

      {/* Toast Feedback */}
      <Toast />
    </div>
  );
};

export default GamePage;
