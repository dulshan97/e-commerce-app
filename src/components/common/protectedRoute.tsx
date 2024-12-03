import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Ensure this import is from 'react-router-dom'
import { RouteName } from '../../routes/RouteName';

const ProtectedRoute: React.FC = () => {
  const user = localStorage.getItem('currentUser');
  const currentUser = user ? JSON.parse(user) : null;
  const isAuthenticated = currentUser?.isAuthenticated ?? false;

  return isAuthenticated ? (
    <Outlet />  
  ) : (
    <Navigate to={RouteName.LOGIN} replace /> 
  );
};

export default ProtectedRoute;
