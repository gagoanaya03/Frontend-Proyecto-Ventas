// TemaContext.jsx — contexto global del tema oscuro/claro
import { createContext, useState, useEffect, useCallback } from 'react'

export const TemaContext = createContext(null)

export const TemaProvider = ({ children }) => {
  const [tema, setTema] = useState(() => {
    try { return localStorage.getItem('tema') ?? 'dark' }
    catch { return 'dark' }
  })

  useEffect(() => {
    const raiz = document.documentElement
    tema === 'dark'
      ? raiz.classList.add('dark')
      : raiz.classList.remove('dark')
    try { localStorage.setItem('tema', tema) } catch { /* sin persistencia */ }
  }, [tema])

  const alternarTema = useCallback(
    () => setTema(prev => prev === 'dark' ? 'light' : 'dark'),
    []
  )

  const valor = { tema, esModoOscuro: tema === 'dark', alternarTema }

  return <TemaContext.Provider value={valor}>{children}</TemaContext.Provider>
}
