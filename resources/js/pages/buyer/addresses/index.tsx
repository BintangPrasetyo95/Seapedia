import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2Icon, MapPinIcon } from 'lucide-react';
import { useState } from 'react';

interface Address {
    id: number;
    name: string;
    full_address: string;
    is_default: boolean;
}

export default function BuyerAddresses({ addresses = [] }: { addresses: Address[] }) {
    const [isAdding, setIsAdding] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        full_address: '',
        is_default: false,
    });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        post('/buyer/addresses', {
            onSuccess: () => {
                reset();
                setIsAdding(false);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this address?')) {
            router.delete(`/buyer/addresses/${id}`);
        }
    };

    return (
        <>
            <Head title="My Addresses" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary/50 p-12 lg:p-20 min-h-screen">
                <div className="max-w-5xl mx-auto w-full">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-[36px] font-bold tracking-tight text-foreground mb-2">
                                My Addresses
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Manage your delivery addresses.
                            </p>
                        </div>
                        {!isAdding && (
                            <Button onClick={() => setIsAdding(true)} size="lg" className="rounded-full">
                                Add New Address
                            </Button>
                        )}
                    </div>

                    {isAdding && (
                        <div className="bg-background border border-border rounded-3xl p-8 mb-8 shadow-sm">
                            <h3 className="text-xl font-semibold mb-6">Add New Address</h3>
                            <form onSubmit={handleAdd} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Address Label (e.g. Home, Work)</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                        placeholder="Home"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="full_address">Full Address</Label>
                                    <Textarea
                                        id="full_address"
                                        value={data.full_address}
                                        onChange={e => setData('full_address', e.target.value)}
                                        required
                                        placeholder="123 Main St..."
                                        rows={3}
                                    />
                                    {errors.full_address && <p className="text-red-500 text-sm">{errors.full_address}</p>}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_default"
                                        checked={data.is_default}
                                        onCheckedChange={(checked) => setData('is_default', checked as boolean)}
                                    />
                                    <label
                                        htmlFor="is_default"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Set as default address
                                    </label>
                                </div>
                                <div className="flex gap-4">
                                    <Button type="submit" disabled={processing} className="rounded-full px-8">Save Address</Button>
                                    <Button type="button" variant="outline" onClick={() => setIsAdding(false)} className="rounded-full px-8">Cancel</Button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((address) => (
                            <div key={address.id} className="bg-background border border-border rounded-3xl p-8 shadow-sm relative group">
                                {address.is_default && (
                                    <span className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                                        Default
                                    </span>
                                )}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                                        <MapPinIcon className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">{address.name}</h4>
                                        <p className="text-muted-foreground mt-2">{address.full_address}</p>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={() => handleDelete(address.id)}
                                    >
                                        <Trash2Icon className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {addresses.length === 0 && !isAdding && (
                            <div className="col-span-1 md:col-span-2 text-center py-12">
                                <p className="text-muted-foreground text-lg">No addresses found. Add one to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

BuyerAddresses.layout = {
    breadcrumbs: [
        {
            title: 'My Addresses',
            href: '#',
        },
    ],
};
