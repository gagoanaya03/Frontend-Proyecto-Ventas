import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useCarrusel from '../hooks/useCarrusel';
import estilos from '../styles/home.module.css';

const Carrusel = ({ banners = [] }) => {
  const navegar = useNavigate();
  const { actual, siguiente, anterior, irA } = useCarrusel(banners, 4000);

  if (!banners.length) return null;

  const bannerActual = banners[actual];

  return (
    <div className={estilos.carrusel} role="region" aria-label="Carrusel de ofertas">
      {/* Imagen con overlay degradado */}
      <div className="relative h-full w-full">
        <img
          key={bannerActual.id}
          src={bannerActual.imagen}
          alt={bannerActual.titulo}
          className={`${estilos.carruselImagen} absolute inset-0`}
        />
        {/* Overlay degradado para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--marca-texto)]/70 via-[var(--marca-texto)]/30 to-transparent" />

        {/* Texto del banner */}
        <div className="absolute inset-0 flex flex-col justify-center px-10 gap-2">
          <h2 className="text-3xl font-extrabold text-[var(--color-superficie)] drop-shadow-lg max-w-lg">
            {bannerActual.titulo}
          </h2>
          <p className="text-base text-[var(--color-superficie)]/80 max-w-md">
            {bannerActual.subtitulo}
          </p>
          {bannerActual.enlace && (
            <button
              onClick={() => navegar(bannerActual.enlace)}
              className="mt-2 w-fit rounded-lg bg-marca-naranja px-5 py-2 text-sm font-bold text-[var(--color-superficie)] transition hover:bg-marca-naranjaOsc"
            >
              Ver productos
            </button>
          )}
        </div>
      </div>

      {/* Controles de navegación */}
      {banners.length > 1 && (
        <div className={estilos.carruselControles} aria-hidden="true">
          <button
            className={estilos.carruselBoton}
            onClick={anterior}
            aria-label="Slide anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className={estilos.carruselBoton}
            onClick={siguiente}
            aria-label="Siguiente slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Indicadores de posición */}
      {banners.length > 1 && (
        <div className={estilos.carruselIndicadores} role="tablist">
          {banners.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === actual}
              aria-label={`Ir al slide ${i + 1}`}
              onClick={() => irA(i)}
              className={`${estilos.indicador} ${i === actual ? estilos.indicadorActivo : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carrusel;
