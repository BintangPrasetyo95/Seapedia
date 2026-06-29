<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = auth()->user()->orders()->with('items.product.store')->latest()->get();
        return inertia('buyer/orders/index', [
            'orders' => $orders
        ]);
    }
}
