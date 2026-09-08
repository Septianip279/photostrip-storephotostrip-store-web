'use client';

import Link from 'next/link';
import MusicPlayer from './MusicPlayer';

export default function WelcomePage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-neutral-50 flex flex-col justify-between p-6 md:p-10 select-none">
      {/* Top Bar Minimalis */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" />
          <span className="font-bold text-neutral-800 tracking-tight text-base sm:text-lg">
            Photostrip<span className="font-normal text-neutral-400">Studio</span>
          </span>
        </div>

        <Link
          href="/catalog"
          className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 transition"
        >
          Lihat Katalog →
        </Link>
      </header>

      {/* Hero Content di Tengah Layar */}
      <section className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/80 text-xs font-medium text-neutral-600 mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>✨ Welcome to Photostrip Studio</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.12] mb-6">
          Abadikan Momen Indah, <br />
          <span className="font-serif italic font-normal text-neutral-700">Abadi dalam Genggaman.</span>
        </h1>

        <p className="text-neutral-500 text-sm sm:text-base max-w-md mx-auto mb-10 font-normal leading-relaxed">
          Pilih template photostrip estetik favoritmu, abadikan kenangan bersama orang tersayang, dan cetak dengan kualitas premium anti-pudar.
        </p>

        {/* Tombol Menuju Halaman Katalog */}
        <Link
          href="/catalog"
          className="group inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-medium px-8 py-3.5 rounded-full text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <span>Mulai Pilih Desain</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </section>

      {/* Footer Minimalis */}
      <footer className="text-center text-[11px] text-neutral-400">
        © {new Date().getFullYear()} Photostrip Studio. All rights reserved.
      </footer>

      {/* Music Player tetap ada di halaman welcome */}
      <MusicPlayer />
    </main>
  );
}