// ConfiguracionAdminPage.jsx — ajustes generales de la tienda (simulados)
import { useState, useCallback, useEffect, useRef } from 'react'
import { Save } from 'lucide-react'

const ConfiguracionAdminPage = () => {
  const [config, setConfig] = useState({
    nombreTienda:     'J&P Periféricos S.A.C.',
    correoContacto:   'contacto@jyp.com',
    telefono:         '+51 999 888 777',
    direccion:        'Av. Tecnológica 123, Lima, Perú',
    moneda:           'PEN',
    costoEnvio:       '15.00',
    envioGratisDesde: '200.00',
  })
  const [guardado, setGuardado] = useState(false)
  const temporizadorRef = useRef(null)

  // Limpia el temporizador al desmontar para evitar memory leaks
  useEffect(() => () => clearTimeout(temporizadorRef.current), [])

  const actualizarCampo = useCallback((clave, valor) => {
    setConfig(prev => ({ ...prev, [clave]: valor }))
  }, [])

  const manejarGuardar = useCallback(() => {
    setGuardado(true)
    clearTimeout(temporizadorRef.current)
    temporizadorRef.current = setTimeout(() => setGuardado(false), 2500)
  }, [])

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-xl font-extrabold text-marca-texto">Configuración de la tienda</h1>

      <div className="rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)] p-6 space-y-4">
        <h2 className="font-bold text-sm text-marca-texto">Datos de la tienda</h2>
        {[
          ['nombreTienda',   'Nombre de la tienda'],
          ['correoContacto', 'Correo de contacto'],
          ['telefono',       'Teléfono'],
          ['direccion',      'Dirección'],
        ].map(([clave, etiqueta]) => (
          <div key={clave}>
            <label className="mb-1 block text-xs font-semibold text-marca-texto">{etiqueta}</label>
            <input
              value={config[clave]}
              onChange={e => actualizarCampo(clave, e.target.value)}
              className="campo-admin"
            />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)] p-6 space-y-4">
        <h2 className="font-bold text-sm text-marca-texto">Envíos y pagos</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-marca-texto">Costo de envío (S/.)</label>
            <input
              type="number"
              value={config.costoEnvio}
              onChange={e => actualizarCampo('costoEnvio', e.target.value)}
              className="campo-admin"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-marca-texto">Envío gratis desde (S/.)</label>
            <input
              type="number"
              value={config.envioGratisDesde}
              onChange={e => actualizarCampo('envioGratisDesde', e.target.value)}
              className="campo-admin"
            />
          </div>
        </div>
      </div>

      <button
        onClick={manejarGuardar}
        className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[var(--color-superficie)] transition ${
          guardado ? 'bg-[var(--color-exito)]' : 'bg-marca-naranja hover:bg-marca-naranjaOsc'
        }`}
      >
        <Save size={16} /> {guardado ? '¡Guardado!' : 'Guardar cambios'}
      </button>
    </div>
  )
}

export default ConfiguracionAdminPage
