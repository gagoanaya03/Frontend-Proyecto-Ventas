// useGestionUsuarios.js — operaciones sobre el array de usuarios en memoria
import { useState, useCallback } from 'react'
import { usuariosMock } from '../../../shared/utils/mockData'

const useGestionUsuarios = () => {
  const [lista, setLista] = useState(
    usuariosMock.filter(u => u.rol === 'cliente') // solo clientes, no admins
  )

  const toggleActivo = useCallback((id) => {
    setLista(prev => prev.map(u => u.id === id ? { ...u, activo: !u.activo } : u))
  }, [])

  const eliminar = useCallback((id) => {
    setLista(prev => prev.filter(u => u.id !== id))
  }, [])

  return { lista, totalActivos: lista.filter(u => u.activo).length, toggleActivo, eliminar }
}

export default useGestionUsuarios
