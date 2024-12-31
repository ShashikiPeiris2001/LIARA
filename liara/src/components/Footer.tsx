import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className=" bg-gray-800 text-white py-8 flex flex-col md:flex-row justify-around items-start">
      <div className="text-base mb-4 md:mb-0">
        <h4 className="font-bold mb-2">Contact Us</h4>
        <p>General Hotline - (011) 286 7511</p>
        <p>Order Updates - 077 3446447</p>
        <p>General Email - info@liara.lk</p>
        <p>Order Email - online@liara.lk</p>
      </div>
      <div className="text-base mb-4 md:mb-0">
        <h4 className="font-bold mb-2">LIARA Online Store</h4>
        <p>Mon-Fri: 9:00AM to 6:00 PM</p>
        <p>Saturday: 9:00AM to 2:00 PM</p>
        <p>Sunday: Closed</p>
      </div>
      <div>
        <h4 className="text-base font-bold mb-2">Follow Us</h4>
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-gray-400">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaTiktok size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
