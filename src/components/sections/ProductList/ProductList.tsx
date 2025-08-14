'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import ProductCard from '../ProductCard/ProductCard'
import styles from './ProductList.module.scss'

interface Props {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  const [search, setSearch] = useState('')

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.container}>
        <p className={styles.p}> محصول مورد نظر خود را جستجو کنید:</p>
      <input
        type="text"
        placeholder="جستجوی محصول..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {filteredProducts.length === 0 ? (
        <p className={styles.noResult}>محصولی با این عنوان پیدا نشد.</p>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
