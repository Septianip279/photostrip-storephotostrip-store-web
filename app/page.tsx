'use client';

import Link from 'next/link';
import MusicPlayer from './MusicPlayer';

export default function WelcomePage() {
  return (
    <main className="min-h-screen w-full bg-neutral-50/50 flex flex-col justify-between px-6 py-8 md:px-12 md:py-10 select-none antialiased">
      {/* 1. Header Minimalis Rapi */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" />
          <span className="font-bold text-neutral-900 tracking-tight text-base sm:text-lg">
            Photostrip<span className="font-normal text-neutral-400">Studio</span>
          </span>
        </div>

        <Link
          href="/catalog"
          className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 transition flex items-center gap-1 group"
        >
          <span>Lihat Katalog</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </header>

      {/* 2. Hero Section Center (Proporsional & Tidak Terlalu Raksasa) */}
      <section className="w-full max-w-2xl mx-auto text-center flex flex-col items-center my-auto py-8">
        {/* Badge Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/80 text-[11px] font-medium text-neutral-600 mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>✨ Welcome to Photostrip Studio</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-tight mb-4">
          Abadikan Momen Indah, <br />
          <span className="font-serif italic font-normal text-neutral-600">
            Abadi dalam Genggaman.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-neutral-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-8">
          Pilih template photostrip estetik favoritmu, abadikan kenangan bersama
          orang tersayang, dan cetak dengan kualitas premium anti-pudar.
        </p>

        {/* Button CTA */}
        <Link
          href="/catalog"
          className="group inline-flex items-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium px-7 py-3 rounded-full text-xs sm:text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          <span>Mulai Pilih Desain</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </section>

      {/* 3. Footer Minimalis */}
      <footer className="w-full max-w-5xl mx-auto text-center text-[11px] text-neutral-400">
        © {new Date().getFullYear()} Photostrip Studio. All rights reserved.
      </footer>

      {/* Player Musik Latar */}
      <MusicPlayer />
    </main>
  );
}