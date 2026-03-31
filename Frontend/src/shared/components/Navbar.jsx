// shared/components/Navbar.jsx
// Barra de navegación global con: logo, hamburger, buscador,
// toggle de tema, ícono de carrito con contador e ícono de usuario.

import { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu, Search, ShoppingCart, User, Sun, Moon,
  LogOut, Settings, X,
} from 'lucide-react';
import useTema from '../hooks/useTema';
import useAuth from '../hooks/useAuth';
import useCarrito from '../hooks/useCarrito';

const Navbar = ({ onAbrirSidebar }) => {
  const { esModoOscuro, alternarTema } = useTema();
  const { estaAutenticado, usuario, cerrarSesion } = useAuth();
  const { totalItems, toggleDrawer } = useCarrito();
  const navegar = useNavigate();

  const [consulta, setConsulta] = useState('');
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false);
  const refMenuUsuario = useRef(null);

  // Cerrar menú de usuario al hacer click fuera
  useEffect(() => {
    const manejarClickExterno = (e) => {
      if (refMenuUsuario.current && !refMenuUsuario.current.contains(e.target)) {
        setMenuUsuarioAbierto(false);
      }
    };
    document.addEventListener('mousedown', manejarClickExterno);
    return () => document.removeEventListener('mousedown', manejarClickExterno);
  }, []);

  // Navegar a productos con término de búsqueda
  const manejarBusqueda = useCallback(
    (e) => {
      e.preventDefault();
      if (consulta.trim()) {
        navegar(`/products?q=${encodeURIComponent(consulta.trim())}`);
        setConsulta('');
      }
    },
    [consulta, navegar]
  );

  const manejarCerrarSesion = useCallback(() => {
    cerrarSesion();
    setMenuUsuarioAbierto(false);
    navegar('/');
  }, [cerrarSesion, navegar]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-marca-azulClaro bg-marca-azul/95 backdrop-blur-sm">
      <nav className="contenedor flex h-16 items-center gap-3">

        {/* Botón hamburger → abre sidebar */}
        <button
          id="btn-hamburger"
          aria-label="Abrir menú de categorías"
          onClick={onAbrirSidebar}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--color-navbar-contenido)] transition hover:bg-white/10"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <Link
          to="/"
          id="logo-principal"
          className="shrink-0 text-lg font-extrabold tracking-tight text-[var(--color-navbar-contenido)] transition hover:opacity-80"
        >
          J&P <span className={!esModoOscuro ? "text-white" : "text-marca-naranja"}>Periféricos</span>
        </Link>

        {/* Buscador — ocupa el espacio disponible */}
        <form onSubmit={manejarBusqueda} className="flex flex-1 items-center">
          <div className="relative w-full max-w-xl mx-auto">
            <Search
              size={16}
              className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${!esModoOscuro ? 'text-white/70' : 'text-marca-textoSuave'}`}
            />
            <input
              id="buscador-navbar"
              type="search"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="Buscar productos..."
              className={`w-full rounded-lg border py-2 pl-9 pr-4 text-sm transition focus:outline-none focus:ring-1 
                ${!esModoOscuro 
                  ? 'border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50' 
                  : 'border-marca-azulClaro bg-marca-azulMedio text-marca-texto placeholder:text-marca-textoSuave focus:border-marca-naranja focus:ring-marca-naranja'
                }`}
            />
          </div>
        </form>

        {/* Acciones del lado derecho */}
        <div className="flex shrink-0 items-center gap-1">

          {/* Toggle tema oscuro/claro */}
          <button
            id="btn-toggle-tema"
            aria-label={esModoOscuro ? 'Activar modo claro' : 'Activar modo oscuro'}
            onClick={alternarTema}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-navbar-contenido)] transition hover:bg-white/10"
          >
            {esModoOscuro ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Ícono carrito con badge */}
          <button
            id="btn-carrito"
            aria-label={`Carrito: ${totalItems} productos`}
            onClick={toggleDrawer}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-navbar-contenido)] transition hover:bg-white/10"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-marca-naranja text-[10px] font-bold text-white">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>

          {/* Ícono usuario / menú desplegable */}
          {estaAutenticado ? (
            <div ref={refMenuUsuario} className="relative">
              <button
                id="btn-perfil"
                aria-label="Abrir menú de usuario"
                onClick={() => setMenuUsuarioAbierto((prev) => !prev)}
                className="flex h-9 items-center gap-2 rounded-lg px-2 text-[var(--color-navbar-contenido)] transition hover:bg-white/10"
              >
                <User size={20} />
                <span className="hidden text-sm font-semibold md:block">
                  {usuario?.nombre?.split(' ')[0]}
                </span>
              </button>

              {/* Menú desplegable — Solo Mi Cuenta y Cerrar Sesión */}
              {menuUsuarioAbierto && (
                <div className="absolute right-0 top-11 z-50 w-48 overflow-hidden rounded-xl border border-marca-azulClaro bg-marca-azulMedio shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex flex-col p-1">
                    <Link
                      to="/profile"
                      onClick={() => setMenuUsuarioAbierto(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-marca-texto transition hover:bg-marca-azul hover:text-marca-naranja"
                    >
                      <User size={16} />
                      Mi cuenta
                    </Link>
                    <button
                      onClick={manejarCerrarSesion}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-marca-texto transition hover:bg-marca-azul hover:text-marca-naranja"
                    >
                      <LogOut size={16} />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              id="btn-login"
              onClick={() => navegar('/login')}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold text-[var(--color-navbar-contenido)] transition hover:bg-white/10"
            >
              <User size={20} />
              <span className="hidden md:inline">Ingresar</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
