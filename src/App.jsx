import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout"; 

// // Route protection components
import PrivateRoutes from "./routes/PrivateRoutes";
import AdminRoutes from "./routes/AdminRoutes";

// // Public pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register"; 
import Blog from "./pages/Blog";

// // Protected pages
import Problem from "./pages/Problem";
import Contest from "./pages/Contest";
import Interview from "./pages/Interview";
import Store from "./pages/Store";

// // Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users"; 
import AdminTopics from "./pages/admin/Topics"; 
import AdminQuestions from "./pages/admin/Questions";
import AdminSettings from "./pages/admin/Settings";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route> 
        
        {/* Protected routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/problem" element={<Problem />} />
          <Route path="/contest" element={<Contest />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/store" element={<Store />} /> 
        </Route>
         
        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoutes />}> 
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="topics" element={<AdminTopics />} />
          <Route path="questions" element={<AdminQuestions />} />
          <Route path="settings" element={<AdminSettings />} /> 
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;