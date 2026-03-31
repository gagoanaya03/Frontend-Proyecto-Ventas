// BannersAdminPage.jsx — gestión del carrusel de banners de la home
import { useState } from 'react'
import { Plus, Pencil, Trash2, EyeOff, Eye } from 'lucide-react'
import useGestionBanners from '../hooks/useGestionBanners'
import { ModalConfirmacion } from '../../../shared/ui'

import { obtenerClaseBadge } from '../../../shared/utils/badgeEstado'
import FormBanner from '../components/FormBanner'

const BannersAdminPage = () => {
  const { lista, seleccionado, modalAbierto, abrirCrear, abrirEditar, cerrarModal, guardar, eliminar, toggleActivo } = useGestionBanners()
  const [confirmar, setConfirmar] = useState(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-marca-texto">Banners del carrusel</h1>
        <button onClick={abrirCrear}
          className="flex items-center gap-2 rounded-xl bg-marca-naranja px-4 py-2 text-sm font-bold text-[var(--color-superficie)] hover:bg-marca-naranjaOsc transition">
          <Plus size={15} /> Nuevo banner
        </button>
      </div>

      <div className="space-y-3">
        {lista.map(banner => (
          <div key={banner.id} className="flex items-center gap-4 rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)] p-4">
            <img src={banner.imagen} alt={banner.titulo} className="h-16 w-28 shrink-0 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-marca-texto truncate">{banner.titulo}</p>
              <p className="text-xs text-marca-textoSuave truncate">{banner.subtitulo}</p>
              <p className="text-xs text-marca-naranja mt-1 truncate">{banner.enlace}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${obtenerClaseBadge(banner.activo ? 'activo' : 'inactivo')}`}>
                {banner.activo ? 'Activo' : 'Inactivo'}
              </span>
              <button onClick={() => toggleActivo(banner.id)} title={banner.activo ? 'Desactivar' : 'Activar'}
                className="rounded-lg p-1.5 text-marca-textoSuave hover:text-yellow-400 hover:bg-yellow-500/10 transition">
                {banner.activo ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button onClick={() => abrirEditar(banner)}
                className="rounded-lg p-1.5 text-marca-textoSuave hover:text-marca-naranja hover:bg-marca-naranja/10 transition">
                <Pencil size={14} />
              </button>
              <button onClick={() => setConfirmar(banner.id)}
                className="rounded-lg p-1.5 text-marca-textoSuave hover:text-red-400 hover:bg-red-500/10 transition">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalAbierto && <FormBanner inicial={seleccionado} onGuardar={guardar} onCancelar={cerrarModal} />}

      {confirmar && (
        <ModalConfirmacion
          titulo="¿Eliminar banner?"
          descripcion=""
          onConfirmar={() => { eliminar(confirmar); setConfirmar(null) }}
          onCancelar={() => setConfirmar(null)}
        />
      )}
    </div>
  )
}

export default BannersAdminPage
