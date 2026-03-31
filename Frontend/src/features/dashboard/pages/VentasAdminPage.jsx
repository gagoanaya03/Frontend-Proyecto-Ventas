// VentasAdminPage.jsx — historial completo de ventas con detalle expandible
import { useState, useMemo } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { ventasMock } from '../../../shared/utils/mockData'
import { formatearPrecio } from '../../../shared/utils/formatters'

import { obtenerClaseBadge } from '../../../shared/utils/badgeEstado'

const VentasAdminPage = () => {
  const [expandida, setExpandida] = useState(null)

  // Ordenar ventas por fecha descendente (más recientes primero) — memoizado
  const ventas = useMemo(
    () => [...ventasMock].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)),
    []
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-marca-texto">Historial de ventas</h1>
        <span className="text-sm text-marca-textoSuave">{ventas.length} órdenes</span>
      </div>

      <div className="rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)] overflow-hidden">
        {ventas.map(venta => (
          <div key={venta.id} className="border-b border-[var(--color-borde)] last:border-0">
            <button
              onClick={() => setExpandida(prev => prev === venta.id ? null : venta.id)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-[var(--color-fondo-alt)] transition"
            >
              <span className="w-24 font-mono text-xs text-marca-naranja">{venta.id}</span>
              <span className="flex-1 text-sm font-semibold text-marca-texto">{venta.cliente}</span>
              <span className="text-xs text-marca-textoSuave">{venta.fecha}</span>
              <span className="w-24 text-right font-bold text-marca-texto">{formatearPrecio(venta.total)}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${obtenerClaseBadge(venta.estado)}`}>
                {venta.estado}
              </span>
              <span className="text-marca-textoSuave">
                {expandida === venta.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
            </button>

            {expandida === venta.id && (
              <div className="border-t border-[var(--color-borde)] bg-[var(--color-fondo-alt)] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-marca-textoSuave mb-3">
                  Detalle del pedido
                </p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-marca-textoSuave">
                      <th className="pb-2">Producto</th>
                      <th className="pb-2 text-right">Cant.</th>
                      <th className="pb-2 text-right">Precio</th>
                      <th className="pb-2 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {venta.items.map((item, indice) => (
                      <tr key={indice} className="border-t border-[var(--color-borde)]">
                        <td className="py-2 text-marca-texto">{item.nombre}</td>
                        <td className="py-2 text-right text-marca-textoSuave">{item.cantidad}</td>
                        <td className="py-2 text-right text-marca-textoSuave">{formatearPrecio(item.precio)}</td>
                        <td className="py-2 text-right font-bold text-marca-texto">{formatearPrecio(item.precio * item.cantidad)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-[var(--color-borde)]">
                      <td colSpan={3} className="pt-2 text-right font-bold text-marca-texto">Total:</td>
                      <td className="pt-2 text-right font-extrabold text-marca-naranja">{formatearPrecio(venta.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VentasAdminPage
