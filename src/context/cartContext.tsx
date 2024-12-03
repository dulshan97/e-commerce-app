import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { CartItem, Product } from '../models/product';
import { CartContextType } from '../models/cartContext';





const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCart(currentCart => {
      const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        const updatedCart = [...currentCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      }
      
      return [...currentCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(currentCart => 
      currentCart.filter(item => item.id !== productId)
    );
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    setCart(currentCart => 
      currentCart
        .map(item => 
          item.id === productId 
            ? {...item, quantity: Math.max(0, newQuantity)} 
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }, []);

  const cartTotal = useMemo(() => 
    cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    [cart]
  );

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};