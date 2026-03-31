// useDestacados.js — retorna los productos con destacado:true memorizados
import { useMemo } from 'react'
import { productos } from '../../../shared/utils/mockData'

const useDestacados = () => {
  const destacados = useMemo(
    () => productos.filter(p => p.destacado),
    [] // mock no cambia, se evalúa una sola vez
  )
  return { destacados, total: destacados.length }
}

export default useDestacados
