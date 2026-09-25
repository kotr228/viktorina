import { Check, X } from "lucide-react";
import type { ReactNode } from "react";

export type AnswerState = "default" | "selected" | "correct" | "incorrect";

interface AnswerOptionProps {
  /** Мітка варіанта: A, B, C, D… */
  label: string;
  state?: AnswerState;
  children: ReactNode;
  /** Якщо не передано — картка рендериться як статичний елемент (напр., у розборі відповідей). */
  onClick?: () => void;
}

const cardStyles: Record<AnswerState, string> = {
  default:
    "border-slate-700/50 bg-slate-800/40 hover:border-slate-500 hover:bg-slate-800/70",
  selected:
    "border-amber-400/80 bg-amber-400/10 shadow-lg shadow-amber-400/10 ring-1 ring-amber-400/40",
  correct:
    "border-emerald-400/80 bg-emerald-400/10 shadow-lg shadow-emerald-400/10 ring-1 ring-emerald-400/40",
  incorrect:
    "border-rose-500/80 bg-rose-500/10 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500/40 animate-shake",
};

const badgeStyles: Record<AnswerState, string> = {
  default: "border-slate-600 bg-slate-900/60 text-slate-300 group-hover:border-slate-400",
  selected: "border-amber-400 bg-amber-400 text-slate-900",
  correct: "border-emerald-400 bg-emerald-400 text-slate-900",
  incorrect: "border-rose-500 bg-rose-500 text-white",
};

export default function AnswerOption({
  label,
  state = "default",
  children,
  onClick,
}: AnswerOptionProps) {
  const interactive = Boolean(onClick);

  const className = [
    "group relative flex w-full items-center gap-4 rounded-2xl border p-4 text-left backdrop-blur-md sm:p-5",
    "transition-all duration-300",
    interactive && "cursor-pointer hover:scale-[1.02] hover:shadow-lg active:scale-[0.99]",
    cardStyles[state],
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-300 ${badgeStyles[state]}`}
      >
        {state === "correct" ? (
          <Check className="size-5 animate-pop" strokeWidth={3} />
        ) : state === "incorrect" ? (
          <X className="size-5 animate-pop" strokeWidth={3} />
        ) : (
          label
        )}
      </span>
      <span className="flex-1 text-base leading-snug text-slate-100 sm:text-lg">{children}</span>
    </>
  );

  if (!interactive) {
    return <div className={className}>{content}</div>;
  }

  return (
    <button
      type="button"
      className={className}
      aria-pressed={state === "selected"}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
