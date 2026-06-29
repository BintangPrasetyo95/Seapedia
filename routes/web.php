<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    // Seller Routes
    Route::get('seller/store/create', [\App\Http\Controllers\Seller\StoreController::class, 'create'])->name('seller.store.create');
    Route::post('seller/store', [\App\Http\Controllers\Seller\StoreController::class, 'store'])->name('seller.store.store');
    Route::resource('seller/products', \App\Http\Controllers\Seller\ProductController::class)->names([
        'index' => 'seller.products.index',
        'create' => 'seller.products.create',
        'store' => 'seller.products.store',
        'edit' => 'seller.products.edit',
        'update' => 'seller.products.update',
        'destroy' => 'seller.products.destroy',
    ]);
    Route::get('seller/orders', [\App\Http\Controllers\Seller\OrderController::class, 'index'])->name('seller.orders.index');
    Route::put('seller/orders/{order}', [\App\Http\Controllers\Seller\OrderController::class, 'update'])->name('seller.orders.update');

    // Buyer Routes
    Route::get('buyer/shop', [\App\Http\Controllers\Buyer\ShopController::class, 'index'])->name('buyer.shop.index');
    Route::get('buyer/wallet', [\App\Http\Controllers\Buyer\WalletController::class, 'index'])->name('buyer.wallet.index');
    Route::post('buyer/wallet/topup', [\App\Http\Controllers\Buyer\WalletController::class, 'topup'])->name('buyer.wallet.topup');
    
    Route::get('buyer/addresses', [\App\Http\Controllers\Buyer\AddressController::class, 'index'])->name('buyer.addresses.index');
    Route::post('buyer/addresses', [\App\Http\Controllers\Buyer\AddressController::class, 'store'])->name('buyer.addresses.store');
    Route::put('buyer/addresses/{address}', [\App\Http\Controllers\Buyer\AddressController::class, 'update'])->name('buyer.addresses.update');
    Route::delete('buyer/addresses/{address}', [\App\Http\Controllers\Buyer\AddressController::class, 'destroy'])->name('buyer.addresses.destroy');
    
    Route::get('buyer/cart', [\App\Http\Controllers\Buyer\CartController::class, 'index'])->name('buyer.cart.index');
    Route::post('buyer/cart', [\App\Http\Controllers\Buyer\CartController::class, 'store'])->name('buyer.cart.store');
    Route::delete('buyer/cart/{id}', [\App\Http\Controllers\Buyer\CartController::class, 'destroy'])->name('buyer.cart.destroy');
    
    Route::get('buyer/checkout', [\App\Http\Controllers\Buyer\CheckoutController::class, 'index'])->name('buyer.checkout.index');
    Route::post('buyer/checkout', [\App\Http\Controllers\Buyer\CheckoutController::class, 'store'])->name('buyer.checkout.store');
    
    Route::get('buyer/orders', [\App\Http\Controllers\Buyer\OrderController::class, 'index'])->name('buyer.orders.index');

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
