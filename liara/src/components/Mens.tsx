// import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import Navbar from "./NavBar";

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

// const Men: React.FC = () => { 
//   const [products, setProducts] = useState<Product[]>([]);
//   const [showAll, setShowAll] = useState(false);

//     useEffect(() => {
//       const fetchProducts = async () => {
//         try {
//           const response = await fetch("http://localhost:5005/api/Product/Getproduct?CategoryID=2");
//           if (!response.ok) {
//             throw new Error("Failed to fetch products");
//           }
//           const data: Product[] = await response.json();
//           console.log("Fetched Products:", data);  // Debugging Line
//           setProducts(data);
//         } catch (error) {
//           console.error("Error fetching products:", error);
          
//         }
//       };
  
//       fetchProducts();
//     }, []);


  
//   return (
//     <div className="women-page flex flex-col min-h-screen p-4">
//       {/* Main Content */}
//       <div className="flex mt-5">
//         {/* Filters */}
//         <div className="filters w-1/5 pr-5 border-r border-gray-300">
//           <h2 className="text-2xl font-bold mb-5">Men's</h2>
//           <div className="filter-group mb-4">
//             <label className="block text-base font-bold mb-2">Category</label>
//             <select className="w-full p-2 border rounded">
//               <option value="">All</option>
//               <option value="t-shirts">T-Shirts</option>
//               <option value="formal Shirts">Formal Shirts</option>
//               <option value="denims">Denims</option>
//             </select>
//           </div>
//           <div className="filter-group mb-4">
//             <label className="block text-base font-bold mb-2">Clothing Size</label>
//             <select className="w-full p-2 border rounded">
//               <option value="">All</option>
//               <option value="small">Small</option>
//               <option value="medium">Medium</option>
//               <option value="large">Large</option>
//             </select>
//           </div>
//           <div className="filter-group">
//             <label className="block text-base font-bold mb-2">Colour</label>
//             <select className="w-full p-2 border rounded">
//               <option value="">All</option>
//               <option value="white">White</option>
//               <option value="black">Black</option>
//               <option value="green">Green</option>
//               <option value="red">Red</option>
//               <option value="blue">Blue</option>
//             </select>
//           </div>
//         </div>

//         {/* Product List */}
//         <div className="w-4/5 grid grid-cols-3 gap-6 px-6">
//         {products.slice(0, showAll ? products.length : 6).map((product) => (
//             <div key={product.ProductID} className="p-4 border rounded-lg shadow-md text-center">
//               {product.images?.length > 0 && product.images[0]?.base64Image &&  (
//                <img
//                src={`data:image/png;base64,${product.images[0].base64Image}`}
//                alt={product.name}
//                className="w-[280px] h-[350px] object-cover "
//                onError={(e) => console.error("Image Load Error:", e)}
//              />
//               )}
//               <h3 className="text-lg font-medium mt-2">{product.name}</h3>
//               <p className="text-gray-700 text-sm">{product.Description}</p>
//               <p className="text-black font-bold mt-1">Rs. {product.price}</p>
//             </div>
//           ))}

          
//         </div>
//       </div>

//       {/* View All Products Button */}
//       {!showAll && (
//         <button 
//           className="mt-8 py-3 px-8 text-white font-bold bg-black rounded-3xl self-center cursor-pointer"
//           onClick={() => setShowAll(true)}
//         >
//           VIEW ALL PRODUCTS
//         </button>
//       )}
//     </div>
//   );
// };

// export default Men;

// import React, { useState, useEffect } from "react";
// import ProductModal from "./ProductModal"; // Import the modal

// interface ProductImage {
//   imageID: number;
//   base64Image: string;
// }

// interface Product {
//   productID: number;
//   name: string;
//   categoryID: number;
//   subCategoryID?: number;
//   stock: number;
//   price: number;
//   description: string;
//   color: (string | null)[];
//   size: (string | null)[];
//   images: ProductImage[];
// }

// const Men: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [showAll, setShowAll] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:5005/api/Product/Getproduct?CategoryID=2");
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data = await response.json();
//         const normalizedProducts = data.map((product: any) => ({
//           productID: product.productID,
//           name: product.name,
//           categoryID: product.categoryID,
//           subCategoryID: product.subCategoryID,
//           stock: product.stock,
//           price: product.price,
//           color: product.color,
//           size: product.size,
//           images: product.images,
//         }));
//         setProducts(normalizedProducts);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="men-page flex flex-col min-h-screen p-4">
//       {/* Main Content */}
//       <div className="flex mt-5">
//         {/* Filters */}
//         <div className="filters w-1/5 pr-5 border-r border-gray-300">
//           <h2 className="text-2xl font-bold mb-5">Men's</h2>
//           <div className="filter-group mb-4">
//             <label className="block text-base font-bold mb-2">Category</label>
//             <select className="w-full p-2 border rounded">
//               <option value="">All</option>
//               <option value="t-shirts">T-Shirts</option>
//               <option value="formal Shirts">Formal Shirts</option>
//               <option value="denims">Denims</option>
//             </select>
//           </div>
//           <div className="filter-group mb-4">
//             <label className="block text-base font-bold mb-2">Clothing Size</label>
//             <select className="w-full p-2 border rounded">
//               <option value="">All</option>
//               <option value="small">Small</option>
//               <option value="medium">Medium</option>
//               <option value="large">Large</option>
//             </select>
//           </div>
//           <div className="filter-group">
//             <label className="block text-base font-bold mb-2">Colour</label>
//             <select className="w-full p-2 border rounded">
//               <option value="">All</option>
//               <option value="white">White</option>
//               <option value="black">Black</option>
//               <option value="green">Green</option>
//               <option value="red">Red</option>
//               <option value="blue">Blue</option>
//             </select>
//           </div>
//         </div>

