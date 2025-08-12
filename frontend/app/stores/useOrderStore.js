import { create } from "zustand";
import { request } from "../util/request";

export const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await request("/orders", "GET");

      // Optionally, fetch order items for each order (if your backend provides that)
      // Or fetch order items separately in another call/page

      set({ orders, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to fetch orders",
        loading: false,
      });
    }
  },

  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      await request("/orders", "POST", orderData);
      await get().fetchOrders();
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to create order",
        loading: false,
      });
      throw err;
    }
  },

  updateOrder: async (id, orderData) => {
    set({ loading: true, error: null });
    try {
      await request(`/orders/${id}`, "PUT", orderData);
      await get().fetchOrders();
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to update order",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteOrder: async (id) => {
    set({ loading: true, error: null });
    try {
      await request(`/orders/${id}`, "DELETE");
      await get().fetchOrders();
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to delete order",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchOrderItems: async (orderId) => {
    set({ loading: true, error: null });
    try {
      const orderItems = await request(`/orders/${orderId}/items`, "GET");
      return orderItems;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to fetch order items",
        loading: false,
      });
      return [];
    } finally {
      set({ loading: false });
    }
  },
}));
