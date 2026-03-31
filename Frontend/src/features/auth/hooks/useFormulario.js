// auth/hooks/useFormulario.js — maneja el estado y validación de formularios de auth
import { useState, useCallback } from 'react'

const useFormulario = (valoresIniciales = {}) => {
  const [valores, setValores]   = useState(valoresIniciales)
  const [errores, setErrores]   = useState({})
  const [enviando, setEnviando] = useState(false)

  const manejarCambio = useCallback(e => {
    const { name, value } = e.target
    setValores(prev => ({ ...prev, [name]: value }))
    setErrores(prev => ({ ...prev, [name]: '' })) // limpia error del campo al escribir
  }, [])

  const resetear = useCallback(() => {
    setValores(valoresIniciales)
    setErrores({})
  }, [valoresIniciales])

  return { valores, errores, setErrores, enviando, setEnviando, manejarCambio, resetear }
}

export default useFormulario
