<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        // Fetch products, eagerly loading the store they belong to
        // If we want to support search/filtering, we can do it here.
        $query = Product::with('store');
        
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        $products = $query->latest()->get();

        return inertia('buyer/shop/index', [
            'products' => $products
        ]);
    }
}
