export const POINTS_PER_STEP = 10;
export const STEPS_PER_CHALLENGE = 3;

export function calculateMaxScore(totalChallenges) {
  return totalChallenges * STEPS_PER_CHALLENGE * POINTS_PER_STEP;
}

export function calculatePercentage(score, maxScore) {
  if (maxScore === 0) return 0;
  return Math.round((score / maxScore) * 100);
}

export function getPerformanceLabel(percentage) {
  if (percentage <= 40) return 'Continue praticando';
  if (percentage <= 70) return 'Bom progresso';
  return 'Excelente depurador';
}

export function getStepScore(isCorrect) {
  return isCorrect ? POINTS_PER_STEP : 0;
}
