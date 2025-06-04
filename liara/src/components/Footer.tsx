import React from "react";
import { motion } from "framer-motion";
import { 
  FaFacebook, 
  FaInstagram, 
  FaTiktok,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {/* Contact Information */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h4 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            <span>Contact Us</span>
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <FaPhone className="mt-1 text-gray-400 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm sm:text-base">General Hotline</p>
                <p className="text-gray-300 text-sm sm:text-base">(011) 286 7511</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FaPhone className="mt-1 text-gray-400 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm sm:text-base">Order Updates</p>
                <p className="text-gray-300 text-sm sm:text-base">077 3446447</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-gray-400 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm sm:text-base">General Email</p>
                <p className="text-gray-300 text-sm sm:text-base">info@liara.lk</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-gray-400 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm sm:text-base">Order Email</p>
                <p className="text-gray-300 text-sm sm:text-base">online@liara.lk</p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Store Hours */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h4 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <FaClock className="text-primary" />
            <span>Store Hours</span>
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="w-16 sm:w-20 text-gray-300 text-sm sm:text-base">Mon-Fri</span>
              <span className="text-sm sm:text-base">9:00AM - 6:00PM</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-16 sm:w-20 text-gray-300 text-sm sm:text-base">Saturday</span>
              <span className="text-sm sm:text-base">9:00AM - 2:00PM</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-16 sm:w-20 text-gray-300 text-sm sm:text-base">Sunday</span>
              <span className="text-gray-400 text-sm sm:text-base">Closed</span>
            </li>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h4 className="text-lg sm:text-xl font-bold">Newsletter</h4>
          <p className="text-gray-300 text-sm sm:text-base">
            Subscribe to get updates on new arrivals and special offers
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-l-lg focus:outline-none text-gray-800 w-full text-sm sm:text-base"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-primary text-white px-3 sm:px-4 rounded-r-lg flex items-center"
            >
              <FiSend size={18} />
            </motion.button>
          </form>
          <div className="pt-4">
            <h5 className="font-medium mb-3 text-sm sm:text-base">Payment Methods</h5>
            <div className="flex gap-2 flex-wrap">
              {['Visa', 'Mastercard', 'PayPal', 'COD'].map((method) => (
                <span 
                  key={method}
                  className="bg-gray-700 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h4 className="text-lg sm:text-xl font-bold">Follow Us</h4>
          <div className="flex gap-3 sm:gap-4">
            {[
              { icon: <FaFacebook size={20} className="sm:w-6 sm:h-6" />, name: 'Facebook' },
              { icon: <FaInstagram size={20} className="sm:w-6 sm:h-6" />, name: 'Instagram' },
              { icon: <FaTiktok size={20} className="sm:w-6 sm:h-6" />, name: 'TikTok' }
            ].map((social) => (
              <motion.a
                key={social.name}
                href="#"
                whileHover={{ y: -5 }}
                className="bg-gray-700 p-2 sm:p-3 rounded-full hover:bg-primary transition-colors duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          
          <div className="pt-4">
            <h5 className="font-medium mb-3 text-sm sm:text-base">Quick Links</h5>
            <ul className="space-y-2">
              {['About Us', 'Shipping Policy', 'Return Policy', 'FAQs'].map((link) => (
                <motion.li 
                  key={link}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer text-sm sm:text-base"
                >
                  <FaArrowRight className="text-xs text-primary flex-shrink-0" />
                  <span>{link}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto mt-8 sm:mt-12 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm sm:text-base"
      >
        <p>© {new Date().getFullYear()} LIARA Fashion. All rights reserved.</p>
      </motion.div>
    </footer>
  );
};

export default Footer;