// LoginPage.jsx — formulario de login con redirección por rol post-autenticación
// Diseño: fondo azul fijo (#2C1FF1) + card blanca, inputs claros con texto oscuro.
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useCallback } from 'react'
import useAuth from '../../../shared/hooks/useAuth'

/* ── Estilos de card y inputs en línea para independencia del tema ── */
const S = {
  pagina: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#2C1FF1',
    padding: '24px 16px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '40px 32px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
  },
  titulo: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: '28px',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#334155',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '0.9rem',
    borderRadius: '8px',
    border: '1.5px solid #CBD5E1',
    background: '#F8FAFC',
    color: '#1E293B',
    outline: 'none',
    transition: 'border-color 150ms, box-shadow 150ms',
    boxSizing: 'border-box',
  },
  btnPrimario: {
    width: '100%',
    padding: '13px',
    borderRadius: '10px',
    border: 'none',
    background: '#F97316',
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background 150ms',
    marginTop: '4px',
  },
  error: {
    background: '#FEE2E2',
    border: '1px solid #FCA5A5',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '0.85rem',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: '16px',
  },
  credenciales: {
    marginTop: '20px',
    background: '#F1F5F9',
    borderRadius: '8px',
    padding: '12px 14px',
    fontSize: '0.78rem',
    color: '#64748B',
  },
}

const LoginPage = () => {
  const { iniciarSesion, cargando } = useAuth()
  const navegar   = useNavigate()
  const ubicacion = useLocation()
  const destino   = ubicacion.state?.desde ?? null

  const [correo,     setCorreo]     = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error,      setError]      = useState('')
  const [focusedInput, setFocusedInput] = useState(null)

  const estiloInput = (id) => ({
    ...S.input,
    borderColor: focusedInput === id ? '#2C1FF1' : '#CBD5E1',
    boxShadow: focusedInput === id ? '0 0 0 3px rgba(44,31,241,0.15)' : 'none',
  })

  const manejarSubmit = useCallback(async (e) => {
    e.preventDefault()
    setError('')
    try {
      const resultado = await iniciarSesion(correo, contrasena)
      if (!resultado.exito) { setError(resultado.mensaje); return }
      const esAdmin = resultado.usuario?.rol === 'admin'
      navegar(destino ?? (esAdmin ? '/dashboard/admin' : '/'), { replace: true })
    } catch {
      setError('Error al conectar con el servidor. Inténtalo de nuevo.')
    }
  }, [correo, contrasena, iniciarSesion, navegar, destino])

  return (
    <div style={S.pagina}>
      <div style={S.card}>
        <h1 style={S.titulo}>Iniciar sesión</h1>

        {error && <div style={S.error}>{error}</div>}

        <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="input-correo" style={S.label}>Correo electrónico</label>
            <input
              id="input-correo"
              type="email"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu@correo.com"
              style={estiloInput('correo')}
              onFocus={() => setFocusedInput('correo')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          <div>
            <label htmlFor="input-contrasena" style={S.label}>Contraseña</label>
            <input
              id="input-contrasena"
              type="password"
              required
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="••••••••"
              style={estiloInput('contrasena')}
              onFocus={() => setFocusedInput('contrasena')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          <div style={{ textAlign: 'right', marginTop: '-8px' }}>
            <Link to="/recover" style={{ fontSize: '0.8rem', color: '#F97316', textDecoration: 'none', fontWeight: 600 }}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            id="btn-iniciar-sesion"
            type="submit"
            disabled={cargando}
            style={{
              ...S.btnPrimario,
              opacity: cargando ? 0.65 : 1,
              cursor: cargando ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => !cargando && (e.currentTarget.style.background = '#EA580C')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#F97316')}
          >
            {cargando ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>

        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.875rem', color: '#64748B' }}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={{ color: '#F97316', fontWeight: 700, textDecoration: 'none' }}>
            Regístrate
          </Link>
        </p>

        <div style={S.credenciales}>
          <p style={{ fontWeight: 700, marginBottom: '6px', color: '#475569' }}>Credenciales de prueba:</p>
          <p>👑 admin@jyp.com / admin123</p>
          <p>🛒 juan@example.com / cliente123</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
