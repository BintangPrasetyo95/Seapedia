import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface OrderItem {
    id: number;
    product: { name: string; price: string };
    quantity: number;
    price: string;
}

interface Order {
    id: number;
    total_amount: string;
    status: string;
    shipping_address: string;
    created_at: string;
    user: { name: string; email: string };
    items: OrderItem[];
}

export default function SellerOrders({ orders }: { orders: Order[] }) {
    const handleStatusChange = (orderId: number, newStatus: string) => {
        router.put(`/seller/orders/${orderId}`, { status: newStatus }, { 
            preserveScroll: true,
            onSuccess: () => toast.success('Order status updated!')
        });
    };

    return (
        <>
            <Head title="Manage Orders" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-5xl mx-auto w-full">
                    <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-4">
                        Manage Orders
                    </h1>
                    <p className="text-[21px] font-semibold tracking-[0.231px] text-muted-foreground mb-12">
                        View and update the status of your customers' orders.
                    </p>
                    
                    {orders.length === 0 ? (
                        <div className="bg-background border border-border rounded-[18px] p-12 min-h-[40vh] flex flex-col items-center justify-center">
                            <p className="text-[17px] text-muted-foreground tracking-[-0.374px]">You have no orders yet.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-background border border-border rounded-[18px] p-8 flex flex-col gap-6">
                                    <div className="flex justify-between items-start border-b border-border pb-6">
                                        <div>
                                            <h3 className="text-[17px] font-semibold tracking-[-0.374px] text-foreground">Order #{order.id}</h3>
                                            <p className="text-[15px] text-muted-foreground mt-1">
                                                Placed on {new Date(order.created_at).toLocaleDateString()} by {order.user.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[17px] font-semibold">${parseFloat(order.total_amount).toFixed(2)}</span>
                                            <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                                                <SelectTrigger className="w-[140px]">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Pending">Pending</SelectItem>
                                                    <SelectItem value="Processing">Processing</SelectItem>
                                                    <SelectItem value="Shipped">Shipped</SelectItem>
                                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-[15px] font-semibold mb-3">Items</h4>
                                            <div className="flex flex-col gap-3">
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="flex justify-between text-[15px]">
                                                        <span>{item.quantity}x {item.product?.name || 'Unknown Product'}</span>
                                                        <span className="text-muted-foreground">${parseFloat(item.price).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-[15px] font-semibold mb-3">Shipping Address</h4>
                                            <p className="text-[15px] text-muted-foreground whitespace-pre-wrap">
                                                {order.shipping_address || 'No shipping address provided.'}
                                            </p>
                                        </div>
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

SellerOrders.layout = {
    breadcrumbs: [
        {
            title: 'Manage Orders',
            href: '#',
        },
    ],
};
