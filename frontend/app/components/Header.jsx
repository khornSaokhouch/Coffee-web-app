"use client";

import React, { useEffect } from "react";
import { useUserStore } from "../stores/userStore";

const Header = () => {
  const { user, fetchUser, loading } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <header className="py-4 px-6 flex items-center justify-between">
      <button className="text-gray-700 focus:outline-none">☰</button>

      <div className="flex items-center">
        <svg
          xmlns=""
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 mr-1"
        >
          <path
            fillRule="evenodd"
            d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3V12a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-7.5 8.25A3.75 3.75 0 1115 5.25 3.75 0 014.5 9.75z"
            clipRule="evenodd"
          />
        </svg>
        {user ? user.address || "Welcome to E-Coffee" : "Loading..."}
      </div>

      <div className="flex items-center space-x-2">
        {/* Use image from public folder directly */}
        <img
          src="/image.png"
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />

        {/* User Name */}
        <span className="text-gray-700 font-medium">
          {user ? user.name : loading ? "Loading..." : "Guest"}
        </span>
      </div>
    </header>
  );
};

export default Header;
