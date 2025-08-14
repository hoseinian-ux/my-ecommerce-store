'use client'

import { useCart } from '@/hooks/useCart'
import CartItem from '@/components/sections/Cart/CartItem'
import { useRouter } from 'next/navigation'
import styles from './CartPage.module.scss'

export default function CartPage() {
  const { cartItems, totalPrice } = useCart()
  const router = useRouter()

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>سبد خرید</h2>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>سبد خرید شما خالی است.</p>
      ) : (
        <>
          <div className={styles.items}>
            {cartItems.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </div>

          <div className={styles.total}>
            جمع کل: {totalPrice.toLocaleString()} تومان
          </div>

          <button
            onClick={() => router.push('/checkout')}
            className={styles.checkoutBtn}
          >
            ثبت سفارش
          </button>
        </>
      )}
    </div>
  )
}
