// useGestionCupones.js — CRUD de cupones de descuento usando el hook genérico useGestionCRUD
import { useCallback } from 'react'
import { cuponesMock } from '../../../shared/utils/mockData'
import useGestionCRUD from './useGestionCRUD'

const useGestionCupones = () => {
  const crud = useGestionCRUD(cuponesMock)

  // Guarda el cupón con activo:true por defecto al crear
  const guardar = useCallback((datos) => {
    crud.guardar(datos, { activo: true })
  }, [crud])

  // Alterna el estado activo/inactivo del cupón
  const toggleActivo = useCallback((id) => {
    const cupon = crud.lista.find(c => c.id === id)
    if (cupon) crud.actualizarItem(id, { activo: !cupon.activo })
  }, [crud])

  return {
    lista:        crud.lista,
    seleccionado: crud.seleccionado,
    modalAbierto: crud.modalAbierto,
    abrirCrear:   crud.abrirCrear,
    abrirEditar:  crud.abrirEditar,
    cerrarModal:  crud.cerrarModal,
    guardar,
    eliminar:     crud.eliminar,
    toggleActivo,
  }
}

export default useGestionCupones
