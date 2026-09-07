'use client';

import { useState } from 'react';

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  // ID Lagu "What If I Call"
  const YOUTUBE_VIDEO_ID = 'F2PsSZKweTc';

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      {/* Mini Player Popup Estetik */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.15)] border border-neutral-200/90 transition-all duration-300">
          <div className="flex justify-between items-center px-1 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-semibold text-neutral-800">
                What If I Call ♪
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-neutral-700 text-xs px-1.5 py-0.5 rounded-full hover:bg-neutral-100 transition"
              title="Tutup Player"
            >
              ✕
            </button>
          </div>

          {/* Embed Video YouTube yang kompatibel & tidak akan terkena block CORS */}
          <div className="rounded-xl overflow-hidden shadow-inner bg-neutral-950 aspect-video w-full">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&enablejsapi=1`}
              title="What If I Call"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Tombol Kapsul Floating Minimalist */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 active:scale-95 ${
          isOpen
            ? 'bg-neutral-900 text-white border-neutral-800'
            : 'bg-white/90 text-neutral-800 hover:text-neutral-900 border-neutral-200/90 hover:bg-white'
        }`}
      >
        <span className="flex items-center justify-center w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform">
          {isOpen ? (
            <span className="flex items-end gap-[2px] h-3">
              <span className="w-[2.5px] bg-rose-500 rounded-full h-full" />
              <span className="w-[2.5px] bg-rose-500 rounded-full h-2/3" />
              <span className="w-[2.5px] bg-rose-500 rounded-full h-full" />
            </span>
          ) : (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          )}
        </span>

        <span className="text-xs font-semibold tracking-tight">
          {isOpen ? 'Sembunyikan' : 'Putar Musik ♪'}
        </span>
      </button>
    </div>
  );
}