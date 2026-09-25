"use client";

import { ArrowLeft, ArrowRight, Flag } from "lucide-react";
import AnswerOption from "./AnswerOption";
import type { Question, UserAnswer } from "@/lib/types";

interface QuestionScreenProps {
  question: Question;
  index: number;
  total: number;
  selected: UserAnswer;
  onSelect: (answerIndex: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

const LABELS = ["A", "B", "C", "D", "E", "F"];

export default function QuestionScreen({
  question,
  index,
  total,
  selected,
  onSelect,
  onPrev,
  onNext,
}: QuestionScreenProps) {
  const progress = Math.round(((index + 1) / total) * 100);
  const isLast = index === total - 1;

  return (
    <section className="mx-auto w-full max-w-3xl animate-fade-in-up py-6 sm:py-10">
      {/* Прогрес */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-semibold">
          <span className="text-slate-300">
            Питання <span className="text-emerald-400">{index + 1}</span> з {total}
          </span>
          <span className="tabular-nums text-slate-400">{progress}%</span>
        </div>
        <div
          className="h-3 w-full overflow-hidden rounded-full border border-slate-700/50 bg-slate-800/60"
          role="progressbar"
          aria-label="Прогрес вікторини"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.6)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* key змушує React перемонтувати картку і програти анімацію для кожного питання */}
      <div
        key={index}
        className="animate-fade-in-up rounded-2xl border border-slate-700/50 bg-slate-800/40 p-5 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-8"
      >
        <h2 className="mb-6 text-xl font-bold leading-snug text-white sm:mb-8 sm:text-2xl">
          {question.question}
        </h2>

        <div className="flex flex-col gap-3 sm:gap-4">
          {question.answers.map((answer, i) => (
            <AnswerOption
              key={i}
              label={LABELS[i] ?? String(i + 1)}
              state={selected === i ? "selected" : "default"}
              onClick={() => onSelect(i)}
            >
              {answer}
            </AnswerOption>
          ))}
        </div>
      </div>

      {/* Навігація */}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="button"
          disabled={index === 0}
          onClick={onPrev}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-700/50 bg-slate-800/40 px-6 py-4 font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-slate-500 hover:shadow-lg disabled:pointer-events-none disabled:opacity-40"
        >
          <ArrowLeft className="size-5" />
          Назад
        </button>
        <button
          type="button"
          disabled={selected === null}
          onClick={onNext}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 px-6 py-4 font-extrabold uppercase tracking-wide text-slate-900 shadow-lg shadow-amber-400/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-400/40 active:scale-[0.98] disabled:pointer-events-none disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400 disabled:shadow-none"
        >
          {isLast ? (
            <>
              Завершити
              <Flag className="size-5" />
            </>
          ) : (
            <>
              Далі
              <ArrowRight className="size-5" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
