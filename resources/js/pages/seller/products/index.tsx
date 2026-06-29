import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category?: string;
    image?: string;
}

export default function SellerProducts({ products }: { products: Product[] }) {
    return (
        <>
            <Head title="My Products" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-5xl mx-auto w-full">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-2">
                                My Products
                            </h1>
                            <p className="text-[17px] text-muted-foreground">
                                Manage your store's inventory and listings.
                            </p>
                        </div>
                        <Button asChild className="rounded-full h-10 px-6">
                            <Link href="/seller/products/create">
                                + Add Product
                            </Link>
                        </Button>
                    </div>
                    
                    {products.length === 0 ? (
                        <div className="bg-background border border-border rounded-[18px] p-12 min-h-[40vh] flex flex-col items-center justify-center text-center">
                            <div className="h-20 w-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-muted-foreground">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-[20px] font-semibold text-foreground mb-2">No products yet</h3>
                            <p className="text-[15px] text-muted-foreground max-w-[300px] mb-8">
                                You haven't added any products to your store. Let's get started by creating your first listing.
                            </p>
                            <Button asChild className="rounded-full h-10 px-8">
                                <Link href="/seller/products/create">Add First Product</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <Card key={product.id} className="overflow-hidden border-border rounded-[18px] hover:shadow-md transition-shadow">
                                    <div className="h-48 w-full bg-secondary flex items-center justify-center overflow-hidden">
                                        {product.image ? (
                                            <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-muted-foreground/30">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                                            <span className="font-bold text-primary">${Number(product.price).toFixed(2)}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-2">
                                                {product.category && (
                                                    <Badge variant="secondary" className="font-normal">{product.category}</Badge>
                                                )}
                                                <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                    {product.stock} in stock
                                                </span>
                                            </div>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/seller/products/${product.id}/edit`}>Edit</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

SellerProducts.layout = {
    breadcrumbs: [
        {
            title: 'My Products',
            href: '/seller/products',
        },
    ],
};
