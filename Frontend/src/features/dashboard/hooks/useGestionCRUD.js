// dashboard/hooks/useGestionCRUD.js — hook genérico para CRUD de entidades en memoria
// Elimina la duplicación de lista/seleccionado/modalAbierto en useGestionProductos,
// useGestionBanners y useGestionCupones.
import { useState, useCallback } from 'react'

/**
 * @param {Array} datosIniciales - Array inicial de entidades a gestionar
 * @returns {{ lista, seleccionado, modalAbierto, abrirCrear, abrirEditar, cerrarModal, guardar, eliminar, actualizarItem }}
 */
const useGestionCRUD = (datosIniciales = []) => {
  const [lista,        setLista]        = useState([...datosIniciales])
  const [seleccionado, setSeleccionado] = useState(null)
  const [modalAbierto, setModalAbierto] = useState(false)

  const abrirCrear  = useCallback(() => { setSeleccionado(null); setModalAbierto(true) }, [])
  const abrirEditar = useCallback(item  => { setSeleccionado(item); setModalAbierto(true) }, [])
  const cerrarModal = useCallback(()   => { setSeleccionado(null); setModalAbierto(false) }, [])

  // Crea un nuevo item o actualiza el existente según si tiene id
  const guardar = useCallback((datos, camposExtra = {}) => {
    setLista(prev =>
      datos.id
        ? prev.map(item => item.id === datos.id ? { ...item, ...datos } : item)
        : [...prev, { ...datos, ...camposExtra, id: Date.now() }]
    )
    cerrarModal()
  }, [cerrarModal])

  const eliminar = useCallback((id) => {
    setLista(prev => prev.filter(item => item.id !== id))
  }, [])

  // Actualiza un campo booleano o cualquier propiedad de un item por su id
  const actualizarItem = useCallback((id, actualizacion) => {
    setLista(prev => prev.map(item => item.id === id ? { ...item, ...actualizacion } : item))
  }, [])

  return { lista, seleccionado, modalAbierto, abrirCrear, abrirEditar, cerrarModal, guardar, eliminar, actualizarItem }
}

export default useGestionCRUD
