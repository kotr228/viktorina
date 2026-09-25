"use client";

import { ChevronDown, Phone, RotateCcw, Share2, Timer, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import AnswerOption from "./AnswerOption";
import { QUIZ_TITLE } from "@/lib/config";
import { getFeedback } from "@/lib/quiz";
import type { QuizResult } from "@/lib/types";

interface ResultsScreenProps {
  result: QuizResult;
  onRestart: () => void;
}

const ANIMATION_DURATION = 1500;
const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const CONTACTS = [
  { name: "Національна гаряча лінія", phone: "116 123", tel: "116123", note: "безкоштовно, цілодобово" },
  { name: "Поліція", phone: "102", tel: "102" },
  { name: "Швидка допомога", phone: "103", tel: "103" },
  { name: "La Strada-Ukraine", phone: "0 800 500 335", tel: "0800500335", note: "протидія торгівлі людьми" },
];

interface ScoreTier {
  text: string;
  stroke: string;
  badge: string;
  glow: string;
}

/** Колір результату: зелений > 70%, жовтий 40–70%, червоний < 40%. */
function getScoreTier(percentage: number): ScoreTier {
  if (percentage > 70) {
    return {
      text: "text-emerald-400",
      stroke: "stroke-emerald-400",
      badge: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
      glow: "drop-shadow-[0_0_24px_rgba(52,211,153,0.45)]",
    };
  }
  if (percentage >= 40) {
    return {
      text: "text-amber-400",
      stroke: "stroke-amber-400",
      badge: "border-amber-400/40 bg-amber-400/10 text-amber-300",
      glow: "drop-shadow-[0_0_24px_rgba(251,191,36,0.45)]",
    };
  }
  return {
    text: "text-rose-500",
    stroke: "stroke-rose-500",
    badge: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    glow: "drop-shadow-[0_0_24px_rgba(244,63,94,0.45)]",
  };
}

function useAnimatedNumber(target: number, duration = ANIMATION_DURATION): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic — число «пригальмовує» наприкінці
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m} хв ${s} с` : `${s} с`;
}

async function shareResult(percentage: number): Promise<void> {
  const url = window.location.href;
  const text = `Я пройшов(-ла) вікторину "Протидія насильству" і набрав(-ла) ${percentage}%! Перевір свої знання теж!`;

  if (navigator.share) {
    try {
      await navigator.share({ title: QUIZ_TITLE, text, url });
    } catch (err) {
      console.log("Помилка при спробі поділитися:", err);
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(`${text} ${url}`);
    alert("Посилання скопійовано в буфер обміну!");
  } catch {
    alert(`Скопіюйте посилання вручну: ${url}`);
  }
}

const cardClass = "rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-md";

export default function ResultsScreen({ result, onRestart }: ResultsScreenProps) {
  const animatedPercentage = useAnimatedNumber(result.percentage);
  const feedback = getFeedback(result.percentage);
  const tier = getScoreTier(result.percentage);
  const dashOffset = RING_CIRCUMFERENCE * (1 - animatedPercentage / 100);

  return (
    <section className="mx-auto w-full max-w-3xl animate-fade-in-up space-y-6 py-6 sm:py-10">
      {/* Підсумковий рахунок */}
      <div className={`${cardClass} p-6 text-center shadow-2xl shadow-black/20 sm:p-10`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-900/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-300">
          <Trophy className="size-4 text-amber-400" />
          Вікторину завершено
        </span>

        <div className={`relative mx-auto my-8 size-48 sm:size-56 ${tier.glow}`}>
          <svg viewBox="0 0 120 120" className="size-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="10"
              className="stroke-slate-700/60"
            />
            <circle
              cx="60"
              cy="60"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              className={tier.stroke}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-6xl font-black tabular-nums sm:text-7xl ${tier.text}`}>
              {animatedPercentage}
              <span className="text-3xl sm:text-4xl">%</span>
            </span>
          </div>
        </div>

        <p className="text-lg text-slate-300 sm:text-xl">
          Правильних відповідей:{" "}
          <span className={`font-bold ${tier.text}`}>{result.correctAnswers}</span> з{" "}
          {result.totalQuestions}
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-500">
          <Timer className="size-4" />
          Час: {formatTime(result.timeSpent)}
        </p>

        <div className={`mt-6 rounded-2xl border p-4 text-left sm:p-5 ${tier.badge}`}>
          <strong className="font-bold">{feedback.title}</strong>{" "}
          <span className="text-slate-200">{feedback.text}</span>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onRestart}
            className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 px-6 py-4 font-extrabold uppercase tracking-wide text-slate-900 shadow-lg shadow-amber-400/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-400/40 active:scale-[0.98]"
          >
            <RotateCcw className="size-5 transition-transform duration-500 group-hover:-rotate-180" />
            Спробувати ще раз
          </button>
          <button
            type="button"
            onClick={() => shareResult(result.percentage)}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-emerald-400/50 bg-emerald-400/10 px-6 py-4 font-bold text-emerald-300 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400 hover:bg-emerald-400/20 hover:shadow-lg hover:shadow-emerald-400/20 active:scale-[0.98]"
          >
            <Share2 className="size-5" />
            Поділитися в соцмережах
          </button>
        </div>
      </div>

      {/* Корисні контакти */}
      <div className={`${cardClass} p-6 sm:p-8`}>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-400">
          <Phone className="size-5" />
          Корисні контакти
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {CONTACTS.map((c) => (
            <li key={c.tel}>
              <a
                href={`tel:${c.tel}`}
                className="flex h-full flex-col rounded-xl border border-slate-700/50 bg-slate-900/40 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-amber-400/50 hover:shadow-lg"
              >
                <span className="text-sm text-slate-400">{c.name}</span>
                <span className="text-xl font-bold tabular-nums text-slate-100">{c.phone}</span>
                {c.note && <span className="text-xs text-slate-500">{c.note}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Розбір відповідей */}
      <details className={`${cardClass} group overflow-hidden`}>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-bold text-slate-100 transition-colors duration-300 hover:bg-slate-800/60 sm:px-8 [&::-webkit-details-marker]:hidden">
          Розбір відповідей
          <ChevronDown className="size-5 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <ol className="space-y-6 border-t border-slate-700/50 p-6 sm:p-8">
          {result.answers.map((a, i) => (
            <li key={i}>
              <p className="mb-3 font-semibold text-slate-200">
                <span className="mr-2 text-slate-500">{i + 1}.</span>
                {a.question}
              </p>
              <div className="space-y-2">
                <AnswerOption label="" state={a.isCorrect ? "correct" : "incorrect"}>
                  {a.userAnswer}
                </AnswerOption>
                {!a.isCorrect && (
                  <AnswerOption label="" state="correct">
                    <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wide text-emerald-400">
                      Правильна відповідь
                    </span>
                    {a.correctAnswer}
                  </AnswerOption>
                )}
              </div>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
