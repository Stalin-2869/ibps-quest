"use client";
import { useGame } from "@/lib/GameContext";
import { getLevelFromXP, LEVELS, SECTIONS, BADGES } from "@/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";

function XPBar({ xp }: { xp: number }) {
  const level = getLevelFromXP(xp);
  const nextLevel = LEVELS.find((l) => l.level === level.level + 1);
  const progress = nextLevel
    ? ((xp - level.minXP) / (nextLevel.minXP - level.minXP)) * 100
    : 100;

  return (
    <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-indigo-400">Level {level.level}</span>
        <span className="text-xs text-gray-400">{level.title}</span>
        <span className="text-sm font-bold text-yellow-400">⭐ {xp} XP</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="xp-bar-inner h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {nextLevel && (
        <p className="text-xs text-gray-500 mt-1 text-right">
          {nextLevel.minXP - xp} XP to Level {nextLevel.level}
        </p>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string | number; color: string }) {
  return (
    <div className={`bg-gray-900 rounded-2xl p-4 border border-gray-800 flex items-center gap-3`}>
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}

function BadgeModal({ badge, onClose }: { badge: { icon: string; name: string; description: string; color: string }; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="badge-pop bg-gray-900 border-2 border-yellow-400 rounded-3xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
        <div className="text-7xl mb-4 star-spin inline-block">{badge.icon}</div>
        <div className="text-yellow-400 text-sm font-bold tracking-widest uppercase mb-2">🏆 Badge Unlocked!</div>
        <h2 className="text-2xl font-bold text-white mb-2">{badge.name}</h2>
        <p className="text-gray-400 mb-6">{badge.description}</p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform"
        >
          Awesome! 🎉
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { stats, newBadgeAlert, dismissBadge } = useGame();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-pulse">🏦</div>
      </div>
    );
  }

  const accuracy = stats.totalAnswered > 0
    ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
    : 0;

  const earnedBadgeCount = stats.earnedBadges.length;
  const totalTopics = SECTIONS.reduce((a, s) => a + s.topics.length, 0);
  const completedTopics = stats.completedTopics.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      {newBadgeAlert && <BadgeModal badge={newBadgeAlert} onClose={dismissBadge} />}

      {/* Header */}
      <div className="bg-gray-950/80 backdrop-blur border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏦</span>
            <span className="text-xl font-black text-white">IBPS <span className="text-indigo-400">Quest</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-sm font-bold">
              🔥 {stats.streakDays} day streak
            </span>
            <Link href="/badges" className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-sm font-bold hover:bg-yellow-500/30 transition-colors">
              🏆 {earnedBadgeCount}/{BADGES.length}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
            Welcome back! <span className="text-indigo-400">👋</span>
          </h1>
          <p className="text-gray-400 text-lg">Ready to ace your IBPS exam? Let&apos;s level up!</p>
        </div>

        {/* XP Bar */}
        <XPBar xp={stats.totalXP} />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon="⭐" label="Total XP" value={stats.totalXP} color="text-yellow-400" />
          <StatCard icon="🎯" label="Accuracy" value={`${accuracy}%`} color="text-green-400" />
          <StatCard icon="✅" label="Quizzes Done" value={stats.totalQuizzesCompleted} color="text-blue-400" />
          <StatCard icon="📚" label="Topics Done" value={`${completedTopics}/${totalTopics}`} color="text-purple-400" />
        </div>

        {/* Progress Overview */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h2 className="text-lg font-bold text-white mb-4">📊 Section Progress</h2>
          <div className="space-y-3">
            {SECTIONS.map((section) => {
              const done = section.topics.filter((t) => stats.completedTopics.includes(t.id)).length;
              const pct = Math.round((done / section.topics.length) * 100);
              return (
                <div key={section.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{section.icon} {section.title}</span>
                    <span className="text-gray-400">{done}/{section.topics.length}</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${section.bgGradient} rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subject Cards */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">📚 Study Sections</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {SECTIONS.map((section) => {
              const done = section.topics.filter((t) => stats.completedTopics.includes(t.id)).length;
              return (
                <Link key={section.id} href={`/section/${section.id}`}>
                  <div className={`card-hover bg-gradient-to-br ${section.bgGradient} rounded-2xl p-5 cursor-pointer relative overflow-hidden`}>
                    <div className="absolute inset-0 shimmer-bg pointer-events-none" />
                    <div className="relative z-10">
                      <div className="text-4xl mb-2">{section.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-1">{section.title}</h3>
                      <p className="text-white/70 text-sm mb-3">{section.topics.length} topics</p>
                      <div className="flex items-center justify-between">
                        <div className="h-2 bg-white/20 rounded-full flex-1 mr-3 overflow-hidden">
                          <div
                            className="h-full bg-white rounded-full"
                            style={{ width: `${(done / section.topics.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-white font-bold text-sm">{done}/{section.topics.length}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/badges">
            <div className="card-hover bg-gray-900 border border-gray-700 rounded-2xl p-5 cursor-pointer hover:border-yellow-500/50 transition-colors">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-bold text-white mb-1">My Badges</h3>
              <p className="text-sm text-gray-400">{earnedBadgeCount} of {BADGES.length} badges earned</p>
            </div>
          </Link>
          <Link href="/stats">
            <div className="card-hover bg-gray-900 border border-gray-700 rounded-2xl p-5 cursor-pointer hover:border-indigo-500/50 transition-colors">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-bold text-white mb-1">Detailed Stats</h3>
              <p className="text-sm text-gray-400">View your performance analytics</p>
            </div>
          </Link>
        </div>

        <p className="text-center text-xs text-gray-600 pb-4">IBPS Quest • Progress auto-saved locally 💾</p>
      </div>
    </main>
  );
}
