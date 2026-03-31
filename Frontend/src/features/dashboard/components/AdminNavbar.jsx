// AdminNavbar.jsx — barra superior del panel admin con búsqueda, perfil y controles
// En modo claro: fondo azul (#2C1FF1) con íconos/texto blancos
// En modo oscuro: fondo superficie neutro (sin cambio)
import { Bell, Sun, Moon } from 'lucide-react'
import useTema from '../../../shared/hooks/useTema'
import useAuth from '../../../shared/hooks/useAuth'

const AdminNavbar = () => {
  const { esModoOscuro, alternarTema } = useTema()
  const { usuario } = useAuth()

  /* Estilos condicionales por tema */
  const headerStyle = !esModoOscuro ? {
    background: '#2C1FF1',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
  } : {}

  const textoSuaveStyle = !esModoOscuro ? { color: 'rgba(255,255,255,0.7)' } : {}
  const textoStyle      = !esModoOscuro ? { color: '#fff' } : {}
  const iconoStyle      = !esModoOscuro ? { color: 'rgba(255,255,255,0.85)' } : {}
  const btnStyle        = !esModoOscuro
    ? 'flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/15'
    : 'flex h-8 w-8 items-center justify-center rounded-lg text-marca-textoSuave transition hover:bg-[var(--color-fondo-alt)] hover:text-marca-naranja'
  const badgeContainerStyle = !esModoOscuro
    ? 'flex items-center gap-2 rounded-lg px-3 py-1.5 border border-white/20'
    : 'flex items-center gap-2 rounded-lg border border-[var(--color-borde)] px-3 py-1.5'

  return (
    <header
      className={`flex h-14 items-center justify-between px-6 ${
        esModoOscuro ? 'border-b border-[var(--color-borde)] bg-[var(--color-superficie)]' : ''
      }`}
      style={headerStyle}
    >
      {/* Título dinámico */}
      <p className="text-sm font-semibold" style={textoSuaveStyle}>
        Panel de Administración
      </p>

      {/* Controles del lado derecho */}
      <div className="flex items-center gap-3">

        {/* Toggle tema */}
        <button
          id="admin-toggle-tema"
          aria-label="Cambiar tema"
          onClick={alternarTema}
          className={btnStyle}
          style={iconoStyle}
        >
          {esModoOscuro ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notificaciones */}
        <button
          aria-label="Notificaciones"
          className={`relative ${btnStyle}`}
          style={iconoStyle}
        >
          <Bell size={17} />
          <span
            className="absolute right-1 top-1 h-2 w-2 rounded-full bg-marca-naranja"
          />
        </button>

        {/* Perfil del admin */}
        <div className={badgeContainerStyle}>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-marca-naranja text-xs font-bold text-white">
            {usuario?.nombre?.charAt(0) ?? 'A'}
          </div>
          <div className="leading-tight">
            <p className="text-xs font-bold" style={textoStyle}>
              {usuario?.nombre}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-marca-naranja">
              Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar
