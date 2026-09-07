'use client';

import { useState, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio Lo-Fi Akustik Santai (Open Source & CORS-Friendly)
  const AUDIO_URL = 'https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race.ogg';
  // Alternatif musik instrumen lo-fi piano yang tenang:
  const LOFI_URL = 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=lofi-study-112191.mp3';

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Gagal memutar audio:', err);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      {/* Audio element dengan direct streaming yang stabil */}
      <audio
        ref={audioRef}
        src="https://raw.githubusercontent.com/rafaelreis-hotmart/Audio-Sample-files/master/sample.mp3"
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Tombol Floating Minimalist */}
      <button
        type="button"
        onClick={togglePlay}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300 active:scale-95 ${
          isPlaying
            ? 'bg-neutral-900 text-white border-neutral-800'
            : 'bg-white/90 text-neutral-700 hover:text-neutral-900 border-neutral-200/90 hover:bg-white'
        }`}
      >
        {/* Ikon Play atau Animasi Equalizer */}
        <span className="flex items-center justify-center w-4 h-4">
          {isPlaying ? (
            <span className="flex items-end gap-[2px] h-3.5">
              <span className="w-[3px] bg-emerald-400 rounded-full animate-bounce" style={{ height: '60%' }} />
              <span className="w-[3px] bg-emerald-400 rounded-full animate-bounce delay-100" style={{ height: '100%' }} />
              <span className="w-[3px] bg-emerald-400 rounded-full animate-bounce delay-200" style={{ height: '40%' }} />
            </span>
          ) : (
            <svg className="w-3.5 h-3.5 fill-current translate-x-[1px]" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>

        <span className="text-xs font-medium tracking-tight">
          {isPlaying ? 'Now Playing ♪' : 'Play Music'}
        </span>
      </button>
    </div>
  );
}