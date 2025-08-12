// src/components/ui/LoadingSpinner.jsx
import React from "react";

export const LoadingSpinner = ({ size = "w-8 h-8" }) => (
  <div
    className={`${size} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
  ></div>
);