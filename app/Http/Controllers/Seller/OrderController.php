<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $store = auth()->user()->store;
        
        if (!$store) {
            return redirect()->route('seller.store.create');
        }

        $orders = $store->orders()
            ->with(['user', 'items.product'])
            ->latest()
            ->get();

        return inertia('seller/orders/index', [
            'orders' => $orders
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $store = auth()->user()->store;
        
        if (!$store || $order->store_id !== $store->id) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|string|in:Pending,Processing,Shipped,Delivered,Cancelled',
        ]);

        $order->update(['status' => $validated['status']]);

        return back()->with('success', 'Order status updated successfully!');
    }
}
