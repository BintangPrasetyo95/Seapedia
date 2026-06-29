import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BuyerWallet({ balance = 0 }: { balance: string | number }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
    });

    const handleTopup = (e: React.FormEvent) => {
        e.preventDefault();
        post('/buyer/wallet/topup', {
            onSuccess: () => reset('amount'),
        });
    };

    return (
        <>
            <Head title="My Wallet" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary/50 p-12 lg:p-20 min-h-screen">
                <div className="max-w-5xl mx-auto w-full">
                    <h1 className="text-[36px] font-bold tracking-tight text-foreground mb-4">
                        My Wallet
                    </h1>
                    <p className="text-muted-foreground text-lg mb-8">
                        Manage your wallet balance and top up funds.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-background border border-border rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-sm">
                            <h3 className="text-xl font-medium text-muted-foreground mb-4">Current Balance</h3>
                            <p className="text-5xl font-bold text-primary">${parseFloat(balance.toString()).toFixed(2)}</p>
                        </div>
                        
                        <div className="bg-background border border-border rounded-3xl p-10 shadow-sm">
                            <h3 className="text-2xl font-semibold mb-6">Top Up Wallet</h3>
                            <form onSubmit={handleTopup} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount ($)</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        min="1"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={e => setData('amount', e.target.value)}
                                        placeholder="Enter amount to top up"
                                        required
                                        className="h-12 text-lg"
                                    />
                                    {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                                </div>
                                <Button type="submit" disabled={processing} size="lg" className="w-full rounded-full h-14 text-[16px]">
                                    {processing ? 'Processing...' : 'Top Up'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

BuyerWallet.layout = {
    breadcrumbs: [
        {
            title: 'My Wallet',
            href: '#',
        },
    ],
};
