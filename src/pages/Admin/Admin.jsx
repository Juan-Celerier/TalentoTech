import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AdminContext } from "../../context/AdminContext";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import FormularioProducto from "../../components/Admin/FormularioProducto";
import FormularioEdicion from "../../components/Admin/FormularioEdicion";
import Header from "../../components/estaticos/Header/Header";
import { useBusquedaPaginada } from "../../hooks/useBusquedaPaginada";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css";
import Footer from '../../components/estaticos/Footer/Footer';

const Admin = () => {
  const {
    productosLocal,
    loading,
    eliminarProducto,
    eliminarProductoLocal,
    open,
    setOpen,
    openEditor,
    setOpenEditor,
    seleccionado,
    setSeleccionado,
    agregarProducto,
    actulizarProducto,
    actualizarProductoLocal,
  } = useContext(AdminContext);

  const { setIsAuth } = useContext(CartContext);
  const navigate = useNavigate();

 
  const isAdmin = localStorage.getItem("isAuth") === "true";

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  const handleEditar = (producto) => {
    setSeleccionado(producto);
    setOpenEditor(true);
  };

  const handleEliminar = (producto) => {
    if (window.confirm("¿Seguro que deseas eliminar el producto?")) {
      try {
        if (producto.desdeJson) {
          eliminarProductoLocal(producto.id);
          toast.success("Producto eliminado correctamente (local)");
        } else {
          eliminarProducto(producto.id);
          toast.success("Producto eliminado correctamente");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar el producto");
      }
    }
  };

  const productosLocalValidos = productosLocal.filter((p) => p && p.nombre);

  const {
    busqueda,
    setBusqueda,
    paginaActual,
    totalPaginas,
    productosPagina,
    siguientePagina,
    paginaAnterior,
  } = useBusquedaPaginada(productosLocalValidos, 9);

  return (
    <>
      <div className="admin-container">
        <div className="container-fluid">
          <Helmet>
            <title>Administración | Mi Librería</title>
            <meta
              name="description"
              content="Panel de administración del eCommerce. Agregá, editá y eliminá productos de forma rápida y sencilla."
            />
          </Helmet>

         
          <Header isAdmin={isAdmin} onLogout={handleLogout} />

          <h1 className="text-center mb-4 admin-title">Panel Administrativo</h1>

          <div className="d-flex flex-wrap gap-2 mb-4">
            <button
              className="btn btn-success admin-btn-toggle"
              onClick={() => setOpen(!open)}
              aria-label="Agregar nuevo producto"
            >
              {open ? "Ocultar formulario" : "Agregar producto nuevo"}
            </button>
          </div>

          {open && (
            <div className="mb-4">
              <FormularioProducto onAgregar={agregarProducto} />
            </div>
          )}

          <div className="mb-4 text-center">
            <input
              type="text"
              placeholder="Buscar producto por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="form-control mx-auto admin-input-busqueda"
              style={{ maxWidth: "400px" }}
              aria-label="Buscar productos por nombre"
            />
          </div>

          {loading ? (
            <p className="text-center">Cargando productos...</p>
          ) : (
            <>
              {productosPagina.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                  {productosPagina.map((product) => (
                    <div key={product.id} className="col">
                      <div className="card h-100 admin-card-custom">
                        <img
                          src={product.imagen}
                          alt={product.nombre}
                          className="card-img-top admin-card-img"
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{product.nombre}</h5>
                          <p className="card-text">${product.precio}</p>
                          <div className="mt-auto d-flex justify-content-between">
                            <button
                              className="btn btn-warning btn-sm admin-btn-editar"
                              onClick={() => handleEditar(product)}
                              aria-label={`Editar ${product.nombre}`}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm admin-btn-eliminar"
                              onClick={() => handleEliminar(product)}
                              aria-label={`Eliminar ${product.nombre}`}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h4 className="text-center">No se encontraron productos.</h4>
              )}

              <div className="d-flex justify-content-center align-items-center gap-3 admin-paginacion">
                <button
                  className="btn btn-outline-secondary"
                  onClick={paginaAnterior}
                  disabled={paginaActual === 1}
                  aria-label="Página anterior"
                >
                  Anterior
                </button>
                <span>
                  Página {paginaActual} de {totalPaginas}
                </span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={siguientePagina}
                  disabled={paginaActual === totalPaginas}
                  aria-label="Siguiente página"
                >
                  Siguiente
                </button>
              </div>

              {openEditor && seleccionado && (
                <FormularioEdicion
                  producto={seleccionado}
                  onActualizar={seleccionado.desdeJson ? actualizarProductoLocal : actulizarProducto}
                  onCerrar={() => setOpenEditor(false)}
                />
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
