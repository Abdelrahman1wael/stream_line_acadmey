// Prayer Times Data Service
// Integrates Aladhan API with resilient local offline caching & astronomical fallback

import { calculateLocalPrayerTimes, calculateQiblaDirection, calculateDistanceToKaaba } from '../utils/prayerTimesCalculator.js';
import { CALCULATION_METHODS, PRESET_CITIES } from '../data/prayerCities.js';

const CACHE_PREFIX = 'streamline_prayer_times_';
const MONTHLY_CACHE_PREFIX = 'streamline_prayer_month_';

/**
 * Fetch daily prayer times for given coordinates and settings
 */
export async function getPrayerTimes({
  latitude,
  longitude,
  method = 5,
  school = 0, // 0 for Shafi/Maliki/Hanbali, 1 for Hanafi
  date = new Date()
}) {
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const cacheKey = `${CACHE_PREFIX}${latitude.toFixed(2)}_${longitude.toFixed(2)}_${method}_${school}_${dateStr}`;

  // 1. Check local cache first
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      // Ensure qibla and distance are present
      if (!parsed.qibla) {
        parsed.qibla = calculateQiblaDirection(latitude, longitude);
        parsed.distanceToKaaba = calculateDistanceToKaaba(latitude, longitude);
      }
      return parsed;
    }
  } catch (e) {
    // Ignore storage parse error
  }

  // 2. Attempt fetching from Aladhan API
  try {
    const timestamp = Math.floor(date.getTime() / 1000);
    const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${school}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.data) {
        const timings = data.data.timings;
        const hijri = data.data.date?.hijri;
        const gregorian = data.data.date?.gregorian;
        const meta = data.data.meta;

        const qibla = calculateQiblaDirection(latitude, longitude);
        const distanceToKaaba = calculateDistanceToKaaba(latitude, longitude);

        const result = {
          timings: {
            Fajr: cleanTime(timings.Fajr),
            Sunrise: cleanTime(timings.Sunrise),
            Dhuhr: cleanTime(timings.Dhuhr),
            Asr: cleanTime(timings.Asr),
            Maghrib: cleanTime(timings.Maghrib),
            Isha: cleanTime(timings.Isha),
            Midnight: cleanTime(timings.Midnight || timings.Firstthird),
            Qiyam: cleanTime(timings.Lastthird)
          },
          hijri: {
            day: hijri?.day,
            month: {
              number: hijri?.month?.number,
              ar: hijri?.month?.ar,
              en: hijri?.month?.en
            },
            year: hijri?.year,
            designation: hijri?.designation?.abbreviated,
            holidays: hijri?.holidays || []
          },
          gregorian: {
            date: gregorian?.date,
            day: gregorian?.day,
            weekday: gregorian?.weekday?.en
          },
          timezone: meta?.timezone,
          method: meta?.method?.name,
          qibla,
          distanceToKaaba,
          source: 'api'
        };

        // Cache the successful API result
        try {
          localStorage.setItem(cacheKey, JSON.stringify(result));
        } catch (e) {
          // LocalStorage full or private browsing
        }

        return result;
      }
    }
  } catch (err) {
    // Network failed or timed out, gracefully continue to fallback
  }

  // 3. Fallback: Instant Astronomical Calculation
  return getFallbackPrayerTimes(latitude, longitude, method, school, date);
}

/**
 * Astronomical Fallback calculator
 */
