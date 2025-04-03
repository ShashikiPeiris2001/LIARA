// src/components/HeroSection.tsx
import React, { useState, useEffect } from "react";
import image1 from "../assets/3frame.jpg";
import image2 from "../assets/Gigi Hadid American.jpg";
import image3 from "../assets/beautiful-young-woman.jpg";
import { Link } from "react-router-dom";
import Header from "./Header";
import Navbar from "./NavBar";
import NewArrivals from "./NewArrivals";

const HeroSection: React.FC = () => {
  const images = [image1, image2, image3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic image transition every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Move to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full h-[80vh] flex overflow-hidden">
      {/* Image Slider */}
      <div className="flex w-full h-full transition-transform duration-1000 ease-in-out"
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Hero Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center  bg-opacity-50 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Discover Your Style</h1>
        <p className="text-lg mb-6">Explore the latest trends with LIARA</p>
        <button className="px-6 py-2 bg-white text-black rounded-xl hover:bg-gray-200 transition">
          <Link to="/ShopNow">Shop Now</Link>
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2  p-2 rounded-full opacity-80 hover:opacity-100"
      >
      
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2  p-2 rounded-full opacity-80 hover:opacity-100"
      >
      
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 flex justify-center w-full gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full border-2 border-white cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
