import React, { useState, useEffect } from "react";
import { Users, UserPlus, Edit, Trash2, Search } from "lucide-react";
import { users as mockUsers } from "../assets/user";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveUser = (user) => {
    if (selectedUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, ...user } : u))
      );
    } else {
      setUsers((prev) => [...prev, { ...user, id: Date.now().toString(), solvedQuestions: [] }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Search + Add User */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-100"
          />
        </div>
        <button
          className="bg-cyan-500 text-gray-100 px-4 py-2 rounded-lg flex items-center hover:bg-cyan-600 transition-colors"
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No users found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Solved Questions</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-gray-100">
                      {u.fullName.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{u.fullName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{u.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{u.solvedQuestions.length} solved</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-3">
                    <button onClick={() => { setSelectedUser(u); setIsModalOpen(true); }}>
                      <Edit className="h-5 w-5 text-indigo-500 hover:text-indigo-400" />
                    </button>
                    <button onClick={() => handleDeleteUser(u.id)}>
                      <Trash2 className="h-5 w-5 text-red-500 hover:text-red-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <UserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

const UserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.username) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-gray-100">
        <h2 className="text-xl font-bold mb-4">{user ? "Edit User" : "Add New User"}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 text-gray-100 rounded hover:bg-cyan-600"
            >
              {user ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUsers;
