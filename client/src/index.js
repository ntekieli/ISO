import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, RedirectBasedOnAuth } from './AuthContext';
import NavigationBar from './components/Navigation';
import ListingPage from './ListingPage';
import AuthPage from './AuthPage';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
      <BrowserRouter>
          <NavigationBar />
          <Routes>
              <Route path="/" element={<RedirectBasedOnAuth />} />
              <Route path="/posts" element={<ListingPage />} />
              <Route path="/account" element={<AuthPage />} />
          </Routes>
      </BrowserRouter>
  </AuthProvider>
);

