"use client";

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

export default function QuestionScreen({
  question,
  index,
  total,
  selected,
  onSelect,
  onPrev,
  onNext,
}: QuestionScreenProps) {
  const progress = ((index + 1) / total) * 100;
  const isLast = index === total - 1;

  return (
    <div className="screen">
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={index + 1}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="question-counter">
        {index + 1} / {total}
      </div>

      {/* key змушує React перемонтувати блок і програти анімацію для кожного питання */}
      <div key={index} className="question-container">
        <h2 className="question-text">{question.question}</h2>
        <div className="answers-container">
          {question.answers.map((answer, i) => (
            <button
              key={i}
              type="button"
              className={`answer-btn${selected === i ? " selected" : ""}`}
              aria-pressed={selected === i}
              onClick={() => onSelect(i)}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-navigation">
        <button
          type="button"
          className="btn btn-secondary"
          disabled={index === 0}
          onClick={onPrev}
        >
          ← Назад
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={selected === null}
          onClick={onNext}
        >
          {isLast ? "Завершити" : "Далі →"}
        </button>
      </div>
    </div>
  );
}
