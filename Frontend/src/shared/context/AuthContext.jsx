// AuthContext.jsx — autenticación real con API backend (Laravel Sanctum)
import { createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export const AuthContext = createContext(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Crear instancia de axios con configuración por defecto
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => Promise.reject(error))

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  // Cargar token guardado al montar el componente
  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      const usuarioGuardado = localStorage.getItem('usuario')
      if (token && usuarioGuardado) {
        setUsuario(JSON.parse(usuarioGuardado))
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    } catch (error) {
      console.error('Error restaurando sesión:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
    } finally {
      setCargando(false)
    }
  }, [])

  const iniciarSesion = useCallback(async (correo, contrasena) => {
    setCargando(true)
    try {
      const respuesta = await api.post('/auth/login', {
        email: correo,
        password: contrasena,
      })

      // Validar respuesta
      if (!respuesta.data?.data?.token) {
        return { exito: false, mensaje: 'Respuesta inesperada del servidor' }
      }

      const { token, user } = respuesta.data.data
      
      // Guardar token y usuario
      localStorage.setItem('token', token)
      localStorage.setItem('usuario', JSON.stringify(user))
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      setUsuario(user)
      
      return { 
        exito: true, 
        usuario: user, 
        mensaje: 'Sesión iniciada correctamente.' 
      }
    } catch (error) {
      const mensaje = error.response?.data?.message || 
                      error.response?.data?.errors?.email?.[0] ||
                      'Correo o contraseña incorrectos.'
      return { exito: false, mensaje }
    } finally {
      setCargando(false)
    }
  }, [])

  const registrar = useCallback(async (nombre, correo, contrasena, contrasena_confirmation) => {
    setCargando(true)
    try {
      const respuesta = await api.post('/auth/register', {
        name: nombre,
        email: correo,
        password: contrasena,
        password_confirmation: contrasena_confirmation,
      })

      // Validar respuesta
      if (!respuesta.data?.data?.token) {
        return { exito: false, mensaje: 'Respuesta inesperada del servidor' }
      }

      const { token, user } = respuesta.data.data
      
      // Guardar token y usuario
      localStorage.setItem('token', token)
      localStorage.setItem('usuario', JSON.stringify(user))
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      setUsuario(user)
      
      return { 
        exito: true, 
        usuario: user, 
        mensaje: 'Cuenta creada exitosamente.' 
      }
    } catch (error) {
      const mensaje = error.response?.data?.message || 
                      error.response?.data?.errors?.email?.[0] ||
                      'Ocurrió un error al registrar.'
      return { exito: false, mensaje }
    } finally {
      setCargando(false)
    }
  }, [])

  const cerrarSesion = useCallback(async () => {
    try {
      // Intentar hacer logout en el servidor
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Error al hacer logout:', error)
    } finally {
      // Limpiar estado local aunque falle en el servidor
      setUsuario(null)
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      delete api.defaults.headers.common['Authorization']
    }
  }, [])

  const valor = {
    usuario,
    cargando,
    estaAutenticado: !!usuario,
    esAdmin: usuario?.rol === 'admin',
    iniciarSesion,
    registrar,
    cerrarSesion,
    setUsuario,
    api, // Exportar la instancia de axios para usar en otros hooks
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
