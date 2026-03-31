// features/auth/pages/RegisterPage.jsx
// Página de registro de nuevos usuarios.

import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import useAuth from '../../../shared/hooks/useAuth';

const RegisterPage = () => {
  const { registrar, cargando } = useAuth();
  const navegar = useNavigate();

  const [nombre, setNombre]         = useState('');
  const [correo, setCorreo]         = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar]   = useState('');
  const [error, setError]           = useState('');

  const manejarSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError('');
      if (contrasena !== confirmar) {
        setError('Las contraseñas no coinciden.');
        return;
      }
      if (contrasena.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
      try {
        const resultado = await registrar(nombre.trim(), correo.trim(), contrasena);
        if (resultado.exito) {
          navegar('/', { replace: true });
        } else {
          setError(resultado.mensaje);
        }
      } catch (err) {
        setError('Ocurrió un error al crear la cuenta. Inténtalo de nuevo.');
      }
    },
    [nombre, correo, contrasena, confirmar, registrar, navegar]
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-marca-azul px-4 py-8">
      <div className="w-full max-w-sm rounded-2xl border border-marca-azulClaro bg-marca-azulMedio p-8 shadow-2xl">
        <h1 className="mb-6 text-2xl font-extrabold text-marca-texto text-center">
          Crear cuenta
        </h1>

        {error && (
          <p className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        <form onSubmit={manejarSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-marca-texto">
              Nombre completo
            </label>
            <input
              id="input-nombre"
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Juan Pérez"
              className="w-full rounded-lg border border-marca-azulClaro bg-marca-azul px-4 py-2.5 text-sm text-marca-texto placeholder:text-marca-textoSuave focus:border-marca-naranja focus:outline-none transition"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-marca-texto">
              Correo electrónico
            </label>
            <input
              id="input-correo-reg"
              type="email"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full rounded-lg border border-marca-azulClaro bg-marca-azul px-4 py-2.5 text-sm text-marca-texto placeholder:text-marca-textoSuave focus:border-marca-naranja focus:outline-none transition"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-marca-texto">
              Contraseña
            </label>
            <input
              id="input-pass-reg"
              type="password"
              required
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full rounded-lg border border-marca-azulClaro bg-marca-azul px-4 py-2.5 text-sm text-marca-texto placeholder:text-marca-textoSuave focus:border-marca-naranja focus:outline-none transition"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-marca-texto">
              Confirmar contraseña
            </label>
            <input
              id="input-confirmar"
              type="password"
              required
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              placeholder="Repite tu contraseña"
              className="w-full rounded-lg border border-marca-azulClaro bg-marca-azul px-4 py-2.5 text-sm text-marca-texto placeholder:text-marca-textoSuave focus:border-marca-naranja focus:outline-none transition"
            />
          </div>
          <button
            id="btn-registrar"
            type="submit"
            disabled={cargando}
            className="w-full rounded-xl bg-marca-naranja py-3 text-sm font-bold text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc disabled:opacity-60"
          >
            {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-marca-textoSuave">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-marca-naranja font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
