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

// const ShopNow: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:5005/api/Product/GetAllProducts");
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
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
//     <div className="shopnow-page flex flex-col min-h-screen p-4">
//       <h2 className="text-3xl font-bold text-center mb-6">Shop Now</h2>
//       {loading ? (
//         <p className="text-center">Loading products...</p>
//       ) : (
//         <div className="grid grid-cols-3 gap-6 px-6">
//           {products.map((product) => (
//             <div key={product.ProductID} className="p-4 border rounded-lg shadow-md">
//               {product.images?.length > 0 && product.images[0]?.base64Image && (
//                 <img
//                   src={`data:image/png;base64,${product.images[0].base64Image}`}
//                   alt={product.name}
//                   className="w-full h-60 object-cover rounded-lg"
//                 />
//               )}
//               <h3 className="text-lg font-bold mt-2">{product.name}</h3>
//               <p className="text-gray-700 text-sm">{product.Description}</p>
//               <p className="text-black font-bold mt-1">Rs. {product.price}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShopNow;
import React, { useState, useEffect } from "react";

interface ProductImage {
  ImageID: number;
  base64Image: string;
}

interface Product {
  ProductID: number;
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

const ShopNow: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/Product/GetAllProducts");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="shopnow-page flex flex-col min-h-screen p-4">
      <h2 className="text-3xl font-medium text-center mb-6">Shop Now</h2>
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-4 gap-6 px-6">
          {products.map((product) => (
            <div key={product.ProductID} className="p-4 border rounded-lg shadow-md text-center ">
              {product.images?.length > 0 && product.images[0]?.base64Image && (
                <img
                  src={`data:image/png;base64,${product.images[0].base64Image}`}
                  alt={product.name}
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
    </div>
  );
};

export default ShopNow;
