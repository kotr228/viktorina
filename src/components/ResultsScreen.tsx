"use client";

import { useEffect, useState } from "react";
import { QUIZ_TITLE } from "@/lib/config";
import { getFeedback } from "@/lib/quiz";
import type { QuizResult } from "@/lib/types";

interface ResultsScreenProps {
  result: QuizResult;
  onRestart: () => void;
}

const ANIMATION_DURATION = 1500;

function useAnimatedNumber(target: number, duration = ANIMATION_DURATION): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
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

export default function ResultsScreen({ result, onRestart }: ResultsScreenProps) {
  const animatedPercentage = useAnimatedNumber(result.percentage);
  const feedback = getFeedback(result.percentage);

  return (
    <div className="screen">
      <div className="results-box">
        <h2>🎉 Вікторина завершена!</h2>
        <div className="score-container">
          <div className="score-circle">
            <span className="score-percentage">{animatedPercentage}%</span>
          </div>
          <p>
            Ви відповіли правильно на {result.correctAnswers} з {result.totalQuestions} питань
          </p>
        </div>

        <div className="feedback-message">
          <strong>{feedback.title}</strong> {feedback.text}
        </div>

        <div className="resources">
          <h3>📞 Корисні контакти:</h3>
          <ul>
            <li>
              <strong>Національна гаряча лінія:</strong> <a href="tel:116123">116 123</a>{" "}
              (безкоштовно, цілодобово)
            </li>
            <li>
              <strong>Поліція:</strong> <a href="tel:102">102</a>
            </li>
            <li>
              <strong>Швидка допомога:</strong> <a href="tel:103">103</a>
            </li>
            <li>
              <strong>La Strada-Ukraine:</strong> <a href="tel:0800500335">0 800 500 335</a>{" "}
              (протидія торгівлі людьми)
            </li>
          </ul>
        </div>

        <div className="action-buttons">
          <button type="button" className="btn btn-primary" onClick={onRestart}>
            Пройти знову
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => shareResult(result.percentage)}
          >
            Поділитися
          </button>
        </div>
      </div>
    </div>
  );
}
