"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMenuStore } from "../stores/useMenuStore";
import { useOrderStore } from "../stores/useOrderStore";
import { useAuthStore } from "../stores/authStore"; // <-- import your auth store here
import Image from "next/image";

export default function NewOrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const menuId = searchParams.get("menuId");

  const getMenuItem = useMenuStore((state) => state.getMenuItem);
  const createOrder = useOrderStore((state) => state.createOrder);
  const user = useAuthStore((state) => state.user); // get logged-in user

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!menuId) {
      setError("No menu item selected.");
      setLoading(false);
      return;
    }
    async function fetchMenu() {
      setLoading(true);
      const data = await getMenuItem(Number(menuId));
      if (data) {
        setItem(data);
        setError(null);
      } else {
        setError("Menu item not found.");
      }
      setLoading(false);
    }
    fetchMenu();
  }, [menuId, getMenuItem]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user?.id) {
      setError("User not authenticated.");
      return;
    }
    if (quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }

    const orderData = {
      user_id: user.id, // auto user ID here
      status: "pending",
      order_items: [
        {
          coffee_id: item.id,
          quantity,
          price: item.price,
        },
      ],
    };

    setSubmitting(true);
    try {
      await createOrder(orderData);
      router.push("/orders");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to place order, please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="text-center p-8">Loading...</p>;
  }

  if (error) {
    return <p className="text-center p-8 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-4">Order: {item.name}</h1>

      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
        <Image
          src={item.image_url || "/default-food.jpg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Removed user ID input */}

        <div>
          <label htmlFor="quantity" className="block mb-1 font-semibold">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="text-lg font-bold text-amber-600">
          Total: ${(quantity * item.price).toFixed(2)}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full ${
            submitting ? "bg-gray-400" : "bg-amber-600 hover:bg-amber-700"
          } text-white font-semibold py-3 rounded-full transition`}
        >
          {submitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
