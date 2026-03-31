// UsuariosAdminPage.jsx — lista de clientes con opciones de bloquear y eliminar
import { useState } from 'react'
import { ShieldOff, ShieldCheck, Trash2 } from 'lucide-react'
import useGestionUsuarios from '../hooks/useGestionUsuarios'
import { ModalConfirmacion } from '../../../shared/ui'

const UsuariosAdminPage = () => {
  const { lista, toggleActivo, eliminar } = useGestionUsuarios()
  const [confirmar, setConfirmar] = useState(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-marca-texto">Usuarios clientes</h1>
        <span className="text-sm text-marca-textoSuave">{lista.length} registrados</span>
      </div>

      <div className="rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-borde)] text-left text-xs font-semibold uppercase tracking-wide text-marca-textoSuave">
              {['Nombre','Correo','Registro','Estado','Acciones'].map(h => (
                <th key={h} className="px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lista.map(u => (
              <tr key={u.id} className="border-b border-[var(--color-borde)] last:border-0 hover:bg-[var(--color-fondo-alt)] transition">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-marca-naranja/10 text-sm font-bold text-marca-naranja">
                      {u.nombre.charAt(0)}
                    </div>
                    <span className="font-semibold text-marca-texto">{u.nombre}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-marca-textoSuave">{u.correo}</td>
                <td className="px-5 py-3 text-marca-textoSuave">{u.fechaRegistro}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${u.activo ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {u.activo ? 'Activo' : 'Bloqueado'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => toggleActivo(u.id)}
                      title={u.activo ? 'Bloquear' : 'Desbloquear'}
                      className="rounded-lg p-1.5 text-marca-textoSuave hover:text-yellow-400 hover:bg-yellow-500/10 transition">
                      {u.activo ? <ShieldOff size={14} /> : <ShieldCheck size={14} />}
                    </button>
                    <button onClick={() => setConfirmar(u.id)}
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

      {confirmar && (
        <ModalConfirmacion
          titulo="¿Eliminar usuario?"
          descripcion="Esta acción no se puede deshacer."
          onConfirmar={() => { eliminar(confirmar); setConfirmar(null) }}
          onCancelar={() => setConfirmar(null)}
        />
      )}
    </div>
  )
}

export default UsuariosAdminPage
