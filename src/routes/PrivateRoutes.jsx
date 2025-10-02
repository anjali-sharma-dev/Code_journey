import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';


const PrivateRoutes = () => {
  // Get authentication state from context
  const { user, loading } = useContext(AuthContext);
  
  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated, render the protected route
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default PrivateRoutes;