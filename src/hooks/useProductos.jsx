import { useState, useEffect } from "react";

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [apiProductos, setApiProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      try {
        const [localRes, apiRes] = await Promise.all([
          fetch("/data/data.json"),
          fetch("https://686ecf6891e85fac429f0a86.mockapi.io/books")
        ]);

        const localData = await localRes.json();
        const apiData = await apiRes.json();

        setProductos(localData);
        setApiProductos(apiData);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  return { productos, apiProductos, cargando, error };
};
