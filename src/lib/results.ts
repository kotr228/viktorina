import { GOOGLE_SCRIPT_URL } from "./config";
import type { QuizResult, StoredQuizResult } from "./types";

const STORAGE_KEY = "quiz_results";

export function getAllResults(): StoredQuizResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as StoredQuizResult[]) : [];
  } catch {
    return [];
  }
}

export function saveResultLocally(result: QuizResult): boolean {
  try {
    const results = getAllResults();
    results.push({ ...result, id: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    return true;
  } catch (error) {
    console.error("❌ Помилка локального збереження:", error);
    return false;
  }
}

async function sendToGoogleSheets(result: QuizResult): Promise<void> {
  if (!GOOGLE_SCRIPT_URL) {
    console.log("ℹ️ Google Sheets не налаштовано. Результати збережено тільки локально.");
    return;
  }

  try {
    // Apps Script не віддає CORS-заголовки, тому запит іде в режимі no-cors.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });
    console.log("✅ Результати відправлено в Google Sheets");
  } catch (error) {
    console.error("❌ Помилка відправки в Google Sheets:", error);
  }
}

/** Зберігає результат локально (завжди) і відправляє в Google Sheets (якщо налаштовано). */
export async function submitResult(result: QuizResult): Promise<void> {
  if (saveResultLocally(result)) {
    console.log("✅ Результати збережено локально");
  }
  await sendToGoogleSheets(result);
}
