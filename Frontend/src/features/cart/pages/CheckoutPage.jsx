// CheckoutPage.jsx — Formulario de compra (Borrador inicial para resolver error de carga)
import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowLeft } from 'lucide-react'

const CheckoutPage = () => {
  return (
    <div className="contenedor py-10">
      <div className="flex items-center gap-2 mb-8">
        <Link to="/cart" className="flex items-center gap-1 text-marca-naranja hover:underline text-sm font-semibold">
          <ArrowLeft size={16} /> Volver al carrito
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Formulario */}
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-2xl border border-[var(--color-borde)] bg-[var(--color-superficie)] p-6 shadow-sm">
            <h2 className="text-xl font-bold text-marca-texto mb-6 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-marca-naranja text-xs text-[var(--color-texto-sobre-acento)]">1</span>
              Datos de envío
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" placeholder="Nombre completo" className="campo-admin" />
              <input type="text" placeholder="DNI / Documento" className="campo-admin" />
              <input type="email" placeholder="Correo electrónico" className="campo-admin" />
              <input type="tel" placeholder="Teléfono de contacto" className="campo-admin" />
              <div className="sm:col-span-2 border-t border-[var(--color-borde)] pt-4 mt-2">
                 <input type="text" placeholder="Dirección exacta (Calle, número, referencia)" className="campo-admin" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--color-borde)] bg-[var(--color-superficie)] p-6 shadow-sm opacity-50 cursor-not-allowed">
            <h2 className="text-xl font-bold text-marca-texto mb-6 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-marca-naranja text-xs text-[var(--color-texto-sobre-acento)]">2</span>
              Método de pago
            </h2>
            <p className="text-sm text-marca-textoSuave italic">Complete el paso anterior para continuar...</p>
          </section>
        </div>

        {/* Resumen lateral */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--color-borde)] bg-[var(--color-superficie)] p-6 shadow-sm sticky top-24">
            <h3 className="text-lg font-extrabold text-marca-texto mb-4 flex items-center gap-2">
              <ShoppingBag size={20} className="text-marca-naranja" />
              Resumen del pedido
            </h3>
            <div className="space-y-3 py-4 border-y border-[var(--color-borde)]">
              <div className="flex justify-between text-sm text-marca-textoSuave">
                <span>Subtotal</span>
                <span>S/ 0.00</span>
              </div>
              <div className="flex justify-between text-sm text-marca-textoSuave">
                <span>Envío</span>
                <span className="text-[var(--color-exito)] font-semibold">Gratis</span>
              </div>
            </div>
            <div className="flex justify-between py-4 text-xl font-extrabold text-marca-texto">
              <span>Total</span>
              <span>S/ 0.00</span>
            </div>
            <button className="w-full rounded-xl bg-marca-naranja py-4 text-sm font-bold text-[var(--color-texto-sobre-acento)] transition hover:bg-marca-naranjaOsc shadow-lg shadow-orange-500/20 uppercase tracking-wider">
              Confirmar pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
