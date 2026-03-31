// useGestionBanners.js — CRUD de banners del carrusel usando el hook genérico useGestionCRUD
import { useCallback } from 'react'
import { bannersMock } from '../../../shared/utils/mockData'
import useGestionCRUD from './useGestionCRUD'

const useGestionBanners = () => {
  const crud = useGestionCRUD(bannersMock)

  // Guarda el banner con activo:true por defecto al crear
  const guardar = useCallback((datos) => {
    crud.guardar(datos, { activo: true })
  }, [crud])

  // Alterna la visibilidad del banner
  const toggleActivo = useCallback((id) => {
    const banner = crud.lista.find(b => b.id === id)
    if (banner) crud.actualizarItem(id, { activo: !banner.activo })
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

export default useGestionBanners
