import React from "react";
import image from "../assets/Everlane denim banner.jpg"; // Import the image as a module
import Navbar from "./NavBar";

const HeroSection: React.FC = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }} // Use the imported image
    >
      <button
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black text-white font-medium rounded-md shadow-lg hover:bg-gray-500 transition duration-300"
      >
        Shop Now
      </button>
    </div>
  );
};

export default HeroSection;


