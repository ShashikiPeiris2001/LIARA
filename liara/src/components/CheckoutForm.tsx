import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { send } from "@emailjs/browser";
import { CartItem, clearCart } from "./CartItem";
import "react-phone-input-2/lib/style.css";

interface CheckoutState {
  cartItems: CartItem[];
  subtotal: number;
}

const CheckoutForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, subtotal } =
    (location.state as CheckoutState) || {
      cartItems: [],
      subtotal: 0,
    };

  // compute shipping & total locally
  const shippingFee = subtotal < 5000 ? 400 : 0;
  const finalTotal = subtotal + shippingFee;

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailOffers, setEmailOffers] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/CheckoutForm" } });
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      apartment: "",
      city: "",
      postalCode: "",
      country: "Sri Lanka",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      phone: Yup.string()
        .required("Required")
        .matches(/^\+[0-9]{7,15}$/, "Enter a valid international number"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      postalCode: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);

      const orderPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        city: values.city,
        postalCode: values.postalCode,
        country: values.country,
        phone: values.phone,
        email: values.email,
        paymentMethod: selectedPayment,
        shippingFee,
        total: finalTotal,
        cartItems: cartItems.map((item) => ({
          productId: item.ProductID,
          quantity: item.Quantity,
          name: item.Name,
          price: item.Price,
        })),
      };

      try {
        // 1. Send the order to your backend
        const { data } = await axios.post(
          "http://localhost:5005/api/Checkout/PlaceOrder",
          orderPayload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert(data.message);

        // 2. Send confirmation email
        await send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID!,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
          {
            to_email: values.email,
            to_name: `${values.firstName} ${values.lastName}`,
            order_id: data.orderId,
            order_date: new Date().toLocaleDateString(),
            order_total: finalTotal.toFixed(2),
          }
        );
        alert("Confirmation email sent!");

        // ─── CLEAR THE CART ───────────────────────────────────────────────────
        clearCart();
        // ────────────────────────────────────────────────────────────────────────

        // 3. Redirect to home (or order-success) page
        navigate("/Home", { state: { orderId: data.orderId } });
      } catch (err: any) {
        console.error(err);
        alert(err.response?.data || "Something went wrong");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const paymentOptions = [
    {
      value: "card",
      label: "Debit/Credit Card",
      icons: ["visa@2x", "mastercard@2x"],
    },
    { value: "mintpay", label: "Mintpay (BNPL)", icons: ["visa@2x"] },
    {
      value: "payhere",
      label: "PayHere",
      icons: ["visa@2x", "mastercard@2x"],
    },
    { value: "koko", label: "Koko (BNPL)", icons: ["visa@2x"] },
    { value: "cod", label: "Cash on Delivery", icons: [] },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900"></h1>
              <p className="mt-2 text-sm text-gray-600">
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 p-6">
        {/* ---- FORM ---- */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Contact */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg mb-4">Contact</h2>
            <Input label="Email" name="email" type="email" formik={formik} />
            <div className="flex items-center mt-2">
              <input
                id="offers"
                type="checkbox"
                checked={emailOffers}
                onChange={() => setEmailOffers(!emailOffers)}
                className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="offers"
                className="ml-2 text-sm text-gray-700 select-none"
              >
                Email me with news and offers
              </label>
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="font-semibold text-lg">Delivery</h2>
            <div>
              <label className="block text-sm font-medium mb-1">
                Country / Region
              </label>
              <select
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-lg p-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Sri Lanka</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input label="First name" name="firstName" formik={formik} />
              <Input label="Last name" name="lastName" formik={formik} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <PhoneInput
                country={"lk"}
                value={formik.values.phone}
                onChange={(p) => formik.setFieldValue("phone", "+" + p)}
                onBlur={() => formik.setFieldTouched("phone", true)}
                enableSearch
                inputClass="w-full border-gray-300 rounded-lg p-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                containerClass="w-full"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.phone}
                </div>
              )}
            </div>

            <Input label="Address" name="address" formik={formik} />
            <Input
              label="Apartment, suite, etc. (optional)"
              name="apartment"
              formik={formik}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input label="City" name="city" formik={formik} />
              <Input label="Postal code" name="postalCode" formik={formik} />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="font-semibold text-lg">Payment</h2>
            {paymentOptions.map((opt) => (
              <label
                key={opt.value}
                className={`flex justify-between items-center p-4 rounded-lg border transition hover:shadow-sm ${
                  selectedPayment === opt.value
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={selectedPayment === opt.value}
                    onChange={() => setSelectedPayment(opt.value)}
                    className="form-radio text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="select-none">{opt.label}</span>
                </div>
                <div className="flex space-x-1">
                  {opt.icons.map((ic) => (
                    <img
                      key={ic}
                      src={`/icons/${ic}.png`}
                      alt={ic}
                      className="h-5"
                    />
                  ))}
                </div>
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-800 text-white py-3 rounded-lg text-center font-medium transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Place order"}
          </button>
        </form>

        {/* ---- SUMMARY ---- */}
       <aside className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="font-semibold text-lg">Order summary</h2>
          {cartItems.map((item) => (
            <div key={item.ProductID} className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={
                    item.ImageUrl?.startsWith("data:")
                      ? item.ImageUrl
                      : `data:image/jpeg;base64,${item.ImageUrl}`
                  }
                  alt={item.Name}
                  className="w-16 h-20 object-cover rounded-lg transition hover:scale-105"
                />
                <span className="absolute -top-1 -left-1 bg-gray-900 text-white text-xs font-bold px-1 rounded">
                  {item.Quantity}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.Name}</p>
                <p className="text-sm text-gray-500">
                  {item.Size} / {item.Color}
                </p>
              </div>
              <div className="font-semibold">
                LKR{" "}
                {(item.Price * item.Quantity).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          ))}

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                LKR{" "}
                {subtotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping</span>
              {shippingFee > 0 ? (
                <span>
                  LKR{" "}
                  {shippingFee.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              ) : (
                <span className="text-green-600 font-medium">FREE</span>
              )}
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>
                LKR{" "}
                {finalTotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
};

type InputProps = {
  label: string;
  name: string;
  type?: string;
  formik: any;
};
const Input: React.FC<InputProps> = ({ label, name, type = "text", formik }) => (
  <div>
    <label className="block text-sm font-medium mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      placeholder={label}
      className="w-full border border-gray-300 rounded-lg p-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    />
    {formik.touched[name] && formik.errors[name] && (
      <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
    )}
  </div>
);

export default CheckoutForm;
