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
    subtotal?: string;
    discount_amount?: string;
    tax_amount?: string;
    delivery_fee?: string;
    total_amount: string;
    status: string;
    shipping_address: string;
    created_at: string;
    user: { name: string; email: string };
    items: OrderItem[];
    statusHistories?: { id: number; status: string; created_at: string }[];
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
                                        <div className="flex flex-col items-end gap-2 min-w-[200px]">
                                            <div className="flex flex-col gap-1 text-sm w-full border-b border-border pb-2 mb-2">
                                                <div className="flex justify-between w-full text-muted-foreground"><span>Subtotal:</span> <span>${parseFloat(order.subtotal || '0').toFixed(2)}</span></div>
                                                <div className="flex justify-between w-full text-muted-foreground"><span>Discount:</span> <span>-${parseFloat(order.discount_amount || '0').toFixed(2)}</span></div>
                                                <div className="flex justify-between w-full text-muted-foreground"><span>Delivery:</span> <span>${parseFloat(order.delivery_fee || '0').toFixed(2)}</span></div>
                                                <div className="flex justify-between w-full text-muted-foreground"><span>Tax:</span> <span>${parseFloat(order.tax_amount || '0').toFixed(2)}</span></div>
                                                <div className="flex justify-between w-full font-semibold mt-1"><span>Total:</span> <span>${parseFloat(order.total_amount).toFixed(2)}</span></div>
                                            </div>
                                            <div className="flex justify-end w-full">
                                            <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                                                <SelectTrigger className="w-[140px]">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Sedang Dikemas">Sedang Dikemas</SelectItem>
                                                    <SelectItem value="Menunggu Pengirim">Menunggu Pengirim</SelectItem>
                                                    <SelectItem value="Sedang Dikirim">Sedang Dikirim</SelectItem>
                                                    <SelectItem value="Pesanan Selesai">Pesanan Selesai</SelectItem>
                                                    <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            </div>
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
                                    
                                    {order.statusHistories && order.statusHistories.length > 0 && (
                                        <div className="mt-2 pt-4 border-t border-border">
                                            <h4 className="text-[15px] font-semibold mb-3">Timeline</h4>
                                            <div className="space-y-2">
                                                {order.statusHistories.map(sh => (
                                                    <div key={sh.id} className="flex justify-between text-sm text-muted-foreground">
                                                        <span>{new Date(sh.created_at).toLocaleString()}</span>
                                                        <span className="font-semibold">{sh.status}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
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
