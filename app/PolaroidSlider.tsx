'use client';

import { useState } from 'react';

interface Props {
  images: string[];
  name: string;
}

export default function PolaroidSlider({ images, name }: Props) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const geserKiri = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const geserKanan = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full flex items-center justify-center py-6 select-none">
      {/* Gambar Polaroid dengan drop shadow lembut */}
      <div className="relative z-10 flex items-center justify-center">
        <img
          src={images[index]}
          alt={`${name} ${index + 1}`}
          className="h-96 w-auto max-w-full object-contain rounded-lg drop-shadow-xl transition-transform duration-200 hover:scale-[1.01]"
        />

        {/* Tombol Panah (Menempel manis di sisi polaroid) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={geserKiri}
              aria-label="Foto Sebelumnya"
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 border border-neutral-200/80 w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-md backdrop-blur-sm transition active:scale-95"
            >
              &#10094;
            </button>

            <button
              type="button"
              onClick={geserKanan}
              aria-label="Foto Berikutnya"
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 border border-neutral-200/80 w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-md backdrop-blur-sm transition active:scale-95"
            >
              &#10095;
            </button>

            {/* Indikator Titik */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/80 border border-neutral-200/60 px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === i ? 'w-4 bg-neutral-800' : 'w-1.5 bg-neutral-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}