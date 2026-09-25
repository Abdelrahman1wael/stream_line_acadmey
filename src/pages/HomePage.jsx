import React from 'react';
import heroImage from '../assets/academy_hero.jpg';

const HomePage = ({ onNavigateToGame }) => {
  return (
    <div className="home-page-container">
      {/* Hero Section Dedicated to: Name, Description & Image */}
      <section className="home-hero-section">
        <div className="hero-grid-layout">
          
          {/* Right Column (in RTL): Name, Description & CTA */}
          <div className="hero-text-content">
            <div className="hero-academy-tag">
              <span className="pulse-dot"></span>
              <i className="fa-solid fa-graduation-cap"></i>
              <span>أكاديمية ستريم لاين لتعليم القرآن الكريم</span>
            </div>

            <h1 className="hero-main-title">
              أَكَادِيمِيَّةُ سِتْرِيمْ لَايْن
              <span className="hero-title-sub">لِتَرْتِيبِ وَتَدَبُّرِ كَلِمَاتِ القُرْآنِ العَظِيمِ</span>
            </h1>

            <p className="hero-main-description">
              مرحباً بكم في <strong>أكاديمية ستريم لاين</strong>، المنصة الرائدة التي تقدم تجربة تعليمية فريدة
              تجمع بين <strong>ترتيب كلمات الآيات التفاعلي</strong> والتلاوة الصوتية النقية لكبار القراء.
              صُممت منصتنا لمساعدة الطلاب والحفاظ على تثبيت مواضع الكلمات في الذاكرة عبر أسلوب تفاعلي ممتع
              يشمل جميع الأجزاء الثلاثين من القرآن الكريم.
            </p>

            <div className="hero-cta-group">
              <button className="btn-go-to-game" onClick={onNavigateToGame}>
                <i className="fa-solid fa-play"></i>
                <span>انتقل إلى صفحة لعبة ترتيب الآيات</span>
                <i className="fa-solid fa-arrow-left"></i>
              </button>

              <div className="hero-quick-stats">
                <div className="quick-stat-item">
                  <strong>30</strong>
                  <span>جزءاً كاملاً</span>
                </div>
                <div className="quick-stat-divider"></div>
                <div className="quick-stat-item">
                  <strong>114</strong>
                  <span>سورة كريمة</span>
                </div>
                <div className="quick-stat-divider"></div>
                <div className="quick-stat-item">
                  <strong>100%</strong>
                  <span>تلاوة صوتية متزامنة</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column (in RTL): Hero Image */}
          <div className="hero-image-wrapper">
            <div className="hero-image-card">
              <img
                src={heroImage}
                alt="أكاديمية ستريم لاين لتعليم القرآن الكريم"
                className="hero-featured-image"
              />
              <div className="image-overlay-caption">
                <i className="fa-solid fa-book-open-reader"></i>
                <span>بيئة تعليمية قرآنية تفاعلية حديثة</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Showcase Banner: Introducing the Game Page */}
      <section className="game-preview-banner">
        <div className="preview-banner-content">
          <div className="preview-badge">
            <i className="fa-solid fa-crown"></i>
            <span>ميزة الأكاديمية البارزة</span>
          </div>
          <h2>لعبة ترتيب كلمات القرآن الكريم التفاعلية</h2>
          <p>
            تصفح جميع أجزاء وسور القرآن، واستمع للتلاوة بصوت الشيخ مشاري العفاسي، ونطق كل كلمة مفردة
            مع نظام النقاط والرتب التنافسية في صفحة اللعبة المخصصة.
          </p>
          <button className="btn-banner-enter" onClick={onNavigateToGame}>
            <i className="fa-solid fa-gamepad"></i>
            <span>دخول صفحة اللعبة الآن</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
