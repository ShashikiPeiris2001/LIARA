// import { useEffect, useState } from "react";
// import { getCart, removeFromCart, CartItem } from "./CartItem";
// import { Link } from "react-router-dom";
// import { X, ChevronLeft, ShoppingBag } from "lucide-react";

// // Helper function to format price with commas
// const formatPrice = (price: number) => {
//   return new Intl.NumberFormat('en-US').format(price);
// };

// // Helper function to get full size name with undefined handling
// const getFullSizeName = (size: string | undefined) => {
//   if (!size) return 'Not specified';
  
//   const sizeMap: Record<string, string> = {
//     'xs': 'Extra Small',
//     's': 'Small',
//     'm': 'Medium',
//     'l': 'Large',
//     'xl': 'Extra Large',
//     'xxl': 'Double Extra Large',
//     's-small': 'Super Small',
//     'ss': 'Super Small', // Additional common abbreviation
//     'xs-sm': 'Extra Small',
//     'xl-lg': 'Extra Large'
//   };
  
//   return sizeMap[size.toLowerCase()] || size;
// };

// export default function CartPage() {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [isRemoving, setIsRemoving] = useState<number | null>(null);

//   useEffect(() => {
//     setItems(getCart());
//   }, []);

//   const handleRemove = (productId: number) => {
//     setIsRemoving(productId);
//     setTimeout(() => {
//       removeFromCart(productId);
//       setItems(getCart());
//       setIsRemoving(null);
//     }, 300);
//   };

//   const subtotal = items.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
//   const shippingFee = subtotal < 5000 ? 400 : 0;
//   const finalTotal = subtotal + shippingFee;

//   return (
//     <div className="bg-gray-50 min-h-screen pb-20">
//       {/* Page Header */}
//       <div className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="max-w-5xl mx-auto px-14 sm:px-10 lg:px-8 py-11">
//           <div className="flex items-center justify-between">
//             {/*<Link 
//               to="/" 
//               className="flex items-center text-gray-700 hover:text-black transition-colors"
//             >
//               <ChevronLeft className="w-5 h-5 mr-1" />
//               </Link>*/}
//             <h1 className="text-xl font-bold text-gray-900"></h1>
//             <div className="w-24"></div> {/* Spacer for balance */}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {items.length === 0 ? (
//           <div className="text-center py-20">
//             <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//               <ShoppingBag className="w-12 h-12 text-gray-400" />
//             </div>
//             <h2 className="text-2xl font-medium text-gray-800 mb-2">Your cart is empty</h2>
//             <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
//             <Link 
//               to="/" 
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
//             >
//               Start Shopping
//             </Link>
//           </div>
//         ) : (
//           <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
//             <div className="lg:col-span-8">
//               <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//                 <ul className="divide-y divide-gray-200">
//                   {items.map((item) => (
//                     <li 
//                       key={item.ProductID} 
//                       className={`p-4 sm:p-6 ${isRemoving === item.ProductID ? 'opacity-0 scale-95 transition-all duration-300' : 'opacity-100 scale-100 transition-all duration-300'}`}
//                     >
//                       <div className="flex items-start sm:items-center">
//                         {/* Product Image */}
//                         <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg">
//                           <img
//                             src={item.ImageUrl ?? "/fallback-image.jpg"}
//                             alt={item.Name}
//                             className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                           />
//                         </div>

//                         {/* Product Info */}
//                         <div className="ml-4 sm:ml-6 flex-1">
//                           <div className="flex items-start justify-between">
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 hover:text-black transition-colors">
//                                 {item.Name}
//                               </h3>
//                               <div className="mt-1 flex flex-wrap gap-2">
//                                 {item.Size && (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                     {getFullSizeName(item.Size)}
//                                   </span>
//                                 )}
//                                 {item.Color && (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                     {item.Color}
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                             <button
//                               onClick={() => handleRemove(item.ProductID)}
//                               className="ml-2 p-1 -mt-2 -mr-2 text-gray-400 hover:text-red-600 transition-colors"
//                               aria-label="Remove item"
//                             >
//                               <X className="w-5 h-5" />
//                             </button>
//                           </div>

//                           {/* Price and Quantity */}
//                           <div className="mt-4 sm:mt-6 flex items-center justify-between">
//                             <div className="flex items-center">
//                               <span className="text-gray-700 mr-3">Quantity:</span>
//                               <div className="flex items-center border border-gray-300 rounded-md">
//                                 <button
//                                   onClick={() => {
//                                     const q = item.Quantity - 1;
//                                     if (q > 0) {
//                                       const updated = items.map((i) =>
//                                         i.ProductID === item.ProductID
//                                           ? { ...i, Quantity: q }
//                                           : i
//                                       );
//                                       localStorage.setItem("cart", JSON.stringify(updated));
//                                       setItems(updated);
//                                     }
//                                   }}
//                                   className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
//                                   disabled={item.Quantity <= 1}
//                                 >
//                                   -
//                                 </button>
//                                 <span className="px-3 py-1 text-center w-12">
//                                   {item.Quantity}
//                                 </span>
//                                 <button
//                                   onClick={() => {
//                                     const q = item.Quantity + 1;
//                                     const updated = items.map((i) =>
//                                       i.ProductID === item.ProductID
//                                         ? { ...i, Quantity: q }
//                                         : i
//                                     );
//                                     localStorage.setItem("cart", JSON.stringify(updated));
//                                     setItems(updated);
//                                   }}
//                                   className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
//                                 >
//                                   +
//                                 </button>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-gray-500 text-sm">LKR {formatPrice(item.Price)} each</p>
//                               <p className="font-semibold text-lg">
//                                 LKR {formatPrice(item.Price * item.Quantity)}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="mt-8 lg:mt-0 lg:col-span-4">
//               <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
//                 <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                
//                 <div className="space-y-4">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
//                     <span className="font-medium">LKR {formatPrice(subtotal)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className="font-medium">
//                       {shippingFee === 0 ? (
//                         <span className="text-green-600">FREE</span>
//                       ) : (
//                         `LKR ${formatPrice(shippingFee)}`
//                       )}
//                     </span>
//                   </div>
//                   {shippingFee > 0 && subtotal < 5000 && (
//                     <div className="text-sm text-center p-2 bg-yellow-50 text-yellow-700 rounded">
//                       Add LKR {formatPrice(5000 - subtotal)} more for free shipping!
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between text-lg font-bold">
//                   <span>Total</span>
//                   <span>LKR {formatPrice(finalTotal)}</span>
//                 </div>

