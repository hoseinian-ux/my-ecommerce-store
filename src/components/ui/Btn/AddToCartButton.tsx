'use client'

import { Product } from '@/types/product'
import { useCartActions } from '@/hooks/useCart'
import styles from './AddToCartButton.module.scss'
interface Props {
  product: Product
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCartActions()

  return (
    <button
      onClick={() => addToCart(product)}
      className= {styles.button}
    >
      افزودن به سبد خرید
    </button>
  )
}
