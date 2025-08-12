"use client";

import React, { useState, useEffect } from "react";

export function MenuForm({ initialData = {}, onSubmit, onClose, isLoading }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setPrice(initialData.price != null ? initialData.price.toString() : "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: initialData.id || null,  // include id for updates
      name,
      description,
      price: parseFloat(price) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          required
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          required
          type="number"
          step="0.01"
          min="0"
          className="mt-1 block w-full border border-gray-300 rounded p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          disabled={isLoading}
        >
          {initialData.id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
