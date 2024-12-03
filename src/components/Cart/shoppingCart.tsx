import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  User, 
  Search, 
  X,
  Heart,
  Trash2
} from 'lucide-react';

// Centralized type definitions
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  image: string;
}

type ProductCategory = 'Outerwear' | 'Tops' | 'Bottoms' | 'All';

interface CartItem extends Product {
  quantity: number;
}

// Utility for generating unique IDs
const generateId = (): string => 
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Mock data service 
const ProductService = {
  getProducts: (): Product[] => [
    {
      id: generateId(),
      name: "Classic Denim Jacket",
      price: 129.99,
      description: "Vintage-inspired blue denim jacket with classic fit",
      category: "Outerwear",
      image: "/api/placeholder/300/400"
    },
    {
      id: generateId(),
      name: "Organic Cotton T-Shirt",
      price: 39.99,
      description: "Soft, breathable organic cotton basic tee",
      category: "Tops",
      image: "/api/placeholder/300/400"
    },
    {
      id: generateId(),
      name: "Slim Fit Chinos",
      price: 89.99,
      description: "Tailored slim fit chinos in khaki",
      category: "Bottoms",
      image: "/api/placeholder/300/400"
    },
    {
      id: generateId(),
      name: "Lightweight Hoodie",
      price: 59.99,
      description: "Comfortable cotton blend hoodie",
      category: "Tops",
      image: "/api/placeholder/300/400"
    }
  ]
};

// Custom hook for cart management
const useCart = () => {
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

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal
  };
};

// Main component
const ImprovedECommerceApp: React.FC = () => {
  const [products] = useState<Product[]>(ProductService.getProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);

  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal 
  } = useCart();

  const filteredProducts = useMemo(() => 
    products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || product.category === selectedCategory)
    ),
    [products, searchTerm, selectedCategory]
  );

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavoriteProducts(current => 
      current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId]
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Urban Threads</h1>
          
          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full w-64"
              />
              <Search className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ProductCategory)}
              className="px-4 py-2 border rounded-full"
            >
              <option value="All">All Categories</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
            </select>
          </div>
          
          {/* User and Cart Icons */}
          <div className="flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <User />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cart.length}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full"
                    >
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(product.id)}
                      className={`text-red-500 ${
                        favoriteProducts.includes(product.id) ? 'fill-current' : ''
                      }`}
                    >
                      <Heart />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar with AnimatePresence */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg p-6 overflow-y-auto z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <motion.button 
                whileHover={{ rotate: 90 }}
                onClick={toggleCart}
              >
                <X />
              </motion.button>
            </div>
            
            {cart.map(item => (
              <div key={item.id} className="flex items-center mb-4 pb-4 border-b">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    -
                  </motion.button>
                  <span>{item.quantity}</span>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 ml-2"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </div>
            ))}
            
            <div className="mt-6">
              <div className="flex justify-between mb-4">
                <span className="text-xl">Total:</span>
                <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white py-3 rounded-full"
              >
                Checkout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Urban Threads. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ImprovedECommerceApp;