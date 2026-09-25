/**
 * Arabic text formatting utilities
 */

export const formatSurahName = (name) => {
  if (!name) return '';
  return name.startsWith('ال') ? name : `ال${name}`;
};

export const padNumber = (num, length = 3) => {
  return num.toString().padStart(length, '0');
};
