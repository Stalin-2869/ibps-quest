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
    <div className="relative rounded-2xl p-5 border border-white/10 overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))" }}>
      {/* decorative glow */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl"
        style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-500/30 flex items-center justify-center text-sm font-black text-indigo-300">
              {level.level}
            </span>
            <div>
              <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Level {level.level}</p>
              <p className="text-sm font-bold text-white">{level.title}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total XP</p>
            <p className="text-lg font-black text-yellow-400">⭐ {xp}</p>
          </div>
        </div>
        <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
          <div
            className="xp-bar-inner h-full rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        {nextLevel && (
          <p className="text-xs text-gray-500 mt-2 text-right">
            {nextLevel.minXP - xp} XP to reach <span className="text-indigo-400 font-semibold">Level {nextLevel.level}</span>
          </p>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, bg }: {
  icon: string; label: string; value: string | number; color: string; bg: string;
}) {
  return (
    <div className={`card-hover rounded-2xl p-4 border border-white/8 flex items-center gap-3 ${bg}`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className={`text-2xl font-black ${color}`}>{value}</p>
      </div>
    </div>
  );
}

function BadgeModal({ badge, onClose }: {
  badge: { icon: string; name: string; description: string; color: string };
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="badge-pop rounded-3xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl border-2 border-yellow-400/60"
        style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
        <div className="text-7xl mb-4 star-spin inline-block">{badge.icon}</div>
        <div className="inline-block bg-yellow-400/20 text-yellow-400 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 border border-yellow-400/30">
          🏆 Badge Unlocked!
        </div>
        <h2 className="text-2xl font-black text-white mb-2">{badge.name}</h2>
        <p className="text-gray-400 text-sm mb-6">{badge.description}</p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-8 py-3 rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-lg"
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
        <div className="text-5xl float">🏦</div>
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
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, #080812 0%, #0d0d20 50%, #0a0818 100%)" }}>
      {newBadgeAlert && <BadgeModal badge={newBadgeAlert} onClose={dismissBadge} />}

      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-8"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-5"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/8"
        style={{ background: "rgba(8,8,18,0.85)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xl">
              🏦
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              IBPS <span className="gradient-text">Quest</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1.5 rounded-full text-sm font-bold">
              🔥 {stats.streakDays}d
            </span>
            <Link href="/badges"
              className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1.5 rounded-full text-sm font-bold hover:bg-yellow-500/20 transition-colors">
              🏆 {earnedBadgeCount}/{BADGES.length}
            </Link>
          </div>
        </div>
      </header>

      <div className="relative max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Hero */}
        <div className="text-center fade-in-up">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            ✦ IBPS PO & Clerk Prep
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-3 leading-tight">
            Welcome back! <span className="gradient-text">👋</span>
          </h1>
          <p className="text-gray-400 text-lg">Ready to ace your IBPS exam? Let&apos;s level up!</p>
        </div>

        {/* XP Bar */}
        <div className="fade-in-up" style={{ animationDelay: "0.1s" }}>
          <XPBar xp={stats.totalXP} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 fade-in-up" style={{ animationDelay: "0.15s" }}>
          <StatCard icon="⭐" label="Total XP" value={stats.totalXP} color="text-yellow-400"
            bg="bg-yellow-500/5 border-yellow-500/15" />
          <StatCard icon="🎯" label="Accuracy" value={`${accuracy}%`} color="text-emerald-400"
            bg="bg-emerald-500/5 border-emerald-500/15" />
          <StatCard icon="✅" label="Quizzes" value={stats.totalQuizzesCompleted} color="text-blue-400"
            bg="bg-blue-500/5 border-blue-500/15" />
          <StatCard icon="📚" label="Topics" value={`${completedTopics}/${totalTopics}`} color="text-purple-400"
            bg="bg-purple-500/5 border-purple-500/15" />
        </div>

        {/* Progress Overview */}
        <div className="rounded-2xl p-5 border border-white/8 fade-in-up"
          style={{ background: "rgba(255,255,255,0.03)", animationDelay: "0.2s" }}>
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/30 flex items-center justify-center text-xs">📊</span>
            Section Progress
          </h2>
          <div className="space-y-4">
            {SECTIONS.map((section) => {
              const done = section.topics.filter((t) => stats.completedTopics.includes(t.id)).length;
              const pct = Math.round((done / section.topics.length) * 100);
              return (
                <div key={section.id}>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-300 font-medium">{section.icon} {section.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{done}/{section.topics.length}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        pct >= 80 ? "bg-emerald-500/20 text-emerald-400" :
                        pct >= 50 ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-gray-500/20 text-gray-400"
                      }`}>{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
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
        <div className="fade-in-up" style={{ animationDelay: "0.25s" }}>
          <h2 className="text-2xl font-black text-white mb-4">📚 Study Sections</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {SECTIONS.map((section) => {
              const done = section.topics.filter((t) => stats.completedTopics.includes(t.id)).length;
              const pct = Math.round((done / section.topics.length) * 100);
              return (
                <Link key={section.id} href={`/section/${section.id}`}>
                  <div className={`card-hover bg-gradient-to-br ${section.bgGradient} rounded-2xl p-6 cursor-pointer relative overflow-hidden group`}>
                    <div className="absolute inset-0 shimmer-bg pointer-events-none" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), transparent)" }} />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-4xl">{section.icon}</div>
                        <span className="text-xs font-bold bg-black/20 text-white/80 px-2.5 py-1 rounded-full backdrop-blur-sm">
                          {done}/{section.topics.length} done
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white mb-1">{section.title}</h3>
                      <p className="text-white/60 text-sm mb-4">{section.topics.length} topics • IBPS PO & Clerk</p>
                      <div className="flex items-center gap-3">
                        <div className="h-2 bg-black/25 rounded-full flex-1 overflow-hidden">
                          <div
                            className="h-full bg-white/80 rounded-full transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-white font-black text-sm min-w-[3rem] text-right">{pct}%</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4 fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Link href="/badges">
            <div className="card-hover rounded-2xl p-5 cursor-pointer border border-yellow-500/15 hover:border-yellow-500/40 transition-colors group"
              style={{ background: "rgba(234,179,8,0.05)" }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🏆
                </div>
                <div>
                  <h3 className="font-black text-white">My Badges</h3>
                  <p className="text-sm text-gray-400">{earnedBadgeCount} of {BADGES.length} earned</p>
                </div>
                <span className="ml-auto text-yellow-500/40 group-hover:text-yellow-400 transition-colors text-xl">→</span>
              </div>
            </div>
          </Link>
          <Link href="/stats">
            <div className="card-hover rounded-2xl p-5 cursor-pointer border border-indigo-500/15 hover:border-indigo-500/40 transition-colors group"
              style={{ background: "rgba(99,102,241,0.05)" }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📈
                </div>
                <div>
                  <h3 className="font-black text-white">Detailed Stats</h3>
                  <p className="text-sm text-gray-400">View performance analytics</p>
                </div>
                <span className="ml-auto text-indigo-500/40 group-hover:text-indigo-400 transition-colors text-xl">→</span>
              </div>
            </div>
          </Link>
        </div>

        <p className="text-center text-xs text-gray-700 pb-4">IBPS Quest • Progress auto-saved locally 💾</p>
      </div>
    </main>
  );
}
