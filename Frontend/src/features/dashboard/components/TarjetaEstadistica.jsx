// dashboard/components/TarjetaEstadistica.jsx — card con métrica individual del panel admin
import estilos from '../styles/dashboard.module.css'
import { formatearPrecio } from '../../../shared/utils/formatters'

const TarjetaEstadistica = ({ titulo, valor, icono: Icono, esPrecio = false }) => (
  <div className={estilos.tarjetaEstadistica}>
    <div className="flex items-start justify-between">
      <p className="text-xs font-semibold uppercase tracking-wider text-marca-textoSuave">
        {titulo}
      </p>
      {Icono && <Icono size={18} className="text-marca-naranja" />}
    </div>
    <p className="mt-3 text-2xl font-extrabold text-marca-texto">
      {esPrecio ? formatearPrecio(valor) : valor}
    </p>
  </div>
)

export default TarjetaEstadistica
