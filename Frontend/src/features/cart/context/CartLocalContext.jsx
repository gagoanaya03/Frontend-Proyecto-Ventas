// cart/context/CartLocalContext.jsx — estado local de la feature cart (UI, pasos de checkout)
import { createContext, useState, useContext } from 'react'

const CartLocalContext = createContext(null)

export const CartLocalProvider = ({ children }) => {
  const [pasoActual, setPasoActual] = useState(1) // paso del proceso de checkout: 1=carrito, 2=resumen, 3=confirmación

  const valor = { pasoActual, setPasoActual }

  return <CartLocalContext.Provider value={valor}>{children}</CartLocalContext.Provider>
}

export const useCartLocal = () => {
  const ctx = useContext(CartLocalContext)
  if (!ctx) throw new Error('useCartLocal debe usarse dentro de <CartLocalProvider>')
  return ctx
}

export default CartLocalContext
