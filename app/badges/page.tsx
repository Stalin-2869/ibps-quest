"use client";
import { useGame } from "@/lib/GameContext";
import { BADGES } from "@/lib/data";
import Link from "next/link";

export default function BadgesPage() {
  const { stats } = useGame();

  const earned = BADGES.filter((b) => stats.earnedBadges.includes(b.id));
  const locked = BADGES.filter((b) => !stats.earnedBadges.includes(b.id));
  const pct = Math.round((earned.length / BADGES.length) * 100);

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, #080812 0%, #0d0d20 50%, #0a0818 100%)" }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #eab308, transparent)" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/8"
        style={{ background: "rgba(8,8,18,0.85)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">← Home</Link>
          <span className="text-white/20">/</span>
          <span className="text-white font-bold text-sm">🏆 My Badges</span>
        </div>
      </header>

      <div className="relative max-w-3xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10 fade-in-up">
          <div className="text-5xl mb-4 float inline-block">🏆</div>
          <h1 className="text-4xl font-black text-white mb-2">Badge Collection</h1>
          <p className="text-gray-400 mb-5">{earned.length} of {BADGES.length} badges earned</p>

          {/* Collection progress bar */}
          <div className="max-w-xs mx-auto">
            <div className="h-3 rounded-full overflow-hidden border border-white/8"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #eab308, #f97316)"
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">{pct}% collected</p>
          </div>
        </div>

        {/* Earned badges */}
        {earned.length > 0 && (
          <div className="mb-10 fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-yellow-400 font-black text-lg">✨ Earned</span>
              <span className="bg-yellow-400/20 text-yellow-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-yellow-400/20">
                {earned.length}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {earned.map((badge, idx) => (
                <div
                  key={badge.id}
                  className="badge-earned badge-pop rounded-2xl p-5 text-center border border-yellow-400/20 cursor-default"
                  style={{
                    background: "linear-gradient(135deg, rgba(234,179,8,0.08), rgba(249,115,22,0.05))",
                    animationDelay: `${idx * 0.05}s`
                  }}
                >
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <h3 className="font-black text-white text-sm mb-1">{badge.name}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {earned.length === 0 && (
          <div className="text-center py-12 fade-in-up border border-white/8 rounded-2xl mb-10"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="text-5xl mb-4 opacity-40">🏆</div>
            <p className="text-gray-500 font-medium">No badges yet — complete quizzes to earn them!</p>
            <Link href="/" className="inline-block mt-4 text-indigo-400 hover:text-indigo-300 text-sm font-bold transition-colors">
              Start Studying →
            </Link>
          </div>
        )}

        {/* Locked badges */}
        {locked.length > 0 && (
          <div className="fade-in-up" style={{ animationDelay: "0.15s" }}>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-gray-500 font-black text-lg">🔒 Locked</span>
              <span className="bg-gray-500/20 text-gray-500 text-xs font-bold px-2.5 py-0.5 rounded-full border border-gray-500/20">
                {locked.length}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {locked.map((badge, idx) => (
                <div
                  key={badge.id}
                  className="rounded-2xl p-5 text-center border border-white/5 opacity-40 grayscale"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    animationDelay: `${idx * 0.05}s`
                  }}
                >
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <h3 className="font-bold text-gray-400 text-sm mb-1">{badge.name}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
