// // import React, { useState, useEffect } from "react";
// // import Header from "./Header";
// // import Navbar from "./NavBar";

// // const NewArrivals: React.FC = () => {
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     // Fetch the first 3 products from your database/API
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await fetch("https://yourapi.com/products"); // Replace with your API URL
// //         const data = await response.json();
// //         setProducts(data.slice(0, 3)); // Only take the first 3 products
// //       } catch (error) {
// //         console.error("Error fetching products:", error);
// //       }
// //     };

// //     fetchProducts();
// //   }, []);

// //   return (
// //     <section className="py-10">
// //       <h2 className="text-2xl font-bold text-center mb-8">New Arrivals</h2>
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
// //         {products.map((product) => (
// //             <div></div>
// //         //   <div
// //         //     key={product.id}
// //         //     className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
// //         //   >
// //         //     <img
// //         //       src={`https://yourapi.com/images/${product.image}`} // Replace with your image URL logic
// //         //       alt={product.name}
// //         //       className="h-60 w-full object-cover"
// //         //     />
// //         //     <div className="p-4">
// //         //       <h3 className="text-lg font-medium mb-2">{product.name}</h3>
// //         //       <p className="text-gray-500">Rs.{product.price}</p>
// //         //     </div>
// //         //   </div>
// //         ))} 
// //       </div>
// //       {/* <div className="flex justify-center mt-8">
// //         <button
// //           className="text-sm py-3 px-8 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
// //           onClick={() => window.location.href = "/products"} // Navigate to All Products Page
// //         >
// //           View All Products
// //         </button>
// //       </div> */}
// //     </section>
// //   );
// // };

// // export default NewArrivals;
// import React, { useState, useEffect } from "react";

// interface ProductImage {
//   ImageID: number;
//   base64Image: string;
// }

// interface Product {
//   ProductID: number;
//   name: string;
//   CategoryID: number;
//   SubCategoryID?: number;
//   Stock: number;
//   price: number;
//   Description: string;
//   Color: string[];
//   Size: string[];
//   images: ProductImage[];
// }

// const NewArrivals: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:5005/api/Product/GetLatestProducts");
//         if (!response.ok) throw new Error("Failed to fetch products");
//         const data: Product[] = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <section className="py-10">
//       <h2 className="text-3xl font-bold text-center mb-6">New Arrivals</h2>
//       {loading ? (
//         <p className="text-center">Loading products...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-9">
//           {products.map((product) => (
//             <div key={product.ProductID} className="p-4 border  text-center">
//               {/* Display first image if available, else show a placeholder */}
//               {product.images?.length > 0 && product.images[0]?.base64Image ? (
//                 <img
//                   src={`data:image/png;base64,${product.images[0].base64Image}`}
//                   alt={product.name}
//                   className="object-cover "
//                 />
//               ) : (
//                 <img
//                   src="https://placehold.co/150x150"
//                   alt="No Image Available"
//                   className="w-full h-60 object-cover rounded-lg"
//                 />
//               )}
//               <h3 className="text-lg font-medium mt-2">{product.name}</h3>
//               <p className="text-gray-700 text-sm">{product.Description}</p>
//               <p className="text-black font-medium mt-1">Rs. {product.price}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default NewArrivals;
import React, { useState, useEffect } from "react";
import ProductModal from "./ProductModal"; // Import the modal component

interface ProductImage {
  ImageID: number;
  base64Image: string;
}

interface Product {
  productID: number;
  name: string;
  CategoryID: number;
  SubCategoryID?: number;
  Stock: number;
  price: number;
  Description: string;
  Color: string[];
  Size: string[];
  images: ProductImage[];
}

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/Product/GetLatestProducts");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data: Product[] = await response.json();

        // Sanitize nulls in Color and Size
        const sanitized = data.map(product => ({
          ...product,
          Color: (product.Color || []).filter((c): c is string => c !== null),
          Size: (product.Size || []).filter((s): s is string => s !== null),
        }));

        setProducts(sanitized);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">New Arrivals</h2>
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-9">
          {products.map((product) => (
            <div
              key={product.productID}
              className="p-4 border text-center rounded-lg shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
              onClick={() => setSelectedProductId(product.productID)}
            >
              {product.images?.length > 0 && product.images[0]?.base64Image ? (
                <img
                  src={`data:image/png;base64,${product.images[0].base64Image}`}
                  alt={product.name}
                  className="w-full h-60 object-cover rounded-lg"
                />
              ) : (
                <img
                  src="https://placehold.co/150x150"
                  alt="No Image Available"
                  className="w-full h-60 object-cover rounded-lg"
                />
              )}
              <h3 className="text-lg font-medium mt-2">{product.name}</h3>
              <p className="text-gray-700 text-sm">{product.Description}</p>
              <p className="text-black font-medium mt-1">Rs. {product.price}</p>
            </div>
          ))}
        </div>
      )}

      {selectedProductId && (
        <ProductModal
          ProductID={selectedProductId}
          isOpen={Boolean(selectedProductId)}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </section>
  );
};

export default NewArrivals;
