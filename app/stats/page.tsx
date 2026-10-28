"use client";
import { useGame } from "@/lib/GameContext";
import { SECTIONS, getLevelFromXP, LEVELS } from "@/lib/data";
import Link from "next/link";
import { clearProgress } from "@/lib/storage";
import { useState } from "react";

export default function StatsPage() {
  const { stats, refreshStats } = useGame();
  const [showConfirm, setShowConfirm] = useState(false);

  const level = getLevelFromXP(stats.totalXP);
  const nextLevel = LEVELS.find((l) => l.level === level.level + 1);
  const accuracy = stats.totalAnswered > 0
    ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
    : 0;

  const xpProgress = nextLevel
    ? ((stats.totalXP - level.minXP) / (nextLevel.minXP - level.minXP)) * 100
    : 100;

  function handleReset() {
    clearProgress();
    window.location.href = "/";
  }

  const bgStyle = { background: "linear-gradient(160deg, #080812 0%, #0d0d20 50%, #0a0818 100%)" };

  return (
    <main className="min-h-screen" style={bgStyle}>
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-8"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/8"
        style={{ background: "rgba(8,8,18,0.85)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">← Home</Link>
          <span className="text-white/20">/</span>
          <span className="text-white font-bold text-sm">📈 Statistics</span>
        </div>
      </header>

      <div className="relative max-w-3xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-black text-white fade-in-up">📊 Your Statistics</h1>

        {/* Level Card */}
        <div className="rounded-3xl p-6 text-white relative overflow-hidden fade-in-up"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #9333ea)", animationDelay: "0.05s" }}>
          <div className="absolute inset-0 shimmer-bg pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Current Level</p>
                <h2 className="text-5xl font-black">{level.level}</h2>
                <p className="text-indigo-200 font-semibold">{level.title}</p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-4xl float">
                ⭐
              </div>
            </div>
            <div className="h-3 bg-black/25 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-white/80 rounded-full transition-all duration-1000"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <p className="text-indigo-200 text-xs">
              {nextLevel
                ? `${stats.totalXP} / ${nextLevel.minXP} XP • ${nextLevel.minXP - stats.totalXP} XP to Level ${nextLevel.level}`
                : `${stats.totalXP} XP • Max Level! 🎉`}
            </p>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 fade-in-up" style={{ animationDelay: "0.1s" }}>
          {[
            { label: "Total XP", value: stats.totalXP, icon: "⭐", color: "text-yellow-400", bg: "bg-yellow-500/8 border-yellow-500/15" },
            { label: "Accuracy", value: `${accuracy}%`, icon: "🎯", color: "text-emerald-400", bg: "bg-emerald-500/8 border-emerald-500/15" },
            { label: "Quizzes", value: stats.totalQuizzesCompleted, icon: "✅", color: "text-blue-400", bg: "bg-blue-500/8 border-blue-500/15" },
            { label: "Perfect Quizzes", value: stats.perfectQuizzes, icon: "💯", color: "text-purple-400", bg: "bg-purple-500/8 border-purple-500/15" },
            { label: "Day Streak", value: `${stats.streakDays}🔥`, icon: "🔥", color: "text-orange-400", bg: "bg-orange-500/8 border-orange-500/15" },
            { label: "Correct Answers", value: stats.totalCorrect, icon: "✓", color: "text-emerald-400", bg: "bg-emerald-500/8 border-emerald-500/15" },
          ].map((stat, idx) => (
            <div key={stat.label}
              className={`card-hover rounded-2xl p-4 border ${stat.bg}`}
              style={{ animationDelay: `${0.1 + idx * 0.04}s` }}>
              <p className="text-2xl mb-2">{stat.icon}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Topic Breakdown */}
        <div className="rounded-2xl p-5 border border-white/8 fade-in-up"
          style={{ background: "rgba(255,255,255,0.03)", animationDelay: "0.2s" }}>
          <h2 className="font-black text-white mb-5">📚 Topic Performance</h2>
          <div className="space-y-6">
            {SECTIONS.map((section) => (
              <div key={section.id}>
                <h3 className="text-sm font-bold text-gray-400 mb-3 pb-2 border-b border-white/5">
                  {section.icon} {section.title}
                </h3>
                <div className="space-y-2">
                  {section.topics.map((topic) => {
                    const score = stats.topicScores[topic.id];
                    const isCompleted = stats.completedTopics.includes(topic.id);
                    const pct = score ? Math.round((score.correct / score.total) * 100) : null;
                    return (
                      <div key={topic.id} className="flex items-center gap-3 py-2">
                        <span className="text-lg flex-shrink-0">{topic.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-300 truncate font-medium">{topic.title}</p>
                          {score && (
                            <div className="flex items-center gap-2 mt-1.5">
                              <div className="h-1.5 bg-black/40 rounded-full flex-1 overflow-hidden border border-white/5">
                                <div
                                  className={`h-full rounded-full transition-all duration-700 ${
                                    pct! >= 80 ? "bg-emerald-500" : pct! >= 60 ? "bg-yellow-500" : "bg-red-500"
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className={`text-xs font-black flex-shrink-0 ${
                                pct! >= 80 ? "text-emerald-400" : pct! >= 60 ? "text-yellow-400" : "text-red-400"
                              }`}>{pct}%</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          {isCompleted ? (
                            <span className="text-emerald-400">✅</span>
                          ) : (
                            <Link href={`/quiz/${section.id}/${topic.id}`}
                              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                              Start →
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level Roadmap */}
        <div className="rounded-2xl p-5 border border-white/8 fade-in-up"
          style={{ background: "rgba(255,255,255,0.03)", animationDelay: "0.25s" }}>
          <h2 className="font-black text-white mb-5">🗺️ Level Roadmap</h2>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/5 rounded-full" />
            <div className="space-y-1">
              {LEVELS.map((lv) => {
                const isCurrentOrPast = stats.totalXP >= lv.minXP;
                const isCurrent = level.level === lv.level;
                return (
                  <div key={lv.level}
                    className={`flex items-center gap-4 p-3 rounded-2xl transition-all ${
                      isCurrent ? "border border-indigo-500/30" : ""
                    }`}
                    style={isCurrent ? { background: "rgba(99,102,241,0.1)" } : {}}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 z-10 transition-all ${
                      isCurrent ? "bg-indigo-500 text-white pulse-glow" :
                      isCurrentOrPast ? "bg-emerald-500/80 text-white" :
                      "bg-white/8 text-gray-600 border border-white/10"
                    }`}>
                      {isCurrentOrPast && !isCurrent ? "✓" : lv.level}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-bold ${isCurrentOrPast ? "text-white" : "text-gray-600"}`}>{lv.title}</p>
                      <p className="text-xs text-gray-600">{lv.minXP} XP</p>
                    </div>
                    {isCurrent && (
                      <span className="text-xs bg-indigo-500 text-white px-2.5 py-0.5 rounded-full font-bold">You are here</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reset */}
        <div className="rounded-2xl p-5 border border-red-900/30 fade-in-up"
          style={{ background: "rgba(239,68,68,0.04)", animationDelay: "0.3s" }}>
          <h2 className="font-black text-white mb-1">⚠️ Reset Progress</h2>
          <p className="text-gray-400 text-sm mb-4">This will permanently delete all your progress, XP, and badges.</p>
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-red-900/30 text-red-400 border border-red-800/50 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-900/50 transition-colors"
            >
              Reset All Progress
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-black hover:bg-red-700 transition-colors"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-gray-300 px-5 py-2 rounded-xl text-sm font-bold hover:bg-white/5 transition-colors border border-white/10"
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