//         {/* Product List */}
//         <div className="w-4/5 grid grid-cols-3 gap-6 px-6">
//           {products.slice(0, showAll ? products.length : 6).map((product) => (
//             <div
//               key={product.productID}
//               className="p-4 border rounded-lg shadow-md text-center hover:shadow-lg transition duration-300 cursor-pointer"
//               onClick={() => {
//                 if (product.productID) {
//                   console.log("Product Clicked:", product.productID);
//                   setSelectedProductId(product.productID);
//                 } else {
//                   console.error("productID is undefined for", product);
//                 }
//               }}
//             >
//               {product.images?.length > 0 && product.images[0]?.base64Image && (
//                 <img
//                   src={`data:image/png;base64,${product.images[0].base64Image}`}
//                   alt={product.name}
//                   className="w-[280px] h-[350px] object-cover"
//                   onError={(e) => console.error("Image Load Error:", e)}
//                 />
//               )}
//               <h3 className="text-lg font-medium mt-2">{product.name}</h3>
//               <p className="text-black font-bold mt-1">Rs. {product.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* View All Products Button */}
//       {!showAll && (
//         <button
//           className="mt-8 py-3 px-8 text-white font-bold bg-black rounded-3xl self-center cursor-pointer"
//           onClick={() => setShowAll(true)}
//         >
//           VIEW ALL PRODUCTS
//         </button>
//       )}

//       {/* Product Modal */}
//       {selectedProductId && (
//         <ProductModal
//           ProductID={selectedProductId}
//           isOpen={Boolean(selectedProductId)}
//           onClose={() => setSelectedProductId(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default Men;
import React, { useState, useEffect } from "react";
import ProductModal from "./ProductModal"; // Import the modal

interface ProductImage {
  imageID: number;
  base64Image: string;
}

interface Product {
  ProductID: number;
  name: string;
  CategoryID: number;
  SubCategoryID?: number;
  Stock: number;
  price: number;
  Color: string [];
  Size: string [];
  images: ProductImage[];
}

const Men: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/Product/Getproduct?CategoryID=2");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const normalizedProducts = data.map((product: any) => ({
          ProductID: product.productID,
          name: product.name,
          CategoryID: product.categoryID,
          SubCategoryID: product.subCategoryID,
          Stock: product.stock,
          price: product.price,
          Color: product.color,
          Size: product.size,
          images: product.images,
        }));
        setProducts(normalizedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "" ||
      (selectedCategory === "t-shirts" && product.SubCategoryID === 7) ||
      (selectedCategory === "Shirts" && product.SubCategoryID === 6) ||
      (selectedCategory === "Denims" && product.SubCategoryID === 8);

    const matchesSize =
      selectedSize === "" ||
      product.Size.some(
        (sz) => sz !== null && sz.toLowerCase() === selectedSize.toLowerCase()
      );

    const matchesColor =
      selectedColor === "" ||
      product.Color.some(
        (col) => col !== null && col.toLowerCase() === selectedColor.toLowerCase()
      );

    return matchesCategory && matchesSize && matchesColor;
  });

  return (
    <div className="men-page flex flex-col min-h-screen p-4">
      {/* Main Content */}
      <div className="flex mt-5">
        {/* Filters */}
        <div className="filters w-1/5 pr-5 border-r border-gray-300">
          <h2 className="text-2xl font-bold mb-5">Men's</h2>
          <div className="filter-group mb-4">
            <label className="block text-base font-bold mb-2">Category</label>
            <select 
              className="w-full p-2 border rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All</option>
              <option value="t-shirts">T-Shirts</option>
              <option value="formal Shirts">Formal Shirts</option>
              <option value="denims">Denims</option>
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

              {/* Product List */}
              <div className="w-4/5 grid grid-cols-3 gap-6 px-6">
                {products.slice(0, showAll ? products.length : 6).map((product) => (
                  <div
                    key={product.ProductID}
                    className="p-4 border rounded-lg shadow-md text-center hover:shadow-lg transition duration-300 cursor-pointer"
                    onClick={() => {
                      if (product.ProductID) {
                        console.log("Product Clicked:", product.ProductID);
                        setSelectedProductId(product.ProductID);
                      } else {
                        console.error("productID is undefined for", product);
                      }
                    }}
                  >
                    {product.images?.length > 0 && product.images[0]?.base64Image && (
                      <img
                        src={`data:image/png;base64,${product.images[0].base64Image}`}
                        alt={product.name}
                        className="w-[280px] h-[350px] object-cover"
                        onError={(e) => console.error("Image Load Error:", e)}
                      />
                    )}
                    <h3 className="text-lg font-medium mt-2">{product.name}</h3>
                    <p className="text-black font-bold mt-1">Rs. {product.price}</p>
                  </div>
                ))}
              </div>
            </div>

      {/* View All Products Button */}
      {!showAll && (
        <button
          className="mt-8 py-3 px-8 text-white font-bold bg-black rounded-3xl self-center cursor-pointer"
          onClick={() => setShowAll(true)}
        >
          VIEW ALL PRODUCTS
        </button>
      )}

      {/* Product Modal */}
      {selectedProductId && (
        <ProductModal
          ProductID={selectedProductId}
          isOpen={Boolean(selectedProductId)}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
};

export default Men;
