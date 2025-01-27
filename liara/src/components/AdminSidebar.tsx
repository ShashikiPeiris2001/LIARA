import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="bg-gray-200 w-64 min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Admin</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="text-gray-700 hover:text-black">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/product" className="text-gray-700 hover:text-black">
              Products
            </Link>
          </li>
          <li>
            <Link to="/categories" className="text-gray-700 hover:text-black">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/orders" className="text-gray-700 hover:text-black">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/customers" className="text-gray-700 hover:text-black">
              Customers
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default AdminDashboard;
