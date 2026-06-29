import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

export default function BuyerCheckout({ cartItems }: { cartItems: CartItem[] }) {
    const { data, setData, post, processing, errors } = useForm({
        shipping_address: '',
    });

    const totalAmount = cartItems?.reduce((total, item) => {
        return total + (parseFloat(item.product.price) * item.quantity);
    }, 0) || 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/buyer/checkout');
    };

    return (
        <>
            <Head title="Checkout" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-5xl mx-auto w-full">
                    <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-12">
                        Checkout
                    </h1>
                    
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <div className="bg-background border border-border rounded-[18px] p-8">
                                <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="shipping_address">Delivery Address</Label>
                                        <Input
                                            id="shipping_address"
                                            value={data.shipping_address}
                                            onChange={e => setData('shipping_address', e.target.value)}
                                            placeholder="Enter your full delivery address"
                                            required
                                            className="h-12"
                                        />
                                        {errors.shipping_address && <p className="text-red-500 text-sm">{errors.shipping_address}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <div className="bg-background border border-border rounded-[18px] p-8 sticky top-8">
                                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                                
                                <div className="space-y-4 mb-6">
                                    {cartItems?.map(item => (
                                        <div key={item.id} className="flex justify-between items-start text-sm">
                                            <div className="flex-1 pr-4">
                                                <p className="font-medium">{item.product.name}</p>
                                                <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="font-medium">${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-border mb-8 space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="font-semibold text-lg">Total</span>
                                        <span className="font-bold text-2xl text-primary">${totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                                
                                <Button type="submit" disabled={processing} size="lg" className="w-full rounded-full text-[16px] h-14">
                                    {processing ? 'Processing...' : 'Place Order'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

BuyerCheckout.layout = {
    breadcrumbs: [
        {
            title: 'Checkout',
            href: '#',
        },
    ],
};
