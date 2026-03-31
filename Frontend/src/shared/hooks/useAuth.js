// useAuth.js — accede al AuthContext, lanza error si se usa fuera del provider
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}

export default useAuth
