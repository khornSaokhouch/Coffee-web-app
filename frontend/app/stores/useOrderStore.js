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
      set({ orders, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message || "Failed to fetch orders",
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
        error: err?.response?.data?.message || err.message || "Failed to create order",
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
        error: err?.response?.data?.message || err.message || "Failed to update order",
        loading: false,
      });
      throw err;
    }
  },

  deleteOrder: async (id) => {
    set({ loading: true, error: null });
    try {
      await request(`/orders/${id}`, "DELETE");
      await get().fetchOrders();
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message || "Failed to delete order",
        loading: false,
      });
    }
  },

  fetchOrderItems: async (orderId) => {
    set({ loading: true, error: null });
    try {
      // Laravel already returns items when fetching a single order
      const order = await request(`/orders/${orderId}`, "GET");
      set({ loading: false });
      return order.order_items || [];
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message || "Failed to fetch order items",
        loading: false,
      });
      return [];
    }
  },
}));
