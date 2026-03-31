// badgeEstado.js — configuración de estilos para badges de estado (ventas, cupones, etc.)

export const ESTILOS_BADGE = {
  entregado:  'bg-green-500/10 text-green-400',
  enviado:    'bg-blue-500/10 text-blue-400',
  procesando: 'bg-yellow-500/10 text-yellow-400',
  pendiente:  'bg-orange-500/10 text-orange-400',
  activo:     'bg-green-500/10 text-green-400',
  inactivo:   'bg-gray-500/10 text-gray-400',
}

/**
 * Retorna la clase CSS correspondiente al estado, o un valor por defecto.
 * @param {string} estado 
 * @returns {string}
 */
export const obtenerClaseBadge = (estado) => {
  return ESTILOS_BADGE[estado?.toLowerCase()] ?? 'bg-gray-500/10 text-gray-400'
}
