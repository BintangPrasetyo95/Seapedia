import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';

import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const activeRole = auth?.active_role || 'Guest';

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-4xl mx-auto w-full">
                    <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-4">
                        Welcome back, {auth?.user?.name}.
                    </h1>
                    <p className="text-[21px] font-semibold tracking-[0.231px] text-muted-foreground mb-12">
                        You are currently logged in as a <span className="text-primary">{activeRole}</span>.
                    </p>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="bg-background border border-border rounded-[18px] p-8">
                            <h3 className="text-[17px] font-semibold tracking-[-0.374px] text-foreground">Total Orders</h3>
                            <p className="text-[34px] font-semibold tracking-[-0.374px] mt-2">0</p>
                        </div>
                        <div className="bg-background border border-border rounded-[18px] p-8">
                            <h3 className="text-[17px] font-semibold tracking-[-0.374px] text-foreground">Active Listings</h3>
                            <p className="text-[34px] font-semibold tracking-[-0.374px] mt-2">0</p>
                        </div>
                        <div className="bg-background border border-border rounded-[18px] p-8">
                            <h3 className="text-[17px] font-semibold tracking-[-0.374px] text-foreground">Revenue</h3>
                            <p className="text-[34px] font-semibold tracking-[-0.374px] mt-2">$0.00</p>
                        </div>
                    </div>
                    
                    <div className="bg-background border border-border rounded-[18px] p-12 mt-6 min-h-[40vh] flex flex-col">
                        <h2 className="text-[28px] font-normal tracking-[0.196px] text-foreground mb-8">Recent Activity</h2>
                        <div className="flex flex-col items-center justify-center flex-1">
                            <p className="text-[17px] text-muted-foreground tracking-[-0.374px]">No recent activity in your {activeRole} workspace.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
