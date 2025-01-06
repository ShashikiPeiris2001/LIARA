import React from "react";
import { IoSearch } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdContact } from "react-icons/io";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md">
      {/* Logo Section */}
      <div className="font-serif text-4xl font-medium cursor-pointer">
        LIARA
        <span className="block text-xs font-normal text-gray-500">
          A CLOTHING BRAND
        </span>
      </div>

      {/* Action Icons */}
      <div className="flex space-x-6 text-xl cursor-pointer">
        <IoSearch className="hover:text-gray-500 transition" />
        <LuShoppingCart className="hover:text-gray-500 transition" />
        <IoMdContact className="hover:text-gray-500 transition" />
      </div>
    </header>
  );
};

export default Header;
