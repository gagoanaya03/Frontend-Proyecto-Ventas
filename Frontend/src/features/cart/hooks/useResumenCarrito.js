// useResumenCarrito.js — calcula métricas del carrito para el resumen de compra
import { useMemo } from 'react'
import useCarrito from '../../../shared/hooks/useCarrito'
import { formatearPrecio } from '../../../shared/utils/formatters'

const TASA_IGV = 0.18 // 18% de IGV

const useResumenCarrito = () => {
  const { items, totalPrecio } = useCarrito()

  const resumen = useMemo(() => {
    const subtotal = totalPrecio
    const igv      = subtotal * TASA_IGV
    const total    = subtotal + igv
    return {
      subtotal,
      igv,
      total,
      subtotalFormateado: formatearPrecio(subtotal),
      igvFormateado:      formatearPrecio(igv),
      totalFormateado:    formatearPrecio(total),
      cantidadItems:      items.length,
    }
  }, [items, totalPrecio])

  return resumen
}

export default useResumenCarrito
