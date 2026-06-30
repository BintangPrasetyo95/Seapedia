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
        $recentActivity = [];
        
        if ($activeRole === 'Seller') {
            if ($store = $user->store) {
                $metrics['active_listings'] = $store->products()->count();
                $metrics['total_orders'] = $store->orders()->count();
                $metrics['revenue'] = $store->orders()->whereNotIn('status', ['Dibatalkan', 'Dikembalikan'])->sum('subtotal');
                $recentActivity = $store->orders()->with('user')->latest()->take(5)->get();
            }
        } elseif ($activeRole === 'Buyer') {
            $metrics['total_orders'] = $user->orders()->count();
            $metrics['total_spent'] = $user->orders()->whereNotIn('status', ['Dibatalkan', 'Dikembalikan'])->sum('total_amount');
            $metrics['wallet_balance'] = $user->wallet_balance;
            $recentActivity = $user->orders()->with('items.product')->latest()->take(5)->get();
        }
        
        return inertia('dashboard', [
            'metrics' => $metrics,
            'recent_activity' => $recentActivity,
        ]);
    }
}
