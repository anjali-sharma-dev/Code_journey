import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Users,
  FileText,
  Database,
  BarChart2,
  LogOut,
  Home,
  Settings,
  User,
} from "lucide-react";
import { AppContext } from "../context/AppContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { setAdminLogin } = useContext(AppContext);

  const handleLogout = () => {
    setAdminLogin(false);
    navigate("/");
  };

  // ✅ Sidebar menu items
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: BarChart2 },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Topics", path: "/admin/topics", icon: Database },
    { name: "Questions", path: "/admin/questions", icon: FileText },
    { name: "Profile", path: "/admin/profile", icon: User },
    { name: "Settings", path: "/admin/setting", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-gray-100 relative">
        <div className="p-4 border-b border-cyan-700">
          <h1 className="text-xl font-bold text-cyan-400">DSA Admin Panel</h1>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className="flex items-center px-4 py-3 hover:bg-gray-800 transition cursor-pointer"
            >
              <item.icon className="mr-3 h-5 w-5 text-cyan-400" />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>

        {/* Bottom links */}
        <div className="absolute bottom-0 w-64 border-t border-cyan-700">
          <div
            onClick={() => navigate("/")}
            className="flex items-center px-4 py-3 hover:bg-gray-800 transition cursor-pointer"
          >
            <Home className="mr-3 h-5 w-5 text-cyan-400" />
            <span>Back to Site</span>
          </div>
          <div
            onClick={handleLogout}
            className="flex items-center px-4 py-3 hover:bg-gray-800 transition cursor-pointer"
          >
            <LogOut className="mr-3 h-5 w-5 text-cyan-400" />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gray-950">
      
        <main className="p-6 text-gray-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
