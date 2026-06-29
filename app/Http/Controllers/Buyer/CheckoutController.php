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
            'shipping_method' => 'required|string|in:Instant,Next Day,Regular',
            'discount_code' => 'nullable|string'
        ]);

        $user = auth()->user();
        $cart = Cart::where('user_id', $user->id)->first();
        
        if (!$cart || $cart->items()->count() === 0) {
            return redirect()->route('buyer.cart.index')->with('error', 'Your cart is empty.');
        }

        $cartItems = $cart->items()->with('product')->get();
        
        $deliveryFees = [
            'Instant' => 15,
            'Next Day' => 10,
            'Regular' => 5,
        ];
        $deliveryFee = $deliveryFees[$request->shipping_method];

        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        $discountAmount = 0;
        $appliedDiscount = null;
        if ($request->discount_code) {
            $appliedDiscount = \App\Models\Discount::where('code', $request->discount_code)->first();
            if ($appliedDiscount && 
               (!$appliedDiscount->valid_until || $appliedDiscount->valid_until >= now()) &&
               ($appliedDiscount->type !== 'voucher' || $appliedDiscount->usage_limit === null || $appliedDiscount->usage_count < $appliedDiscount->usage_limit)) {
                
                if ($appliedDiscount->discount_type === 'fixed') {
                    $discountAmount = $appliedDiscount->discount_amount;
                } else {
                    $discountAmount = $subtotal * ($appliedDiscount->discount_amount / 100);
                }
                
                if ($discountAmount > $subtotal) {
                    $discountAmount = $subtotal;
                }
            } else {
                return back()->with('error', 'Invalid or expired discount code.');
            }
        }

        $tax = ($subtotal - $discountAmount) * 0.12; // 12% PPN on discounted subtotal
        if ($tax < 0) $tax = 0;
        
        $grandTotal = $subtotal - $discountAmount + $tax + $deliveryFee;

        if ($user->wallet_balance < $grandTotal) {
            return back()->with('error', 'Insufficient wallet balance. Please top up your wallet.');
        }

        // Group items by store_id
        $itemsByStore = $cartItems->groupBy('product.store_id');

        DB::beginTransaction();
        try {
            foreach ($itemsByStore as $storeId => $items) {
                // We add tax and delivery fee to the overall order. 
                // Since there is only one store per checkout now, this is accurate.
                $order = Order::create([
                    'user_id' => $user->id,
                    'store_id' => $storeId,
                    'status' => 'Sedang Dikemas',
                    'total_amount' => $grandTotal, // Use calculated grand total
                    'shipping_address' => $request->shipping_address,
                ]);

                foreach ($items as $item) {
                    $order->items()->create([
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'price' => $item->product->price,
                    ]);
                    // Reduce product stock safely
                    $item->product->decrement('stock', $item->quantity);
                }
            }

            // Clear the cart
            $cart->items()->delete();
            
            // Increment discount usage
            if ($appliedDiscount) {
                $appliedDiscount->increment('usage_count');
            }

            // Deduct wallet balance
            $user->decrement('wallet_balance', $grandTotal);

            DB::commit();

            return redirect()->route('buyer.orders.index')->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Something went wrong. Please try again.');
        }
    }

    public function validateDiscount(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'subtotal' => 'required|numeric'
        ]);

        $discount = \App\Models\Discount::where('code', $request->code)->first();

        if (!$discount) {
            return response()->json(['error' => 'Invalid discount code.'], 400);
        }

        if ($discount->valid_until && $discount->valid_until < now()) {
            return response()->json(['error' => 'Discount code has expired.'], 400);
        }

        if ($discount->type === 'voucher' && $discount->usage_limit !== null && $discount->usage_count >= $discount->usage_limit) {
            return response()->json(['error' => 'Voucher usage limit reached.'], 400);
        }

        $discountAmount = 0;
        if ($discount->discount_type === 'fixed') {
            $discountAmount = $discount->discount_amount;
        } else {
            $discountAmount = $request->subtotal * ($discount->discount_amount / 100);
        }

        if ($discountAmount > $request->subtotal) {
            $discountAmount = $request->subtotal;
        }

        return response()->json([
            'message' => 'Discount applied successfully.',
            'discount_amount' => $discountAmount,
            'code' => $discount->code
        ]);
    }
}
