import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard: React.FC = () => {
  const orders = [
    { id: 1001, customerName: "Shashiki", mobileNumber: "0712345678", status: "Pending" },
    { id: 1002, customerName: "Saranga", mobileNumber: "0768776543", status: "Pending" },
    { id: 1003, customerName: "Peiris", mobileNumber: "0709876543", status: "Delivered" },
    { id: 1004, customerName: "Saheli", mobileNumber: "0918756876", status: "Pending" },
    { id: 1005, customerName: "Yeran", mobileNumber: "0713254876", status: "Delivered" },
  ];

  return (
    <div className="flex">
      <AdminSidebar/>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        

        <div className="p-6">
          {/* Dashboard Summary */}
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-red-100 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-bold">Orders</h3>
              <p className="text-2xl">10</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-bold">Products</h3>
              <p className="text-2xl">45</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-bold">Customers</h3>
              <p className="text-2xl">20</p>
            </div>
            <div className="p-4 bg-green-200 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-bold">Category</h3>
              <p className="text-2xl">5</p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Orders</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">Order ID</th>
                  <th className="px-4 py-2 border">Customer Name</th>
                  <th className="px-4 py-2 border">Mobile Number</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">View</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="text-gray-700">
                    <td className="px-4 py-2 border">{order.id}</td>
                    <td className="px-4 py-2 border">{order.customerName}</td>
                    <td className="px-4 py-2 border">{order.mobileNumber}</td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-2 py-1 rounded ${
                          order.status === "Pending"
                            ? "bg-orange-200 text-orange-700"
                            : "bg-green-200 text-green-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button className="text-blue-500 hover:text-blue-700">
                        🔍
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;