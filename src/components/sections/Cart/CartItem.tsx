'use client'

import Image from 'next/image'
import { Product } from '@/types/product'
import { useCartActions } from '@/hooks/useCart'
import styles from './CartItem.module.scss'

interface Props {
  product: Product & { quantity: number }
}

export default function CartItem({ product }: Props) {
  const { addToCart, removeFromCart } = useCartActions()

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image 
          src={product.image} 
          alt={product.title} 
          width={80} 
          height={80} 
          objectFit="contain" 
          style={{ objectFit: 'contain' }} 
        />
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>{product.price.toLocaleString()} تومان</p>
        <p className={styles.quantity}>تعداد: {product.quantity}</p>
      </div>

      <div className={styles.buttons}>
        <button
          onClick={() => addToCart(product)}
          className={`${styles.btn} ${styles.btnAdd}`}
          aria-label="افزودن تعداد"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(product.id)}
          className={`${styles.btn} ${styles.btnRemove}`}
          aria-label="حذف محصول"
        >
          حذف
        </button>
      </div>
    </div>
  )
}
