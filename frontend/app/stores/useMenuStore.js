import { create } from "zustand";
import { request } from "../util/request"; // your custom fetch wrapper

export const useMenuStore = create((set, get) => ({
  menuItems: [],
  loading: false,
  error: null,
  searchTerm: "",

  fetchMenu: async () => {
    set({ loading: true, error: null });
    try {
      const data = await request("/coffee-menu", "GET");
      set({ menuItems: data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to fetch menu",
        loading: false,
      });
    }
  },

  setSearchTerm: (term) => set({ searchTerm: term }),

  getMenuItem: async (id) => {
    set({ loading: true, error: null });
    try {
      const item = await request(`/coffee-menu/${id}`, "GET");
      set({ loading: false });
      return item;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to fetch menu item",
        loading: false,
      });
      return null;
    }
  },

  createMenuItem: async (formData) => {
    set({ loading: true, error: null });
    try {
      await request("/coffee-menu", "POST", formData);
      await get().fetchMenu(); // refresh list
      set({ loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to create menu item",
        loading: false,
      });
      throw err;
    }
  },

  updateMenuItem: async (id, formData) => {
    set({ loading: true, error: null });
    try {
      await request(`/coffee-menu/${id}`, "PUT", formData);
      await get().fetchMenu();
      set({ loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to update menu item",
        loading: false,
      });
      throw err;
    }
  },

  deleteMenuItem: async (id) => {
    set({ loading: true, error: null });
    try {
      await request(`/coffee-menu/${id}`, "DELETE");
      await get().fetchMenu();
      set({ loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to delete menu item",
        loading: false,
      });
      throw err;
    }
  },
}));
