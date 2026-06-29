import { Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { Button } from '@/components/ui/button';

import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth, metrics, recent_activity } = usePage().props as any;
    const activeRole = auth?.active_role || 'Guest';

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-4xl mx-auto w-full">
                    <div className="flex justify-between items-end mb-4">
                        <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground">
                            Welcome back, {auth?.user?.name}.
                        </h1>
                        {activeRole === 'Seller' && (
                            <Button asChild className="rounded-full px-6">
                                <Link href="/seller/products">+ Add Product</Link>
                            </Button>
                        )}
                    </div>
                    <p className="text-[21px] font-semibold tracking-[0.231px] text-muted-foreground mb-12">
                        You are currently logged in as a <span className="text-primary">{activeRole}</span>.
                    </p>

                    {activeRole === 'Seller' && (
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="bg-background border border-border rounded-[18px] p-8">
                                <h3 className="text-[17px] font-semibold tracking-[-0.374px] text-foreground">Total Orders</h3>
                                <p className="text-[34px] font-semibold tracking-[-0.374px] mt-2">{metrics?.total_orders || 0}</p>
                            </div>
                            <div className="bg-background border border-border rounded-[18px] p-8">
                                <h3 className="text-[17px] font-semibold tracking-[-0.374px] text-foreground">Active Listings</h3>
                                <p className="text-[34px] font-semibold tracking-[-0.374px] mt-2">{metrics?.active_listings || 0}</p>
                            </div>
                            <div className="bg-background border border-border rounded-[18px] p-8">
                                <h3 className="text-[17px] font-semibold tracking-[-0.374px] text-foreground">Revenue</h3>
                                <p className="text-[34px] font-semibold tracking-[-0.374px] mt-2">${parseFloat(metrics?.revenue || 0).toFixed(2)}</p>
                            </div>
                        </div>
                    )}

                    {activeRole === 'Buyer' && (
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="bg-background border border-border rounded-[18px] p-8">
                                <h3 className="text-[17px] font-semibold tracking-[-0.374px] text-foreground">Orders Placed</h3>
                                <p className="text-[34px] font-semibold tracking-[-0.374px] mt-2">{metrics?.total_orders || 0}</p>
                            </div>
                            <div className="bg-background border border-border rounded-[18px] p-8">
                                <h3 className="text-[17px] font-semibold tracking-[-0.374px] text-foreground">Total Spent</h3>
                                <p className="text-[34px] font-semibold tracking-[-0.374px] mt-2">${parseFloat(metrics?.total_spent || 0).toFixed(2)}</p>
                            </div>
                            <div className="bg-background border border-border rounded-[18px] p-8">
                                <h3 className="text-[17px] font-semibold tracking-[-0.374px] text-foreground">Wallet Balance</h3>
                                <p className="text-[34px] font-semibold tracking-[-0.374px] mt-2">${parseFloat(metrics?.wallet_balance || 0).toFixed(2)}</p>
                            </div>
                        </div>
                    )}
                    
                    <div className="bg-background border border-border rounded-[18px] p-12 mt-6 min-h-[40vh] flex flex-col">
                        <h2 className="text-[28px] font-normal tracking-[0.196px] text-foreground mb-8">Recent Activity</h2>
                        
                        {recent_activity && recent_activity.length > 0 ? (
                            <div className="flex flex-col gap-4 flex-1">
                                {recent_activity.map((order: any) => (
                                    <div key={order.id} className="flex justify-between items-center border-b border-border pb-4 last:border-0">
                                        <div>
                                            <p className="font-semibold text-foreground">Order #{order.id}</p>
                                            <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-foreground">${parseFloat(order.total_amount).toFixed(2)}</p>
                                            <p className="text-sm text-muted-foreground">{order.status}</p>
                                        </div>
                                    </div>
                                ))}
                                {activeRole === 'Buyer' && (
                                    <Button variant="outline" asChild className="mt-auto rounded-full w-fit self-center">
                                        <Link href="/buyer/orders">View All Orders</Link>
                                    </Button>
                                )}
                                {activeRole === 'Seller' && (
                                    <Button variant="outline" asChild className="mt-auto rounded-full w-fit self-center">
                                        <Link href="/seller/orders">Manage Orders</Link>
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center flex-1">
                                {activeRole === 'Seller' ? (
                                    <div className="text-center">
                                        <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-muted-foreground">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                        <p className="text-[17px] text-muted-foreground tracking-[-0.374px] mb-4">Start selling your items today.</p>
                                        <Button variant="outline" asChild className="rounded-full">
                                            <Link href="/seller/products">Manage Inventory</Link>
                                        </Button>
                                    </div>
                                ) : activeRole === 'Buyer' ? (
                                    <div className="text-center">
                                        <p className="text-[17px] text-muted-foreground tracking-[-0.374px] mb-4">You haven't placed any orders yet.</p>
                                        <Button variant="outline" asChild className="rounded-full">
                                            <Link href="/buyer/shop">Go to Marketplace</Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <p className="text-[17px] text-muted-foreground tracking-[-0.374px]">No recent activity in your {activeRole} workspace.</p>
                                )}
                            </div>
                        )}
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
