<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->enum('type', ['voucher', 'promo']); // Voucher or Promo
            $table->decimal('discount_amount', 8, 2);
            $table->enum('discount_type', ['fixed', 'percent']); // E.g. $10 off or 10% off
            $table->dateTime('valid_until')->nullable();
            $table->integer('usage_limit')->nullable(); // Used for vouchers
            $table->integer('usage_count')->default(0); // Track how many times it was used
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
