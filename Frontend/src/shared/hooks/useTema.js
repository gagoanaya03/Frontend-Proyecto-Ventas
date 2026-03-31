// useTema.js — accede al TemaContext, lanza error si se usa fuera del provider
import { useContext } from 'react'
import { TemaContext } from '../context/TemaContext'

const useTema = () => {
  const ctx = useContext(TemaContext)
  if (!ctx) throw new Error('useTema debe usarse dentro de <TemaProvider>')
  return ctx
}

export default useTema
