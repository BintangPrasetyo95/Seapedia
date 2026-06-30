<?php

namespace App\Http\Controllers;

use App\Models\ApplicationReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationReviewController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $review = new ApplicationReview();
        $review->user_id = Auth::id(); // Will be null for guests
        $review->reviewer_name = strip_tags($validated['name']);
        $review->rating = $validated['rating'];
        $review->comment = strip_tags($validated['comment']); // Basic sanitization against XSS
        $review->save();

        return response()->json(['message' => 'Review submitted successfully.'], 201);
    }
}
