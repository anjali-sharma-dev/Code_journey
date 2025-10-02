import React, { useState } from "react";
import {
  Code,
  Compass,
  BookOpen,
  MessageSquare,
  Trophy,
  User,
  Bell,
  Menu,
  Quote,
  LogOut,
  Settings,
  ShoppingCart
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const navItems = [
  { name: "Home", path: "/", icon: Compass },
  { name: "Problem", path: "/problem", icon: Quote },
  { name: "Blog", path: "/blog", icon: BookOpen },
  { name: "Interview", path: "/interview", icon: MessageSquare },
  { name: "Contest", path: "/contest", icon: Trophy },
  { name: "Store", path: "/store", icon: ShoppingCart },
];

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b border-green-300 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-9 w-9 bg-[#00b8a3] rounded flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#00b8a3]">ALGO</span>
              <span className="text-sm text-gray-500 border-t-1 border-gray-400">Journey</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-[#00b8a3] hover:bg-[#e6fff9] transition"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button className="p-2 text-[#00b8a3] hover:bg-[#e6fff9] rounded-md transition">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="h-8 w-8 bg-[#00b8a3] rounded-full flex items-center justify-center"
                  >
                    <User className="h-4 w-4 text-white" />
                  </button>
                  
                  {/* User dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                      </div>
                      
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      
                      {user?.isAdmin && (
                        <Link 
                          to="/admin/dashboard" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-[#00b8a3] hover:bg-[#e6fff9] rounded-md transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#00b8a3] hover:bg-[#00a693] rounded-md transition"
                >
                  Register
                </Link>
              </div>
            )}
            
            <button
              className="md:hidden p-2 text-[#00b8a3] hover:bg-[#e6fff9] rounded-md"
              onClick={() => {
                const menu = document.getElementById("mobile-nav");
                menu.classList.toggle("hidden");
              }}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div id="mobile-nav" className="md:hidden hidden bg-[#e6fff9] border-t border-green-300">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-[#00b8a3] hover:bg-white transition"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {!user ? (
              <div className="flex flex-col space-y-2 pt-2 border-t border-green-200">
                <Link 
                  to="/login"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-[#00b8a3] hover:bg-white transition"
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-white bg-[#00b8a3] hover:bg-[#00a693] transition"
                >
                  <User className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-green-200">
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-white transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;