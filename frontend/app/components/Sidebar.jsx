// components/Sidebar.js
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiX, HiViewGrid, HiClipboardList, HiShoppingCart } from "react-icons/hi";

const sidebarItems = [
  { name: "Category", icon: HiViewGrid, href: "/dashboard/category" },
  { name: "Menu", icon: HiClipboardList, href: "/dashboard/menu" },
  { name: "Order", icon: HiShoppingCart, href: "/dashboard/order" },
];

export function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/60 z-30 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-40 transform transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 h-16 border-b border-slate-200">
          <Link href="/dashboard" className="text-xl font-bold text-slate-800">
            YourLogo
          </Link>
          <button
            className="md:hidden p-1 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          <ul>
            {sidebarItems.map(({ name, icon: Icon, href }) => {
              const isActive = pathname === href;
              return (
                <li key={name} className="px-3 py-1">
                  <Link
                    href={href}
                    onClick={onClose} // Close sidebar on nav click on mobile
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 font-semibold shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}