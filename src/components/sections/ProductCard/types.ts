// components/ui/ProductCard/types.ts

import { Product } from '@/types/product'

export interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}
