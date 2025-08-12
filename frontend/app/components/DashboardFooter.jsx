// components/DashboardFooter.js
import React from "react";

export function DashboardFooter() {
  return (
    <footer className="text-center p-4 mt-auto border-t border-slate-200 bg-white">
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </footer>
  );
}