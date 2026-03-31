// features/auth/pages/RegisterPage.jsx
// Página de registro de nuevos usuarios.
// Diseño: fondo azul fijo (#2C1FF1) + card blanca, inputs claros con texto oscuro.

import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import useAuth from '../../../shared/hooks/useAuth';

/* ── Estilos en línea para independencia del tema ── */
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
    maxWidth: '420px',
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
  inputBase: {
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
}

const CAMPOS = [
  { id: 'input-nombre',      key: 'nombre',     type: 'text',     label: 'Nombre completo',      placeholder: 'Juan Pérez' },
  { id: 'input-correo-reg',  key: 'correo',     type: 'email',    label: 'Correo electrónico',   placeholder: 'tu@correo.com' },
  { id: 'input-pass-reg',    key: 'contrasena', type: 'password', label: 'Contraseña',           placeholder: 'Mínimo 6 caracteres' },
  { id: 'input-confirmar',   key: 'confirmar',  type: 'password', label: 'Confirmar contraseña', placeholder: 'Repite tu contraseña' },
]

const RegisterPage = () => {
  const { registrar, cargando } = useAuth();
  const navegar = useNavigate();

  const [valores, setValores] = useState({ nombre: '', correo: '', contrasena: '', confirmar: '' });
  const [error,   setError]   = useState('');
  const [focused, setFocused] = useState(null);

  const set = (key) => (e) => setValores((prev) => ({ ...prev, [key]: e.target.value }));

  const estiloInput = (key) => ({
    ...S.inputBase,
    borderColor: focused === key ? '#2C1FF1' : '#CBD5E1',
    boxShadow:   focused === key ? '0 0 0 3px rgba(44,31,241,0.15)' : 'none',
  });

  const manejarSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    if (valores.contrasena !== valores.confirmar) { setError('Las contraseñas no coinciden.'); return; }
    if (valores.contrasena.length < 3)            { setError('La contraseña debe tener al menos 3 caracteres.'); return; }
    try {
      const resultado = await registrar(
        valores.nombre.trim(), 
        valores.correo.trim(), 
        valores.contrasena,
        valores.confirmar
      );
      if (resultado.exito) navegar('/', { replace: true });
      else setError(resultado.mensaje);
    } catch {
      setError('Ocurrió un error al crear la cuenta. Inténtalo de nuevo.');
    }
  }, [valores, registrar, navegar]);

  return (
    <div style={S.pagina}>
      <div style={S.card}>
        <h1 style={S.titulo}>Crear cuenta</h1>

        {error && <div style={S.error}>{error}</div>}

        <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {CAMPOS.map(({ id, key, type, label, placeholder }) => (
            <div key={key}>
              <label htmlFor={id} style={S.label}>{label}</label>
              <input
                id={id}
                type={type}
                required
                value={valores[key]}
                onChange={set(key)}
                placeholder={placeholder}
                style={estiloInput(key)}
                onFocus={() => setFocused(key)}
                onBlur={() => setFocused(null)}
              />
            </div>
          ))}

          <button
            id="btn-registrar"
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
            {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.875rem', color: '#64748B' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: '#F97316', fontWeight: 700, textDecoration: 'none' }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
