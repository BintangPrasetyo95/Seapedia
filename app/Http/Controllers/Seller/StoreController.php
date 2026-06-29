<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function create()
    {
        // If user already has a store, redirect to products or dashboard
        if (auth()->user()->store) {
            return redirect()->route('seller.products.index');
        }

        return inertia('seller/store/create');
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:stores',
            'description' => 'nullable|string',
        ]);

        auth()->user()->store()->create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('seller.products.index')->with('success', 'Store created successfully!');
    }
}
