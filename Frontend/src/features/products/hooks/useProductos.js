// useProductos.js — filtra el catálogo completo según búsqueda, categoría y subcategoría
import { useMemo } from 'react'
import { productos as catalogo } from '../../../shared/utils/mockData'

// Retorna el catálogo filtrado según los parámetros recibidos
const useProductos = ({ busqueda = '', categoria = '', subcategoria = '' } = {}) => {
  const cargando = false
  const error    = null

  const productosFiltrados = useMemo(() => {
    let resultado = catalogo
    if (categoria)    resultado = resultado.filter(p => p.categoria    === categoria)
    if (subcategoria) resultado = resultado.filter(p => p.subcategoria === subcategoria)
    if (busqueda.trim()) {
      const terminoBusqueda = busqueda.toLowerCase().trim()
      resultado = resultado.filter(
        p => p.nombre.toLowerCase().includes(terminoBusqueda)
          || p.marca.toLowerCase().includes(terminoBusqueda)
          || p.descripcion.toLowerCase().includes(terminoBusqueda)
      )
    }
    return resultado
  }, [busqueda, categoria, subcategoria])

  return { productosFiltrados, total: productosFiltrados.length, cargando, error }
}

export default useProductos

