"use client";
import { useGame } from "@/lib/GameContext";
import { SECTIONS, getLevelFromXP, LEVELS } from "@/lib/data";
import Link from "next/link";
import { clearProgress } from "@/lib/storage";
import { useState } from "react";

export default function StatsPage() {
  const { stats, refreshStats } = useGame();
  const [cleared, setCleared] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const level = getLevelFromXP(stats.totalXP);
  const nextLevel = LEVELS.find((l) => l.level === level.level + 1);
  const accuracy = stats.totalAnswered > 0
    ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
    : 0;

  function handleReset() {
    clearProgress();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <div className="bg-gray-950/80 backdrop-blur border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white text-sm">← Home</Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-bold">📈 Statistics</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-black text-white">📊 Your Statistics</h1>

        {/* Level Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-indigo-200 text-sm font-bold uppercase tracking-wider">Current Level</p>
              <h2 className="text-4xl font-black">Level {level.level}</h2>
              <p className="text-indigo-200">{level.title}</p>
            </div>
            <div className="text-6xl">⭐</div>
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{
                width: nextLevel
                  ? `${((stats.totalXP - level.minXP) / (nextLevel.minXP - level.minXP)) * 100}%`
                  : "100%"
              }}
            />
          </div>
          <p className="text-indigo-200 text-sm mt-2">
            {nextLevel
              ? `${stats.totalXP} / ${nextLevel.minXP} XP • ${nextLevel.minXP - stats.totalXP} XP to Level ${nextLevel.level}`
              : `${stats.totalXP} XP • Max Level!`
            }
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Total XP", value: stats.totalXP, icon: "⭐", color: "text-yellow-400" },
            { label: "Accuracy", value: `${accuracy}%`, icon: "🎯", color: "text-green-400" },
            { label: "Quizzes Done", value: stats.totalQuizzesCompleted, icon: "✅", color: "text-blue-400" },
            { label: "Perfect Quizzes", value: stats.perfectQuizzes, icon: "💯", color: "text-purple-400" },
            { label: "Day Streak", value: stats.streakDays, icon: "🔥", color: "text-orange-400" },
            { label: "Correct Answers", value: stats.totalCorrect, icon: "✓", color: "text-emerald-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Topic Breakdown */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h2 className="font-bold text-white mb-4">📚 Topic Performance</h2>
          <div className="space-y-4">
            {SECTIONS.map((section) => (
              <div key={section.id}>
                <h3 className="text-sm font-bold text-gray-400 mb-2">{section.icon} {section.title}</h3>
                {section.topics.map((topic) => {
                  const score = stats.topicScores[topic.id];
                  const isCompleted = stats.completedTopics.includes(topic.id);
                  const pct = score ? Math.round((score.correct / score.total) * 100) : null;
                  return (
                    <div key={topic.id} className="flex items-center gap-3 py-2 border-b border-gray-800 last:border-0">
                      <span className="text-xl">{topic.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 truncate">{topic.title}</p>
                        {score && (
                          <div className="flex items-center gap-2 mt-1">
                            <div className="h-1.5 bg-gray-800 rounded-full flex-1 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${pct! >= 80 ? "bg-green-500" : pct! >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className={`text-xs font-bold flex-shrink-0 ${pct! >= 80 ? "text-green-400" : pct! >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                              {pct}%
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        {isCompleted ? (
                          <span className="text-green-400 text-sm">✅</span>
                        ) : (
                          <Link href={`/quiz/${section.id}/${topic.id}`} className="text-xs text-indigo-400 hover:underline">Start →</Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Level Roadmap */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h2 className="font-bold text-white mb-4">🗺️ Level Roadmap</h2>
          <div className="space-y-2">
            {LEVELS.map((lv) => {
              const isCurrentOrPast = stats.totalXP >= lv.minXP;
              const isCurrent = level.level === lv.level;
              return (
                <div key={lv.level} className={`flex items-center gap-3 p-3 rounded-xl ${isCurrent ? "bg-indigo-500/20 border border-indigo-500/40" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCurrentOrPast ? "bg-indigo-500 text-white" : "bg-gray-800 text-gray-500"
                  }`}>
                    {lv.level}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${isCurrentOrPast ? "text-white" : "text-gray-500"}`}>{lv.title}</p>
                    <p className="text-xs text-gray-500">{lv.minXP} XP</p>
                  </div>
                  {isCurrent && <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">You are here</span>}
                  {isCurrentOrPast && !isCurrent && <span className="text-green-400">✓</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-red-900/30">
          <h2 className="font-bold text-white mb-2">⚠️ Reset Progress</h2>
          <p className="text-gray-400 text-sm mb-4">This will permanently delete all your progress, XP, and badges.</p>
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-red-900/40 text-red-400 border border-red-800 px-4 py-2 rounded-xl text-sm hover:bg-red-900/60 transition-colors"
            >
              Reset All Progress
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-800 text-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

