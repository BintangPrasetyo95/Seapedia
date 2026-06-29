import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Trash2Icon, ArrowRightIcon, ShoppingBagIcon } from 'lucide-react';

interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: string;
        image: string | null;
        store: { name: string };
    };
}

export default function Cart({ cartItems }: { cartItems: CartItem[] }) {
    const handleRemove = (itemId: number) => {
        router.delete(`/buyer/cart/${itemId}`, { preserveScroll: true });
    };

    const totalAmount = cartItems.reduce((total, item) => {
        return total + (parseFloat(item.product.price) * item.quantity);
    }, 0);

    return (
        <>
            <Head title="My Cart" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary/50 p-12 lg:p-20 min-h-screen">
                <div className="max-w-5xl mx-auto w-full">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                            <ShoppingBagIcon className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-[36px] font-bold tracking-tight text-foreground">
                                Shopping Cart
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Review your selected items before checkout.
                            </p>
                        </div>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="bg-background border border-border rounded-3xl p-16 flex flex-col items-center justify-center text-center shadow-sm">
                            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
                                <ShoppingBagIcon className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
                            <p className="text-muted-foreground text-lg mb-8 max-w-sm">Looks like you haven't added anything to your cart yet.</p>
                            <Button asChild size="lg" className="rounded-full px-8">
                                <Link href="/buyer/shop">Start Shopping</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Cart Items List */}
                            <div className="flex-1 bg-background border border-border rounded-3xl p-8 shadow-sm h-fit">
                                <div className="flex flex-col gap-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-6 py-6 border-b border-border last:border-0 last:pb-0">
                                            <div className="w-28 h-28 bg-secondary rounded-xl overflow-hidden shrink-0">
                                                {item.product.image ? (
                                                    <img 
                                                        src={item.product.image} 
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                                                )}
                                            </div>
                                            <div className="flex-1 flex flex-col">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <h3 className="font-semibold text-lg line-clamp-1">{item.product.name}</h3>
                                                        <p className="text-sm text-muted-foreground">Sold by {item.product.store.name}</p>
                                                    </div>
                                                    <span className="font-bold text-lg whitespace-nowrap">
                                                        ${parseFloat(item.product.price).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center gap-3 bg-secondary/50 rounded-full px-4 py-1.5 border border-border">
                                                        <span className="text-sm font-medium text-muted-foreground">Qty</span>
                                                        <span className="font-semibold">{item.quantity}</span>
                                                    </div>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm"
                                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2 rounded-full px-4"
                                                        onClick={() => handleRemove(item.id)}
                                                    >
                                                        <Trash2Icon className="w-4 h-4" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="w-full lg:w-96 shrink-0">
                                <div className="bg-background border border-border rounded-3xl p-8 shadow-sm sticky top-8">
                                    <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                                    
                                    <div className="space-y-4 mb-6 text-[15px]">
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Subtotal ({cartItems.length} items)</span>
                                            <span className="text-foreground font-medium">${totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Shipping estimate</span>
                                            <span className="text-foreground font-medium">Calculated at checkout</span>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-6 border-t border-border mb-8">
                                        <div className="flex justify-between items-end">
                                            <span className="font-semibold text-lg">Total</span>
                                            <span className="font-bold text-3xl text-primary">${totalAmount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    
                                    <Button 
                                        size="lg" 
                                        className="w-full rounded-full gap-2 text-[16px] h-14"
                                        onClick={() => router.visit('/buyer/checkout')}
                                    >
                                        Proceed to Checkout
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
