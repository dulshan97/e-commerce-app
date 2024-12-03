
import { useMemo, useState } from "react";
import { ProductService } from "../../services/productServices";
import { Product } from "../../models/product";
import ProductCard from "./productCard";
import { useCart } from "../../context/cartContext";

interface ProductListProps {
  searchTerm: string;
  selectedCategory: string;
}

const ProductList: React.FC<ProductListProps> = ({
  searchTerm,
  selectedCategory
}) => {

  const [products] = useState<Product[]>(ProductService.getProducts());
  
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);

  console.log("favourite", favoriteProducts)

  const { addToCart } = useCart();

  const filteredProducts = useMemo(
    () =>
      products.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory === 'All' || product.category === selectedCategory)
      ),
    [products, searchTerm, selectedCategory]
  );

  const toggleFavorite = (productId: string) => {
    setFavoriteProducts(current =>
      current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId]
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-8">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favoriteProducts.includes(product.id)}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;