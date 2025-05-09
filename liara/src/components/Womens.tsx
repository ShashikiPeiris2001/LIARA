// import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import Navbar from "./NavBar";

// interface ProductImage {
//   ImageID: number;
//   Base64Image: string;
// }

// interface Product {
//   ProductID: number;
//   Name: string;
//   CategoryID: number;
//   SubCategoryID?: number;
//   Stock: number;
//   Price: number;
//   Description: string;
//   Color: string[];
//   Size: string[];
//   Images: ProductImage[];
// }

// const Women: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:5005/api/Product/Getproduct?categoryId=1"); // Update API URL if needed
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data: Product[] = await response.json();

//         // Filter only "Women" category products (Ensure correct CategoryID from DB)
//         // const womenProducts = data.filter((product) => product.CategoryID === 1);
//         console.log("Fetched Products:", data); // Debug API response
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);


//   return (
//     <>
//     <div className="women-page flex flex-col justify-between min-h-screen p-4">
      
//       <div className="filters w-1/5 pr-5 border-r-1">
//         <h2 className="text-2xl mb-5 text-black ">Women's</h2>
       
//         <div className="filter-group mb-2.5">
//           <label className="block text-base font-bold mb-2 text-black">Category</label>
//           <select className="w-full	p-2 border-2 rounded text-sm text-black">
//             <option value="">All</option>
//             <option value="t-shirts">T-Shirts</option>
//             <option value="tops">Tops</option>VALUES
//             <option value="dresses">Dresses</option>
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
//        {/* Product List */}
//        <div className="grid grid-cols-3 gap-4 mt-5">
//         {products.map((product) => (
//           <div key={product.ProductID } className="p-4 border rounded-lg shadow-md">
//             {product.Images?.length > 0 && product.Images[0]?.Base64Image && (
//               <img
              
//                 src={`data:image/png;base64,${product.Images[0].Base64Image}`}
//                 alt={product.Name  || "Product Image"}
//                 className="w-full h-60 object-cover rounded-lg"
//               />
//             )}
//             <h3 className="text-lg font-bold mt-2">{product.Name}</h3>
//             <p className="text-gray-700">{product.Description}</p>
//             <p className="text-black font-bold mt-1">Rs. {product.Price}</p>
//           </div>
//         ))}
//       </div>

//       {/* Product List */}
//       {/* <div className="grid grid-cols-3 gap-4 mt-5">
//         {products.map((product) => (
//           <div key={product.ProductID} className="p-4 border rounded-lg shadow-md">
//             {product.Images && product.Images.length > 0 && (
//               <img
//                 src={`data:image/png;base64,${product.Images[0].Base64Image}`}
//                 alt={product.Name}
//                 className="w-full h-60 object-cover rounded-lg"
//               />
//             )}
//             <h3 className="text-lg font-bold mt-2">{product.Name}</h3>
//             <p className="text-gray-700">{product.Description}</p>
//             <p className="text-black font-bold mt-1">Rs.{product.Price}</p>
//           </div>
//         ))}
//       </div> */}

//       <button className="text-sm view-all-btn mt-8 py-3 px-8 text-white font-bold	 bg-black	w-52 rounded-3xl self-center cursor-pointer	">VIEW ALL PRODUCTS</button>
//     </div>
//     </>
//   );
// };

// export default Women;
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

// const Women: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:5005/api/Product/Getproduct?CategoryID=1");
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data: Product[] = await response.json();
//         console.log("Fetched Products:", data);  // Debugging Line
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
        
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="women-page flex flex-col min-h-screen p-4">
//       {/* Main Content */}
//       <div className="flex mt-5">
//         {/* Filters */}
//         <div className="filters w-1/5 pr-5 border-r border-gray-300">
//           <h2 className="text-2xl font-bold mb-5">Women's</h2>
//           <div className="filter-group mb-4">
//             <label className="block text-base font-bold mb-2">Category</label>
//             <select className="w-full p-2 border rounded">
//               <option value="">All</option>
//               <option value="t-shirts">T-Shirts</option>
//               <option value="tops">Tops</option>
//               <option value="dresses">Dresses</option>
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
//                className="w-full h-60 object-cover rounded-lg"
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

// export default Women;
// import React, { useState, useEffect } from "react";
// import ProductModal from "./ProductModal"; // Importing the modal

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

