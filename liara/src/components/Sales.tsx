// import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import Navbar from "./NavBar";

// const Sale = () => {
//   // Sample data for products
//    const [products, setProducts] = useState([
//     /*{
//       id: 1,
//       name: "Water Reflection T-Shirt White - Unisex",
//       price: "Rs.2290.00",
//       image: "path_to_tshirt_image", // Replace with the actual path
//     },
//     {
//       id: 2,
//       name: "SHEIN Lantern Sleeve Solid Peplum Top",
//       price: "Rs.3390.00",
//       image: "path_to_peplum_top_image", // Replace with the actual path
//     },
//     {
//       id: 3,
//       name: "MEROKEETY Women Square Neck Lantern Long Sleeve",
//       price: "Rs.7900.00",
//       image: "path_to_dress_image", // Replace with the actual path
//     },*/
//   ]); 

//   return (
//     <>
//     <div className="Sale-page flex flex-col justify-between min-h-screen p-4">
//       <div className="filters w-1/5 pr-5 border-r-1">
//         <h2 className="Sale text-2xl mb-5 text-black ">Sale's</h2>
//         <div className="filter-group mb-2.5">
//           <label className="block text-base font-bold mb-2 text-black">Category</label>
//           <select className="w-full	p-2 border-2 rounded text-sm text-black">
//             <option value="">All</option>
//             <option value="Mens">Mens</option>
//             <option value="Womens">Womens</option>
//             <option value="Kids">Kids</option>
//           </select>
//         </div>
//         <div className="filter-group">
//           <label className="block text-base font-bold mb-2 text-black">Clothing Size</label>
//           <select className="w-full	p-2 border-2 rounded text-sm text-black">
//             <option value="">All</option>
//             <option value="small">Small</option>
//             <option value="medium">Medium</option>
//             <option value="large">Large</option>
//           </select>
//         </div>
//         <div className="filter-group">
//           <label className="block text-base font-bold mb-2 text-black">Colour</label>
//           <select className="w-full	p-2 border-2 rounded text-sm text-black">
//             <option value="">All</option>
//             <option value="white">White</option>
//             <option value="black">Black</option>
//             <option value="green">Green</option>
//             <option value="green">Red</option>
//             <option value="green">Blue</option>

//           </select>
//         </div>
//       </div>

      
//       <button className="text-sm py-3 px-8 view-all-btn mt-8 text-white font-bold	 bg-black	w-52 rounded-3xl self-center cursor-pointer	">VIEW ALL PRODUCTS</button>
//     </div>
//     </>
//   );
// };

// export default Sale;

import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import Navbar from "./NavBar";

const Sale = () => {
  // Sample data for products
   const [products, setProducts] = useState([
    
  ]); 

  return (
    <>
    <div className="women-page flex flex-col min-h-screen p-4">
   <div className="filters w-1/5 pr-5 border-r border-gray-300">
   <h2 className="text-2xl font-bold mb-5 mt-5">Sale's</h2>
   <div className="filter-group mb-4">
   <label className="block text-base font-bold mb-2">Category</label>
   <select className="w-full p-2 border rounded">
            <option value="">All</option>
            <option value="Mens">Mens</option>
            <option value="Womens">Womens</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="filter-group mb-4">
            <label className="block text-base font-bold mb-2">Clothing Size</label>
            <div className="grid grid-cols-4 gap-4">
            {[
      { label: 'S', value: 'small' },
      { label: 'M', value: 'medium' },
      { label: 'L', value: 'large' },
      { label: 'XL', value: 'extralarge' },
    ].map((size) => (
      <label
        key={size.value}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <input
          type="radio"
          name="clothingSize"
          value={size.value}
          className="accent-black"
          defaultChecked={size.value === ''}
        />
        <span className="text-sm">{size.label}</span>
      </label>
    ))}
            </div>
          </div>
          <div className="filter-group">
            <label className="block text-base font-bold mb-2">Colour</label>
            <div className="grid grid-cols-4 gap-4">
            {[
       '#ffc0cb', // pink
       '#ffffff', // white
        '#000000', //black
        '#008000', //green
        '#ff0000', //red
        '#0000ff', //blue
        '#ffff00', //yellow
        '#ffa500', //orange
    ].map((color, index) => (
      <label key={index} className="relative cursor-pointer w-6 h-6">
        <input
          type="radio"
          name="color"
          value={color}
          className="peer absolute inset-0 opacity-0 cursor-pointer"
        />
        <span
          className="block w-6 h-6 rounded-full border border-gray-400 peer-checked:ring-2 peer-checked:ring-black"
          style={{ backgroundColor: color }}
        ></span>
      </label>
    ))}
            </div>
          </div>
        </div>
        <button
  className="text py-3 px-8 view-all-btn mt-8 text-white font-bold bg-black w-55 rounded-3xl self-center cursor-pointer"
  onClick={() => (true)}>
  VIEW ALL PRODUCTS
</button>

    </div>
    </>
  );
};

export default Sale;
