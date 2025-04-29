// // import React, { useEffect } from 'react';
// // import { useFormik } from 'formik';
// // import axios from 'axios';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { Phone } from 'lucide-react';

// // interface ProductData {
// //   id: number;
// //   name: string;
// //   price: number;
// //   color: string;
// //   size: string;
// //   quantity: number;
// //   image: string;
// // }

// // const CheckoutForm: React.FC = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const product: ProductData = location.state; 

// //   const total = product.price * product.quantity;
// //   const shippingFee = total < 5000 ? 400 : 0;
// //   const finalTotal = total + shippingFee;

// //   // Ensure user is logged in before checkout
// //   useEffect(() => {
// //     const token = localStorage.getItem('token'); // or your auth context
// //     if (!token) {
// //       navigate('/login', { state: { from: '/checkout' } });
// //     }
// //   }, [navigate]);

// //   const formik = useFormik({
// //     initialValues: {
// //       email: '',
// //       firstName: '',
// //       lastName: '',
// //       Phone: '',
// //       address: '',
// //       apartment: '',
// //       city: '',
// //       postalCode: '',
// //     },
// //     onSubmit: async (values) => {
// //       const orderPayload = {
// //         firstName: values.firstName,
// //         lastName: values.lastName,
// //         address: values.address,
// //         city: values.city,
// //         postalCode: values.postalCode,
// //         phone: values.Phone,
// //         email: values.email,
// //         total: finalTotal,
// //         cartItems: [
// //           {
// //             productId: product.id,
// //             quantity: product.quantity,
// //             name: product.name,
// //             price: product.price,
// //           },
// //         ],
// //       };

// //       try {
// //         const response = await axios.post('http://localhost:5005/api/Checkout/PlaceOrder', orderPayload, {
// //           headers: {
// //             'Content-Type': 'application/json',
// //             'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token in headers
// //           },
// //         });

// //         alert(response.data.message);
// //       } catch (error: any) {
// //         alert(error.response?.data || 'Something went wrong');
// //       }
// //     },
// //   });

// //   return (
// //     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
// //       {/* Left: Contact & Delivery */}
// //       <form onSubmit={formik.handleSubmit} className="space-y-6">
// //         <div>
// //           <h2 className="text-xl font-bold mb-2">Contact</h2>
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email or mobile phone number"
// //             onChange={formik.handleChange}
// //             value={formik.values.email}
// //             className="w-full border p-2 rounded"
// //             required
// //           />
// //           <label className="flex items-center mt-2">
// //             <input type="checkbox" className="mr-2" defaultChecked />
// //             Email me with news and offers
// //           </label>
// //         </div>

// //         <div>
// //           <h2 className="text-xl font-bold mb-2">Delivery</h2>
// //           <select className="w-full border p-2 rounded mb-3" disabled>
// //             <option>Sri Lanka</option>
// //           </select>
// //           <div className="grid grid-cols-2 gap-4 mb-3">
// //             <input
// //               type="text"
// //               name="firstName"
// //               placeholder="First name"
// //               onChange={formik.handleChange}
// //               value={formik.values.firstName}
// //               className="border p-2 rounded"
// //               required
// //             />
// //             <input
// //               type="text"
// //               name="lastName"
// //               placeholder="Last name"
// //               onChange={formik.handleChange}
// //               value={formik.values.lastName}
// //               className="border p-2 rounded"
// //               required
// //             />
// //           </div>
// //           <input
// //             type="text"
// //             name="Phone"
// //             placeholder="Phone"
// //             onChange={formik.handleChange}
// //             value={formik.values.Phone}
// //             className="w-full border p-2 rounded mb-3"
// //           />
// //           <input
// //             type="text"
// //             name="address"
// //             placeholder="Address"
// //             onChange={formik.handleChange}
// //             value={formik.values.address}
// //             className="w-full border p-2 rounded mb-3"
// //             required
// //           />
// //           <input
// //             type="text"
// //             name="apartment"
// //             placeholder="Apartment, suite, etc. (optional)"
// //             onChange={formik.handleChange}
// //             value={formik.values.apartment}
// //             className="w-full border p-2 rounded mb-3"
// //           />
// //           <div className="grid grid-cols-2 gap-4">
// //             <input
// //               type="text"
// //               name="city"
// //               placeholder="City"
// //               onChange={formik.handleChange}
// //               value={formik.values.city}
// //               className="border p-2 rounded"
// //               required
// //             />
// //             <input
// //               type="text"
// //               name="postalCode"
// //               placeholder="Postal code"
// //               onChange={formik.handleChange}
// //               value={formik.values.postalCode}
// //               className="border p-2 rounded"
// //             />
// //           </div>
// //         </div>

