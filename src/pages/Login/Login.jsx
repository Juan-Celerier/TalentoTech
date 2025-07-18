import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './login.css'; // Asegúrate de tener este archivo

const Login = () => {
  const { email, setEmail, password, setPassword, handleSubmit, errors } = useAuth();

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <div className="mb-3">
          <label htmlFor="formBasicEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="formBasicEmail"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="formBasicPassword" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="formBasicPassword"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
