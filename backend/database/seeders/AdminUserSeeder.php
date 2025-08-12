<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Make sure environment variables exist or throw an error
        if (!env('ADMIN_EMAIL') || !env('ADMIN_PASSWORD') || !env('USER_EMAIL') || !env('USER_PASSWORD')) {
            throw new \Exception('Please set ADMIN_EMAIL, ADMIN_PASSWORD, USER_EMAIL, and USER_PASSWORD in your .env file.');
        }

        // Create or update admin user
        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL')],
            [
                'name' => 'Admin',
                'password' => Hash::make(env('ADMIN_PASSWORD')),
                'role' => 'admin',
            ]
        );

        // Create or update regular user
        User::updateOrCreate(
            ['email' => env('USER_EMAIL')],
            [
                'name' => 'Regular User',
                'password' => Hash::make(env('USER_PASSWORD')),
                'role' => 'user',
            ]
        );
    }
}
