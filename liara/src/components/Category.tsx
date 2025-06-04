import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { IoSearch } from "react-icons/io5";
import { MdOutlineModeEdit, MdOutlineDelete } from "react-icons/md";
import { FiPlus, FiMinus, FiChevronRight } from "react-icons/fi";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
}

const Category: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<{ [key: number]: SubCategory[] }>({});
  const [expandedCategories, setExpandedCategories] = useState<{ [key: number]: boolean }>({});
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5005/api/Categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const fetchSubcategories = async (categoryId: number) => {
    if (!subCategories[categoryId]) {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/Categories/SubCategories/${categoryId}`
        );
        setSubCategories((prev) => ({
          ...prev,
          [categoryId]: response.data,
        }));
      } catch (err) {
        console.error("Error fetching subcategories:", err);
        setError("Failed to fetch subcategories");
      }
    }
  };

  const handleToggleSubcategories = (categoryId: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));

    if (!subCategories[categoryId]) {
      fetchSubcategories(categoryId);
    }
  };

  const handleEditCategory = (id: number) => {
    navigate(`/edit-category/${id}`);
  };

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:5005/api/Categories/${id}`);
        setCategories(categories.filter((category) => category.id !== id));
      } catch (err) {
        console.error("Error deleting category:", err);
        setError("Failed to delete category");
      }
    }
  };

  const handleAddCategory = () => {
    navigate("/Addcategory");
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 p-8 ml-64">
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
              <p className="text-gray-600">Organize your product categories and subcategories</p>
            </div>
            
            {/* <button
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
              onClick={handleAddCategory}
            >
              <FiPlus className="text-lg" />
              <span>Add Category</span>
            </button> */}
          </div>
          
          {/* Search Section */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search categories by name..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Categories Table */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subcategories
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((category) => (
                        <React.Fragment key={category.id}>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">{category.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <button
                                onClick={() => handleToggleSubcategories(category.id)}
                                className="flex items-center justify-center w-full text-indigo-600 hover:text-indigo-900"
                              >
                                {expandedCategories[category.id] ? (
                                  <FiMinus className="h-5 w-5" />
                                ) : (
                                  <FiPlus className="h-5 w-5" />
                                )}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                              <div className="flex justify-center space-x-4">
                                {/* <button
                                  className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                  title="View"
                                >
                                  <IoSearch className="h-5 w-5" />
                                </button> */}
                                {/* <button
                                  onClick={() => handleEditCategory(category.id)}
                                  className="text-blue-600 hover:text-blue-900 transition-colors"
                                  title="Edit"
                                >
                                  <MdOutlineModeEdit className="h-5 w-5" />
                                </button> */}
                                <button
                                  onClick={() => handleDeleteCategory(category.id)}
                                  className="text-red-600 hover:text-red-900 transition-colors"
                                  title="Delete"
                                >
                                  <MdOutlineDelete className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          {expandedCategories[category.id] && subCategories[category.id] && (
                            <>
                              {subCategories[category.id].map((subCategory) => (
                                <tr key={subCategory.id} className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="px-6 py-2 whitespace-nowrap">
                                    <div className="flex items-center pl-10">
                                      <FiChevronRight className="text-gray-400 mr-2" />
                                      <div className="text-sm text-gray-500">{subCategory.name}</div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-2 whitespace-nowrap text-center text-sm text-gray-500">
                                    Subcategory
                                  </td>
                                  <td className="px-6 py-2 whitespace-nowrap text-center text-sm font-medium">
                                    <div className="flex justify-center space-x-4">
                                      {/* <button
                                        className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                        title="View"
                                      >
                                        <IoSearch className="h-5 w-5" />
                                      </button>
                                      <button
                                        className="text-blue-600 hover:text-blue-900 transition-colors"
                                        title="Edit"
                                      >
                                        <MdOutlineModeEdit className="h-5 w-5" />
                                      </button> */}
                                      {/* <button
                                        className="text-red-600 hover:text-red-900 transition-colors"
                                        title="Delete"
                                      >
                                        <MdOutlineDelete className="h-5 w-5" />
                                      </button> */}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                          {searchTerm ? "No categories match your search." : "No categories available."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;