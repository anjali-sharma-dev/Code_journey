import React from "react";
import {
  Users,
  FileText,
  Database,
  BarChart2,
  LogOut,
  Home,
  Settings as SettingsIcon,
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", icon: BarChart2, path: "admin" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Topics", icon: Database, path: "/admin/topics" },
  { name: "Questions", icon: FileText, path: "/admin/questions" },
  { name: "Settings", icon: SettingsIcon, path: "/admin/setting" },
];

const Sidebar = ({ isOpen, onNavigate, onLogout, isActive }) => {
  return (
    <aside
      className=""
    >
      <nav className="flex-1 flex flex-col pt-6">
        <ul>
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.name}
              icon={item.icon}
              name={item.name}
              path={item.path}
              active={isActive(item.path)}
              onClick={() => onNavigate(item.path)}
            />
          ))}
        </ul>
        <div className="mt-auto border-t border-gray-700 pb-2 pt-2">
          <ul>
            <SidebarItem
              icon={Home}
              name="Back to Site"
              onClick={() => onNavigate("/")}
            />
            <SidebarItem icon={LogOut} name="Logout" onClick={onLogout} />
          </ul>
        </div>
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon: Icon, name, onClick, active }) => (
  <li>
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-2 mb-1 rounded-lg transition-colors ${
        active ? "bg-cyan-400 text-gray-900" : "hover:bg-gray-700 text-gray-100"
      }`}
    >
      <Icon
        className={`mr-3 h-5 w-5 ${active ? "text-gray-900" : "text-cyan-400"}`}
      />
      <span>{name}</span>
    </button>
  </li>
);

export default Sidebar;
