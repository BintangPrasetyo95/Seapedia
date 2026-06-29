<?php

namespace Database\Seeders;

use App\Models\User;
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
            ['name' => 'Seller User', 'password' => bcrypt('password')]
        );
        $seller->roles()->syncWithoutDetaching([\App\Models\Role::where('name', 'Seller')->first()->id]);

        $buyer = User::firstOrCreate(
            ['email' => 'buyer@seapedia.com'],
            ['name' => 'Buyer User', 'password' => bcrypt('password')]
        );
        $buyer->roles()->syncWithoutDetaching([\App\Models\Role::where('name', 'Buyer')->first()->id]);

        $driver = User::firstOrCreate(
            ['email' => 'driver@seapedia.com'],
            ['name' => 'Driver User', 'password' => bcrypt('password')]
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
    }
}
