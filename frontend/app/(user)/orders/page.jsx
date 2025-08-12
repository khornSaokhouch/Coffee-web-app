"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useOrderStore } from "../../stores/useOrderStore";
import Image from "next/image";

export default function OrdersPage() {
  const { orders, loading, error, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  console.log("Orders:", orders);

  if (loading) return <p className="p-6">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="border p-4 rounded-lg hover:shadow-md transition-shadow flex items-center space-x-4"
          >
            <Link href={`/orders/${order.id}`} className="flex-grow flex items-center space-x-4">
              {/* Image */}
              <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={order.image_url || "/default-food.jpg"} // fallback image
                  alt={`Order #${order.id}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text content */}
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Order #{order.id}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span>
                    Total: <strong>${Number(order.total_price).toFixed(2)}</strong>
                  </span>
                  <span>
                    Status: <em>{order.status}</em>
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
