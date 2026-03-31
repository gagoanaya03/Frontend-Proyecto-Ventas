import { useState } from 'react'

/**
 * Formulario para crear o editar un banner del carrusel.
 * @param {Object} props
 * @param {Object} props.inicial - Datos iniciales del banner
 * @param {Function} props.onGuardar - Función al guardar
 * @param {Function} props.onCancelar - Función al cancelar
 */
const FormBanner = ({ inicial, onGuardar, onCancelar }) => {
  const [formulario, setFormulario] = useState(inicial ?? { 
    titulo: '', 
    subtitulo: '', 
    imagen: '', 
    enlace: '', 
    activo: true 
  })

  const actualizarCampo = (clave, valor) => {
    setFormulario(prev => ({ ...prev, [clave]: valor }))
  }

  const camposTexto = [
    { clave: 'titulo', etiqueta: 'Título' },
    { clave: 'subtitulo', etiqueta: 'Subtítulo' },
    { clave: 'imagen', etiqueta: 'URL de imagen' },
    { clave: 'enlace', etiqueta: 'URL de destino' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--marca-texto)]/40 backdrop-blur-[2px] p-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-borde)] bg-[var(--color-superficie)] p-6 shadow-2xl">
        <h3 className="mb-5 text-lg font-extrabold text-marca-texto">
          {formulario.id ? 'Editar banner' : 'Nuevo banner'}
        </h3>
        
        <div className="space-y-3">
          {camposTexto.map(({ clave, etiqueta }) => (
            <div key={clave}>
              <label className="mb-1 block text-xs font-semibold text-marca-texto">{etiqueta}</label>
              <input 
                value={formulario[clave]} 
                onChange={e => actualizarCampo(clave, e.target.value)}
                className="campo-admin" 
                placeholder={etiqueta} 
              />
            </div>
          ))}
          
          {formulario.imagen && (
            <div className="mt-2">
              <p className="mb-1 text-[10px] font-bold uppercase text-marca-textoSuave">Vista previa:</p>
              <img 
                src={formulario.imagen} 
                alt="Vista previa del banner" 
                className="h-28 w-full rounded-lg object-cover border border-[var(--color-borde)]" 
              />
            </div>
          )}
        </div>

        <div className="mt-5 flex gap-3">
          <button 
            onClick={() => onGuardar(formulario)}
            className="flex-1 rounded-xl bg-marca-naranja py-2.5 text-sm font-bold text-[var(--color-superficie)] hover:bg-marca-naranjaOsc transition"
          >
            Guardar
          </button>
          <button 
            onClick={onCancelar}
            className="flex-1 rounded-xl border border-[var(--color-borde)] py-2.5 text-sm font-semibold text-marca-textoSuave hover:text-marca-texto transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormBanner
