/**
 * Safe local storage utility
 */

export const getStoredNumber = (key, fallback = 0) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const val = localStorage.getItem(key);
    return val !== null ? parseInt(val, 10) : fallback;
  } catch {
    return fallback;
  }
};

export const setStoredNumber = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value.toString());
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage:`, e);
  }
};
