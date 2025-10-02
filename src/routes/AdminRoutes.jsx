import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminLayout from '../layouts/AdminLayout';


const AdminRoutes = () => {
  // Get authentication state from context
  const { user, loading, isAdmin } = useContext(AuthContext);
  
  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  // If user is not authenticated or not an admin, redirect to home
  if (!user || !isAdmin()) {
    return <Navigate to="/" replace />;
  }
  
  // If user is an admin, render the admin route
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminRoutes;