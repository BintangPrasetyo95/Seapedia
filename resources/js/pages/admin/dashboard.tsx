import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Metrics {
    total_users: number;
    total_stores: number;
    total_products: number;
    total_orders: number;
    total_deliveries: number;
}

export default function AdminDashboard({ metrics }: { metrics: Metrics }) {
    const [simulating, setSimulating] = useState(false);

    const simulateNextDay = () => {
        setSimulating(true);
        router.post('/admin/simulate-next-day', {}, {
            onFinish: () => setSimulating(false),
        });
    };

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-5xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                        <div>
                            <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-4">
                                Admin Dashboard
                            </h1>
                            <p className="text-[21px] font-semibold tracking-[0.231px] text-muted-foreground">
                                Platform overview and automated rules.
                            </p>
                        </div>
                        <button 
                            onClick={simulateNextDay}
                            disabled={simulating}
                            className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground rounded-full px-6 py-[11px] text-[17px] transition-transform active:scale-95 whitespace-nowrap shadow-sm"
                        >
                            {simulating ? 'Simulating...' : 'Simulate Next Day (SLA)'}
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {Object.entries(metrics || {}).map(([key, value]) => (
                            <div key={key} className="bg-background border border-border rounded-[18px] p-8 flex flex-col justify-center shadow-sm">
                                <p className="text-[17px] font-semibold tracking-[-0.374px] text-muted-foreground mb-2 capitalize">
                                    {key.replace('_', ' ')}
                                </p>
                                <p className="text-[40px] font-semibold tracking-[-0.01em] text-foreground">
                                    {String(value)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Admin Dashboard',
            href: '/admin/dashboard',
        },
    ],
};
