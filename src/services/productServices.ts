import { Product } from "../models/product";
import lightweightHoodie from "../assets/images/productList/clothing1.png";
import { generateId } from "../Utils/idgenetrator";


// Utility for generating unique IDs


// Mock data service
export const ProductService = {
  getProducts: (): Product[] => [
    {
      id: generateId(),
      name: "Classic Denim Jacket",
      price: 129.99,
      description: "Vintage-inspired blue denim jacket with classic fit",
      category: "Outerwear",
      image: lightweightHoodie
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
