import React, { useState, useEffect } from "react";
import Header from "./Header";

const Kids = () => {
  // Sample data for products
   const [products, setProducts] = useState([
    /*{
      id: 1,
      name: "Water Reflection T-Shirt White - Unisex",
      price: "Rs.2290.00",
      image: "path_to_tshirt_image", // Replace with the actual path
    },
    {
      id: 2,
      name: "SHEIN Lantern Sleeve Solid Peplum Top",
      price: "Rs.3390.00",
      image: "path_to_peplum_top_image", // Replace with the actual path
    },
    {
      id: 3,
      name: "MEROKEETY Women Square Neck Lantern Long Sleeve",
      price: "Rs.7900.00",
      image: "path_to_dress_image", // Replace with the actual path
    },*/
  ]); 

  return (
    <>
    <div className="Men-page flex flex-col justify-between min-h-screen p-4">
      <div className="filters w-1/5 pr-5 border-r-1">
        <h2 className="text-2xl mb-5 text-black ">Kid's</h2>
        <div className="filter-group mb-2.5">
          <label className="block text-base font-bold mb-2 text-black">Category</label>
          <select className="w-full	p-2 border-2 rounded text-sm text-black">
            <option value="">All</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Toddlers">Toddlers</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="block text-base font-bold mb-2 text-black">Clothing Size</label>
          <select className="w-full	p-2 border-2 rounded text-sm text-black">
            <option value="">All</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="block text-base font-bold mb-2 text-black">Colour</label>
          <select className="w-full	p-2 border-2 rounded text-sm text-black">
            <option value="">All</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="green">Green</option>
            <option value="green">Red</option>
            <option value="green">Blue</option>

          </select>
        </div>
      </div>

      
      <button className="text-sm py-3 px-8 view-all-btn mt-8  text-white font-bold	 bg-black	w-52 rounded-3xl self-center cursor-pointer	">VIEW ALL PRODUCTS</button>
    </div>
    </>
  );
};

export default Kids;
