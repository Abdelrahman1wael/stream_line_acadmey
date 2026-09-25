import React from 'react';

const Navbar = ({ currentPage, onNavigate, score }) => {
  return (
    <header className="academy-navbar">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => onNavigate('home')}>
          <div className="brand-logo-icon">
            <i className="fa-solid fa-quran"></i>
          </div>
          <div className="brand-text">
            <span className="brand-main">أكاديمية ستريم لاين</span>
            <span className="brand-sub">StreamLine Quran Academy</span>
          </div>
        </div>

        <nav className="nav-menu" aria-label="القائمة الرئيسية">
          <button
            className={`nav-tab-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            <i className="fa-solid fa-house"></i>
            <span>الرئيسية</span>
          </button>

          <button
            className={`nav-tab-btn ${currentPage === 'game' ? 'active' : ''}`}
            onClick={() => onNavigate('game')}
          >
            <i className="fa-solid fa-puzzle-piece"></i>
            <span>لعبة ترتيب كلمات القرآن</span>
            <span className="nav-badge-pill">الميزة التفاعلية</span>
          </button>
        </nav>

        <div className="nav-actions">
          {currentPage === 'home' ? (
            <button className="btn-nav-cta" onClick={() => onNavigate('game')}>
              <i className="fa-solid fa-gamepad"></i>
              <span>ابدأ اللعبة التفاعلية</span>
            </button>
          ) : (
            <div className="nav-score-display" title="مجموع النقاط">
              <i className="fa-solid fa-star text-gold"></i>
              <span>النقاط:</span>
              <strong>{score}</strong>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
