'use client'

import { createContext, useState, useMemo } from 'react'
import { Product } from '@/types/product'

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  totalPrice: number
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === id)
      if (item?.quantity && item.quantity > 1) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
      } else {
        return prev.filter((i) => i.id !== id)
      }
    })
  }

  const clearCart = () => setCartItems([])

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}
