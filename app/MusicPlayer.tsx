'use client';

import { useState, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio Lo-Fi Aesthetic Online (Bebas Royalti)
  const AUDIO_URL =
    'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/6sB0V9jA80bHhYp2q5X0aE0fK.mp3';

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Autoplay dicegah browser:', err));
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      {/* Audio element langsung dari link online */}
      <audio
        ref={audioRef}
        src={AUDIO_URL}
        loop
        preload="none"
      />

      {/* Tombol Melayang (Floating Button) */}
      <button
        type="button"
        onClick={togglePlay}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300 active:scale-95 ${
          isPlaying
            ? 'bg-neutral-900 text-white border-neutral-800'
            : 'bg-white/90 text-neutral-700 hover:text-neutral-900 border-neutral-200/80 hover:bg-white'
        }`}
      >
        {/* Ikon Play / Gelombang Suara */}
        <span className="flex items-center justify-center w-4 h-4">
          {isPlaying ? (
            <span className="flex items-end gap-[2px] h-3.5">
              <span className="w-[3px] bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite]" style={{ height: '60%' }} />
              <span className="w-[3px] bg-emerald-400 rounded-full animate-[bounce_1.1s_infinite]" style={{ height: '100%' }} />
              <span className="w-[3px] bg-emerald-400 rounded-full animate-[bounce_0.7s_infinite]" style={{ height: '40%' }} />
            </span>
          ) : (
            <svg className="w-3.5 h-3.5 fill-current translate-x-[1px]" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>

        {/* Teks Status */}
        <span className="text-xs font-medium tracking-tight">
          {isPlaying ? 'Now Playing ♪' : 'Play Music'}
        </span>
      </button>
    </div>
  );
}