// src/components/categories/CategoryList.jsx
"use client";

import React, { useState } from "react"; // Import useState
import { CategoryItem } from "./CategoryItem";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"; // Icons for buttons

export const CategoryList = ({
  categories,
  onEdit,
  onDelete,
  isLoading,
  isMutating, // Note: This will disable buttons on ALL items during a mutation
}) => {
  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  // --- LOADING AND EMPTY STATES (remain the same) ---
  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <LoadingSpinner size="w-12 h-12" />
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No categories found.</p>
        <p className="text-gray-400 text-sm">
          Click "Add New Category" to get started.
        </p>
      </div>
    );
  }

  // --- PAGINATION CALCULATIONS ---
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCategories = categories.slice(startIndex, endIndex);

  // --- PAGINATION HANDLERS ---
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="space-y-4">
      {/* List of Categories - now maps over the sliced array */}
      <ul className="space-y-4">
        {currentCategories.map((cat, index) => (
          <CategoryItem
            key={cat.id ?? index}
            category={cat}
            onEdit={onEdit}
            onDelete={onDelete}
            // A better prop might be isDeleting={deletingId === cat.id}
            // But using your existing isMutating prop works too.
            isDeleting={isMutating} 
          />
        ))}
      </ul>

      {/* Pagination Controls - only show if there's more than one page */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <HiChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page <span className="font-bold">{currentPage}</span> of{" "}
            <span className="font-bold">{totalPages}</span>
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <HiChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};