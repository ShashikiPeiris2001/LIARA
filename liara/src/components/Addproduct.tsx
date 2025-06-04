import axios from "axios";
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";


const API_BASE_URL = "http://localhost:5005/api";

const AddProduct: React.FC = () => {
const [name, setName] = useState<string>("");
const [category, setCategory] = useState<string>("");
const [subcategory, setSubcategory] = useState<string>("");  // Add this
const [price, setPrice] = useState<number>(0);
const [description, setDescription] = useState("");  // Add this
const [selectedColors, setSelectedColors] = useState<string[]>([]);  // Add this
const [selectedSizes, setSelectedSizes] = useState<string[]>([]);  // Add this
const [stockQuantity, setStockQuantity] = useState<number>(0);
const [images, setImages] = useState<File[]>([]);
const navigate = useNavigate();

  
  const subCategories: { [key: string]: string[] } = {
    Women: ["Tops", "Dresses", "T-Shirts"],
    Men: ["Formal Shirts", "T-Shirts", "Denims"],
    Kids: ["Girls", "Boys", "Toddlers"],
  };

  // Color Selection handler
const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value, checked } = e.target;
  setSelectedColors(prev => 
      checked ? [...prev, value] : prev.filter(color => color !== value)
  );
};

// Size Selection handler
const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value, checked } = e.target;
  setSelectedSizes(prev =>
      checked ? [...prev, value] : prev.filter(size => size !== value)
  );
};


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !subcategory || !price || !stockQuantity || images.length === 0) {
      alert("Please fill all required fields.");
      return;
    }
  
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("CategoryName", category);
    formData.append("SubCategoryName", subcategory);
    formData.append("Stock", stockQuantity.toString());
    formData.append("Price", price ? price.toString() : "0");
    formData.append("Description", description || "No description provided");
    
      // Ensure Sizes array is added correctly
    if (selectedSizes.length > 0) {
      selectedSizes.forEach((size) => formData.append("Sizes", size));
    } else {
      formData.append("Sizes", "Default"); // Prevent validation error
    }

    // Ensure Colors array is added correctly
    if (selectedColors.length > 0) {
      selectedColors.forEach((color) => formData.append("Colors", color));
    } else {
      formData.append("Colors", "Default"); // Prevent validation error
    }

    // console.log(Colors);
    // console.log("Selected Colors:", productData.colors);


    images.forEach((image) => formData.append("Images", image));

    try {
      const response = await axios.post(`${API_BASE_URL}/Product/Addproduct`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("Product added successfully!");
        navigate("/Product"); 
      } else {
        alert(`Failed to add product: ${response.data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Failed to add product.");
    }
  };
  //const navigate = useNavigate();
  //navigate("/Product");

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6 w-screen">
        <div className="w-full max-w-3xl bg-white shadow-md rounded-md p-8">
          <h2 className="text-2xl font-bold mb-6">Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                value={name} 
                onChange={(e) => setName(e.target.value)}  />
              </div>
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category:</label>
                <select
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div>
                {/* Stock Quantity Input Field */}
                <label className="block text-sm font-medium text-gray-700">
                  Stock Quantity:
                </label>
                <input
                  type="number"
                  value={stockQuantity}
                  onChange={(event) => setStockQuantity(Number(event.target.value))}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  min="1"
                  required
                />
              </div>
              {/* Sub Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Sub Category:</label>
                <select 
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Select</option>
                  {category && subCategories[category]?.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>
              {/* Color Selection */}
              <div>
                  <label className="block text-sm font-medium text-gray-700">Select Colour:</label>
                  <div className="flex flex-wrap gap-3 mt-2">
                      {["Blue", "Red", "Pink", "Yellow", "Green", "Black", "White"].map((color) => (
                          <label key={color} className="inline-flex items-center">
                              <input
                                  type="checkbox"
                                  value={color}
                                  className="form-checkbox h-4 w-4 text-indigo-600"
                                  onChange={handleColorChange}
                              />
                              <span className="ml-2">{color}</span>
                          </label>
                      ))}
                  </div>
              </div>


              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Price:</label>
                <input 
                  type="number" 
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                  value={price} 
                  onChange={(event) => setPrice(Number(event.target.value))}
                  min="1"
                  required
                />
              </div>
            </div>
           
              {/* Size Chart */}
              <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700">Size Chart:</label>
                  <div className="flex items-center gap-4 mt-2">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                          <label key={size} className="inline-flex items-center">
                              <input
                                  type="checkbox"
                                  value={size}
                                  className="form-checkbox h-4 w-4 text-indigo-600"
                                  onChange={handleSizeChange}
                              />
                              <span className="ml-2">{size}</span>
                          </label>
                      ))}
                  </div>
              </div>
            {/* Image Upload */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Upload Images:</label>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="mt-2" />
              {images.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Selected Images:</p>
                  <ul>
                    {images.map((image, index) => (
                      <li key={index}>{image.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Description */}
            {/* <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Description:</label>
              <textarea rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div> */}
            {/* Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400">Cancel</button>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700">Save Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;  