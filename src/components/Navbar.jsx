// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import {
  Compass,
  BookOpen,
  MessageSquare,
  Trophy,
  ShoppingCart,
  Quote,
  Menu,
  LogOut,
  Bird,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";

const navItems = [
  { name: "Home", path: "/", icon: Compass },
  { name: "Problem", path: "/problems", icon: Quote },
  { name: "Blog", path: "/blog", icon: BookOpen },
  { name: "Interview", path: "/interview", icon: MessageSquare },
  { name: "Contest", path: "/contest", icon: Trophy },
  { name: "Store", path: "/store", icon: ShoppingCart },
];

const Navbar = () => {
  const { openSignIn, signOut } = useClerk();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const { setAdminLogin } = useContext(AppContext);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
    setMobileOpen(false);
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "text-cyan-400 bg-gray-800"
        : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800"
    }`;

  const mobileLinkClasses = ({ isActive }) =>
    `flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "text-cyan-400 bg-gray-800"
        : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800"
    }`;

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3">
            <div className="h-9 w-9 bg-cyan-500 rounded flex items-center justify-center">
              <Bird className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-semibold">CodeJourney</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink key={item.name} to={item.path} className={linkClasses}>
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => openSignIn({ redirectUrl: "/" })}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-800 rounded-md transition"
                >
                  Login / Register
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-800 rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={mobileLinkClasses}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              ))}

              {!isSignedIn ? (
                <button
                  onClick={() => openSignIn({ redirectUrl: "/" })}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition"
                >
                  Login / Register
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-gray-800 transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
