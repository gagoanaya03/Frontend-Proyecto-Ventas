// useFiltros.js — lee y sincroniza filtros activos desde query params de la URL
import { useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

const useFiltros = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filtros = useMemo(() => ({
    busqueda:     searchParams.get('q')            ?? '',
    categoria:    searchParams.get('categoria')    ?? '',
    subcategoria: searchParams.get('subcategoria') ?? '',
  }), [searchParams])

  // Actualiza un filtro concreto manteniendo los demás intactos
  const actualizarFiltro = useCallback((clave, valor) => {
    const params = new URLSearchParams(searchParams)
    valor ? params.set(clave, valor) : params.delete(clave)
    setSearchParams(params, { replace: true })
  }, [searchParams, setSearchParams])

  // Elimina todos los filtros activos
  const limpiarFiltros = useCallback(() => setSearchParams({}, { replace: true }), [setSearchParams])

  return {
    ...filtros,
    actualizarFiltro,
    limpiarFiltros,
    hayFiltrosActivos: !!(filtros.busqueda || filtros.categoria || filtros.subcategoria),
  }
}

export default useFiltros
