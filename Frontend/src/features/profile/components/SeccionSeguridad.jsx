import { ShieldCheck, Key, Loader2 } from 'lucide-react'

/**
 * Sección de seguridad (cambio de contraseña) del perfil de usuario.
 */
const SeccionSeguridad = ({ claves, cargando, manejarCambio, alGuardar }) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-[var(--color-borde)] bg-[var(--color-superficie)] shadow-xl transition hover:shadow-2xl">
      <div className="border-b border-[var(--color-borde)] bg-[var(--color-superficie)] px-8 py-6">
        <h2 className="flex items-center gap-3 text-xl font-extrabold text-marca-texto">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-marca-naranja/10 text-marca-naranja">
            <ShieldCheck size={22} />
          </div>
          Seguridad de la Cuenta
        </h2>
      </div>
      
      <form onSubmit={alGuardar} className="p-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Clave Actual */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-marca-textoSuave ml-1">Clave Actual</label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-marca-textoSuave" size={18} />
              <input
                name="actual"
                type="password"
                value={claves.actual}
                onChange={manejarCambio}
                className="campo-admin !pl-12 !py-3.5 bg-[var(--color-fondo-alt)]"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Nueva Clave */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-marca-textoSuave ml-1">Nueva Clave</label>
            <input
              name="nueva"
              type="password"
              value={claves.nueva}
              onChange={manejarCambio}
              className="campo-admin !py-3.5 bg-[var(--color-fondo-alt)]"
              placeholder="Mín. 8 caracteres"
              required
            />
          </div>

          {/* Confirmar Nueva */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-marca-textoSuave ml-1">Confirmar Nueva</label>
            <input
              name="confirmar"
              type="password"
              value={claves.confirmar}
              onChange={manejarCambio}
              className="campo-admin !py-3.5 bg-[var(--color-fondo-alt)]"
              placeholder="Repite tu clave"
              required
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button 
            type="submit" 
            disabled={cargando}
            className="flex items-center gap-2 rounded-2xl bg-marca-azulMedio border border-marca-azulClaro px-10 py-4 text-sm font-black text-marca-texto transition hover:bg-marca-azul hover:text-marca-naranja hover:border-marca-naranja/50 hover:scale-[1.02] active:scale-95 disabled:opacity-50 shadow-lg shadow-black/20"
          >
            {cargando ? <Loader2 className="animate-spin" size={20} /> : <ShieldCheck size={20} />}
            Actualizar Seguridad
          </button>
        </div>
      </form>
    </section>
  )
}

export default SeccionSeguridad
