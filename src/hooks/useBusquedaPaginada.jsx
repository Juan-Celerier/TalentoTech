import { useEffect, useState } from "react";

export const useBusquedaPaginada = (productosTotales, productosPorPagina = 9) => {
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const productosFiltrados = productosTotales.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosPagina = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

  const siguientePagina = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  return {
    busqueda,
    setBusqueda,
    paginaActual,
    totalPaginas,
    productosPagina,
    siguientePagina,
    paginaAnterior,
  };
};
