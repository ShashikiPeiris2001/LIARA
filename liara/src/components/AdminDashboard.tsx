import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import AdminSidebar from './AdminSidebar';
import { FiPackage, FiShoppingCart, FiUsers, FiLoader, FiAlertCircle } from 'react-icons/fi';

interface Product {
  id: number;
  name: string;
  price: number;
  categoryName: string;
  Stock: number;
  Status: string;
}

interface Order {
  id: number;
  customerName: string;
  mobileNumber: string;
  total: number;
  orderDate: string;
  status: "Pending" | "Processing" | "Delivered";
}

interface Customer {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  color,
  textColor,
}) => (
  <div className={`p-4 rounded-lg shadow-md ${color} transition-all hover:shadow-lg`}>
    <div className="text-2xl mb-2">{icon}</div>
    <div className={`text-sm font-medium ${textColor}`}>{title}</div>
    <div className={`text-xl font-bold ${textColor}`}>{value}</div>
  </div>
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#A4DE6C', '#D0ED57'];

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [productsRes, ordersRes, customersRes] = await Promise.all([
          axios.get('http://localhost:5005/api/Product/GetAllProducts'),
          axios.get('http://localhost:5005/api/Checkout/GetAllOrders'),
          axios.get('http://localhost:5005/api/Users'),
        ]);

        const formattedProducts = productsRes.data.map((product: any) => ({
          id: product.productID,
          name: product.name,
          price: product.price,
          categoryName: product.categoryName || 'Uncategorized',
          Stock: product.stock || 0,
          Status: product.status || 'Active',
        }));

        const formattedOrders = ordersRes.data.map((order: any) => ({
          id: order.orderID,
          customerName: order.customerName || 'Unknown',
          mobileNumber: order.mobileNumber || 'N/A',
          total: order.total || 0,
          orderDate: order.orderDate || new Date().toISOString(),
          status: order.status || 'Pending',
        }));

        setProducts(formattedProducts);
        setOrders(formattedOrders);
        setCustomers(customersRes.data || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to fetch dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up polling or refresh interval if needed
    const intervalId = setInterval(fetchData, 300000); // Refresh every 5 minutes
    
    return () => clearInterval(intervalId);
  }, []);

  const { orderStatusData, categoryData, orderTrendData, stockByCategory } = useMemo(() => {
    const orderStatusData = [
      { name: 'Pending', value: orders.filter(o => o.status === 'Pending').length },
      { name: 'Processing', value: orders.filter(o => o.status === 'Processing').length },
      { name: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length }
    ];

    const categories = Array.from(new Set(products.map(p => p.categoryName)));
    const categoryData = categories.map(category => ({
      name: category,
      value: products.filter(p => p.categoryName === category).length
    }));

    const orderTrendData = orders.reduce((acc: { date: string; orders: number }[], order) => {
      const date = order.orderDate.split('T')[0];
      const existing = acc.find(item => item.date === date);
      if (existing) {
        existing.orders++;
      } else {
        acc.push({ date, orders: 1 });
      }
      return acc;
    }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const stockByCategory = categories.map(category => {
      const categoryProducts = products.filter(p => p.categoryName === category);
      return {
        category,
        inStock: categoryProducts.filter(p => p.Stock > 0).length,
        outOfStock: categoryProducts.filter(p => p.Stock <= 0).length
      };
    });

    return { orderStatusData, categoryData, orderTrendData, stockByCategory };
  }, [products, orders]);

  const recentOrders = useMemo(() => [...orders]
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, 10), [orders]);

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <div className="w-64 bg-white shadow-md fixed h-full z-10">
          <AdminSidebar />
        </div>
        <div className="ml-64 flex-1 p-6 bg-gray-100 overflow-y-auto flex items-center justify-center">
          <div className="flex flex-col items-center">
            <FiLoader className="animate-spin text-4xl text-blue-500 mb-4" />
            <p className="text-lg">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen overflow-hidden">
        <div className="w-64 bg-white shadow-md fixed h-full z-10">
          <AdminSidebar />
        </div>
        <div className="ml-64 flex-1 p-6 bg-gray-100 overflow-y-auto flex items-center justify-center">
          <div className="flex flex-col items-center max-w-md text-center">
            <FiAlertCircle className="text-4xl text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 bg-white shadow-md fixed h-full z-10">
        <AdminSidebar />
      </div>

      <div className="ml-64 flex-1 p-4 md:p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Admin Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <DashboardCard 
            title="Total Products" 
            value={products.length} 
            icon={<FiPackage className="inline-block" />} 
            color="bg-blue-100" 
            textColor="text-blue-600" 
          />
          <DashboardCard 
            title="Total Orders" 
            value={orders.length} 
            icon={<FiShoppingCart className="inline-block" />} 
            color="bg-green-100" 
            textColor="text-green-600" 
          />
          <DashboardCard 
            title="Total Customers" 
            value={customers.length} 
            icon={<FiUsers className="inline-block" />} 
            color="bg-yellow-100" 
            textColor="text-yellow-600" 
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Order Status */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-3">Order Status</h2>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderStatusData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Orders" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-3">Product Categories</h2>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Trends */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-3">Order Trends</h2>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#00C49F" 
                    name="Orders" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stock Status */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-3">Stock Status by Category</h2>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockByCategory} stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inStock" stackId="a" fill="#82ca9d" name="In Stock" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="outOfStock" stackId="a" fill="#ff8042" name="Out of Stock" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-lg md:text-xl font-semibold mb-3">Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="text-gray-500">No orders available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.mobileNumber}</td>
                      {/* <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Rs.{order.total.toFixed(2)}</td> */}
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        Rs.{order.total.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

