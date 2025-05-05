import { useState } from 'react'
import { useEffect, useRef } from "react";

import './App.css'
import HomePage from './pages/homePage'
import NotFound from './pages/NotFound'
import ArtsPage from './pages/ArtsPage';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<ArtsPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
