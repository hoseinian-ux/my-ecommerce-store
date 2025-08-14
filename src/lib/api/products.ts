// lib/api/products.ts

import { Product } from '@/types/product'

export async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('خطا در دریافت محصولات')
  }

  const data: Product[] = await res.json()
  return data
}
