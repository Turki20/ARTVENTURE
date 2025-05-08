import { useState } from 'react';
import { useEffect, useRef } from "react";

import './App.css';
import HomePage from './pages/homePage';
import NotFound from './pages/NotFound';
import ArtsPage from './pages/ArtsPage';
import AuthForm from './pages/login.jsx';
import Profile from './pages/Profile.jsx';
import ProtectedRoute from './pages/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router';

// ✅ استيراد Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthForm />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <ArtsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ✅ عشان الإشعارات تشتغل */}
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
