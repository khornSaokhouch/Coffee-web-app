// components/BottomNavigation.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
// 1. Import clean, modern icons from react-icons
import { RiHome2Line, RiFileList2Line } from 'react-icons/ri';

// A reusable NavItem component to keep our code clean (DRY principle)
const NavItem = ({ href, icon: Icon, label, activeTab, setActiveTab }) => {
  const isActive = activeTab === label.toLowerCase();
  
  return (
    <Link href={href} passHref>
      <button
        onClick={() => setActiveTab(label.toLowerCase())}
        // 2. Dynamic styling for active/inactive states
        className={`flex flex-col items-center justify-center gap-1 w-24 h-16 rounded-2xl transition-all duration-300 ease-in-out
          ${isActive 
            ? 'text-amber-400' 
            : 'text-slate-400 hover:text-amber-400'
          }`}
      >
        <Icon size={26} />
        <span className="text-xs font-bold">
          {label}
        </span>
      </button>
    </Link>
  );
};

const BottomNavigation = () => {
  // In a real app, you would use `usePathname()` from Next.js to determine the active tab
  // For this example, we'll use local state to show how it works.
  const [activeTab, setActiveTab] = useState('home');

  return (
    // 3. Main container with "glassmorphism" style to match the rest of the app
    <nav className="fixed bottom-0 left-0 right-0 z-50
      bg-gray-900/60 backdrop-blur-lg 
      border-t border-slate-700/50
      rounded-t-3xl shadow-t-lg">
      <div className="flex items-center justify-around max-w-lg mx-auto p-2">
        {/* 4. Using the new, clean NavItem component */}
        <NavItem 
          href="/home" 
          icon={RiHome2Line} 
          label="Home"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <NavItem 
          href="/orders" 
          icon={RiFileList2Line} 
          label="Orders"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </nav>
  );
};

export default BottomNavigation;