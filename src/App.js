import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductCreationPage from './pages/ProductCreationPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="cars" element={<ProductListPage />} />
            <Route path="create" element={<ProductCreationPage />} />
            <Route path="car/:id" element={<ProductDetailPage />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
};

export default App;