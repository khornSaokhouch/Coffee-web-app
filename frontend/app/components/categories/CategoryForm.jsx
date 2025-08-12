"use client";

import React, { useState, useEffect } from "react";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export const CategoryForm = ({
  onSubmit,
  onClose,
  initialData = null,
  isLoading,
}) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setImagePreview(initialData.category_image ? initialData.category_image_url || initialData.category_image : null);
    } else {
      // Reset form for create mode
      setName("");
      setImageFile(null);
      setImagePreview(null);
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name.trim());
    if (imageFile) {
      formData.append('category_image', imageFile); // Must match backend field name!
    }
    onSubmit(formData);
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Category Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category Image
        </label>
        <div className="mt-1 flex items-center space-x-4">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 rounded-md object-cover"
            />
          )}
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center min-w-[80px]"
          disabled={isLoading || !name.trim()}
        >
          {isLoading ? <LoadingSpinner size="w-5 h-5" /> : "Save"}
        </button>
      </div>
    </form>
  );
};
