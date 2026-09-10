'use client';

import Link from 'next/link';
import MusicPlayer from './MusicPlayer';
import SplashCursor from '@/components/SplashCursor'; 
import Aurora from '@/components/Aurora'; 
import BorderGlow from '@/components/BorderGlow'; // <-- Import komponen BorderGlow

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col justify-between px-6 pt-6 pb-4 md:px-12 md:pt-8 select-none antialiased overflow-hidden">
      
      {/* LAPIS 1: Animasi Aurora */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Aurora
          colorStops={["#6d28d9", "#ec4899", "#EAB308"]} 
          blend={0.66}
          amplitude={1.0}
          speed={1.3}
          lightMode
        />
      </div>

      {/* LAPIS 2: Efek Splash Cursor */}
      <div className="absolute inset-0 z-10 opacity-70 mix-blend-multiply">
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1440}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
        />
      </div>

      {/* 1. Header */}
      <header className="relative w-full max-w-5xl mx-auto flex items-center justify-between z-30">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" />
          <span className="font-bold text-neutral-900 tracking-tight text-base sm:text-lg pointer-events-auto">
            Photostrip<span className="font-normal text-neutral-400">Studio</span>
          </span>
        </div>

        <Link
          href="/catalog"
          className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 transition flex items-center gap-1 group pointer-events-auto"
        >
          <span>Lihat Katalog</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </header>

      {/* 2. Area Konten Utama */}
      <section className="relative w-full max-w-4xl mx-auto text-center flex flex-col items-center z-20 my-auto pt-4 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/60 backdrop-blur-md border border-neutral-200/50 text-[11px] font-medium text-neutral-600 mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>✨ Welcome to Photostrip Studio</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-[54px] font-bold text-neutral-900 tracking-tight leading-[1.15] mb-3 drop-shadow-sm">
          Abadikan Momen Indah, <br />
          <span className="font-serif italic font-normal text-neutral-600 whitespace-nowrap">
            Abadi dalam Genggaman.
          </span>
        </h1>

        <p className="text-neutral-600 text-xs sm:text-[13px] max-w-md mx-auto leading-relaxed mb-5 drop-shadow-sm">
          Pilih template photostrip estetik favoritmu, abadikan kenangan bersama
          orang tersayang, dan cetak dengan kualitas premium anti-pudar.
        </p>

        {/* Tombol CTA dengan BorderGlow */}
        <div className="my-2 pointer-events-auto inline-block">
          <BorderGlow
            edgeSensitivity={40}
            glowColor="40 80 80"
            backgroundColor="#0a0a0a"
            borderRadius={9999} // Membuat bentuknya lonjong kapsul sempurna
            glowRadius={30}
            glowIntensity={1.2}
            coneSpread={25}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
            fillOpacity={0.4}
          >
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-2.5 text-white font-medium px-8 py-3 rounded-full text-xs sm:text-sm transition-all active:scale-95"
            >
              <span>Mulai Pilih Desain</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </BorderGlow>
        </div>

        {/* 3. Kartu Photostrip Fan Deck */}
        <div className="relative w-72 sm:w-80 h-36 sm:h-40 flex justify-center items-start pointer-events-none mt-7 sm:mt-8">
          <div className="pointer-events-auto absolute -translate-x-16 sm:-translate-x-20 -rotate-8 hover:-rotate-3 hover:-translate-y-2 transition-all duration-300 w-24 sm:w-28 bg-white/80 backdrop-blur-md p-2 pb-6 rounded-t-lg shadow-[0_12px_28px_rgba(0,0,0,0.08)] border border-white/50">
            <div className="flex flex-col gap-1.5">
              <div className="w-full aspect-[4/3] bg-amber-50 rounded-xs flex items-center justify-center text-[10px]">☕</div>
              <div className="w-full aspect-[4/3] bg-amber-100/70 rounded-xs flex items-center justify-center text-[10px]">🌷</div>
              <div className="w-full aspect-[4/3] bg-amber-50 rounded-xs flex items-center justify-center text-[10px]">🌊</div>
            </div>
          </div>

          <div className="pointer-events-auto absolute translate-x-16 sm:translate-x-20 rotate-8 hover:rotate-3 hover:-translate-y-2 transition-all duration-300 w-24 sm:w-28 bg-white/80 backdrop-blur-md p-2 pb-6 rounded-t-lg shadow-[0_12px_28px_rgba(0,0,0,0.08)] border border-white/50">
            <div className="flex flex-col gap-1.5">
              <div className="w-full aspect-[4/3] bg-emerald-50 rounded-xs flex items-center justify-center text-[10px]">🌿</div>
              <div className="w-full aspect-[4/3] bg-emerald-100/70 rounded-xs flex items-center justify-center text-[10px]">🪐</div>
              <div className="w-full aspect-[4/3] bg-emerald-50 rounded-xs flex items-center justify-center text-[10px]">🌻</div>
            </div>
          </div>

          <div className="pointer-events-auto relative z-10 hover:-translate-y-2 transition-all duration-300 w-28 sm:w-32 bg-white/80 backdrop-blur-md p-2.5 pb-8 rounded-t-lg shadow-[0_16px_34px_rgba(0,0,0,0.12)] border border-white/50">
            <div className="flex flex-col gap-1.5">
              <div className="w-full aspect-[4/3] bg-rose-50 rounded-xs flex items-center justify-center text-[11px]">✨</div>
              <div className="w-full aspect-[4/3] bg-rose-100/80 rounded-xs flex items-center justify-center text-[11px]">📸</div>
              <div className="w-full aspect-[4/3] bg-rose-50 rounded-xs flex items-center justify-center text-[11px]">🤍</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="relative w-full max-w-5xl mx-auto text-center text-[11px] text-neutral-400 z-30 pb-1 pointer-events-none">
        © {new Date().getFullYear()} Photostrip Studio. All rights reserved.
      </footer>

      {/* Player Musik Latar */}
      <div className="pointer-events-auto relative z-40">
        <MusicPlayer />
      </div>
    </main>
  );
}