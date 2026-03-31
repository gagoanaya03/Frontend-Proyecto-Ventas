// productService.js — servicio de productos, stubs listos para el backend
import api from '../../../shared/services/api'

// Obtiene lista de productos con filtros opcionales
export const obtenerProductos = async (filtros = {}) => {
  try {
    const { data } = await api.get('/products', { params: filtros })
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

// Obtiene un producto por su ID
export const obtenerProductoPorId = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}
