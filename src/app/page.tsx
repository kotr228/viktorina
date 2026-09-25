import Footer from "@/components/Footer";
import Quiz from "@/components/Quiz";
import { questions } from "@/data/questions";

export default function HomePage() {
  return (
    <>
      <div className="container">
        <header>
          <h1>🛡️ Вікторина: Протидія насильству</h1>
          <p className="subtitle">Перевірте свої знання про безпеку та протидію насильству</p>
        </header>
        <main>
          <Quiz questions={questions} />
        </main>
      </div>
      <Footer />
    </>
  );
}
