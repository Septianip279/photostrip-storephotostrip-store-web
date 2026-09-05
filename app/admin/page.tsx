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
  image_url: string;
  description: string;
  template_variants: Variant[];
}

export default function AdminPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [price2x6, setPrice2x6] = useState('15000');
  const [price4x6, setPrice4x6] = useState('25000');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Ambil daftar template
  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from('templates')
      .select('*, template_variants(*)')
      .order('id', { ascending: false });

    if (!error && data) {
      setTemplates(data as Template[]);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Tambah template baru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Silakan pilih file gambar terlebih dahulu!');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
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

      const imageUrl = publicUrlData.publicUrl;

      const { data: templateData, error: templateError } = await supabase
        .from('templates')
        .insert([{ name, image_url: imageUrl, description }])
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

      setMessage('Template baru berhasil ditambahkan!');
      setName('');
      setFile(null);
      setDescription('');
      fetchTemplates();
    } catch (err: any) {
      setMessage(`Gagal menyimpan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Hapus template
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

        {message && (
          <div
            className={`p-4 rounded-xl text-sm ${
              message.includes('berhasil')
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {message}
          </div>
        )}

        {/* Form Tambah Template */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-200">
          <h2 className="text-lg font-bold text-neutral-800 mb-4">Tambah Desain Baru</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                File Foto Template
              </label>
              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full border border-neutral-300 rounded-lg p-2 text-sm focus:outline-neutral-800 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-700"
              />
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
              {loading ? 'Mengunggah & Menyimpan...' : 'Simpan Template'}
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
              {templates.map((tpl) => (
                <div key={tpl.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={tpl.image_url}
                      alt={tpl.name}
                      className="w-16 h-20 object-contain bg-neutral-100 rounded-lg p-1 border border-neutral-200"
                    />
                    <div>
                      <h3 className="font-semibold text-neutral-800">{tpl.name}</h3>
                      <p className="text-xs text-neutral-500 line-clamp-1">{tpl.description || 'Tidak ada deskripsi'}</p>
                      <div className="flex gap-2 mt-1">
                        {tpl.template_variants?.map((v) => (
                          <span key={v.id} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
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
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}