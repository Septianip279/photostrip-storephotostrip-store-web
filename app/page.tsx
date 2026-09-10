'use client';

import Link from 'next/link';
import MusicPlayer from './MusicPlayer';

export default function WelcomePage() {
  return (
    <main className="relative h-screen w-full bg-white flex flex-col justify-between px-6 pt-6 pb-4 md:px-12 md:pt-8 select-none antialiased overflow-hidden">
      {/* 1. Header Minimalis */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between z-30">
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

      {/* 2. Konten Teks & Tombol (Bebas Halangan) */}
      <section className="w-full max-w-2xl mx-auto text-center flex flex-col items-center z-20 pt-4 sm:pt-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200/90 text-[11px] font-medium text-neutral-600 mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>✨ Welcome to Photostrip Studio</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-[1.18] mb-3">
          Abadikan Momen Indah, <br />
          <span className="font-serif italic font-normal text-neutral-600">
            Abadi dalam Genggaman.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-neutral-500 text-xs sm:text-[13px] max-w-md mx-auto leading-relaxed mb-6">
          Pilih template photostrip estetik favoritmu, abadikan kenangan bersama
          orang tersayang, dan cetak dengan kualitas premium anti-pudar.
        </p>

        {/* Button CTA */}
        <Link
          href="/catalog"
          className="group inline-flex items-center gap-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-medium px-8 py-3 rounded-full text-xs sm:text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <span>Mulai Pilih Desain</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </section>

      {/* 3. Kartu Polaroid Melayang di Bawah Layar (Fixed di Bawah, Tidak Menabrak Tombol) */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center items-end pointer-events-none z-10">
        <div className="relative w-80 sm:w-96 h-40 flex justify-center items-end">
          {/* Kartu Kiri (Pastel Kuning) */}
          <div className="pointer-events-auto absolute bottom-[-45px] -translate-x-16 sm:-translate-x-20 -rotate-12 hover:-rotate-6 hover:bottom-[-20px] transition-all duration-300 w-24 sm:w-28 bg-white p-2 pb-6 rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.1)] border border-neutral-200/90">
            <div className="flex flex-col gap-1.5">
              <div className="w-full aspect-[4/3] bg-amber-50 rounded-xs flex items-center justify-center text-[10px]">☕</div>
              <div className="w-full aspect-[4/3] bg-amber-100/60 rounded-xs flex items-center justify-center text-[10px]">🌷</div>
              <div className="w-full aspect-[4/3] bg-amber-50 rounded-xs flex items-center justify-center text-[10px]">🌊</div>
            </div>
          </div>

          {/* Kartu Kanan (Pastel Hijau/Mint) */}
          <div className="pointer-events-auto absolute bottom-[-45px] translate-x-16 sm:translate-x-20 rotate-12 hover:rotate-6 hover:bottom-[-20px] transition-all duration-300 w-24 sm:w-28 bg-white p-2 pb-6 rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.1)] border border-neutral-200/90">
            <div className="flex flex-col gap-1.5">
              <div className="w-full aspect-[4/3] bg-emerald-50 rounded-xs flex items-center justify-center text-[10px]">🌿</div>
              <div className="w-full aspect-[4/3] bg-emerald-100/60 rounded-xs flex items-center justify-center text-[10px]">🪐</div>
              <div className="w-full aspect-[4/3] bg-emerald-50 rounded-xs flex items-center justify-center text-[10px]">🌻</div>
            </div>
          </div>

          {/* Kartu Tengah (Pastel Pink - Di Atas) */}
          <div className="pointer-events-auto relative z-20 bottom-[-30px] hover:bottom-[-10px] transition-all duration-300 w-28 sm:w-32 bg-white p-2.5 pb-8 rounded-lg shadow-[0_16px_36px_rgba(0,0,0,0.14)] border border-neutral-200/90">
            <div className="flex flex-col gap-1.5">
              <div className="w-full aspect-[4/3] bg-rose-50 rounded-xs flex items-center justify-center text-[11px]">✨</div>
              <div className="w-full aspect-[4/3] bg-rose-100/70 rounded-xs flex items-center justify-center text-[11px]">📸</div>
              <div className="w-full aspect-[4/3] bg-rose-50 rounded-xs flex items-center justify-center text-[11px]">🤍</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Footer Minimalis */}
      <footer className="w-full max-w-5xl mx-auto text-center text-[11px] text-neutral-400 z-30">
        © {new Date().getFullYear()} Photostrip Studio. All rights reserved.
      </footer>

      {/* Player Musik Latar */}
      <MusicPlayer />
    </main>
  );
}