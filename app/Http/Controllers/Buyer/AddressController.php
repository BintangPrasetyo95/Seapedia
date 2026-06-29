<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Address;

class AddressController extends Controller
{
    public function index()
    {
        return inertia('buyer/addresses/index', [
            'addresses' => auth()->user()->addresses()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'full_address' => 'required|string',
            'is_default' => 'boolean'
        ]);

        if ($request->is_default) {
            auth()->user()->addresses()->update(['is_default' => false]);
        }

        auth()->user()->addresses()->create([
            'name' => $request->name,
            'full_address' => $request->full_address,
            'is_default' => $request->is_default ?? false,
        ]);

        return back()->with('success', 'Address added successfully!');
    }

    public function update(Request $request, Address $address)
    {
        if ($address->user_id !== auth()->id()) abort(403);

        $request->validate([
            'name' => 'required|string|max:255',
            'full_address' => 'required|string',
            'is_default' => 'boolean'
        ]);

        if ($request->is_default) {
            auth()->user()->addresses()->update(['is_default' => false]);
        }

        $address->update([
            'name' => $request->name,
            'full_address' => $request->full_address,
            'is_default' => $request->is_default ?? false,
        ]);

        return back()->with('success', 'Address updated successfully!');
    }

    public function destroy(Address $address)
    {
        if ($address->user_id !== auth()->id()) abort(403);
        $address->delete();
        return back()->with('success', 'Address deleted successfully!');
    }
}
