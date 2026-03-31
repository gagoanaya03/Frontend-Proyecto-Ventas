// cart/components/ItemCarrito.jsx — card de un producto dentro de la página del carrito
import { useCallback } from 'react'
import { Trash2, Plus, Minus } from 'lucide-react'
import useCarrito from '../../../shared/hooks/useCarrito'
import { formatearPrecio, truncarTexto } from '../../../shared/utils/formatters'
import estilos from '../styles/cart.module.css'

const ItemCarrito = ({ item }) => {
  const { actualizarCantidad, eliminarDelCarrito } = useCarrito()

  const subir  = useCallback(() => actualizarCantidad(item.id, item.cantidad + 1), [item, actualizarCantidad])
  const bajar  = useCallback(() => actualizarCantidad(item.id, item.cantidad - 1), [item, actualizarCantidad])
  const borrar = useCallback(() => eliminarDelCarrito(item.id), [item.id, eliminarDelCarrito])

  return (
    <div className={estilos.itemCarrito}>
      <img
        src={item.imagen}
        alt={item.nombre}
        className="h-20 w-20 rounded-lg object-cover shrink-0"
      />
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="text-sm font-bold text-marca-texto leading-snug">
          {truncarTexto(item.nombre, 60)}
        </p>
        <p className="text-xs text-marca-textoSuave">{item.marca}</p>
        <p className="text-base font-extrabold text-marca-naranja">
          {formatearPrecio(item.precio * item.cantidad)}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <button onClick={bajar}  className="btn-cantidad" aria-label="Disminuir"><Minus size={12} /></button>
          <span className="w-6 text-center text-sm font-bold text-marca-texto">{item.cantidad}</span>
          <button onClick={subir}  className="btn-cantidad" aria-label="Aumentar"><Plus size={12} /></button>
          <button onClick={borrar} className="ml-auto text-marca-textoSuave hover:text-red-500 transition" aria-label="Eliminar">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemCarrito
