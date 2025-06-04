import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiShoppingBag, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Add your logout logic here
    // For example, clear authentication tokens, user data, etc.
    console.log("Logging out...");
    navigate("/login"); // Redirect to login page after logout
  };
  
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-10">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/Admindashboard"
              className={`flex items-center p-3 rounded-lg transition-colors ${
                location.pathname === "/Admindashboard"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiHome className="mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Product"
              className={`flex items-center p-3 rounded-lg transition-colors ${
                location.pathname === "/Product"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiShoppingBag className="mr-3" />
              <span>Product</span>
            </Link>
          </li>
          <li>
            <Link
              to="/UserManagement"
              className={`flex items-center p-3 rounded-lg transition-colors ${
                location.pathname === "/UserManagement"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiUsers className="mr-3" />
              <span>Users</span>
            </Link>
          </li> 
          <li>
            <Link
              to="/Orders"
              className={`flex items-center p-3 rounded-lg transition-colors ${
                location.pathname === "/Orders"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiSettings className="mr-3" />
              <span>Order</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Category"
              className={`flex items-center p-3 rounded-lg transition-colors ${
                location.pathname === "/Category"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FiSettings className="mr-3" />
              <span>Category</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Logout Button */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <FiLogOut className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;