import { Head, Link, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

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

interface Address {
    id: number;
    name: string;
    full_address: string;
    is_default: boolean;
}

export default function BuyerCheckout({ cartItems, addresses, walletBalance }: { cartItems: CartItem[], addresses: Address[], walletBalance: number }) {
    const defaultAddress = addresses?.find(a => a.is_default) || addresses?.[0];
    
    const [discountCodeInput, setDiscountCodeInput] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isValidatingDiscount, setIsValidatingDiscount] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        shipping_address: defaultAddress ? defaultAddress.full_address : '',
        shipping_method: 'Regular',
        discount_code: '',
    });

    const subtotal = cartItems?.reduce((total, item) => {
        return total + (parseFloat(item.product.price) * item.quantity);
    }, 0) || 0;

    const deliveryFees = {
        'Instant': 15,
        'Next Day': 10,
        'Regular': 5,
    };
    
    const deliveryFee = deliveryFees[data.shipping_method as keyof typeof deliveryFees] || 0;
    
    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const tax = discountedSubtotal * 0.12;
    const totalAmount = discountedSubtotal + tax + deliveryFee;

    const applyDiscount = async () => {
        if (!discountCodeInput) return;
        setIsValidatingDiscount(true);
        try {
            const res = await axios.post('/buyer/checkout/discount', {
                code: discountCodeInput,
                subtotal: subtotal
            });
            setDiscountAmount(res.data.discount_amount);
            setData('discount_code', res.data.code);
            toast.success(res.data.message);
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Invalid discount code');
            setDiscountAmount(0);
            setData('discount_code', '');
        } finally {
            setIsValidatingDiscount(false);
        }
    };

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
                                        {addresses?.length > 0 ? (
                                            <div className="grid gap-4">
                                                {addresses.map(address => (
                                                    <div 
                                                        key={address.id} 
                                                        onClick={() => setData('shipping_address', address.full_address)}
                                                        className={`p-4 border rounded-xl cursor-pointer transition-colors ${data.shipping_address === address.full_address ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                                                    >
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <p className="font-semibold">{address.name}</p>
                                                            {address.is_default && <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">Default</span>}
                                                        </div>
                                                        <p className="text-muted-foreground text-sm">{address.full_address}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center p-8 border border-dashed rounded-xl">
                                                <p className="text-muted-foreground mb-4">You don't have any delivery addresses yet.</p>
                                                <Button type="button" variant="outline" onClick={() => router.visit('/buyer/addresses')}>
                                                    Add an Address
                                                </Button>
                                            </div>
                                        )}
                                        {errors.shipping_address && <p className="text-destructive text-sm">{errors.shipping_address}</p>}
                                </div>
                            </div>

                            <div className="bg-background border border-border rounded-[18px] p-8">
                                <h2 className="text-2xl font-semibold mb-6">Shipping Method</h2>
                                <div className="grid gap-4">
                                    {(Object.entries(deliveryFees) as [string, number][]).map(([method, fee]) => (
                                        <div 
                                            key={method}
                                            onClick={() => setData('shipping_method', method)}
                                            className={`p-4 border rounded-xl cursor-pointer transition-colors flex justify-between items-center ${data.shipping_method === method ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                                        >
                                            <p className="font-semibold">{method} Delivery</p>
                                            <p className="font-medium text-primary">${fee.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-background border border-border rounded-[18px] p-8 mt-8">
                                <h2 className="text-2xl font-semibold mb-6">Discount Code</h2>
                                <div className="flex gap-4">
                                    <Input 
                                        placeholder="Enter code (e.g., WELCOME10)" 
                                        value={discountCodeInput}
                                        onChange={(e) => setDiscountCodeInput(e.target.value)}
                                        className="h-12 text-lg"
                                    />
                                    <Button type="button" onClick={applyDiscount} disabled={isValidatingDiscount || !discountCodeInput} className="h-12 px-6">
                                        Apply
                                    </Button>
                                </div>
                                {data.discount_code && (
                                    <p className="text-green-600 font-medium mt-4">Applied: {data.discount_code} (-${discountAmount.toFixed(2)})</p>
                                )}
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

                                <div className="pt-6 border-t border-border mb-6 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    {discountAmount > 0 && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span className="font-medium">Discount ({data.discount_code})</span>
                                            <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Delivery Fee ({data.shipping_method})</span>
                                        <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax (12% PPN)</span>
                                        <span className="font-medium">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-border mb-8 space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="font-semibold text-lg">Grand Total</span>
                                        <span className="font-bold text-2xl text-primary">${totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Wallet Balance</span>
                                        <span className={walletBalance < totalAmount ? "text-destructive font-medium" : "text-green-600 font-medium"}>
                                            ${parseFloat(walletBalance?.toString() || '0').toFixed(2)}
                                        </span>
                                    </div>
                                    {walletBalance < totalAmount && (
                                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg text-center mt-2">
                                            Insufficient funds. <Link href="/buyer/wallet" className="font-semibold underline">Top up Wallet</Link>
                                        </div>
                                    )}
                                </div>
                                
                                <Button type="submit" disabled={processing || walletBalance < totalAmount || !data.shipping_address} size="lg" className="w-full rounded-full text-[16px] h-14">
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
