import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { PackageIcon } from 'lucide-react';

interface OrderItem {
    id: number;
    quantity: number;
    price: string;
    product: {
        name: string;
        image: string | null;
        store: { name: string };
    };
}

interface Order {
    id: number;
    status: string;
    total_amount: string;
    shipping_address: string;
    created_at: string;
    items: OrderItem[];
}

export default function BuyerOrders({ orders = [] }: { orders: Order[] }) {
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

                    {orders.length === 0 ? (
                        <div className="bg-background border border-border rounded-3xl p-16 flex flex-col items-center justify-center text-center shadow-sm">
                            <h3 className="text-2xl font-semibold mb-2">No orders yet</h3>
                            <p className="text-muted-foreground text-lg mb-8 max-w-sm">
                                When you place an order, it will appear here.
                            </p>
                            <Button asChild size="lg" className="rounded-full">
                                <Link href="/buyer/shop">Start Shopping</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-background border border-border rounded-3xl p-8 shadow-sm">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border pb-4 mb-4 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Order ID: #{order.id}</p>
                                            <p className="text-sm text-muted-foreground">Placed: {new Date(order.created_at).toLocaleDateString()}</p>
                                            <p className="text-sm text-muted-foreground">Status: <span className="font-semibold capitalize text-primary">{order.status}</span></p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-xl">${parseFloat(order.total_amount).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                                                    <PackageIcon className="w-8 h-8 text-muted-foreground" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.product.name}</p>
                                                    <p className="text-sm text-muted-foreground">{item.product.store.name}</p>
                                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity} x ${parseFloat(item.price).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-border">
                                        <p className="text-sm text-muted-foreground">Shipping Address: {order.shipping_address}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
