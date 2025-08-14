'use client'

import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import styles from './Header.module.scss'
import { ShoppingCart, Menu, X } from 'lucide-react'

export default function Header() {
  const { cartItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isCartPage = pathname === '/cart'

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>خانه</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)}>محصولات</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>درباره من</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>نقشه من</Link>
        </nav>

        <div className={styles.actions}>
          {isCartPage && (
            <button className={styles.backBtn} onClick={() => router.push('/products')}>
              ⬅ بازگشت به محصولات
            </button>
          )}
          <Link href="/cart" className={styles.cartIcon}>
            <ShoppingCart />
            {cartItems.length > 0 && (
              <span className={styles.badge}>{cartItems.length}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
