import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<
    {
      id: number;
      username: string;
      email: string;
      role: string;
    }[]
  >([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editedRoles, setEditedRoles] = useState<{ [key: number]: string }>({});

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/Users");
      const formattedUsers = response.data.map((user: any) => ({
        id: user.userID,
        username: user.username,
        email: user.email,
        role: user.role,
      }));
      setUsers(formattedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again later.");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5005/api/Users/DeleteUser/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
        setSuccess("User deleted successfully.");
        autoDismissMessages();
      } catch (error) {
        console.error("Error deleting user:", error);
        setError("Failed to delete the user. Please try again.");
        autoDismissMessages();
      }
    }
  };

  const handleSelectChange = (userId: number, newRole: string) => {
    setEditedRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleSaveRole = async (userId: number) => {
    const newRole = editedRoles[userId];
    if (!newRole) return;

    try {
      await axios.put(
        `http://localhost:5005/api/Users/UpdateRole/${userId}`,
        JSON.stringify(newRole),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

      setSuccess("User role updated successfully.");
      setEditedRoles((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });

      autoDismissMessages();
    } catch (err) {
      console.error("Error updating role:", err);
      setError("Failed to update user role.");
      autoDismissMessages();
    }
  };

  const autoDismissMessages = () => {
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toString().includes(searchTerm)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
            <p className="text-gray-600">Manage all registered users</p>
          </div>
        </div>

        {/* Alerts */}
        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
            {error}
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by user ID, username, or email..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono">{user.id}</td>
                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <select
                          className="border border-gray-300 rounded px-2 py-1"
                          value={editedRoles[user.id] ?? user.role}
                          onChange={(e) => handleSelectChange(user.id, e.target.value)}
                        >
                          <option value="admin">Admin</option>
                          <option value="customer">Customer</option>
                        </select>
                        <button
                          onClick={() => handleSaveRole(user.id)}
                          disabled={
                            !editedRoles[user.id] || editedRoles[user.id] === user.role
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-500 disabled:opacity-50"
                        >
                          Save
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      {searchTerm ? "No users match your search." : "No users found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;




