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

const Women: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/Product/Getproduct?CategoryID=1");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        console.log("Fetched Products:", data);  // Debugging Line
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="women-page flex flex-col min-h-screen p-4">
      {/* Main Content */}
      <div className="flex mt-5">
        {/* Filters */}
        <div className="filters w-1/5 pr-5 border-r border-gray-300">
          <h2 className="text-2xl font-bold mb-5">Women's</h2>
          <div className="filter-group mb-4">
            <label className="block text-base font-bold mb-2">Category</label>
            <select className="w-full p-2 border rounded">
              <option value="">All</option>
              <option value="t-shirts">T-Shirts</option>
              <option value="tops">Tops</option>
              <option value="dresses">Dresses</option>
            </select>
          </div>
          <div className="filter-group mb-4">
            <label className="block text-base font-bold mb-2">Clothing Size</label>
            <select className="w-full p-2 border rounded">
              <option value="">All</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="block text-base font-bold mb-2">Colour</label>
            <select className="w-full p-2 border rounded">
              <option value="">All</option>
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="w-4/5 grid grid-cols-3 gap-6 px-6">
        {products.slice(0, showAll ? products.length : 6).map((product) => (
            <div key={product.ProductID} className="p-4 border rounded-lg shadow-md text-center">
              {product.images?.length > 0 && product.images[0]?.base64Image &&  (
               <img
               src={`data:image/png;base64,${product.images[0].base64Image}`}
               alt={product.name}
               className="w-full h-60 object-cover rounded-lg"
               onError={(e) => console.error("Image Load Error:", e)}
             />
              )}
              <h3 className="text-lg font-medium mt-2">{product.name}</h3>
              <p className="text-gray-700 text-sm">{product.Description}</p>
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
    </div>
  );
};

export default Women;
