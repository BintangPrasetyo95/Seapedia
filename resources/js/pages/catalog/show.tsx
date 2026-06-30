import { Head, Link } from '@inertiajs/react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

interface Store {
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: string | number;
    image: string | null;
    store?: Store;
}

export default function Show({ product }: { product: Product }) {
    return (
        <>
            <Head title={`${product.name} - SEAPEDIA`} />
            <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans">
                {/* Minimal Header */}
                <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 h-14">
                    <div className="max-w-5xl mx-auto flex h-full items-center justify-between px-4">
                        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                            <ArrowLeft size={20} />
                            <span className="font-medium text-sm">Back to Store</span>
                        </Link>
                        <div className="font-semibold tracking-[-0.01em]">SEAPEDIA</div>
                    </div>
                </header>

                <main className="max-w-5xl mx-auto px-4 py-12 md:py-20">
                    <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 bg-[#fbfbfd] p-8 flex items-center justify-center">
                            <img 
                                src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'} 
                                alt={product.name} 
                                className="w-full max-w-sm rounded-2xl shadow-lg object-cover"
                            />
                        </div>
                        
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            {product.store && (
                                <div className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                                    Sold by: {product.store.name}
                                </div>
                            )}
                            <h1 className="text-4xl font-semibold tracking-[-0.01em] leading-tight mb-4 text-[#1d1d1f]">
                                {product.name}
                            </h1>
                            <p className="text-[21px] font-semibold text-[#86868b] mb-6">
                                Rp {Number(product.price).toLocaleString('id-ID')}
                            </p>
                            
                            <hr className="border-gray-200 mb-6" />
                            
                            <h3 className="text-[17px] font-semibold mb-2">Description</h3>
                            <p className="text-[15px] font-normal leading-relaxed text-[#515154] mb-8">
                                {product.description}
                            </p>
                            
                            <div className="mt-auto">
                                <Link 
                                    href="/login"
                                    className="w-full bg-primary text-primary-foreground flex justify-center items-center gap-2 py-4 rounded-full font-semibold text-[17px] hover:bg-primary/90 transition-colors"
                                >
                                    <ShoppingBag size={20} />
                                    Sign in to Buy
                                </Link>
                                <p className="text-center text-xs text-[#86868b] mt-4">
                                    You must be a registered Buyer to add items to your cart.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
