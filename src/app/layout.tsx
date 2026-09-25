import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { QUIZ_TITLE } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: QUIZ_TITLE,
  description: "Перевірте свої знання про безпеку та протидію насильству",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
