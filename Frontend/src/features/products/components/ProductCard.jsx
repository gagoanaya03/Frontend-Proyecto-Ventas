// features/products/components/ProductCard.jsx
// Card reutilizable para el grid de productos.

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import useAuth from '../../../shared/hooks/useAuth';
import useCarrito from '../../../shared/hooks/useCarrito';
import { formatearPrecio, truncarTexto } from '../../../shared/utils/formatters';
import estilos from '../styles/products.module.css';

const ProductCard = ({ producto }) => {
  const { estaAutenticado } = useAuth();
  const { agregarAlCarrito, abrirDrawer } = useCarrito();
  const navegar = useNavigate();

  const manejarVerDetalle = useCallback(() => {
    navegar(`/products/${producto.id}`);
  }, [navegar, producto.id]);

  const manejarAgregarCarrito = useCallback(
    (e) => {
      e.stopPropagation();
      if (!estaAutenticado) {
        navegar('/login');
        return;
      }
      agregarAlCarrito(producto);
      abrirDrawer();
    },
    [estaAutenticado, agregarAlCarrito, abrirDrawer, producto, navegar]
  );

  return (
    <article
      onClick={manejarVerDetalle}
      className={`${estilos.cardProducto} group`}
    >
      {/* Imagen */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-marca-naranja">
          {producto.marca}
        </p>
        <h3 className="text-sm font-bold text-marca-texto leading-snug">
          {truncarTexto(producto.nombre, 50)}
        </h3>
        <p className="text-xs text-marca-textoSuave capitalize">
          {producto.subcategoria}
        </p>
        <p className="mt-auto text-lg font-extrabold text-marca-naranja">
          {formatearPrecio(producto.precio)}
        </p>

        {/* Botones */}
        <div className="flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
          <button
            id={`ver-${producto.id}`}
            onClick={manejarVerDetalle}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-marca-azulClaro py-1.5 text-xs font-semibold text-marca-texto transition hover:border-marca-naranja hover:text-marca-naranja"
          >
            <Eye size={13} /> Ver
          </button>
          <button
            id={`add-${producto.id}`}
            onClick={manejarAgregarCarrito}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-marca-naranja py-1.5 text-xs font-bold text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc"
          >
            <ShoppingCart size={13} /> Agregar
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
