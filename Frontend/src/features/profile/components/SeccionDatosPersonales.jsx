import { User, Mail, Phone, MapPin, Save, Loader2 } from 'lucide-react'

/**
 * Sección de edición de datos personales del perfil de usuario.
 */
const SeccionDatosPersonales = ({ datos, cargando, manejarCambio, alGuardar }) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-[var(--color-borde)] bg-[var(--color-superficie)] shadow-xl transition hover:shadow-2xl">
      <div className="border-b border-[var(--color-borde)] bg-[var(--color-superficie)] px-8 py-6">
        <h2 className="flex items-center gap-3 text-xl font-extrabold text-marca-texto">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-marca-naranja/10 text-marca-naranja">
            <User size={22} />
          </div>
          Datos Personales
        </h2>
      </div>
      
      <form onSubmit={alGuardar} className="p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Nombre */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-marca-textoSuave ml-1">Nombre Completo</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-marca-textoSuave" size={18} />
              <input
                name="nombre"
                type="text"
                value={datos.nombre}
                onChange={manejarCambio}
                className="campo-admin !pl-12 !py-3.5 bg-[var(--color-fondo-alt)] focus:ring-2 ring-marca-naranja/20"
                placeholder="Tu nombre completo"
                required
              />
            </div>
          </div>

          {/* Correo (No editable) */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-marca-textoSuave ml-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-marca-textoSuave opacity-50" size={18} />
              <input
                name="correo"
                type="email"
                value={datos.correo}
                disabled
                className="campo-admin !pl-12 !py-3.5 bg-[var(--color-fondo)] text-marca-textoSuave cursor-not-allowed border-dashed"
              />
            </div>
            <p className="text-[10px] text-marca-naranja font-bold uppercase ml-1">El correo no es editable</p>
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-marca-textoSuave ml-1">Teléfono</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-marca-textoSuave" size={18} />
              <input
                name="telefono"
                type="tel"
                value={datos.telefono}
                onChange={manejarCambio}
                className="campo-admin !pl-12 !py-3.5 bg-[var(--color-fondo-alt)]"
                placeholder="Ej: 999 999 999"
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-marca-textoSuave ml-1">Dirección de Envío</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-marca-textoSuave" size={18} />
              <input
                name="direccion"
                type="text"
                value={datos.direccion}
                onChange={manejarCambio}
                className="campo-admin !pl-12 !py-3.5 bg-[var(--color-fondo-alt)]"
                placeholder="Calle, ciudad, referencia"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button 
            type="submit" 
            disabled={cargando}
            className="flex items-center gap-2 rounded-2xl bg-marca-naranja px-10 py-4 text-sm font-black text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc hover:scale-[1.02] active:scale-95 disabled:opacity-50 shadow-lg shadow-[var(--color-acento)]/20"
          >
            {cargando ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Guardar Cambios
          </button>
        </div>
      </form>
    </section>
  )
}

export default SeccionDatosPersonales
