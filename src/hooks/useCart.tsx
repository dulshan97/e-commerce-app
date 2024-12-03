import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Increase quantity if item already exists
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      // Add new item to the cart
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    cartTotal,
  };
};

export default useCart;
