// shared/utils/formatters.js
// Funciones utilitarias de formato reutilizables en toda la app.

/**
 * Formatea un número como precio en soles peruanos.
 * Ejemplo: formatearPrecio(1299) → "S/. 1,299.00"
 * @param {number} valor - El valor numérico a formatear
 * @returns {string}
 */
export const formatearPrecio = (valor) => {
  if (typeof valor !== 'number') return 'S/. 0.00';
  return `S/. ${valor.toLocaleString('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Trunca un texto si supera la longitud máxima y agrega puntos suspensivos.
 * Ejemplo: truncarTexto("Texto largo...", 10) → "Texto larg..."
 * @param {string} texto - El texto a truncar
 * @param {number} max - Longitud máxima permitida
 * @returns {string}
 */
export const truncarTexto = (texto, max = 80) => {
  if (typeof texto !== 'string') return '';
  if (texto.length <= max) return texto;
  return `${texto.slice(0, max).trim()}...`;
};

/**
 * Capitaliza la primera letra de un string.
 * Ejemplo: capitalizarPrimera("monitor") → "Monitor"
 * @param {string} texto
 * @returns {string}
 */
export const capitalizarPrimera = (texto) => {
  if (typeof texto !== 'string' || texto.length === 0) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};
