'use client';

import { useState } from 'react';

interface Props {
  images: string[];
  name: string;
}

export default function PolaroidSlider({ images, name }: Props) {
  // Menyimpan posisi foto yang sedang dilihat (0 = foto pertama)
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  // Fungsi geser ke foto sebelumnya
  const geserKiri = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Fungsi geser ke foto berikutnya
  const geserKanan = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full aspect-[1/2.2] bg-neutral-100 rounded-xl overflow-hidden flex items-center justify-center select-none">
      {/* Gambar Polaroid yang sedang tampil */}
      <img
        src={images[index]}
        alt={`${name} ${index + 1}`}
        className="w-full h-full object-contain p-2"
      />

      {/* Tombol panah hanya muncul jika fotonya lebih dari 1 */}
      {images.length > 1 && (
        <>
          {/* Tombol Kiri */}
          <button
            type="button"
            onClick={geserKiri}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white w-7 h-7 rounded-full flex items-center justify-center text-sm shadow"
          >
            &#10094;
          </button>

          {/* Tombol Kanan */}
          <button
            type="button"
            onClick={geserKanan}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white w-7 h-7 rounded-full flex items-center justify-center text-sm shadow"
          >
            &#10095;
          </button>

          {/* Titik-titik indikator di bagian bawah foto */}
          <div className="absolute bottom-2 flex gap-1 bg-black/40 px-2 py-1 rounded-full">
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