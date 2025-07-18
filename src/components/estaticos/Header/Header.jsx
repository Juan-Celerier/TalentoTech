import React, { useState,  } from 'react';
import { NavLink } from 'react-router-dom';
import Cart from '../../Cart/Cart';
import { useAuth } from '../../../context/AuthContext'; 
import './Header.css';

const Navbar = ({ cartItems, borrarProducto }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

 
  const { isAuth, setIsAuth, userRole } = useAuth();

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('isAuth');
    
  }

  return (
    <header className="navbar__header">
      <nav className="navbar">
        <div className="navbar__menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="navbar-menu__span"></span>
          <span className="navbar-menu__span"></span>
          <span className="navbar-menu__span"></span>
        </div>

        <div className={menuOpen ? "navbar__container-ul-form open" : "navbar__container-ul-form"}>
          <ul className="navbar__ul">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/acercade" className={({ isActive }) => isActive ? "active-link" : ""}>¿Quiénes Somos?</NavLink>
            </li>
            <li>
              <NavLink to="/productos" className={({ isActive }) => isActive ? "active-link" : ""}>Galería de productos</NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className={({ isActive }) => isActive ? "active-link" : ""}>Contacto</NavLink>
            </li>

            {isAuth ? (
              <>
                {userRole === 'admin' && (
                  <li>
                    <NavLink to="/admin" className={({ isActive }) => isActive ? "active-link" : ""}>Admin</NavLink>
                  </li>
                )}
                <li>
                  <button
                    className="btn btn-outline-danger"
                    onClick={logout}
                    aria-label="Salir"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fa-solid fa-right-from-bracket"></i> Salir
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/login" aria-label="Iniciar sesión" className="login-icon-link">
                  <i className="fa-solid fa-user"></i>
                </NavLink>
              </li>
            )}

            <li className="cartnav">
              <button className="btnCart" onClick={() => setCartOpen(true)}>
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
              <Cart
                borrarProducto={borrarProducto}
                cartItems={cartItems}
                isOpen={isCartOpen}
                onClose={() => setCartOpen(false)}
              />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
