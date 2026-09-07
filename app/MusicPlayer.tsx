'use client';

import { useState, useRef, useEffect } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);

  // 🎵 GANTI ID VIDEO YOUTUBE INI DENGAN LAGU PILIHANMU!
  // Contoh: 'jfKfPfyJRdk' (Lofi Girl)
  // Kalau link YouTubenya: https://www.youtube.com/watch?v=5qap5aO4i9A
  // maka ID yang diambil cukup: 5qap5aO4i9A
  const YOUTUBE_VIDEO_ID = 'aMqOtlVwQYM&si=mQ7Xbixk-TSbckTK';

  useEffect(() => {
    // Memuat YouTube IFrame API secara resmi
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player('yt-hidden-player', {
        height: '0',
        width: '0',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          controls: 0,
        },
        events: {
          onReady: () => {
            setIsReady(true);
          },
          onStateChange: (event: any) => {
            // 1 = PLAYING, 2 = PAUSED
            if (event.data === 1) setIsPlaying(true);
            else if (event.data === 2) setIsPlaying(false);
          },
        },
      });
    }
  }, []);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      {/* YouTube Player Asli Disembunyikan (Audio Saja di Background) */}
      <div className="hidden">
        <div id="yt-hidden-player" />
      </div>

      {/* Tombol Kapsul Floating Estetik */}
      <button
        type="button"
        onClick={togglePlay}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all duration-300 active:scale-95 ${
          isPlaying
            ? 'bg-neutral-900 text-white border-neutral-800'
            : 'bg-white/90 text-neutral-800 hover:text-neutral-900 border-neutral-200/90 hover:bg-white'
        }`}
      >
        {/* Ikon Play atau Animasi Suara */}
        <span className="flex items-center justify-center w-4 h-4">
          {isPlaying ? (
            <span className="flex items-end gap-[2.5px] h-3.5">
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

        {/* Teks Status */}
        <span className="text-xs font-semibold tracking-tight">
          {isPlaying ? 'Now Playing ♪' : isReady ? 'Play Music' : 'Loading...'}
        </span>
      </button>
    </div>
  );
}