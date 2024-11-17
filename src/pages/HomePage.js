import React from 'react';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo) {
    return <Navigate to="/cars" />;
  }

  return (
    <div>
      <h1>Welcome to the Car Management Application</h1>
      <p>Please log in or register to manage your cars.</p>
    </div>
  );
};

export default HomePage;