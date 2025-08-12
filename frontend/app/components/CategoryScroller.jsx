"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Next.js 13 app router useRouter
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCategoryStore } from "../stores/useCategoryStore";

export default function CategoryScroller({ cardSize = 90 }) {
  const { categories, loading, error, fetchCategories } = useCategoryStore();
  const scrollerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const scrollBy = (amount) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleCategoryClick = (id) => {
    router.push(`/category/${id}`); // Navigate to category page with id
  };

  if (loading) return <p className="px-6 py-4">Loading categories...</p>;
  if (error) return <p className="px-6 py-4 text-red-500">Error: {error}</p>;
  if (!categories || categories.length === 0)
    return <p className="px-6 py-4 text-gray-500">No categories available.</p>;

  return (
    <section className="px-4 py-2">
      {/* Header with arrows */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Categories</h3>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scrollBy(-cardSize * 3)}
            aria-label="Scroll left"
            className="p-2 rounded-full bg-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scrollBy(cardSize * 3)}
            aria-label="Scroll right"
            className="p-2 rounded-full bg-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Horizontal scroller */}
      <div
        ref={scrollerRef}
        className="overflow-x-auto no-scrollbar -mx-4 px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        <div className="flex gap-5" role="list">
          {categories.map((cat) => (
            <div
              key={cat.id}
              role="listitem"
              className="flex-shrink-0 flex flex-col items-center w-[80px] sm:w-[100px] cursor-pointer"
              style={{ scrollSnapAlign: "center" }}
              onClick={() => handleCategoryClick(cat.id)}
              title={`View items in ${cat.name}`}
            >
              {/* Circle image */}
              <div className="relative rounded-full overflow-hidden border-2 border-amber-500 shadow-sm w-[70px] h-[70px] sm:w-[85px] sm:h-[85px]">
                <Image
                  src={cat.category_image_url || "/default-category.jpg"}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 70px, 85px"
                  className="object-cover"
                />
              </div>

              {/* Name */}
              <p className="mt-2 text-xs sm:text-sm font-medium text-center text-gray-800 truncate w-full">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Hide native scrollbar */
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
