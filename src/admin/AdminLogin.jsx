import React, { useState, useContext } from "react";
import { Lock, User, Mail, X } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true); // controls modal visibility
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAdminLogin } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`Logging in as ${username}`);
      setAdminLogin(true);
      navigate(`/admin`);
      setShowModal(false);
    } else {
      alert(`Signing up as ${username} with email ${email}`);
      setAdminLogin(true);
      setShowModal(false);
    }
  };

  if (!showModal) return null; // hide modal if closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>

      {/* Modal Card */}
      <div className="relative bg-gray-900 border border-cyan-700 rounded-xl shadow-2xl w-full max-w-md p-8 z-10">
        {/* Close Button */}
        <button
          onClick={() => {
            setShowModal(false)
            navigate(`/`)
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
          
        </button>

        <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
          {isLogin ? "Admin Login" : "Admin Signup"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-cyan-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

          {/* Email - Signup only */}
          {!isLogin && (
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-cyan-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-cyan-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white px-4 py-2 rounded-md font-medium hover:bg-cyan-500 transition flex items-center justify-center gap-2"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-cyan-400 hover:underline ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
