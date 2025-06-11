// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import Operations from './pages/Operations/operations.jsx';
import Education from './pages/Education/education.jsx';
import Publications from './pages/Publications/publications.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter basename="/ntab-website">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/education" element={<Education />} />
            <Route path="/publications" element={<Publications />} />
            {/* Add more routes as needed */}
        </Routes>
    </BrowserRouter>
);