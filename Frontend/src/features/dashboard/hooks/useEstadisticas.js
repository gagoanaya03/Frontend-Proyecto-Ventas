// dashboard/hooks/useEstadisticas.js — calcula estadísticas del catálogo para el panel admin
import { useMemo } from 'react'
import { productos, categorias } from '../../../shared/utils/mockData'

const useEstadisticas = () => {
  const estadisticas = useMemo(() => ({
    totalProductos:  productos.length,
    totalCategorias: categorias.length,
    productosSinStock: productos.filter(p => p.stock === 0).length,
    productosDestacados: productos.filter(p => p.destacado).length,
    precioPromedio: productos.reduce((acc, p) => acc + p.precio, 0) / productos.length,
  }), [])

  return estadisticas
}

export default useEstadisticas
