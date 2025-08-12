"use client";

import React, { useEffect, useState } from "react";
import { useMenuStore } from "../../stores/useMenuStore";
import { MenuList } from "../../components/menu/MenuList";
import { MenuForm } from "../../components/menu/MenuForm";
import { ConfirmDeleteModal } from "../../components/menu/ConfirmDeleteModal";

const ITEMS_PER_PAGE = 6;

export default function CoffeeMenuPage() {
  const {
    menuItems,
    loading,
    error,
    fetchMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
  } = useMenuStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isMutating, setIsMutating] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // Calculate paginated items
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = menuItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(menuItems.length / ITEMS_PER_PAGE);

  const openCreateForm = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (data) => {
    setIsMutating(true);
    try {
      if (editingItem) {
        await updateMenuItem(editingItem.id, data);
      } else {
        await createMenuItem(data);
      }
      closeForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsMutating(false);
    }
  };

  const handleDeleteClick = (item) => {
    setDeletingItem(item);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setIsMutating(true);
    try {
      await deleteMenuItem(deletingItem.id);
      setDeletingItem(null);
      // If the last item on the current page was deleted, move to previous page if any
      if (paginatedItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsMutating(false);
    }
  };

  const handleCancelDelete = () => {
    setDeletingItem(null);
  };

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coffee Menu</h1>
        <button
          onClick={openCreateForm}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Item
        </button>
      </div>

      {error && (
        <div className="mb-4 text-red-600 font-semibold">{error}</div>
      )}

      <MenuList
        menuItems={paginatedItems}
        onEdit={openEditForm}
        onDelete={handleDeleteClick}
        isLoading={loading}
      />

      {/* Pagination Controls */}
      {menuItems.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded border ${
              currentPage === 1
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-700 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Previous
          </button>
          <span className="self-center text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded border ${
              currentPage === totalPages
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-700 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <MenuForm
              initialData={editingItem}
              onSubmit={handleSubmit}
              onClose={closeForm}
              isLoading={isMutating}
            />
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={!!deletingItem}
        itemName={deletingItem?.name}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isMutating}
      />
    </div>
  );
}
