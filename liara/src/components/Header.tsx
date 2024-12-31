import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdContact } from "react-icons/io";
import Women from "./Womens";
import HeroSection from "./Herosection";
import NewArrivals from "./NewArrivals";



const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <Router>
      <header className="flex justify-between items-center px-8 py-6 bg-zinc-200">
        {/* Logo Section */}
        <div className="font-serif text-4xl font-medium">
          LIARA
          <span className="block text-xs font-normal text-gray-500">
            A CLOTHING BRAND
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-8 relative">
          <Link to="/" className="text-gray-700 hover:text-black transition">
            Home
          </Link>
          <Link
            to="/new-arrivals"
            className="text-gray-700 hover:text-black transition"
          >
            New Arrivals
          </Link>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-black transition"
            >
              Category
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                <Link
                  to="/category/womens"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Womens
                </Link>
                <Link
                  to="/category/men"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Men
                </Link>
                <Link
                  to="/category/kids"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Kids
                </Link>
              </div>
            )}
          </div>

          <Link to="/sales" className="text-gray-700 hover:text-black transition">
            Sales
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex space-x-6 text-xl cursor-pointer">
          <IoSearch className="header__icon search" />
          <LuShoppingCart className="header__icon cart" />
          <IoMdContact className="header__icon profile" />
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/Herosection" element={<HeroSection />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/category/womens" element={<Women />} />
      </Routes>
    </Router>
  );
};

export default Header;
