import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, TrendingUp, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

const DUMMY_PRODUCTS = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        description: 'High-fidelity audio with active noise cancellation.',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
        rating: 4.8,
        category: 'Electronics',
        store: 'TechHaven',
    },
    {
        id: 2,
        name: 'Minimalist Smartwatch',
        description: 'Track your fitness and stay connected in style.',
        price: 199.50,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
        rating: 4.5,
        category: 'Wearables',
        store: 'GadgetGalaxy',
    },
    {
        id: 3,
        name: 'Ergonomic Office Chair',
        description: 'Designed for comfort during long work sessions.',
        price: 450.00,
        image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=600',
        rating: 4.9,
        category: 'Furniture',
        store: 'ErgoMates',
    },
    {
        id: 4,
        name: 'Professional DSLR Camera',
        description: 'Capture stunning photos and 4K videos with ease.',
        price: 1299.00,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
        rating: 4.7,
        category: 'Photography',
        store: 'LensCrafters',
    },
    {
        id: 5,
        name: 'Mechanical Keyboard',
        description: 'Customizable RGB lighting and tactile switches.',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600',
        rating: 4.6,
        category: 'Gaming',
        store: 'ProGamer',
    },
    {
        id: 6,
        name: 'Noise-Isolating Earbuds',
        description: 'Compact design with powerful bass and clear highs.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1572569533944-d88470a1e389?auto=format&fit=crop&q=80&w=600',
        rating: 4.3,
        category: 'Electronics',
        store: 'SoundSpace',
    }
];

export default function Welcome() {
    const { auth } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <Head title="Welcome to SEAPEDIA" />
            <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans">
                {/* Navbar */}
                <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg">
                                <ShoppingBag size={18} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">SEAPEDIA</span>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                            <a href="#" className="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">Home</a>
                            <a href="#catalog" className="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">Catalog</a>
                            <a href="#about" className="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">About Us</a>
                        </nav>

                        <div className="hidden md:flex items-center gap-4">
                            {auth.user ? (
                                <Link href={dashboard()}>
                                    <Button variant="outline" className="rounded-full">Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()}>
                                        <Button variant="ghost" className="rounded-full">Log in</Button>
                                    </Link>
                                    <Link href={register()}>
                                        <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">Register</Button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Nav */}
                    {isMenuOpen && (
                        <div className="md:hidden border-t dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-4 shadow-lg absolute w-full">
                            <a href="#" className="block px-2 py-1 text-slate-600 dark:text-slate-300">Home</a>
                            <a href="#catalog" className="block px-2 py-1 text-slate-600 dark:text-slate-300">Catalog</a>
                            <a href="#about" className="block px-2 py-1 text-slate-600 dark:text-slate-300">About Us</a>
                            <div className="pt-4 border-t dark:border-slate-800 flex flex-col gap-2">
                                {auth.user ? (
                                    <Link href={dashboard()} className="w-full">
                                        <Button variant="outline" className="w-full justify-center">Dashboard</Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={login()} className="w-full">
                                            <Button variant="ghost" className="w-full justify-center">Log in</Button>
                                        </Link>
                                        <Link href={register()} className="w-full">
                                            <Button className="w-full justify-center bg-indigo-600">Register</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </header>

                <main>
                    {/* Hero Section */}
                    <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16 md:pt-24 pb-32">
                        {/* Decorative blobs */}
                        <div className="absolute top-0 -translate-y-12 translate-x-1/3 right-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
                        <div className="absolute bottom-0 translate-y-1/3 -translate-x-1/3 left-0 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl"></div>
                        
                        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
                            <Badge variant="outline" className="mb-6 px-3 py-1 rounded-full border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-300">
                                <TrendingUp className="mr-2 h-3 w-3" />
                                Welcome to the next-gen marketplace
                            </Badge>
                            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-indigo-300 dark:to-white">
                                Discover Premium Products at Unbeatable Prices.
                            </h1>
                            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                                Join SEAPEDIA today to experience a multi-role e-commerce ecosystem. Shop safely, sell smartly, and manage everything from one unified platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Button size="lg" className="rounded-full px-8 h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/20 transition-all hover:scale-105" asChild>
                                    <a href="#catalog">Shop Now</a>
                                </Button>
                                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all" asChild>
                                    <Link href={register()}>Become a Seller</Link>
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Catalog Section */}
                    <section id="catalog" className="py-20 bg-slate-50 dark:bg-slate-900/50">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Explore our curated selection of top-rated items.</p>
                                </div>
                                <div className="relative w-full md:w-auto">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search catalog..." 
                                        className="w-full md:w-64 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {DUMMY_PRODUCTS.map((product) => (
                                    <Card key={product.id} className="group overflow-hidden border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 transition-all hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
                                        <div className="aspect-[4/3] overflow-hidden relative bg-slate-100 dark:bg-slate-900">
                                            <Badge className="absolute top-3 right-3 z-10 bg-white/90 text-slate-900 hover:bg-white dark:bg-slate-900/90 dark:text-white backdrop-blur-sm">
                                                {product.category}
                                            </Badge>
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>
                                        <CardHeader className="p-5 pb-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                                                    <CardDescription className="mt-1 flex items-center gap-1 text-xs">
                                                        <span>by {product.store}</span>
                                                    </CardDescription>
                                                </div>
                                                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded text-xs font-medium">
                                                    <Star className="h-3 w-3 fill-current" />
                                                    {product.rating}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-5 py-3">
                                            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                                {product.description}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="p-5 pt-0 flex items-center justify-between">
                                            <span className="text-xl font-bold text-slate-900 dark:text-white">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            <Button variant="secondary" className="rounded-full shadow-sm hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-300">
                                                View Details
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                            
                            <div className="mt-16 flex justify-center">
                                <Button variant="outline" size="lg" className="rounded-full">
                                    Load More Products
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
                    <div className="container mx-auto px-4 lg:px-8 text-center text-slate-500 dark:text-slate-400">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-white">
                                <ShoppingBag size={14} />
                            </div>
                            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">SEAPEDIA</span>
                        </div>
                        <p className="mb-6">Phase 1 Development Prototype.</p>
                        <p className="text-sm">&copy; {new Date().getFullYear()} SEAPEDIA. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
