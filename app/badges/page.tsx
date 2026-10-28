"use client";
import { useGame } from "@/lib/GameContext";
import { BADGES } from "@/lib/data";
import Link from "next/link";

export default function BadgesPage() {
  const { stats } = useGame();

  const earned = BADGES.filter((b) => stats.earnedBadges.includes(b.id));
  const locked = BADGES.filter((b) => !stats.earnedBadges.includes(b.id));

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <div className="bg-gray-950/80 backdrop-blur border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">← Home</Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-bold">🏆 My Badges</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2">🏆 Badge Collection</h1>
          <p className="text-gray-400">{earned.length} of {BADGES.length} badges earned</p>
          <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden max-w-xs mx-auto">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
              style={{ width: `${(earned.length / BADGES.length) * 100}%` }}
            />
          </div>
        </div>

        {earned.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-yellow-400 mb-4">✨ Earned</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {earned.map((badge) => (
                <div
                  key={badge.id}
                  className="badge-pop bg-gray-900 border-2 rounded-2xl p-5 text-center"
                  style={{ borderColor: badge.color + "66" }}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h3 className="font-bold text-white text-sm mb-1">{badge.name}</h3>
                  <p className="text-gray-400 text-xs">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {locked.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-500 mb-4">🔒 Locked</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {locked.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center opacity-50"
                >
                  <div className="text-4xl mb-2 grayscale">{badge.icon}</div>
                  <h3 className="font-bold text-gray-400 text-sm mb-1">{badge.name}</h3>
                  <p className="text-gray-600 text-xs">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

