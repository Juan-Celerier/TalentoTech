import React from 'react';
import { Helmet } from "react-helmet-async";
import Header from '../../components/estaticos/Header/Header';
import Footer from '../../components/estaticos/Footer/Footer';
import loading from '../../assets/loading.gif';
import Banner from '../../components/Banner/Banner';
import './Home.css';

const Home = ({ cart, productos = [], cargando, agregarCarrito, borrarProducto }) => {
  return (

    <>

<Header borrarProducto={borrarProducto} cartItems={cart} />
  


      <main>
      <Helmet >
        <title>Inicio | Mi Librería</title>
        <meta
          name="description"
          content="Bienvenido a Mi Librería. Descubrí nuestros productos destacados y las últimas novedades."
        />
      </Helmet>
        {
          cargando ? (
            <img src={loading} alt='Cargando...' />
          ) : (
            <Banner
              agregarCarrito={agregarCarrito}
              productos={productos}
              banners={[]} 
            />
          )
        }
      </main>

      <Footer />
    </>
  );
};

export default Home;
