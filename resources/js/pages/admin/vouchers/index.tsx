import { Head, useForm, router } from '@inertiajs/react';
import React from 'react';

interface Voucher {
    id: number;
    code: string;
    type: string;
    discount_type: string;
    discount_amount: number;
    valid_until: string | null;
    usage_limit: number | null;
    usage_count: number;
}

export default function AdminVouchers({ vouchers = [] }: { vouchers?: Voucher[] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
        type: 'voucher',
        discount_type: 'fixed',
        discount_amount: '',
        valid_until: '',
        usage_limit: ''
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/vouchers', {
            onSuccess: () => reset()
        });
    };

    const deleteVoucher = (id: number) => {
        if(confirm('Delete this voucher?')) {
            router.delete(`/admin/vouchers/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Vouchers" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-5xl mx-auto w-full">
                    <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-4">
                        Manage Vouchers
                    </h1>
                    <p className="text-[21px] font-semibold tracking-[0.231px] text-muted-foreground mb-12">
                        Create and monitor discount codes.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1">
                            <div className="bg-background border border-border rounded-[18px] p-8">
                                <h2 className="text-[21px] font-semibold tracking-[0.231px] text-foreground mb-6">Create New</h2>
                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <label className="block text-[14px] font-semibold tracking-[-0.224px] text-foreground mb-2">Code</label>
                                        <input 
                                            type="text" 
                                            value={data.code} 
                                            onChange={e => setData('code', e.target.value.toUpperCase())}
                                            className="w-full bg-secondary border border-border rounded-[8px] px-4 py-2 text-[17px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" 
                                            placeholder="SUMMER2026"
                                        />
                                        {errors.code && <p className="text-red-500 text-[12px] mt-1">{errors.code}</p>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[14px] font-semibold tracking-[-0.224px] text-foreground mb-2">Type</label>
                                            <select 
                                                value={data.type} 
                                                onChange={e => setData('type', e.target.value)}
                                                className="w-full bg-secondary border border-border rounded-[8px] px-4 py-2 text-[17px] focus:ring-2 focus:ring-primary/20 outline-none"
                                            >
                                                <option value="voucher">Voucher</option>
                                                <option value="promo">Promo</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[14px] font-semibold tracking-[-0.224px] text-foreground mb-2">Discount Type</label>
                                            <select 
                                                value={data.discount_type} 
                                                onChange={e => setData('discount_type', e.target.value)}
                                                className="w-full bg-secondary border border-border rounded-[8px] px-4 py-2 text-[17px] focus:ring-2 focus:ring-primary/20 outline-none"
                                            >
                                                <option value="fixed">Fixed</option>
                                                <option value="percent">Percentage</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[14px] font-semibold tracking-[-0.224px] text-foreground mb-2">Amount</label>
                                        <input 
                                            type="number" 
                                            value={data.discount_amount} 
                                            onChange={e => setData('discount_amount', e.target.value)}
                                            className="w-full bg-secondary border border-border rounded-[8px] px-4 py-2 text-[17px] focus:ring-2 focus:ring-primary/20 outline-none" 
                                        />
                                        {errors.discount_amount && <p className="text-red-500 text-[12px] mt-1">{errors.discount_amount}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[14px] font-semibold tracking-[-0.224px] text-foreground mb-2">Valid Until (Optional)</label>
                                        <input 
                                            type="date" 
                                            value={data.valid_until} 
                                            onChange={e => setData('valid_until', e.target.value)}
                                            className="w-full bg-secondary border border-border rounded-[8px] px-4 py-2 text-[17px] focus:ring-2 focus:ring-primary/20 outline-none" 
                                        />
                                    </div>
                                    {data.type === 'voucher' && (
                                        <div>
                                            <label className="block text-[14px] font-semibold tracking-[-0.224px] text-foreground mb-2">Usage Limit (Optional)</label>
                                            <input 
                                                type="number" 
                                                value={data.usage_limit} 
                                                onChange={e => setData('usage_limit', e.target.value)}
                                                className="w-full bg-secondary border border-border rounded-[8px] px-4 py-2 text-[17px] focus:ring-2 focus:ring-primary/20 outline-none" 
                                            />
                                        </div>
                                    )}
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-[11px] text-[17px] transition-transform active:scale-95 disabled:opacity-50"
                                    >
                                        Save Voucher
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-background border border-border rounded-[18px] overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-border bg-secondary/50">
                                            <th className="py-4 px-6 text-[14px] font-semibold tracking-[-0.224px] text-muted-foreground">Code</th>
                                            <th className="py-4 px-6 text-[14px] font-semibold tracking-[-0.224px] text-muted-foreground">Type</th>
                                            <th className="py-4 px-6 text-[14px] font-semibold tracking-[-0.224px] text-muted-foreground">Amount</th>
                                            <th className="py-4 px-6 text-[14px] font-semibold tracking-[-0.224px] text-muted-foreground">Usage</th>
                                            <th className="py-4 px-6 text-[14px] font-semibold tracking-[-0.224px] text-muted-foreground"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {vouchers.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-8 text-center text-[17px] text-muted-foreground tracking-[-0.374px]">No vouchers created yet.</td>
                                            </tr>
                                        ) : vouchers.map((v) => (
                                            <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="py-4 px-6 text-[17px] text-foreground font-semibold tracking-[-0.374px]">{v.code}</td>
                                                <td className="py-4 px-6">
                                                    <span className="bg-secondary text-secondary-foreground text-[12px] px-2 py-1 rounded-full font-medium tracking-[-0.12px] uppercase">
                                                        {v.type}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-[17px] text-foreground tracking-[-0.374px]">
                                                    {v.discount_type === 'percent' ? `${v.discount_amount}%` : `Rp ${Number(v.discount_amount).toLocaleString('id-ID')}`}
                                                </td>
                                                <td className="py-4 px-6 text-[14px] text-muted-foreground tracking-[-0.224px]">
                                                    {v.usage_count} {v.usage_limit ? `/ ${v.usage_limit}` : ''}
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button onClick={() => deleteVoucher(v.id)} className="text-red-500 hover:text-red-600 text-[14px] font-semibold tracking-[-0.224px]">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminVouchers.layout = {
    breadcrumbs: [
        {
            title: 'Manage Vouchers',
            href: '/admin/vouchers',
        },
    ],
};
