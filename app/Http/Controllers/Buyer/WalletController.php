<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function index()
    {
        $transactions = \App\Models\WalletTransaction::where('user_id', auth()->id())->latest()->get();
        return inertia('buyer/wallet/index', [
            'balance' => auth()->user()->wallet_balance,
            'transactions' => $transactions
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

        \App\Models\WalletTransaction::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
            'type' => 'credit',
            'description' => 'Wallet Top-up'
        ]);

        return back()->with('success', 'Wallet topped up successfully!');
    }
}
