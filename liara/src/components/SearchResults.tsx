// // src/components/SearchResults.tsx
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import ProductModal from "./ProductModal";
// import { FaShoppingCart, FaSpinner } from "react-icons/fa";
// import { addToCart } from "./CartItem";

// interface ProductImage {
//   ImageID: number;
//   base64Image: string | null;  // Changed to lowercase
// }

// interface ProductDTO {
//   ProductID: number;
//   Name: string;
//   CategoryName: string;
//   SubCategoryName: string;
//   Stock: number;
//   Status: string;
//   Price: number;  // No longer nullable
//   Colors: { ColorID: number; Name: string }[];
//   Sizes: { SizeID: number; Name: string }[];
//   Images?: ProductImage[];  // Use new interface
//   slug: string;
// }

// const SearchResults: React.FC = () => {
//   const location = useLocation();
//   const [products, setProducts] = useState<ProductDTO[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

//   const getQueryParam = () => {
//     const params = new URLSearchParams(location.search);
//     return params.get("query") || "";
//   };

//   const query = getQueryParam();

//   useEffect(() => {
//     if (!query.trim()) {
//       setProducts([]);
//       setLoading(false);
//       return;
//     }

//     const fetchResults = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get<ProductDTO[]>(
//           `http://localhost:5005/api/Product/Search`,
//           {
//             params: { keyword: query.trim() },
//           }
//         );
        
//         // Transform data to match frontend structure
//         const transformedProducts = response.data.map(prod => ({
//           ...prod,
//           // Ensure Price is never null
//           Price: prod.Price || 0,
//           // Rename Images.base64Image to lowercase
//           Images: prod.Images?.map(img => ({
//             ImageID: img.ImageID,
//             base64Image: img.base64Image
//           }))
//         }));
        
//         setProducts(transformedProducts);
//       } catch (err: any) {
//         console.error("Error fetching search results:", err);
//         setError("Failed to load search results. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, [query]);

//   const handleAddToCart = (product: ProductDTO) => {
//     addToCart({
//       ProductID: product.ProductID,
//       Name: product.Name,
//       Price: product.Price,
//       Quantity: 1,
//       ImageUrl: product.Images?.[0]?.base64Image 
//         ? `data:image/png;base64,${product.Images[0].base64Image}`  // Use PNG format
//         : undefined,
//       Size: product.Sizes[0]?.Name || "",
//       Color: product.Colors[0]?.Name || "",
//     });
//   };

//   return (
//     <section className="pt-20 md:pt-24 lg:pt-28 pb-8 px-4 sm:px-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-8 md:mb-10 sticky top-16 md:top-20 bg-gray-50 z-10 py-4">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//             Search Results for "<span className="text-pink-600">{query}</span>"
//           </h2>
//         </div>

//         {loading && (
//           <div className="flex justify-center items-center h-48 sm:h-64">
//             <FaSpinner className="animate-spin text-3xl text-indigo-600" />
//           </div>
//         )}

//         {error && <div className="text-red-500 text-center">{error}</div>}

//         {!loading && !error && products.length === 0 && (
//           <div className="text-gray-500 text-center py-12">
//             No products found for "{query}"
//           </div>
//         )}

//         {!loading && !error && products.length > 0 && (
//           <>
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//               {products.map((prod) => (
//                 <div
//                   key={prod.ProductID}
//                   className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all"
//                 >
//                   <div className="relative">
//                     <div className="aspect-square overflow-hidden">
//                       {prod.Images?.[0]?.base64Image ? (
//                         <img
//                           src={`data:image/png;base64,${prod.Images[0].base64Image}`}  // Use PNG format
//                           alt={prod.Name}
//                           className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                           loading="lazy"
//                           onError={(e) => {
//                             // Fallback to placeholder if image fails to load
//                             const target = e.target as HTMLImageElement;
//                             target.onerror = null;
//                             target.src = "https://placehold.co/600x600";
//                           }}
//                         />
//                       ) : (
//                         <img
//                           src="https://placehold.co/600x600"
//                           alt="No Image Available"
//                           className="w-full h-full object-cover"
//                           loading="lazy"
//                         />
//                       )}
//                     </div>

//                     <button
//                       onClick={() => setSelectedProductId(prod.ProductID)}
//                       className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-700 whitespace-nowrap"
//                     >
//                       Quick View
//                     </button>
//                   </div>

//                   <div className="p-3">
//                     <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
//                       {prod.Name}
//                     </h3>
//                     <p className="text-xs text-gray-500 mb-1">
//                       {prod.CategoryName} / {prod.SubCategoryName}
//                     </p>

//                     <div className="flex justify-between items-center mt-2">
//                       <span className="text-sm font-bold text-indigo-600">
//                         Rs. {prod.Price.toLocaleString()}
//                       </span>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleAddToCart(prod);
//                         }}
//                         className="p-1.5 bg-indigo-100 rounded-full transition-colors hover:bg-indigo-200"
//                         aria-label="Add to cart"
//                       >
//                         <FaShoppingCart className="text-sm" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {selectedProductId && (
//               <ProductModal
//                 ProductID={selectedProductId}
//                 isOpen={Boolean(selectedProductId)}
//                 onClose={() => setSelectedProductId(null)}
//               />
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default SearchResults;

