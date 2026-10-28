"use client";
import { UserStats, DEFAULT_STATS, BADGES, Badge } from "./data";

const STORAGE_KEY = "ibps_quest_progress";

export function loadStats(): UserStats {
  if (typeof window === "undefined") return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATS };
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

export function saveStats(stats: UserStats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function updateStreak(stats: UserStats): UserStats {
  const today = new Date().toDateString();
  if (stats.lastStudyDate === today) return stats;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toDateString();

  const newStreak = stats.lastStudyDate === yStr ? stats.streakDays + 1 : 1;
  return { ...stats, streakDays: newStreak, lastStudyDate: today };
}

export function checkAndGrantBadges(stats: UserStats): { stats: UserStats; newBadges: Badge[] } {
  const newBadges: Badge[] = [];
  const updatedEarned = [...stats.earnedBadges];

  for (const badge of BADGES) {
    if (!updatedEarned.includes(badge.id) && badge.condition(stats)) {
      updatedEarned.push(badge.id);
      newBadges.push(badge);
    }
  }

  return {
    stats: { ...stats, earnedBadges: updatedEarned },
    newBadges,
  };
}

export function recordQuizResult(
  stats: UserStats,
  topicId: string,
  correct: number,
  total: number,
  xpEarned: number
): UserStats {
  const prevScore = stats.topicScores[topicId] || { correct: 0, total: 0, attempts: 0 };
  const isPerfect = correct === total;
  const isFirstCompletion = !stats.completedTopics.includes(topicId);

  const updatedStats: UserStats = {
    ...stats,
    totalXP: stats.totalXP + xpEarned,
    totalQuizzesCompleted: stats.totalQuizzesCompleted + 1,
    perfectQuizzes: stats.perfectQuizzes + (isPerfect ? 1 : 0),
    totalCorrect: stats.totalCorrect + correct,
    totalAnswered: stats.totalAnswered + total,
    completedTopics: isFirstCompletion
      ? [...stats.completedTopics, topicId]
      : stats.completedTopics,
    topicScores: {
      ...stats.topicScores,
      [topicId]: {
        correct: Math.max(prevScore.correct, correct),
        total,
        attempts: prevScore.attempts + 1,
      },
    },
  };

  return updatedStats;
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

