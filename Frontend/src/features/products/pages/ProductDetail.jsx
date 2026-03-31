// features/products/pages/ProductDetail.jsx
// Vista detallada de un producto individual.
// Muestra imagen, info completa, selector de cantidad y botón de agregar al carrito.

import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Package, Star } from 'lucide-react';
import useAuth from '../../../shared/hooks/useAuth';
import useCarrito from '../../../shared/hooks/useCarrito';
import { productos } from '../../../shared/utils/mockData';
import { formatearPrecio } from '../../../shared/utils/formatters';
import estilos from '../styles/products.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const { estaAutenticado } = useAuth();
  const { agregarAlCarrito, abrirDrawer } = useCarrito();

  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  // Buscar el producto en el mock data por ID
  const producto = productos.find((p) => p.id === Number(id));

  // Incrementar / decrementar cantidad con límites
  const incrementar = useCallback(() => {
    setCantidad((prev) => Math.min(prev + 1, producto?.stock ?? 10));
  }, [producto?.stock]);

  const decrementar = useCallback(() => {
    setCantidad((prev) => Math.max(1, prev - 1));
  }, []);

  const manejarAgregarCarrito = useCallback(() => {
    if (!estaAutenticado) {
      navegar('/login');
      return;
    }
    agregarAlCarrito(producto, cantidad);
    abrirDrawer();
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  }, [estaAutenticado, agregarAlCarrito, abrirDrawer, producto, cantidad, navegar]);

  // Producto no encontrado
  if (!producto) {
    return (
      <div className="contenedor py-12 flex flex-col items-center gap-4 text-marca-textoSuave">
        <Package size={64} strokeWidth={1} />
        <h1 className="text-xl font-bold text-marca-texto">Producto no encontrado</h1>
        <button
          onClick={() => navegar('/products')}
          className="rounded-lg bg-marca-naranja px-4 py-2 text-sm font-bold text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc"
        >
          Ver catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="contenedor py-6">
      {/* Botón volver */}
      <button
        onClick={() => navegar(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-marca-textoSuave transition hover:text-marca-naranja"
      >
        <ArrowLeft size={16} /> Volver
      </button>

      {/* Layout de dos columnas */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

        {/* Columna izquierda: imagen */}
        <div>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className={estilos.imagenDetalle}
          />
        </div>

        {/* Columna derecha: información */}
        <div className="flex flex-col gap-4">
          {/* Categoría y marca */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-full bg-marca-naranja/10 px-3 py-1 text-xs font-semibold text-marca-naranja capitalize">
              {producto.categoria}
            </span>
            <span className="rounded-full border border-marca-azulClaro px-3 py-1 text-xs text-marca-textoSuave capitalize">
              {producto.subcategoria}
            </span>
          </div>

          {/* Nombre */}
          <h1 className="text-2xl font-extrabold text-marca-texto leading-tight">
            {producto.nombre}
          </h1>

          {/* Marca */}
          <p className="text-sm font-semibold text-marca-textoSuave">
            Marca: <span className="text-marca-texto">{producto.marca}</span>
          </p>

          {/* Precio */}
          <p className="text-3xl font-extrabold text-marca-naranja">
            {formatearPrecio(producto.precio)}
          </p>

          {/* Stock */}
          <p className={`text-sm font-semibold ${producto.stock <= 5 ? 'text-[var(--color-error)]' : 'text-[var(--color-exito)]'}`}>
            {producto.stock > 0
              ? `✓ ${producto.stock} unidades disponibles`
              : '✗ Sin stock'}
          </p>

          {/* Descripción */}
          <p className="text-sm text-marca-textoSuave leading-relaxed border-t border-marca-azulClaro pt-4">
            {producto.descripcion}
          </p>

          {/* Selector de cantidad */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-sm font-semibold text-marca-texto">Cantidad:</span>
            <div className="flex items-center rounded-xl border border-marca-azulClaro overflow-hidden">
              <button
                id="btn-decrementar"
                onClick={decrementar}
                disabled={cantidad <= 1}
                className="w-10 h-10 flex items-center justify-center text-marca-texto transition hover:bg-marca-azulMedio disabled:opacity-40"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-bold text-marca-texto">
                {cantidad}
              </span>
              <button
                id="btn-incrementar"
                onClick={incrementar}
                disabled={cantidad >= producto.stock}
                className="w-10 h-10 flex items-center justify-center text-marca-texto transition hover:bg-marca-azulMedio disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>

          {/* Botón agregar al carrito */}
          <button
            id="btn-agregar-detalle"
            onClick={manejarAgregarCarrito}
            disabled={producto.stock === 0}
            className={`mt-2 flex items-center justify-center gap-3 rounded-xl py-3.5 text-base font-bold text-[var(--color-superficie)] transition disabled:opacity-50 disabled:cursor-not-allowed ${
              agregado
                ? 'bg-[var(--color-exito)]'
                : 'bg-marca-naranja hover:bg-marca-naranjaOsc'
            }`}
          >
            <ShoppingCart size={20} />
            {agregado
              ? '¡Agregado al carrito!'
              : estaAutenticado
              ? 'Agregar al carrito'
              : 'Inicia sesión para comprar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
