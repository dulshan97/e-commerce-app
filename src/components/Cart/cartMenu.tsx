import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import React from 'react';
import { useCart } from '../../context/cartContext';

interface CartMenuProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartMenu: React.FC<CartMenuProps> = ({ isCartOpen, toggleCart }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 w-full sm:w-96 h-full bg-white shadow-lg p-4 sm:p-6 overflow-y-auto z-50"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">Shopping Cart</h2>
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={toggleCart}
              className="p-2"
            >
              <X className="w-6 h-6 sm:w-auto sm:h-auto" />
            </motion.button>
          </div>

          {/* Cart Items */}
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 pb-4 border-b"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm sm:text-base">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 px-2 py-1 rounded text-sm"
                      >
                        -
                      </motion.button>
                      <span className="text-sm">{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 px-2 py-1 rounded text-sm"
                      >
                        +
                      </motion.button>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="text-red-500 ml-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} className="sm:size-18" />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          )}

          {/* Total and Checkout */}
          <div className="mt-4 sm:mt-6">
            <div className="flex justify-between mb-4">
              <span className="text-lg sm:text-xl">Total:</span>
              <span className="text-lg sm:text-xl font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            {cart.length > 0 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-full text-sm sm:text-base"
                onClick={() => console.log('Proceed to checkout')}
              >
                Checkout
              </motion.button>
            ) : (
              <></>

            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartMenu;