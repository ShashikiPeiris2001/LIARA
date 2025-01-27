import React from "react";
import AdminSidebar from "./AdminSidebar";

const Addproduct: React.FC = () => {
  

  return (
    <div className="flex">
      <AdminSidebar/>

      {/* Main Content */}
      
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6 w-screen">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-md p-8">
        <h2 className="text-2xl font-bold mb-6">Add Product</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name :
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category :
              </label>
              <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option>Select</option>
              </select>
            </div>
            {/* Stock-size Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock-size Quantity :
              </label>
              <input
                type="number"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* Sub Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sub Category :
              </label>
              <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option>Select</option>
              </select>
            </div>
            {/* Select Colour */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Colour :
              </label>
              <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option>Select</option>
              </select>
            </div>
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price :
              </label>
              <input
                type="number"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Size :
            </label>
            <div className="flex items-center gap-4 mt-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <label key={size} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="mt-6">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
            >
              Select Image
            </button>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>

        
      
    </div>
  );
};

export default Addproduct;