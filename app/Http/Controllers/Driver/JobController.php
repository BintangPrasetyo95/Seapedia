<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class JobController extends Controller
{
    public function index()
    {
        // Display orders that are waiting for driver
        $jobs = Order::where('status', 'Menunggu Pengirim')
            ->with(['store', 'user'])
            ->latest()
            ->get();

        // Also get currently active jobs for this driver
        $activeJobs = Order::where('driver_id', auth()->id())
            ->whereIn('status', ['Sedang Dikirim'])
            ->with(['store', 'user'])
            ->latest()
            ->get();

        return inertia('driver/jobs/index', [
            'available_jobs' => $jobs,
            'active_jobs' => $activeJobs
        ]);
    }

    public function takeJob(Request $request, Order $order)
    {
        if ($order->status !== 'Menunggu Pengirim') {
            return back()->with('error', 'Job is no longer available.');
        }

        $order->update([
            'driver_id' => auth()->id(),
            'status' => 'Sedang Dikirim'
        ]);

        return back()->with('success', 'Job taken successfully.');
    }

    public function completeJob(Request $request, Order $order)
    {
        if ($order->driver_id !== auth()->id() || $order->status !== 'Sedang Dikirim') {
            abort(403);
        }

        $order->update([
            'status' => 'Pesanan Selesai'
        ]);

        // When driver completes job, driver gets paid the delivery fee?
        // Wait, flow.md says: "Build a Driver dashboard that calculates and displays delivery earnings and job history."
        // We can just calculate earnings on the fly from completed orders.
        // What about wallet balance? Does driver have wallet? "Ensure automated refunds correctly restore Buyer wallets, revert Seller income, and restore product stock." (Phase 7)
        // Seller doesn't have wallet, Driver doesn't have wallet? Just display earnings.
        // Ok, we don't modify wallet_balance here, just mark as Pesanan Selesai.

        return back()->with('success', 'Job completed successfully.');
    }
}
