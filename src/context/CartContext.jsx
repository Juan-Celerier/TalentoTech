/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { useProductos } from "../hooks/useProductos";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { productos, apiProductos, cargando, error } = useProductos();

  const handleAddToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleDeleteFromCart = (product) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === product.id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        } else {
          return item;
        }
      }).filter(item => item !== null);
    });
  };

  return (
    <CartContext.Provider 
      value={{
        cart,
        productos,
        apiProductos,
        cargando,
        error,
        handleAddToCart,
        handleDeleteFromCart,
        isAuthenticated,
        setIsAuth: setIsAuthenticated
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