function getFallbackPrayerTimes(latitude, longitude, methodId, school, date) {
  const methodObj = CALCULATION_METHODS.find((m) => m.id === methodId) || CALCULATION_METHODS[0];
  const fajrAngle = methodObj.fajrAngle || 19.5;
  const ishaAngle = methodObj.ishaAngle || 17.5;
  const ishaInterval = methodObj.ishaParam ? 90 : null;
  const asrShadowFactor = school === 1 ? 2 : 1;

  const timings = calculateLocalPrayerTimes({
    date,
    latitude,
    longitude,
    fajrAngle,
    ishaAngle,
    ishaIntervalMinutes: ishaInterval,
    asrShadowFactor
  });

  const qibla = calculateQiblaDirection(latitude, longitude);
  const distanceToKaaba = calculateDistanceToKaaba(latitude, longitude);

  // Approximate Hijri date
  const hijriApprox = approximateHijriDate(date);

  return {
    timings,
    hijri: hijriApprox,
    gregorian: {
      date: date.toISOString().split('T')[0],
      day: String(date.getDate()),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' })
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    method: methodObj.nameAr,
    qibla,
    distanceToKaaba,
    source: 'astronomical-calculation'
  };
}

/**
 * Clean timing string (e.g., "05:01 (EEST)" -> "05:01")
 */
function cleanTime(str) {
  if (!str) return '--:--';
  return str.trim().split(' ')[0];
}

/**
 * Approximate Hijri Date using Kuwaiti/Standard algorithm when offline
 */
function approximateHijriDate(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let m = month + 1;
  let y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  let a = Math.floor(y / 100);
  let b = 2 - a + Math.floor(a / 4);
  if (y < 1583) b = 0;
  if (y === 1582) {
    if (m > 10) b = -10;
    if (m === 10) {
      b = 0;
      if (day > 4) b = -10;
    }
  }

  let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;
  b = 0;
  if (jd > 2299160) {
    a = Math.floor((jd - 1867216.25) / 36524.25);
    b = 1 + a - Math.floor(a / 4);
  }
  let bb = jd + b + 1524;
  let cc = Math.floor((bb - 122.1) / 365.25);
  let dd = Math.floor(365.25 * cc);
  let ee = Math.floor((bb - dd) / 30.6001);

  let epochDate = jd - 1948440 + 10632;
  let n = Math.floor((epochDate - 1) / 10631);
  epochDate = epochDate - 10631 * n + 354;
  let j = (Math.floor((10985 - epochDate) / 5316)) * (Math.floor((50 * epochDate) / 17719)) + (Math.floor(epochDate / 5670)) * (Math.floor((43 * epochDate) / 15238));
  epochDate = epochDate - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  let mH = Math.floor((24 * epochDate) / 709);
  let dH = epochDate - Math.floor((709 * mH) / 24);
  let yH = 30 * n + j - 30;

  const HIJRI_MONTHS_AR = [
    'المحرّم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة',
    'رجب', 'شعبان', 'رمضان', 'شوّال', 'ذو القعدة', 'ذو الحجة'
  ];

  const HIJRI_MONTHS_EN = [
    'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani',
    'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
  ];

  const monthIdx = Math.max(0, Math.min(11, mH - 1));

  return {
    day: String(dH),
    month: {
      number: mH,
      ar: HIJRI_MONTHS_AR[monthIdx],
      en: HIJRI_MONTHS_EN[monthIdx]
    },
    year: String(yH),
    designation: 'AH'
  };
}

/**
 * Fetch monthly prayer times schedule
 */
export async function getMonthlyPrayerTimes({
  latitude,
  longitude,
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  method = 5,
  school = 0
}) {
  const cacheKey = `${MONTHLY_CACHE_PREFIX}${latitude.toFixed(2)}_${longitude.toFixed(2)}_${year}_${month}_${method}_${school}`;

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    // Ignore
  }

  try {
    const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${school}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.data) {
        const days = data.data.map((dayItem) => {
          return {
            date: dayItem.date.gregorian.date,
            dayNumber: dayItem.date.gregorian.day,
            weekdayEn: dayItem.date.gregorian.weekday.en,
            hijriDate: `${dayItem.date.hijri.day} ${dayItem.date.hijri.month.ar}`,
            hijriDateEn: `${dayItem.date.hijri.day} ${dayItem.date.hijri.month.en}`,
            timings: {
              Fajr: cleanTime(dayItem.timings.Fajr),
              Sunrise: cleanTime(dayItem.timings.Sunrise),
              Dhuhr: cleanTime(dayItem.timings.Dhuhr),
              Asr: cleanTime(dayItem.timings.Asr),
              Maghrib: cleanTime(dayItem.timings.Maghrib),
              Isha: cleanTime(dayItem.timings.Isha)
            }
          };
        });

        try {
          localStorage.setItem(cacheKey, JSON.stringify(days));
        } catch (e) {
          // Storage full
        }

        return days;
      }
    }
  } catch (err) {
    // API failed, generate local monthly schedule
  }

  // Fallback: Compute each day locally
  const daysInMonth = new Date(year, month, 0).getDate();
  const generated = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const dayDate = new Date(year, month - 1, d);
    const dayTimes = calculateLocalPrayerTimes({
      date: dayDate,
      latitude,
      longitude,
      asrShadowFactor: school === 1 ? 2 : 1
    });

    const hijri = approximateHijriDate(dayDate);

    generated.push({
      date: `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      dayNumber: String(d),
      weekdayEn: dayDate.toLocaleDateString('en-US', { weekday: 'short' }),
      hijriDate: `${hijri.day} ${hijri.month.ar}`,
      hijriDateEn: `${hijri.day} ${hijri.month.en}`,
      timings: {
        Fajr: dayTimes.Fajr,
        Sunrise: dayTimes.Sunrise,
        Dhuhr: dayTimes.Dhuhr,
        Asr: dayTimes.Asr,
        Maghrib: dayTimes.Maghrib,
        Isha: dayTimes.Isha
      }
    });
  }

  return generated;
}

/**
 * Detect user location via browser Geolocation API
 */
export function detectUserLocation() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      (err) => {
        reject(err);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}
