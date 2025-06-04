import React from "react";
import { FaLeaf, FaAward, FaShippingFast, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";

const COLOR_PALETTE = {
  primary: "#6C63FF",
  primaryHover: "#5A52E0",
  secondary: "#FF6584",
  background: "#F9F9FF",
  textDark: "#2D3748",
  textMedium: "#4A5568",
  textLight: "#718096",
  white: "#FFFFFF",
  lightGray: "#EDF2F7",
  success: "#48BB78",
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <section className="pt-32 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-[#6C63FF]">Story</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Premium quality fashion for the modern family
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-[#6C63FF] rounded-full"></div>
          </div>
        </motion.div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: COLOR_PALETTE.textDark }}
            >
              Who We Are
            </h2>
            <p
              className="text-lg mb-6"
              style={{ color: COLOR_PALETTE.textMedium }}
            >
              Founded in 2015, we started as a small boutique with a passion for
              bringing high-quality, stylish clothing to families. Today, we've
              grown into a trusted name in children's fashion, known for our
              attention to detail and commitment to comfort.
            </p>
            <p className="text-lg" style={{ color: COLOR_PALETTE.textMedium }}>
              Our collections are carefully curated to blend timeless designs
              with modern trends, ensuring your little ones look their best
              while feeling comfortable in every outfit.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src="https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Our team"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Mission Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl p-8 md:p-12 shadow-sm mb-20 border-t-4 border-[#6C63FF]"
        >
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: COLOR_PALETTE.textDark }}
          >
            Our Mission
          </h2>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-1 bg-[#6C63FF] rounded-full"></div>
          </div>
          <p
            className="text-xl text-center max-w-4xl mx-auto"
            style={{ color: COLOR_PALETTE.textMedium }}
          >
            "To provide families with premium quality clothing that combines
            style, comfort, and durability at accessible prices, while
            maintaining ethical and sustainable practices throughout our supply
            chain."
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <h2
            className="text-3xl font-bold mb-12 text-center"
            style={{ color: COLOR_PALETTE.textDark }}
          >
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <FaLeaf
                    className="text-4xl mb-4"
                    style={{ color: COLOR_PALETTE.primary }}
                  />
                ),
                title: "Sustainability",
                description:
                  "We prioritize eco-friendly materials and ethical manufacturing processes.",
              },
              {
                icon: (
                  <FaAward
                    className="text-4xl mb-4"
                    style={{ color: COLOR_PALETTE.primary }}
                  />
                ),
                title: "Quality",
                description:
                  "Every piece is crafted with attention to detail and built to last.",
              },
              {
                icon: (
                  <FaShippingFast
                    className="text-4xl mb-4"
                    style={{ color: COLOR_PALETTE.primary }}
                  />
                ),
                title: "Fast Shipping",
                description:
                  "We deliver quickly so your little ones don't have to wait.",
              },
              {
                icon: (
                  <FaHeadset
                    className="text-4xl mb-4"
                    style={{ color: COLOR_PALETTE.primary }}
                  />
                ),
                title: "Customer Care",
                description:
                  "Our team is always here to help with any questions or concerns.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-b-4 border-transparent hover:border-[#6C63FF]"
              >
                <div className="text-center">
                  {value.icon}
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: COLOR_PALETTE.textDark }}
                  >
                    {value.title}
                  </h3>
                  <p style={{ color: COLOR_PALETTE.textMedium }}>
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h2
            className="text-3xl font-bold mb-12 text-center"
            style={{ color: COLOR_PALETTE.textDark }}
          >
            Meet The Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://randomuser.me/api/portraits/women/43.jpg",
              },
              {
                name: "Michael Chen",
                role: "Head Designer",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Emma Rodriguez",
                role: "Customer Experience",
                image: "https://randomuser.me/api/portraits/women/65.jpg",
              },
              {
                name: "David Wilson",
                role: "Operations Manager",
                image: "https://randomuser.me/api/portraits/men/76.jpg",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden shadow-md border-4 border-white ring-2 ring-[#6C63FF]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: COLOR_PALETTE.textDark }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-gray-600"
                  style={{ color: COLOR_PALETTE.textMedium }}
                >
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-20 bg-gradient-to-r from-[#6C63FF] to-[#FF6584] rounded-xl p-8 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Stay updated with our latest collections and exclusive offers.
          </p>
          <button className="bg-white text-[#6C63FF] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md">
            Subscribe Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;