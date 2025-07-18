import { useContext } from 'react';
import './index.css';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import AcercaDe from './pages/AcercaDe';
import Contactos from './pages/Contactos';
import GaleriaDeProductos from './pages/Galeria/GaleriaDeProductos';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin/Admin';
import DetallesProductos from './components/DetallesProdcuto/DetallesProductos';
import Login from './pages/Login/Login';
import RutaProtegida from './auth/RutasProtegidas';
import { CartContext } from './context/CartContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {
    cart,
    productos,
    cargando,
    handleAddToCart,
    handleDeleteFromCart,
    isAuthenticated,
  } = useContext(CartContext);

  return (
    <class>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              borrarProducto={handleDeleteFromCart}
              agregarCarrito={handleAddToCart}
              cart={cart}
              productos={productos}
              cargando={cargando}
            />
          }
        />
        <Route
          path="/acercade"
          element={<AcercaDe borrarProducto={handleDeleteFromCart} cart={cart} />}
        />
        <Route
          path="/productos"
          element={
            <GaleriaDeProductos
              borrarProducto={handleDeleteFromCart}
              agregarCarrito={handleAddToCart}
              cart={cart}
              productos={productos}
              cargando={cargando}
            />
          }
        />
        <Route
          path="/productos/:id"
          element={
            <DetallesProductos
              productos={productos}
              borrarProducto={handleDeleteFromCart}
              agregarCarrito={handleAddToCart}
              cart={cart}
              cargando={cargando}
            />
          }
        />
        <Route
          path="/contacto"
          element={<Contactos borrarProducto={handleDeleteFromCart} cart={cart} />}
        />
        <Route
          path="/admin"
          element={
            <RutaProtegida isAuthenticated={isAuthenticated}>
              <Admin />
            </RutaProtegida>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

     
      <ToastContainer position="top-right" autoClose={3000} />
    </class>
  );
}

export default App;
