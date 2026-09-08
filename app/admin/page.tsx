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

interface CategoryItem {
  id: number;
  name: string;
}

export default function AdminPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [price2x6, setPrice2x6] = useState('15000');
  const [price4x6, setPrice4x6] = useState('25000');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Pengaturan Musik
  const [musicUrl, setMusicUrl] = useState('');
  const [musicTitle, setMusicTitle] = useState('');
  const [savingMusic, setSavingMusic] = useState(false);
  const [musicMessage, setMusicMessage] = useState('');

  const fetchData = async () => {
    // Ambil templates
    const { data: tplData } = await supabase
      .from('templates')
      .select('*, template_variants(*)')
      .order('id', { ascending: false });
    if (tplData) setTemplates(tplData as Template[]);

    // Ambil categories
    const { data: catData } = await supabase
      .from('categories')
      .select('*')
      .order('id', { ascending: true });
    if (catData && catData.length > 0) {
      setCategories(catData as CategoryItem[]);
      setCategory((prev) => prev || catData[0].name);
    }

    // Ambil pengaturan musik
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

  // Tambah Kategori Baru
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    setCategoryLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: trimmed }])
      .select()
      .single();

    if (error) {
      alert(`Gagal menambah kategori: ${error.message}`);
    } else if (data) {
      setCategories([...categories, data]);
      setCategory(data.name);
      setNewCategoryName('');
    }
    setCategoryLoading(false);
  };

  // Hapus Kategori
  const handleDeleteCategory = async (id: number, catName: string) => {
    if (categories.length <= 1) {
      alert('Minimal harus tersisa satu kategori.');
      return;
    }
    const ok = confirm(`Hapus kategori "${catName}"?`);
    if (!ok) return;

    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      alert(`Gagal menghapus: ${error.message}`);
    } else {
      const remaining = categories.filter((c) => c.id !== id);
      setCategories(remaining);
      if (category === catName) {
        setCategory(remaining[0]?.name || '');
      }
    }
  };

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

      setMusicMessage('Lagu berhasil diperbarui!');
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
      setMessage('Silakan pilih minimal 1 foto polaroid.');
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

      const { data: templateData, error: templateError } = await supabase
        .from('templates')
        .insert([{ name, category: category || 'Minimalist', image_url: combinedImageUrl, description }])
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
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neutral-800">Panel Admin</h1>
          <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 underline">
            ← Kembali ke Toko
          </Link>
        </div>

        {/* 1. Pengaturan Kategori Tema */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🏷️</span>
            <h2 className="text-base font-bold text-neutral-800">Kelola Kategori Tema</h2>
          </div>
          <p className="text-xs text-neutral-500 mb-4">
            Tambah tema baru atau hapus tema yang tidak terpakai dari katalog.
          </p>

          <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Contoh: Cute Pastel, Graduation, dsb."
              className="flex-1 border border-neutral-300 rounded-xl px-3 py-2 text-xs focus:outline-neutral-800"
            />
            <button
              type="submit"
              disabled={categoryLoading}
              className="bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
            >
              + Tambah Kategori
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs px-3 py-1.5 rounded-full"
              >
                {c.name}
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(c.id, c.name)}
                  className="hover:text-rose-600 font-bold ml-1 text-xs"
                  title={`Hapus kategori ${c.name}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 2. Pengaturan Musik Background */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🎵</span>
            <h2 className="text-base font-bold text-neutral-800">Pengaturan Musik Background</h2>
          </div>
          <p className="text-xs text-neutral-500 mb-4">
            Masukkan judul dan link YouTube untuk musik latar toko.
          </p>

          {musicMessage && (
            <div className="p-3 mb-4 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
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
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-neutral-800"
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
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-neutral-800"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingMusic}
              className="self-start bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-medium px-4 py-2 rounded-xl transition text-xs"
            >
              {savingMusic ? 'Menyimpan...' : 'Simpan Musik'}
            </button>
          </form>
        </div>

        {message && (
          <div className="p-4 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            {message}
          </div>
        )}

        {/* 3. Form Tambah Template Baru */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <h2 className="text-base font-bold text-neutral-800 mb-4">Tambah Desain Template Baru</h2>
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
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-neutral-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                  Kategori Tema (Pilih dari database)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-neutral-800 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                Upload Foto Polaroid
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-neutral-300 rounded-lg p-2 text-xs focus:outline-neutral-800 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-700"
              />

              {files.length > 0 && (
                <div className="mt-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <p className="text-xs font-semibold text-neutral-600 mb-2">
                    {files.length} foto terpilih:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {files.map((file, idx) => (
                      <div key={idx} className="relative group border border-neutral-300 rounded-lg overflow-hidden w-16 h-20 bg-white p-1 flex items-center justify-center">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          className="absolute -top-1 -right-1 bg-rose-600 hover:bg-rose-700 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
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
                placeholder="Deskripsi singkat template..."
                className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-neutral-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 pt-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                  Harga 2x6 inch (Rp)
                </label>
                <input
                  type="number"
                  required
                  value={price2x6}
                  onChange={(e) => setPrice2x6(e.target.value)}
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-neutral-800"
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
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-neutral-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-medium py-3 rounded-xl transition text-xs"
            >
              {loading ? 'Menyimpan...' : 'Simpan Template'}
            </button>
          </form>
        </div>

        {/* 4. Daftar Template */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <h2 className="text-base font-bold text-neutral-800 mb-4">Daftar Template Aktif ({templates.length})</h2>

          {templates.length === 0 ? (
            <p className="text-neutral-400 text-xs">Belum ada template tersimpan.</p>
          ) : (
            <div className="flex flex-col divide-y divide-neutral-100">
              {templates.map((tpl) => {
                const previewImages = tpl.image_url ? tpl.image_url.split(',') : [];
                return (
                  <div key={tpl.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={previewImages[0]}
                        alt={tpl.name}
                        className="w-14 h-16 object-contain bg-neutral-100 rounded-lg p-1 border border-neutral-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-xs text-neutral-800">{tpl.name}</h3>
                          <span className="text-[10px] font-bold uppercase bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
                            {tpl.category || 'Minimalist'}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">{previewImages.length} foto polaroid</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(tpl.id)}
                      className="text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 px-3 py-1 rounded-lg transition"
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