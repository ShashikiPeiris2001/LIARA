// // src/components/HeroSection.tsx
// import React, { useState, useEffect } from "react";
// import image1 from "../assets/posing-beach.jpg";
// import image2 from "../assets/cute-young-girl-with-dark.jpg";
// import image4 from "../assets/Gigi Hadid American.jpg";
// import image3 from "../assets/beautiful-young-woman.jpg";
// import { Link } from "react-router-dom";
// import Header from "./Header";
// import Navbar from "./NavBar";
// import NewArrivals from "./NewArrivals";

// const HeroSection: React.FC = () => {
//   const images = [image1, image2, image3,image4];
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Automatic image transition every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   // Move to the next slide
//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//   };

//   // Move to the previous slide
//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   return (
//     <section className="relative w-full h-[86vh] flex overflow-hidden">
//       {/* Image Slider */}
//       <div className="flex w-full h-full transition-transform duration-1000 ease-in-out"
//            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//         {images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Slide ${index + 1}`}
//             className="w-full h-full object-cover flex-shrink-0"
//           />
//         ))}
//       </div>

//       {/* Hero Text Overlay */}
//       <div className="absolute inset-0 flex flex-col justify-center items-center  bg-opacity-50 text-white text-center">
//         <h1 className="text-5xl font-bold mb-4">Discover Your Style</h1>
//         <p className="text-lg mb-6">Explore the latest trends with LIARA</p>
//         <button className="px-6 py-2 bg-white text-black rounded-xl hover:bg-gray-200 transition">
//           <Link to="/ShopNow">Shop Now</Link>
//         </button>
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2  p-2 rounded-full opacity-80 hover:opacity-100"
//       >
      
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2  p-2 rounded-full opacity-80 hover:opacity-100"
//       >
      
//       </button>

//       {/* Dots Indicator */}
//       <div className="absolute bottom-4 flex justify-center w-full gap-2">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-4 h-4 rounded-full border-2 border-white cursor-pointer ${
//               index === currentIndex ? "bg-white" : "bg-transparent"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import image1 from "../assets/posing-beach.jpg";
import image2 from "../assets/cute-young-girl-with-dark.jpg";
import image3 from "../assets/beautiful-young-woman.jpg";
import image4 from "../assets/Gigi Hadid American.jpg";
import { IoIosArrowForward } from "react-icons/io";

const slides = [
  {
    src: image1,
    title: "Step into Elegance",
    subtitle: "Unveil the New You",
    cta: "Shop Now",
  },
  {
    src: image2,
    title: "LIARA's Signature Looks",
    subtitle: "Where Fashion Meets Attitude",
    cta: "Discover Style",
  },
  {
    src: image3,
    title: "Bold & Beautiful",
    subtitle: "Be Unique, Be You",
    cta: "Explore Now",
  },
  {
    src: image4,
    title: "Timeless Trends",
    subtitle: "Designed for the Fearless",
    cta: "See Collection",
  },
];

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 1.2, ease: "easeInOut" } },
  };

  const textFade = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } },
  };

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex].src}
            alt="Hero Slide"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-start px-8 sm:px-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textFade}
          className="text-white max-w-lg"
          key={currentIndex + "-text"}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight drop-shadow-xl">
            {slides[currentIndex].title}
          </h1>
          <p className="text-lg sm:text-xl mb-6 text-gray-100 drop-shadow">
            {slides[currentIndex].subtitle}
          </p>
          <Link
            to="/ShopNow"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition-all group"
          >
            {slides[currentIndex].cta}
            <IoIosArrowForward className="text-lg transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
