/* eslint-disable no-unused-vars */
const apiUrl = "https://686ecf6891e85fac429f0a86.mockapi.io/books";

export const obtenerProductosMock = async () => {
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error("Error al obtener productos de MockAPI");
  return await res.json();
};

export const agregarProductoMock = async (producto) => {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al agregar producto");
  return await res.json();
};

export const actualizarProductoMock = async (producto) => {
  const res = await fetch(`${apiUrl}/${producto.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return await res.json();
};

export const eliminarProductoMock = async (id) => {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
};

export const subirProductoMock = async (producto) => {
  const { id, desdeJson, ...sinId } = producto;
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sinId),
  });
  if (!res.ok) throw new Error("Error subiendo producto local");
};
