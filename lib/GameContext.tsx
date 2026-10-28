"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { UserStats, Badge } from "./data";
import { loadStats, saveStats, updateStreak, checkAndGrantBadges, recordQuizResult } from "./storage";

interface GameContextType {
  stats: UserStats;
  newBadgeAlert: Badge | null;
  dismissBadge: () => void;
  finishQuiz: (topicId: string, correct: number, total: number, xpEarned: number) => void;
  refreshStats: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<UserStats>(() => {
    if (typeof window !== "undefined") return loadStats();
    return { totalXP: 0, totalQuizzesCompleted: 0, perfectQuizzes: 0, streakDays: 0, lastStudyDate: null, completedTopics: [], topicScores: {}, earnedBadges: [], totalCorrect: 0, totalAnswered: 0 };
  });
  const [newBadgeAlert, setNewBadgeAlert] = useState<Badge | null>(null);

  useEffect(() => {
    const loaded = loadStats();
    const withStreak = updateStreak(loaded);
    const { stats: withBadges } = checkAndGrantBadges(withStreak);
    setStats(withBadges);
    saveStats(withBadges);
  }, []);

  const finishQuiz = useCallback((topicId: string, correct: number, total: number, xpEarned: number) => {
    setStats((prev) => {
      const updated = recordQuizResult(prev, topicId, correct, total, xpEarned);
      const { stats: withBadges, newBadges } = checkAndGrantBadges(updated);
      saveStats(withBadges);
      if (newBadges.length > 0) {
        setNewBadgeAlert(newBadges[0]);
      }
      return withBadges;
    });
  }, []);

  const dismissBadge = useCallback(() => setNewBadgeAlert(null), []);

  const refreshStats = useCallback(() => {
    const loaded = loadStats();
    setStats(loaded);
  }, []);

  return (
    <GameContext.Provider value={{ stats, newBadgeAlert, dismissBadge, finishQuiz, refreshStats }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
