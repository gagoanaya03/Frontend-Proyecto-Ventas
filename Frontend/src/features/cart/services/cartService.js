// cart/services/cartService.js — servicio de órdenes, listo para conectar al backend
import api from '../../../shared/services/api'

// Envía el pedido al backend
export const crearOrden = async (items, datosEnvio) => {
  try {
    const { data } = await api.post('/orders', { items, datosEnvio })
    return data
  } catch (err) {
    throw new Error(err.response?.data?.message ?? err.message)
  }
}

// Obtiene el historial de órdenes del usuario autenticado
export const obtenerOrdenes = async () => {
  try {
    const { data } = await api.get('/orders')
    return data
  } catch (err) {
    throw new Error(err.response?.data?.message ?? err.message)
  }
}
