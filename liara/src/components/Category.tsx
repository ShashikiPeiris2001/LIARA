// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminSidebar from "./AdminSidebar";
// import { IoSearch } from "react-icons/io5";
// import { MdOutlineModeEdit } from "react-icons/md";
// import { MdOutlineDelete } from "react-icons/md";
// import { FaPlus } from "react-icons/fa6";
// import axios from "axios";
// // import { fetchCategories } from "../services/apiService";

// const Category: React.FC = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState<{ id: number; name: string}[]>([]);
//   const [error, setError] = useState<string>("");

  
//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:5005/api/Categories"); // Adjust API URL as needed
//         setCategories(response.data);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//         setError("Failed to fetch categories");
//       }
//     };

//     loadCategories();
//   }, []);

//   const handleAddCategory = () => {
//     navigate("/Addcategory");
//   };

//   return (
//     <div className="flex">
//       <AdminSidebar />
//       <div className="min-h-screen bg-gray-50 p-6 w-screen">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold">Categories</h1>
//           <button 
//             className="bg-black text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
//             onClick={handleAddCategory}
//           >
//             Add Category
//           </button>
//         </div>
//         <div className="overflow-x-auto bg-white shadow-md rounded-md">
//           <table className="min-w-full border-collapse border border-gray-200">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="text-left px-4 py-2 border">Name</th>
//                 <th className="text-center px-4 py-2 border">Sub Category</th>
//                 <th className="text-center px-4 py-2 border">View</th>
//                 <th className="text-center px-4 py-2 border">Edit</th>
//                 <th className="text-center px-4 py-2 border">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.map((category) => (
//                 <tr key={category.id} className="text-gray-700">
//                   <td className="px-4 py-2 border">{category.name}</td>
//                   <td className="px-4 py-2 border text-center">
//                   <button className="text-lg">
//                      <FaPlus className="hover:text-gray-500 transition" />
//                     </button>
//                   </td>
//                   <td className="px-4 py-2 border text-center">
//                     <button className="text-lg">
//                      <IoSearch className="hover:text-gray-500 transition" />
//                     </button>
//                   </td>
//                   <td className="px-4 py-2 border text-center">
//                     <button className="text-lg">
//                      <MdOutlineModeEdit className="hover:text-gray-500 transition" />
//                     </button>
//                   </td>
//                   <td className="px-4 py-2 border text-center">
//                     <button className="text-lg text-black">
//                       <MdOutlineDelete className="hover:text-gray-500 transition" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Category;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { IoSearch } from "react-icons/io5";
import { MdOutlineModeEdit, MdOutlineDelete } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
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

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/Categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
      }
    };

    loadCategories();
  }, []);

  const fetchSubcategories = async (categoryId: number) => {
    if (!subCategories[categoryId]) {
      try {
        const response = await axios.get(`http://localhost:5005/api/Categories/SubCategories/${categoryId}`);
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
                <React.Fragment key={category.id}>
                  <tr className="text-gray-700">
                    <td className="px-4 py-2 border">{category.name}</td>
                    <td className="px-4 py-2 border text-center">
                      <button className="text-lg" onClick={() => handleToggleSubcategories(category.id)}>
                        {expandedCategories[category.id] ? <FaMinus className="hover:text-gray-500 transition" /> : <FaPlus className="hover:text-gray-500 transition" />}
                      </button>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button className="text-lg">
                        <IoSearch className="hover:text-gray-500 transition" />
                      </button>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button className="text-lg" onClick={() => handleEditCategory(category.id)}>
                        <MdOutlineModeEdit className="hover:text-gray-500 transition" />
                      </button>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button className="text-lg text-black" onClick={() => handleDeleteCategory(category.id)}>
                        <MdOutlineDelete className="hover:text-gray-500 transition" />
                      </button>
                    </td>

                  </tr>
                  {expandedCategories[category.id] &&
                    subCategories[category.id] &&
                    subCategories[category.id].map((subCategory) => (
                      <tr key={subCategory.id} className="bg-gray-50">
                        {/* Empty cell for "Category" and other columns */}
                        <td className="px-4 py-2 border"></td>
                        <td className="px-4 py-2 border text-center">
                          {subCategory.name} {/* Subcategory name under the "Sub Category" column */}
                        </td>
                        <td colSpan={3} className="px-4 py-2 border"></td>
                      </tr>
                    ))}
                </React.Fragment>
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
