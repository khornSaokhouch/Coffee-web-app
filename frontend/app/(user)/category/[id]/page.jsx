"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useMenuStore } from "../../../stores/useMenuStore";
import { useCategoryStore } from "../../../stores/useCategoryStore"; // import category store
import MenuCard from "../../../components/MenuCard";

export default function CategoryPage() {
  const { id } = useParams();
  const categoryId = Number(id);

  const menuItems = useMenuStore((state) => state.menuItems);
  const loading = useMenuStore((state) => state.loading);
  const error = useMenuStore((state) => state.error);

  const categories = useCategoryStore((state) => state.categories);

  // Find category name by id
  const category = categories.find((cat) => cat.id === categoryId);
  const categoryName = category ? category.name : `Category ${categoryId}`;

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => item.category_id === categoryId);
  }, [menuItems, categoryId]);

  if (loading) return <p className="px-6 py-4">Loading menu items...</p>;
  if (error)
    return (
      <p className="px-6 py-4 text-red-500">Error loading menu: {error}</p>
    );

  return (
    <section className="px-6 py-4">
      <h1 className="text-2xl text-center font-bold mb-4">{categoryName} Items</h1>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No items found in this category.</p>
      )}
    </section>
  );
}
