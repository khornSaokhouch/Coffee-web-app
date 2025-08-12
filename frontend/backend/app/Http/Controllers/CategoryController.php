<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    // Get all categories
    public function index()
    {
        return response()->json(Category::all());
    }

    // Create a new category
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('category_image')) {
            $image = $request->file('category_image');
            // Store in 'category_images' folder inside 'public' disk
            $imagePath = $image->store('category_images', 'public');
            $data['category_image'] = $imagePath;
        }

        $category = Category::create($data);

        return response()->json([
            'message' => 'Category created successfully',
            'category' => $category,
        ], 201);
    }

    // Get a specific category
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    // Update a category
public function update(Request $request, $id)
{
    $data = $request->validate([
        'name' => 'sometimes|string|max:255',
        'category_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $category = Category::findOrFail($id);

    if ($request->hasFile('category_image')) {
        if ($category->category_image && Storage::disk('public')->exists($category->category_image)) {
            Storage::disk('public')->delete($category->category_image);
        }

        $image = $request->file('category_image');
        $imagePath = $image->store('category_images', 'public');
        $data['category_image'] = $imagePath;
    }

    $category->update($data);
    $category->refresh();

    return response()->json([
        'message' => 'Category updated successfully',
        'category' => $category,
    ]);
}


    // Delete a category
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        // Delete image file if exists
        if ($category->category_image && Storage::disk('public')->exists($category->category_image)) {
            Storage::disk('public')->delete($category->category_image);
        }

        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully',
        ]);
    }
}
