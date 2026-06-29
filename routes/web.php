<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Seller Routes
    Route::inertia('seller/store/create', 'seller/store/create')->name('seller.store.create');
    Route::inertia('seller/products', 'seller/products/index')->name('seller.products.index');
    Route::inertia('seller/products/create', 'seller/products/create')->name('seller.products.create');
    Route::inertia('seller/products/edit', 'seller/products/edit')->name('seller.products.edit');
    Route::inertia('seller/orders', 'seller/orders/index')->name('seller.orders.index');

    // Buyer Routes
    Route::inertia('buyer/wallet', 'buyer/wallet/index')->name('buyer.wallet.index');
    Route::inertia('buyer/addresses', 'buyer/addresses/index')->name('buyer.addresses.index');
    Route::inertia('buyer/cart', 'buyer/cart/index')->name('buyer.cart.index');
    Route::inertia('buyer/checkout', 'buyer/checkout/index')->name('buyer.checkout.index');

    // Driver Routes
    Route::inertia('driver/jobs', 'driver/jobs/index')->name('driver.jobs.index');
    Route::inertia('driver/dashboard', 'driver/dashboard')->name('driver.dashboard');

    // Admin Routes
    Route::inertia('admin/dashboard', 'admin/dashboard')->name('admin.dashboard');
    Route::inertia('admin/vouchers', 'admin/vouchers/index')->name('admin.vouchers.index');
    
    // Role Selection
    Route::get('/role-selection', function () {
        return inertia('auth/role-selection', [
            'availableRoles' => auth()->user()->roles->pluck('name')
        ]);
    })->name('role.selection');
    
    Route::post('/role-selection', function (\Illuminate\Http\Request $request) {
        $request->validate(['role' => 'required|string']);
        if (!auth()->user()->hasRole($request->role) && $request->role !== 'Admin') {
            abort(403);
        }
        session(['active_role' => $request->role]);
        return redirect()->route('dashboard');
    })->name('role.selection.store');
});

Route::post('/reviews', [\App\Http\Controllers\ApplicationReviewController::class, 'store'])->name('reviews.store');

require __DIR__.'/settings.php';
