import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';

interface ProductData {
  id: number;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

const CheckoutForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product: ProductData = location.state; 

  const total = product.price * product.quantity;
  const shippingFee = total < 5000 ? 400 : 0;
  const finalTotal = total + shippingFee;

  // Ensure user is logged in before checkout
  useEffect(() => {
    const token = localStorage.getItem('token'); // or your auth context
    if (!token) {
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      Phone: '',
      address: '',
      apartment: '',
      city: '',
      postalCode: '',
    },
    onSubmit: async (values) => {
      const orderPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        city: values.city,
        postalCode: values.postalCode,
        phone: values.Phone,
        email: values.email,
        total: finalTotal,
        cartItems: [
          {
            productId: product.id,
            quantity: product.quantity,
            name: product.name,
            price: product.price,
          },
        ],
      };

      try {
        const response = await axios.post('http://localhost:5005/api/Checkout/PlaceOrder', orderPayload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token in headers
          },
        });

        alert(response.data.message);
      } catch (error: any) {
        alert(error.response?.data || 'Something went wrong');
      }
    },
  });

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      {/* Left: Contact & Delivery */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
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
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" defaultChecked />
            Email me with news and offers
          </label>
        </div>

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
            type="text"
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

        <button
          type="submit"
          className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Place Order
        </button>
      </form>

      {/* Right: Order Summary */}
      <div className="border p-4 rounded space-y-4">
        <div className="flex items-center gap-4">
          <img src={product.image} alt={product.name} className="w-16 h-20 object-cover" />
          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-gray-500">{product.size} / {product.color}</p>
          </div>
          <span className="ml-auto font-semibold">Rs {total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>Rs {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className={`font-medium ${shippingFee === 0 ? 'text-green-600' : 'text-gray-700'}`}>
            {shippingFee === 0 ? 'FREE' : `Rs ${shippingFee.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>LKR Rs {finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
