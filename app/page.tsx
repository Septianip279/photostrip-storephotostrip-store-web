'use client';

import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import PolaroidSlider from './PolaroidSlider';

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

interface CartItem {
  templateId: number;
  templateName: string;
  variantId: number;
  sizeName: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Nomor WhatsApp tujuan checkout
  const NO_WHATSAPP = '0895382019126';

  useEffect(() => {
    async function fetchTemplates() {
      const { data, error } = await supabase
        .from('templates')
        .select('*, template_variants(*)');

      if (error) {
        console.error('Gagal mengambil data:', error.message);
      } else if (data) {
        setTemplates(data as Template[]);
      }
      setLoading(false);
    }

    fetchTemplates();
  }, []);

  // Menambahkan item ke keranjang
  const addToCart = (tpl: Template, variant: Variant) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.templateId === tpl.id && item.variantId === variant.id
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      }

      return [
        ...prevCart,
        {
          templateId: tpl.id,
          templateName: tpl.name,
          variantId: variant.id,
          sizeName: variant.size_name,
          price: variant.price,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  // Mengubah jumlah item di keranjang
  const updateQuantity = (templateId: number, variantId: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.templateId === templateId && item.variantId === variantId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalBelanja = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItem = cart.reduce((total, item) => total + item.quantity, 0);

  // Logika Checkout WhatsApp
  const handleCheckoutWA = () => {
    if (cart.length === 0) return;

    let pesan = `Halo kak, saya mau order Photostrip:%0A%0A`;
    cart.forEach((item, idx) => {
      pesan += `${idx + 1}. *${item.templateName}*%0A`;
      pesan += `   - Ukuran: ${item.sizeName}%0A`;
      pesan += `   - Jumlah: ${item.quantity} pcs%0A`;
      pesan += `   - Subtotal: Rp${(item.price * item.quantity).toLocaleString('id-ID')}%0A%0A`;
    });

    pesan += `*Total Pembayaran: Rp${totalBelanja.toLocaleString('id-ID')}*%0A%0A`;
    pesan += `Mohon info format pengiriman foto dan nomor rekeningnya ya kak. Terima kasih!`;

    window.open(`https://wa.me/${NO_WHATSAPP}?text=${pesan}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-neutral-50 pb-20">
      {/* Navbar */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-200 z-20 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-neutral-800">Photostrip Studio</h1>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-full text-sm font-medium transition"
          >
            Keranjang ({totalItem})
          </button>
        </div>
      </nav>

      {/* Katalog */}
      <section className="max-w-5xl mx-auto p-6 md:p-10">
        <header className="text-center mb-10">
          <h2 className="text-3xl font-bold text-neutral-800">Pilihan Template</h2>
          <p className="text-neutral-500 mt-2">Pilih desain dan ukuran yang kamu inginkan, lalu masukkan keranjang.</p>
        </header>

        {loading ? (
          <p className="text-center text-neutral-500">Memuat katalog...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {templates.map((tpl) => {
              // Memisahkan URL berkoma menjadi array gambar
              const photoList = tpl.image_url ? tpl.image_url.split(',') : [];

              return (
                <div key={tpl.id} className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col">
                  {/* Slider Carousel Polaroid */}
                  <div className="w-full bg-neutral-100 flex items-center justify-center p-4">
                    <PolaroidSlider images={photoList} name={tpl.name} />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-800">{tpl.name}</h3>
                      <p className="text-neutral-500 text-sm mt-1 mb-6">{tpl.description}</p>
                    </div>

                    <div className="border-t border-neutral-100 pt-4">
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-3">Pilih Ukuran:</span>
                      <div className="flex flex-col gap-2.5">
                        {tpl.template_variants?.map((v) => (
                          <div
                            key={v.id}
                            className="flex justify-between items-center bg-neutral-50 border border-neutral-200/80 p-3 rounded-xl text-sm"
                          >
                            <div>
                              <span className="font-medium text-neutral-700 block">{v.size_name}</span>
                              <span className="font-semibold text-emerald-600">Rp{v.price.toLocaleString('id-ID')}</span>
                            </div>
                            <button
                              onClick={() => addToCart(tpl, v)}
                              className="bg-neutral-900 hover:bg-neutral-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                            >
                              + Keranjang
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Sidebar Keranjang */}
      {isCartOpen && (
        <div className="fixed inset-0 z-30 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6">
            <div>
              <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-4">
                <h3 className="text-lg font-bold text-neutral-800">Keranjang Belanja</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-neutral-400 hover:text-neutral-700 text-xl font-semibold"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-neutral-400 text-center py-10 text-sm">Keranjang masih kosong.</p>
              ) : (
                <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={`${item.templateId}-${item.variantId}`} className="border border-neutral-100 bg-neutral-50 p-3.5 rounded-xl flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-sm text-neutral-800">{item.templateName}</h4>
                        <p className="text-xs text-neutral-500">{item.sizeName}</p>
                        <p className="text-xs font-bold text-neutral-700 mt-1">
                          Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.templateId, item.variantId, -1)}
                          className="w-7 h-7 bg-white border border-neutral-200 rounded-md font-bold text-neutral-700 hover:bg-neutral-100"
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.templateId, item.variantId, 1)}
                          className="w-7 h-7 bg-white border border-neutral-200 rounded-md font-bold text-neutral-700 hover:bg-neutral-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total & Tombol WA */}
            <div className="border-t border-neutral-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-neutral-600 font-medium">Total Tagihan:</span>
                <span className="text-xl font-bold text-emerald-600">Rp{totalBelanja.toLocaleString('id-ID')}</span>
              </div>
              <button
                disabled={cart.length === 0}
                onClick={handleCheckoutWA}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-300 text-white font-semibold py-3 rounded-xl transition"
              >
                Checkout ke WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}