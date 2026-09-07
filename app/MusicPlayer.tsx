'use client';

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState('F2PsSZKweTc');
  const [musicTitle, setMusicTitle] = useState('What If I Call');

  const extractVideoId = (url: string) => {
    if (!url) return 'F2PsSZKweTc';
    const cleanUrl = url.trim();
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|music\.youtube\.com\/watch\?v=)([^"&?\/\s]{11})/;
    const match = cleanUrl.match(regExp);
    return match ? match[1] : cleanUrl.slice(0, 11);
  };

  useEffect(() => {
    async function loadMusicSetting() {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (!error && data) {
        const urlSetting = data.find((s) => s.key === 'music_url');
        const titleSetting = data.find((s) => s.key === 'music_title');

        if (urlSetting && urlSetting.value) {
          setVideoId(extractVideoId(urlSetting.value));
        }
        if (titleSetting && titleSetting.value) {
          setMusicTitle(titleSetting.value);
        }
      }
    }

    loadMusicSetting();
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      {/* Container Kotak Player: Tetap hidup di DOM agar musik tidak mati saat ditutup */}
      <div
        className={`mb-3 w-72 sm:w-80 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.15)] border border-neutral-200/90 transition-all duration-300 origin-bottom-left ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none absolute bottom-12'
        }`}
      >
        <div className="flex justify-between items-center px-1 mb-2">
          <div className="flex items-center gap-1.5 overflow-hidden pr-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 animate-ping" />
            <span className="text-xs font-semibold text-neutral-800 truncate">
              {musicTitle} ♪
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-neutral-400 hover:text-neutral-700 text-xs px-1.5 py-0.5 rounded-full hover:bg-neutral-100 transition shrink-0"
            title="Tutup Tampilan"
          >
            ✕
          </button>
        </div>

        <div className="rounded-xl overflow-hidden shadow-inner bg-neutral-950 aspect-video w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1`}
            title={musicTitle}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

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
          {isOpen ? 'Sembunyikan' : 'Musik ♪'}
        </span>
      </button>
    </div>
  );
}