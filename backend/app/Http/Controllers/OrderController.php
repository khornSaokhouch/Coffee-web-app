<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // List all orders with items
    public function index()
{
    $user = auth()->user(); // get authenticated user
    $orders = Order::with('orderItems.coffee')
                   ->where('user_id', $user->id)
                   ->get();

    return response()->json($orders);
}

    
    

    // Show single order with items
    public function show($id)
    {
        $order = Order::with('orderItems.coffee', 'user')->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    // Create new order with items
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'status' => 'required|string|max:50',
            'order_items' => 'required|array|min:1',
            'order_items.*.coffee_id' => 'required|exists:coffee_menu,id',
            'order_items.*.quantity' => 'required|integer|min:1',
            'order_items.*.price' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {
            $totalPrice = 0;
            foreach ($request->order_items as $item) {
                $totalPrice += $item['price'] * $item['quantity'];
            }

            $order = Order::create([
                'user_id' => $request->user_id,
                'status' => $request->status,
                'total_price' => $totalPrice,
            ]);

            foreach ($request->order_items as $item) {
                $order->orderItems()->create([
                    'coffee_id' => $item['coffee_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            DB::commit();

            return response()->json($order->load('orderItems.coffee', 'user'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create order',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Update order status
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|max:50',
        ]);

        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->status = $request->status;
        $order->save();

        return response()->json($order);
    }

    // Delete order and related items
    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted']);
    }
}
