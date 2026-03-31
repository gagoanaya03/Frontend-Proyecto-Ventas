// features/auth/pages/RecoverPage.jsx — recuperación de contraseña con manejo de error
import { Link } from 'react-router-dom'
import { useState, useCallback } from 'react'

const RecoverPage = () => {
  const [correo,  setCorreo]  = useState('')
  const [enviado, setEnviado] = useState(false)
  const [error,   setError]   = useState('')

  // Simula el envío del correo de recuperación al backend
  const manejarSubmit = useCallback(async (e) => {
    e.preventDefault()
    setError('')
    try {
      await new Promise((resolver) => setTimeout(resolver, 800))
      setEnviado(true)
    } catch {
      setError('No fue posible enviar el correo. Inténtalo de nuevo.')
    }
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-marca-azul px-4">
      <div className="w-full max-w-sm rounded-2xl border border-marca-azulClaro bg-marca-azulMedio p-8 shadow-2xl">
        <h1 className="mb-2 text-2xl font-extrabold text-marca-texto text-center">
          Recuperar contraseña
        </h1>
        <p className="mb-6 text-center text-sm text-marca-textoSuave">
          Te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {error && (
          <p
            className="mb-4 rounded-lg border px-3 py-2 text-sm text-center font-semibold"
            style={{
              color:           'var(--color-error)',
              backgroundColor: 'var(--color-error-suave)',
              borderColor:     'var(--color-error-borde)',
            }}
          >
            {error}
          </p>
        )}

        {enviado ? (
          <div
            className="rounded-xl border px-4 py-6 text-center space-y-2"
            style={{
              color:           'var(--color-exito)',
              backgroundColor: 'var(--color-exito-suave)',
              borderColor:     'var(--color-exito-borde)',
            }}
          >
            <p className="font-bold">¡Correo enviado!</p>
            <p className="text-sm text-marca-textoSuave">
              Revisa tu bandeja de entrada. (Simulado)
            </p>
            <Link
              to="/login"
              className="inline-block mt-2 text-sm font-semibold hover:underline"
              style={{ color: 'var(--color-exito)' }}
            >
              Volver al inicio de sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={manejarSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-marca-texto">
                Correo electrónico
              </label>
              <input
                id="input-correo-recover"
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full rounded-lg border border-marca-azulClaro bg-marca-azul px-4 py-2.5 text-sm text-marca-texto placeholder:text-marca-textoSuave focus:border-marca-naranja focus:outline-none transition"
              />
            </div>
            <button
              id="btn-recuperar"
              type="submit"
              className="w-full rounded-xl bg-marca-naranja py-3 text-sm font-bold text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc"
            >
              Enviar enlace
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-marca-textoSuave">
          <Link to="/login" className="text-marca-naranja font-semibold hover:underline">
            ← Volver al inicio de sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RecoverPage
