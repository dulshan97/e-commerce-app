import React from "react";
import cloth1 from '../../assets/images/productList/clothing1.png'
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Classic White Shirt",
    price: "$25",
    oldPrice: "$30",
    rating: 4.5,
    image: { cloth1 },
  },
  {
    id: 2,
    name: "Elegant Evening Gown",
    price: "$50",
    oldPrice: "$70",
    rating: 5,
    image: "https://via.placeholder.com/800x1000",
  },
  {
    id: 3,
    name: "Casual Denim Jacket",
    price: "$40",
    oldPrice: "",
    rating: 4,
    image: "https://via.placeholder.com/800x1000",
  },
  {
    id: 4,
    name: "Summer Floral Dress",
    price: "$30",
    oldPrice: "$35",
    rating: 4.2,
    image: "https://via.placeholder.com/800x1000",
  },
  {
    id: 1,
    name: "Classic White Shirt",
    price: "$25",
    oldPrice: "$30",
    rating: 4.5,
    image: { cloth1 },
  },
  {
    id: 2,
    name: "Elegant Evening Gown",
    price: "$50",
    oldPrice: "$70",
    rating: 5,
    image: "https://via.placeholder.com/800x1000",
  },
  {
    id: 3,
    name: "Casual Denim Jacket",
    price: "$40",
    oldPrice: "",
    rating: 4,
    image: "https://via.placeholder.com/800x1000",
  },
  {
    id: 4,
    name: "Summer Floral Dress",
    price: "$30",
    oldPrice: "$35",
    rating: 4.2,
    image: "https://via.placeholder.com/800x1000",
  },
];

const ProductList = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-8">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"

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
                className="w-full h-96 object-cover rounded-t-lg"
                initial={false} animate={{ scale: 1 }}

              />
              {/* {product.oldPrice && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Sale
                </span>
              )} */}
            </motion.div>
            <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-700">{product.price}</p>
            <motion.button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Add to Cart
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
