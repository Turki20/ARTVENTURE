import { useState } from 'react';
import { useEffect, useRef } from "react";

import './App.css';
import HomePage from './pages/homePage';
import NotFound from './pages/NotFound';
import ArtsPage from './pages/ArtsPage';
import AuthForm from './pages/login.jsx';
import ProtectedRoute from './pages/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/login" element={<AuthForm />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <ArtsPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
