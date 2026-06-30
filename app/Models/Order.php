<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'store_id', 'driver_id', 'status', 'subtotal', 'discount_amount', 'tax_amount', 'total_amount', 'shipping_address', 'shipping_method', 'delivery_fee'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
    public function statusHistories()
    {
        return $this->hasMany(OrderStatusHistory::class)->latest();
    }

    protected static function booted()
    {
        static::created(function ($order) {
            $order->statusHistories()->create(['status' => $order->status]);
        });

        static::updated(function ($order) {
            if ($order->isDirty('status')) {
                $order->statusHistories()->create(['status' => $order->status]);
            }
        });
    }
}
