import { useState } from 'react'

/**
 * Formulario para crear o editar un cupón de descuento.
 * @param {Object} props
 * @param {Object} props.inicial - Datos iniciales del cupón
 * @param {Function} props.onGuardar - Función al guardar
 * @param {Function} props.onCancelar - Función al cancelar
 */
const FormCupon = ({ inicial, onGuardar, onCancelar }) => {
  const [formulario, setFormulario] = useState(inicial ?? { 
    codigo: '', 
    tipo: 'porcentaje', 
    valor: '', 
    expira: '', 
    descripcion: '', 
    activo: true 
  })

  const actualizarCampo = (clave, valor) => {
    setFormulario(prev => ({ ...prev, [clave]: valor }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--marca-texto)]/40 backdrop-blur-[2px] p-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-borde)] bg-[var(--color-superficie)] p-6 shadow-2xl">
        <h3 className="mb-5 text-lg font-extrabold text-marca-texto">
          {formulario.id ? 'Editar cupón' : 'Nuevo cupón'}
        </h3>
        
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-marca-texto">Código</label>
            <input 
              value={formulario.codigo} 
              onChange={e => actualizarCampo('codigo', e.target.value.toUpperCase())}
              className="campo-admin" 
              placeholder="VERANO20" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-marca-texto">Tipo</label>
              <select 
                value={formulario.tipo} 
                onChange={e => actualizarCampo('tipo', e.target.value)} 
                className="campo-admin"
              >
                <option value="porcentaje">Porcentaje (%)</option>
                <option value="fijo">Monto fijo (S/.)</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-marca-texto">
                Valor {formulario.tipo === 'porcentaje' ? '(%)' : '(S/.)'}
              </label>
              <input 
                type="number" 
                min="0" 
                value={formulario.valor} 
                onChange={e => actualizarCampo('valor', Number(e.target.value))}
                className="campo-admin" 
                placeholder="20" 
              />
            </div>
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-semibold text-marca-texto">Fecha de expiración</label>
            <input 
              type="date" 
              value={formulario.expira} 
              onChange={e => actualizarCampo('expira', e.target.value)} 
              className="campo-admin" 
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-semibold text-marca-texto">Descripción</label>
            <input 
              value={formulario.descripcion} 
              onChange={e => actualizarCampo('descripcion', e.target.value)}
              className="campo-admin" 
              placeholder="Descripción del descuento" 
            />
          </div>
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

export default FormCupon
