import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { getMonthlyPrayerTimes } from '../../services/prayerService.js';
import { formatPrayerTime } from '../../utils/prayerTimesCalculator.js';

const MonthlyPrayerModal = ({
  isOpen,
  onClose,
  city,
  method,
  school,
  is12Hour
}) => {
  const { t, lang, isRTL } = useLanguage();
  const [monthData, setMonthData] = useState([]);
  const [loading, setLoading] = useState(true);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const todayDayNumber = now.getDate();

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);

    getMonthlyPrayerTimes({
      latitude: city.lat,
      longitude: city.lng,
      year: currentYear,
      month: currentMonth,
      method,
      school
    }).then((data) => {
      if (isMounted) {
        setMonthData(data || []);
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [isOpen, city, method, school, currentYear, currentMonth]);

  if (!isOpen) return null;

  const cityName = lang === 'ar' ? city.nameAr : city.nameEn;
  const monthName = now.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'long', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="prayer-modal-backdrop" onClick={onClose}>
      <div className="prayer-modal-dialog monthly-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-title-wrap">
            <i className="fa-solid fa-calendar-days text-emerald"></i>
            <div>
              <h3 className="modal-heading">
                {t('monthlyCalendarTitle')} - {cityName}
              </h3>
              <p className="modal-sub">{monthName}</p>
            </div>
          </div>
          <div className="modal-header-actions">
            <button className="btn-print-table" onClick={handlePrint} title={t('printSchedule')}>
              <i className="fa-solid fa-print"></i>
              <span>{t('printSchedule')}</span>
            </button>
            <button className="btn-modal-close" onClick={onClose} aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <div className="modal-scroll-body monthly-table-wrapper">
          {loading ? (
            <div className="monthly-loading-state">
              <i className="fa-solid fa-spinner fa-spin"></i>
              <p>{t('loadingSchedule')}</p>
            </div>
          ) : (
            <div className="table-responsive-container">
              <table className="monthly-prayers-table">
                <thead>
                  <tr>
                    <th>{t('tableDay')}</th>
                    <th>{t('tableGregorian')}</th>
                    <th>{t('tableHijri')}</th>
                    <th>{t('fajrName')}</th>
                    <th>{t('sunriseName')}</th>
                    <th>{t('dhuhrName')}</th>
                    <th>{t('asrName')}</th>
                    <th>{t('maghribName')}</th>
                    <th>{t('ishaName')}</th>
                  </tr>
                </thead>
                <tbody>
                  {monthData.map((row) => {
                    const isToday = parseInt(row.dayNumber, 10) === todayDayNumber;
                    const hijriFormatted = lang === 'ar' ? row.hijriDate : row.hijriDateEn;

                    return (
                      <tr key={row.date} className={isToday ? 'row-today' : ''}>
                        <td className="day-cell">
                          {row.dayNumber} {isToday && <span className="today-badge">{t('badgeToday')}</span>}
                        </td>
                        <td className="gregorian-cell">{row.date}</td>
                        <td className="hijri-cell">{hijriFormatted}</td>
                        <td className="time-cell">{formatPrayerTime(row.timings.Fajr, is12Hour, isRTL)}</td>
                        <td className="time-cell sunrise-cell">{formatPrayerTime(row.timings.Sunrise, is12Hour, isRTL)}</td>
                        <td className="time-cell">{formatPrayerTime(row.timings.Dhuhr, is12Hour, isRTL)}</td>
                        <td className="time-cell">{formatPrayerTime(row.timings.Asr, is12Hour, isRTL)}</td>
                        <td className="time-cell">{formatPrayerTime(row.timings.Maghrib, is12Hour, isRTL)}</td>
                        <td className="time-cell">{formatPrayerTime(row.timings.Isha, is12Hour, isRTL)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="modal-footer-bar">
          <p className="schedule-footnote">
            <i className="fa-solid fa-circle-info text-emerald"></i> {t('scheduleFootnote')}
          </p>
          <button className="btn-modal-cancel" onClick={onClose}>
            {t('btnClose')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPrayerModal;
