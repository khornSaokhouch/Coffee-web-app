<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    protected $fillable = [
        'name',
        'category_image',
    ];

    protected $appends = ['category_image_url'];

    public function getCategoryImageUrlAttribute()
{
    if (!$this->category_image) {
        return null;
    }
    return url(Storage::url($this->category_image));
}

}
