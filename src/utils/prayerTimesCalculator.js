// Islamic Prayer Times Astronomical Calculator & Utility
// Implements standard astronomical formulas with trigonometric precision

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

// Trigonometric helpers in degrees
const sinD = (d) => Math.sin(d * D2R);
const cosD = (d) => Math.cos(d * D2R);
const tanD = (d) => Math.tan(d * D2R);
const asinD = (x) => Math.asin(x) * R2D;
const acosD = (x) => Math.acos(x) * R2D;
const atan2D = (y, x) => Math.atan2(y, x) * R2D;

const fixAngle = (a) => {
  let res = a - 360 * Math.floor(a / 360);
  return res < 0 ? res + 360 : res;
};

const fixHour = (h) => {
  let res = h - 24 * Math.floor(h / 24);
  return res < 0 ? res + 24 : res;
};

// Kaaba Coordinates in Makkah Al-Mukarramah
export const KAABA_COORDINATES = {
  lat: 21.422487,
  lng: 39.826206
};

/**
 * Calculates Qibla direction (bearing in degrees from True North clockwise 0-360)
 */
export function calculateQiblaDirection(latitude, longitude) {
  const phi1 = latitude * D2R;
  const phi2 = KAABA_COORDINATES.lat * D2R;
  const deltaLambda = (KAABA_COORDINATES.lng - longitude) * D2R;

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);
  let qibla = Math.atan2(y, x) * R2D;
  return Math.round((qibla + 360) % 360 * 10) / 10;
}

/**
 * Calculates distance to Kaaba in kilometers using Haversine formula
 */
export function calculateDistanceToKaaba(latitude, longitude) {
  const R = 6371; // Earth's mean radius in km
  const dLat = (KAABA_COORDINATES.lat - latitude) * D2R;
  const dLng = (KAABA_COORDINATES.lng - longitude) * D2R;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(latitude * D2R) * Math.cos(KAABA_COORDINATES.lat * D2R) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Sun's position calculation for a Julian date
 */
function sunPosition(julianDate) {
  const D = julianDate - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * sinD(g) + 0.020 * sinD(2 * g));

  const e = 23.439 - 0.00000036 * D;
  const d = asinD(sinD(e) * sinD(L)); // Declination
  let RA = atan2D(cosD(e) * sinD(L), cosD(L)) / 15; // Right Ascension in hours
  RA = fixHour(RA);

  const EqT = q / 15 - RA; // Equation of time in hours
  return { declination: d, equationOfTime: EqT };
}

function getJulianDate(year, month, day) {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day + B - 1524.5
  );
}

/**
 * Calculates prayer times using standard astronomical methods
 * Used as standalone calculation and as offline fallback for Aladhan API
 */
export function calculateLocalPrayerTimes({
  date = new Date(),
  latitude,
  longitude,
  fajrAngle = 19.5,
  ishaAngle = 17.5,
  ishaIntervalMinutes = null,
  asrShadowFactor = 1, // 1 for Shafi'i/Maliki/Hanbali, 2 for Hanafi
  timezoneOffsetHours = -date.getTimezoneOffset() / 60
}) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const jd = getJulianDate(year, month, day);
  const { declination: dec, equationOfTime: eqt } = sunPosition(jd);

  // Solar noon in hours (Local Apparent Noon)
  const solarNoon = fixHour(12 - eqt + timezoneOffsetHours - longitude / 15);

  // Time difference helper for sun at angle
  const timeDiff = (angle) => {
    const val = (-sinD(angle) - sinD(latitude) * sinD(dec)) / (cosD(latitude) * cosD(dec));
    if (val < -1 || val > 1) return null; // Extreme latitudes
    return acosD(val) / 15;
  };

  // Asr time difference based on shadow length
  const asrDiff = () => {
    const angle = -atan2D(1, asrShadowFactor + tanD(Math.abs(latitude - dec)));
    return timeDiff(-angle);
  };

  const sunriseDiff = timeDiff(0.833);
  const fajrDiff = timeDiff(fajrAngle);
  const asrDelta = asrDiff();

  const formatH = (hours) => {
    if (hours == null) return '--:--';
    const totalMinutes = Math.round(fixHour(hours) * 60);
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const fajrHour = fajrDiff ? solarNoon - fajrDiff : solarNoon - 1.5;
  const sunriseHour = sunriseDiff ? solarNoon - sunriseDiff : solarNoon - 1;
  const dhuhrHour = solarNoon;
  const asrHour = asrDelta ? solarNoon + asrDelta : solarNoon + 3;
  const maghribHour = sunriseDiff ? solarNoon + sunriseDiff : solarNoon + 6;

  let ishaHour;
  if (ishaIntervalMinutes) {
    ishaHour = maghribHour + ishaIntervalMinutes / 60;
  } else {
    const ishaDiff = timeDiff(ishaAngle);
    ishaHour = ishaDiff ? solarNoon + ishaDiff : maghribHour + 1.5;
  }

  // Calculate Islamic Midnight and Last Third of the Night (Qiyam)
  // Night starts at Maghrib and ends at next morning's Fajr (roughly ~12 hours)
  const nightDurationHours = fixHour(fajrHour - maghribHour + 24);
  const midnightHour = maghribHour + nightDurationHours / 2;
  const lastThirdHour = maghribHour + (nightDurationHours * 2) / 3;

  return {
    Fajr: formatH(fajrHour),
    Sunrise: formatH(sunriseHour),
    Dhuhr: formatH(dhuhrHour),
    Asr: formatH(asrHour),
    Maghrib: formatH(maghribHour),
    Isha: formatH(ishaHour),
    Midnight: formatH(midnightHour),
    Qiyam: formatH(lastThirdHour)
  };
}

