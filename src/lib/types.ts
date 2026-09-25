export interface Question {
  question: string;
  answers: string[];
  /** Індекс правильної відповіді в масиві `answers`. */
  correctAnswer: number;
}

/** Обрана відповідь (індекс) або `null`, якщо питання ще без відповіді. */
export type UserAnswer = number | null;

export interface AnswerDetail {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface QuizResult {
  timestamp: string;
  name: string;
  email: string;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  /** Час проходження в секундах. */
  timeSpent: number;
  answers: AnswerDetail[];
}

export interface StoredQuizResult extends QuizResult {
  id: number;
}
