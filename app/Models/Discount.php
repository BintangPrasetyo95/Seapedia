<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'type',
        'discount_amount',
        'discount_type',
        'valid_until',
        'usage_limit',
        'usage_count'
    ];

    protected $casts = [
        'valid_until' => 'datetime',
    ];
}
