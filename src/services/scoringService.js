/**
 * Scoring and Ranking Service
 * Calculates points, bonuses, streaks, and ranks
 */

export const calculateCompletionScore = ({ hintsUsed, durationSeconds, streak }) => {
  const basePoints = 100;
  const accuracyBonus = hintsUsed === 0 ? 50 : Math.max(0, 50 - hintsUsed * 15);
  const speedBonus = durationSeconds < 25 ? 40 : durationSeconds < 50 ? 20 : 5;
  const streakMultiplier = streak >= 5 ? 2.0 : streak >= 3 ? 1.5 : 1.0;

  return Math.round((basePoints + accuracyBonus + speedBonus) * streakMultiplier);
};

export const getRankByScore = (totalScore) => {
  if (totalScore >= 2000) return 'حافظ متقن';
  if (totalScore >= 1000) return 'حافظ واعد';
  if (totalScore >= 400) return 'قارئ مجتهد';
  return 'طالب العلم';
};
