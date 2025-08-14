// components/sections/ProductList/types.ts

import { Product } from '@/types/product'

export interface ProductListProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}
