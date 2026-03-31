// features/home/components/ProductoDestacadoCard.jsx
// Card de producto para la sección de destacados en la HomePage.

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import useAuth from '../../../shared/hooks/useAuth';
import useCarrito from '../../../shared/hooks/useCarrito';
import { formatearPrecio, truncarTexto } from '../../../shared/utils/formatters';

const ProductoDestacadoCard = ({ producto }) => {
  const { estaAutenticado } = useAuth();
  const { agregarAlCarrito, abrirDrawer } = useCarrito();
  const navegar = useNavigate();

  const manejarAgregarCarrito = useCallback(
    (e) => {
      e.stopPropagation(); // evitar navegar al detalle
      if (!estaAutenticado) {
        navegar('/login');
        return;
      }
      agregarAlCarrito(producto);
      abrirDrawer();
    },
    [estaAutenticado, agregarAlCarrito, abrirDrawer, producto, navegar]
  );

  const manejarVerDetalle = useCallback(() => {
    navegar(`/products/${producto.id}`);
  }, [navegar, producto.id]);

  return (
    <article
      onClick={manejarVerDetalle}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-marca-azulClaro bg-marca-azulMedio transition hover:border-marca-naranja hover:shadow-xl hover:shadow-[var(--marca-texto)]/20"
    >
      {/* Imagen del producto */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {/* Badge de stock bajo */}
        {producto.stock <= 5 && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500/90 px-2 py-0.5 text-xs font-bold text-[var(--color-superficie)]">
            ¡Últimas unidades!
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-marca-naranja">
          {producto.marca}
        </p>
        <h3 className="text-sm font-bold text-marca-texto leading-snug">
          {truncarTexto(producto.nombre, 55)}
        </h3>
        <p className="text-xl font-extrabold text-marca-naranja mt-auto">
          {formatearPrecio(producto.precio)}
        </p>

        {/* Botones de acción */}
        <div className="flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
          <button
            id={`btn-ver-${producto.id}`}
            onClick={manejarVerDetalle}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-marca-azulClaro py-2 text-xs font-semibold text-marca-texto transition hover:border-marca-naranja hover:text-marca-naranja"
          >
            <Eye size={14} />
            Ver detalle
          </button>
          <button
            id={`btn-carrito-${producto.id}`}
            onClick={manejarAgregarCarrito}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-marca-naranja py-2 text-xs font-bold text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc"
          >
            <ShoppingCart size={14} />
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductoDestacadoCard;
