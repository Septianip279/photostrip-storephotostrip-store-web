'use client';

import Link from 'next/link';
import MusicPlayer from './MusicPlayer';

export default function WelcomePage() {
  return (
    <main className="min-h-screen w-full bg-[#faf9f6] flex flex-col justify-between px-6 py-6 md:px-12 md:py-8 select-none antialiased overflow-x-hidden">
      {/* 1. Header Minimalis */}
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

      {/* 2. Hero Section Center dengan Visual Floating Polaroid Cards */}
      <section className="w-full max-w-4xl mx-auto text-center flex flex-col items-center my-auto py-4">
        {/* Badge Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/80 text-[11px] font-medium text-neutral-600 mb-5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>✨ Welcome to Photostrip Studio</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-tight mb-3">
          Abadikan Momen Indah, <br />
          <span className="font-serif italic font-normal text-neutral-600">
            Abadi dalam Genggaman.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-neutral-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6">
          Pilih template photostrip estetik favoritmu, abadikan kenangan bersama
          orang tersayang, dan cetak dengan kualitas premium anti-pudar.
        </p>

        {/* Button CTA */}
        <Link
          href="/catalog"
          className="group inline-flex items-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium px-7 py-3 rounded-full text-xs sm:text-sm transition-all shadow-sm hover:shadow-md active:scale-95 mb-8"
        >
          <span>Mulai Pilih Desain</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>

        {/* VISUAL PREVIEW FLOATING POLAROID CARDS (Tiga Kartu Estetik) */}
        <div className="relative h-44 sm:h-52 w-full max-w-md flex items-center justify-center pointer-events-none mt-2">
          
          {/* Kartu Kiri (Miring ke Kiri) */}
          <div className="pointer-events-auto absolute -translate-x-16 sm:-translate-x-20 -rotate-8 hover:-rotate-3 hover:-translate-y-2 hover:z-20 transition-all duration-300 w-24 sm:w-28 bg-white p-2 pb-4 rounded-md shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-neutral-200/70">
            <div className="flex flex-col gap-1.5">
              <div className="w-full aspect-[4/3] bg-amber-100/70 rounded-xs flex items-center justify-center">
                <span className="text-[10px]">☕</span>
              </div>
              <div className="w-full aspect-[4/3] bg-rose-100/70 rounded-xs flex items-center justify-center">
                <span className="text-[10px]">🌷</span>
              </div>
              <div className="w-full aspect-[4/3] bg-sky-100/70 rounded-xs flex items-center justify-center">
                <span className="text-[10px]">🌊</span>
              </div>
              <span className="text-[8px] text-neutral-400 font-serif italic text-center mt-0.5">vintage vibes</span>
            </div>
          </div>

          {/* Kartu Tengah (Lurus, Utama, Sedikit Menonjol) */}
          <div className="pointer-events-auto relative z-10 hover:-translate-y-2 hover:scale-105 transition-all duration-300 w-26 sm:w-30 bg-white p-2.5 pb-4 rounded-md shadow-[0_14px_30px_rgba(0,0,0,0.12)] border border-neutral-200/80">
            <div className="flex flex-col gap-1.5">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-pink-100 to-rose-200 rounded-xs flex items-center justify-center">
                <span className="text-[11px]">✨</span>
              </div>
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-100 rounded-xs flex items-center justify-center">
                <span className="text-[11px]">📸</span>
              </div>
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xs flex items-center justify-center">
                <span className="text-[11px]">🤍</span>
              </div>
              <span className="text-[8px] text-neutral-700 font-serif italic text-center mt-0.5">our memories</span>
            </div>
          </div>

          {/* Kartu Kanan (Miring ke Kanan) */}
          <div className="pointer-events-auto absolute translate-x-16 sm:translate-x-20 rotate-8 hover:rotate-3 hover:-translate-y-2 hover:z-20 transition-all duration-300 w-24 sm:w-28 bg-white p-2 pb-4 rounded-md shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-neutral-200/70">
            <div className="flex flex-col gap-1.5">
              <div className="w-full aspect-[4/3] bg-emerald-100/70 rounded-xs flex items-center justify-center">
                <span className="text-[10px]">🌿</span>
              </div>
              <div className="w-full aspect-[4/3] bg-purple-100/70 rounded-xs flex items-center justify-center">
                <span className="text-[10px]">🪐</span>
              </div>
              <div className="w-full aspect-[4/3] bg-yellow-100/70 rounded-xs flex items-center justify-center">
                <span className="text-[10px]">🌻</span>
              </div>
              <span className="text-[8px] text-neutral-400 font-serif italic text-center mt-0.5">best day</span>
            </div>
          </div>

        </div>
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