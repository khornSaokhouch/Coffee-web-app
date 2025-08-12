<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoffeeMenu extends Model
{
    use HasFactory;

    // Table name (optional if it follows Laravel's naming convention)
    protected $table = 'coffee_menu';

    // The attributes that are mass assignable
    protected $fillable = [
        'name',
        'description',
        'price',
        'available',
        'category_id',
        'created_by_id',
    ];

    // Cast 'available' to boolean automatically
    protected $casts = [
        'available' => 'boolean',
        'price' => 'decimal:2',
    ];

    // Relationships

    // Category relationship (assuming you have Category model)
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // User who created the coffee menu item
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function orderItems()
{
    return $this->hasMany(OrderItem::class, 'coffee_id');
}

}
