"use client";
import React, { useEffect } from "react";
import PopularMealMenu from "../../components/PopularMealMenu";
import BannerSwiper from "../../components/BannerSwiper";
import SearchBar from "../../components/SearchBar";
import { useMenuStore } from "../../stores/useMenuStore";
import CategoryScroller from "../../components/CategoryScroller";

const HomePage = () => {
  const fetchMenu = useMenuStore((state) => state.fetchMenu);

  useEffect(() => {
    fetchMenu(); // ✅ load menu at start
  }, [fetchMenu]);

  return (
    <div className="font-sans bg-white min-h-screen text-gray-800">
      <SearchBar />
      <BannerSwiper />
      <CategoryScroller />
      <PopularMealMenu />
    </div>
  );
};

export default HomePage;
