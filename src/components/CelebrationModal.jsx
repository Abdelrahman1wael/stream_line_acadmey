import React from 'react';

const CelebrationModal = ({
  isOpen,
  onClose,
  verseArabic,
  pointsEarned,
  totalScore,
  timeTaken,
  hintsUsed,
  onListenAgain,
  onNextAyah
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`modal-backdrop ${isOpen ? 'open' : ''}`}
      id="celebration-modal"
      aria-hidden={!isOpen}
      onClick={(e) => {
        if (e.target.id === 'celebration-modal') onClose();
      }}
    >
      <div className="modal-card">
        <div className="celebration-icon">
          <i className="fa-solid fa-trophy"></i>
        </div>
        <h3 className="modal-title">مَا شَاءَ اللَّه! أَحْسَنْتَ!</h3>
        <p className="modal-subtitle">لقد قمت بترتيب كلمات الآية الكريمة بالترتيب الصحيح بنجاح.</p>

        <div className="modal-arabic-verse" id="modal-verse-arabic">
          {verseArabic}
        </div>

        <div className="modal-stats">
          <div className="modal-stat-item highlight">
            <div className="modal-stat-val" id="modal-points-earned">+{pointsEarned}</div>
            <div className="modal-stat-lbl">النقاط المكتسبة</div>
          </div>
          <div className="modal-stat-item">
            <div className="modal-stat-val" id="modal-total-score">{totalScore} نقطة</div>
            <div className="modal-stat-lbl">مجموع النقاط</div>
          </div>
          <div className="modal-stat-item">
            <div className="modal-stat-val" id="modal-time-taken">{timeTaken}</div>
            <div className="modal-stat-lbl">الوقت المستغرق</div>
          </div>
          <div className="modal-stat-item">
            <div className="modal-stat-val" id="modal-hints-used">{hintsUsed}</div>
            <div className="modal-stat-lbl">المساعدات</div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline" id="modal-listen-again-btn" onClick={onListenAgain}>
            <i className="fa-solid fa-volume-high"></i> إعادة الاستماع
          </button>
          <button className="btn btn-gold" id="modal-next-ayah-btn" onClick={onNextAyah}>
            <span>الآية التالية</span> <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CelebrationModal;
