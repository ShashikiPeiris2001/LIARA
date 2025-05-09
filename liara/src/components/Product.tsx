import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { IoSearch } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";

const Product: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<{ id: number; name: string; price: number; Category: string; Stock: number;
    Status: string; }[]>([]);
  const [error, setError] = useState<string>("");



  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/Product/GetAllProducts");
      console.log("API Response:", response.data); // ✅ Verify API data structure
  
      const formattedProducts = response.data.map((product: any) => ({
        id: product.productID,  // ✅ Fix casing (ProductID → productID)
        name: product.name, // ✅ Fix casing (Name → name)
        Category: product.categoryName, // ✅ Fix casing (CategoryName → categoryName)
        Stock: product.stock , // ✅ Fix Stock condition
        Status: product.status,
      }));
  
      console.log("Formatted Products:", formattedProducts); // ✅ Verify mapping
      setProducts(formattedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
    }
  };
  const reduceStock = async (productId: number, quantity: number) => {
    try {
      await axios.put(`http://localhost:5005/api/Product/ReduceStock/${productId}`, quantity, {
        headers: { "Content-Type": "application/json" },
      });
      fetchProducts(); // Refresh products
    } catch (error) {
      console.error("Error reducing stock:", error);
    }
  };
  
  
  
const handleDeleteProduct = async (productId: number) => {
  if (window.confirm("Are you sure you want to delete this Product?")) { 
  try {
    // API call to delete product
    await axios.delete(`http://localhost:5005/api/Product/DeleteProduct/${productId}`);
    // Update UI: Remove the product from state
    setProducts(products.filter((product) => product.id !== productId));
  } catch (error) {
    console.error("Error deleting product:", error);
    setError("Failed to delete the product. Please try again.");
  }
}
};
useEffect(() => {
  fetchProducts();
}, []);

const handleAddProduct = () => {
  navigate("/Addproduct");
};
  
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="min-h-screen bg-gray-50 p-6 w-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Product</h1>
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-red-600 transition" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-md">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 border">Product Name</th>
                <th className="text-left px-4 py-2 border">Category Name</th>
                <th className="text-left px-4 py-2 border">Stock</th>
                <th className="text-left px-4 py-2 border">Status</th>
                <th className="text-center px-4 py-2 border">View</th>
                <th className="text-center px-4 py-2 border">Edit</th>
                <th className="text-center px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>

              {products.map((Product) => (
                <tr key={Product.id} className="text-gray-700">
                 <td className="px-4 py-2 border">{Product.name || "N/A"}</td>
                <td className="px-4 py-2 border">{Product.Category || "N/A"}</td>

                <td className="px-4 py-2 border">{Product.Stock}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        Product.Status === "Sold Out" ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"
                      }`}
                    >
                      {Product.Status}
                    </span>
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
                    <button onClick={() => handleDeleteProduct(Product.id)} className="text-lg text-black">
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

export default Product;
