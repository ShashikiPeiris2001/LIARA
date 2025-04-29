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
//       axios.get(`http://localhost:5005/api/Product/${ProductID}`)
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

// import { useState, useEffect } from "react";
// import Modal from "react-modal";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import axios from "axios";
// import { IoClose } from "react-icons/io5";
// import { Link } from "react-router-dom";

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
//   images: string[];
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
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     if (isOpen && ProductID) {
//       axios
//         .get(`http://localhost:5005/api/Product/${ProductID}`)
//         .then((response) => {
//           const fetchedProduct = response.data;

//           const sanitizedColor = (fetchedProduct.colors || []).map((c: any) => ({
//             productID: ProductID,
//             colorID: c.colorID,
//             product: null,
//             color: c.color || null,
//           }));

//           setProduct({
//             ...fetchedProduct,
//             color: sanitizedColor,
//           });

//           if (fetchedProduct.images.length > 0) {
//             setSelectedImage(`data:image/jpeg;base64,${fetchedProduct.images[0]}`);
//           }
//         })
//         .catch((error) => console.error("Error fetching product:", error));
//     }
//   }, [isOpen, ProductID]);

//   if (!product) return null;

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//     >
//       <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-lg">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-600"
//         >
//           <IoClose className="w-6 h-6" />
//         </button>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Image Section */}
//           <div>
//             {selectedImage && (
//               <img
//                 src={selectedImage}
//                 alt="Selected Product"
//                 className="w-full h-96 object-cover rounded-md"
//               />
//             )}

//             <div className="flex space-x-2 mt-4 overflow-x-auto">
//               {product.images.map((img, index) => (
//                 <img
//                   key={index}
//                   src={`data:image/jpeg;base64,${img}`}
//                   alt={`Thumbnail ${index}`}
//                   className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
//                     selectedImage === `data:image/jpeg;base64,${img}`
//                       ? "border-black"
//                       : "border-gray-300"
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

//             {/* Color Buttons */}
//             <div className="mt-4">
//               <label className="block text-sm font-medium mb-2">Color:</label>
//               <div className="flex flex-wrap gap-2">
//                 {product.color?.map((c, index) => (
//                   <button
//                     key={index}
//                     className={`w-8 h-8 rounded-full border-2 ${
//                       selectedColor === c.color ? "border-black scale-180" : "border-gray-200"
//                     }`}
//                     style={{ backgroundColor: c.color || "#ccc" }}
//                     onClick={() => setSelectedColor(c.color)}
//                     title={c.color || "Unknown"}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Size Selection */}
//             <div className="mt-4">
//               <label className="block text-sm font-medium mb-2">Sizes:</label>
//               <div className="flex flex-wrap gap-3">
//                 {["S", "M", "L", "XL"].map((size) => (
//                   <label key={size} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       value={size}
//                       checked={selectedSize.includes(size)}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         setSelectedSize((prev) =>
//                           prev.includes(value)
//                             ? prev.filter((s) => s !== value)
//                             : [...prev, value]
//                         );
//                       }}
//                     />
//                     <span>{size}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity Selection */}
//             <div className="mt-4 flex items-center">
//               <label className="block text-sm font-medium mr-2">Quantity:</label>
//               <button
//                 onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                 className="border px-3 py-1"
//               >
//                 -
//               </button>
//               <span className="mx-2 text-lg">{quantity}</span>
//               <button
//                 onClick={() => setQuantity((q) => q + 1)}
//                 className="border px-3 py-1"
//               >
//                 +
//               </button>
//             </div>

//             {/* Buttons */}
//             <button className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
//               Add to Cart
//             </button>
//             <Link
//               to="/CheckoutForm"
//               state={{
//                 id: product.id,
//                 name: product.name,
//                 price: product.price,
//                 color: selectedColor || "",
//                 size: selectedSize.join(", "),
//                 quantity: quantity,
//                 image: selectedImage,
//               }}
//             >
//               <button className="mt-3 w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition">
//                 Buy Now
//               </button>
//             </Link>
//             <p className="mt-3 text-gray-500 text-sm text-center">
//               Free delivery on orders over Rs.5000.00
//             </p>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ProductModal;
import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "./CartItem"; // adjust path as needed



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
  images: string[];
  rating: number;
}

