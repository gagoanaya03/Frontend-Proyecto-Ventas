// useGestionProductos.js — CRUD de productos usando el hook genérico useGestionCRUD
import { useCallback } from 'react'
import { productos as catalogoInicial } from '../../../shared/utils/mockData'
import useGestionCRUD from './useGestionCRUD'

const useGestionProductos = () => {
  const crud = useGestionCRUD(catalogoInicial)

  // Guarda con precio y stock convertidos a número
  const guardar = useCallback((datos) => {
    crud.guardar({
      ...datos,
      precio: Number(datos.precio),
      stock:  Number(datos.stock),
    })
  }, [crud])

  // Alterna el campo destacado del producto
  const toggleDestacado = useCallback((id) => {
    const producto = crud.lista.find(p => p.id === id)
    if (producto) crud.actualizarItem(id, { destacado: !producto.destacado })
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
    toggleDestacado,
  }
}

export default useGestionProductos
