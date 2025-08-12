// src/components/SearchBar.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useMenuStore } from "../stores/useMenuStore";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  // Get the global search term and the action to set it from Zustand
  const globalSearchTerm = useMenuStore((state) => state.searchTerm);
  const setGlobalSearchTerm = useMenuStore((state) => state.setSearchTerm);

  // Local state to control the input field directly for a better user experience
  const [localSearchTerm, setLocalSearchTerm] = useState(globalSearchTerm);

  // Handler to update both local and global state
  const handleChange = (e) => {
    const term = e.target.value;
    setLocalSearchTerm(term);
    setGlobalSearchTerm(term);
  };

  // Handler for the clear button
  const handleClear = () => {
    setLocalSearchTerm("");
    setGlobalSearchTerm("");
  };

  // Keep local state in sync if the global state is changed from elsewhere
  useEffect(() => {
    setLocalSearchTerm(globalSearchTerm);
  }, [globalSearchTerm]);

  return (
    <section className="px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
          Find your perfect coffee
        </h2>
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search for Espresso, Latte..."
            className="
              w-full 
              py-3 pl-10 pr-10  // Make space for icons on both sides
              text-gray-900 
              bg-white 
              border border-gray-300 
              rounded-full 
              focus:outline-none 
              focus:ring-2 focus:ring-amber-500 focus:border-amber-500
              transition-all duration-300 ease-in-out
            "
            value={localSearchTerm}
            onChange={handleChange}
          />

          {/* Clear Button (appears only when there's text) */}
          {localSearchTerm && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                onClick={handleClear}
                className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Clear search"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchBar;