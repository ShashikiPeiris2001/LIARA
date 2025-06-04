import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiShoppingBag } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import image1 from "../assets/360_FLj.jpg";
import image2 from "../assets/T6bTTIlx5Dy6U.jpg";
import image3 from "../assets/sky-wallpaper-preview.jpg";
import { Link } from 'react-router-dom'; 

const HeroSection: React.FC = () => {
  const slides = [
    { 
      src: image1, 
      title: "New Collection", 
      subtitle: "Spring 2024",
      badge: "Trending Now",
      cta: "Explore Collection"
    },
    { 
      src: image2, 
      title: "Summer Essentials", 
      subtitle: "Up to 30% Off",
      badge: "Limited Time",
      cta: "Shop Sale"
    },
    { 
      src: image3, 
      title: "Luxury Accessories", 
      subtitle: "Limited Edition",
      badge: "Exclusive",
      cta: "Discover More"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Animation variants
  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    })
  };

  const fadeInUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, delay: 0.3 }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
  };

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen max-h-[100vh] overflow-hidden">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full">
            <img
              src={slides[currentIndex].src}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/10" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Banner Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-xs sm:max-w-sm md:max-w-lg relative"
          >
            {/* Floating Badge */}
            <motion.span 
              variants={badgeVariants}
              className="absolute -top-10 sm:-top-12 left-0 text-xs sm:text-sm font-medium text-white bg-primary px-3 py-1 sm:px-4 sm:py-2 rounded-full mb-2 sm:mb-4 inline-flex items-center gap-1 sm:gap-2 shadow-lg"
            >
              <FiShoppingBag className="text-white text-xs sm:text-base" />
              {slides[currentIndex].badge}
            </motion.span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-4 leading-tight">
              {slides[currentIndex].title}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-4 sm:mb-8"
            >
              {slides[currentIndex].subtitle}
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/ShopNow" 
                className="group flex items-center justify-center gap-1 sm:gap-2 bg-white text-black px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-sm sm:text-base font-medium hover:bg-gray-100 transition-all duration-300 w-fit shadow-lg"
              >
                {slides[currentIndex].cta}
                <IoIosArrowForward className="group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300 text-xs sm:text-base" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        onClick={handlePrev}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full opacity-80 hover:opacity-100 hover:bg-white/30 transition-all duration-300 shadow-lg"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="text-white text-xl sm:text-2xl" />
      </motion.button>
      
      <motion.button
        onClick={handleNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full opacity-80 hover:opacity-100 hover:bg-white/30 transition-all duration-300 shadow-lg"
        aria-label="Next slide"
      >
        <FiChevronRight className="text-white text-xl sm:text-2xl" />
      </motion.button>

      {/* Animated Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-white w-4 sm:w-6" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && (
              <motion.div 
                layoutId="activeDot"
                className="w-full h-full bg-white rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Floating Discount Banner - Hidden on mobile */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg shadow-xl hidden sm:flex"
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-sm sm:text-lg font-bold">SALE</span>
          <span className="text-xs sm:text-sm">Up to 50% Off</span>
          <motion.div 
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-sm sm:text-xl"
          >
            🔥
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile-only floating badge */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 right-4 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-lg shadow-xl flex sm:hidden"
      >
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold">SALE</span>
          <motion.div 
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-xs"
          >
            🔥
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;