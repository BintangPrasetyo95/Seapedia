import { Head, router } from '@inertiajs/react';

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

export default function DriverJobs({ available_jobs, active_jobs }: { available_jobs: Order[], active_jobs: Order[] }) {
    const takeJob = (id: number) => {
        router.post('/driver/jobs/' + id + '/take');
    };

    const completeJob = (id: number) => {
        router.post('/driver/jobs/' + id + '/complete');
    };

    return (
        <>
            <Head title="Job Board" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-5xl mx-auto w-full">
                    <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-4">
                        Job Board
                    </h1>
                    <p className="text-[21px] font-semibold tracking-[0.231px] text-muted-foreground mb-12">
                        Find and manage your delivery assignments.
                    </p>
                    
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-[28px] font-semibold tracking-[0.196px] text-foreground mb-6">Active Jobs</h2>
                            {active_jobs.length === 0 ? (
                                <div className="bg-background border border-border rounded-[18px] p-12 flex flex-col items-center justify-center">
                                    <p className="text-[17px] text-muted-foreground tracking-[-0.374px]">No active jobs at the moment.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {active_jobs.map((job) => (
                                        <div key={job.id} className="bg-background border border-border rounded-[18px] p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="bg-primary/10 text-primary text-[14px] px-3 py-1 rounded-full font-medium tracking-[-0.224px]">
                                                        {job.shipping_method || 'Regular'}
                                                    </span>
                                                    <span className="text-[17px] font-semibold text-foreground tracking-[-0.374px]">
                                                        Rp {Number(job.delivery_fee).toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                                <h3 className="text-[17px] font-semibold tracking-[-0.374px] text-foreground mb-2">Order #{job.id}</h3>
                                                <div className="text-[14px] text-muted-foreground tracking-[-0.224px] space-y-1 mb-6">
                                                    <p><span className="font-medium text-foreground">From:</span> {job.store?.name}</p>
                                                    <p><span className="font-medium text-foreground">To:</span> {job.user?.name}</p>
                                                    <p className="line-clamp-2"><span className="font-medium text-foreground">Address:</span> {job.shipping_address}</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => completeJob(job.id)}
                                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-[11px] text-[17px] transition-transform active:scale-95"
                                            >
                                                Confirm Completed
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section>
                            <h2 className="text-[28px] font-semibold tracking-[0.196px] text-foreground mb-6">Available Jobs</h2>
                            {available_jobs.length === 0 ? (
                                <div className="bg-background border border-border rounded-[18px] p-12 flex flex-col items-center justify-center">
                                    <p className="text-[17px] text-muted-foreground tracking-[-0.374px]">No new jobs available right now.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {available_jobs.map((job) => (
                                        <div key={job.id} className="bg-background border border-border rounded-[18px] p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="bg-muted text-muted-foreground text-[14px] px-3 py-1 rounded-full font-medium tracking-[-0.224px]">
                                                        {job.shipping_method || 'Regular'}
                                                    </span>
                                                    <span className="text-[17px] font-semibold text-foreground tracking-[-0.374px]">
                                                        Rp {Number(job.delivery_fee).toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                                <h3 className="text-[17px] font-semibold tracking-[-0.374px] text-foreground mb-2">Order #{job.id}</h3>
                                                <div className="text-[14px] text-muted-foreground tracking-[-0.224px] space-y-1 mb-6">
                                                    <p><span className="font-medium text-foreground">From:</span> {job.store?.name}</p>
                                                    <p><span className="font-medium text-foreground">To:</span> {job.user?.name}</p>
                                                    <p className="line-clamp-2"><span className="font-medium text-foreground">Address:</span> {job.shipping_address}</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => takeJob(job.id)}
                                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-[11px] text-[17px] transition-transform active:scale-95"
                                            >
                                                Take Job
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

DriverJobs.layout = {
    breadcrumbs: [
        {
            title: 'Job Board',
            href: '/driver/jobs',
        },
    ],
};
