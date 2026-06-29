<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $store = auth()->user()->store;
        if (!$store) {
            return redirect()->route('seller.store.create');
        }

        $products = $store->products()->latest()->get();
        return inertia('seller/products/index', ['products' => $products]);
    }

    public function create()
    {
        if (!auth()->user()->store) {
            return redirect()->route('seller.store.create');
        }
        return inertia('seller/products/create');
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $store = auth()->user()->store;
        if (!$store) {
            return redirect()->route('seller.store.create');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category' => 'nullable|string|max:255',
            'image' => 'nullable|url',
        ]);

        $store->products()->create($validated);

        return redirect()->route('seller.products.index')->with('success', 'Product created successfully!');
    }

    public function edit(\App\Models\Product $product)
    {
        // Ensure product belongs to seller
        if ($product->store_id !== auth()->user()->store?->id) {
            abort(403);
        }

        return inertia('seller/products/edit', ['product' => $product]);
    }

    public function update(\Illuminate\Http\Request $request, \App\Models\Product $product)
    {
        if ($product->store_id !== auth()->user()->store?->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category' => 'nullable|string|max:255',
            'image' => 'nullable|url',
        ]);

        $product->update($validated);

        return redirect()->route('seller.products.index')->with('success', 'Product updated successfully!');
    }

    public function destroy(\App\Models\Product $product)
    {
        if ($product->store_id !== auth()->user()->store?->id) {
            abort(403);
        }

        $product->delete();
        return redirect()->route('seller.products.index')->with('success', 'Product deleted successfully!');
    }
}
