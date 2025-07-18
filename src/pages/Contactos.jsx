import React from 'react'
import Header from '../components/estaticos/Header/Header'
import Footer from '../components/estaticos/Footer/Footer'

const Contactos = ({cart, borrarProducto}) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart}/>
      <h1>contactos</h1>
      <Footer/>
    </>
  )
}

export default Contactos
