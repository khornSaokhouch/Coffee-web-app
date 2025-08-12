<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
// In database/factories/CategoryFactory.php
public function definition(): array
{
    return [
        // Generate a unique 2-word phrase like "Web Development"
        'name' => fake()->unique()->words(2, true),
    ];
}
}
