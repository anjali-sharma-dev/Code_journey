// src/admin/AdminProfile.jsx
import React, { useState } from "react";
import { User, Mail, Lock, Camera, X } from "lucide-react";

const AdminProfile = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Anjali Sharma");
  const [email, setEmail] = useState("anjali.admin@example.com");
  const [password, setPassword] = useState("********");
  const [avatar, setAvatar] = useState(
    "https://ui-avatars.com/api/?name=Anjali+Sharma&background=0D8ABC&color=fff"
  );

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    alert("Profile updated successfully ✅");
  };

  const handleFileChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="max-w-3xl mx-auto relative">
      {/* Profile Card */}
      <div className="bg-gray-900 border border-cyan-700 rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-6">
          <img
            src={avatar}
            alt="Admin Avatar"
            className="w-24 h-24 rounded-full border-2 border-cyan-400"
          />
          <div>
            <h2 className="text-2xl font-bold text-cyan-400">{name}</h2>
            <p className="text-gray-300 flex items-center">
              <User className="h-4 w-4 mr-2 text-cyan-400" />
              Super Admin
            </p>
            <p className="text-gray-400 text-sm">Joined: Jan 2025</p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="ml-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center"
          >
            <Camera className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-900 border border-cyan-700 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setEditing(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-cyan-400 mb-4 text-center">
              Edit Profile
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Avatar */}
              <div className="flex justify-center mb-4 relative">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-cyan-600 object-cover"
                />
                <label className="absolute bottom-0 right-0 bg-cyan-600 p-2 rounded-full cursor-pointer hover:bg-cyan-500 transition">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-cyan-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-cyan-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-cyan-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-cyan-600 w-full py-2 rounded-md text-white font-medium hover:bg-cyan-500 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
