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
    <div className="relative w-full h-80 flex items-center justify-center select-none">
      {/* Gambar Polaroid dengan tinggi dibatasi */}
      <img
        src={images[index]}
        alt={`${name} ${index + 1}`}
        className="max-h-full max-w-full object-contain rounded-md shadow-sm"
      />

      {/* Tombol Navigasi Kiri & Kanan */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={geserKiri}
            aria-label="Foto Sebelumnya"
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-neutral-900/70 hover:bg-neutral-900 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md transition"
          >
            &#10094;
          </button>

          <button
            type="button"
            onClick={geserKanan}
            aria-label="Foto Berikutnya"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-neutral-900/70 hover:bg-neutral-900 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md transition"
          >
            &#10095;
          </button>

          {/* Indikator Titik di Bawah */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-neutral-900/50 px-2 py-0.5 rounded-full backdrop-blur-xs">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  index === i ? 'w-3 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}