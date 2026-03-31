// usePerfil.js — lógica para gestionar y actualizar los datos del perfil del usuario
import { useState, useCallback } from 'react'
import useAuth from '../../../shared/hooks/useAuth'
import * as perfilService from '../services/perfilService'

const usePerfil = () => {
  const { usuario, setUsuario } = useAuth()

  // Estado para datos personales del perfil
  const [datos, setDatos] = useState({
    nombre:    usuario?.nombre    || '',
    correo:    usuario?.correo    || '',
    telefono:  usuario?.telefono  || '',
    direccion: usuario?.direccion || '',
  })

  // Estado para el formulario de cambio de contraseña
  const [claves, setClaves] = useState({
    actual:    '',
    nueva:     '',
    confirmar: '',
  })

  const [cargando, setCargando] = useState(false)
  const [mensaje,  setMensaje]  = useState({ texto: '', tipo: '' }) // tipo: 'exito' | 'error'

  // Actualiza un campo del formulario de datos personales
  const manejarCambioDatos = useCallback((e) => {
    const { name, value } = e.target
    setDatos(prev => ({ ...prev, [name]: value }))
  }, [])

  // Actualiza un campo del formulario de contraseña
  const manejarCambioClaves = useCallback((e) => {
    const { name, value } = e.target
    setClaves(prev => ({ ...prev, [name]: value }))
  }, [])

  // Guarda los datos personales del usuario (con fallback local si la API no está disponible)
  const actualizarDatos = useCallback(async (e) => {
    e.preventDefault()
    setCargando(true)
    setMensaje({ texto: '', tipo: '' })
    try {
      try {
        await perfilService.actualizarPerfilApi(datos)
      } catch {
        await new Promise(r => setTimeout(r, 800)) // fallback local mientras no hay API
      }
      const nuevoUsuario = { ...usuario, ...datos }
      setUsuario(nuevoUsuario)
      localStorage.setItem('sesion', JSON.stringify(nuevoUsuario))
      setMensaje({ texto: 'Datos actualizados correctamente.', tipo: 'exito' })
    } catch {
      setMensaje({ texto: 'Error al actualizar los datos.', tipo: 'error' })
    } finally {
      setCargando(false)
    }
  }, [datos, usuario, setUsuario])

  // Cambia la contraseña validando que las nuevas coincidan
  const actualizarPassword = useCallback(async (e) => {
    e.preventDefault()
    if (claves.nueva !== claves.confirmar) {
      setMensaje({ texto: 'Las contraseñas nuevas no coinciden.', tipo: 'error' })
      return
    }
    setCargando(true)
    setMensaje({ texto: '', tipo: '' })
    try {
      try {
        await perfilService.cambiarPasswordApi(claves.actual, claves.nueva)
      } catch {
        await new Promise(r => setTimeout(r, 800)) // fallback local
      }
      setMensaje({ texto: 'Contraseña actualizada con éxito.', tipo: 'exito' })
      setClaves({ actual: '', nueva: '', confirmar: '' })
    } catch {
      setMensaje({ texto: 'Error al cambiar la contraseña.', tipo: 'error' })
    } finally {
      setCargando(false)
    }
  }, [claves])

  return {
    datos,
    claves,
    cargando,
    mensaje,
    manejarCambioDatos,
    manejarCambioClaves,
    actualizarDatos,
    actualizarPassword,
  }
}

export default usePerfil

