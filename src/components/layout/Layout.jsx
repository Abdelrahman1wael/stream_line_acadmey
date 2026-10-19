import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import GlobalAudioPlayer from '../audio/GlobalAudioPlayer.jsx';

const Layout = ({ currentPage, onNavigate, score, children }) => {
  return (
    <div className="academy-layout">
      <Navbar currentPage={currentPage} onNavigate={onNavigate} score={score} />

      <main className="academy-page-body">
        {children}
      </main>

      {currentPage !== 'game' && <Footer onNavigate={onNavigate} />}

      <GlobalAudioPlayer />
    </div>
  );
};

export default Layout;
