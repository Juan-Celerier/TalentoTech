import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider> 
      <Router>
        <CartProvider>
          <AdminProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </AdminProvider>
        </CartProvider>
      </Router>
    </HelmetProvider>
  </StrictMode>
);
