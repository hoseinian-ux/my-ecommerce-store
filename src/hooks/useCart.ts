// hooks/useCart.ts
import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside a CartProvider')
  return context
}

export const useCartActions = () => {
  const { addToCart, removeFromCart, clearCart } = useCart()
  return { addToCart, removeFromCart, clearCart }
}
