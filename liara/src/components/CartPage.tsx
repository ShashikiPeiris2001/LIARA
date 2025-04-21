
// import { useEffect, useState } from "react";
// import axios from "axios";


// interface CartItemType {
//   cartItemID: number;
//   productID: number;
//   productName: string;
//   price: number;
//   quantity: number;
//   imageUrl: string;
//   size: string;
//   pattern: string;
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

//   return (
//     <div className="flex flex-col lg:flex-row p-6 gap-6">
//       {/* Cart Items */}
//       <div className="w-full lg:w-2/3 space-y-4">
//         {cartItems.map(item => (
//           <CartItem key={item.cartItemID} item={item} onRemove={removeItem} />
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
