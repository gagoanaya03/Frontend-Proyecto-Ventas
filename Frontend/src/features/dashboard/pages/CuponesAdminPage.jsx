// CuponesAdminPage.jsx — gestión de cupones de descuento
import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import useGestionCupones from '../hooks/useGestionCupones'
import { ModalConfirmacion } from '../../../shared/ui'

import { obtenerClaseBadge } from '../../../shared/utils/badgeEstado'
import FormCupon from '../components/FormCupon'

const CuponesAdminPage = () => {
  const { lista, seleccionado, modalAbierto, abrirCrear, abrirEditar, cerrarModal, guardar, eliminar, toggleActivo } = useGestionCupones()
  const [confirmar, setConfirmar] = useState(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-marca-texto">Cupones de descuento</h1>
        <button onClick={abrirCrear}
          className="flex items-center gap-2 rounded-xl bg-marca-naranja px-4 py-2 text-sm font-bold text-[var(--color-superficie)] hover:bg-marca-naranjaOsc transition">
          <Plus size={15} /> Nuevo cupón
        </button>
      </div>

      <div className="rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-borde)] text-left text-xs font-semibold uppercase tracking-wide text-marca-textoSuave">
              {['Código','Tipo','Valor','Vence','Estado','Acciones'].map(encabezado => (
                <th key={encabezado} className="px-5 py-3">{encabezado}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lista.map(cupon => (
              <tr key={cupon.id} className="border-b border-[var(--color-borde)] last:border-0 hover:bg-[var(--color-fondo-alt)] transition">
                <td className="px-5 py-3 font-mono font-bold text-marca-naranja">{cupon.codigo}</td>
                <td className="px-5 py-3 capitalize text-marca-textoSuave">{cupon.tipo}</td>
                <td className="px-5 py-3 font-bold text-marca-texto">
                  {cupon.tipo === 'porcentaje' ? `${cupon.valor}%` : `S/. ${cupon.valor}`}
                </td>
                <td className="px-5 py-3 text-marca-textoSuave">{cupon.expira}</td>
                <td className="px-5 py-3">
                  <button onClick={() => toggleActivo(cupon.id)}
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold transition ${obtenerClaseBadge(cupon.activo ? 'activo' : 'inactivo')}`}>
                    {cupon.activo ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => abrirEditar(cupon)}
                      className="rounded-lg p-1.5 text-marca-textoSuave hover:text-marca-naranja hover:bg-marca-naranja/10 transition">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setConfirmar(cupon.id)}
                      className="rounded-lg p-1.5 text-marca-textoSuave hover:text-red-400 hover:bg-red-500/10 transition">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAbierto && <FormCupon inicial={seleccionado} onGuardar={guardar} onCancelar={cerrarModal} />}

      {confirmar && (
        <ModalConfirmacion
          titulo="¿Eliminar cupón?"
          descripcion=""
          onConfirmar={() => { eliminar(confirmar); setConfirmar(null) }}
          onCancelar={() => setConfirmar(null)}
        />
      )}
    </div>
  )
}

export default CuponesAdminPage
