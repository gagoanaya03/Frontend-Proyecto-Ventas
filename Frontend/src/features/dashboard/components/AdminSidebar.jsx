// AdminSidebar.jsx — barra lateral fija del panel de administración
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Package, Tag, Users, ShoppingBag,
  Image, Ticket, Settings, LogOut, Cpu,
} from 'lucide-react'
import useAuth from '../../../shared/hooks/useAuth'

const MENU = [
  { a: '/dashboard/admin',               icono: LayoutDashboard, label: 'Dashboard'     },
  { a: '/dashboard/admin/productos',     icono: Package,         label: 'Productos'     },
  { a: '/dashboard/admin/categorias',    icono: Tag,             label: 'Categorías'    },
  { a: '/dashboard/admin/usuarios',      icono: Users,           label: 'Usuarios'      },
  { a: '/dashboard/admin/ventas',        icono: ShoppingBag,     label: 'Ventas'        },
  { a: '/dashboard/admin/banners',       icono: Image,           label: 'Banners'       },
  { a: '/dashboard/admin/cupones',       icono: Ticket,          label: 'Cupones'       },
  { a: '/dashboard/admin/configuracion', icono: Settings,        label: 'Configuración' },
]

const estiloActivo = 'bg-marca-naranja/10 text-marca-naranja font-bold border-l-2 border-marca-naranja'
const estiloBase   = 'text-marca-textoSuave hover:bg-[var(--color-fondo-alt)] hover:text-marca-texto'

const AdminSidebar = () => {
  const { cerrarSesion, usuario } = useAuth()
  const navegar = useNavigate()

  const manejarSalir = () => {
    cerrarSesion()
    navegar('/login')
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-[var(--color-borde)] bg-[var(--color-superficie)]">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-[var(--color-borde)] px-4">
        <Cpu size={22} className="text-marca-naranja" />
        <span className="font-extrabold text-sm text-marca-texto leading-tight">
          J&P <span className="text-marca-naranja">Admin</span>
        </span>
      </div>

      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {MENU.map(({ a, icono: Icono, label }) => (
          <NavLink
            key={a}
            to={a}
            end={a === '/dashboard/admin'} // solo "Dashboard" activo exacto
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive ? estiloActivo : estiloBase}`
            }
          >
            <Icono size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Usuario + cerrar sesión */}
      <div className="border-t border-[var(--color-borde)] p-3 space-y-2">
        <p className="truncate px-1 text-xs font-semibold text-marca-texto">{usuario?.nombre}</p>
        <p className="truncate px-1 text-[10px] text-marca-textoSuave">{usuario?.correo}</p>
        <button
          onClick={manejarSalir}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-marca-textoSuave transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={14} /> Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
