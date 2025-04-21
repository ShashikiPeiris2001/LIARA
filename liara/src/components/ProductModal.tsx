// import { useState, useEffect } from "react";
// import Modal from "react-modal";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import axios from "axios";
// import { IoClose } from "react-icons/io5";
// import { Link } from 'react-router-dom';


// interface Color {
//   productID: number;
//   colorID: number;
//   product: any;
//   color: string | null;
// }

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   color: Color[];
//   images: string[]; // Ensure all images are returned
//   description: string;
//   rating: number;
// }

// interface ProductModalProps {
//   ProductID: number;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ProductModal: React.FC<ProductModalProps> = ({ ProductID, isOpen, onClose }) => {
//   const [product, setProduct] = useState<Product | null>(null);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string[]>([]);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     if (isOpen && ProductID) {
//       axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/Product/${ProductID}`)
//       .then((response) => {
//         const fetchedProduct = response.data;
    
//         // Filter null colors before setting
//         const sanitizedColor = (fetchedProduct.color || []).filter((c: any): c is Color => c.color !== null);
    
//         setProduct({
//           ...fetchedProduct,
//           color: sanitizedColor,
//         });
    
//         if (fetchedProduct.images.length > 0) {
//           setSelectedImage(`data:image/jpeg;base64,${fetchedProduct.images[0]}`);
//         }
//       })
    
//         .catch((error) => console.error("Error fetching product:", error));
//     }
//   }, [isOpen, ProductID]);

//   if (!product) return null;

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-lg">
//         {/* Close Button */}
//         <button onClick={onClose} className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-600">
//           <IoClose className="w-6 h-6" />
//         </button>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Image Section */}
//           <div>
//             {/* Main Image */}
//             {selectedImage && (
//               <img src={selectedImage} alt="Selected Product" className="w-full h-96 object-cover rounded-md" />
//             )}

//             {/* Thumbnails */}
//             <div className="flex space-x-2 mt-4 overflow-x-auto">
//               {product.images.map((img, index) => (
//                 <img
//                   key={index}
//                   src={`data:image/jpeg;base64,${img}`}
//                   alt={`Thumbnail ${index}`}
//                   className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
//                     selectedImage === `data:image/jpeg;base64,${img}` ? "border-black" : "border-gray-300"
//                   }`}
//                   onClick={() => setSelectedImage(`data:image/jpeg;base64,${img}`)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Product Info Section */}
//           <div>
//             <h2 className="text-2xl font-semibold">{product.name}</h2>
//             <p className="text-lg text-gray-600 mt-1">
//               Rs. {product.price ? product.price.toFixed(2) : "N/A"}
//             </p>
//            <p className="text-gray-500 mt-2">
//               Color: {
//                 product.color
//                   .map(c => c.color)
//                   .filter((c): c is string => c !== null)
//                   .join(", ") || "N/A"
//               }
//             </p>
//            {/* Size Selection */}
//               <div className="mt-4">
//                 <label className="block text-sm font-medium mb-2">Sizes:</label>
//                 <div className="flex flex-wrap gap-3">
//                   {["S", "M", "L", "XL"].map((size) => (
//                     <label key={size} className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         value={size}
//                         checked={selectedSize.includes(size)}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           setSelectedSize((prev) =>
//                             prev.includes(value)
//                               ? prev.filter((s) => s !== value)
//                               : [...prev, value]
//                           );
//                         }}
//                       />
//                       <span>{size}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>


//             {/* Quantity Selection */}
//             <div className="mt-4 flex items-center">
//               <label className="block text-sm font-medium mr-2">Quantity:</label>
//               <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="border px-3 py-1">-</button>
//               <span className="mx-2 text-lg">{quantity}</span>
//               <button onClick={() => setQuantity(q => q + 1)} className="border px-3 py-1">+</button>
//             </div>

//             {/* Buttons */}
//             <button className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">Add to Cart</button>
//             <Link
//               to="/CheckoutForm"
//               state={{
//                 id: product.id,
//                 name: product.name,
//                 price: product.price,
//                 color: product.color.map(c => c.color).join(", "),
//                 size: selectedSize.join(", "),
//                 quantity: quantity,
//                 image: selectedImage,
//               }}
//             >
//               <button className="mt-3 w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition">
//                 Buy Now
//               </button>
//             </Link>
//             <p className="mt-3 text-gray-500 text-sm text-center">Free delivery on orders over Rs.5000.00</p>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ProductModal;
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

interface Color {
  productID: number;
  colorID: number;
  product: any;
  color: string | null;
}

interface Product {
  id: number;
  name: string;
  price: number;
  color: Color[];
  images: string[]; // Ensure all images are returned
  description: string;
  rating: number;
}

interface ProductModalProps {
  ProductID: number;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ ProductID, isOpen, onClose }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen && ProductID) {
      axios.get(`http://localhost:5005/api/Product/${ProductID}`)
      .then((response) => {
        const fetchedProduct = response.data;
    
        // Filter null colors before setting
        const sanitizedColor = (fetchedProduct.color || []).filter((c: any): c is Color => c.color !== null);
    
        setProduct({
          ...fetchedProduct,
          color: sanitizedColor,
        });
    
        if (fetchedProduct.images.length > 0) {
          setSelectedImage(`data:image/jpeg;base64,${fetchedProduct.images[0]}`);
        }
      })
    
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [isOpen, ProductID]);

  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-lg">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-600">
          <IoClose className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div>
            {/* Main Image */}
            {selectedImage && (
              <img src={selectedImage} alt="Selected Product" className="w-full h-96 object-cover rounded-md" />
            )}

            {/* Thumbnails */}
            <div className="flex space-x-2 mt-4 overflow-x-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={`data:image/jpeg;base64,${img}`}
                  alt={`Thumbnail ${index}`}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImage === `data:image/jpeg;base64,${img}` ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(`data:image/jpeg;base64,${img}`)}
                />
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div>
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-lg text-gray-600 mt-1">
              Rs. {product.price ? product.price.toFixed(2) : "N/A"}
            </p>
           <p className="text-gray-500 mt-2">
              Color: {
                product.color
                  .map(c => c.color)
                  .filter((c): c is string => c !== null)
                  .join(", ") || "N/A"
              }
            </p>
           {/* Size Selection */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Sizes:</label>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL"].map((size) => (
                    <label key={size} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={size}
                        checked={selectedSize.includes(size)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedSize((prev) =>
                            prev.includes(value)
                              ? prev.filter((s) => s !== value)
                              : [...prev, value]
                          );
                        }}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>


            {/* Quantity Selection */}
            <div className="mt-4 flex items-center">
              <label className="block text-sm font-medium mr-2">Quantity:</label>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="border px-3 py-1">-</button>
              <span className="mx-2 text-lg">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="border px-3 py-1">+</button>
            </div>

            {/* Buttons */}
            <button className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">Add to Cart</button>
            <Link
              to="/CheckoutForm"
              state={{
                id: product.id,
                name: product.name,
                price: product.price,
                color: product.color.map(c => c.color).join(", "),
                size: selectedSize.join(", "),
                quantity: quantity,
                image: selectedImage,
              }}
            >
              <button className="mt-3 w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition">
                Buy Now
              </button>
            </Link>
            <p className="mt-3 text-gray-500 text-sm text-center">Free delivery on orders over Rs.5000.00</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
