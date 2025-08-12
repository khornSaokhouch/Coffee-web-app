"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrderStore } from "../../../stores/useOrderStore";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const orderId = Number(id);
  const { orders, orderItems, loading, error, fetchOrderItems } = useOrderStore();

  const order = orders.find((o) => o.id === orderId);

  useEffect(() => {
    if (orderId) fetchOrderItems(orderId);
  }, [orderId, fetchOrderItems]);

  if (loading) return <p className="p-6">Loading order details...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  if (!order) return <p className="p-6">Order not found.</p>;

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Order #{order.id}</h1>
      <p className="mb-2">Status: <strong>{order.status}</strong></p>
      <p className="mb-4">Placed on: {new Date(order.created_at).toLocaleString()}</p>

      <h2 className="text-xl font-semibold mb-2">Items</h2>
      {orderItems.length === 0 ? (
        <p>No items found for this order.</p>
      ) : (
        <ul className="space-y-2">
          {orderItems.map((item) => (
            <li key={item.id} className="border p-3 rounded-lg flex justify-between">
              <div>
                <p className="font-medium">Coffee ID: {item.coffee_id}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 text-right text-2xl font-bold">
        Total Price: ${order.total_price.toFixed(2)}
      </div>
    </section>
  );
}