// const Women: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [showAll, setShowAll] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:5005/api/Product/Getproduct?CategoryID=1");
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data: Product[] = await response.json();
//         const normalizedProducts = data.map((product: any) => ({
//           ProductID: product.productID,
//           name: product.name,
//           CategoryID: product.categoryID,
//           SubCategoryID: product.subCategoryID,
//           Stock: product.stock,
//           price: product.price,
//           Description: product.description,
//           Color: product.color,
//           Size: product.size,
//           images: product.images,
//         }));
//         setProducts(normalizedProducts);
//         // console.log("Fetched Products:", data);
//         // setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="women-page flex flex-col min-h-screen p-4">
//       {/* Main Content */}
//       <div className="flex mt-5">
//         {/* Filters */}
//         <div className="filters w-1/5 pr-5 border-r border-gray-300">
//           <h2 className="text-2xl font-bold mb-5">Women's</h2>
//           <div className="filter-group mb-4">
//             <label className="block text-base font-bold mb-2">Category</label>
//             <select className="w-full p-2 border rounded">
//               <option value="">All</option>
//               <option value="t-shirts">T-Shirts</option>
//               <option value="tops">Tops</option>
//               <option value="dresses">Dresses</option>
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
//               key={product.ProductID}
//               className="p-4 border rounded-lg shadow-md text-center hover:shadow-lg transition duration-300 cursor-pointer"
//               onClick={() => {
//                 if (product.ProductID) {
//                   console.log("Product Clicked:", product.ProductID);
//                   setSelectedProductId(product.ProductID);
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

// export default Women;

import React, { useState, useEffect } from "react";
import ProductModal from "./ProductModal";

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
  Color: string[]; // Ex: ["White", "Black"]
  Size: string[];  // Ex: ["S", "M"]
  images: ProductImage[];
}

const colorNameToHex: { [key: string]: string } = {
  pink: "#ffc0cb",
  white: "#ffffff",
  black: "#000000",
  green: "#008000",
  red: "#ff0000",
  blue: "#0000ff",
  yellow: "#ffff00",
  orange: "#ffa500",
};

const sizeMapping: { [key: string]: string } = {
  small: "S",
  medium: "M",
  large: "L",
  extralarge: "XL",
};

const Women: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/Product/Getproduct?CategoryID=1");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await response.json();
        const normalized = data.map((p: any) => ({
          ProductID: p.productID,
          name: p.name,
          CategoryID: p.categoryID,
          SubCategoryID: p.subCategoryID,
          Stock: p.stock,
          price: p.price,
          Color: (p.color || []).filter((c: string | null) => !!c),
          Size: (p.size || []).filter((s: string | null) => !!s),
          images: p.images,
        }));
        setProducts(normalized);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "" ||
      (selectedCategory === "t-shirts" && product.SubCategoryID === 5) ||
      (selectedCategory === "tops" && product.SubCategoryID === 4) ||
      (selectedCategory === "dresses" && product.SubCategoryID === 3);

    const matchesSize =
      selectedSize === "" ||
      product.Size.some((sz) => sz && sz.toUpperCase() === sizeMapping[selectedSize]?.toUpperCase());

    const matchesColor =
      selectedColor === "" ||
      product.Color.some((col) => {
        const productColorHex = colorNameToHex[col.toLowerCase()];
        return productColorHex === selectedColor;
      });

    return matchesCategory && matchesSize && matchesColor;
  });

  return (
    <div className="women-page flex flex-col min-h-screen p-4">
      <div className="flex mt-5">
        {/* Filters */}
        <div className="filters w-1/5 pr-5 border-r border-gray-300">
          <h2 className="text-2xl font-bold mb-5">Women's</h2>

          {/* Category */}
          <div className="filter-group mb-4">
            <label className="block text-base font-bold mb-2">Category</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="t-shirts">T-Shirts</option>
              <option value="tops">Tops</option>
              <option value="dresses">Dresses</option>
            </select>
          </div>

          {/* Size */}
          <div className="filter-group mb-4">
            <label className="block text-base font-bold mb-2">Clothing Size</label>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'S', value: 'small' },
                { label: 'M', value: 'medium' },
                { label: 'L', value: 'large' },
                { label: 'XL', value: 'extralarge' },
              ].map((size) => (
                <label key={size.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="clothingSize"
                    value={size.value}
                    checked={selectedSize === size.value}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="accent-black"
                  />
                  <span className="text-sm">{size.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="filter-group">
            <label className="block text-base font-bold mb-2">Colour</label>
            <div className="grid grid-cols-4 gap-4">
              {Object.values(colorNameToHex).map((color) => (
                <label key={color} className="relative cursor-pointer w-6 h-6">
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={(e) => setSelectedColor(e.target.value)}
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

        {/* Products */}
        <div className="w-4/5 grid grid-cols-3 gap-6 px-6">
          {filteredProducts.slice(0, showAll ? filteredProducts.length : 6).map((product) => (
            <div
              key={product.ProductID}
              className="p-4 border rounded-lg shadow-md text-center hover:shadow-lg transition duration-300 cursor-pointer"
              onClick={() => setSelectedProductId(product.ProductID)}
            >
              {product.images[0]?.base64Image && (
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

      {/* View All Products */}
      {!showAll && filteredProducts.length > 6 && (
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

export default Women;

