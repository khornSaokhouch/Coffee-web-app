// src/components/ui/ConfirmDeleteModal.jsx
"use client";

import React from "react";
import { Modal } from "./Modal";
import { LoadingSpinner } from "./LoadingSpinner";

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-gray-600 mb-6">{message}</div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center justify-center min-w-[100px]"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="w-5 h-5" /> : "Delete"}
        </button>
      </div>
    </Modal>
  );
};