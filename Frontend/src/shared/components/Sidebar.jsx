// shared/components/Sidebar.jsx
// Sidebar global de categorías con subcategorías en acordeón.
// Se activa con el hamburger del Navbar. Overlay con efecto blur.

import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X, ChevronDown, ChevronRight,
  Keyboard, Monitor, HardDrive, Headphones, Cpu,
} from 'lucide-react';
import { categorias } from '../utils/mockData';

/* Mapa de íconos por id de categoría */
const ICONOS_CATEGORIA = {
  perifericos:    <Keyboard size={18} />,
  monitores:      <Monitor size={18} />,
  almacenamiento: <HardDrive size={18} />,
  audio:          <Headphones size={18} />,
  accesorios:     <Cpu size={18} />,
};

const Sidebar = ({ estaAbierto, onCerrar }) => {
  const [categoriaExpandida, setCategoriaExpandida] = useState(null);
  const navegar = useNavigate();

  // Cerrar con tecla Escape
  useEffect(() => {
    const manejarEscape = (e) => {
      if (e.key === 'Escape') onCerrar();
    };
    if (estaAbierto) {
      document.addEventListener('keydown', manejarEscape);
      // Bloquear scroll del body mientras está abierto
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', manejarEscape);
      document.body.style.overflow = '';
    };
  }, [estaAbierto, onCerrar]);

  const alternarCategoria = useCallback((id) => {
    setCategoriaExpandida((prev) => (prev === id ? null : id));
  }, []);

  const irASubcategoria = useCallback(
    (categoriaId, subcategoriaId) => {
      navegar(`/products?categoria=${categoriaId}&subcategoria=${subcategoriaId}`);
      onCerrar();
    },
    [navegar, onCerrar]
  );

  const irACategoria = useCallback(
    (categoriaId) => {
      navegar(`/products?categoria=${categoriaId}`);
      onCerrar();
    },
    [navegar, onCerrar]
  );

  if (!estaAbierto) return null;

  return (
    <>
      {/* Overlay semitransparente con blur — cierra al hacer click */}
      <div
        id="sidebar-overlay"
        aria-hidden="true"
        onClick={onCerrar}
        className="fixed inset-0 z-40 bg-[var(--marca-texto)]/40 backdrop-blur-sm transition-opacity"
      />

      {/* Panel del sidebar */}
      <aside
        id="sidebar-principal"
        role="dialog"
        aria-label="Menú de categorías"
        aria-modal="true"
        className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-marca-azulMedio shadow-2xl transition-transform"
      >
        {/* Encabezado */}
        <div className="flex h-16 items-center justify-between border-b border-marca-azulClaro px-4">
          <span className="font-bold text-marca-texto">Categorías</span>
          <button
            id="btn-cerrar-sidebar"
            aria-label="Cerrar menú"
            onClick={onCerrar}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-marca-texto transition hover:bg-marca-azul hover:text-marca-naranja"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista de categorías */}
        <nav className="flex-1 overflow-y-auto py-2">
          {categorias.map((cat) => (
            <div key={cat.id}>
              {/* Fila de categoría principal */}
              <div className="flex items-center">
                <button
                  onClick={() => irACategoria(cat.id)}
                  className="flex flex-1 items-center gap-3 px-4 py-3 text-sm font-semibold text-marca-texto transition hover:bg-marca-azul hover:text-marca-naranja"
                >
                  <span className="text-marca-naranja">
                    {ICONOS_CATEGORIA[cat.id]}
                  </span>
                  {cat.nombre}
                </button>
                {/* Botón para expandir subcategorías */}
                <button
                  aria-label={`Expandir ${cat.nombre}`}
                  onClick={() => alternarCategoria(cat.id)}
                  className="px-3 py-3 text-marca-textoSuave transition hover:text-marca-naranja"
                >
                  {categoriaExpandida === cat.id
                    ? <ChevronDown size={16} />
                    : <ChevronRight size={16} />
                  }
                </button>
              </div>

              {/* Subcategorías (acordeón) */}
              {categoriaExpandida === cat.id && (
                <ul className="border-l-2 border-marca-naranja/40 ml-7 py-1">
                  {cat.subcategorias.map((sub) => (
                    <li key={sub.id}>
                      <button
                        onClick={() => irASubcategoria(cat.id, sub.id)}
                        className="w-full px-4 py-2 text-left text-sm text-marca-textoSuave transition hover:text-marca-naranja"
                      >
                        {sub.nombre}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* Enlace a todos los productos al fondo */}
        <div className="border-t border-marca-azulClaro p-4">
          <Link
            to="/products"
            onClick={onCerrar}
            className="block w-full rounded-lg bg-marca-naranja py-2.5 text-center text-sm font-bold text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc"
          >
            Ver todos los productos
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
