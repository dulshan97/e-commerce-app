import React, { useCallback, useMemo, useState } from "react";
import cloth1 from '../../assets/images/productList/clothing1.png'
import { motion } from "framer-motion";
import { Heart } from "lucide-react";



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
            ? { ...item, quantity: Math.max(0, newQuantity) }
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

const ProductList = () => {

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

  const toggleFavorite = useCallback((productId: string) => {
    setFavoriteProducts(current =>
      current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId]
    );
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-8">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <motion.div className="relative"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={cloth1}
                alt={product.name}
                className="w-full h-96 object-cover rounded-t-lg "
                initial={false} animate={{ scale: 1 }}

              />
              {/* {product.oldPrice && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Sale
                </span>
              )} */}
            </motion.div>
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
                    className={`text-red-500 ${favoriteProducts.includes(product.id) ? 'fill-current' : ''
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
    </div>
  );
};

export default ProductList;
