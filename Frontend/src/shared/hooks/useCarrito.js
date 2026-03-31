// useCarrito.js — accede al CarritoContext, lanza error si se usa fuera del provider
import { useContext } from 'react'
import { CarritoContext } from '../context/CarritoContext'

const useCarrito = () => {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  return ctx
}

export default useCarrito
