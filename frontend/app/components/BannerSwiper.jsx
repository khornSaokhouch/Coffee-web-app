// src/components/BannerSwiper.tsx

"use client";

import React, { useEffect } from "react";
import { useCategoryStore } from "../stores/useCategoryStore";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

//
// ✅ 1. Define the Skeleton Loader Component
//
const BannerSkeleton = () => {
  return (
    // Use the same outer container as the Swiper for consistent padding and width
    <div className="w-full max-w-xl mx-auto px-4 py-4">
      {/* This is the placeholder block */}
      <div className="bg-gray-200 rounded-2xl w-full h-44 animate-pulse"></div>
    </div>
  );
};

const BannerSwiper = () => {
  const { categories, loading, error, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ✅ 2. Use the BannerSkeleton component when loading
  if (loading) return <BannerSkeleton />;

  // The error and empty states now also benefit from consistent centering
  if (error) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-6 text-center text-red-500 h-44 flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-6 text-center text-gray-500 h-44 flex items-center justify-center">
        No banners available.
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={category.category_image_url || "/default-banner.jpg"}
                alt={category.name}
                className="w-full h-44 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center px-6">
                <h2 className="text-white text-2xl font-semibold">{category.name}</h2>
                <p className="text-white mt-1">{category.description || "Check out our special offers!"}</p>
                <button className="mt-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full py-2 px-4 text-sm font-bold max-w-max">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSwiper;