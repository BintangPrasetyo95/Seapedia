<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Discount;

class VoucherController extends Controller
{
    public function index()
    {
        $vouchers = Discount::latest()->get();

        return inertia('admin/vouchers/index', [
            'vouchers' => $vouchers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:discounts,code',
            'type' => 'required|string|in:voucher,promo',
            'discount_type' => 'required|string|in:fixed,percent',
            'discount_amount' => 'required|numeric|min:0',
            'valid_until' => 'nullable|date',
            'usage_limit' => 'nullable|integer|min:1'
        ]);

        Discount::create($validated);

        return back()->with('success', 'Voucher/Promo created successfully.');
    }

    public function destroy(Discount $discount)
    {
        $discount->delete();
        return back()->with('success', 'Voucher/Promo deleted.');
    }
}
