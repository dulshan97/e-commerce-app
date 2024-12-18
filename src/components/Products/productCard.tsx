import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Product } from "../../models/product";
import { useNotification } from "../../hooks/notification";



interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  toggleFavorite: (productId: string) => void;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isFavorite, 
  toggleFavorite, 
  addToCart 
}) => {
  const { showNotification, NotificationComponent } = useNotification();

  const handleAddToCart = () => {
    addToCart(product);
    showNotification({
      message: `${product.name} added to cart`,
      type: 'cart'
    });
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
    showNotification({
      message: isFavorite 
        ? `${product.name} removed from favorites` 
        : `${product.name} added to favorites`,
      type: 'favorite'
    });
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        {/* Existing ProductCard content remains the same */}
        <motion.div
          className="relative"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-t-lg"
          />
        </motion.div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            <div className="flex flex-wrap items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleFavorite}
                className={`hidden custom-350:flex items-center justify-center w-8 h-8 rounded-full border transition duration-75 ${
                  isFavorite
                    ? 'bg-red-100 text-red-500 border-red-300 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200'
                } focus:ring-2 focus:ring-red-300 focus:outline-none`}
              >
                <Heart className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Render the notification component */}
      {NotificationComponent}
    </div>
  );
};

export default ProductCard;