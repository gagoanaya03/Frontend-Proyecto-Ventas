// CarritoContext.jsx — carrito con useReducer, persiste en localStorage
import { createContext, useReducer, useMemo, useCallback, useEffect } from 'react'

export const CarritoContext = createContext(null)

const carritoReducer = (estado, accion) => {
  switch (accion.type) {
    case 'AGREGAR': {
      const existe = estado.items.find(i => i.id === accion.payload.id)
      if (existe) return {
        ...estado,
        items: estado.items.map(i =>
          i.id === accion.payload.id
            ? { ...i, cantidad: i.cantidad + (accion.payload.cantidad ?? 1) }
            : i
        ),
      }
      return { ...estado, items: [...estado.items, { ...accion.payload, cantidad: accion.payload.cantidad ?? 1 }] }
    }
    case 'ELIMINAR':
      return { ...estado, items: estado.items.filter(i => i.id !== accion.payload) }
    case 'ACTUALIZAR_CANTIDAD': {
      const { id, cantidad } = accion.payload
      if (cantidad <= 0) return { ...estado, items: estado.items.filter(i => i.id !== id) }
      return { ...estado, items: estado.items.map(i => i.id === id ? { ...i, cantidad } : i) }
    }
    case 'VACIAR':         return { ...estado, items: [] }
    case 'TOGGLE_DRAWER':  return { ...estado, estaAbierto: !estado.estaAbierto }
    case 'ABRIR_DRAWER':   return { ...estado, estaAbierto: true }
    case 'CERRAR_DRAWER':  return { ...estado, estaAbierto: false }
    default:               return estado
  }
}

const obtenerEstadoInicial = () => {
  try {
    const guardado = localStorage.getItem('carrito')
    if (guardado) return { items: JSON.parse(guardado), estaAbierto: false }
  } catch { /* datos corruptos */ }
  return { items: [], estaAbierto: false }
}

export const CarritoProvider = ({ children }) => {
  const [estado, despachar] = useReducer(carritoReducer, null, obtenerEstadoInicial)

  useEffect(() => {
    try { localStorage.setItem('carrito', JSON.stringify(estado.items)) }
    catch { /* sin persistencia */ }
  }, [estado.items])

  const totalItems  = useMemo(() => estado.items.reduce((acc, i) => acc + i.cantidad, 0), [estado.items])
  const totalPrecio = useMemo(() => estado.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0), [estado.items])

  const agregarAlCarrito    = useCallback((p, cantidad = 1) => despachar({ type: 'AGREGAR',            payload: { ...p, cantidad } }), [])
  const eliminarDelCarrito  = useCallback(id               => despachar({ type: 'ELIMINAR',           payload: id }), [])
  const actualizarCantidad  = useCallback((id, cantidad)   => despachar({ type: 'ACTUALIZAR_CANTIDAD', payload: { id, cantidad } }), [])
  const vaciarCarrito       = useCallback(()               => despachar({ type: 'VACIAR' }), [])
  const toggleDrawer        = useCallback(()               => despachar({ type: 'TOGGLE_DRAWER' }), [])
  const abrirDrawer         = useCallback(()               => despachar({ type: 'ABRIR_DRAWER' }), [])
  const cerrarDrawer        = useCallback(()               => despachar({ type: 'CERRAR_DRAWER' }), [])

  const valor = {
    items: estado.items, estaAbierto: estado.estaAbierto,
    totalItems, totalPrecio,
    agregarAlCarrito, eliminarDelCarrito, actualizarCantidad,
    vaciarCarrito, toggleDrawer, abrirDrawer, cerrarDrawer,
  }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}
