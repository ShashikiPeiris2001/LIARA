import React from "react";
import { IoSearch } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdContact } from "react-icons/io";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-8 py-5 bg-white ">
      {/* Logo Section */}
      <div className="text-4xl font-[Cinzel] tracking-[0.25em] text-black uppercase text-center">
        LIARA
        {/* <span className="block text-xs font-normal text-gray-500">
          A CLOTHING BRAND
        </span> */}
      </div>

      {/* Action Icons */}
      <div className="flex space-x-6 text-xl cursor-pointer">
        {/* <IoSearch className="hover:text-gray-500 transition" /> */}
        < Link to="/CartPage" >
          <LuShoppingCart className="hover:text-gray-500 transition"  />
        </Link>
        <Link to="/login">
          <IoMdContact className="hover:text-gray-500 transition" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
