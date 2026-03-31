// features/products/pages/ProductsPage.jsx
// Grid completo de productos con panel de filtros lateral.
// Lee filtros desde la URL y aplica filtrado en tiempo real.

import ProductCard from '../components/ProductCard';
import FiltrosSidebar from '../components/FiltrosSidebar';
import useProductos from '../hooks/useProductos';
import useFiltros from '../hooks/useFiltros';
import estilos from '../styles/products.module.css';
import { PackageSearch } from 'lucide-react';

const ProductsPage = () => {
  const { busqueda, categoria, subcategoria, actualizarFiltro, limpiarFiltros } = useFiltros();
  const { productosFiltrados, total, cargando } = useProductos({ busqueda, categoria, subcategoria });

  // Título dinámico según filtros activos
  const titulo = categoria
    ? `${categoria.charAt(0).toUpperCase() + categoria.slice(1)}${subcategoria ? ` — ${subcategoria}` : ''}`
    : busqueda
    ? `Resultados para "${busqueda}"`
    : 'Todos los productos';

  return (
    <div className="contenedor py-6">
      <div className={estilos.layoutProducts}>

        {/* Panel de filtros */}
        <FiltrosSidebar
          filtros={{ busqueda, categoria, subcategoria }}
          onActualizar={actualizarFiltro}
          onLimpiar={limpiarFiltros}
        />

        {/* Área principal */}
        <div className="space-y-4">
          {/* Encabezado con título y contador */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-marca-texto">{titulo}</h1>
            <span className="text-sm text-marca-textoSuave">
              {total} {total === 1 ? 'producto' : 'productos'}
            </span>
          </div>

          {/* Estado de carga */}
          {cargando && (
            <div className={estilos.gridProductos}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl border border-[var(--color-borde)] bg-[var(--color-fondo-alt)] aspect-[3/4]"
                />
              ))}
            </div>
          )}

          {/* Sin resultados */}
          {!cargando && total === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-marca-textoSuave">
              <PackageSearch size={64} strokeWidth={1} />
              <p className="text-base font-semibold">No encontramos productos</p>
              <p className="text-sm">Intenta con otros filtros o términos de búsqueda.</p>
              <button
                onClick={limpiarFiltros}
                className="rounded-lg bg-marca-naranja px-4 py-2 text-sm font-bold text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc"
              >
                Ver todos los productos
              </button>
            </div>
          )}

          {/* Grid de productos */}
          {!cargando && total > 0 && (
            <div className={estilos.gridProductos}>
              {productosFiltrados.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;