//                 <div className="mt-6">
//                   <Link
//                     to="/checkout"
//                     state={{ cartItems: items, subtotal, shippingFee, finalTotal }}
//                     className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
//                   >
//                     Proceed to Checkout
//                   </Link>
//                 </div>

//                 <div className="mt-4 text-center">
//                   <p className="text-sm text-gray-500">
//                     or{' '}
//                     <Link
//                       to="/"
//                       className="text-black font-medium hover:underline"
//                     >
//                       Continue Shopping
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getCart, removeFromCart, CartItem } from "./CartItem";
import { Link } from "react-router-dom";
import { X, ShoppingBag } from "lucide-react";

// Helper function to format price with commas
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US').format(price);
};

// Helper function to get full size name with undefined handling
const getFullSizeName = (size: string | undefined) => {
  if (!size) return 'Not specified';
  
  const sizeMap: Record<string, string> = {
    'xs': 'Extra Small',
    's': 'Small',
    'm': 'Medium',
    'l': 'Large',
    'xl': 'Extra Large',
    'xxl': 'Double Extra Large',
    's-small': 'Super Small',
    'ss': 'Super Small',
    'xs-sm': 'Extra Small',
    'xl-lg': 'Extra Large'
  };
  
  return sizeMap[size.toLowerCase()] || size;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);

  useEffect(() => {
    setItems(getCart());
  }, []);

  // If you want this page to listen for events when clearCart() runs, uncomment below:
  // useEffect(() => {
  //   const onCartUpdated = () => setItems(getCart());
  //   window.addEventListener("cartUpdated", onCartUpdated);
  //   return () => window.removeEventListener("cartUpdated", onCartUpdated);
  // }, []);

  const handleRemove = (productId: number) => {
    setIsRemoving(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setItems(getCart());
      setIsRemoving(null);
    }, 300);
  };

  const subtotal = items.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
  const shippingFee = subtotal < 5000 ? 400 : 0;
  const finalTotal = subtotal + shippingFee;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-14 sm:px-10 lg:px-8 py-11">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900"> </h1>
            <div className="w-24"></div> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li 
                      key={item.ProductID} 
                      className={`p-4 sm:p-6 ${
                        isRemoving === item.ProductID
                          ? 'opacity-0 scale-95 transition-all duration-300'
                          : 'opacity-100 scale-100 transition-all duration-300'
                      }`}
                    >
                      <div className="flex items-start sm:items-center">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg">
                          <img
                            src={item.ImageUrl ?? "/fallback-image.jpg"}
                            alt={item.Name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="ml-4 sm:ml-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 hover:text-black transition-colors">
                                {item.Name}
                              </h3>
                              <div className="mt-1 flex flex-wrap gap-2">
                                {item.Size && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {getFullSizeName(item.Size)}
                                  </span>
                                )}
                                {item.Color && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {item.Color}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemove(item.ProductID)}
                              className="ml-2 p-1 -mt-2 -mr-2 text-gray-400 hover:text-red-600 transition-colors"
                              aria-label="Remove item"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Price and Quantity */}
                          <div className="mt-4 sm:mt-6 flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-gray-700 mr-3">Quantity:</span>
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  onClick={() => {
                                    const q = item.Quantity - 1;
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
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                  disabled={item.Quantity <= 1}
                                >
                                  –
                                </button>
                                <span className="px-3 py-1 text-center w-12">
                                  {item.Quantity}
                                </span>
                                <button
                                  onClick={() => {
                                    const q = item.Quantity + 1;
                                    const updated = items.map((i) =>
                                      i.ProductID === item.ProductID
                                        ? { ...i, Quantity: q }
                                        : i
                                    );
                                    localStorage.setItem("cart", JSON.stringify(updated));
                                    setItems(updated);
                                  }}
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-500 text-sm">
                                LKR {formatPrice(item.Price)} each
                              </p>
                              <p className="font-semibold text-lg">
                                LKR {formatPrice(item.Price * item.Quantity)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-8 lg:mt-0 lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})
                    </span>
                    <span className="font-medium">LKR {formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `LKR ${formatPrice(shippingFee)}`
                      )}
                    </span>
                  </div>
                  {shippingFee > 0 && subtotal < 5000 && (
                    <div className="text-sm text-center p-2 bg-yellow-50 text-yellow-700 rounded">
                      Add LKR {formatPrice(5000 - subtotal)} more for free shipping!
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>LKR {formatPrice(finalTotal)}</span>
                </div>

                <div className="mt-6">
                  <Link
                    to="/checkout"
                    state={{ cartItems: items, subtotal, shippingFee, finalTotal }}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
                  >
                    Proceed to Checkout
                  </Link>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    or{' '}
                    <Link
                      to="/"
                      className="text-black font-medium hover:underline"
                    >
                      Continue Shopping
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
