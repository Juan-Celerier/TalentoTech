import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthLogic = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null); // nuevo estado para rol
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuth') === 'true';
    const storedRole = localStorage.getItem('role'); // recuperamos rol

    if (isAuthenticated && !isAuth) {
      setIsAuth(true);
      setRole(storedRole);
      navigate(storedRole === 'admin' ? '/admin' : '/');
    }
  }, [navigate, isAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!email) validationErrors.email = 'Email es requerido';
    if (!password) validationErrors.password = 'Password es requerido';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch('data/users.json');
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setErrors({ email: 'Credenciales inválidas' });
      } else {
        setIsAuth(true);
        setRole(foundUser.role);
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('role', foundUser.role);
        navigate(foundUser.role === 'admin' ? '/admin' : '/');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setErrors({ email: 'Error del servidor. Intenta más tarde.' });
    }
  };

  const logout = () => {
    setIsAuth(false);
    setRole(null);
    localStorage.removeItem('isAuth');
    localStorage.removeItem('role');
    navigate('/');
  };

  return {
    isAuth,
    role,
    setIsAuth,
    setRole,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    errors,
    logout,
  };
};
