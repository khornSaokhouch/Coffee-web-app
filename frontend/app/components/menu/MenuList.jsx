"use client";

import React from "react";

export function MenuList({ menuItems, onEdit, onDelete, isLoading }) {
  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!menuItems.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        No menu items found. Add some!
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {menuItems.map((item) => (
        <li key={item.id} className="flex justify-between items-center py-4">
          <div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-sm font-medium text-green-600">${item.price}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item)}
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
