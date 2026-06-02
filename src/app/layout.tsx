import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Developer Tools Suite - Modern Free Online Utilities",
  description: "A curated suite of modern, high-performance web utility tools for developers. Free online formatters, decoders, generators, and validators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-gray-100 font-sans">
        <header className="border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-xl bg-gradient-to-r from-white via-indigo-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              DevTools
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                All Tools
              </Link>
              <a href="https://github.com/Sujon-Ahmed/developer-tools" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                GitHub
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>

        <footer className="border-t border-white/5 bg-black/20 py-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Developer Tools Suite. Running client-side securely.</p>
        </footer>
      </body>
    </html>
  );
}
