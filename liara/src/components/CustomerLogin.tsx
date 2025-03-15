/* import React from "react";
import SignUp from "./SignUp";

const CustomerLogin: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">CUSTOMER LOGIN</h1>
        <hr className="mb-6" />
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center justify-between">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <a
                href="/SignUp"
                className="text-sm text-black hover:underline ml-2"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In
          </button>
          <div className="text-center text-sm mt-4">
            <span>New Customer?</span>{" "}
            <a href="/SignUp" className="text-indigo-600 font-medium hover:underline">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
 */

// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const CustomerLogin: React.FC = () => {
//   const [formData, setFormData] = useState({
//     Email: "",
//     PasswordHash: "",
//   });
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // Handle input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     console.log("Sending Login Data:", formData); // ✅ Debugging log


//     try {
//       // Make a POST request to the backend API
//       const response = await axios.post(
//         "http://localhost:5005/api/Users/login",
//         formData,
//         { headers: { "Content-Type": "application/json" } }
//       );

//       // Handle successful login
//       console.log("Login successful:", response.data);

//       // Save token or user data in localStorage (if applicable)
//       localStorage.setItem("token", response.data.token);

//       // Redirect to HeroSection after successful login
//       navigate("/HeroSection");
//     } catch (error: any) {
//       // Handle errors
//       console.error("Login error:", error.response?.data || error.message);
//       setError(
//         error.response?.data?.message || "An error occurred while logging in."
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-96">
//         <h1 className="text-2xl font-bold mb-6 text-center">CUSTOMER LOGIN</h1>
//         <hr className="mb-6" />
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           {/* Email Input */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="Email"
//               name="Email"
//               placeholder="Enter your email"
//               value={formData.Email}
//               onChange={handleInputChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//           </div>

//           {/* Password Input */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <div className="flex items-center justify-between">
//               <input
//                 type="password"
//                 id="PasswordHash"
//                 name="PasswordHash"
//                 placeholder="Enter your password"
//                 value={formData.PasswordHash}
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 required
//               />
//               <a
//                 href="/forgot-password"
//                 className="text-sm text-black hover:underline ml-2"
//               >
//                 Forgot your password?
//               </a>
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//           {/* Sign In Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Sign In
//           </button>

//           {/* Sign Up Link */}
//           <div className="text-center text-sm mt-4">
//             <span>New Customer?</span>{" "}
//             <a href="/SignUp" className="text-indigo-600 font-medium hover:underline">
//               Sign up
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CustomerLogin;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",  // ✅ FIXED: Use "Password" instead of "PasswordHash"
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    console.log("Sending login request with:", formData); // ✅ Debugging

    try {
      const response = await axios.post(
        "http://localhost:5005/api/Users/login",
        JSON.stringify(formData),  // ✅ Ensure proper JSON format
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login successful:", response.data);

      // Save token in localStorage
      localStorage.setItem("token", response.data.Token);
      localStorage.setItem("userRole", response.data.UserRole);


      // Redirect to HeroSection after successful login
      if (response.data.UserRole === "Admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/Herosection");
      }
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "An error occurred while logging in."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">CUSTOMER LOGIN</h1>
        <hr className="mb-6" />
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              placeholder="Enter your email"
              value={formData.Email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center justify-between">
              <input
                type="password"
                id="Password"
                name="Password"  
                placeholder="Enter your password"
                value={formData.Password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              <a href="/ResetPassword" className="text-sm text-black hover:underline ml-2">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Sign In Button */}
          <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Sign In
          </button>

          {/* Sign Up Link */}
          <div className="text-center text-sm mt-4">
            <span>New Customer?</span>{" "}
            <a href="/SignUp" className="text-indigo-600 font-medium hover:underline">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;

 