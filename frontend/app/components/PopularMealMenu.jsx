import React, { useState, useEffect, useMemo } from "react";
import { useMenuStore } from "../stores/useMenuStore";
import { useCategoryStore } from "../stores/useCategoryStore";
import MenuCard from "./MenuCard";

const CategoryMenu = () => {
  const menuItems = useMenuStore((state) => state.menuItems);
  const loadingMenu = useMenuStore((state) => state.loading);
  const errorMenu = useMenuStore((state) => state.error);

  const categories = useCategoryStore((state) => state.categories);
  const loadingCategories = useCategoryStore((state) => state.loading);
  const errorCategories = useCategoryStore((state) => state.error);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredItems = useMemo(() => {
    if (!selectedCategoryId) return menuItems;
    return menuItems.filter((item) => item.category_id === selectedCategoryId);
  }, [menuItems, selectedCategoryId]);

  if (loadingMenu || loadingCategories) return <p className="px-6">Loading...</p>;
  if (errorMenu) return <p className="px-6 text-red-500">Menu error: {errorMenu}</p>;
  if (errorCategories) return <p className="px-6 text-red-500">Categories error: {errorCategories}</p>;

  return (
    <div className="px-6 py-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Menu by Category</h2>
        <select
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={selectedCategoryId ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedCategoryId(val === "" ? null : Number(val));
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No items found in this category.</p>
      )}
    </div>
  );
};

export default CategoryMenu;
