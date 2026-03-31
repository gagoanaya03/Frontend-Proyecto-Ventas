// CategoriasAdminPage.jsx — gestión de categorías y subcategorías
import { useState } from 'react'
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight } from 'lucide-react'
import { categorias as catInicial } from '../../../shared/utils/mockData'

const CategoriasAdminPage = () => {
  const [lista, setLista]   = useState([...catInicial])
  const [expandida, setExpandida] = useState(null)

  // CRUD de subcategorías (en memoria)
  const agregarSubcat = (catId, nombre) => {
    if (!nombre.trim()) return
    setLista(prev => prev.map(c =>
      c.id === catId
        ? { ...c, subcategorias: [...c.subcategorias, { id: nombre.toLowerCase().replace(/\s+/g,'-'), nombre }] }
        : c
    ))
  }
  const eliminarSubcat = (catId, subId) => {
    setLista(prev => prev.map(c =>
      c.id === catId ? { ...c, subcategorias: c.subcategorias.filter(s => s.id !== subId) } : c
    ))
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-extrabold text-marca-texto">Categorías y subcategorías</h1>

      <div className="space-y-3">
        {lista.map(cat => (
          <div key={cat.id} className="rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)]">
            {/* Cabecera de categoría */}
            <button
              onClick={() => setExpandida(prev => prev === cat.id ? null : cat.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-bold text-marca-texto capitalize">{cat.nombre}</span>
              <div className="flex items-center gap-3 text-marca-textoSuave text-xs">
                <span>{cat.subcategorias.length} subcategorías</span>
                {expandida === cat.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            </button>

            {/* Subcategorías */}
            {expandida === cat.id && (
              <div className="border-t border-[var(--color-borde)] px-5 py-4">
                <ul className="space-y-2 mb-4">
                  {cat.subcategorias.map(sub => (
                    <li key={sub.id} className="flex items-center justify-between rounded-lg bg-[var(--color-fondo-alt)] px-3 py-2">
                      <span className="text-sm text-marca-texto">{sub.nombre}</span>
                      <button onClick={() => eliminarSubcat(cat.id, sub.id)}
                        className="text-marca-textoSuave hover:text-red-400 transition">
                        <Trash2 size={13} />
                      </button>
                    </li>
                  ))}
                </ul>
                {/* Agregar subcategoría */}
                <AgregarSubcat onAgregar={nombre => agregarSubcat(cat.id, nombre)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const AgregarSubcat = ({ onAgregar }) => {
  const [valor, setValor] = useState('')
  return (
    <div className="flex gap-2">
      <input value={valor} onChange={e => setValor(e.target.value)}
        placeholder="Nueva subcategoría..."
        className="campo-admin flex-1 text-xs py-2"
        onKeyDown={e => { if (e.key === 'Enter') { onAgregar(valor); setValor('') } }}
      />
      <button onClick={() => { onAgregar(valor); setValor('') }}
        className="flex items-center gap-1 rounded-lg bg-marca-naranja px-3 py-2 text-xs font-bold text-[var(--color-superficie)] hover:bg-marca-naranjaOsc transition">
        <Plus size={13} /> Agregar
      </button>
    </div>
  )
}

export default CategoriasAdminPage
