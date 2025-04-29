// import CartItem from './CartItem';
// import { useEffect, useState } from "react";
// import axios from "axios";


// interface CartItemType {
//   cartItemID: number;
//   productID: number;
//   Name: string;
//   price: number;
//   quantity: number;
//   imageUrl: string;
//   size: string;
//   Color: string;
// }

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState<CartItemType[]>([]);
//   const [subtotal, setSubtotal] = useState(0);

//   const fetchCart = async () => {
//     const response = await axios.get("/api/cart");
//     const items = response.data;
//     setCartItems(items);
//     const sub = items.reduce((acc: number, item: CartItemType) => acc + item.price * item.quantity, 0);
//     setSubtotal(sub);
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const clearCart = async () => {
//     await axios.delete("/api/cart");
//     fetchCart();
//   };

//   const removeItem = async (id: number) => {
//     await axios.delete(`/api/cart/${id}`);
//     fetchCart();
//   };
//   const updateQuantity = async (id: number, newQuantity: number) => {
//     if (newQuantity < 1) return; // Prevent quantity below 1
//     await axios.put(`/api/cart/${id}`, { quantity: newQuantity });
//     fetchCart();
//   };
  

//   return (
//     <div className="flex flex-col lg:flex-row p-6 gap-6">
//       {/* Cart Items */}
//       <div className="w-full lg:w-2/3 space-y-4">
//         {cartItems.map(item => (
//           <CartItem
//           key={item.cartItemID}
//           item={item}
//           onRemove={removeItem}
//           onUpdateQuantity={updateQuantity}
//         />
        
//         ))}
//         <button
//           onClick={clearCart}
//           className="bg-black text-white px-6 py-2 rounded flex items-center justify-center gap-2 mt-4"
//         >
//           🗑 Clear Shopping Cart
//         </button>
//       </div>

//       {/* Summary */}
//       <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded space-y-4">
//         <h2 className="text-xl font-semibold border-b pb-2">Cart Totals</h2>
//         <div className="flex justify-between">
//           <span>Subtotal</span>
//           <span>LKR {subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Shipping</span>
//           <span>LKR 450.00</span>
//         </div>
//         <div className="flex justify-between font-bold text-lg border-t pt-2">
//           <span>Total</span>
//           <span>LKR {(subtotal + 450).toFixed(2)}</span>
//         </div>
//         <button className="w-full bg-black text-white py-2 rounded hover:opacity-90">
//           Proceed To Checkout →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
// import { useEffect, useState } from "react";
// import { getCart, CartItem } from "./CartItem";

// export default function CartPage() {
//   const [items, setItems] = useState<CartItem[]>([]);

//   useEffect(() => {
//     setItems(getCart());
//   }, []);

//   const total = items.reduce((sum, item) => sum + item.Price * item.Quantity, 0);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl mb-4">Your Cart</h2>
//       <ul className="space-y-4">
//         {items.map((item, index) => (
//           <li key={index} className="flex items-center justify-between border p-4 rounded">
//             <div className="flex gap-4">
//               <img
//                 src={item.ImageUrl ?? "/fallback-image.jpg"}
//                 alt={item.Name}
//                 className="w-20 h-20 object-cover"
//               />
//               <div>
//                 <h3 className="font-semibold">{item.Name}</h3>
//                 <p>Qty: {item.Quantity}</p>
//               </div>
//             </div>
//             <p>LKR{(item.Price * item.Quantity).toFixed(2)}</p>
//           </li>
//         ))}
//       </ul>
//       <div className="mt-6 text-right text-xl font-bold">Total: ${total.toFixed(2)}</div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import { getCart, removeFromCart, CartItem } from "./CartItem";
// import { useNavigate } from "react-router-dom";
// import { X } from "lucide-react";
// import { Link } from "react-router-dom";


// export default function CartPage() {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setItems(getCart());
//   }, []);

//   const handleRemove = (productId: number) => {
//     removeFromCart(productId);
//     setItems(getCart()); // re-fetch updated cart
//   };
  

//   const handleCheckout = () => {
//     navigate("/checkout", { state: { cartItems: items } });
//   };

//   const total = items.reduce((sum, item) => sum + item.Price * item.Quantity, 0);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

//       {items.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul className="divide-y">
//             {items.map((item, index) => (
//               <li key={index} className="flex items-start py-4">
//                 {/* 1. Left: product info grows to fill */}
//                 <div className="flex flex-1 gap-4 items-start">
//                   <img
//                     src={item.ImageUrl ?? "/fallback-image.jpg"}
//                     alt={item.Name}
//                     className="w-24 h-24 object-cover rounded"
//                   />
//                   <div>
//                     <h3 className="font-semibold">{item.Name}</h3>
//                     <p className="text-sm text-gray-600">Size: {item.Size}</p>
//                     <p className="text-sm text-gray-600">Color: {item.Color}</p>
//                   </div>
//                 </div>

//                 {/* 2. Middle: fixed width, always right-aligned */}
//                 <div className="w-48 flex flex-col items-end text-right gap-1">
//                   <p className="text-gray-700">Price: LKR {item.Price.toFixed(2)}</p>
//                   <div className="flex items-center gap-1">
//                     <span className="text-gray-700">Qty:</span>
//                     <input
//                       type="number"
//                       min={1}
//                       value={item.Quantity}
//                       onChange={(e) => {
//                         const q = parseInt(e.target.value);
//                         if (q > 0) {
//                           const updated = items.map((i) =>
//                             i.ProductID === item.ProductID ? { ...i, Quantity: q } : i
//                           );
//                           localStorage.setItem("cart", JSON.stringify(updated));
//                           setItems(updated);
//                         }
//                       }}
//                       className="w-16 px-2 py-1 border rounded text-right"
//                     />
//                   </div>
//                   <p className="font-semibold">Total: LKR {(item.Price * item.Quantity).toFixed(2)}</p>
//                 </div>

//                 {/* 3. Right: remove icon column */}
//                 <div className="w-8 flex justify-center">
//                   <button
//                     onClick={() => handleRemove(item.ProductID)}
//                     className="text-black hover:text-red-700"
//                     aria-label="Remove item"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </li>

           
           
//             ))}
//           </ul>

//           <div className="text-right mt-6">
//             <div className="text-xl font-bold mb-2">Subtotal: LKR {total.toFixed(2)}</div>
//             <Link
//               to="/CheckoutForm"
//               state={{ cartItems: items }}
//             >
//               <button 
//                onClick={handleCheckout}
//                className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800">
//                 Checkout
//               </button>
//             </Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { getCart, removeFromCart, CartItem } from "./CartItem";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
    setItems(getCart());
  };

  const subtotal = items.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
  const shippingFee = subtotal < 5000 ? 400 : 0;
  const finalTotal = subtotal + shippingFee;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.ProductID} className="flex items-start py-4">
                {/* 1. Left: product info */}
                <div className="flex flex-1 gap-4">
                  <img
                    src={item.ImageUrl ?? "/fallback-image.jpg"}
                    alt={item.Name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.Name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.Size}</p>
                    <p className="text-sm text-gray-600">Color: {item.Color}</p>
                  </div>
                </div>

                {/* 2. Middle: fixed width, right-aligned */}
                <div className="w-48 flex flex-col items-end text-right gap-1">
                  <p className="text-gray-700">Price: LKR {item.Price.toFixed(2)}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-700">Qty:</span>
                    <input
                      type="number"
                      min={1}
                      value={item.Quantity}
                      onChange={(e) => {
                        const q = parseInt(e.target.value);
                        if (q > 0) {
                          const updated = items.map((i) =>
                            i.ProductID === item.ProductID
                              ? { ...i, Quantity: q }
                              : i
                          );
                          localStorage.setItem("cart", JSON.stringify(updated));
                          setItems(updated);
                        }
                      }}
                      className="w-16 px-2 py-1 border rounded text-right"
                    />
                  </div>
                  <p className="font-semibold">
                    Total: LKR {(item.Price * item.Quantity).toFixed(2)}
                  </p>
                </div>

                {/* 3. Right: remove icon */}
                <div className="w-8 flex justify-center">
                  <button
                    onClick={() => handleRemove(item.ProductID)}
                    className="text-black hover:text-red-700"
                    aria-label="Remove item"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right mt-6">
            <div className="text-xl font-bold mb-2">Subtotal: LKR {subtotal.toFixed(2)}</div>
            <div className="text-gray-600 mb-4">
              Shipping: {shippingFee === 0 ? "FREE" : `LKR ${shippingFee.toFixed(2)}`}
            </div>

            <Link
              to="/checkout"
              state={{ cartItems: items, subtotal, shippingFee, finalTotal }}
            >
              <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800">
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
