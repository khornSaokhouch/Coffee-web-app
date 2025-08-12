"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useMenuStore } from "../../../stores/useMenuStore";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function MenuDetailsPage() {
  const { id } = useParams();
  const menuItems = useMenuStore((state) => state.menuItems);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (menuItems.length > 0) {
      const foundItem = menuItems.find((menu) => menu.id === Number(id));
      setItem(foundItem || null);
    }
  }, [id, menuItems]);

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="py-8 min-h-screen">
      <div className="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Column */}
            <div className="relative w-full h-80 md:h-full min-h-[300px]">
              <Image
                src={item.image_url || "/default-food.jpg"}
                alt={item.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Details Column */}
            <div className="p-6 lg:p-8 flex flex-col">
              <div>
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {item.category || "Fan Favorite"}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                  {item.name}
                </h1>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {item.description || "An exquisitely crafted coffee, perfect for any time of day."}
                </p>
              </div>

              <div className="flex-grow"></div>

              {/* Action Area */}
              <div className="mt-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <span className="text-4xl font-bold text-amber-600">
                    ${item.price}
                  </span>

                  <Link href={`/orders/new?menuId=${item.id}`}>
                    <button
                      className="
                        w-full sm:w-auto
                        bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold
                        px-8 py-3 rounded-full shadow-lg transition-all duration-300
                        focus:outline-none focus:ring-4 focus:ring-amber-300
                        transform hover:scale-105
                      "
                    >
                      Order
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
