import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import HeroSection from "./components/Herosection";
import NewArrivals from "./components/NewArrivals";
import Women from "./components/Womens";
import Men from "./components/Mens";
import Kids from "./components/Kids";
import Sale from "./components/Sales";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <Header />
      <Navbar />

      <Routes>
        {/* Define all routes here */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/category/womens" element={<Women />} />
        <Route path="/category/Mens" element={<Men />} />
        <Route path="/category/Kids" element={<Kids />} />
        <Route path="/Sales" element={<Sale />} />
      </Routes>
       {/* Conditionally render New Arrivals only on the Home page */}
      {location.pathname === "/" && <NewArrivals />}
      <Footer />
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