// cart/pages/CartPage.jsx — página completa del carrito con lista de items y resumen
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import useCarrito from '../../../shared/hooks/useCarrito'
import ItemCarrito from '../components/ItemCarrito'
import ResumenCompra from '../components/ResumenCompra'
import estilos from '../styles/cart.module.css'

const CartPage = () => {
  const { items } = useCarrito()
  const navegar   = useNavigate()

  const manejarProceder = useCallback(() => {
    navegar('/checkout') // próxima fase
  }, [navegar])

  if (items.length === 0) return (
    <div className="contenedor py-20 flex flex-col items-center gap-4 text-marca-textoSuave">
      <ShoppingBag size={72} strokeWidth={1} />
      <h1 className="text-xl font-bold text-marca-texto">Tu carrito está vacío</h1>
      <button
        onClick={() => navegar('/products')}
        className="rounded-xl bg-marca-naranja px-5 py-2.5 text-sm font-bold text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc"
      >
        Explorar productos
      </button>
    </div>
  )

  return (
    <div className="contenedor py-6">
      <h1 className="text-2xl font-extrabold text-marca-texto mb-6">Mi carrito</h1>
      <div className={estilos.layoutCarrito}>
        <ul className="space-y-3">
          {items.map(item => (
            <li key={item.id}>
              <ItemCarrito item={item} />
            </li>
          ))}
        </ul>
        <ResumenCompra onProceder={manejarProceder} />
      </div>
    </div>
  )
}

export default CartPage
