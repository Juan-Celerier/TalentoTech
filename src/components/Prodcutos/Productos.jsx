
import React, { useState } from 'react'
import './Productos.css'
import { Link } from 'react-router-dom'

const Productos = ({ producto, agregarCarrito }) => {
  const [cantidad, setCantidad] = useState(1)

  const increase = () => setCantidad(prev => (prev < producto.stock ? prev + 1 : prev))
  const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1))

  return (
    <section className='producto-card'>
      <img src={producto.imagen} alt={producto.nombre} className='producto-imagen' />

      <h3 className='producto-nombre'>{producto.nombre}</h3>
      <p className='producto-precio'>${producto.precio}</p>
      <p className='producto-stock'>Stock: {producto.stock}</p>

      <div className='producto-cantidadContainer'>
        <button className='producto-qtyButton' onClick={decrease}>-</button>
        <span className='producto-cantidad'>{cantidad}</span>
        <button className='producto-qtyButton' onClick={increase}>+</button>
      </div>

      <button className='producto-agregar' onClick={() => agregarCarrito(producto)}>
        Agregar al carrito
      </button>
      <Link to={`/productos/${producto.id}`} className='producto-link'>Ver más</Link>
    </section>
  )
}

export default Productos
