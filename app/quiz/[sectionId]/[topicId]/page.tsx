"use client";
import { useGame } from "@/lib/GameContext";
import { SECTIONS, Question, getLevelFromXP } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState, useEffect, useCallback } from "react";

type Phase = "intro" | "quiz" | "result";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function QuizIntro({
  topic,
  section,
  onStart,
}: {
  topic: { title: string; description: string; icon: string; xpReward: number; questions: Question[] };
  section: { bgGradient: string };
  onStart: () => void;
}) {
  return (
    <div className="max-w-lg mx-auto text-center py-12 px-4 fade-in-up">
      <div className={`bg-gradient-to-br ${section.bgGradient} rounded-3xl p-8 mb-6 relative overflow-hidden`}>
        <div className="absolute inset-0 shimmer-bg pointer-events-none" />
        <div className="relative z-10">
          <div className="text-7xl mb-4 float inline-block">{topic.icon}</div>
          <h1 className="text-2xl font-black text-white mb-2">{topic.title}</h1>
          <p className="text-white/70">{topic.description}</p>
        </div>
      </div>

      <div className="rounded-2xl p-6 mb-6 border border-white/8 space-y-4"
        style={{ background: "rgba(255,255,255,0.03)" }}>
        {[
          { label: "Questions", value: topic.questions.length, color: "text-white" },
          { label: "XP Reward", value: `⭐ Up to ${topic.xpReward} XP`, color: "text-yellow-400" },
          { label: "Negative Marking", value: "−0.25 per wrong", color: "text-red-400" },
        ].map((row) => (
          <div key={row.label} className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">{row.label}</span>
            <span className={`${row.color} font-bold text-sm`}>{row.value}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="w-full font-black text-lg py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl"
        style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", color: "white" }}
      >
        🚀 Start Quiz!
      </button>
    </div>
  );
}

function QuizResult({
  correct, total, xpEarned, topicId, sectionId, previousXP, currentXP, onRetry,
}: {
  correct: number; total: number; xpEarned: number;
  topicId: string; sectionId: string; previousXP: number; currentXP: number; onRetry: () => void;
}) {
  const pct = Math.round((correct / total) * 100);
  const oldLevel = getLevelFromXP(previousXP);
  const newLevel = getLevelFromXP(currentXP);
  const leveledUp = newLevel.level > oldLevel.level;

  let emoji = "😢"; let msg = "Keep practicing! You'll get it!";
  if (pct === 100) { emoji = "🎉"; msg = "PERFECT! You're unstoppable!"; }
  else if (pct >= 80) { emoji = "🌟"; msg = "Excellent work! Almost perfect!"; }
  else if (pct >= 60) { emoji = "👏"; msg = "Good job! Keep it up!"; }
  else if (pct >= 40) { emoji = "💪"; msg = "You're getting there!"; }

  return (
    <div className="max-w-lg mx-auto text-center py-12 px-4 fade-in-up">
      {leveledUp && (
        <div className="badge-pop rounded-3xl p-6 mb-6 shadow-2xl"
          style={{ background: "linear-gradient(135deg, #eab308, #f97316)", color: "#000" }}>
          <div className="text-5xl mb-2">⬆️</div>
          <h2 className="text-2xl font-black">LEVEL UP!</h2>
          <p className="font-bold">Level {newLevel.level} — {newLevel.title}</p>
        </div>
      )}

      <div className="text-7xl mb-4">{emoji}</div>
      <h2 className="text-3xl font-black text-white mb-6">{msg}</h2>

      <div className="rounded-3xl p-6 mb-6 border border-white/8 space-y-6"
        style={{ background: "rgba(255,255,255,0.03)" }}>
        {/* Score ring */}
        <div className="relative w-36 h-36 mx-auto">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15.9" fill="none"
              stroke={pct >= 80 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#ef4444"}
              strokeWidth="3"
              strokeDasharray={`${pct} 100`}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 1.2s ease", filter: `drop-shadow(0 0 6px ${pct >= 80 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#ef4444"})` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-black ${pct >= 80 ? "text-emerald-400" : pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>
              {pct}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { value: correct, label: "Correct", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { value: total - correct, label: "Wrong", color: "text-red-400", bg: "bg-red-500/10" },
            { value: `+${xpEarned}`, label: "XP Earned", color: "text-yellow-400", bg: "bg-yellow-500/10" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-3 border border-white/5`}>
              <p className={`${s.color} font-black text-xl`}>{s.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onRetry}
          className="w-full font-bold py-3.5 rounded-2xl text-white transition-all hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
        >
          🔄 Try Again
        </button>
        <Link href={`/section/${sectionId}`}
          className="block w-full py-3.5 rounded-2xl text-gray-300 font-bold text-center transition-colors border border-white/8 hover:bg-white/5"
          style={{ background: "rgba(255,255,255,0.04)" }}>
          ← Back to Section
        </Link>
        <Link href="/" className="block w-full text-gray-500 py-2 text-sm hover:text-gray-300 transition-colors text-center">
          🏠 Home
        </Link>
      </div>
    </div>
  );
}

export default function QuizPage({ params }: { params: Promise<{ sectionId: string; topicId: string }> }) {
  const { sectionId, topicId } = use(params);
  const { stats, finishQuiz } = useGame();

  const section = SECTIONS.find((s) => s.id === sectionId);
  const topic = section?.topics.find((t) => t.id === topicId);
  if (!section || !topic) return notFound();

  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [previousXP, setPreviousXP] = useState(0);

  const startQuiz = useCallback(() => {
    setQuestions(shuffle(topic.questions));
    setCurrentIdx(0);
    setSelected(null);
    setShowAnswer(false);
    setCorrect(0);
    setXpEarned(0);
    setPreviousXP(stats.totalXP);
    setPhase("quiz");
  }, [topic.questions, stats.totalXP]);

  const handleSelect = useCallback((idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);

    const q = questions[currentIdx];
    const isCorrect = idx === q.answer;
    if (isCorrect) {
      setCorrect((c) => c + 1);
      const baseXP = Math.round(topic.xpReward / topic.questions.length);
      setXpEarned((x) => x + baseXP);
    } else {
      setXpEarned((x) => Math.max(0, x - Math.round(topic.xpReward / (topic.questions.length * 4))));
    }
  }, [showAnswer, questions, currentIdx, topic.xpReward, topic.questions.length]);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= questions.length) {
      finishQuiz(topic.id, correct, questions.length, xpEarned);
      setPhase("result");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowAnswer(false);
    }
  }, [currentIdx, questions, correct, finishQuiz, topic.id, xpEarned]);

  const bgStyle = { background: "linear-gradient(160deg, #080812 0%, #0d0d20 50%, #0a0818 100%)" };

  if (phase === "intro") return (
    <main className="min-h-screen" style={bgStyle}>
      <header className="sticky top-0 z-40 border-b border-white/8"
        style={{ background: "rgba(8,8,18,0.85)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href={`/section/${sectionId}`} className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
            ← {section.title}
          </Link>
        </div>
      </header>
      <QuizIntro topic={topic} section={section} onStart={startQuiz} />
    </main>
  );

  if (phase === "result") return (
    <main className="min-h-screen" style={bgStyle}>
      <QuizResult
        correct={correct} total={questions.length} xpEarned={xpEarned}
        topicId={topicId} sectionId={sectionId} previousXP={previousXP}
        currentXP={stats.totalXP} onRetry={startQuiz}
      />
    </main>
  );

  const q = questions[currentIdx];
  const progress = ((currentIdx + (showAnswer ? 1 : 0)) / questions.length) * 100;

  return (
    <main className="min-h-screen" style={bgStyle}>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div
          className={`h-full bg-gradient-to-r ${section.bgGradient} transition-all duration-500`}
          style={{ width: `${progress}%`, filter: "drop-shadow(0 0 4px rgba(99,102,241,0.8))" }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 pt-10">
        {/* Quiz Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href={`/section/${sectionId}`}
            className="text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors flex items-center gap-1">
            ✕ Quit
          </Link>
          <div className="text-center">
            <p className="text-gray-400 text-xs font-medium">{topic.title}</p>
            <p className="text-white font-black">{currentIdx + 1} <span className="text-gray-500 font-normal">/ {questions.length}</span></p>
          </div>
          <div className="text-right">
            <p className="text-yellow-400 text-sm font-black">⭐ {xpEarned}</p>
            <p className="text-emerald-400 text-xs">{correct} correct</p>
          </div>
        </div>

        {/* Difficulty badge */}
        <div className="mb-5">
          <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${
            q.difficulty === "easy" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" :
            q.difficulty === "medium" ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/25" :
            "bg-red-500/15 text-red-400 border-red-500/25"
          }`}>
            {q.difficulty === "easy" ? "🟢 Easy" : q.difficulty === "medium" ? "🟡 Medium" : "🔴 Hard"}
          </span>
        </div>

        {/* Question card */}
        <div className="rounded-2xl p-6 mb-6 border border-white/8 scale-in"
          style={{ background: "rgba(255,255,255,0.04)" }}>
          <p className="text-white text-lg font-semibold leading-relaxed whitespace-pre-line">{q.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {q.options.map((opt, i) => {
            let style: React.CSSProperties = {};
            let className = "option-btn w-full text-left p-4 rounded-2xl border font-medium text-sm ";

            if (!showAnswer) {
              if (selected === i) {
                className += "border-indigo-400 text-white";
                style = { background: "rgba(99,102,241,0.2)" };
              } else {
                className += "border-white/8 text-gray-300 hover:border-white/20 hover:bg-white/5";
                style = { background: "rgba(255,255,255,0.03)" };
              }
            } else {
              if (i === q.answer) {
                className += "border-emerald-500 text-emerald-300";
                style = { background: "rgba(16,185,129,0.12)" };
              } else if (i === selected && i !== q.answer) {
                className += "border-red-500 text-red-300";
                style = { background: "rgba(239,68,68,0.12)" };
              } else {
                className += "border-white/5 text-gray-600";
                style = { background: "rgba(255,255,255,0.01)" };
              }
            }

            return (
              <button key={i} className={className} style={style} onClick={() => handleSelect(i)}>
                <span className="inline-flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-black flex-shrink-0 transition-all ${
                    showAnswer && i === q.answer ? "border-emerald-500 bg-emerald-500 text-white" :
                    showAnswer && i === selected && i !== q.answer ? "border-red-500 bg-red-500 text-white" :
                    "border-white/20 text-gray-400"
                  }`}>
                    {showAnswer && i === q.answer ? "✓" : showAnswer && i === selected ? "✗" : String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showAnswer && (
          <div className={`rounded-2xl p-4 mb-6 border scale-in ${
            selected === q.answer ? "border-emerald-500/25" : "border-red-500/25"
          }`} style={{
            background: selected === q.answer ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)"
          }}>
            <p className="text-sm font-bold mb-1">
              {selected === q.answer
                ? <span className="text-emerald-400">✅ Correct!</span>
                : <span className="text-red-400">❌ Incorrect</span>
              }
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {showAnswer && (
          <button
            onClick={handleNext}
            className="w-full font-black py-4 rounded-2xl text-white transition-all hover:scale-105 active:scale-95 shadow-xl fade-in-up"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            {currentIdx + 1 >= questions.length ? "🏁 Finish Quiz!" : "Next Question →"}
          </button>
        )}
      </div>
    </main>
  );
}
