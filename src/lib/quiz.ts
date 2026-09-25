import type { Question, QuizResult, UserAnswer } from "./types";

export function countCorrect(questions: Question[], answers: UserAnswer[]): number {
  return questions.reduce(
    (count, q, i) => (answers[i] === q.correctAnswer ? count + 1 : count),
    0,
  );
}

export function toPercentage(correct: number, total: number): number {
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}

export interface Feedback {
  title: string;
  text: string;
}

export function getFeedback(percentage: number): Feedback {
  if (percentage >= 80) {
    return {
      title: "🎊 Відмінно!",
      text: "Ви маєте чудові знання про протидію насильству. Продовжуйте поширювати цю важливу інформацію!",
    };
  }
  if (percentage >= 60) {
    return {
      title: "👍 Добре!",
      text: "У вас є базові знання, але є простір для покращення. Ознайомтеся з додатковими ресурсами нижче.",
    };
  }
  if (percentage >= 40) {
    return {
      title: "📚 Можна краще!",
      text: "Рекомендуємо більше дізнатися про протидію насильству та доступні ресурси підтримки.",
    };
  }
  return {
    title: "💡 Потрібно покращити знання!",
    text: "Будь ласка, ознайомтеся з інформацією про протидію насильству та зверніться до спеціалістів за потреби.",
  };
}

export function buildResult(params: {
  questions: Question[];
  answers: UserAnswer[];
  name: string;
  email: string;
  timeSpent: number;
}): QuizResult {
  const { questions, answers, name, email, timeSpent } = params;
  const correctAnswers = countCorrect(questions, answers);

  return {
    timestamp: new Date().toISOString(),
    name,
    email,
    correctAnswers,
    totalQuestions: questions.length,
    percentage: toPercentage(correctAnswers, questions.length),
    timeSpent,
    answers: questions.map((q, i) => {
      const answer = answers[i];
      return {
        question: q.question,
        userAnswer: answer !== null ? q.answers[answer] : "Не відповів",
        correctAnswer: q.answers[q.correctAnswer],
        isCorrect: answer === q.correctAnswer,
      };
    }),
  };
}
