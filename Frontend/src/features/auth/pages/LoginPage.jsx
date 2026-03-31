// LoginPage.jsx — formulario de login con redirección por rol post-autenticación
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useCallback } from 'react'
import useAuth from '../../../shared/hooks/useAuth'

const LoginPage = () => {
  const { iniciarSesion, cargando } = useAuth()
  const navegar   = useNavigate()
  const ubicacion = useLocation()
  const destino   = ubicacion.state?.desde ?? null // ruta guardada antes de ser redirigido

  const [correo,    setCorreo]    = useState('')
  const [contrasena,setContrasena]= useState('')
  const [error,     setError]     = useState('')

  const manejarSubmit = useCallback(async (e) => {
    e.preventDefault()
    setError('')

    try {
      const resultado = await iniciarSesion(correo, contrasena)
      if (!resultado.exito) {
        setError(resultado.mensaje)
        return
      }
      const esAdmin = resultado.usuario?.rol === 'admin'
      // Redirige al destino guardado si existe; si no, según el rol
      navegar(destino ?? (esAdmin ? '/dashboard/admin' : '/'), { replace: true })
    } catch (err) {
      setError('Error al conectar con el servidor. Inténtalo de nuevo.')
    }
  }, [correo, contrasena, iniciarSesion, navegar, destino])

  return (
    <div className="flex min-h-screen items-center justify-center bg-marca-azul px-4">
      <div className="w-full max-w-sm rounded-2xl border border-marca-azulClaro bg-marca-azulMedio p-8 shadow-2xl">
        <h1 className="mb-6 text-2xl font-extrabold text-marca-texto text-center">
          Iniciar sesión
        </h1>

        {error && (
          <p className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        <form onSubmit={manejarSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-marca-texto">
              Correo electrónico
            </label>
            <input
              id="input-correo"
              type="email"
              required
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full rounded-lg border border-marca-azulClaro bg-marca-azul px-4 py-2.5 text-sm text-marca-texto placeholder:text-marca-textoSuave focus:border-marca-naranja focus:outline-none transition"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-marca-texto">
              Contraseña
            </label>
            <input
              id="input-contrasena"
              type="password"
              required
              value={contrasena}
              onChange={e => setContrasena(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-marca-azulClaro bg-marca-azul px-4 py-2.5 text-sm text-marca-texto placeholder:text-marca-textoSuave focus:border-marca-naranja focus:outline-none transition"
            />
          </div>
          <div className="flex justify-end">
            <Link to="/recover" className="text-xs text-marca-naranja hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <button
            id="btn-iniciar-sesion"
            type="submit"
            disabled={cargando}
            className="w-full rounded-xl bg-marca-naranja py-3 text-sm font-bold text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc disabled:opacity-60"
          >
            {cargando ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-marca-textoSuave">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-marca-naranja font-semibold hover:underline">
            Regístrate
          </Link>
        </p>

        <div className="mt-4 rounded-lg bg-marca-azul/50 p-3 text-xs text-marca-textoSuave space-y-1">
          <p className="font-semibold">Credenciales de prueba:</p>
          <p>👑 admin@jyp.com / admin123</p>
          <p>🛒 cliente@demo.com / demo123</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
