import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CardBanner.css';

const CardBanner = ({ producto, agregarCarrito }) => {
  
  const handleAgregar = () => {
    agregarCarrito(producto);
    toast.success(`${producto.nombre} agregado al carrito!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  if (!producto) {
    return <div>Producto no disponible</div>;
  }

  return (
    <div className="producto-card">
    
      <div className="producto-card__image-container">
        <img 
          src={producto.imagen} 
          alt={producto.nombre} 
          className="producto-card__img" 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Sin+Imagen';
          }}
        />
      </div>
      
     
      <div className="producto-card__content-container">
        <div className="producto-card__content">
          <h3 className="producto-card__title">{producto.nombre || 'Nombre no disponible'}</h3>
          <div className="producto-card__price">
            ${producto.precio ? producto.precio.toFixed(2) : '0.00'}
          </div>
          {producto.stock && (
            <div className="producto-card__stock">Stock: {producto.stock}</div>
          )}
          <p className="producto-card__description">
            {producto.descripcion || 'Descripción no disponible'}
          </p>
          <button 
            onClick={handleAgregar}
            className="producto-card__btn"
          >
            <i className="fas fa-cart-plus"></i> Añadir
          </button>
        </div>
      </div>
    </div>  
  );
};

export default CardBanner;