// //         <button
// //           type="submit"
// //           className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
// //         >
// //           Place Order
// //         </button>
// //       </form>

// //       {/* Right: Order Summary */}
// //       <div className="border p-4 rounded space-y-4">
// //         <div className="flex items-center gap-4">
// //           <img src={product.image} alt={product.name} className="w-16 h-20 object-cover" />
// //           <div>
// //             <p className="font-semibold">{product.name}</p>
// //             <p className="text-sm text-gray-500">{product.size} / {product.color}</p>
// //           </div>
// //           <span className="ml-auto font-semibold">Rs {total.toFixed(2)}</span>
// //         </div>

// //         <div className="flex justify-between text-sm">
// //           <span>Subtotal</span>
// //           <span>Rs {total.toFixed(2)}</span>
// //         </div>
// //         <div className="flex justify-between text-sm">
// //           <span>Shipping</span>
// //           <span className={`font-medium ${shippingFee === 0 ? 'text-green-600' : 'text-gray-700'}`}>
// //             {shippingFee === 0 ? 'FREE' : `Rs ${shippingFee.toFixed(2)}`}
// //           </span>
// //         </div>
// //         <div className="flex justify-between font-bold text-lg pt-2 border-t">
// //           <span>Total</span>
// //           <span>LKR Rs {finalTotal.toFixed(2)}</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CheckoutForm;
// // import React, { useEffect } from "react";
// // import { useFormik } from "formik";
// // import axios from "axios";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { CartItem } from "./CartItem";
// // import { Phone } from "lucide-react";

// // interface CheckoutState {
// //   cartItems: CartItem[];
// //   subtotal: number;
// //   shippingFee: number;
// //   finalTotal: number;
// // }

// // const CheckoutForm: React.FC = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { cartItems, subtotal, shippingFee, finalTotal } =
// //     (location.state as CheckoutState) || { cartItems: [], subtotal: 0, shippingFee: 0, finalTotal: 0 };

// //   // redirect if not logged in
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       navigate("/login", { state: { from: "/CheckoutForm" } });
// //     }
// //   }, [navigate]);

// //   const formik = useFormik({
// //     initialValues: {
// //       email: "",
// //       firstName: "",
// //       lastName: "",
// //       Phone: "",
// //       address: "",
// //       apartment: "",
// //       city: "",
// //       postalCode: "",
// //     },
// //     onSubmit: async (values) => {
// //       const orderPayload = {
// //         firstName: values.firstName,
// //         lastName: values.lastName,
// //         address: values.address,
// //         city: values.city,
// //         postalCode: values.postalCode,
// //         phone: values.Phone,
// //         email: values.email,
// //         total: finalTotal,
// //         cartItems: cartItems.map((i) => ({
// //           productId: i.ProductID,
// //           quantity: i.Quantity,
// //           name: i.Name,
// //           price: i.Price,
// //         })),
// //       };

// //       try {
// //         const resp = await axios.post(
// //           "http://localhost:5005/api/Checkout/PlaceOrder",
// //           orderPayload,
// //           {
// //             headers: {
// //               "Content-Type": "application/json",
// //               Authorization: `Bearer ${localStorage.getItem("token")}`,
// //             },
// //           }
// //         );
// //         alert(resp.data.message);
// //       } catch (err: any) {
// //         alert(err.response?.data || "Something went wrong");
// //       }
// //     },
// //   });

// //   return (
// //     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
// //       {/* Left: Form */}
// //       <form onSubmit={formik.handleSubmit} className="space-y-6">
// //         {/* Contact */}
// //         <div>
// //           <h2 className="text-xl font-bold mb-2">Contact</h2>
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email or mobile phone number"
// //             onChange={formik.handleChange}
// //             value={formik.values.email}
// //             className="w-full border p-2 rounded"
// //             required
// //           />
// //           <label className="flex items-center mt-2">
// //             <input type="checkbox" className="mr-2" defaultChecked />
// //             Email me with news and offers
// //           </label>
// //         </div>

// //         {/* Delivery */}
// //         <div>
// //           <h2 className="text-xl font-bold mb-2">Delivery</h2>
// //           <select className="w-full border p-2 rounded mb-3" disabled>
// //             <option>Sri Lanka</option>
// //           </select>

// //           <div className="grid grid-cols-2 gap-4 mb-3">
// //             <input
// //               type="text"
// //               name="firstName"
// //               placeholder="First name"
// //               onChange={formik.handleChange}
// //               value={formik.values.firstName}
// //               className="border p-2 rounded"
// //               required
// //             />
// //             <input
// //               type="text"
// //               name="lastName"
// //               placeholder="Last name"
// //               onChange={formik.handleChange}
// //               value={formik.values.lastName}
// //               className="border p-2 rounded"
// //               required
// //             />
// //           </div>

// //           <input
// //             type="text"
// //             name="Phone"
// //             placeholder="Phone"
// //             onChange={formik.handleChange}
// //             value={formik.values.Phone}
// //             className="w-full border p-2 rounded mb-3"
// //           />

// //           <input
// //             type="text"
// //             name="address"
// //             placeholder="Address"
// //             onChange={formik.handleChange}
// //             value={formik.values.address}
// //             className="w-full border p-2 rounded mb-3"
// //             required
// //           />
// //           <input
// //             type="text"
// //             name="apartment"
// //             placeholder="Apartment, suite, etc. (optional)"
// //             onChange={formik.handleChange}
// //             value={formik.values.apartment}
// //             className="w-full border p-2 rounded mb-3"
// //           />

// //           <div className="grid grid-cols-2 gap-4">
// //             <input
// //               type="text"
// //               name="city"
// //               placeholder="City"
// //               onChange={formik.handleChange}
// //               value={formik.values.city}
// //               className="border p-2 rounded"
// //               required
// //             />
// //             <input
// //               type="text"
// //               name="postalCode"
// //               placeholder="Postal code"
// //               onChange={formik.handleChange}
// //               value={formik.values.postalCode}
// //               className="border p-2 rounded"
// //             />
// //           </div>
// //         </div>

// //         <button
// //           type="submit"
// //           className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
// //         >
// //           Place Order
// //         </button>
// //       </form>

// //       {/* Right: Order Summary */}
// //       <div className="border p-4 rounded space-y-4">
// //         {cartItems.map((i) => (
// //           <div key={i.ProductID} className="flex items-center gap-4">
// //             <img
// //               src={i.ImageUrl ?? "/fallback-image.jpg"}
// //               alt={i.Name}
// //               className="w-16 h-20 object-cover rounded"
// //             />
// //             <div>
// //               <p className="font-semibold">{i.Name}</p>
// //               <p className="text-sm text-gray-500">
// //                 {i.Size} / {i.Color}
// //               </p>
// //             </div>
// //             <span className="ml-auto font-semibold">
// //               LKR {(i.Price * i.Quantity).toFixed(2)}
// //             </span>
// //           </div>
// //         ))}

// //         <div className="flex justify-between text-sm">
// //           <span>Subtotal</span>
// //           <span>LKR {subtotal.toFixed(2)}</span>
// //         </div>
// //         <div className="flex justify-between text-sm">
// //           <span>Shipping</span>
// //           <span className={shippingFee === 0 ? "text-green-600" : ""}>
// //             {shippingFee === 0 ? "FREE" : `LKR ${shippingFee.toFixed(2)}`}
// //           </span>
// //         </div>
// //         <div className="flex justify-between font-bold text-lg pt-2 border-t">
// //           <span>Total</span>
// //           <span>LKR {finalTotal.toFixed(2)}</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CheckoutForm;
// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CartItem } from "./CartItem";

