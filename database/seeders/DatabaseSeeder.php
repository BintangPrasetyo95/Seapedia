<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Store;
use App\Models\Product;
use App\Models\Address;
use App\Models\ApplicationReview;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roles = ['Admin', 'Seller', 'Buyer', 'Driver'];
        foreach ($roles as $roleName) {
            \App\Models\Role::firstOrCreate(['name' => $roleName]);
        }

        $admin = User::firstOrCreate(
            ['email' => 'admin@seapedia.com'],
            ['name' => 'Admin User', 'password' => bcrypt('password')]
        );
        $admin->roles()->syncWithoutDetaching([\App\Models\Role::where('name', 'Admin')->first()->id]);

        $seller = User::firstOrCreate(
            ['email' => 'seller@seapedia.com'],
            ['name' => 'Bintang Seafood', 'password' => bcrypt('password')]
        );
        $seller->roles()->syncWithoutDetaching([\App\Models\Role::where('name', 'Seller')->first()->id]);

        $buyer = User::firstOrCreate(
            ['email' => 'buyer@seapedia.com'],
            ['name' => 'John Doe', 'password' => bcrypt('password')]
        );
        $buyer->wallet_balance = 5000.00;
        $buyer->save();
        $buyer->roles()->syncWithoutDetaching([\App\Models\Role::where('name', 'Buyer')->first()->id]);

        $driver = User::firstOrCreate(
            ['email' => 'driver@seapedia.com'],
            ['name' => 'Speedy Driver', 'password' => bcrypt('password')]
        );
        $driver->roles()->syncWithoutDetaching([\App\Models\Role::where('name', 'Driver')->first()->id]);

        $multi = User::firstOrCreate(
            ['email' => 'multi@seapedia.com'],
            ['name' => 'Multi-role User', 'password' => bcrypt('password')]
        );
        $multi->roles()->syncWithoutDetaching([
            \App\Models\Role::where('name', 'Seller')->first()->id,
            \App\Models\Role::where('name', 'Buyer')->first()->id
        ]);

        // Create a Store for the seller
        $store = Store::firstOrCreate(
            ['user_id' => $seller->id],
            ['name' => 'Bintang Premium Seafood', 'description' => 'Providing the best fresh seafood in town.']
        );

        // Create dummy Products
        $products = [
            [
                'name' => 'Fresh Atlantic Salmon',
                'description' => 'Premium sushi-grade salmon fillet. High in Omega-3.',
                'price' => 25.50,
                'stock' => 50,
                'category' => 'Seafood',
                'image' => 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=600'
            ],
            [
                'name' => 'Giant Tiger Prawns',
                'description' => 'Freshly caught large tiger prawns, perfect for grilling.',
                'price' => 45.00,
                'stock' => 30,
                'category' => 'Seafood',
                'image' => 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=600'
            ],
            [
                'name' => 'Professional Fishing Rod',
                'description' => 'Carbon fiber fishing rod for deep sea fishing.',
                'price' => 120.00,
                'stock' => 15,
                'category' => 'Equipment',
                'image' => 'https://images.unsplash.com/photo-1595804593853-2780e14cb7b9?auto=format&fit=crop&q=80&w=600'
            ],
            [
                'name' => 'Heavy Duty Fishing Net',
                'description' => 'Durable nylon net for commercial and recreational fishing.',
                'price' => 35.00,
                'stock' => 100,
                'category' => 'Equipment',
                'image' => 'https://images.unsplash.com/photo-1563806377651-7890bc20d75a?auto=format&fit=crop&q=80&w=600'
            ],
        ];

        foreach ($products as $prod) {
            Product::firstOrCreate(
                ['store_id' => $store->id, 'name' => $prod['name']],
                $prod
            );
        }

        // Create an Address for the buyer
        Address::firstOrCreate(
            ['user_id' => $buyer->id, 'name' => 'Home'],
            ['full_address' => '123 Ocean Drive, Coastal City, 10293', 'is_default' => true]
        );

        // Create an Application Review
        ApplicationReview::firstOrCreate(
            ['user_id' => $buyer->id],
            [
                'reviewer_name' => 'John Doe',
                'rating' => 5, 
                'comment' => 'This app makes it so easy to get fresh seafood straight to my door! Highly recommended.'
            ]
        );
    }
}
