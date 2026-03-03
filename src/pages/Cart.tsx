import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialItems = [
    {
        id: '1',
        title: 'Ultimate UI Design System',
        license: 'Commercial License',
        price: 149.00,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUs69UV6PwAqyORJo8EuEqAcfYMV161gEKaM7JzcuMJGl57m0dN9Damo4K7v9xVtdrLD_D15rxObygVNUGxJiV8F0AxyERKHPBHKXI93nbvn5__hIYufa7n7Cfso8FFSQ0_-csreirbAd3hWpgBp6N7Gf6MxkOMRVM1lm0HZodlF5dl9dZv01SfhaxjRPVEEi2IfFFujF4EZU9iG3JqQpaJf-LIrzRjTq_PceIPwj9yQNo3RvexAl-Od3hvGuG9wYOUts_bcFxWXrU'
    },
    {
        id: '2',
        title: 'React Pro Components Library',
        license: 'Lifetime Updates',
        price: 89.90,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXySZ91oHm4Cx5poLbTCBGSh31oSzj1njF5A5Hyyxfui_-1_PDqFbesejH8VSbWxZiXBqmSMDasCDHhh-vDJGSi1XbM1TdPHZLuGfWae9aFphl0WsTEj1qCgxUjZGQKNYYiGFAl0KLBRgCULOlfEpxLItPKm_ktp-AtFKukjOyX5l6RXCWojSKg12AzuBcUpPEPJfCeiRn6_7Z1vJrAEN4RgklY7g1N7_wjxO8HcllOZXczyMtv-qYIJ3Cu_jch_VputeUHGTnFtPQ'
    },
    {
        id: '3',
        title: 'Iconography Pack v2',
        license: 'SVG + Figma Files',
        price: 35.00,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL8zj_2C-YfFmCjc6zFEUep1R1ydO3RzsFL4H6CCEb8LafaLO9HWPRqpIYGSpEctHdCnQjyrjUcwTlVKeBVjG-OpAFo0oHoD_PGxNCzmV6D7olhAkHmNHVaU5VnPCXQwL3efBfs0153q-NOO-AJwTNl27G2RplqaIG1KVkyOvFSmIXfohzAFXzkPDC-1CPHf9rGF4dUAEV73Ckxd3D-IG-mrhKLxgZpT0EKUuPnAQTqzqS5Kx6KT7OvIpkdLQ8B8bXlp-qP4EoL4FI'
    }
];

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<{ id: string, title: string, price: number, quantity: number, image: string, type: string }[]>(() => {
        const saved = localStorage.getItem('poup_cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [coupon, setCoupon] = useState('');

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = 0;
    const total = subtotal - discount;

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prev => {
            const next = prev.map(item => {
                if (item.id === id) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            });
            localStorage.setItem('poup_cart', JSON.stringify(next));
            return next;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('poup_cart');
    };

    return (
        <div className="bg-pure-black text-text-value font-display min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-pure-black/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-all active:scale-95">
                        <span className="material-symbols-outlined text-primary text-2xl">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-xl font-bold tracking-tight">Carrinho</h1>
                </div>
                <button
                    onClick={clearCart}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500/10 text-zinc-500 hover:text-red-500 transition-all active:scale-95"
                    title="Limpar Carrinho"
                >
                    <span className="material-symbols-outlined">delete_forever</span>
                </button>
            </header>

            <main className="flex-1 overflow-y-auto px-6 py-8 max-w-2xl mx-auto w-full space-y-8">
                {cartItems.length > 0 ? (
                    <>
                        {/* Cart Items List */}
                        <section className="space-y-6">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center gap-4 border-b border-white/5 pb-6">
                                    <div
                                        className="size-20 rounded-xl bg-dark-charcoal flex-shrink-0 bg-cover bg-center border border-white/10"
                                        style={{ backgroundImage: `url('${item.image}')` }}
                                    ></div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold">{item.title}</h3>
                                        <p className="text-primary/80 text-sm">{item.license}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="text-primary hover:text-white transition-colors"
                                                >-</button>
                                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="text-primary hover:text-white transition-colors"
                                                >+</button>
                                            </div>
                                            <span className="text-lg font-extralight text-text-value">
                                                R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Apply Coupon Section */}
                        <section>
                            <div className="bg-insight-bg/10 rounded-xl p-5 border border-primary/20 shadow-[0_0_20px_rgba(15,182,127,0.05)]">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="material-symbols-outlined text-primary">confirmation_number</span>
                                    <h4 className="font-medium">Possui um cupom?</h4>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        className="flex-1 bg-white/5 border-none rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary text-sm text-text-value placeholder:text-zinc-600"
                                        placeholder="Código do cupom"
                                        type="text"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                    />
                                    <button className="bg-primary/20 text-primary px-6 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-black transition-all">
                                        APLICAR
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Totals Section */}
                        <section className="space-y-4 pt-4">
                            <div className="flex justify-between items-center text-text-label">
                                <span className="text-sm">Subtotal</span>
                                <span className="text-base font-extralight">R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between items-center text-text-label">
                                <span className="text-sm">Desconto</span>
                                <span className="text-base font-extralight text-primary">- R$ {discount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="h-px bg-white/5 my-4"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-medium">Total</span>
                                <div className="text-right">
                                    <span className="text-4xl font-bold text-white tracking-tight premium-text-glow">
                                        R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Impostos inclusos</p>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                        <div className="w-24 h-24 rounded-full bg-dark-charcoal flex items-center justify-center border border-white/5">
                            <span className="material-symbols-outlined text-zinc-600 text-5xl">shopping_cart_off</span>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">Seu carrinho está vazio</h2>
                            <p className="text-text-label max-w-[240px] mx-auto text-sm">Parece que você ainda não adicionou nenhum item.</p>
                        </div>
                        <button
                            onClick={() => navigate('/shop')}
                            className="px-8 py-3 bg-primary/10 border border-primary/30 text-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
                        >
                            Explorar Loja
                        </button>
                    </div>
                )}
            </main>

            {/* Bottom Action */}
            {cartItems.length > 0 && (
                <footer className="bg-pure-black/95 border-t border-white/5 pb-12 pt-6 px-6">
                    <button className="w-full bg-transparent border-2 border-primary text-primary font-extrabold py-4 rounded-full text-base tracking-[0.2em] shadow-[0_0_20px_rgba(15,182,127,0.2)] hover:bg-primary hover:text-black transition-all active:scale-[0.98] uppercase">
                        Finalizar Compra
                    </button>
                </footer>
            )}
        </div>
    );
}
