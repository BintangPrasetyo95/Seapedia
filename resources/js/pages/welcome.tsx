import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { ShoppingBag, Search, Menu, X, Star } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const DUMMY_PRODUCTS = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        description: 'High-fidelity audio with active noise cancellation.',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    },
    {
        id: 2,
        name: 'Minimalist Smartwatch',
        description: 'Track your fitness and stay connected in style.',
        price: 199.50,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    },
    {
        id: 3,
        name: 'Ergonomic Office Chair',
        description: 'Designed for comfort during long work sessions.',
        price: 450.00,
        image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=600',
    },
    {
        id: 4,
        name: 'Professional DSLR Camera',
        description: 'Capture stunning photos and 4K videos with ease.',
        price: 1299.00,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
    },
    {
        id: 5,
        name: 'Mechanical Keyboard',
        description: 'Customizable RGB lighting and tactile switches.',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600',
    },
    {
        id: 6,
        name: 'Noise-Isolating Earbuds',
        description: 'Compact design with powerful bass and clear highs.',
        price: 89.99,
        image: 'https://plus.unsplash.com/premium_photo-1668418188837-d40b734ed6d2?auto=format&fit=crop&q=80&w=600',
    }
];

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

export default function Welcome({ products = [] }: { products?: Product[] }) {
    const { auth } = usePage().props as any;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Please select a rating.");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please enter a comment.");
            return;
        }
        
        setIsSubmitting(true);
        try {
            await axios.post('/reviews', { rating, comment });
            toast.success("Thank you for your review!");
            setRating(0);
            setComment('');
        } catch (error) {
            toast.error("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const displayProducts = products.length > 0 ? products : DUMMY_PRODUCTS;
    const heroProduct = displayProducts[0];
    const secondProduct = displayProducts.length > 1 ? displayProducts[1] : DUMMY_PRODUCTS[1];
    const gridProducts = displayProducts.slice(2, 6);

    return (
        <>
            <Head title="Welcome to SEAPEDIA" />
            <div className="min-h-screen bg-background text-foreground font-sans">
                {/* Global Nav (Apple style: pure black) */}
                <header className="sticky top-0 z-50 w-full bg-black text-white h-11">
                    <div className="max-w-5xl mx-auto flex h-full items-center justify-between px-4 text-[12px] font-normal tracking-[-0.01em]">
                        <div className="flex items-center gap-2">
                            <ShoppingBag size={14} className="opacity-80" />
                        </div>

                        {/* Desktop Nav */}
                        {/* <nav className="hidden md:flex items-center gap-8 opacity-80">
                            <a href="#" className="hover:opacity-100 transition-opacity">Store</a>
                            <a href="#" className="hover:opacity-100 transition-opacity">Mac</a>
                            <a href="#" className="hover:opacity-100 transition-opacity">iPad</a>
                            <a href="#" className="hover:opacity-100 transition-opacity">iPhone</a>
                        </nav> */}

                        <div className="hidden md:flex items-center gap-4 opacity-80">
                            {auth?.user ? (
                                <Link href={dashboard()} className="hover:opacity-100">Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={login()} className="hover:opacity-100">Sign In</Link>
                                    <Link href={register()} className="hover:opacity-100">Sign Up</Link>
                                </>
                            )}
                            <Search size={14} className="hover:opacity-100 cursor-pointer" />
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 opacity-80 hover:opacity-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </header>

                <main>
                    {/* Hero Section (Light Canvas) */}
                    <section className="relative bg-background w-full py-20 flex flex-col items-center justify-center text-center">
                        <h1 className="text-[56px] font-semibold tracking-[-0.01em] leading-[1.07] text-foreground mb-2">
                            SEAPEDIA
                        </h1>
                        <p className="text-[28px] font-normal tracking-[0.196px] text-foreground mb-6">
                            Pro features. Radical possibilities.
                        </p>
                        <div className="flex items-center gap-4 mb-12">
                            <Link 
                                href="#catalog" 
                                className="bg-primary text-primary-foreground text-[17px] font-normal rounded-full px-5.5 py-2.75 hover:scale-95 transition-transform"
                            >
                                Buy
                            </Link>
                            <Link 
                                href={register()} 
                                className="text-primary text-[17px] font-normal hover:underline"
                            >
                                Learn more &gt;
                            </Link>
                        </div>
                        <div className="max-w-200 w-full mx-auto px-4">
                            <img 
                                src={heroProduct?.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'} 
                                alt={heroProduct?.name} 
                                className="w-full h-auto object-cover shadow-[0_5px_30px_rgba(0,0,0,0.22)] rounded-3xl"
                            />
                        </div>
                    </section>

                    {/* Dark Tile Alternation */}
                    {secondProduct && (
                    <section id="catalog" className="relative bg-[#272729] text-white w-full py-20 flex flex-col items-center justify-center text-center">
                        <h2 className="text-[40px] font-semibold tracking-normal leading-[1.1] mb-2">
                            {secondProduct.name}
                        </h2>
                        <p className="text-[21px] font-semibold tracking-[0.231px] text-[#cccccc] mb-6">
                            {secondProduct.description}
                        </p>
                        <div className="flex items-center gap-4 mb-12">
                            <Link 
                                href="#" 
                                className="bg-primary text-primary-foreground text-[17px] font-normal rounded-full px-5.5 py-2.75 hover:scale-95 transition-transform"
                            >
                                Buy
                            </Link>
                            <Link 
                                href="#" 
                                className="text-[#2997ff] text-[17px] font-normal hover:underline"
                            >
                                Learn more &gt;
                            </Link>
                        </div>
                        <div className="max-w-150 w-full mx-auto px-4">
                            <img 
                                src={secondProduct.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'} 
                                alt={secondProduct.name} 
                                className="w-full h-auto object-cover shadow-[0_5px_30px_rgba(0,0,0,0.22)] rounded-3xl"
                            />
                        </div>
                    </section>
                    )}

                    {/* Product Grid */}
                    {gridProducts.length > 0 && (
                    <section className="w-full py-4 px-4 bg-background">
                        <div className="max-w-350 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                            {gridProducts.map((product) => (
                                <div key={product.id} className="relative bg-[#f5f5f7] rounded-[18px] overflow-hidden flex flex-col items-center justify-start text-center pt-12 pb-0 px-4 group hover:scale-[1.01] transition-transform duration-300">
                                    <h3 className="text-[32px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-[17px] font-normal tracking-[0.231px] text-muted-foreground mb-6 line-clamp-1">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center gap-4 mb-8">
                                        <Link 
                                            href="#" 
                                            className="bg-primary text-primary-foreground text-[14px] font-normal rounded-full px-4 py-2 hover:scale-95 transition-transform"
                                        >
                                            Buy
                                        </Link>
                                        <Link 
                                            href="#" 
                                            className="text-primary text-[14px] font-normal hover:underline"
                                        >
                                            Learn more &gt;
                                        </Link>
                                    </div>
                                    <div className="w-full mt-auto">
                                        <img 
                                            src={product.image || 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=600'} 
                                            alt={product.name} 
                                            className="w-[80%] max-w-100 mx-auto h-62.5 object-cover shadow-[0_5px_30px_rgba(0,0,0,0.12)] rounded-t-[18px]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    )}

                    {/* App Review Form */}
                    <section className="w-full py-20 px-4 bg-[#f5f5f7]">
                        <div className="max-w-200 mx-auto bg-white rounded-3xl p-8 shadow-sm text-center">
                            <h2 className="text-[32px] font-semibold tracking-[-0.01em] mb-4">We Value Your Feedback</h2>
                            <p className="text-muted-foreground mb-8 text-[17px]">Tell us what you think about SEAPEDIA.</p>
                            
                            <form onSubmit={submitReview} className="max-w-125 mx-auto space-y-6">
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button 
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star 
                                                className={`w-10 h-10 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                            />
                                        </button>
                                    ))}
                                </div>
                                
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Share your experience with us..."
                                    className="w-full h-32 p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    maxLength={1000}
                                />
                                
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-primary text-primary-foreground py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        </div>
                    </section>
                </main>

                {/* Footer (Parchment) */}
                <footer className="bg-[#f5f5f7] text-[#7a7a7a] py-16 px-4">
                    <div className="max-w-5xl mx-auto text-[12px] font-normal leading-[1.3] tracking-[-0.01em]">
                        <p className="mb-4">1. Price includes a $30 SEAPEDIA instant discount. Terms apply.</p>
                        <hr className="border-[#e0e0e0] my-4" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
                            <div>
                                <h3 className="text-[14px] font-semibold text-[#333333] mb-2 tracking-[-0.01em]">Shop and Learn</h3>
                                <ul className="space-y-2 text-[12px] leading-[2.41]">
                                    <li><a href="#" className="hover:underline">Store</a></li>
                                    <li><a href="#" className="hover:underline">Mac</a></li>
                                    <li><a href="#" className="hover:underline">iPad</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-[14px] font-semibold text-[#333333] mb-2 tracking-[-0.01em]">Services</h3>
                                <ul className="space-y-2 text-[12px] leading-[2.41]">
                                    <li><a href="#" className="hover:underline">Apple Music</a></li>
                                    <li><a href="#" className="hover:underline">Apple TV+</a></li>
                                </ul>
                            </div>
                        </div>
                        <hr className="border-[#e0e0e0] my-4" />
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p>Copyright © {new Date().getFullYear()} SEAPEDIA Inc. All rights reserved.</p>
                            <div className="space-x-4 mt-4 md:mt-0">
                                <a href="#" className="hover:underline">Privacy Policy</a>
                                <a href="#" className="hover:underline">Terms of Use</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
