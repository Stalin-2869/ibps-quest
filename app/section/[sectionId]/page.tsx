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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      {/* Header */}
      <div className="bg-gray-950/80 backdrop-blur border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">← Home</Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-bold">{section.icon} {section.title}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Section Hero */}
        <div className={`bg-gradient-to-br ${section.bgGradient} rounded-3xl p-8 mb-8 text-center`}>
          <div className="text-6xl mb-3">{section.icon}</div>
          <h1 className="text-3xl font-black text-white mb-2">{section.title}</h1>
          <p className="text-white/70">{section.topics.length} topics • IBPS PO & Clerk</p>
          <div className="mt-4 bg-white/10 rounded-full px-4 py-1 inline-block">
            <span className="text-white text-sm font-bold">
              {section.topics.filter((t) => stats.completedTopics.includes(t.id)).length}/{section.topics.length} Completed
            </span>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-3">
          {section.topics.map((topic) => {
            const isCompleted = stats.completedTopics.includes(topic.id);
            const score = stats.topicScores[topic.id];
            const accuracy = score ? Math.round((score.correct / score.total) * 100) : null;

            return (
              <Link key={topic.id} href={`/quiz/${section.id}/${topic.id}`}>
                <div className={`card-hover bg-gray-900 border rounded-2xl p-5 cursor-pointer transition-all ${
                  isCompleted ? "border-green-500/40 hover:border-green-400/60" : "border-gray-700 hover:border-indigo-500/50"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`text-3xl bg-gray-800 rounded-xl p-2 ${isCompleted ? "opacity-100" : "opacity-80"}`}>
                        {topic.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{topic.title}</h3>
                        <p className="text-sm text-gray-400">{topic.description}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-yellow-400 font-bold">+{topic.xpReward} XP</span>
                          <span className="text-xs text-gray-500">{topic.questions.length} questions</span>
                          {score && (
                            <span className="text-xs text-gray-500">{score.attempts} attempt{score.attempts > 1 ? "s" : ""}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      {isCompleted ? (
                        <div>
                          <div className="text-green-400 text-2xl mb-1">✅</div>
                          {accuracy !== null && (
                            <div className={`text-xs font-bold ${accuracy >= 80 ? "text-green-400" : accuracy >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                              {accuracy}%
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-600 text-2xl">▶</div>
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

