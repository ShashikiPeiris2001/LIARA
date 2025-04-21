import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // For icons

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-6 py-3">
      {/* Header Container */}
      <div className="flex justify-between items-center">
        {/* Desktop Menu - Centered */}
        <ul className="hidden md:flex justify-center flex-1 space-x-10 text-m">
          {["Herosection", "NewArrivals", "Womens", "Mens", "Kids", "Sales", "AboutUs"].map((item) => (
            <li key={item}>
              <Link to={`/${item}`} className="hover:text-gray-400 transition">
                {item === "Herosection" ? "Home" : item.replace(/([A-Z])/g, " $1").trim()}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (Right Side) */}
        <button
          className="md:hidden text-white ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <ul className="md:hidden flex flex-col space-y-4 mt-4 text-center">
          {["Herosection", "NewArrivals", "Womens", "Mens", "Kids", "Sales", "AboutUs"].map((item) => (
            <li key={item}>
              <Link
                to={`/${item}`}
                className="block py-2 hover:text-gray-400 transition"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                {item === "Herosection" ? "Home" : item.replace(/([A-Z])/g, " $1").trim()}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
