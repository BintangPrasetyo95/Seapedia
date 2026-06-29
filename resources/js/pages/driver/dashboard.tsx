import { Head } from '@inertiajs/react';

interface Metrics {
    total_earnings: number;
    completed_jobs: number;
}

interface Order {
    id: number;
    store_id: number;
    user_id: number;
    status: string;
    total_amount: number;
    shipping_address: string;
    shipping_method: string;
    delivery_fee: number;
    store: { name: string };
    user: { name: string };
    created_at: string;
}

export default function DriverDashboard({ metrics, recent_history }: { metrics: Metrics, recent_history: Order[] }) {
    return (
        <>
            <Head title="Driver Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-5xl mx-auto w-full">
                    <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-4">
                        Driver Dashboard
                    </h1>
                    <p className="text-[21px] font-semibold tracking-[0.231px] text-muted-foreground mb-12">
                        Track your earnings and delivery performance.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-background border border-border rounded-[18px] p-8 flex flex-col justify-center">
                            <p className="text-[17px] font-semibold tracking-[-0.374px] text-muted-foreground mb-2">Total Earnings</p>
                            <p className="text-[40px] font-semibold tracking-[-0.01em] text-foreground">
                                Rp {Number(metrics.total_earnings).toLocaleString('id-ID')}
                            </p>
                        </div>
                        <div className="bg-background border border-border rounded-[18px] p-8 flex flex-col justify-center">
                            <p className="text-[17px] font-semibold tracking-[-0.374px] text-muted-foreground mb-2">Completed Jobs</p>
                            <p className="text-[40px] font-semibold tracking-[-0.01em] text-foreground">
                                {metrics.completed_jobs}
                            </p>
                        </div>
                    </div>

                    <section>
                        <h2 className="text-[28px] font-semibold tracking-[0.196px] text-foreground mb-6">Recent History</h2>
                        {recent_history.length === 0 ? (
                            <div className="bg-background border border-border rounded-[18px] p-12 min-h-[20vh] flex flex-col items-center justify-center">
                                <p className="text-[17px] text-muted-foreground tracking-[-0.374px]">No completed jobs yet.</p>
                            </div>
                        ) : (
                            <div className="bg-background border border-border rounded-[18px] overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="py-4 px-6 text-[14px] font-semibold tracking-[-0.224px] text-muted-foreground">Order ID</th>
                                            <th className="py-4 px-6 text-[14px] font-semibold tracking-[-0.224px] text-muted-foreground">Store</th>
                                            <th className="py-4 px-6 text-[14px] font-semibold tracking-[-0.224px] text-muted-foreground">Method</th>
                                            <th className="py-4 px-6 text-[14px] font-semibold tracking-[-0.224px] text-muted-foreground">Earnings</th>
                                            <th className="py-4 px-6 text-[14px] font-semibold tracking-[-0.224px] text-muted-foreground text-right">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {recent_history.map((job) => (
                                            <tr key={job.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="py-4 px-6 text-[17px] text-foreground font-medium tracking-[-0.374px]">#{job.id}</td>
                                                <td className="py-4 px-6 text-[17px] text-muted-foreground tracking-[-0.374px]">{job.store?.name}</td>
                                                <td className="py-4 px-6">
                                                    <span className="bg-secondary text-secondary-foreground text-[12px] px-2 py-1 rounded-full font-medium tracking-[-0.12px]">
                                                        {job.shipping_method || 'Regular'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-[17px] text-foreground tracking-[-0.374px]">
                                                    Rp {Number(job.delivery_fee).toLocaleString('id-ID')}
                                                </td>
                                                <td className="py-4 px-6 text-[14px] text-muted-foreground tracking-[-0.224px] text-right">
                                                    {new Date(job.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
}

DriverDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Driver Dashboard',
            href: '/driver/dashboard',
        },
    ],
};
