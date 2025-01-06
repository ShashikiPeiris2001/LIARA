import React, { useState, useEffect } from "react";
import Header from "./Header";
import Navbar from "./NavBar";

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the first 3 products from your database/API
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://yourapi.com/products"); // Replace with your API URL
        const data = await response.json();
        setProducts(data.slice(0, 3)); // Only take the first 3 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-8">New Arrivals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {products.map((product) => (
            <div></div>
        //   <div
        //     key={product.id}
        //     className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
        //   >
        //     <img
        //       src={`https://yourapi.com/images/${product.image}`} // Replace with your image URL logic
        //       alt={product.name}
        //       className="h-60 w-full object-cover"
        //     />
        //     <div className="p-4">
        //       <h3 className="text-lg font-medium mb-2">{product.name}</h3>
        //       <p className="text-gray-500">Rs.{product.price}</p>
        //     </div>
        //   </div>
        ))} 
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="text-sm py-3 px-8 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          onClick={() => window.location.href = "/products"} // Navigate to All Products Page
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default NewArrivals;
