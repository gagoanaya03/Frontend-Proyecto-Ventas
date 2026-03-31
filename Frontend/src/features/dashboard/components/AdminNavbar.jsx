// AdminNavbar.jsx — barra superior del panel admin con búsqueda, perfil y controles
import { Bell, Settings, Sun, Moon } from 'lucide-react'
import useTema from '../../../shared/hooks/useTema'
import useAuth from '../../../shared/hooks/useAuth'

const AdminNavbar = () => {
  const { esModoOscuro, alternarTema } = useTema()
  const { usuario } = useAuth()

  return (
    <header className="flex h-14 items-center justify-between border-b border-[var(--color-borde)] bg-[var(--color-superficie)] px-6">
      {/* Título dinámico — se podría leer del contexto de la ruta activa */}
      <p className="text-sm font-semibold text-marca-textoSuave">
        Panel de Administración
      </p>

      {/* Controles del lado derecho */}
      <div className="flex items-center gap-3">
        {/* Toggle tema */}
        <button
          id="admin-toggle-tema"
          aria-label="Cambiar tema"
          onClick={alternarTema}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-marca-textoSuave transition hover:bg-[var(--color-fondo-alt)] hover:text-marca-naranja"
        >
          {esModoOscuro ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notificaciones */}
        <button
          aria-label="Notificaciones"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-marca-textoSuave transition hover:bg-[var(--color-fondo-alt)] hover:text-marca-naranja"
        >
          <Bell size={17} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-marca-naranja" /> {/* badge fijo */}
        </button>

        {/* Perfil del admin */}
        <div className="flex items-center gap-2 rounded-lg border border-[var(--color-borde)] px-3 py-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-marca-naranja text-xs font-bold text-[var(--color-superficie)]">
            {usuario?.nombre?.charAt(0) ?? 'A'} {/* inicial del nombre */}
          </div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-marca-texto">{usuario?.nombre}</p>
            <p className="text-[10px] text-marca-naranja font-semibold uppercase tracking-wide">Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar
