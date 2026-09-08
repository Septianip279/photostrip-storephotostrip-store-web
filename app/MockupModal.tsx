'use client';

import { useState } from 'react';

interface MockupModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
}

export default function MockupModal({ isOpen, onClose, templateName }: MockupModalProps) {
  const [userPhotos, setUserPhotos] = useState<string[]>([]);
  const [customText, setCustomText] = useState('Our Memories ✨');

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 3);
    const urls = files.map((file) => URL.createObjectURL(file));
    setUserPhotos(urls);
  };

  const handleReset = () => {
    setUserPhotos([]);
    setCustomText('Our Memories ✨');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-100 flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto">
        {/* Kolom Kiri: Live Strip Polaroid Preview */}
        <div className="flex-1 flex flex-col items-center justify-center bg-neutral-100/70 p-6 rounded-2xl border border-neutral-200/60">
          <div className="bg-white p-3.5 pb-6 shadow-xl rounded-sm w-44 flex flex-col items-center gap-2.5 border border-neutral-200/40">
            {/* Slot Foto 1 */}
            <div className="w-full aspect-[4/3] bg-neutral-100 rounded-xs overflow-hidden flex items-center justify-center border border-neutral-200/50">
              {userPhotos[0] ? (
                <img src={userPhotos[0]} alt="slot 1" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-neutral-400 font-medium">Foto 1</span>
              )}
            </div>

            {/* Slot Foto 2 */}
            <div className="w-full aspect-[4/3] bg-neutral-100 rounded-xs overflow-hidden flex items-center justify-center border border-neutral-200/50">
              {userPhotos[1] ? (
                <img src={userPhotos[1]} alt="slot 2" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-neutral-400 font-medium">Foto 2</span>
              )}
            </div>

            {/* Slot Foto 3 */}
            <div className="w-full aspect-[4/3] bg-neutral-100 rounded-xs overflow-hidden flex items-center justify-center border border-neutral-200/50">
              {userPhotos[2] ? (
                <img src={userPhotos[2]} alt="slot 3" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-neutral-400 font-medium">Foto 3</span>
              )}
            </div>

            {/* Custom Teks di Bawah Strip */}
            <p className="text-[11px] text-neutral-700 font-serif italic text-center mt-1 truncate max-w-full px-1">
              {customText || 'Tulis pesanmu...'}
            </p>
          </div>
          <span className="text-[10px] text-neutral-400 mt-3 font-medium">Simulasi Photostrip 2x6</span>
        </div>

        {/* Kolom Kanan: Kontrol Upload & Teks */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">Live Mockup</span>
                <h3 className="text-lg font-bold text-neutral-800">{templateName}</h3>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-700 text-sm p-1 rounded-full hover:bg-neutral-100 transition"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-500 mb-5 leading-relaxed">
              Coba masukkan sampai 3 foto dari galerimu untuk melihat gambaran hasil cetak polaroid.
            </p>

            <div className="space-y-4">
              {/* Input Foto */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Pilih 3 Foto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="w-full text-xs text-neutral-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer"
                />
              </div>

              {/* Input Custom Pesan */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Tulisan Bawah Foto (Opsional)
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Contoh: 14.02.2024 / Happy Birthday"
                  className="w-full border border-neutral-300 rounded-xl px-3 py-2 text-xs focus:outline-neutral-800"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-6 border-t border-neutral-100 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 text-xs font-medium py-2.5 rounded-xl transition"
            >
              Reset Foto
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