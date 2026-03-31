// cart/components/ResumenCompra.jsx — panel de resumen con subtotal, IGV y total
import useResumenCarrito from '../hooks/useResumenCarrito'
import useCarrito from '../../../shared/hooks/useCarrito'

const ResumenCompra = ({ onProceder }) => {
  const { subtotalFormateado, igvFormateado, totalFormateado, cantidadItems } = useResumenCarrito()
  const { vaciarCarrito } = useCarrito()

  return (
    <div className="rounded-xl border border-marca-azulClaro bg-marca-azulMedio p-5 sticky top-20 space-y-4">
      <h3 className="font-bold text-marca-texto text-base">Resumen del pedido</h3>
      <div className="space-y-2 text-sm border-b border-marca-azulClaro pb-4">
        <div className="flex justify-between text-marca-textoSuave">
          <span>Subtotal ({cantidadItems} {cantidadItems === 1 ? 'producto' : 'productos'})</span>
          <span>{subtotalFormateado}</span>
        </div>
        <div className="flex justify-between text-marca-textoSuave">
          <span>IGV (18%)</span>
          <span>{igvFormateado}</span>
        </div>
      </div>
      <div className="flex justify-between font-extrabold text-marca-texto">
        <span>Total</span>
        <span className="text-marca-naranja text-lg">{totalFormateado}</span>
      </div>
      <button
        id="btn-proceder-pedido"
        onClick={onProceder}
        className="w-full rounded-xl bg-marca-naranja py-3 text-sm font-bold text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc"
      >
        Proceder con el pedido
      </button>
      <button
        onClick={vaciarCarrito}
        className="w-full text-xs text-marca-textoSuave transition hover:text-red-400"
      >
        Vaciar carrito
      </button>
    </div>
  )
}

export default ResumenCompra
