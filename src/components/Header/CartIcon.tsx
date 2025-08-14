'use client'

import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'

export default function CartIcon() {
  const { cartItems } = useCart()
  const router = useRouter()

  // تعداد کل آیتم‌ها (می‌تونی به تعداد محصولات یا جمع quantity نگاه کنی)
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <button
      onClick={() => router.push('/cart')}
      style={{
        position: 'relative',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
      aria-label="سبد خرید"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width={24}
        height={24}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4"
        />
        <circle cx="7" cy="21" r="2" />
        <circle cx="17" cy="21" r="2" />
      </svg>

      {totalCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '0 6px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            minWidth: '20px',
            textAlign: 'center',
            lineHeight: '20px',
          }}
        >
          {totalCount}
        </span>
      )}
    </button>
  )
}
