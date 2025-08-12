<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
// In app/Http/Resources/ServiceResource.php
public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'description' => $this->description,
        'price' => (float) $this->price, // Cast to float for proper JSON number type
        'location' => $this->location,
        'category' => new CategoryResource($this->whenLoaded('category')),
        'owner' => new UserResource($this->whenLoaded('owner')),
        'created_at' => $this->created_at->toDateTimeString(),
    ];
}
}
