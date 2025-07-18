import React from 'react'
import './Cart.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({ cartItems, isOpen, onClose, borrarProducto }) => {

  const handleBorrar = (item) => {
    borrarProducto(item);
    toast.info(`"${item.nombre}" eliminado del carrito`, {
      autoClose: 2000
    });
  };

  return (
    <div
      className={`cart-drawer ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-label="Carrito de compras"
    >
      <div className='cart-header'>
        <h2 style={{ color: 'black' }}>Carrito de Compras</h2>
        <button
          onClick={onClose}
          className='close-button'
          aria-label="Cerrar carrito"
        >
          X
        </button>
      </div>

      <div className='cart-content'>
        {!cartItems || cartItems.length === 0 ? (
          <p style={{ color: 'red' }}>El carrito está vacío</p>
        ) : (
          <ul className='cart-item'>
            {cartItems.map((item) => (
              <li key={item.id} style={{ color: 'black' }}>
                {item.nombre} - ${item.precio.toFixed(2)}
                <button
                  onClick={() => handleBorrar(item)}
                  aria-label={`Eliminar ${item.nombre} del carrito`}
                  className="btn btn-sm btn-danger ms-2"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Cart;
