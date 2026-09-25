"use client";

import { Clock, HeartHandshake, Play, Scale, ShieldCheck, Sparkles, Eye } from "lucide-react";
import { useState, type FormEvent } from "react";
import Logo from "./Logo";

interface StartScreenProps {
  onStart: (name: string, email: string) => void;
  /** Кількість питань — для підказки під кнопкою. */
  totalQuestions?: number;
}

const TOPICS = [
  { icon: Eye, text: "Види насильства та як їх розпізнати" },
  { icon: ShieldCheck, text: "Способи захисту себе та інших" },
  { icon: HeartHandshake, text: "Куди звертатися за допомогою" },
  { icon: Scale, text: "Ваші права та можливості" },
];

const inputClass =
  "w-full rounded-xl border border-slate-700/50 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-all duration-300 focus:border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-400/30";

export default function StartScreen({ onStart, totalQuestions }: StartScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onStart(name.trim() || "Анонім", email.trim());
  };

  return (
    <section className="flex min-h-[calc(100dvh-10rem)] animate-fade-in-up flex-col items-center justify-center py-8">
      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <Logo className="mb-6 size-20 drop-shadow-[0_0_24px_rgba(251,191,36,0.35)] sm:size-24" />

        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
          <Sparkles className="size-3.5" />
          SparkQuest · Вікторина
        </span>

        <h1 className="bg-gradient-to-r from-yellow-400 via-amber-300 to-emerald-400 bg-clip-text pb-2 text-4xl font-black leading-tight tracking-tight text-transparent sm:text-6xl">
          Протидія насильству
        </h1>
        <p className="mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
          Перевірте свої знання про безпеку, свої права та те, як допомогти собі й іншим.
        </p>

        <ul className="mt-8 grid w-full grid-cols-1 gap-3 text-left sm:grid-cols-2">
          {TOPICS.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400/40 hover:shadow-lg"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <Icon className="size-5" />
              </span>
              <span className="text-sm text-slate-200 sm:text-base">{text}</span>
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleSubmit}
          className="mt-8 w-full rounded-2xl border border-slate-700/50 bg-slate-800/40 p-5 backdrop-blur-md sm:p-6"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Ваше ім'я (необов'язково)"
              aria-label="Ваше ім'я"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Ваш email (необов'язково)"
              aria-label="Ваш email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="group mt-5 flex w-full animate-glow items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 px-8 py-5 text-lg font-extrabold uppercase tracking-wide text-slate-900 transition-all duration-300 hover:scale-[1.02] hover:from-yellow-300 hover:to-amber-300 active:scale-[0.98] sm:text-xl"
          >
            <Play className="size-6 fill-slate-900 transition-transform duration-300 group-hover:translate-x-1" />
            Почати вікторину
          </button>

          {totalQuestions !== undefined && (
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
              <Clock className="size-4" />
              {totalQuestions} питань · близько {Math.max(1, Math.round(totalQuestions / 3))} хв
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
