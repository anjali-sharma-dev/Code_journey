import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  Users, 
  FileText, 
  Settings, 
  Database, 
  BarChart2, 
  LogOut,
  Home
} from 'lucide-react';

/**
 * AdminLayout component
 * 
 * This component provides the layout for admin pages, including
 * the sidebar navigation and header.
 */
const AdminLayout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a1a1a] text-white">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">DSA Admin Panel</h1>
        </div>
        
        <nav className="mt-6">
          <ul>
            <li className="px-4 py-3 hover:bg-[#2a2a2a] transition-colors">
              <Link to="/admin/dashboard" className="flex items-center">
                <BarChart2 className="mr-3 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="px-4 py-3 hover:bg-[#2a2a2a] transition-colors">
              <Link to="/admin/users" className="flex items-center">
                <Users className="mr-3 h-5 w-5" />
                <span>Users</span>
              </Link>
            </li>
            <li className="px-4 py-3 hover:bg-[#2a2a2a] transition-colors">
              <Link to="/admin/topics" className="flex items-center">
                <Database className="mr-3 h-5 w-5" />
                <span>Topics</span>
              </Link>
            </li>
            <li className="px-4 py-3 hover:bg-[#2a2a2a] transition-colors">
              <Link to="/admin/questions" className="flex items-center">
                <FileText className="mr-3 h-5 w-5" />
                <span>Questions</span>
              </Link>
            </li>
            <li className="px-4 py-3 hover:bg-[#2a2a2a] transition-colors">
              <Link to="/admin/settings" className="flex items-center">
                <Settings className="mr-3 h-5 w-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
          
          <div className="absolute bottom-0 w-64 border-t border-gray-700">
            <ul>
              <li className="px-4 py-3 hover:bg-[#2a2a2a] transition-colors">
                <Link to="/" className="flex items-center">
                  <Home className="mr-3 h-5 w-5" />
                  <span>Back to Site</span>
                </Link>
              </li>
              <li 
                className="px-4 py-3 hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                onClick={handleLogout}
              >
                <div className="flex items-center">
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Logout</span>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-600">Admin User</span>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;