import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    PasswordHash: "",
    UserRole:"customer"
  });

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

    try {
      const response = await axios.post(
        `http://localhost:5005/api/Users/register-users`,
        formData
      );
      console.log(formData);
      alert("User registered successfully");

      setFormData({
        Username: "",
        Email: "",
        PasswordHash: "",
        UserRole: "customer", // Reset to default value
      });
      
    } catch (error) {
      console.log(error);
      alert("Error registering user");
    }
    console.log(formData); // Here you can send formData to your backend or API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">CREATE ACCOUNT</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="Username"
              name="Username"
              type="text"
              value={formData.Username}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="Email"
              name="Email"
              type="Email"
              value={formData.Email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="PasswordHash"
              name="PasswordHash"
              type="password"
              value={formData.PasswordHash}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Sign Up
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>Returning Customer?</span>
          <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
            Sign In &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
