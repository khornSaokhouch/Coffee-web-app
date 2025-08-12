"use client";

import React, { useEffect, useState } from "react";
import { useCategoryStore } from "../../stores/useCategoryStore";
import { CategoryList } from "./CategoryList";
import { CategoryForm } from "./CategoryForm";
import { Modal } from "../ui/Modal";
import { ConfirmDeleteModal } from "../ui/ConfirmDeleteModal";

const CategoryManagerPage = () => {
  const {
    categories,
    loading: isLoading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoryStore();

  // Local UI state
  const [isMutating, setIsMutating] = useState(false); // For create/update form submissions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]); // Directly use fetchCategories from the store

  // Modal open handlers
  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Submit handler for create/update form
  const handleSubmit = async (formData) => {
    setIsMutating(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
      } else {
        await createCategory(formData);
      }
      handleCloseModal();
    } catch (err) {
      console.error("Failed to save category:", err);
    } finally {
      setIsMutating(false);
    }
  };

  // --- DELETE FLOW ---

  // 1. When the user clicks the "Delete" button on an item in the list
  const handleDeleteClick = (category) => {
    // console.log("Delete clicked:", category);
    setCategoryToDelete(category);
  };
  
  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      // console.log("Confirm delete for:", categoryToDelete);
      await deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null); // Close the modal on success
    }
  };
  

  // 3. When the user cancels deletion in the modal
  const handleCancelDelete = () => {
    setCategoryToDelete(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
            Category Manager
          </h1>
          <button
            onClick={handleOpenCreateModal}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            + Add New Category
          </button>
        </div>

        {error && (
          <div
            className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        <CategoryList
          categories={categories}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteClick} // <-- THE FIX IS HERE
          isLoading={isLoading}
          isMutating={isLoading} // The global store loading is sufficient for disabling buttons
        />
      </main>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCategory ? "Edit Category" : "Create New Category"}
      >
        <CategoryForm
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          initialData={editingCategory}
          isLoading={isMutating}
        />
      </Modal>

      {/* Confirmation Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!categoryToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the category "${categoryToDelete?.name}"? This action cannot be undone.`}
        isLoading={isLoading} // The global store loading state is perfect for this
      />
    </div>
  );
};

export default CategoryManagerPage;