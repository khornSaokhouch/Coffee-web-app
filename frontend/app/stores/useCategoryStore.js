// src/stores/useCategoryStore.js

import { create } from "zustand";
import { request } from "../util/request";

export const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  // Fetch categories
fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await request("/categories", "GET");
      set({ categories: res, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to fetch categories",
        loading: false,
      });
    }
  },
  
  // Create category with FormData
  createCategory: async (formData) => {
    set({ loading: true, error: null });
    try {
      await request("/categories", "POST", formData);
      await get().fetchCategories();
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to create category",
        loading: false,
      });
      throw err;
    }
  },
  
  
  updateCategory: async (id, formData) => {
    set({ loading: true, error: null });
    try {
      formData.append('_method', 'PUT'); // Add this line to override method
      await request(`/categories/${id}`, "POST", formData); // Use POST here
      await get().fetchCategories();
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to update category",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  
  // Delete category
  deleteCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      await request(`/categories/${id}`, "DELETE");
      await get().fetchCategories();
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to delete category",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },
  
}));