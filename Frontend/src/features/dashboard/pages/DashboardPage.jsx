// DashboardPage.jsx — resumen general del panel admin con estadísticas y actividad reciente
import { useMemo } from 'react'
import { Package, Tag, Star, AlertCircle, Users, TrendingUp, ShoppingBag, DollarSign } from 'lucide-react'
import useEstadisticas from '../hooks/useEstadisticas'
import { ventasMock, usuariosMock } from '../../../shared/utils/mockData'
import { formatearPrecio } from '../../../shared/utils/formatters'
import { obtenerClaseBadge } from '../../../shared/utils/badgeEstado'
import TarjetaDashboard from '../components/TarjetaDashboard'

const DashboardPage = () => {
  const estadisticas = useEstadisticas()

  // Cálculos de métricas derivadas — memoizados para evitar cómputo en cada render
  const { totalClientes, totalVentas, ultimasVentas } = useMemo(() => ({
    totalClientes: usuariosMock.filter(u => u.rol === 'cliente').length,
    totalVentas:   ventasMock.reduce((acum, venta) => acum + venta.total, 0),
    ultimasVentas: [...ventasMock]
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, 5),
  }), [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-marca-texto">Resumen general</h1>
        <p className="text-sm text-marca-textoSuave mt-1">Bienvenido al panel de J&P Periféricos</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <TarjetaDashboard titulo="Productos"    valor={estadisticas.totalProductos}     icono={Package}    />
        <TarjetaDashboard titulo="Categorías"   valor={estadisticas.totalCategorias}    icono={Tag}        color="text-blue-400" />
        <TarjetaDashboard titulo="Destacados"   valor={estadisticas.productosDestacados} icono={Star}      color="text-yellow-400" />
        <TarjetaDashboard titulo="Sin stock"    valor={estadisticas.productosSinStock}  icono={AlertCircle} color="text-red-400" />
        <TarjetaDashboard titulo="Clientes"     valor={totalClientes}                   icono={Users}      color="text-purple-400" />
        <TarjetaDashboard titulo="Ventas mes"   valor={ventasMock.length}               icono={ShoppingBag} color="text-green-400" />
        <TarjetaDashboard titulo="Total ventas" valor={totalVentas}                     icono={DollarSign} esPrecio />
        <TarjetaDashboard titulo="Precio prom." valor={estadisticas.precioPromedio}     icono={TrendingUp} esPrecio />
      </div>

      {/* Últimas ventas */}
      <div className="rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)]">
        <div className="border-b border-[var(--color-borde)] px-5 py-3">
          <h2 className="font-bold text-sm text-marca-texto">Últimas ventas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-borde)] text-left text-xs font-semibold uppercase tracking-wide text-marca-textoSuave">
                <th className="px-5 py-3">Orden</th>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Fecha</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {ultimasVentas.map(venta => (
                <tr key={venta.id} className="border-b border-[var(--color-borde)] last:border-0 hover:bg-[var(--color-fondo-alt)] transition">
                  <td className="px-5 py-3 font-mono text-xs text-marca-naranja">{venta.id}</td>
                  <td className="px-5 py-3 text-marca-texto">{venta.cliente}</td>
                  <td className="px-5 py-3 text-marca-textoSuave">{venta.fecha}</td>
                  <td className="px-5 py-3 font-bold text-marca-texto">{formatearPrecio(venta.total)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${obtenerClaseBadge(venta.estado)}`}>
                      {venta.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
