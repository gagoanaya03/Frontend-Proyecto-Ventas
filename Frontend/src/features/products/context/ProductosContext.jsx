// features/products/context/ProductosContext.jsx
// Contexto local de la feature products (disponible para expansión futura).
// Por ahora gestiona el estado de ordenamiento del grid.

import { createContext, useState, useContext } from 'react';

const ProductosContext = createContext(null);

export const ProductosProvider = ({ children }) => {
  const [orden, setOrden] = useState('defecto'); // 'defecto' | 'precio-asc' | 'precio-desc' | 'nombre'

  const valor = { orden, setOrden };

  return (
    <ProductosContext.Provider value={valor}>
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductosContext = () => {
  const contexto = useContext(ProductosContext);
  if (!contexto) {
    throw new Error('useProductosContext debe usarse dentro de un <ProductosProvider>');
  }
  return contexto;
};

export default ProductosContext;
