// perfilService.js — Servicio para actualizar datos del perfil y seguridad en el backend
import api from '../../../shared/services/api'

// Actualiza datos generales del usuario
export const actualizarPerfilApi = async (datos) => {
  try {
    const { data } = await api.put('/profile/update', datos)
    return data
  } catch (err) {
    throw new Error(err.response?.data?.message ?? err.message)
  }
}

// Actualiza la contraseña
export const cambiarPasswordApi = async (actual, nueva) => {
  try {
    const { data } = await api.put('/profile/change-password', { actual, nueva })
    return data
  } catch (err) {
    throw new Error(err.response?.data?.message ?? err.message)
  }
}
