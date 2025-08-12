// components/DashboardHeader.js
"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu, HiOutlineLogout } from "react-icons/hi";
import { useUserStore } from "../stores/userStore"; // For user data (name, email)
import { useAuthStore } from "../stores/authStore"; // For authentication actions
import { ConfirmationModal } from "../components/ui/ConfirmationModal"; // Import the new modal
import { useRouter } from "next/navigation";

export function DashboardHeader({ onToggleSidebar }) {
    
const router = useRouter();

  // Get user data from one store
  const { user, fetchUser, loading } = useUserStore();
  // Get sign out action from another store
  const { logout } = useAuthStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // State for the confirmation modal
  const dropdownRef = useRef(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    if (!user && !loading) {
      fetchUser();
    }
  }, [user, loading, fetchUser]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    setIsConfirmOpen(false); // Close the modal
    router.push('/');    // Redirect to login page
  };

  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm shadow-sm z-20">
        <div className="flex items-center justify-between p-4 h-16">
          {/* Left side: Hamburger and Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 rounded-full text-slate-500 hover:bg-slate-100"
              aria-label="Toggle sidebar"
            >
              <HiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
              Dashboard
            </h1>
          </div>

          {/* Right side: User Profile with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100"
            >
              <span className="font-medium text-slate-700 truncate">
                {user?.name ?? "Loading..."}
              </span>
              <FaUserCircle className="w-8 h-8 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-30">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <a
                    href="#signout"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(false); // Close the dropdown
                      setIsConfirmOpen(true); // Open the confirmation modal
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <HiOutlineLogout className="w-5 h-5" />
                    Sign Out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Confirmation Modal for Logout */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleSignOut}
        title="Confirm Sign Out"
        message="Are you sure you want to sign out?"
        confirmText="Sign Out"
      />
    </>
  );
}