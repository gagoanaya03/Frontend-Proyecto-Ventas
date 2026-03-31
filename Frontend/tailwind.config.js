/** @type {import('tailwindcss').Config} */
export default {
  // Modo oscuro activado por clase en el elemento root
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Paleta de marca J&P Periféricos conectada a variables CSS dinámicas
      colors: {
        marca: {
          azul:       'var(--marca-azul)',       // Fondo principal (blanco en claro / azulOsc en oscuro)
          azulMedio:  'var(--marca-azulMedio)',  // Cards y secciones (gris suave en claro / azulMed en oscuro)
          azulClaro:  'var(--marca-azulClaro)',  // Bordes y separadores
          naranja:    'var(--color-acento)',     // Acento naranja
          naranjaOsc: 'var(--color-acento-hover)',
          texto:      'var(--marca-texto)',      // Texto principal (azulOsc en claro / grisClaro en oscuro)
          textoSuave: 'var(--marca-textoSuave)',
        },
      },
      // Fuente principal del proyecto
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      // Animaciones suaves para componentes
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}

