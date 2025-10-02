import React, { useState, useEffect } from "react";
import { Users, UserPlus, Edit, Trash2, Search } from "lucide-react";
import useAuth from "../../hooks/useAuth";

/**
 * AdminUsers component
 * 
 * This component displays and manages users in the admin panel.
 */
const AdminUsers = () => {
  // State for users data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get auth context
  const { user } = useAuth();
  
  // Mock user data for demonstration
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "admin",
          status: "active",
          joinedDate: "2023-01-15",
          lastActive: "2023-06-20"
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "user",
          status: "active",
          joinedDate: "2023-02-10",
          lastActive: "2023-06-18"
        },
        {
          id: 3,
          name: "Mike Johnson",
          email: "mike@example.com",
          role: "user",
          status: "inactive",
          joinedDate: "2023-03-05",
          lastActive: "2023-05-30"
        },
        {
          id: 4,
          name: "Sarah Williams",
          email: "sarah@example.com",
          role: "user",
          status: "active",
          joinedDate: "2023-04-20",
          lastActive: "2023-06-19"
        },
        {
          id: 5,
          name: "David Brown",
          email: "david@example.com",
          role: "user",
          status: "active",
          joinedDate: "2023-05-12",
          lastActive: "2023-06-15"
        }
      ];
      
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle user edit
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  
  // Handle user delete
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // In a real app, you would call an API to delete the user
      setUsers(users.filter(user => user.id !== userId));
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>
      
      {/* Search and Add User */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
          />
        </div>
        
        <button 
          className="bg-[#00b8a3] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#00a693] transition-colors"
          onClick={() => {
            setSelectedUser(null);
            setIsModalOpen(true);
          }}
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>
      
      {/* Users Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00b8a3]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#00b8a3] flex items-center justify-center text-white">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* User Modal - In a real app, you would implement this modal for adding/editing users */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedUser ? 'Edit User' : 'Add New User'}
            </h2>
            <form className="space-y-4">
              {/* Form fields would go here */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                  defaultValue={selectedUser?.name || ''}
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#00b8a3] text-white rounded-md hover:bg-[#00a693]"
                  onClick={() => setIsModalOpen(false)}
                >
                  {selectedUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;