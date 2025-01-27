// import React from "react";
// import { useNavigate } from "react-router-dom";
// import AdminSidebar from "./AdminSidebar";

// const Product: React.FC = () => {
//   const navigate = useNavigate();

//   const products = [
//     {
//       id: 1,
//       name: "Water Reflection T-Shirt",
//       category: "Womens",
//       availability: "In",
//     },
//     {
//       id: 2,
//       name: "Lantern Sleeve Solid Peplum Top",
//       category: "Womens",
//       availability: "Out",
//     },
//     {
//       id: 3,
//       name: "Linen Shirts Casual Long",
//       category: "Men",
//       availability: "In",
//     },
//   ];

//   const handleAddProduct = () => {
//     navigate("/Addproduct");
//   };

//   return (
//     <div className="flex">
//       <AdminSidebar />

//       <div className="min-h-screen bg-gray-50 p-6 w-screen">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold">Product</h1>
//           <button
//             className="bg-danger-500 text-brown px-4 py-2 rounded"
//             onClick={handleAddProduct}
//           >
//             Add Product
//           </button>
//         </div>

//         {/* Product Table */}
//         <div className="overflow-x-auto bg-white shadow-md rounded-md">
//           <table className="min-w-full border-collapse border border-gray-200">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="text-left px-4 py-2 border">Product Name</th>
//                 <th className="text-left px-4 py-2 border">Category</th>
//                 <th className="text-left px-4 py-2 border">Availability</th>
//                 <th className="text-center px-4 py-2 border">Variant</th>
//                 <th className="text-center px-4 py-2 border">View</th>
//                 <th className="text-center px-4 py-2 border">Edit</th>
//                 <th className="text-center px-4 py-2 border">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product.id} className="text-gray-700">
//                   <td className="px-4 py-2 border">{product.name}</td>
//                   <td className="px-4 py-2 border">{product.category}</td>
//                   <td className="px-4 py-2 border">
//                     <span
//                       className={`px-2 py-1 rounded ${
//                         product.availability === "In"
//                           ? "bg-green-200 text-green-700"
//                           : "bg-orange-200 text-orange-700"
//                       }`}
//                     >
//                       {product.availability}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 border text-center">
//                     <button className="text-lg">➕</button>
//                   </td>
//                   <td className="px-4 py-2 border text-center">
//                     <button className="text-lg">🔍</button>
//                   </td>
//                   <td className="px-4 py-2 border text-center">
//                     <button className="text-lg">✏️</button>
//                   </td>
//                   <td className="px-4 py-2 border text-center">
//                     <button className="text-lg text-red-500">🗑️</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;


// import React, { useState, useEffect } from "react";
// import { getProducts } from "../services/apiService"; // Import the API function

// const Products: React.FC = () => {
//   const [products, setProducts] = useState<{ id: number; name: string; price: number ; category : string; }[]>([]);
//   const [error, setError] = useState<string>("");

//   // Fetch products from the backend when the component loads
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getProducts();
//         setProducts(data); // Set the data to state
//       } catch (err) {
//         setError("Failed to fetch products");
//       }
//     };

//     fetchProducts();
//   }, []);


//   const products = [
//         {
//           id: 1,
//           name: "Water Reflection T-Shirt",
//           category: "Womens",
//           availability: "In",
//         },
//         {
//           id: 2,
//           name: "Lantern Sleeve Solid Peplum Top",
//           category: "Womens",
//           availability: "Out",
//         },
//         {
//           id: 3,
//           name: "Linen Shirts Casual Long",
//           category: "Men",
//           availability: "In",
//         },
//       ];

//   return (
//     <div>
//       <h1>Products</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             {product.name} - ${product.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Products;

import React from "react";

const Products: React.FC = () => {
  // Hardcoded products array
  const products = [
    {
      id: 1,
      name: "Water Reflection T-Shirt",
      price: 29.99,
      category: "Womens",
      availability: "In",
    },
    {
      id: 2,
      name: "Lantern Sleeve Solid Peplum Top",
      price: 39.99,
      category: "Womens",
      availability: "Out",
    },
    {
      id: 3,
      name: "Linen Shirts Casual Long",
      price: 24.99,
      category: "Men",
      availability: "In",
    },
  ];

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - ${product.price.toFixed(2)} <br />
            Category: {product.category} <br />
            Availability: {product.availability}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;