// src/components/SearchResults.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductModal from "./ProductModal";
import { FaShoppingCart, FaSpinner } from "react-icons/fa";
import { addToCart } from "./CartItem";

interface ProductImage {
  ImageID: number;
  base64Image: string | null;
}

interface ProductDTO {
  ProductID: number;
  Name: string;
  CategoryName: string;
  SubCategoryName: string;
  Stock: number;
  Status: string;
  Price: number;
  Colors: { ColorID: number; Name: string }[];
  Sizes: { SizeID: number; Name: string }[];
  Images?: ProductImage[];
  slug: string;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const getQueryParam = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query") || "";
  };

  const query = getQueryParam();

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5005/api/Product/Search`,
          {
            params: { keyword: query.trim() },
          }
        );
        
        console.log("Raw API response:", response.data);
        
        // 1. Handle different response structures
        const responseData = Array.isArray(response.data) 
          ? response.data 
          : response.data.data || [];
        
        // 2. More robust transformation
        const transformedProducts = responseData
          .filter((item: any) => item) // Remove null items
          .map((prod: any, index: number) => {
            // 3. Handle different ID field names
            const id = prod.ProductID ?? prod.productID ?? prod.id ?? index;
            
            // 4. Handle different name fields
            const name = prod.Name ?? prod.name ?? prod.productName ?? "Unnamed Product";
            
            // 5. Handle different image field structures
            const images = Array.isArray(prod.Images) 
              ? prod.Images 
              : prod.images || prod.productImages || [];
              
            return {
              ProductID: id,
              Name: name,
              CategoryName: prod.CategoryName ?? prod.categoryName ?? "Uncategorized",
              SubCategoryName: prod.SubCategoryName ?? prod.subCategoryName ?? "No Subcategory",
              Stock: prod.Stock ?? prod.stock ?? 0,
              Status: prod.Status ?? prod.status ?? "Unknown",
              Price: prod.Price ?? prod.price ?? 0,
              Colors: prod.Colors ?? prod.colors ?? [],
              Sizes: prod.Sizes ?? prod.sizes ?? [],
              Images: images.map((img: any) => ({
                ImageID: img.ImageID ?? img.imageID ?? img.id ?? 0,
                base64Image: img.base64Image ?? img.Base64Image ?? img.imageData
              })),
              slug: prod.slug ?? name.toLowerCase().replace(/\s+/g, '-')
            };
          });
          
        console.log("Transformed products:", transformedProducts);
        setProducts(transformedProducts);
      } catch (err: any) {
        console.error("Error fetching search results:", err);
        setError("Failed to load search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleAddToCart = (product: ProductDTO) => {
    addToCart({
      ProductID: product.ProductID,
      Name: product.Name,
      Price: product.Price,
      Quantity: 1,
      ImageUrl: product.Images?.[0]?.base64Image 
        ? `data:image/png;base64,${product.Images[0].base64Image}`
        : undefined,
      Size: product.Sizes[0]?.Name || "",
      Color: product.Colors[0]?.Name || "",
    });
  };

  return (
    <section className="pt-20 md:pt-24 lg:pt-28 pb-8 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-10 sticky top-16 md:top-20 bg-gray-50 z-10 py-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Search Results for "<span className="text-pink-600">{query}</span>"
          </h2>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-48 sm:h-64">
            <FaSpinner className="animate-spin text-3xl text-indigo-600" />
          </div>
        )}

        {error && <div className="text-red-500 text-center">{error}</div>}

        {!loading && !error && products.length === 0 && (
          <div className="text-gray-500 text-center py-12">
            No products found for "{query}"
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div key="search-results-container">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {products.map((prod, index) => (
                <div
                  key={`product-${prod.ProductID}-${index}`}
                  className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      {prod.Images?.[0]?.base64Image ? (
                        <img
                          src={`data:image/png;base64,${prod.Images[0].base64Image}`}
                          alt={prod.Name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://placehold.co/600x600";
                          }}
                        />
                      ) : (
                        <img
                          src="https://placehold.co/600x600"
                          alt="No Image Available"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProductId(Number(prod.ProductID))}
                      className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-700 whitespace-nowrap"
                    >
                      Quick View
                    </button>
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
                      {prod.Name}
                    </h3>
                    {/* <p className="text-xs text-gray-500 mb-1">
                      {prod.CategoryName} / {prod.SubCategoryName}
                    </p> */}

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-bold text-indigo-600">
                        Rs. {prod.Price.toLocaleString()}
                      </span>
                      {/* <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(prod);
                        }}
                        className="p-1.5 bg-indigo-100 rounded-full transition-colors hover:bg-indigo-200"
                        aria-label="Add to cart"
                      >
                        <FaShoppingCart className="text-sm" />
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedProductId && (
              <ProductModal
                key={`modal-${selectedProductId}`}
                ProductID={selectedProductId}
                isOpen={Boolean(selectedProductId)}
                onClose={() => setSelectedProductId(null)}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;