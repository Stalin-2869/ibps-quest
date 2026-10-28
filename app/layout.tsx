import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/lib/GameContext";

export const metadata: Metadata = {
  title: "IBPS Quest 🏦 — Gamified Exam Prep",
  description: "Gamified study app for IBPS PO & Clerk exam preparation. Level up while you learn!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
