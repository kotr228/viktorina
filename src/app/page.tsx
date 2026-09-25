import Footer from "@/components/Footer";
import Quiz from "@/components/Quiz";
import { questions } from "@/data/questions";

export default function HomePage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden">
      {/* Декоративні неонові плями на фоні */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute -right-32 top-1/3 size-[28rem] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 size-80 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
        <Quiz questions={questions} />
      </main>
      <Footer />
    </div>
  );
}
