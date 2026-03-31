import { formatearPrecio } from '../../../shared/utils/formatters'

// Tarjeta de estadística individual
const TarjetaDashboard = ({ titulo, valor, icono: Icono, color = 'text-marca-naranja', esPrecio = false }) => (
  <div className="rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)] p-5">
    <div className="flex items-start justify-between mb-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-marca-textoSuave">{titulo}</p>
      <Icono size={18} className={color} />
    </div>
    <p className="text-2xl font-extrabold text-marca-texto">
      {esPrecio ? formatearPrecio(valor) : valor}
    </p>
  </div>
)

export default TarjetaDashboard