/**
 * Format 24-hour time "13:45" to 12-hour "1:45 PM" / "1:45 م"
 */
export function formatPrayerTime(timeStr, is12Hour = true, isRTL = true) {
  if (!timeStr || typeof timeStr !== 'string') return '--:--';
  // Remove any extra text from API, like "04:30 (EEST)" -> "04:30"
  const clean = timeStr.trim().split(' ')[0];
  const [hStr, mStr] = clean.split(':');
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);

  if (isNaN(h) || isNaN(m)) return timeStr;

  if (!is12Hour) {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  const periodEn = h >= 12 ? 'PM' : 'AM';
  const periodAr = h >= 12 ? 'م' : 'ص';
  const period = isRTL ? periodAr : periodEn;

  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${period}`;
}

/**
 * Parses "HH:MM" into a Date object for a given base date
 */
export function prayerTimeToDate(timeStr, baseDate = new Date()) {
  if (!timeStr) return null;
  const clean = timeStr.trim().split(' ')[0];
  const [h, m] = clean.split(':').map((v) => parseInt(v, 10));
  if (isNaN(h) || isNaN(m)) return null;

  const d = new Date(baseDate);
  d.setHours(h, m, 0, 0);
  return d;
}

/**
 * Calculates which prayer is current, which is next, and the remaining countdown in seconds
 */
export function getPrayerStatus(timings, now = new Date()) {
  if (!timings) return null;

  const prayerKeys = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  const prayerDates = prayerKeys.map((key) => {
    return {
      key,
      date: prayerTimeToDate(timings[key], now)
    };
  }).filter((p) => p.date !== null);

  if (prayerDates.length === 0) return null;

  const nowMs = now.getTime();

  let activeIndex = -1;
  let nextIndex = -1;

  for (let i = 0; i < prayerDates.length; i++) {
    if (nowMs < prayerDates[i].date.getTime()) {
      nextIndex = i;
      activeIndex = i === 0 ? prayerDates.length - 1 : i - 1;
      break;
    }
  }

  // If time is past Isha, the next prayer is Fajr tomorrow
  if (nextIndex === -1) {
    activeIndex = prayerDates.length - 1; // Isha
    nextIndex = 0; // Fajr
  }

  const activePrayer = prayerDates[activeIndex];
  let nextPrayer = prayerDates[nextIndex];

  // If next is Fajr tomorrow, adjust its date to tomorrow
  let targetNextDate = new Date(nextPrayer.date);
  if (nextIndex === 0 && nowMs >= prayerDates[prayerDates.length - 1].date.getTime()) {
    targetNextDate.setDate(targetNextDate.getDate() + 1);
  }

  // Previous prayer date (for progress percentage)
  let targetPrevDate = new Date(activePrayer.date);
  if (activeIndex === prayerDates.length - 1 && nowMs < prayerDates[0].date.getTime()) {
    targetPrevDate.setDate(targetPrevDate.getDate() - 1);
  }

  const diffMs = Math.max(0, targetNextDate.getTime() - nowMs);
  const remainingSeconds = Math.floor(diffMs / 1000);

  const totalIntervalMs = Math.max(1, targetNextDate.getTime() - targetPrevDate.getTime());
  const elapsedMs = Math.max(0, nowMs - targetPrevDate.getTime());
  const progressPercent = Math.min(100, Math.max(0, Math.round((elapsedMs / totalIntervalMs) * 100)));

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const formattedCountdown = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return {
    activePrayerKey: activePrayer.key,
    nextPrayerKey: nextPrayer.key,
    remainingSeconds,
    hours,
    minutes,
    seconds,
    formattedCountdown,
    progressPercent,
    targetNextDate
  };
}

/**
 * Format a Hijri date object into a readable bilingual string
 */
export function formatHijriDate(hijriData, lang = 'ar') {
  if (!hijriData) return '';
  const day = hijriData.day || '';
  const monthName = lang === 'ar' ? (hijriData.month?.ar || hijriData.month?.name) : (hijriData.month?.en || hijriData.month?.name);
  const year = hijriData.year || '';
  const suffix = lang === 'ar' ? 'هـ' : 'AH';

  return `${day} ${monthName} ${year} ${suffix}`.trim();
}
