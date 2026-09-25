import React from 'react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="academy-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <i className="fa-solid fa-quran"></i>
            <span>أكاديمية ستريم لاين</span>
          </div>
          <p className="footer-desc">
            منصة تعليمية رائدة متخصصة في تيسير حفظ وتدبر القرآن الكريم بأسلوب تفاعلي معرفي حديث.
          </p>
        </div>

        <div className="footer-links">
          <h4>أقسام المنصة</h4>
          <ul>
            <li>
              <button onClick={() => onNavigate('home')}>الرئيسية</button>
            </li>
            <li>
              <button onClick={() => onNavigate('game')}>لعبة ترتيب الكلمات التفاعلية</button>
            </li>
          </ul>
        </div>

        <div className="footer-features">
          <h4>ميزات الأكاديمية</h4>
          <ul>
            <li><i className="fa-solid fa-check text-emerald"></i> تغطية كاملة لـ 30 جزءاً و 114 سورة</li>
            <li><i className="fa-solid fa-check text-emerald"></i> تلاوة صوتية بصوت الشيخ مشاري العفاسي</li>
            <li><i className="fa-solid fa-check text-emerald"></i> نطق صوتي فوري لكل كلمة على حدة</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} أكاديمية ستريم لاين (StreamLine Academy) • جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
};

export default Footer;
