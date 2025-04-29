// // import React from "react";

// // interface CartItemProps {
// //   item: {
// //     cartItemID: number;
// //     productID: number;
// //     productName: string;
// //     price: number;
// //     quantity: number;
// //     imageUrl: string;
// //     size: string;
// //     pattern: string;
// //   };
// //   onRemove: (id: number) => void;
// // }

// // const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
// //   return (
// //     <div className="flex items-start gap-4 border-b pb-6">
// //       <img
// //         src={item.imageUrl}
// //         alt={item.productName}
// //         className="w-20 h-20 rounded object-cover"
// //       />
// //       <div className="flex-1 space-y-1">
// //         <h3 className="font-semibold text-gray-800">{item.productName}</h3>
// //         <p className="text-sm text-gray-500">{item.pattern}</p>
// //         <p className="text-sm text-gray-500">Size: {item.size}</p>
// //         <p className="text-sm font-semibold text-gray-800">
// //           LKR {item.price.toFixed(2)}
// //         </p>

// //         <div className="flex items-center gap-2 mt-2">
// //           <span className="text-sm text-gray-600">Qty:</span>
// //           <div className="flex items-center border px-2 rounded">
// //             <span>-</span>
// //             <span className="px-2">{item.quantity}</span>
// //             <span>+</span>
// //           </div>
// //         </div>

// //         <button
// //           onClick={() => onRemove(item.cartItemID)}
// //           className="text-sm text-red-500 underline mt-1"
// //         >
// //           Remove
// //         </button>
// //       </div>
// //       <div className="text-right font-semibold text-gray-700 min-w-[100px]">
// //         LKR {(item.price * item.quantity).toFixed(2)}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CartItem;
// import React from "react";

// interface CartItemProps {
//   item: {
//     cartItemID: number;
//     productID: number;
//     Name: string;
//     price: number;
//     quantity: number;
//     imageUrl: string;
//     size: string;
//     Color: string;
//   };
//   onRemove: (id: number) => void;
//   onUpdateQuantity: (id: number, newQty: number) => void;
// }

// const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
//   const handleDecrease = () => {
//     if (item.quantity > 1) {
//       onUpdateQuantity(item.cartItemID, item.quantity - 1);
//     }
//   };

//   const handleIncrease = () => {
//     onUpdateQuantity(item.cartItemID, item.quantity + 1);
//   };

//   return (
//     <div className="flex items-start gap-4 border-b pb-6">
//       <img
//         src={item.imageUrl}
//         alt={item.Name}
//         className="w-24 h-24 rounded object-cover border"
//       />
//       <div className="flex-1 space-y-1">
//         <h3 className="font-semibold text-gray-800">{item.Name}</h3>
//         <p className="text-sm text-gray-500">Color: {item.Color}</p>
//         <p className="text-sm text-gray-500">Size: {item.size}</p>
//         <p className="text-sm font-semibold text-gray-800">
//           LKR {item.price.toFixed(2)}
//         </p>

//         <div className="flex items-center gap-3 mt-2">
//           <span className="text-sm text-gray-600">Qty:</span>
//           <div className="flex items-center gap-2 border px-3 py-1 rounded-md">
//             <button
//               onClick={handleDecrease}
//               className="text-gray-700 hover:text-black font-bold"
//             >
//               −
//             </button>
//             <span className="px-1">{item.quantity}</span>
//             <button
//               onClick={handleIncrease}
//               className="text-gray-700 hover:text-black font-bold"
//             >
//               +
//             </button>
//           </div>
//         </div>

//         <button
//           onClick={() => onRemove(item.cartItemID)}
//           className="text-sm text-red-500 underline mt-2"
//         >
//           Remove
//         </button>
//       </div>

//       <div className="text-right font-semibold text-gray-700 min-w-[100px]">
//         LKR {(item.price * item.quantity).toFixed(2)}
//       </div>
//     </div>
//   );
// };

// export default CartItem;
// utils/cart.ts
// export const getCart = (): CartItem[] => {
//   const cart = localStorage.getItem("cart");
//   return cart ? JSON.parse(cart) : [];
// };


// // CartItem.ts
// export interface CartItem {
//   ProductID: number;
//   Name: string;
//   Price: number;
//   Quantity: number;
//   ImageUrl?: string | null;
//   Size?: string;
//   Color?: string | null;
// }

// export const addToCart = (Product: CartItem) => {
//   const currentCart = getCart();
//   const existing = currentCart.find((item: CartItem) => item.ProductID === Product.ProductID);

//   if (existing) {
//     existing.Quantity += Product.Quantity;
//   } else {
//     currentCart.push(Product);
//   }

//   localStorage.setItem("cart", JSON.stringify(currentCart));
// };
export interface CartItem {
  ProductID: number;
  Name: string;
  Price: number;
  Quantity: number;
  ImageUrl?: string | null;
  Size?: string;
  Color?: string | null;
}

export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: CartItem) => {
  const currentCart = getCart();
  const existing = currentCart.find(item => item.ProductID === product.ProductID);

  if (existing) {
    existing.Quantity += product.Quantity;
  } else {
    currentCart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(currentCart));
};

// ✅ New: Remove item by ProductID
export const removeFromCart = (productId: number) => {
  const currentCart = getCart();
  const updatedCart = currentCart.filter(item => item.ProductID !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};
