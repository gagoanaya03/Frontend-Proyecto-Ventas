// auth/services/authService.js — servicio de autenticación, llama al backend cuando esté disponible
import api from '../../../shared/services/api'

// Envía credenciales al backend
export const loginApi = async (correo, contrasena) => {
  try {
    const { data } = await api.post('/auth/login', { correo, contrasena })
    return data
  } catch (err) {
    throw new Error(err.response?.data?.message ?? err.message)
  }
}

// Registra un nuevo usuario
export const registrarApi = async (nombre, correo, contrasena) => {
  try {
    const { data } = await api.post('/auth/register', { nombre, correo, contrasena })
    return data
  } catch (err) {
    throw new Error(err.response?.data?.message ?? err.message)
  }
}

// Solicita enlace de recuperación de contraseña
export const recuperarApi = async (correo) => {
  try {
    const { data } = await api.post('/auth/recover', { correo })
    return data
  } catch (err) {
    throw new Error(err.response?.data?.message ?? err.message)
  }
}
