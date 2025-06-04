
import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { addToCart as addToLocalCart } from "./CartItem"; // adjust path as needed

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

// Fallback to local URL if environment var isn't available or process is undefined
const API_BASE_URL = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL)
  ? process.env.REACT_APP_API_URL
  : "http://localhost:5005";

// Make sure to bind modal to your appElement (for accessibility)
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
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
        .get(`${API_BASE_URL}/api/Product/${ProductID}`)
        .then((res) => {
          const p = res.data as Product & { colors?: any[] };
          const sanitizedColors = (p.colors || []).map((c) => ({
            productID: ProductID,
            colorID: c.colorID,
            product: null,
            color: c.color || null,
          }));
          setProduct({ ...p, color: sanitizedColors });
          if (p.images.length) setSelectedImage(`data:image/jpeg;base64,${p.images[0]}`);
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [isOpen, ProductID]);

  if (!product) return null;

  const validateSelection = () => {
    if (!selectedColor) {
      alert("Please select a color.");
      return false;
    }
    if (!selectedSize.length) {
      alert("Please select at least one size.");
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (!validateSelection()) return;

    const item = {
      ProductID: product.id,
      Name: product.name,
      ImageUrl: selectedImage ?? undefined,
      Size: selectedSize.join(", "),
      Color: selectedColor ?? undefined,
      Quantity: quantity,
      Price: product.price,
    };

    try {
      addToLocalCart(item);
      alert("✅ Added to cart");
      onClose();
    } catch (err) {
      console.error("Failed to add to local cart:", err);
      alert("❌ Could not add to cart");
    }
  };

  const handleBuyNow = () => {
    if (!validateSelection()) return;

    const item = {
      ProductID: product.id,
      Name: product.name,
      ImageUrl: selectedImage ?? undefined,
      Quantity: quantity,
      Price: product.price,
      Size: selectedSize.join(", "),
      Color: selectedColor ?? undefined,
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
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-lg mx-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-red-600 z-10 bg-white rounded-full p-1 shadow-md"
          aria-label="Close"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Image Gallery */}
          <div className="sticky top-0 md:static">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected Product"
                className="w-full h-64 md:h-96 object-contain rounded-md"
              />
            )}
            <div className="flex space-x-2 mt-2 md:mt-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => {
                const url = `data:image/jpeg;base64,${img}`;
                return (
                  <img
                    key={i}
                    src={url}
                    alt={`Thumbnail ${i}`}
                    className={`w-12 h-12 md:w-16 md:h-16 object-cover rounded-md cursor-pointer border-2 ${
                      selectedImage === url ? "border-black" : "border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(url)}
                  />
                );
              })}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">{product.name}</h2>
            <p className="text-lg text-gray-600">Rs. {product.price.toFixed(2)}</p>

            <div className="mt-2 md:mt-4">
              <label className="block text-sm font-medium mb-1 md:mb-2">Color:</label>
              <div className="flex flex-wrap gap-2">
                {product.color.map((c, idx) => (
                  <button
                    key={idx}
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-transform ${
                      selectedColor === c.color ? "border-black scale-110" : "border-gray-200"
                    }`}
                    style={{ backgroundColor: c.color || "#ccc" }}
                    onClick={() => setSelectedColor(c.color)}
                    title={c.color || "Unknown"}
                  />
                ))}
              </div>
            </div>

            <div className="mt-2 md:mt-4">
              <label className="block text-sm font-medium mb-1 md:mb-2">Sizes:</label>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {["S", "M", "L", "XL"].map((sz) => (
                  <label key={sz} className="flex items-center space-x-1 md:space-x-2">
                    <input
                      type="checkbox"
                      value={sz}
                      checked={selectedSize.includes(sz)}
                      onChange={(e) => {
                        const v = e.target.value;
                        setSelectedSize((prev) =>
                          prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
                        );
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm md:text-base">{sz}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-2 md:mt-4 flex items-center">
              <label className="block text-sm font-medium mr-2">Qty:</label>
              <button 
                onClick={() => setQuantity((q) => Math.max(1, q - 1))} 
                className="border px-2 md:px-3 py-1 text-sm md:text-base"
              >
                –
              </button>
              <span className="mx-2 text-base md:text-lg">{quantity}</span>
              <button 
                onClick={() => setQuantity((q) => q + 1)} 
                className="border px-2 md:px-3 py-1 text-sm md:text-base"
              >
                +
              </button>
            </div>

            <div className="mt-4 md:mt-6 space-y-2">
              <button 
                onClick={handleAddToCart} 
                className="w-full bg-black text-white py-2 md:py-3 rounded-md hover:bg-gray-800 transition text-sm md:text-base"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow} 
                className="w-full bg-red-500 text-white py-2 md:py-3 rounded-md hover:bg-red-600 transition text-sm md:text-base"
              >
                Buy Now
              </button>
            </div>
            <p className="text-gray-500 text-xs md:text-sm text-center">
              Free delivery on orders over Rs. 5,000
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;