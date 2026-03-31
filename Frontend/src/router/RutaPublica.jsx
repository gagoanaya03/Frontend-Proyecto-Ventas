// RutaPublica.jsx — redirige si ya hay sesión: admin a su panel, cliente al home
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../shared/hooks/useAuth'
import { Cargando } from '../shared/ui'

const RutaPublica = () => {
  const { estaAutenticado, esAdmin, cargando } = useAuth()

  if (cargando) return <Cargando />

  if (estaAutenticado)
    return <Navigate to={esAdmin ? '/dashboard/admin' : '/'} replace /> // destino según rol

  return <Outlet />
}

export default RutaPublica
