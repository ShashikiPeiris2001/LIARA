// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Header from "./components/Header";
// import Navbar from "./components/NavBar";
// import CustomerLogin from "./components/CustomerLogin";
// import SignUp from "./components/SignUp";
// import HeroSection from "./components/Herosection";
// import NewArrivals from "./components/NewArrivals";
// import Women from "./components/Womens";
// import Men from "./components/Mens";
// import Kids from "./components/Kids";
// import Sale from "./components/Sales";
// import Footer from "./components/Footer";
// import AdminDashboard from "./components/AdminDashboard";
// import Product from "./components/Product";
// import Addproduct from "./components/Addproduct";
// import ResetPassword from "./components/ResetPassword";


// const App: React.FC = () => {
//   const location = useLocation();

//   // Check if the current route is for AdminDashboard
//   const isAdminPage = ["/AdminDashboard", "/Product"].includes(location.pathname);

//   return (
//     <div>
//       {/* Always show the Header */}
//       <Header />

//      {/* Conditionally render Navbar and Footer */}
//         {!isAdminPage && <Navbar />}
      
      
      
//       {location.pathname === "/" && <HeroSection />}

//       <Routes>
//         {/* Define all routes here */}
//         <Route path="/login" element={<CustomerLogin />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/ResetPassword" element={<ResetPassword/>} />
//         <Route path="/Herosection" element={<HeroSection />} />
//         <Route path="/NewArrivals" element={<NewArrivals />} />
//         <Route path="/Womens" element={<Women />} />
//         <Route path="/Mens" element={<Men />} />
//         <Route path="/Kids" element={<Kids />} />
//         <Route path="/Sales" element={<Sale />} />
//         <Route path="/AdminDashboard" element={<AdminDashboard />} />
//         <Route path="/Product" element={<Product />} />
//         <Route path="/Addproduct" element={<Addproduct />} />
//       </Routes>

//       {/* Show NewArrivals only on the Home page */}
//       {!isAdminPage && location.pathname === "/" && <NewArrivals />}

//       {/* Show Footer only if not on AdminDashboard */}
//       {!isAdminPage && <Footer />}
     
//     </div>
//   );
// };

// // Wrap App in Router to provide routing context
// const WrappedApp: React.FC = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default WrappedApp;


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
import ResetPassword from "./components/ResetPassword";
import Category from "./components/Category";
import AddCategory from "./components/Addcategory";
import ShopNow from "./components/ShopNow";

const App: React.FC = () => {
  const location = useLocation();

  // Check if the current route is for AdminDashboard or Product (using startsWith for Product to cover nested routes)
  const isAdminPage = ["/AdminDashboard"].includes(location.pathname) || location.pathname.startsWith("/product") || location.pathname.startsWith("/Addproduct") || location.pathname.startsWith("/Category") || location.pathname.startsWith("/Addcategory");
  

  return (
    <div>
      {/* Always show the Header */}
      <Header />

      {/* Conditionally render Navbar and Footer */}
      {!isAdminPage && <Navbar />}

      {/* Show HeroSection only on the Home page */}
      {location.pathname === "/" && <HeroSection />}

      <Routes>
        {/* Define all routes here */}
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Herosection" element={<HeroSection />} />
        <Route path="/NewArrivals" element={<NewArrivals />} />
        <Route path="/Womens" element={<Women />} />
        <Route path="/Mens" element={<Men />} />
        <Route path="/Kids" element={<Kids />} />
        <Route path="/Sales" element={<Sale />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Addproduct" element={<Addproduct />} />
        <Route path="/Addcategory" element={<AddCategory />} />
        <Route path="/ShopNow" element={<ShopNow />} />
        
      </Routes>

      {/* Show NewArrivals only on the Home page */}
      {!isAdminPage && location.pathname === "/" && <NewArrivals />}

      {/* Show Footer only if not on AdminDashboard or Product page */}
      {!isAdminPage && <Footer />}
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
