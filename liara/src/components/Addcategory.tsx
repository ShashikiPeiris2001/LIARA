import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

const API_BASE_URL = "http://localhost:5005/api";

const AddCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([""]);
  const [message, setMessage] = useState<string>("");

  const handleSubCategoryChange = (index: number, value: string) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index] = value;
    setSubCategories(updatedSubCategories);
  };

  const addSubCategoryField = () => {
    setSubCategories([...subCategories, ""]);
  };

  const removeSubCategoryField = (index: number) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setMessage("Category name is required.");
      return;
    }

    const data = {
      categoryName,
      subCategories: subCategories.filter(name => name.trim()).map(name => ({ subCategoryName: name })),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/category/Addcategory`, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setMessage("Category and subcategories added successfully!");
        setCategoryName("");
        setSubCategories([""]);
      } else {
        setMessage("Failed to add category.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setMessage("Failed to add category.");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6 w-screen">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-8">
          <h2 className="text-2xl font-bold mb-6">Add Category</h2>
          {message && <p className="text-green-500 mb-4">{message}</p>}
          <form onSubmit={handleSubmit}>
            {/* Category Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category Name:</label>
              <input 
                type="text" 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                value={categoryName} 
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            {/* Subcategories */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Subcategories:</label>
              {subCategories.map((subCategory, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    value={subCategory}
                    onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                    className="w-full border p-2 rounded-md"
                    placeholder="Enter subcategory name"
                  />
                  {index > 0 && (
                    <button 
                      type="button" 
                      onClick={() => removeSubCategoryField(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSubCategoryField}
                className="mt-2 bg-gray-300 text-black px-3 py-1 rounded-md hover:bg-gray-400"
              >
                + Add Subcategory
              </button>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400">Cancel</button>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700">Save Category</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
