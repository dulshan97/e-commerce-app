import { Product } from "../models/product";
import lightweightHoodie1 from "../assets/images/productList/classiJacket1.png";
import outware2 from "../assets/images/productList/outware2.png";
import outware3 from "../assets/images/productList/outware3.png";
import outware4 from "../assets/images/productList/outware4.png";
import top1 from "../assets/images/productList/top1.png";
import top2 from "../assets/images/productList/top2.png";
import top3 from "../assets/images/productList/top3.png";
import top4 from "../assets/images/productList/top4.png";
import topfe1 from "../assets/images/productList/topfe1.png";
import bot1 from "../assets/images/productList/bottom1.png";
import bot2 from "../assets/images/productList/bottom2.png";


import { generateId } from "../Utils/idGenetrator";






export const ProductService = {
  getProducts: (): Product[] => [

    {
      id: generateId(),
      name: "Classic Denim Jacket",
      price: 129.99,
      description: "Vintage-inspired blue denim jacket with classic fit",
      category: "Outerwear",
      image: outware2
    },

    {
      id: generateId(),
      name: "Organic Cotton T-Shirt",
      price: 39.99,
      description: "Soft, breathable organic cotton basic tee",
      category: "Tops",
      image: top1
    },
    {
      id: generateId(),
      name: "Classic Denim Jacket",
      price: 129.99,
      description: "Vintage-inspired blue denim jacket with classic fit",
      category: "Outerwear",
      image: lightweightHoodie1
    },
    {
      id: generateId(),
      name: "Organic Cotton T-Shirt",
      price: 39.99,
      description: "Soft, breathable organic cotton basic tee",
      category: "Tops",
      image: top2
    },
    {
      id: generateId(),
      name: "Slim Fit Chinos",
      price: 89.99,
      description: "Tailored slim fit chinos in khaki",
      category: "Bottoms",
      image: topfe1
    },
    {
      id: generateId(),
      name: "Slim Fit Chinos",
      price: 89.99,
      description: "Tailored slim fit chinos in khaki",
      category: "Bottoms",
      image: bot1
    },
    {
      id: generateId(),
      name: "Slim Fit Chinos",
      price: 89.99,
      description: "Tailored slim fit chinos in khaki",
      category: "Bottoms",
      image: bot2
    },
    
    {
      id: generateId(),
      name: "Lightweight Hoodie",
      price: 59.99,
      description: "Comfortable cotton blend hoodie",
      category: "Tops",
      image: top3
    },
    {
      id: generateId(),
      name: "Lightweight Hoodie",
      price: 59.99,
      description: "Comfortable cotton blend hoodie",
      category: "Tops",
      image: top4
    },
    {
      id: generateId(),
      name: "Classic Denim Jacket",
      price: 129.99,
      description: "Vintage-inspired blue denim jacket with classic fit",
      category: "Outerwear",
      image: outware3
    },
    {
      id: generateId(),
      name: "Classic Denim Jacket",
      price: 129.99,
      description: "Vintage-inspired blue denim jacket with classic fit",
      category: "Outerwear",
      image: outware4
    },
  ]
};
