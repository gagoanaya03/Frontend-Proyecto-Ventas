import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Hook para manejar la lógica de un carrusel con auto-avance.
 * @param {Array} items - Lista de elementos del carrusel
 * @param {number} intervalo - Tiempo en ms entre cambios (default 5000)
 */
const useCarrusel = (items = [], intervalo = 5000) => {
  const [actual, setActual] = useState(0)
  const timerRef = useRef(null)

  const siguiente = useCallback(() => {
    setActual(prev => (prev === items.length - 1 ? 0 : prev + 1))
  }, [items.length])

  const anterior = useCallback(() => {
    setActual(prev => (prev === 0 ? items.length - 1 : prev - 1))
  }, [items.length])

  const irA = useCallback((index) => {
    setActual(index)
  }, [])

  // Reiniciar temporizador cuando cambia el slide actual
  const reiniciarTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (items.length > 1) {
      timerRef.current = setInterval(siguiente, intervalo)
    }
  }, [siguiente, items.length, intervalo])

  useEffect(() => {
    reiniciarTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [reiniciarTimer])

  return {
    actual,
    siguiente,
    anterior,
    irA,
    setActual,
    reiniciarTimer
  }
}

export default useCarrusel
