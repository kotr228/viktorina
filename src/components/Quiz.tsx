"use client";

import { useRef, useState } from "react";
import QuestionScreen from "./QuestionScreen";
import ResultsScreen from "./ResultsScreen";
import StartScreen from "./StartScreen";
import { buildResult } from "@/lib/quiz";
import { submitResult } from "@/lib/results";
import type { Question, QuizResult, UserAnswer } from "@/lib/types";

type Stage = "start" | "quiz" | "results";

interface QuizProps {
  questions: Question[];
}

export default function Quiz({ questions }: QuizProps) {
  const [stage, setStage] = useState<Stage>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const user = useRef({ name: "", email: "" });
  const startTime = useRef(0);

  const start = (name: string, email: string) => {
    user.current = { name, email };
    startTime.current = Date.now();
    setCurrentIndex(0);
    setAnswers(new Array<UserAnswer>(questions.length).fill(null));
    setResult(null);
    setStage("quiz");
  };

  const select = (answerIndex: number) => {
    setAnswers((prev) => prev.map((a, i) => (i === currentIndex ? answerIndex : a)));
  };

  const finish = () => {
    const quizResult = buildResult({
      questions,
      answers,
      name: user.current.name,
      email: user.current.email,
      timeSpent: Math.round((Date.now() - startTime.current) / 1000),
    });
    setResult(quizResult);
    setStage("results");
    void submitResult(quizResult);
  };

  const next = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finish();
    }
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (stage === "quiz") {
    return (
      <QuestionScreen
        question={questions[currentIndex]}
        index={currentIndex}
        total={questions.length}
        selected={answers[currentIndex] ?? null}
        onSelect={select}
        onPrev={prev}
        onNext={next}
      />
    );
  }

  if (stage === "results" && result) {
    return <ResultsScreen result={result} onRestart={() => setStage("start")} />;
  }

  return <StartScreen onStart={start} totalQuestions={questions.length} />;
}
