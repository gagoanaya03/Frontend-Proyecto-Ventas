// shared/components/CartDrawer.jsx
// Panel lateral del carrito de compras.
// Se abre desde el ícono del Navbar y muestra los items con subtotales.

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import useCarrito from '../hooks/useCarrito';
import useAuth from '../hooks/useAuth';
import useTema from '../hooks/useTema';
import { formatearPrecio } from '../utils/formatters';

const CartDrawer = () => {
  const {
    items, estaAbierto, cerrarDrawer,
    eliminarDelCarrito, actualizarCantidad,
    vaciarCarrito, totalPrecio,
  } = useCarrito();
  const { estaAutenticado } = useAuth();
  const { esModoOscuro } = useTema();
  const navegar = useNavigate();

  const manejarProceder = useCallback(() => {
    cerrarDrawer();
    navegar(estaAutenticado ? '/cart' : '/login');
  }, [cerrarDrawer, navegar, estaAutenticado]);

  if (!estaAbierto) return null;

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={cerrarDrawer}
        className="fixed inset-0 z-40 bg-[var(--marca-texto)]/40 backdrop-blur-sm"
      />

      {/* Drawer lateral derecho */}
      <aside
        id="cart-drawer"
        role="dialog"
        aria-label="Carrito de compras"
        className="fixed inset-y-0 right-0 z-50 flex w-80 flex-col bg-marca-azulMedio shadow-2xl"
      >
        {/* Encabezado — azul en modo claro, neutro en oscuro */}
        <div
          style={!esModoOscuro ? {
            background: '#2C1FF1',
            borderBottom: '1px solid rgba(255,255,255,0.15)',
          } : {}}
          className={`flex h-16 items-center justify-between px-4 ${
            esModoOscuro ? 'border-b border-marca-azulClaro' : ''
          }`}
        >
          <div>
            <p style={!esModoOscuro ? { color: '#fff', fontWeight: 800, fontSize: '1rem', lineHeight: 1 } : {}}
               className={esModoOscuro ? 'font-bold text-marca-texto' : ''}>
              Carrito de compras
            </p>
            {!esModoOscuro && (
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', marginTop: '2px' }}>
                Tus productos seleccionados
              </p>
            )}
          </div>
          <button
            aria-label="Cerrar carrito"
            onClick={cerrarDrawer}
            style={!esModoOscuro ? { color: '#fff' } : {}}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
              esModoOscuro
                ? 'text-marca-texto hover:text-marca-naranja'
                : 'hover:bg-white/15'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista de items */}
        <div className="flex-1 overflow-y-auto py-3 px-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-marca-textoSuave">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-marca-azulClaro bg-marca-azul p-3"
                >
                  {/* Imagen */}
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="h-16 w-16 rounded-lg object-cover shrink-0"
                  />
                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-marca-texto">
                      {item.nombre}
                    </p>
                    <p className="text-sm font-bold text-marca-naranja">
                      {formatearPrecio(item.precio * item.cantidad)}
                    </p>
                    {/* Control de cantidad */}
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        aria-label="Disminuir cantidad"
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-md border border-marca-azulClaro text-marca-texto transition hover:border-marca-naranja hover:text-marca-naranja"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-marca-texto">
                        {item.cantidad}
                      </span>
                      <button
                        aria-label="Aumentar cantidad"
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-md border border-marca-azulClaro text-marca-texto transition hover:border-marca-naranja hover:text-marca-naranja"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        aria-label="Eliminar del carrito"
                        onClick={() => eliminarDelCarrito(item.id)}
                        className="ml-auto text-marca-textoSuave transition hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pie con total y CTA */}
        {items.length > 0 && (
          <div className="border-t border-marca-azulClaro p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-marca-textoSuave">Total</span>
              <span className="text-lg font-extrabold text-marca-naranja">
                {formatearPrecio(totalPrecio)}
              </span>
            </div>
            <button
              id="btn-proceder-carrito"
              onClick={manejarProceder}
              className="w-full rounded-xl bg-marca-naranja py-3 text-sm font-bold text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc"
            >
              {estaAutenticado ? 'Proceder con el pedido' : 'Inicia sesión para comprar'}
            </button>
            <button
              onClick={vaciarCarrito}
              className="w-full rounded-xl py-2 text-sm text-marca-textoSuave transition hover:text-red-400"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
