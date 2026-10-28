"use client";
import { useGame } from "@/lib/GameContext";
import { SECTIONS } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

export default function SectionPage({ params }: { params: Promise<{ sectionId: string }> }) {
  const { sectionId } = use(params);
  const { stats } = useGame();
  const section = SECTIONS.find((s) => s.id === sectionId);
  if (!section) return notFound();

  const completedCount = section.topics.filter((t) => stats.completedTopics.includes(t.id)).length;
  const overallPct = Math.round((completedCount / section.topics.length) * 100);

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, #080812 0%, #0d0d20 50%, #0a0818 100%)" }}>
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/8"
        style={{ background: "rgba(8,8,18,0.85)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            ← Home
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-white font-bold text-sm">{section.icon} {section.title}</span>
        </div>
      </header>

      <div className="relative max-w-3xl mx-auto px-4 py-8">
        {/* Section Hero */}
        <div className={`bg-gradient-to-br ${section.bgGradient} rounded-3xl p-8 mb-8 text-center relative overflow-hidden`}>
          <div className="absolute inset-0 shimmer-bg pointer-events-none" />
          <div className="relative z-10">
            <div className="text-6xl mb-3 float inline-block">{section.icon}</div>
            <h1 className="text-3xl font-black text-white mb-2">{section.title}</h1>
            <p className="text-white/70 mb-5">{section.topics.length} topics • IBPS PO & Clerk</p>

            <div className="max-w-xs mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/80 font-semibold">Progress</span>
                <span className="text-white font-black">{completedCount}/{section.topics.length}</span>
              </div>
              <div className="h-3 bg-black/25 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/80 rounded-full transition-all duration-700"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              <p className="text-white/70 text-xs mt-2">{overallPct}% complete</p>
            </div>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-3">
          {section.topics.map((topic, idx) => {
            const isCompleted = stats.completedTopics.includes(topic.id);
            const score = stats.topicScores[topic.id];
            const accuracy = score ? Math.round((score.correct / score.total) * 100) : null;

            return (
              <Link key={topic.id} href={`/quiz/${section.id}/${topic.id}`}>
                <div
                  className={`card-hover rounded-2xl p-5 cursor-pointer border transition-all fade-in-up ${
                    isCompleted
                      ? "border-emerald-500/30 hover:border-emerald-400/50"
                      : "border-white/8 hover:border-indigo-500/40"
                  }`}
                  style={{
                    background: isCompleted ? "rgba(16,185,129,0.05)" : "rgba(255,255,255,0.03)",
                    animationDelay: `${idx * 0.04}s`
                  }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                        isCompleted ? "bg-emerald-500/15" : "bg-white/6"
                      }`}>
                        {topic.icon}
                      </div>
                      <div>
                        <h3 className="font-black text-white">{topic.title}</h3>
                        <p className="text-sm text-gray-400">{topic.description}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded-full">
                            +{topic.xpReward} XP
                          </span>
                          <span className="text-xs text-gray-500">{topic.questions.length} questions</span>
                          {score && (
                            <span className="text-xs text-gray-500">{score.attempts} attempt{score.attempts > 1 ? "s" : ""}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      {isCompleted ? (
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-emerald-400 text-xl">✅</span>
                          {accuracy !== null && (
                            <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                              accuracy >= 80 ? "bg-emerald-500/20 text-emerald-400" :
                              accuracy >= 60 ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-red-500/20 text-red-400"
                            }`}>
                              {accuracy}%
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 text-sm font-bold group-hover:bg-indigo-500/25 transition-colors">
                          ▶
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
