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
    <div className="max-w-lg mx-auto text-center py-12 px-4">
      <div className={`bg-gradient-to-br ${section.bgGradient} rounded-3xl p-8 mb-6`}>
        <div className="text-7xl mb-4">{topic.icon}</div>
        <h1 className="text-2xl font-black text-white mb-2">{topic.title}</h1>
        <p className="text-white/70">{topic.description}</p>
      </div>
      <div className="bg-gray-900 rounded-2xl p-6 mb-6 space-y-3 border border-gray-800">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Questions</span>
          <span className="text-white font-bold">{topic.questions.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">XP Reward</span>
          <span className="text-yellow-400 font-bold">⭐ Up to {topic.xpReward} XP</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Negative Marking</span>
          <span className="text-red-400 font-bold">−0.25 per wrong</span>
        </div>
      </div>
      <button
        onClick={onStart}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-lg py-4 rounded-2xl hover:scale-105 active:scale-95 transition-transform shadow-lg"
      >
        🚀 Start Quiz!
      </button>
    </div>
  );
}

function QuizResult({
  correct,
  total,
  xpEarned,
  topicId,
  sectionId,
  previousXP,
  currentXP,
  onRetry,
}: {
  correct: number;
  total: number;
  xpEarned: number;
  topicId: string;
  sectionId: string;
  previousXP: number;
  currentXP: number;
  onRetry: () => void;
}) {
  const pct = Math.round((correct / total) * 100);
  const oldLevel = getLevelFromXP(previousXP);
  const newLevel = getLevelFromXP(currentXP);
  const leveledUp = newLevel.level > oldLevel.level;

  let emoji = "😢";
  let msg = "Keep practicing! You'll get it!";
  if (pct === 100) { emoji = "🎉"; msg = "PERFECT! You're unstoppable!"; }
  else if (pct >= 80) { emoji = "🌟"; msg = "Excellent work! Almost perfect!"; }
  else if (pct >= 60) { emoji = "👏"; msg = "Good job! Keep it up!"; }
  else if (pct >= 40) { emoji = "💪"; msg = "You're getting there!"; }

  return (
    <div className="max-w-lg mx-auto text-center py-12 px-4">
      {leveledUp && (
        <div className="badge-pop bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-6 mb-6 text-black">
          <div className="text-5xl mb-2">⬆️</div>
          <h2 className="text-2xl font-black">LEVEL UP!</h2>
          <p className="font-bold">Level {newLevel.level} — {newLevel.title}</p>
        </div>
      )}

      <div className="text-8xl mb-4">{emoji}</div>
      <h2 className="text-3xl font-black text-white mb-2">{msg}</h2>

      <div className="bg-gray-900 rounded-3xl p-6 mb-6 space-y-4 border border-gray-800">
        {/* Score circle */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1f2937" strokeWidth="3.2" />
            <circle
              cx="18" cy="18" r="15.9" fill="none"
              stroke={pct >= 80 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#ef4444"}
              strokeWidth="3.2"
              strokeDasharray={`${pct} 100`}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 1s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-black ${pct >= 80 ? "text-green-400" : pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>{pct}%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-gray-800 rounded-xl p-3">
            <p className="text-green-400 font-black text-xl">{correct}</p>
            <p className="text-gray-400 text-xs">Correct</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-3">
            <p className="text-red-400 font-black text-xl">{total - correct}</p>
            <p className="text-gray-400 text-xs">Wrong</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-3">
            <p className="text-yellow-400 font-black text-xl">+{xpEarned}</p>
            <p className="text-gray-400 text-xs">XP Earned</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onRetry}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:scale-105 transition-transform"
        >
          🔄 Try Again
        </button>
        <Link href={`/section/${sectionId}`} className="block w-full bg-gray-800 text-gray-300 font-bold py-3 rounded-xl hover:bg-gray-700 transition-colors text-center">
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
      // Negative marking simulation: reduce XP slightly
      setXpEarned((x) => Math.max(0, x - Math.round(topic.xpReward / (topic.questions.length * 4))));
    }
  }, [showAnswer, questions, currentIdx, topic.xpReward, topic.questions.length]);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= questions.length) {
      // Done
      const finalCorrect = correct + (selected === questions[currentIdx].answer ? 0 : 0); // already counted in handleSelect
      finishQuiz(topic.id, correct, questions.length, xpEarned);
      setPhase("result");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowAnswer(false);
    }
  }, [currentIdx, questions, correct, finishQuiz, topic.id, xpEarned, selected]);

  if (phase === "intro") return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <div className="bg-gray-950/80 backdrop-blur border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href={`/section/${sectionId}`} className="text-gray-400 hover:text-white text-sm">← {section.title}</Link>
        </div>
      </div>
      <QuizIntro topic={topic} section={section} onStart={startQuiz} />
    </main>
  );

  if (phase === "result") return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <QuizResult
        correct={correct}
        total={questions.length}
        xpEarned={xpEarned}
        topicId={topicId}
        sectionId={sectionId}
        previousXP={previousXP}
        currentXP={stats.totalXP}
        onRetry={startQuiz}
      />
    </main>
  );

  const q = questions[currentIdx];
  const progress = ((currentIdx + (showAnswer ? 1 : 0)) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div
          className={`h-full bg-gradient-to-r ${section.bgGradient} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Quiz Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href={`/section/${sectionId}`} className="text-gray-500 hover:text-gray-300 text-sm">✕ Quit</Link>
          <div className="text-center">
            <p className="text-gray-400 text-sm">{topic.title}</p>
            <p className="text-white font-bold">{currentIdx + 1} / {questions.length}</p>
          </div>
          <div className="text-right">
            <p className="text-yellow-400 text-sm font-bold">⭐ {xpEarned} XP</p>
            <p className="text-green-400 text-xs">{correct} correct</p>
          </div>
        </div>

        {/* Difficulty badge */}
        <div className="mb-4">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            q.difficulty === "easy" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
            q.difficulty === "medium" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
            "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}>
            {q.difficulty === "easy" ? "🟢 Easy" : q.difficulty === "medium" ? "🟡 Medium" : "🔴 Hard"}
          </span>
        </div>

        {/* Question */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <p className="text-white text-lg font-medium leading-relaxed whitespace-pre-line">{q.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {q.options.map((opt, i) => {
            let classes = "w-full text-left p-4 rounded-xl border transition-all duration-200 font-medium ";
            if (!showAnswer) {
              classes += selected === i
                ? "border-indigo-500 bg-indigo-500/20 text-white"
                : "border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500 hover:bg-gray-800";
            } else {
              if (i === q.answer) {
                classes += "border-green-500 bg-green-500/20 text-green-300";
              } else if (i === selected && i !== q.answer) {
                classes += "border-red-500 bg-red-500/20 text-red-300";
              } else {
                classes += "border-gray-800 bg-gray-900/50 text-gray-500";
              }
            }
            return (
              <button key={i} className={classes} onClick={() => handleSelect(i)}>
                <span className="inline-flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    showAnswer && i === q.answer ? "border-green-500 bg-green-500 text-white" :
                    showAnswer && i === selected && i !== q.answer ? "border-red-500 bg-red-500 text-white" :
                    "border-gray-600"
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
          <div className={`rounded-2xl p-4 mb-6 border ${
            selected === q.answer
              ? "bg-green-500/10 border-green-500/30"
              : "bg-red-500/10 border-red-500/30"
          }`}>
            <p className="text-sm font-bold text-gray-300 mb-1">
              {selected === q.answer ? "✅ Correct!" : "❌ Incorrect"}
            </p>
            <p className="text-sm text-gray-400">{q.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {showAnswer && (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 rounded-2xl hover:scale-105 active:scale-95 transition-transform"
          >
            {currentIdx + 1 >= questions.length ? "🏁 Finish Quiz!" : "Next Question →"}
          </button>
        )}
      </div>
    </main>
  );
}

