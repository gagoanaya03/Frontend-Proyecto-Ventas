import { useState } from 'react'
import { categorias } from '../../../shared/utils/mockData'

/**
 * Formulario para crear o editar un producto.
 * @param {Object} props
 * @param {Object} props.inicial - Datos iniciales del producto
 * @param {Function} props.onGuardar - Función al guardar
 * @param {Function} props.onCancelar - Función al cancelar
 */
const FormProducto = ({ inicial, onGuardar, onCancelar }) => {
  const [formulario, setFormulario] = useState(inicial ?? {
    nombre: '', 
    precio: '', 
    marca: '', 
    categoria: '', 
    subcategoria: '',
    stock: '', 
    imagen: '', 
    descripcion: '', 
    destacado: false,
  })

  const actualizarCampo = (clave, valor) => {
    setFormulario(prev => ({ ...prev, [clave]: valor }))
  }

  const subcategoriasDisponibles = categorias.find(cat => cat.id === formulario.categoria)?.subcategorias ?? []

  const camposTexto = [
    { clave: 'nombre', etiqueta: 'Nombre', tipo: 'text', columnas: 2 },
    { clave: 'precio', etiqueta: 'Precio', tipo: 'number', columnas: 1 },
    { clave: 'marca', etiqueta: 'Marca', tipo: 'text', columnas: 1 },
    { clave: 'stock', etiqueta: 'Stock', tipo: 'number', columnas: 1 },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--marca-texto)]/40 backdrop-blur-[2px] p-4">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--color-borde)] bg-[var(--color-superficie)] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <h3 className="mb-5 text-lg font-extrabold text-marca-texto">
          {formulario.id ? 'Editar producto' : 'Nuevo producto'}
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {camposTexto.map(({ clave, etiqueta, tipo, columnas }) => (
            <div key={clave} className={columnas === 2 ? 'col-span-2' : ''}>
              <label className="mb-1 block text-xs font-semibold text-marca-texto">{etiqueta}</label>
              <input 
                type={tipo} 
                value={formulario[clave]} 
                onChange={e => actualizarCampo(clave, e.target.value)}
                className="campo-admin" 
                placeholder={etiqueta} 
              />
            </div>
          ))}

          <div>
            <label className="mb-1 block text-xs font-semibold text-marca-texto">Categoría</label>
            <select 
              value={formulario.categoria} 
              onChange={e => actualizarCampo('categoria', e.target.value)} 
              className="campo-admin"
            >
              <option value="">Seleccionar</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-marca-texto">Subcategoría</label>
            <select 
              value={formulario.subcategoria} 
              onChange={e => actualizarCampo('subcategoria', e.target.value)} 
              className="campo-admin"
            >
              <option value="">Seleccionar</option>
              {subcategoriasDisponibles.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.nombre}</option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="mb-1 block text-xs font-semibold text-marca-texto">URL de imagen</label>
            <input 
              type="url" 
              value={formulario.imagen} 
              onChange={e => actualizarCampo('imagen', e.target.value)}
              className="campo-admin" 
              placeholder="https://..." 
            />
          </div>

          <div className="col-span-2">
            <label className="mb-1 block text-xs font-semibold text-marca-texto">Descripción</label>
            <textarea 
              rows={3} 
              value={formulario.descripcion} 
              onChange={e => actualizarCampo('descripcion', e.target.value)}
              className="campo-admin resize-none" 
              placeholder="Descripción del producto" 
            />
          </div>

          <div className="col-span-2 flex items-center gap-2">
            <input 
              type="checkbox" 
              id="chk-destacado" 
              checked={!!formulario.destacado}
              onChange={e => actualizarCampo('destacado', e.target.checked)} 
              className="accent-marca-naranja" 
            />
            <label htmlFor="chk-destacado" className="text-xs font-semibold text-marca-texto">
              Producto destacado
            </label>
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

export default FormProducto
