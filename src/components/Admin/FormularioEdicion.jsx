import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FormularioEdicion.css";

const FormularioEdicion = ({ producto, onCerrar, onActualizar }) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    imagen: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre || "",
        descripcion: producto.descripcion || "",
        precio: producto.precio !== undefined ? String(producto.precio) : "",
        stock: producto.stock !== undefined ? String(producto.stock) : "",
        categoria: producto.categoria || "",
        imagen: producto.imagen || "",
      });
      setErrors({});
    }
  }, [producto]);

  const isValidUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    } else if (form.descripcion.trim().length < 10) {
      newErrors.descripcion = "La descripción debe tener al menos 10 caracteres";
    }
    if (!form.precio || Number(form.precio) <= 0)
      newErrors.precio = "El precio debe ser mayor a cero";
    if (!form.stock || Number(form.stock) < 0)
      newErrors.stock = "El stock debe ser un número positivo";
    if (!form.categoria.trim())
      newErrors.categoria = "La categoría es obligatoria";
    if (form.imagen && !isValidUrl(form.imagen))
      newErrors.imagen = "La URL de la imagen no es válida";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Revisá los errores en el formulario");
      return;
    }

    const productoActualizado = {
      ...producto,
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
      categoria: form.categoria.trim(),
      imagen: form.imagen.trim(),
    };

    onActualizar(productoActualizado);
    toast.success("Producto actualizado con éxito");
    onCerrar();
  };

  const isDisabled =
    !form.nombre.trim() ||
    !form.descripcion.trim() ||
    form.descripcion.trim().length < 10 ||
    !form.precio ||
    Number(form.precio) <= 0 ||
    !form.stock ||
    Number(form.stock) < 0 ||
    !form.categoria.trim() ||
    (form.imagen && !isValidUrl(form.imagen));

  return (
    <div className="mi-modal-backdrop" onClick={onCerrar}>
      <div className="mi-modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} noValidate>
          <h3 className="mb-4 text-center">Editar Producto</h3>

          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
              value={form.nombre}
              onChange={handleChange}
              required
            />
            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="3"
              className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
              value={form.descripcion}
              onChange={handleChange}
              required
            />
            {errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="precio" className="form-label">Precio</label>
            <input
              id="precio"
              type="number"
              min="0"
              step="0.01"
              name="precio"
              className={`form-control ${errors.precio ? "is-invalid" : ""}`}
              value={form.precio}
              onChange={handleChange}
              required
            />
            {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input
              id="stock"
              type="number"
              min="0"
              name="stock"
              className={`form-control ${errors.stock ? "is-invalid" : ""}`}
              value={form.stock}
              onChange={handleChange}
              required
            />
            {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="categoria" className="form-label">Categoría</label>
            <input
              id="categoria"
              name="categoria"
              type="text"
              className={`form-control ${errors.categoria ? "is-invalid" : ""}`}
              value={form.categoria}
              onChange={handleChange}
              required
            />
            {errors.categoria && <div className="invalid-feedback">{errors.categoria}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">URL de imagen</label>
            <input
              id="imagen"
              name="imagen"
              type="url"
              className={`form-control ${errors.imagen ? "is-invalid" : ""}`}
              value={form.imagen}
              onChange={handleChange}
            />
            {errors.imagen && <div className="invalid-feedback">{errors.imagen}</div>}
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isDisabled}
            >
              Actualizar
            </button>
            <button type="button" className="btn btn-danger" onClick={onCerrar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioEdicion;
