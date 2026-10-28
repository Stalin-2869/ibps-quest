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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
