"use client";

import React from "react";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

const UserLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header at the top */}
      <Header />

      {/* Main content grows to fill available space */}
      <main className="flex-grow">{children}</main>

      {/* Bottom navigation fixed at the bottom */}
      <footer>
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default UserLayout;
