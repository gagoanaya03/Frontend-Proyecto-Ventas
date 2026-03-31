// AuthContext.jsx — autenticación simulada; iniciarSesion/registrar retornan { exito, usuario, mensaje }
import { createContext, useState, useEffect, useCallback } from 'react'
import { usuariosMock } from '../utils/mockData'

export const AuthContext = createContext(null)

const esperar = (ms = 600) => new Promise(r => setTimeout(r, ms)) // simula latencia de red

export const AuthProvider = ({ children }) => {
  const [usuario,  setUsuario]  = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    try {
      const guardado = localStorage.getItem('sesion')
      if (guardado) setUsuario(JSON.parse(guardado))
    } catch {
      localStorage.removeItem('sesion')
    } finally {
      setCargando(false)
    }
  }, [])

  const iniciarSesion = useCallback(async (correo, contrasena) => {
    setCargando(true)
    try {
      await esperar()
      const encontrado = usuariosMock.find(
        u => u.correo === correo && u.contrasena === contrasena
      )
      if (!encontrado) return { exito: false, mensaje: 'Correo o contraseña incorrectos.' }
      const { contrasena: _, ...usuarioSeguro } = encontrado // no guardar la contraseña
      setUsuario(usuarioSeguro)
      localStorage.setItem('sesion', JSON.stringify(usuarioSeguro))
      return { exito: true, usuario: usuarioSeguro, mensaje: 'Sesión iniciada correctamente.' }
    } catch {
      return { exito: false, mensaje: 'Ocurrió un error inesperado.' }
    } finally {
      setCargando(false)
    }
  }, [])

  const registrar = useCallback(async (nombre, correo, contrasena) => {
    setCargando(true)
    try {
      await esperar()
      if (usuariosMock.some(u => u.correo === correo))
        return { exito: false, mensaje: 'Este correo ya está registrado.' }
      const nuevo = { id: Date.now(), nombre, correo, rol: 'cliente', activo: true, fechaRegistro: new Date().toISOString().slice(0,10) }
      usuariosMock.push({ ...nuevo, contrasena }) // agrega al array en memoria
      setUsuario(nuevo)
      localStorage.setItem('sesion', JSON.stringify(nuevo))
      return { exito: true, usuario: nuevo, mensaje: 'Cuenta creada exitosamente.' }
    } catch {
      return { exito: false, mensaje: 'Ocurrió un error inesperado.' }
    } finally {
      setCargando(false)
    }
  }, [])

  const cerrarSesion = useCallback(() => {
    setUsuario(null)
    try { localStorage.removeItem('sesion') } catch { /* sin persistencia */ }
  }, [])

  const valor = {
    usuario,
    cargando,
    estaAutenticado: !!usuario,
    esAdmin: usuario?.rol === 'admin',
    iniciarSesion,
    registrar,
    cerrarSesion,
    setUsuario, // expuesto para que usePerfil pueda actualizar datos sin conocer el contexto completo
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
