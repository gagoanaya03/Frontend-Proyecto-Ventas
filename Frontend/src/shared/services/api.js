// api.js — instancia Axios con interceptores de token y errores 401
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(config => {
  try {
    const sesion = localStorage.getItem('sesion')
    if (sesion) {
      const { token } = JSON.parse(sesion)
      if (token) config.headers.Authorization = `Bearer ${token}` // adjunta JWT
    }
  } catch { /* sin token, continuar */ }
  return config
}, err => Promise.reject(err))

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) { // sesión expirada
      try { localStorage.removeItem('sesion') } catch { /* ignorar */ }
      if (typeof window !== 'undefined') window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
