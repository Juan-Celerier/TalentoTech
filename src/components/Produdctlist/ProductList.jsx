// src/components/ProductList.jsx
import React from 'react'
import Productos from '../Prodcutos/Productos'
import './PeoductList.css'

const ProductList = ({ productos, agregarCarrito }) => {
  return (
    <>
      {productos.map(producto => (
        <Productos key={producto.id} producto={producto} agregarCarrito={agregarCarrito} />
      ))}
    </>
  )
}

export default ProductList
