// src/components/categories/CategoryItem.jsx
"use client";

import React from "react";
import { HiPencil, HiTrash, HiOutlineClock } from "react-icons/hi"; // Using Heroicons

export const CategoryItem = ({ category, onEdit, onDelete, isDeleting }) => {
  return (
    <li className="bg-white p-4 rounded-lg border border-slate-200 flex items-center justify-between transition-all hover:border-blue-500 hover:shadow-sm">
      {/* Left side: Image and Details */}
      <div className="flex items-center gap-4">
        <img
          src={category.category_image_url || "https://via.placeholder.com/150"}
          alt={category.name}
          className="w-16 h-16 object-cover rounded-full bg-slate-100 ring-2 ring-white"
        />
        <div>
          <p className="font-bold text-slate-800">{category.name}</p>
          <p className="text-xs text-slate-500">ID: {category.id || "N/A"}</p>
        </div>
      </div>

      {/* Right side: Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => onEdit(category)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          disabled={isDeleting}
        >
          <HiPencil />
          Edit
        </button>
        <button
          onClick={() => onDelete(category)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <HiOutlineClock className="animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <HiTrash />
              Delete
            </>
          )}
        </button>
      </div>
    </li>
  );
};