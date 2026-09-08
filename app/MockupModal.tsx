'use client';

import { useState } from 'react';

interface MockupModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  frameUrl?: string;
}

export default function MockupModal({ isOpen, onClose, templateName, frameUrl }: MockupModalProps) {
  const [userPhotos, setUserPhotos] = useState<string[]>([]);
  const [customText, setCustomText] = useState('');

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 3);
    const urls = files.map((file) => URL.createObjectURL(file));
    setUserPhotos(urls);
  };

  const handleReset = () => {
    setUserPhotos([]);
    setCustomText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-100 flex flex-col md:flex-row gap-8 max-h-[92vh] overflow-y-auto">
        
        {/* Kolom Kiri: Live Mockup Presisi */}
        <div className="flex-1 flex flex-col items-center justify-center bg-neutral-100/70 p-4 sm:p-6 rounded-2xl border border-neutral-200/60 min-h-[420px]">
          
          {/* Wadah Photostrip dengan Rasio Strip 1:3 */}
          <div className="relative w-44 sm:w-48 aspect-[1/3] shadow-2xl rounded-xs overflow-hidden bg-white select-none">
            
            {/* 1. LAYER FOTO PEMBELI (Di Belakang Frame jika frame PNG transparan, atau tepat di area slot) */}
            <div className="absolute inset-0 z-0 flex flex-col px-[8%] pt-[15%] pb-[18%] justify-between pointer-events-none">
              
              {/* Slot Foto 1 */}
              <div className="w-full h-[26.5%] rounded-xs overflow-hidden bg-neutral-200/50 flex items-center justify-center border border-neutral-300/40">
                {userPhotos[0] ? (
                  <img src={userPhotos[0]} alt="slot 1" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-neutral-400 font-medium">Foto 1</span>
                )}
              </div>

              {/* Slot Foto 2 */}
              <div className="w-full h-[26.5%] rounded-xs overflow-hidden bg-neutral-200/50 flex items-center justify-center border border-neutral-300/40">
                {userPhotos[1] ? (
                  <img src={userPhotos[1]} alt="slot 2" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-neutral-400 font-medium">Foto 2</span>
                )}
              </div>

              {/* Slot Foto 3 */}
              <div className="w-full h-[26.5%] rounded-xs overflow-hidden bg-neutral-200/50 flex items-center justify-center border border-neutral-300/40">
                {userPhotos[2] ? (
                  <img src={userPhotos[2]} alt="slot 3" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-neutral-400 font-medium">Foto 3</span>
                )}
              </div>
            </div>

            {/* 2. LAYER FRAME DESAIN TEMPLATE (Sebagai Bingkai Asli) */}
            {frameUrl && (
              <img
                src={frameUrl}
                alt="Frame Template"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 mix-blend-multiply"
              />
            )}

            {/* 3. LAYER CUSTOM TEKS DI BAGIAN BAWAH STRIP */}
            {customText && (
              <div className="absolute bottom-[4.5%] inset-x-2 z-20 text-center pointer-events-none">
                <span className="text-[10px] sm:text-[11px] text-neutral-800 font-serif italic tracking-wide truncate block drop-shadow-xs">
                  {customText}
                </span>
              </div>
            )}

          </div>

          <span className="text-[11px] text-neutral-400 mt-3.5 font-medium tracking-tight">
            Preview Photostrip Standar (2x6 inch)
          </span>
        </div>

        {/* Kolom Kanan: Kontrol Form Input */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">
                  Live Preview Mockup
                </span>
                <h3 className="text-xl font-bold text-neutral-800">{templateName}</h3>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-700 text-sm p-1.5 rounded-full hover:bg-neutral-100 transition"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
              Unggah 3 foto dari galerimu untuk melihat simulasi penempatan foto pada frame desain template ini.
            </p>

            <div className="space-y-4">
              {/* Input Foto */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Pilih 3 Foto dari Galeri
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="w-full text-xs text-neutral-600 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer border border-neutral-200 rounded-xl p-1 bg-neutral-50"
                />
                <span className="text-[10px] text-neutral-400 mt-1 block">
                  *Tip: Kamu bisa memilih 3 foto sekaligus secara langsung.
                </span>
              </div>

              {/* Input Teks Khusus */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Tambahkan Tulisan / Tanggal (Opsional)
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Contoh: 14.02.2024 / Forever & Always"
                  className="w-full border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs focus:outline-neutral-800"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2.5 pt-6 border-t border-neutral-100 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 text-xs font-medium py-2.5 rounded-xl transition"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold py-2.5 rounded-xl transition shadow-sm"
            >
              Selesai Coba
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}