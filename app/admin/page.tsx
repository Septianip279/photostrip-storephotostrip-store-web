'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Link from 'next/link';

interface Variant {
  id: number;
  size_name: string;
  price: number;
}

interface Template {
  id: number;
  name: string;
  category?: string;
  image_url: string;
  description: string;
  template_variants: Variant[];
}

const CATEGORY_OPTIONS = [
  'Minimalist',
  'Vintage',
  'Y2K / Retro',
  'Couple & Love',
  'Birthday',
];

export default function AdminPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [price2x6, setPrice2x6] = useState('15000');
  const [price4x6, setPrice4x6] = useState('25000');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // State Pengaturan Musik
  const [musicUrl, setMusicUrl] = useState('');
  const [musicTitle, setMusicTitle] = useState('');
  const [savingMusic, setSavingMusic] = useState(false);
  const [musicMessage, setMusicMessage] = useState('');

  const fetchData = async () => {
    const { data: tplData } = await supabase
      .from('templates')
      .select('*, template_variants(*)')
      .order('id', { ascending: false });

    if (tplData) setTemplates(tplData as Template[]);

    const { data: settingsData } = await supabase
      .from('site_settings')
      .select('*');

    if (settingsData) {
      const urlSetting = settingsData.find((s) => s.key === 'music_url');
      const titleSetting = settingsData.find((s) => s.key === 'music_title');
      if (urlSetting) setMusicUrl(urlSetting.value);
      if (titleSetting) setMusicTitle(titleSetting.value);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveMusic = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingMusic(true);
    setMusicMessage('');

    try {
      const updates = [
        { key: 'music_url', value: musicUrl },
        { key: 'music_title', value: musicTitle || 'Background Music' },
      ];

      const { error } = await supabase.from('site_settings').upsert(updates);
      if (error) throw error;

      setMusicMessage('Lagu berhasil diperbarui! Halaman utama akan memutar lagu ini.');
    } catch (err: any) {
      setMusicMessage(`Gagal menyimpan lagu: ${err.message}`);
    } finally {
      setSavingMusic(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      setMessage('Silakan pilih minimal satu foto polaroid.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `templates/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('photostrips')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('photostrips')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrlData.publicUrl);
      }

      const combinedImageUrl = uploadedUrls.join(',');

      // Simpan template beserta kategorinya
      const { data: templateData, error: templateError } = await supabase
        .from('templates')
        .insert([{ name, category, image_url: combinedImageUrl, description }])
        .select()
        .single();

      if (templateError) throw templateError;

      const variantsToInsert = [
        {
          template_id: templateData.id,
          size_name: '2x6 inch (Strip Standar)',
          price: parseInt(price2x6, 10) || 0,
        },
        {
          template_id: templateData.id,
          size_name: '4x6 inch (Postcard)',
          price: parseInt(price4x6, 10) || 0,
        },
      ];

      const { error: variantError } = await supabase
        .from('template_variants')
        .insert(variantsToInsert);

      if (variantError) throw variantError;

      setMessage(`Berhasil! Template kategori "${category}" sukses disimpan.`);
      setName('');
      setCategory(CATEGORY_OPTIONS[0]);
      setFiles([]);
      setDescription('');
      fetchData();
    } catch (err: any) {
      setMessage(`Gagal menyimpan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const konfirmasi = confirm('Yakin ingin menghapus template ini?');
    if (!konfirmasi) return;

    try {
      const { error } = await supabase.from('templates').delete().eq('id', id);
      if (error) throw error;

      setTemplates(templates.filter((tpl) => tpl.id !== id));
      setMessage('Template berhasil dihapus.');
    } catch (err: any) {
      setMessage(`Gagal menghapus: ${err.message}`);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neutral-800">Panel Admin Katalog</h1>
          <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 underline">
            ← Kembali ke Katalog Utama
          </Link>
        </div>

        {/* Form Pengaturan Musik Background */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-rose-500 text-lg">🎵</span>
            <h2 className="text-lg font-bold text-neutral-800">Pengaturan Musik Background</h2>
          </div>
          <p className="text-xs text-neutral-500 mb-4">
            Masukkan link video YouTube atau YouTube Music untuk mengganti lagu toko secara instan.
          </p>

          {musicMessage && (
            <div
              className={`p-3.5 mb-4 rounded-xl text-xs font-medium ${
                musicMessage.includes('Berhasil')
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {musicMessage}
            </div>
          )}

          <form onSubmit={handleSaveMusic} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                  Judul Lagu
                </label>
                <input
                  type="text"
                  value={musicTitle}
                  onChange={(e) => setMusicTitle(e.target.value)}
                  placeholder="Contoh: About You"
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:outline-neutral-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                  Link YouTube / YouTube Music
                </label>
                <input
                  type="text"
                  value={musicUrl}
                  onChange={(e) => setMusicUrl(e.target.value)}
                  placeholder="https://music.youtube.com/watch?v=..."
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:outline-neutral-800"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingMusic}
              className="self-start mt-1 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-medium px-5 py-2.5 rounded-xl transition text-xs"
            >
              {savingMusic ? 'Menyimpan Musik...' : 'Simpan Musik Baru'}
            </button>
          </form>
        </div>

        {message && (
          <div
            className={`p-4 rounded-xl text-sm ${
              message.includes('Berhasil')
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {message}
          </div>
        )}

        {/* Form Tambah Template Baru */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-200">
          <h2 className="text-lg font-bold text-neutral-800 mb-4">Tambah Desain Baru</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                  Nama Template
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Sweet Valentine"
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:outline-neutral-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                  Kategori Tema
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:outline-neutral-800 bg-white"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                Upload Foto Polaroid (Bisa pilih beberapa sekaligus)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-neutral-300 rounded-lg p-2 text-sm focus:outline-neutral-800 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-700"
              />

              {files.length > 0 && (
                <div className="mt-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <p className="text-xs font-semibold text-neutral-600 mb-2">
                    {files.length} foto dipilih:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {files.map((file, idx) => (
                      <div key={idx} className="relative group border border-neutral-300 rounded-lg overflow-hidden w-20 h-24 bg-white p-1 flex items-center justify-center">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          className="absolute -top-1 -right-1 bg-rose-600 hover:bg-rose-700 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-md"
                          title="Hapus foto ini"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                Deskripsi Singkat
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi gaya desain..."
                className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:outline-neutral-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                  Harga 2x6 inch (Rp)
                </label>
                <input
                  type="number"
                  required
                  value={price2x6}
                  onChange={(e) => setPrice2x6(e.target.value)}
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:outline-neutral-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                  Harga 4x6 inch (Rp)
                </label>
                <input
                  type="number"
                  required
                  value={price4x6}
                  onChange={(e) => setPrice4x6(e.target.value)}
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:outline-neutral-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-medium py-3 rounded-xl transition text-sm"
            >
              {loading ? `Mengunggah ${files.length} Foto & Menyimpan...` : `Simpan Template (${files.length} Foto)`}
            </button>
          </form>
        </div>

        {/* Daftar Template yang Ada */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-200">
          <h2 className="text-lg font-bold text-neutral-800 mb-4">Daftar Template Aktif ({templates.length})</h2>

          {templates.length === 0 ? (
            <p className="text-neutral-400 text-sm">Belum ada template yang tersimpan.</p>
          ) : (
            <div className="flex flex-col divide-y divide-neutral-100">
              {templates.map((tpl) => {
                const previewImages = tpl.image_url ? tpl.image_url.split(',') : [];
                return (
                  <div key={tpl.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={previewImages[0]}
                          alt={tpl.name}
                          className="w-16 h-20 object-contain bg-neutral-100 rounded-lg p-1 border border-neutral-200"
                        />
                        {previewImages.length > 1 && (
                          <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
                            +{previewImages.length - 1}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-neutral-800">{tpl.name}</h3>
                          <span className="text-[10px] uppercase font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
                            {tpl.category || 'Minimalist'}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{tpl.description || 'Tidak ada deskripsi'}</p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">Total {previewImages.length} foto polaroid</p>
                        <div className="flex gap-2 mt-1">
                          {tpl.template_variants?.map((v) => (
                            <span key={v.id} className="text-xs bg-neutral-50 border border-neutral-200 text-neutral-600 px-2 py-0.5 rounded">
                              {v.size_name}: Rp{v.price.toLocaleString('id-ID')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(tpl.id)}
                      className="text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg font-medium transition"
                    >
                      Hapus
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}