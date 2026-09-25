import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 px-4 py-8 text-center text-sm text-slate-500">
      <p>Створено для підвищення обізнаності про протидію насильству</p>
      <div className="mt-4 flex items-center justify-center gap-6">
        <a
          href="https://t.me/M4A2E3_76_w"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/40 px-4 py-2 text-slate-300 transition-all duration-300 hover:scale-[1.02] hover:border-sky-400/50 hover:text-sky-300 hover:shadow-lg"
        >
          <Send className="size-4" />
          Автор у Telegram
        </a>
      </div>
    </footer>
  );
}
