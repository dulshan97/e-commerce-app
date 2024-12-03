export type ProductCategory = 'Outerwear' | 'Tops' | 'Bottoms' | 'All';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
