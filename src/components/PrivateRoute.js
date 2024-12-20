import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;