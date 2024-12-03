import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Product } from "../../models/product";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  toggleFavorite: (productId: string) => void;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, toggleFavorite, addToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
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
              className={`text-red-500 ${isFavorite ? 'fill-current' : ''}`}
            >
              <Heart />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
