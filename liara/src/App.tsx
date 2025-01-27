import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import CustomerLogin from "./components/CustomerLogin";
import SignUp from "./components/SignUp";
import HeroSection from "./components/Herosection";
import NewArrivals from "./components/NewArrivals";
import Women from "./components/Womens";
import Men from "./components/Mens";
import Kids from "./components/Kids";
import Sale from "./components/Sales";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import Product from "./components/Product";
import Addproduct from "./components/Addproduct";

const App: React.FC = () => {
  const location = useLocation();

  // Check if the current route is for AdminDashboard
  const isAdminRoute = location.pathname === "/AdminDashboard";
  const isProductRoute = location.pathname === "/Product";
  

  return (
    <div>
      {/* Always show the Header */}
      <Header />

      {/* Conditionally render Navbar and Footer */}
      {!isAdminRoute && <Navbar />}
      
      
      {location.pathname === "/" && <HeroSection />}

      <Routes>
        {/* Define all routes here */}
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Herosection" element={<HeroSection />} />
        <Route path="/NewArrivals" element={<NewArrivals />} />
        <Route path="/Womens" element={<Women />} />
        <Route path="/Mens" element={<Men />} />
        <Route path="/Kids" element={<Kids />} />
        <Route path="/Sales" element={<Sale />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Addproduct" element={<Addproduct />} />
      </Routes>

      {/* Show NewArrivals only on the Home page */}
      {!isAdminRoute && location.pathname === "/" && <NewArrivals />}

      {/* Show Footer only if not on AdminDashboard */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

// Wrap App in Router to provide routing context
const WrappedApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
