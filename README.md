# 🛒 TalentoTech eCommerce

Este proyecto es el resultado final del curso de Talento Tech y consiste en un eCommerce completo, funcional y optimizado. Se desarrolló utilizando **React**, **Context API**, **MockAPI**, **React Router**, entre otras tecnologías modernas del ecosistema frontend.

## ✨ Funcionalidades Principales

### 🛍️ Gestión del Carrito y Autenticación
- Sistema de autenticación con `localStorage` (simulado).
- Rutas protegidas para usuarios autenticados.
- Carrito de compras persistente y global gracias a Context API.
- Funciones para agregar, eliminar y vaciar productos del carrito.

### 📦 CRUD de Productos con MockAPI
- Creación, edición y eliminación de productos.
- Validaciones en formularios (campos obligatorios, descripciones mínimas, etc).
- Modal de confirmación para eliminar productos.
- Manejo de errores y estados de carga al consumir la API.

### 🎨 Diseño y Experiencia de Usuario
- Interfaz responsive usando Bootstrap y styled-components.
- Iconografía mediante `react-icons`.
- Notificaciones con `React Toastify`.
- Accesibilidad y SEO básico mediante `React Helmet`.

### 🔍 Búsqueda y Paginación
- Filtro por nombre o categoría en tiempo real.
- Sistema de paginación para navegar por el catálogo.

## 📁 Instalación

Cloná el repositorio y ejecutá los siguientes comandos:

git clone https://github.com/Juan-Celerier/TalentoTech.git
cd TalentoTech
npm install
npm start
