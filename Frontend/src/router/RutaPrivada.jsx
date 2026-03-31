// RutaPrivada.jsx — redirige al login si no hay sesión activa
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../shared/hooks/useAuth'
import { Cargando } from '../shared/ui'

const RutaPrivada = () => {
  const { estaAutenticado, cargando } = useAuth()
  const ubicacion = useLocation()

  if (cargando) return <Cargando />

  if (!estaAutenticado)
    return <Navigate to="/login" state={{ desde: ubicacion.pathname }} replace /> // guarda ruta de destino

  return <Outlet />
}

export default RutaPrivada
