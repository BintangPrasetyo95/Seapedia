<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function index()
    {
        return inertia('buyer/wallet/index', [
            'balance' => auth()->user()->wallet_balance
        ]);
    }

    public function topup(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1'
        ]);

        $user = auth()->user();
        $user->wallet_balance += $request->amount;
        $user->save();

        return back()->with('success', 'Wallet topped up successfully!');
    }
}
