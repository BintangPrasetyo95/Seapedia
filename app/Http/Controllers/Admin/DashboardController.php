<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Store;
use App\Models\Product;
use App\Models\Order;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $metrics = [
            'total_users' => User::count(),
            'total_stores' => Store::count(),
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'total_deliveries' => Order::where('status', 'Pesanan Selesai')->count(),
        ];

        return inertia('admin/dashboard', [
            'metrics' => $metrics
        ]);
    }

    public function simulateNextDay(Request $request)
    {
        // Advance time by 1 day or check overdue based on current time + offset
        // Since we cannot easily mock Carbon::now() across requests reliably without session or DB trickery,
        // we will instead find orders that WOULD be overdue if we advanced 1 day, OR just rely on real dates but we can artificially shift created_at back by 1 day for testing.
        
        // Actually, to "simulate next day", let's shift all incomplete orders' created_at back by 1 day.
        $orders = Order::whereNotIn('status', ['Pesanan Selesai', 'Dikembalikan'])->get();
        foreach ($orders as $order) {
            $order->created_at = $order->created_at->subDay();
            $order->save(['timestamps' => false]);
        }

        // Now process overdue
        $this->processOverdueOrders();

        return back()->with('success', 'Simulated next day and processed overdue orders.');
    }

    private function processOverdueOrders()
    {
        $orders = Order::whereNotIn('status', ['Pesanan Selesai', 'Dikembalikan'])->get();
        $now = now();

        foreach ($orders as $order) {
            $slaDays = 5; // Default for Regular
            if ($order->shipping_method === 'Instant') {
                $slaDays = 1;
            } elseif ($order->shipping_method === 'Next Day') {
                $slaDays = 2;
            }

            if ($order->created_at->diffInDays($now) >= $slaDays) {
                // Cancel order
                $order->update(['status' => 'Dikembalikan']);
                
                // Refund Buyer
                $buyer = $order->user;
                if ($buyer) {
                    $buyer->increment('wallet_balance', $order->total_amount);
                    \App\Models\WalletTransaction::create([
                        'user_id' => $buyer->id,
                        'amount' => $order->total_amount,
                        'type' => 'credit',
                        'description' => 'Refund for overdue order #' . $order->id
                    ]);
                }

                // Restore Stock
                foreach ($order->items as $item) {
                    $product = $item->product;
                    if ($product) {
                        $product->increment('stock', $item->quantity);
                    }
                }
            }
        }
    }
}
