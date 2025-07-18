/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  obtenerProductosMock,
  agregarProductoMock,
  actualizarProductoMock,
  eliminarProductoMock,
  subirProductoMock,
} from "../services/ProductService";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [productosLocal, setProductosLocal] = useState([]);
  const [productosMock, setProductosMock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [openEditor, setOpenEditor] = useState(false);

  
  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        const productosConFlag = data.map((p) => ({ ...p, desdeJson: true }));
        setProductosLocal(productosConFlag);
      })
      .catch((error) => {
        console.error("Error cargando productos locales:", error);
      });
  }, []);

  const cargarProductosMock = async () => {
    try {
      const data = await obtenerProductosMock();
      setProductosMock(data);
    } catch (error) {
      console.error("Error cargando productos MockAPI:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductosMock();
  }, []);

  const agregarProducto = async (producto) => {
    try {
      const nuevoProductoLocal = {
        ...producto,
        id: crypto.randomUUID(),
        desdeJson: true,
      };
      setProductosLocal((prev) => [...prev, nuevoProductoLocal]);

      await agregarProductoMock(producto);

      Swal.fire("¡Éxito!", "Producto agregado correctamente!", "success");
      cargarProductosMock();
      setOpen(false);
    } catch (error) {
      console.log(error.message);
      Swal.fire("Error", "No se pudo agregar el producto", "error");
    }
  };

  const actulizarProducto = async (producto) => {
    try {
      await actualizarProductoMock(producto);
      Swal.fire("¡Éxito!", "Producto actualizado correctamente!", "success");
      setOpenEditor(false);
      setSeleccionado(null);
      cargarProductosMock();
    } catch (error) {
      console.log(error.message);
    }
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Seguro quieres eliminar el producto?");
    if (!confirmar) return;

    try {
      await eliminarProductoMock(id);
      Swal.fire("Producto eliminado", "Se eliminó correctamente", "success");
      cargarProductosMock();
    } catch (error) {
      alert("Hubo un problema al eliminar el producto");
      console.log(error.message);
    }
  };

  const eliminarProductoLocal = (id) => {
    setProductosLocal((prev) => prev.filter((p) => p.id !== id));
  };

  const actualizarProductoLocal = (productoActualizado) => {
    setProductosLocal((prev) =>
      prev.map((p) => (p.id === productoActualizado.id ? productoActualizado : p))
    );
    setOpenEditor(false);
    setSeleccionado(null);
  };

  const subirProductosLocalAMockAPI = async () => {
    try {
      for (const producto of productosLocal) {
        await subirProductoMock(producto);
      }
      Swal.fire("¡Listo!", "Productos locales subidos a MockAPI", "success");
      cargarProductosMock();
    } catch (error) {
      console.error("Error al subir productos locales a MockAPI:", error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        productosLocal,
        productosMock,
        loading,
        open,
        setOpen,
        openEditor,
        setOpenEditor,
        seleccionado,
        setSeleccionado,
        agregarProducto,
        actulizarProducto,
        eliminarProducto,
        eliminarProductoLocal,
        actualizarProductoLocal,
        subirProductosLocalAMockAPI,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
