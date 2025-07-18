import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // 👈 Helmet importado
import Header from '../../components/estaticos/Header/Header';
import Footer from '../../components/estaticos/Footer/Footer';
import ProductList from '../../components/Produdctlist/ProductList';
import loading from '../../assets/loading.gif';
import './Galeria.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GaleriaDeProductos = ({ cart, productos = [], cargando, agregarCarrito, borrarProducto }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const productosPorPagina = 9;

  useEffect(() => {
    const busquedaLimpia = busqueda.trim().toLowerCase();

    const filtrados = productos.filter((p) =>
      p.nombre?.toLowerCase().includes(busquedaLimpia)
    );

    setProductosFiltrados(filtrados);
    setPaginaActual(1);
  }, [busqueda, productos]);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosPagina = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const siguientePagina = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const handleAgregarCarrito = (producto) => {
    agregarCarrito(producto);
    toast.success(`"${producto.nombre}" agregado al carrito`, {
      autoClose: 2000,
    });
  };

  return (
    <>
      <Helmet>
        <title>Galería de Productos | Mi Librería</title>
        <meta
          name="description"
          content="Explorá nuestra galería con una amplia variedad de libros. Filtrá por nombre y navegá fácilmente por nuestras páginas."
        />
      </Helmet>

     <Header borrarProducto={borrarProducto} cartItems={cart} />

<div className="galeria">
  <div className="galeria__buscador">
    <input
      type="text"
      placeholder="Buscar producto..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      className="navbar__input"
      aria-label="Buscar productos por nombre"
    />
  </div>

  {cargando ? (
    <img className="galeria__loading" src={loading} alt="Cargando productos..." />
  ) : (
    <>
      {productosPagina.length > 0 ? (
        <div className="galeria__productos">
          <ProductList
            agregarCarrito={handleAgregarCarrito}
            productos={productosPagina}
          />
        </div>
      ) : (
        <h3 className="galeria__sin-resultados">No se encontraron productos.</h3>
      )}

      {productosFiltrados.length > 0 && (
        <div className="galeria__paginacion">
          <button
            onClick={paginaAnterior}
            disabled={paginaActual === 1}
            className="galeria__boton"
          >
            Anterior
          </button>
          <span>
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            onClick={siguientePagina}
            disabled={paginaActual === totalPaginas}
            className="galeria__boton"
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  )}
</div>

<Footer />

    </>
  );
};

export default GaleriaDeProductos;
