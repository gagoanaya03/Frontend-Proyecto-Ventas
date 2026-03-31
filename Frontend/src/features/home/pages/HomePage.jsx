// features/home/pages/HomePage.jsx
// Página de inicio. Solo renderiza las secciones; la lógica vive en los hooks.

import { useState, useEffect } from 'react';
import Carrusel from '../components/Carrusel';
import ProductoDestacadoCard from '../components/ProductoDestacadoCard';
import SeccionCategorias from '../components/SeccionCategorias';
import useDestacados from '../hooks/useDestacados';
import { obtenerBanners } from '../services/homeService';
import estilos from '../styles/home.module.css';

const HomePage = () => {
  const { destacados } = useDestacados();
  const [banners, setBanners]   = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarBanners = async () => {
      try {
        const datos = await obtenerBanners();
        setBanners(datos);
      } catch {
        // Si falla, el carrusel simplemente no muestra nada
      } finally {
        setCargando(false);
      }
    };
    cargarBanners();
  }, []);

  return (
    <div className="contenedor py-6 space-y-10">

      {/* ── CARRUSEL ── */}
      <section aria-label="Ofertas y novedades">
        {cargando ? (
          <div className="aspect-[16/5] animate-pulse rounded-xl bg-marca-azulMedio" />
        ) : (
          <Carrusel banners={banners} />
        )}
      </section>

      {/* ── CATEGORÍAS ── */}
      <SeccionCategorias />

      {/* ── PRODUCTOS DESTACADOS ── */}
      <section aria-labelledby="titulo-destacados">
        <h2
          id="titulo-destacados"
          className="mb-5 text-xl font-bold text-marca-texto"
        >
          Productos destacados
        </h2>
        <div className={estilos.gridDestacados}>
          {destacados.map((producto) => (
            <ProductoDestacadoCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;