// interface CheckoutState {
//   cartItems: CartItem[];
//   subtotal: number;
//   shippingFee: number;
//   finalTotal: number;
// }

// const CheckoutForm: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cartItems, subtotal, shippingFee, finalTotal } =
//     (location.state as CheckoutState) || { cartItems: [], subtotal: 0, shippingFee: 0, finalTotal: 0 };

//   const [selectedPayment, setSelectedPayment] = useState("card");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login", { state: { from: "/CheckoutForm" } });
//     }
//   }, [navigate]);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       firstName: "",
//       lastName: "",
//       Phone: "",
//       address: "",
//       apartment: "",
//       city: "",
//       postalCode: "",
//     },
//     onSubmit: async (values) => {
//       const orderPayload = {
//         firstName: values.firstName,
//         lastName: values.lastName,
//         address: values.address,
//         city: values.city,
//         postalCode: values.postalCode,
//         phone: values.Phone,
//         email: values.email,
//         paymentMethod: selectedPayment,
//         total: finalTotal,
//         cartItems: cartItems.map((i) => ({
//           productId: i.ProductID,
//           quantity: i.Quantity,
//           name: i.Name,
//           price: i.Price,
//         })),
//       };

//       try {
//         const resp = await axios.post(
//           "http://localhost:5005/api/Checkout/PlaceOrder",
//           orderPayload,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         alert(resp.data.message);
//       } catch (err: any) {
//         alert(err.response?.data || "Something went wrong");
//       }
//     },
//   });

//   const paymentOptions = [
//     {
//       value: "card",
//       label: "Pay with Debit or Credit Card",
//       icons: ["visa@2x", "mastercard@2x"],
//     },
//     {
//       value: "mintpay",
//       label: "Mintpay | Shop now. Pay later.",
//       icons: ["visa@2x"],
//     },
//     {
//       value: "payhere",
//       label: "Bank Card / Bank Account - PayHere",
//       icons: ["mastercard@2x", "visa@2x"],
//     },
//     {
//       value: "koko",
//       label: "Koko: Buy Now Pay Later",
//       icons: ["visa@2x"],
//     },
//     {
//       value: "cod",
//       label: "Cash on Delivery (COD)",
//       icons: [],
//     },
//   ];
  

//   return (
//     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
//       {/* Left Side: Form */}
//       <form onSubmit={formik.handleSubmit} className="space-y-6">
//         {/* Contact Info */}
//         <div>
//           <h2 className="text-xl font-bold mb-2">Contact</h2>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email or mobile phone number"
//             onChange={formik.handleChange}
//             value={formik.values.email}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <label className="flex items-center mt-2">
//             <input type="checkbox" className="mr-2" defaultChecked />
//             Email me with news and offers
//           </label>
//         </div>

//         {/* Delivery Address */}
//         <div>
//           <h2 className="text-xl font-bold mb-2">Delivery</h2>
//           <select className="w-full border p-2 rounded mb-3" disabled>
//             <option>Sri Lanka</option>
//           </select>
//           <div className="grid grid-cols-2 gap-4 mb-3">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First name"
//               onChange={formik.handleChange}
//               value={formik.values.firstName}
//               className="border p-2 rounded"
//               required
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last name"
//               onChange={formik.handleChange}
//               value={formik.values.lastName}
//               className="border p-2 rounded"
//               required
//             />
//           </div>
//           <input
//             type="text"
//             name="Phone"
//             placeholder="Phone"
//             onChange={formik.handleChange}
//             value={formik.values.Phone}
//             className="w-full border p-2 rounded mb-3"
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             onChange={formik.handleChange}
//             value={formik.values.address}
//             className="w-full border p-2 rounded mb-3"
//             required
//           />
//           <input
//             type="text"
//             name="apartment"
//             placeholder="Apartment, suite, etc. (optional)"
//             onChange={formik.handleChange}
//             value={formik.values.apartment}
//             className="w-full border p-2 rounded mb-3"
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               onChange={formik.handleChange}
//               value={formik.values.city}
//               className="border p-2 rounded"
//               required
//             />
//             <input
//               type="text"
//               name="postalCode"
//               placeholder="Postal code"
//               onChange={formik.handleChange}
//               value={formik.values.postalCode}
//               className="border p-2 rounded"
//             />
//           </div>
//         </div>

//         {/* Payment Section */}
//         <div>
//           <h2 className="text-xl font-bold mb-2">Payment</h2>
//           <p className="text-sm text-gray-500 mb-2">All transactions are secure and encrypted.</p>
//           <div className="space-y-3">
//             {paymentOptions.map((opt) => (
//               <label
//                 key={opt.value}
//                 className={`flex items-center p-3 border rounded cursor-pointer justify-between ${
//                   selectedPayment === opt.value ? "border-black" : "border-gray-300"
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value={opt.value}
//                   checked={selectedPayment === opt.value}
//                   onChange={() => setSelectedPayment(opt.value)}
//                   className="mr-3"
//                 />
//                 <span className="flex-1">{opt.label}</span>
//                 {opt.icons.length > 0 && (
//                   <div className="flex gap-1">
//                     {opt.icons.map((icon, index) => (
//                       <img
//                         key={index}
//                         src={`/icons/${icon}.png`}
//                         alt={icon}
//                         className="h-5 w-8 object-contain"
//                       />
//                     ))}
//                   </div>
//                 )}
//               </label>
//             ))}
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
//         >
//           Pay now
//         </button>
//       </form>

//       {/* Right Side: Order Summary */}
//       <div className="border p-4 rounded space-y-4">
//         {cartItems.map((i) => (
//           <div key={i.ProductID} className="flex items-center gap-4">
//             <img
//               src={i.ImageUrl ?? "/fallback-image.jpg"}
//               alt={i.Name}
//               className="w-16 h-20 object-cover rounded"
//             />
//             <div>
//               <p className="font-semibold">{i.Name}</p>
//               <p className="text-sm text-gray-500">
//                 {i.Size} / {i.Color}
//               </p>
//             </div>
//             <span className="ml-auto font-semibold">
//               LKR {(i.Price * i.Quantity).toFixed(2)}
//             </span>
//           </div>
//         ))}

//         <div className="flex justify-between text-sm">
//           <span>Subtotal</span>
//           <span>LKR {subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-sm">
//           <span>Shipping</span>
//           <span className={shippingFee === 0 ? "text-green-600" : ""}>
//             {shippingFee === 0 ? "FREE" : `LKR ${shippingFee.toFixed(2)}`}
//           </span>
//         </div>
//         <div className="flex justify-between font-bold text-lg pt-2 border-t">
//           <span>Total</span>
//           <span>LKR {finalTotal.toFixed(2)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutForm;

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem";

interface CheckoutState {
  cartItems: CartItem[];
  subtotal: number;
  shippingFee: number;
  finalTotal: number;
}

const CheckoutForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, subtotal, shippingFee, finalTotal } =
    (location.state as CheckoutState) || {
      cartItems: [],
      subtotal: 0,
      shippingFee: 0,
      finalTotal: 0,
    };

  const [selectedPayment, setSelectedPayment] = useState("card");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/CheckoutForm" } });
      window.scrollTo(0, 0);
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      Phone: "",
      address: "",
      apartment: "",
      city: "",
      postalCode: "",
      subscribe: true,
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!values.email) errors.email = "Email is required";
      if (!values.firstName) errors.firstName = "First name is required";
      if (!values.lastName) errors.lastName = "Last name is required";
      if (!values.address) errors.address = "Address is required";
      if (!values.city) errors.city = "City is required";
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      const orderPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        city: values.city,
        postalCode: values.postalCode,
        phone: values.Phone,
        email: values.email,
        paymentMethod: selectedPayment,
        Totalprice: finalTotal,
        cartItems: cartItems.map((i) => ({
          productId: i.ProductID,
          quantity: i.Quantity,
          name: i.Name,
          price: i.Price,
        })),
      };

      try {
        const resp = await axios.post(
          "http://localhost:5005/api/Checkout/PlaceOrder",
          orderPayload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert(resp.data.message);
        navigate("/thank-you");
      } catch (err: any) {
        alert(err.response?.data || "Something went wrong");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const paymentOptions = [
    {
      value: "card",
      label: "Pay with Debit or Credit Card",
      icons: ["visa@2x", "mastercard@2x"],
    },
    {
      value: "mintpay",
      label: "Mintpay | Shop now. Pay later.",
      icons: ["visa@2x"],
    },
    {
      value: "payhere",
      label: "Bank Card / Bank Account - PayHere",
      icons: ["mastercard@2x", "visa@2x"],
    },
    {
      value: "koko",
      label: "Koko: Buy Now Pay Later",
      icons: ["visa@2x"],
    },
    {
      value: "cod",
      label: "Cash on Delivery (COD)",
      icons: [],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      {/* Left Side: Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">Contact</h2>
          <input
            type="email"
            name="email"
            placeholder="Email or mobile phone number"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full border p-2 rounded"
            required
          />
          <label className="flex items-center mt-2 text-sm">
            <input
              type="checkbox"
              name="subscribe"
              checked={formik.values.subscribe}
              onChange={formik.handleChange}
              className="mr-2"
            />
            Email me with news and offers
          </label>
        </div>

        {/* Delivery Address */}
        <div>
          <h2 className="text-xl font-bold mb-2">Delivery</h2>
          <select className="w-full border p-2 rounded mb-3" disabled>
            <option>Sri Lanka</option>
          </select>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              className="border p-2 rounded"
              required
            />
          </div>
          <input
            type="tel"
            name="Phone"
            placeholder="Phone"
            onChange={formik.handleChange}
            value={formik.values.Phone}
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={formik.handleChange}
            value={formik.values.address}
            className="w-full border p-2 rounded mb-3"
            required
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, suite, etc. (optional)"
            onChange={formik.handleChange}
            value={formik.values.apartment}
            className="w-full border p-2 rounded mb-3"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={formik.handleChange}
              value={formik.values.city}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal code"
              onChange={formik.handleChange}
              value={formik.values.postalCode}
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Payment Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">Payment</h2>
          <p className="text-sm text-gray-500 mb-2">
            All transactions are secure and encrypted.
          </p>
          <div className="space-y-3">
            {paymentOptions.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center p-3 border rounded cursor-pointer justify-between ${
                  selectedPayment === opt.value
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={opt.value}
                  checked={selectedPayment === opt.value}
                  onChange={() => setSelectedPayment(opt.value)}
                  className="mr-3"
                />
                <span className="flex-1">{opt.label}</span>
                {opt.icons.length > 0 && (
                  <div className="flex gap-1">
                    {opt.icons.map((icon, index) => (
                      <img
                        key={index}
                        src={`/icons/${icon}.png`}
                        alt={icon}
                        className="h-5 w-8 object-contain"
                      />
                    ))}
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`mt-6 w-full bg-black text-white py-2 rounded ${
            formik.isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
          }`}
        >
          {formik.isSubmitting ? "Processing..." : "Pay now"}
        </button>
      </form>

      {/* Right Side: Order Summary */}
      <div className="border p-4 rounded space-y-4">
        {cartItems.map((i) => (
          <div key={i.ProductID} className="flex items-center gap-4">
            <img
              src={i.ImageUrl || "/fallback-image.jpg"}
              alt={i.Name}
              className="w-16 h-20 object-cover rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/fallback-image.jpg";
              }}
            />
            <div>
              <p className="font-semibold">{i.Name}</p>
              <p className="text-sm text-gray-500">
                {i.Size} / {i.Color}
              </p>
            </div>
            <span className="ml-auto font-semibold">
              LKR {(i.Price * i.Quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>LKR {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className={shippingFee === 0 ? "text-green-600" : ""}>
            {shippingFee === 0 ? "FREE" : `LKR ${shippingFee.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>LKR {finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
