import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import React from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  image: string;
}

interface CartMenuProps {
  isCartOpen: boolean;
  toggleCart: () => void;
  cartItems: CartItem[];
  removeItem: (id: string) => void;
  getTotalPrice: () => number;
}

const CartMenu: React.FC<CartMenuProps> = ({ isCartOpen, toggleCart, cartItems, removeItem, getTotalPrice }) => {
  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg p-6 overflow-y-auto z-50"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <motion.button whileHover={{ rotate: 90 }} onClick={toggleCart}>
              <X />
            </motion.button>
          </div>

          {/* Cart Items */}
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4 pb-4 border-b">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="text-red-500 ml-2"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}

          {/* Total and Checkout */}
          <div className="mt-6">
            <div className="flex justify-between mb-4">
              <span className="text-xl">Total:</span>
              <span className="text-xl font-bold">${getTotalPrice().toFixed(2)}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white py-3 rounded-full"
              onClick={() => console.log('Proceed to checkout')}
            >
              Checkout
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartMenu;
