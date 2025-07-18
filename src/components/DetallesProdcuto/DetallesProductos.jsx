import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../estaticos/Header/Header';
import Footer from '../estaticos/Footer/Footer';
import './DetallesProductos.css';

import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetallesProductos = ({ productos, cart, agregarCarrito, borrarProducto }) => {
  const { id } = useParams();
  const product = productos.find(producto => producto.id == id);

  const isProductoValido = (prod) => {
    if (!prod) return false;
    if (!prod.nombre || typeof prod.nombre !== 'string' || prod.nombre.trim() === '') return false;
    if (!prod.descripcion || typeof prod.descripcion !== 'string' || prod.descripcion.trim().length < 10) return false;
    if (!prod.precio || isNaN(prod.precio) || Number(prod.precio) <= 0) return false;
    if (prod.stock === undefined || isNaN(prod.stock) || Number(prod.stock) < 0) return false;
    if (!prod.categoria || typeof prod.categoria !== 'string' || prod.categoria.trim() === '') return false;
    return true;
  };

  const handleAgregar = () => {
    if (!isProductoValido(product)) {
      toast.error('Producto inválido. No se puede agregar al carrito.');
      return;
    }
    if (Number(product.stock) === 0) {
      toast.warning('No hay stock disponible para este producto.');
      return;
    }

    try {
      agregarCarrito(product);
      toast.success(`"${product.nombre}" agregado al carrito`);
    } catch (error) {
      console.error("Error al agregar producto:", error);
      toast.error('Ocurrió un error al agregar el producto al carrito.');
    }
  };

  if (!product) {
    return (
      <>
        <Helmet>
          <title>Producto no encontrado | Mi Librería</title>
        </Helmet>
        <Header borrarProducto={borrarProducto} cartItems={cart} />
        <div className="detalle-producto-container">
          <h1>Producto no encontrado</h1>
          <p>El producto que buscas no existe o fue eliminado.</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!isProductoValido(product)) {
    return (
      <>
        <Helmet>
          <title>Producto inválido | Mi Librería</title>
        </Helmet>
        <Header borrarProducto={borrarProducto} cartItems={cart} />
        <div className="detalle-producto-container">
          <h1>Producto inválido</h1>
          <p>El producto tiene datos incompletos o incorrectos.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.nombre} | Mi Librería</title>
        <meta name="description" content={`Compra ${product.nombre} al mejor precio. ¡Envíos a todo el país!`} />
      </Helmet>

      <Header borrarProducto={borrarProducto} cartItems={cart} />

      <div className="detalle-producto-container">
        <h1 className="detalle-producto-titulo">Detalle del producto</h1>

        <div className="detalle-producto-card">
          {product.imagen && (
            <img
              src={product.imagen}
              alt={product.nombre}
              className="detalle-producto-imagen"
            />
          )}
          <h2 className="detalle-producto-nombre">{product.nombre}</h2>
          <p className="detalle-producto-descripcion">Descripción: {product.descripcion}</p>
          <p className="detalle-producto-precio">Precio: ${product.precio}</p>
          <p className="detalle-producto-stock">Stock: {product.stock}</p>
          <p className="detalle-producto-categoria">Categoría: {product.categoria}</p>

          <button
            onClick={handleAgregar}
            className="boton-agregar"
            disabled={Number(product.stock) === 0}
          >
            {Number(product.stock) === 0 ? 'Sin stock' : 'Agregar al carrito'}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DetallesProductos;
