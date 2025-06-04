import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoSearchOutline, 
  IoSearchSharp,
  IoCartOutline,
  IoPersonOutline,
  IoMenuOutline,
  IoCloseOutline
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

// Mock product data - in a real app, this would come from an API or state management
const mockProducts = [
  { id: 1, name: "Summer Dress", category: "Women", slug: "summer-dress" },
  { id: 2, name: "Denim Jacket", category: "Men", slug: "denim-jacket" },
  { id: 3, name: "Leather Bag", category: "Accessories", slug: "leather-bag" },
  { id: 4, name: "Running Shoes", category: "Men", slug: "running-shoes" },
  { id: 5, name: "Silk Scarf", category: "Accessories", slug: "silk-scarf" },
];

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([]);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle search input changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      navigate(`/products/${searchResults[0].slug}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <IoCloseOutline className="text-2xl" />
            ) : (
              <IoMenuOutline className="text-2xl" />
            )}
          </button>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 lg:flex-none"
          >
            <Link to="/" className="flex items-center">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="font-serif text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-pink-300 bg-clip-text text-transparent"
              >
                LIARA
              </motion.span>
            </Link>
          </motion.div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex space-x-8 mx-8">
            {['New Arrivals', 'Women', 'Men', 'Accessories', 'Sale'].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link 
                  to={`/${item.toLowerCase().replace(' ', '-')}`} 
                  className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  {item}
                  {item === 'New Arrivals' && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-1 rounded-full"
                    >
                      New!
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              {isSearchOpen ? (
                <IoSearchSharp className="text-xl text-indigo-600" />
              ) : (
                <IoSearchOutline className="text-xl" />
              )}
            </motion.button>

            {/* Cart with badge */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Link to="/cart" aria-label="Shopping cart">
                <IoCartOutline className="text-xl" />
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full"
                >
                  3
                </motion.span>
              </Link>
            </motion.div>

            {/* Account */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Link to="/login" aria-label="Account">
                <IoPersonOutline className="hover:text-gray-500 transition" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Search Bar - Animated */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    autoFocus
                  />
                  <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  
                  {/* Search results dropdown */}
                  {searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.slug}`}
                          className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                            setSearchResults([]);
                          }}
                        >
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* No results message */}
                  {searchQuery && searchResults.length === 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-gray-500">
                      No products found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu - Animated */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <nav className="flex flex-col space-y-4 py-4 border-t border-gray-200">
                {['New Arrivals', 'Women', 'Men', 'Accessories', 'Sale'].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link 
                      to={`/${item.toLowerCase().replace(' ', '-')}`} 
                      className="block py-2 font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                      onClick={toggleMenu}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;