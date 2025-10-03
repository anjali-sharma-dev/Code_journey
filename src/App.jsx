import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
import { useUser, SignIn } from "@clerk/clerk-react";

// User Pages
import Layout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Problems from "./pages/Problem";
import Blog from "./pages/Blog";
import Interview from "./pages/Interview";
import Contest from "./pages/Contest";
import Store from "./pages/Store";
import Subject from "./pages/Subject";
import TopicWiseQuestion from "./pages/TopicWiseQuestion";
import CompanyWiseQuestion from "./pages/CompanyWiseQuestion";

// Admin Pages
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUser";
import Setting from "./admin/Settings";
import Topics from "./admin/Topics";
import Questions from "./admin/Questions";
import Profile from "./admin/Profile";
import AdminLogin from "./admin/AdminLogin";

// Context
import { AppContext } from "./context/AppContext";

const App = () => {
  const { isSignedIn, isLoaded } = useUser(); // Clerk
  const { adminLogin } = useContext(AppContext);

  // Wait for Clerk to load
  if (!isLoaded) return null;

  return (
    <Routes>
      {/* Home is public */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Other user pages - protected */}
      <Route
        element={isSignedIn ? <Layout /> :(
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-4">
          <SignIn />
        </div>
      </div>
    )
}
      >
        <Route path="/blog" element={<Blog />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/store" element={<Store />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/topic/:name" element={<TopicWiseQuestion />} />
        <Route path="/problems/company/:name" element={<CompanyWiseQuestion />} />
        <Route path="/subjects" element={<Subject />} />
      </Route>

      {/* Admin login */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Admin routes */}
      <Route path="/admin/*" element={adminLogin ? <AdminLayout /> : <Navigate to="/admin-login" replace />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="topics" element={<Topics />} />
        <Route path="questions" element={<Questions />} />
        <Route path="profile" element={<Profile />} />
        <Route path="setting" element={<Setting />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