interface ProductModalProps {
  ProductID: number;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  ProductID,
  isOpen,
  onClose,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && ProductID) {
      axios
        .get(`http://localhost:5005/api/Product/${ProductID}`)
        .then((res) => {
          const p = res.data as Product & { colors?: any[] };
          const sanitizedColors = (p.colors || []).map((c) => ({
            productID: ProductID,
            colorID: c.colorID,
            product: null,
            color: c.color || null,
          }));
          setProduct({ ...p, color: sanitizedColors });
          if (p.images.length) {
            setSelectedImage(`data:image/jpeg;base64,${p.images[0]}`);
          }
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [isOpen, ProductID]);

  if (!product) return null;

  const handleAddToCart = async () => {
    try {
      await axios.post("http://localhost:5005/api/cart", {
        productID: product.id,
        name: product.name,
        price: product.price,
        imageUrl: selectedImage,
        size: selectedSize.join(", "),
        color: selectedColor,
        quantity,
      });
      alert("✅ Added to cart");
      onClose();
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("❌ Could not add to cart");
    }
  };

  const handleBuyNow = () => {
    const item = {
      ProductID: product.id,
      Name:      product.name,
      ImageUrl:  selectedImage ?? undefined,
      Quantity:  quantity,
      Price:     product.price,
      Size:      selectedSize.join(", "),
      Color:     selectedColor ?? undefined
    };
    const subtotal = item.Price * item.Quantity;
    const shipping = subtotal >= 5000 ? 0 : 250;

    navigate("/checkout", {
      state: {
        cartItems: [item],
        subtotal,
        shippingFee: shipping,
        finalTotal: subtotal + shipping,
      },
    });
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-600"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected Product"
                className="w-full h-96 object-cover rounded-md"
              />
            )}
            <div className="flex space-x-2 mt-4 overflow-x-auto">
              {product.images.map((img, i) => {
                const dataUrl = `data:image/jpeg;base64,${img}`;
                return (
                  <img
                    key={i}
                    src={dataUrl}
                    alt={`Thumbnail ${i}`}
                    className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                      selectedImage === dataUrl
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(dataUrl)}
                  />
                );
              })}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-lg text-gray-600 mt-1">
              Rs. {product.price.toFixed(2)}
            </p>

            {/* Color Picker */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Color:</label>
              <div className="flex flex-wrap gap-2">
                {product.color.map((c, idx) => (
                  <button
                    key={idx}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      selectedColor === c.color
                        ? "border-black scale-110"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: c.color || "#ccc" }}
                    onClick={() => setSelectedColor(c.color)}
                    title={c.color || "Unknown"}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Sizes:</label>
              <div className="flex flex-wrap gap-3">
                {["S", "M", "L", "XL"].map((sz) => (
                  <label key={sz} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={sz}
                      checked={selectedSize.includes(sz)}
                      onChange={(e) => {
                        const v = e.target.value;
                        setSelectedSize((prev) =>
                          prev.includes(v)
                            ? prev.filter((x) => x !== v)
                            : [...prev, v]
                        );
                      }}
                    />
                    <span>{sz}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-4 flex items-center">
              <label className="block text-sm font-medium mr-2">Qty:</label>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="border px-3 py-1"
              >
                –
              </button>
              <span className="mx-2 text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="border px-3 py-1"
              >
                +
              </button>
            </div>

            {/* Actions */}
            <button
             onClick={() =>
              addToCart({
                ProductID: product.id,
                Name: product.name,
                ImageUrl: selectedImage ?? undefined, // fixes type error
                Quantity: quantity,
                Price: product.price,
                Size: selectedSize.join(", "),
                Color: selectedColor ?? undefined,
              })
            }
            
            
              className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

            {/* <Link
              to="/CheckoutForm"
              state={{
                id: product.id,
                name: product.name,
                price: product.price,
                color: selectedColor || "",
                size: selectedSize.join(", "),
                quantity,
                image: selectedImage,
              }}
            >
              <button className="mt-3 w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition">
                Buy Now
              </button>
            </Link> */}
            <button
              onClick={handleBuyNow}
              className="mt-3 w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition"
            >
              Buy Now
            </button>

            <p className="mt-3 text-gray-500 text-sm text-center">
              Free delivery on orders over Rs. 5,000
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;

