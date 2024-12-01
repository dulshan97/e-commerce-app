import React from "react";
import cloth1 from '../../assets/images/productList/clothing1.png'

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
];

const ProductList = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-8">Shop the Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <div className="relative">
              <img
                src={cloth1}
                alt={product.name}
                className="w-full h-[calc(100vw*5/4)] sm:h-[500px] object-cover rounded-t-lg"
              />
              {product.oldPrice && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Sale
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-900 font-bold">{product.price}</span>
              {product.oldPrice && (
                <span className="text-gray-500 line-through">{product.oldPrice}</span>
              )}
            </div>
            <div className="text-yellow-500 text-sm mt-1">
              {"⭐".repeat(Math.floor(product.rating))}{" "}
              {product.rating % 1 !== 0 && "⭐"}
            </div>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
