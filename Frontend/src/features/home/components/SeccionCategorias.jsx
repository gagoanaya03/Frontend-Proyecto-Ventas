// features/home/components/SeccionCategorias.jsx
// Grid de categorías navegables con ícono y nombre.
// Cada tarjeta lleva a /products?categoria=X

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Keyboard, Monitor, HardDrive, Headphones, Cpu,
} from 'lucide-react';
import { categorias } from '../../../shared/utils/mockData';
import estilos from '../styles/home.module.css';

/* Mapa de íconos por id de categoría */
const ICONOS = {
  perifericos:    <Keyboard size={32} />,
  monitores:      <Monitor size={32} />,
  almacenamiento: <HardDrive size={32} />,
  audio:          <Headphones size={32} />,
  accesorios:     <Cpu size={32} />,
};

const TarjetaCategoria = ({ categoria, onClick }) => (
  <button
    id={`cat-${categoria.id}`}
    onClick={() => onClick(categoria.id)}
    className={estilos.tarjetaCategoria}
    aria-label={`Ver productos de ${categoria.nombre}`}
  >
    <span className="text-marca-naranja">
      {ICONOS[categoria.id] ?? <Cpu size={32} />}
    </span>
    <span className="text-sm font-semibold text-center">{categoria.nombre}</span>
    <span className="text-xs text-marca-textoSuave">
      {categoria.subcategorias.length} subcategorías
    </span>
  </button>
);

const SeccionCategorias = () => {
  const navegar = useNavigate();

  const irACategoria = useCallback(
    (id) => navegar(`/products?categoria=${id}`),
    [navegar]
  );

  return (
    <section aria-labelledby="titulo-categorias">
      <h2
        id="titulo-categorias"
        className="mb-5 text-xl font-bold text-marca-texto"
      >
        Explorar por categoría
      </h2>
      <div className={estilos.gridCategorias}>
        {categorias.map((cat) => (
          <TarjetaCategoria
            key={cat.id}
            categoria={cat}
            onClick={irACategoria}
          />
        ))}
      </div>
    </section>
  );
};

export default SeccionCategorias;
