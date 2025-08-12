// app/dashboard/layout.js
"use client";

import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardFooter } from "../components/DashboardFooter";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // The main content area needs a left margin that matches the sidebar width on desktop
  // It also needs a transition to smoothly adjust when the viewport resizes
  const mainContentClasses = `flex-1 flex flex-col transition-all duration-300 ease-in-out md:ml-64`;

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content wrapper */}
      <div className={mainContentClasses}>
        <DashboardHeader onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-grow p-4 sm:p-6">{children}</main>

        <DashboardFooter  />
      </div>
    </div>
  );
}