import React, { useState, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './FormularioProducto.css';
const FormularioProducto = () => {
  const { agregarProducto } = useContext(AdminContext);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    imagen: "",
  });
  const [errors, setErrors] = useState({});
  const [subiendoImagen, setSubiendoImagen] = useState(false);

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
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setSubiendoImagen(true);
    try {
      const response = await fetch("https://api.imgbb.com/1/upload?key=TUKLAVE", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al subir imagen");

      const data = await response.json();
      const imageUrl = data.data?.url;

      if (!imageUrl) throw new Error("La imagen no se cargó correctamente");

      setForm((prev) => ({ ...prev, imagen: imageUrl }));
      toast.success("Imagen subida correctamente");
    } catch (error) {
      console.error("Error al subir imagen:", error);
      toast.error("No se pudo subir la imagen");
      setErrors((prev) => ({
        ...prev,
        imagen: "Verifica la conexión o usa otra imagen.",
      }));
    } finally {
      setSubiendoImagen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Por favor completá correctamente todos los campos");
      return;
    }

    const nuevoProducto = {
      ...form,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
      desdeJson: true,
    };

    agregarProducto(nuevoProducto);
    toast.success("Producto agregado con éxito");

    setForm({
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      categoria: "",
      imagen: "",
    });
    setErrors({});
  };

  return (
      <div className="formulario-admin-wrapper">
    <form onSubmit={handleSubmit} noValidate>
      <h3 className="mb-4 text-center">Agregar Producto</h3>

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
          name="precio"
          className={`form-control ${errors.precio ? "is-invalid" : ""}`}
          value={form.precio}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
        {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="stock" className="form-label">Stock</label>
        <input
          id="stock"
          type="number"
          name="stock"
          className={`form-control ${errors.stock ? "is-invalid" : ""}`}
          value={form.stock}
          onChange={handleChange}
          min="0"
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
        <label htmlFor="imagen" className="form-label">Subir Imagen</label>
        <input
          id="imagen"
          type="file"
          accept="image/*"
          className={`form-control ${errors.imagen ? "is-invalid" : ""}`}
          onChange={handleImageUpload}
        />
        {errors.imagen && <div className="invalid-feedback">{errors.imagen}</div>}
        {subiendoImagen && <p className="text-info mt-2">Subiendo imagen...</p>}
      </div>

      <button
        type="submit"
        className="btn btn-success w-100"
        disabled={subiendoImagen}
      >
        Agregar
      </button>
    </form>
    </div>
  );
};

export default FormularioProducto;
