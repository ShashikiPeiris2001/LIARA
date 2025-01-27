import React from "react";
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
