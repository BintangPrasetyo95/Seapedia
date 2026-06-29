import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, ShoppingCartIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Store {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    category: string;
    image: string | null;
    store: Store;
}

export default function Shop({ products, cartItemCount = 0 }: { products: Product[], cartItemCount?: number }) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    // Filter products locally for a snappier experience, though we could do it server-side
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                              product.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || product.category === category;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', 'Seafood', 'Equipment', 'Services'];

    return (
        <>
            <Head title="Marketplace" />
            <div className="flex h-full flex-1 flex-col bg-background">
                {/* Header / Hero */}
                <div className="bg-secondary/50 py-16 px-8 border-b border-border">
                    <div className="max-w-7xl mx-auto text-center space-y-4">
                        <h1 className="text-[44px] font-bold tracking-tight text-foreground">
                            Welcome to the Marketplace
                        </h1>
                        <p className="text-[20px] text-muted-foreground max-w-2xl mx-auto">
                            Discover fresh seafood, top-tier equipment, and reliable services directly from local sellers.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 max-w-2xl mx-auto">
                            <div className="relative w-full">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input 
                                    className="w-full pl-12 h-14 text-lg rounded-full bg-background border-border shadow-sm" 
                                    placeholder="Search for products..." 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto w-full px-8 py-12 flex flex-col md:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <div className="w-full md:w-64 shrink-0 space-y-8">
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Categories</h3>
                            <div className="flex flex-col gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`text-left px-4 py-2 rounded-lg transition-colors ${
                                            category === cat 
                                                ? 'bg-primary text-primary-foreground font-medium' 
                                                : 'hover:bg-secondary text-muted-foreground'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
                                    <SearchIcon className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                                <p className="text-muted-foreground text-lg">Try adjusting your filters or search query.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <div key={product.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                                        <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
                                            {product.image ? (
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                    No Image
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-border">
                                                {product.category}
                                            </div>
                                        </div>
                                        
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex justify-between items-start gap-4 mb-2">
                                                <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
                                                    {product.name}
                                                </h3>
                                                <span className="font-bold text-lg text-primary whitespace-nowrap">
                                                    ${parseFloat(product.price).toFixed(2)}
                                                </span>
                                            </div>
                                            
                                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                                                {product.description}
                                            </p>
                                            
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    {product.store.name}
                                                </span>
                                                <Button 
                                                    size="sm" 
                                                    className="rounded-full gap-2 font-semibold"
                                                    onClick={() => {
                                                        router.post('/buyer/cart', { product_id: product.id }, { 
                                                            preserveScroll: true,
                                                            onSuccess: (page) => {
                                                                const flash = page.props.flash as any;
                                                                if (flash?.error) {
                                                                    toast.error(flash.error);
                                                                } else {
                                                                    toast.success(flash?.success || 'Added to cart!');
                                                                }
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <ShoppingCartIcon className="w-4 h-4" />
                                                    Add
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating Cart Tab */}
                {cartItemCount > 0 && (
                    <div className="fixed bottom-8 right-8 z-50">
                        <Button 
                            asChild
                            size="lg"
                            className="rounded-full shadow-2xl gap-3 font-semibold px-6 h-14 bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300"
                        >
                            <Link href="/buyer/cart">
                                <ShoppingCartIcon className="w-5 h-5" />
                                <span>{cartItemCount} {cartItemCount === 1 ? 'Item' : 'Items'} in Cart</span>
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
