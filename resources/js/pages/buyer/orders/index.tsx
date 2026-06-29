import { Head } from '@inertiajs/react';

export default function BuyerOrders() {
    return (
        <>
            <Head title="My Orders" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary/50 p-12 lg:p-20 min-h-screen">
                <div className="max-w-5xl mx-auto w-full">
                    <h1 className="text-[36px] font-bold tracking-tight text-foreground mb-4">
                        My Orders
                    </h1>
                    <p className="text-muted-foreground text-lg mb-8">
                        View and track your past and current orders.
                    </p>

                    <div className="bg-background border border-border rounded-3xl p-16 flex flex-col items-center justify-center text-center shadow-sm">
                        <h3 className="text-2xl font-semibold mb-2">No orders yet</h3>
                        <p className="text-muted-foreground text-lg mb-8 max-w-sm">
                            When you place an order, it will appear here.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
