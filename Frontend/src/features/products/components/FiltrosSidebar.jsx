// features/products/components/FiltrosSidebar.jsx
// Panel lateral de filtros: categorías y subcategorías como acordeón.

import { useCallback } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { categorias } from '../../../shared/utils/mockData';

const FiltrosSidebar = ({ filtros, onActualizar, onLimpiar }) => {
  const [categoriaExpandida, setCategoriaExpandida] = useState(filtros.categoria || null);

  const alternarCategoria = useCallback((id) => {
    setCategoriaExpandida((prev) => (prev === id ? null : id));
    onActualizar('categoria', id === filtros.categoria ? '' : id);
    onActualizar('subcategoria', '');
  }, [filtros.categoria, onActualizar]);

  const seleccionarSubcategoria = useCallback((subId) => {
    const mismaSeleccion = filtros.subcategoria === subId;
    onActualizar('subcategoria', mismaSeleccion ? '' : subId);
  }, [filtros.subcategoria, onActualizar]);

  return (
    <aside className="rounded-xl border border-marca-azulClaro bg-marca-azulMedio p-4 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-marca-texto text-sm">Filtros</h3>
        {(filtros.categoria || filtros.subcategoria || filtros.busqueda) && (
          <button
            onClick={onLimpiar}
            className="flex items-center gap-1 text-xs text-marca-naranja hover:text-marca-naranjaOsc transition"
          >
            <X size={12} /> Limpiar
          </button>
        )}
      </div>

      {/* Búsqueda activa */}
      {filtros.busqueda && (
        <div className="mb-3 rounded-lg bg-marca-azul px-3 py-2">
          <p className="text-xs text-marca-textoSuave">Buscando:</p>
          <p className="text-sm font-semibold text-marca-naranja truncate">
            "{filtros.busqueda}"
          </p>
        </div>
      )}

      {/* Lista de categorías */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-marca-textoSuave mb-2">
          Categorías
        </p>
        {categorias.map((cat) => (
          <div key={cat.id}>
            {/* Categoría principal */}
            <button
              onClick={() => alternarCategoria(cat.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                filtros.categoria === cat.id
                  ? 'bg-marca-naranja/10 text-marca-naranja font-semibold'
                  : 'text-marca-texto hover:bg-marca-azul hover:text-marca-naranja'
              }`}
            >
              {cat.nombre}
              {categoriaExpandida === cat.id
                ? <ChevronDown size={14} />
                : <ChevronRight size={14} />
              }
            </button>

            {/* Subcategorías */}
            {categoriaExpandida === cat.id && (
              <ul className="ml-4 mt-1 space-y-0.5 border-l border-marca-naranja/30 pl-3">
                {cat.subcategorias.map((sub) => (
                  <li key={sub.id}>
                    <button
                      onClick={() => seleccionarSubcategoria(sub.id)}
                      className={`w-full rounded-md px-2 py-1.5 text-left text-xs transition ${
                        filtros.subcategoria === sub.id
                          ? 'text-marca-naranja font-bold'
                          : 'text-marca-textoSuave hover:text-marca-naranja'
                      }`}
                    >
                      {sub.nombre}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FiltrosSidebar;
