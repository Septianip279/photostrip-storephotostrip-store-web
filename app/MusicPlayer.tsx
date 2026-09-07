'use client';

import { useState } from 'react';

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  // 🎵 Ganti link di dalam src ini dengan lagu/playlist Spotify yang kamu mau!
  // Formatnya: https://open.spotify.com/embed/track/[ID_LAGU]?utm_source=generator&theme=0
  // (atau /embed/playlist/[ID_PLAYLIST] jika ingin satu playlist)
  const SPOTIFY_EMBED_URL =
    'https://open.spotify.com/track/4NmiNWf3mFp078EFfvvgnr?si=4c51e7d948fb4ddf';

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      {/* Pop-up Spotify Player */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-neutral-900/90 backdrop-blur-md p-2.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-neutral-700/60 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex justify-between items-center px-1 mb-1.5">
            <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Spotify Player
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>

          <iframe
            style={{ borderRadius: '12px' }}
            src={SPOTIFY_EMBED_URL}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}

      {/* Tombol Kapsul Floating Minimalist */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-neutral-200/90 bg-white/90 text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all duration-300 active:scale-95"
      >
        {/* Ikon Spotify */}
        <svg
          className="w-4 h-4 text-emerald-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>

        <span className="text-xs font-semibold tracking-tight">
          {isOpen ? 'Tutup Musik' : 'Play Musik'}
        </span>
      </button>
    </div>
  );
}