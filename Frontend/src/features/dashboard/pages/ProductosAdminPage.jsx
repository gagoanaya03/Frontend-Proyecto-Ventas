// ProductosAdminPage.jsx — gestión completa de productos con tabla y modal de crear/editar
import { useState } from 'react'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import useGestionProductos from '../hooks/useGestionProductos'
import { formatearPrecio } from '../../../shared/utils/formatters'
import { categorias } from '../../../shared/utils/mockData'
import { ModalConfirmacion } from '../../../shared/ui'

import FormProducto from '../components/FormProducto'

const ProductosAdminPage = () => {
  const { lista, seleccionado, modalAbierto, abrirCrear, abrirEditar, cerrarModal, guardar, eliminar, toggleDestacado } = useGestionProductos()
  const [confirmar, setConfirmar] = useState(null) // id a eliminar

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-marca-texto">Productos</h1>
        <button onClick={abrirCrear}
          className="flex items-center gap-2 rounded-xl bg-marca-naranja px-4 py-2 text-sm font-bold text-[var(--color-superficie)] hover:bg-marca-naranjaOsc transition">
          <Plus size={15} /> Nuevo producto
        </button>
      </div>

      <div className="rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-borde)] text-left text-xs font-semibold uppercase tracking-wide text-marca-textoSuave">
                {['Producto','Marca','Categoría','Precio','Stock','Dest.','Acciones'].map(encabezado => (
                  <th key={encabezado} className="px-4 py-3">{encabezado}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lista.map(producto => (
                <tr key={producto.id} className="border-b border-[var(--color-borde)] last:border-0 hover:bg-[var(--color-fondo-alt)] transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={producto.imagen} alt={producto.nombre} className="h-10 w-10 rounded-lg object-cover" />
                      <span className="text-marca-texto font-semibold max-w-[180px] truncate">{producto.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-marca-textoSuave">{producto.marca}</td>
                  <td className="px-4 py-3 capitalize text-marca-textoSuave">{producto.categoria}</td>
                  <td className="px-4 py-3 font-bold text-marca-texto">{formatearPrecio(producto.precio)}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${producto.stock === 0 ? 'text-red-400' : 'text-green-400'}`}>{producto.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleDestacado(producto.id)}>
                      <Star size={16} className={producto.destacado ? 'fill-yellow-400 text-yellow-400' : 'text-marca-textoSuave'} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => abrirEditar(producto)} className="rounded-lg p-1.5 text-marca-textoSuave hover:text-marca-naranja hover:bg-marca-naranja/10 transition">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setConfirmar(producto.id)} className="rounded-lg p-1.5 text-marca-textoSuave hover:text-red-400 hover:bg-red-500/10 transition">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal formulario */}
      {modalAbierto && <FormProducto inicial={seleccionado} onGuardar={guardar} onCancelar={cerrarModal} />}

      {/* Confirmación de eliminación */}
      {confirmar && (
        <ModalConfirmacion
          titulo="¿Eliminar producto?"
          descripcion="Esta acción no se puede deshacer."
          onConfirmar={() => { eliminar(confirmar); setConfirmar(null) }}
          onCancelar={() => setConfirmar(null)}
        />
      )}
    </div>
  )
}

export default ProductosAdminPage
