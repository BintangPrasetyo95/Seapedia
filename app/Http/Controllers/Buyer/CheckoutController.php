<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $cart = Cart::where('user_id', $user->id)->first();
        
        $cartItems = $cart ? $cart->items()->with('product.store')->get() : [];

        if (count($cartItems) === 0) {
            return redirect()->route('buyer.cart.index')->with('error', 'Your cart is empty.');
        }

        return inertia('buyer/checkout/index', [
            'cartItems' => $cartItems,
            'addresses' => $user->addresses,
            'walletBalance' => $user->wallet_balance
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string|max:255',
        ]);

        $user = auth()->user();
        $cart = Cart::where('user_id', $user->id)->first();
        
        if (!$cart || $cart->items()->count() === 0) {
            return redirect()->route('buyer.cart.index')->with('error', 'Your cart is empty.');
        }

        $cartItems = $cart->items()->with('product')->get();
        
        $grandTotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        if ($user->wallet_balance < $grandTotal) {
            return back()->with('error', 'Insufficient wallet balance. Please top up your wallet.');
        }

        // Group items by store_id
        $itemsByStore = $cartItems->groupBy('product.store_id');

        DB::beginTransaction();
        try {
            foreach ($itemsByStore as $storeId => $items) {
                $totalAmount = $items->sum(function ($item) {
                    return $item->quantity * $item->product->price;
                });

                $order = Order::create([
                    'user_id' => $user->id,
                    'store_id' => $storeId,
                    'status' => 'pending',
                    'total_amount' => $totalAmount,
                    'shipping_address' => $request->shipping_address,
                ]);

                foreach ($items as $item) {
                    $order->items()->create([
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'price' => $item->product->price,
                    ]);
                }
            }

            // Clear the cart
            $cart->items()->delete();
            
            // Deduct wallet balance
            $user->decrement('wallet_balance', $grandTotal);

            DB::commit();

            return redirect()->route('buyer.orders.index')->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Something went wrong. Please try again.');
        }
    }
}
