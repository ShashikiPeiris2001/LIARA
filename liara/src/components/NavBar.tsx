import React from "react";
import Header from "./Header";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <ul className="flex justify-center space-x-14 p-4 text-m">
        <li>
          <a href="/Herosection" className="hover:text-gray-400 transition">
            Home
          </a>
        </li>
        <li>
          <a href="/NewArrivals" className="hover:text-gray-400 transition">
            New Arrivals
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400 transition">
            Women
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400 transition">
            Men
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400 transition">
            Kids
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400 transition">
            Sales
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400 transition">
            About Us
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
