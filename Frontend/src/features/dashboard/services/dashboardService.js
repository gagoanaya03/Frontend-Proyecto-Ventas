// dashboard/services/dashboardService.js — servicio del panel admin, listo para el backend
import api from '../../../shared/services/api'

// Obtiene estadísticas globales del panel
export const obtenerEstadisticasApi = async () => {
  try {
    const { data } = await api.get('/admin/stats')
    return data
  } catch (err) {
    throw new Error(err.response?.data?.message ?? err.message)
  }
}

// Obtiene todas las órdenes para gestión admin
export const obtenerOrdenesAdmin = async () => {
  try {
    const { data } = await api.get('/admin/orders')
    return data
  } catch (err) {
    throw new Error(err.response?.data?.message ?? err.message)
  }
}
