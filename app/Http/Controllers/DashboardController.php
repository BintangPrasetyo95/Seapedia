<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $activeRole = session('active_role', 'Guest');
        
        $metrics = [
            'total_orders' => 0,
            'active_listings' => 0,
            'revenue' => 0,
        ];
        
        if ($activeRole === 'Seller') {
            if ($store = $user->store) {
                $metrics['active_listings'] = $store->products()->count();
                $metrics['total_orders'] = $store->orders()->count();
                $metrics['revenue'] = $store->orders()->where('status', '!=', 'Cancelled')->sum('total_amount');
            }
        }
        
        return inertia('dashboard', [
            'metrics' => $metrics,
        ]);
    }
}
