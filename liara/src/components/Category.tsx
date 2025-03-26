import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { IoSearch } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
// import { fetchCategories } from "../services/apiService";

const Category: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<{ id: number; name: string}[]>([]);
  const [error, setError] = useState<string>("");

  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/Categories"); // Adjust API URL as needed
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
      }
    };

    loadCategories();
  }, []);

  const handleAddCategory = () => {
    navigate("/Addcategory");
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="min-h-screen bg-gray-50 p-6 w-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>
          <button 
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-md">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 border">Name</th>
                <th className="text-center px-4 py-2 border">Sub Category</th>
                <th className="text-center px-4 py-2 border">View</th>
                <th className="text-center px-4 py-2 border">Edit</th>
                <th className="text-center px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="text-gray-700">
                  <td className="px-4 py-2 border">{category.name}</td>
                  <td className="px-4 py-2 border text-center">
                  <button className="text-lg">
                     <FaPlus className="hover:text-gray-500 transition" />
                    </button>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button className="text-lg">
                     <IoSearch className="hover:text-gray-500 transition" />
                    </button>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button className="text-lg">
                     <MdOutlineModeEdit className="hover:text-gray-500 transition" />
                    </button>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button className="text-lg text-black">
                      <MdOutlineDelete className="hover:text-gray-500 transition" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Category;
