<?php

namespace App\Http\Controllers;

use App\Models\CoffeeMenu;
use Illuminate\Http\Request;

class CoffeeMenuController extends Controller
{
    // List all coffee menu items
    public function index()
    {
        $coffees = CoffeeMenu::all();
        return response()->json($coffees);
    }

    // Show single coffee menu item by id
    public function show($id)
    {
        $coffee = CoffeeMenu::find($id);

        if (!$coffee) {
            return response()->json(['message' => 'Coffee not found'], 404);
        }

        return response()->json($coffee);
    }

    // Create a new coffee menu item
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'available' => 'boolean',
            'category_id' => 'required|exists:categories,id',
            'created_by_id' => 'required|exists:users,id',
        ]);

        $coffee = CoffeeMenu::create($validated);

        return response()->json($coffee, 201);
    }

    // Update an existing coffee menu item
    public function update(Request $request, $id)
    {
        $coffee = CoffeeMenu::find($id);

        if (!$coffee) {
            return response()->json(['message' => 'Coffee not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'available' => 'boolean',
            'category_id' => 'sometimes|required|exists:categories,id',
            'created_by_id' => 'sometimes|required|exists:users,id',
        ]);

        $coffee->update($validated);

        return response()->json($coffee);
    }

    // Delete a coffee menu item
    public function destroy($id)
    {
        $coffee = CoffeeMenu::find($id);

        if (!$coffee) {
            return response()->json(['message' => 'Coffee not found'], 404);
        }

        $coffee->delete();

        return response()->json(['message' => 'Coffee deleted successfully']);
    }
}
