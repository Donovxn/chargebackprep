import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteNav from "@/components/SiteNav";
import ScoreScroll from "@/components/ScoreScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chargeback Prep",
  description:
    "Dispute readiness + fast evidence packs for creators selling digital offers. No win-rate promises. Not legal advice.",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[var(--cbp-bg)] text-[var(--cbp-text)] antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--cbp-text)] focus:shadow"
        >
          Skip to content
        </a>
        <ScoreScroll />

        <SiteNav />

        <main id="main" className="min-h-screen">
          {children}
        </main>

        <footer className="border-t border-black/10 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-zinc-600 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-medium text-zinc-800">Chargeback Prep</p>
              <p>Built by Donovan. Simple, fast, and evidence-first.</p>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500">
              Not legal advice. No chargeback “win” guarantees. We help you organize
              your proof trail and package evidence quickly using only real
              information you already have.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
