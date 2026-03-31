// shared/components/Footer.jsx
// Footer completo de la tienda con 4 columnas de links, redes sociales,
// Libro de Reclamaciones, y barra de derechos reservados.
// Solo decorativo — sin funcionalidad de navegación real.

import { Link } from 'react-router-dom';
import {
  Facebook, Twitter, Instagram, Youtube,
  FileText, ShieldCheck,
} from 'lucide-react';

/* ── Datos de columnas ────────────────────────────────── */
const COLUMNAS = [
  {
    titulo: 'Te ayudamos',
    links: [
      { label: 'Libro de reclamaciones', icono: FileText, destacado: true },
      { label: 'Centro de ayuda'         },
      { label: 'Servicio al cliente'     },
      { label: 'Legales'                 },
      { label: 'Tipos de entrega'        },
      { label: 'Estado del pedido'       },
      { label: 'Cambios y Devoluciones'  },
      { label: 'Boletas y Facturas'      },
      { label: 'Danos tu opinión'        },
    ],
  },
  {
    titulo: 'Gestiona tu cuenta',
    links: [
      { label: 'Mi cuenta'              },
      { label: 'Regístrate ahora'       },
      { label: 'Recuperar mi clave'     },
      { label: 'Historial de pedidos'   },
      { label: 'Mis favoritos'          },
    ],
  },
  {
    titulo: 'Nuestros canales',
    links: [
      { label: 'Tiendas J&P'            },
      { label: 'Venta empresarial'      },
      { label: 'Venta telefónica'       },
      { label: 'WhatsApp'               },
      { label: 'Chat en línea'          },
      { label: 'Cyber Wow'              },
      { label: 'Black Friday'           },
    ],
  },
  {
    titulo: 'Nuestra empresa',
    links: [
      { label: 'Nuestra historia'       },
      { label: 'Trabaja con nosotros'   },
      { label: 'Sostenibilidad'         },
      { label: 'Canal de Integridad'    },
      { label: 'Proveedores'            },
    ],
  },
];

const REDES = [
  { icono: Facebook,  label: 'Facebook'  },
  { icono: Twitter,   label: 'Twitter'   },
  { icono: Instagram, label: 'Instagram' },
  { icono: Youtube,   label: 'YouTube'   },
];

/* ── Componente ───────────────────────────────────────── */
const Footer = () => (
  <footer
    aria-label="Pie de página"
    style={{ background: 'var(--color-footer-fondo)', color: '#94A3B8', fontFamily: 'inherit' }}
  >
    {/* ── Columnas de links ─────────────────────────── */}
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px 24px 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '32px',
      }}
    >
      {COLUMNAS.map((col) => (
        <div key={col.titulo}>
          <h3
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#F1F5F9',
              marginBottom: '16px',
              letterSpacing: '0.02em',
            }}
          >
            {col.titulo}
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {col.links.map(({ label, icono: Icono, destacado }) => (
              <li key={label}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8125rem',
                    color: destacado ? '#F97316' : '#94A3B8',
                    textDecoration: 'none',
                    transition: 'color 150ms',
                    fontWeight: destacado ? 600 : 400,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = destacado ? '#EA580C' : '#F1F5F9'}
                  onMouseLeave={(e) => e.currentTarget.style.color = destacado ? '#F97316' : '#94A3B8'}
                >
                  {Icono && <Icono size={14} />}
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* ── Separador ─────────────────────────────────── */}
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

    {/* ── Redes sociales + links legales ────────────── */}
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '20px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}
    >
      {/* Redes */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {REDES.map(({ icono: Icono, label }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            onClick={(e) => e.preventDefault()}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '34px', height: '34px', borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#64748B',
              textDecoration: 'none',
              transition: 'all 150ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#F97316';
              e.currentTarget.style.color = '#F97316';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.color = '#64748B';
            }}
          >
            <Icono size={16} />
          </a>
        ))}
      </div>

      {/* Links legales */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
        {['Términos y condiciones', 'Política de cookies', 'Política de privacidad', 'Datos Personales'].map((item) => (
          <a
            key={item}
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              fontSize: '0.75rem', color: '#64748B',
              textDecoration: 'none', transition: 'color 150ms',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#F1F5F9'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
          >
            {item}
          </a>
        ))}

        {/* Badge compra segura */}
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '0.75rem', fontWeight: 600, color: '#4ADE80',
          }}
        >
          <ShieldCheck size={14} />
          COMPRA 100% SEGURA
        </span>
      </div>
    </div>

    {/* ── Copyright ─────────────────────────────────── */}
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '14px 24px' }}>
      <p
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          fontSize: '0.72rem',
          color: '#475569',
          textAlign: 'center',
        }}
      >
        © {new Date().getFullYear()} TODOS LOS DERECHOS RESERVADOS — J&P Periféricos S.A.C.
        &nbsp;|&nbsp; Jr. Las Flores 123, Surquillo – Lima, Perú
      </p>
    </div>
  </footer>
);

export default Footer;
