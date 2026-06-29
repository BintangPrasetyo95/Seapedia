<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class DashboardController extends Controller
{
    public function index()
    {
        $driverId = auth()->id();
        
        $completedJobs = Order::where('driver_id', $driverId)
            ->where('status', 'Pesanan Selesai')
            ->with(['store', 'user'])
            ->latest()
            ->get();
            
        $totalEarnings = $completedJobs->sum('delivery_fee');
        $totalJobs = $completedJobs->count();

        return inertia('driver/dashboard', [
            'metrics' => [
                'total_earnings' => $totalEarnings,
                'completed_jobs' => $totalJobs,
            ],
            'recent_history' => $completedJobs->take(10)
        ]);
    }
}
