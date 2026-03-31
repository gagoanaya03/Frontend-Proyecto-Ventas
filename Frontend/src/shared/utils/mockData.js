// shared/utils/mockData.js
// Datos simulados para el catálogo de J&P Periféricos S.A.C.
// Estos datos reemplazan al backend hasta la integración real.

/* ============================================================
   CATEGORÍAS CON SUBCATEGORÍAS
   ============================================================ */
export const categorias = [
  /* ── Tecnología ─────────────────────────────────── */
  {
    id: 'electronica',
    nombre: 'Electrónica',
    icono: 'zap',
    subcategorias: [
      { id: 'smartphones',   nombre: 'Smartphones'    },
      { id: 'laptops',       nombre: 'Laptops'        },
      { id: 'tablets',       nombre: 'Tablets'        },
      { id: 'smartwatches',  nombre: 'Smartwatches'   },
      { id: 'camaras',       nombre: 'Cámaras'        },
      { id: 'tv',            nombre: 'Televisores'    },
    ],
  },
  {
    id: 'perifericos',
    nombre: 'Periféricos',
    icono: 'keyboard',
    subcategorias: [
      { id: 'teclados',  nombre: 'Teclados'  },
      { id: 'mouses',    nombre: 'Mouses'    },
      { id: 'headsets',  nombre: 'Headsets'  },
      { id: 'webcams',   nombre: 'Webcams'   },
    ],
  },
  {
    id: 'monitores',
    nombre: 'Monitores',
    icono: 'monitor',
    subcategorias: [
      { id: 'gaming',    nombre: 'Gaming'     },
      { id: 'oficina',   nombre: 'Oficina'    },
      { id: 'curvo',     nombre: 'Curvo'      },
      { id: '4k',        nombre: '4K / UHD'  },
    ],
  },
  {
    id: 'almacenamiento',
    nombre: 'Almacenamiento',
    icono: 'hard-drive',
    subcategorias: [
      { id: 'ssd',       nombre: 'SSD'        },
      { id: 'hdd',       nombre: 'HDD'        },
      { id: 'nvme',      nombre: 'NVMe'       },
      { id: 'usb',       nombre: 'USB Flash'  },
    ],
  },
  {
    id: 'audio',
    nombre: 'Audio',
    icono: 'headphones',
    subcategorias: [
      { id: 'auriculares', nombre: 'Auriculares' },
      { id: 'parlantes',   nombre: 'Parlantes'   },
      { id: 'microfonos',  nombre: 'Micrófonos'  },
    ],
  },
  {
    id: 'accesorios',
    nombre: 'Accesorios',
    icono: 'cpu',
    subcategorias: [
      { id: 'alfombrillas', nombre: 'Alfombrillas' },
      { id: 'soportes',     nombre: 'Soportes'     },
      { id: 'cables',       nombre: 'Cables'       },
      { id: 'hubs',         nombre: 'Hubs USB'     },
    ],
  },
  /* ── Moda ────────────────────────────────────────── */
  {
    id: 'ropa',
    nombre: 'Ropa',
    icono: 'shirt',
    subcategorias: [
      { id: 'camisetas',   nombre: 'Camisetas'    },
      { id: 'pantalones',  nombre: 'Pantalones'   },
      { id: 'chaquetas',   nombre: 'Chaquetas'    },
      { id: 'vestidos',    nombre: 'Vestidos'     },
      { id: 'ropa-interior', nombre: 'Ropa Interior' },
      { id: 'calzado',     nombre: 'Calzado'      },
    ],
  },
  /* ── Hogar ───────────────────────────────────────── */
  {
    id: 'hogar',
    nombre: 'Hogar',
    icono: 'home',
    subcategorias: [
      { id: 'muebles',      nombre: 'Muebles'       },
      { id: 'cocina',       nombre: 'Cocina'        },
      { id: 'decoracion',   nombre: 'Decoración'    },
      { id: 'iluminacion',  nombre: 'Iluminación'   },
      { id: 'electrodomesticos', nombre: 'Electrodomésticos' },
      { id: 'jardin',       nombre: 'Jardín'        },
    ],
  },
  /* ── Deportes ────────────────────────────────────── */
  {
    id: 'deportes',
    nombre: 'Deportes',
    icono: 'dumbbell',
    subcategorias: [
      { id: 'fitness',      nombre: 'Fitness'       },
      { id: 'futbol',       nombre: 'Fútbol'        },
      { id: 'natacion',     nombre: 'Natación'      },
      { id: 'ciclismo',     nombre: 'Ciclismo'      },
      { id: 'running',      nombre: 'Running'       },
      { id: 'outdoor',      nombre: 'Outdoor'       },
    ],
  },
  /* ── Libros ──────────────────────────────────────── */
  {
    id: 'libros',
    nombre: 'Libros',
    icono: 'book-open',
    subcategorias: [
      { id: 'tecnologia-libros', nombre: 'Tecnología'   },
      { id: 'ficcion',           nombre: 'Ficción'      },
      { id: 'negocios',          nombre: 'Negocios'     },
      { id: 'educacion',         nombre: 'Educación'    },
      { id: 'infantil',          nombre: 'Infantil'     },
      { id: 'comics',            nombre: 'Cómics / Manga' },
    ],
  },
  /* ── Belleza ─────────────────────────────────────── */
  {
    id: 'belleza',
    nombre: 'Belleza',
    icono: 'sparkles',
    subcategorias: [
      { id: 'skincare',     nombre: 'Cuidado facial'  },
      { id: 'maquillaje',   nombre: 'Maquillaje'      },
      { id: 'fragancias',   nombre: 'Fragancias'      },
      { id: 'cabello',      nombre: 'Cuidado del cabello' },
      { id: 'corporal',     nombre: 'Cuidado corporal'},
      { id: 'hombres',      nombre: 'Para él'         },
    ],
  },
];

/* ============================================================
   PRODUCTOS (16 productos con todos los campos necesarios)
   ============================================================ */
export const productos = [
  /* --- PERIFÉRICOS / TECLADOS --- */
  {
    id: 1,
    nombre: 'Teclado Mecánico HyperX Alloy Origins',
    precio: 289.90,
    categoria: 'perifericos',
    subcategoria: 'teclados',
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
    descripcion:
      'Teclado mecánico compacto con switches HyperX Red lineales. Retroiluminación RGB dinámica por tecla, estructura de aluminio aeroespacial y software HyperX NGENUITY para personalización avanzada.',
    destacado: true,
    stock: 15,
    marca: 'HyperX',
  },
  {
    id: 2,
    nombre: 'Teclado Inalámbrico Logitech MX Keys',
    precio: 349.90,
    categoria: 'perifericos',
    subcategoria: 'teclados',
    imagen: 'https://images.unsplash.com/photo-1561112078-7d24e04c3407?w=600&q=80',
    descripcion:
      'Teclado multidispositivo con teclas cóncavas esféricas para mayor precisión. Retroiluminación adaptativa, conexión Bluetooth con hasta 3 dispositivos y batería de hasta 10 días.',
    destacado: false,
    stock: 8,
    marca: 'Logitech',
  },

  /* --- PERIFÉRICOS / MOUSES --- */
  {
    id: 3,
    nombre: 'Mouse Gaming Razer DeathAdder V3',
    precio: 219.90,
    categoria: 'perifericos',
    subcategoria: 'mouses',
    imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
    descripcion:
      'Mouse ergonómico ultra ligero de 59 g con sensor óptico Focus Pro 30K. Iluminación Chroma RGB, 6 botones programables y switches ópticos con vida útil de 90 millones de clics.',
    destacado: true,
    stock: 22,
    marca: 'Razer',
  },
  {
    id: 4,
    nombre: 'Mouse Logitech MX Master 3S',
    precio: 379.90,
    categoria: 'perifericos',
    subcategoria: 'mouses',
    imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80',
    descripcion:
      'Mouse de productividad con sensor óptico 8000 DPI que funciona en cualquier superficie incluido vidrio. Scroll MagSpeed ultrarrápido, conexión Bluetooth/USB, hasta 70 días de batería.',
    destacado: false,
    stock: 10,
    marca: 'Logitech',
  },

  /* --- PERIFÉRICOS / HEADSETS --- */
  {
    id: 5,
    nombre: 'Headset HyperX Cloud II Wireless',
    precio: 449.90,
    categoria: 'perifericos',
    subcategoria: 'headsets',
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    descripcion:
      'Auricular gaming inalámbrico con sonido envolvente 7.1 virtual. Drivers de 53 mm, micrófono cardioide con cancelación de ruido desmontable, hasta 30 horas de batería y alcance de 20 m.',
    destacado: true,
    stock: 7,
    marca: 'HyperX',
  },

  /* --- MONITORES / GAMING --- */
  {
    id: 6,
    nombre: 'Monitor LG UltraGear 27GP850-B 27"',
    precio: 899.90,
    categoria: 'monitores',
    subcategoria: 'gaming',
    imagen: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    descripcion:
      'Monitor gaming 27" QHD (2560×1440) con panel IPS Nano, frecuencia de 165 Hz y tiempo de respuesta de 1 ms (GtG). Compatible con NVIDIA G-SYNC y AMD FreeSync Premium.',
    destacado: true,
    stock: 5,
    marca: 'LG',
  },
  {
    id: 7,
    nombre: 'Monitor Samsung Odyssey G5 34" Curvo',
    precio: 1199.90,
    categoria: 'monitores',
    subcategoria: 'curvo',
    imagen: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80',
    descripcion:
      'Monitor curvo ultrawide 34" UWQHD (3440×1440), curvatura 1000R, 165 Hz, panel VA con 1 ms de respuesta. AMD FreeSync Premium y HDR10 para una inmersión total.',
    destacado: false,
    stock: 3,
    marca: 'Samsung',
  },

  /* --- ALMACENAMIENTO / SSD --- */
  {
    id: 8,
    nombre: 'SSD Samsung 870 EVO 1TB SATA',
    precio: 279.90,
    categoria: 'almacenamiento',
    subcategoria: 'ssd',
    imagen: 'https://images.unsplash.com/photo-1601737487795-dab272f52420?w=600&q=80',
    descripcion:
      'SSD SATA de 2.5" con 1 TB de capacidad. Velocidades de lectura secuencial de 560 MB/s y escritura de 530 MB/s. Garantía de 5 años y vida útil de escritura total (TBW) de 600 TB.',
    destacado: false,
    stock: 20,
    marca: 'Samsung',
  },
  {
    id: 9,
    nombre: 'SSD Western Digital SN850X 1TB NVMe',
    precio: 489.90,
    categoria: 'almacenamiento',
    subcategoria: 'nvme',
    imagen: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&q=80',
    descripcion:
      'SSD NVMe PCIe Gen4 de alto rendimiento. Velocidades de lectura secuencial de hasta 7300 MB/s. Optimizado para gaming en PC y PS5. Capacidad de 1 TB con garantía de 5 años.',
    destacado: true,
    stock: 12,
    marca: 'Western Digital',
  },

  /* --- AUDIO / AURICULARES --- */
  {
    id: 10,
    nombre: 'Sony WH-1000XM5 Inalámbrico ANC',
    precio: 1099.90,
    categoria: 'audio',
    subcategoria: 'auriculares',
    imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
    descripcion:
      'Auriculares premium con cancelación de ruido líder en la industria. Procesador V1 + QN1, 8 micrófonos, 30 horas de batería, carga rápida (3 min = 3 horas) y audio de alta resolución.',
    destacado: true,
    stock: 6,
    marca: 'Sony',
  },
  {
    id: 11,
    nombre: 'Parlante JBL Charge 5 Portátil',
    precio: 449.90,
    categoria: 'audio',
    subcategoria: 'parlantes',
    imagen: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
    descripcion:
      'Altavoz portátil resistente al agua IP67 con potencia de 40 W. Banco de energía integrado para cargar dispositivos, 20 horas de reproducción y tecnología PartyBoost para conectar múltiples altavoces.',
    destacado: false,
    stock: 18,
    marca: 'JBL',
  },

  /* --- ACCESORIOS / ALFOMBRILLAS --- */
  {
    id: 12,
    nombre: 'Alfombrilla Razer Strider XL',
    precio: 149.90,
    categoria: 'accesorios',
    subcategoria: 'alfombrillas',
    imagen: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600&q=80',
    descripcion:
      'Alfombrilla híbrida XL (940×410 mm) que combina superficie de tela suave para control preciso con base antideslizante de goma. Bordes cosidos reforzados y superficie de microtextura optimizada para sensores.',
    destacado: false,
    stock: 25,
    marca: 'Razer',
  },
  {
    id: 13,
    nombre: 'Hub USB-C Anker 7 en 1',
    precio: 189.90,
    categoria: 'accesorios',
    subcategoria: 'hubs',
    imagen: 'https://images.unsplash.com/photo-1625480859916-d06c98e15b26?w=600&q=80',
    descripcion:
      'Hub compacto con 7 puertos: USB-C PD 100W, 4K HDMI, USB-A 3.0 ×2, lector SD/MicroSD. Carcasa de aluminio premium y temperatura controlada. Plug & Play sin drivers.',
    destacado: false,
    stock: 30,
    marca: 'Anker',
  },

  /* --- PERIFÉRICOS / WEBCAMS --- */
  {
    id: 14,
    nombre: 'Webcam Logitech StreamCam 1080p',
    precio: 329.90,
    categoria: 'perifericos',
    subcategoria: 'webcams',
    imagen: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80',
    descripcion:
      'Cámara web Full HD 1080p a 60 fps con enfoque automático inteligente por IA. Conexión USB-C, compatible con OBS y plataformas de streaming. Orientación vertical/horizontal automática.',
    destacado: false,
    stock: 9,
    marca: 'Logitech',
  },

  /* --- MONITORES / 4K --- */
  {
    id: 15,
    nombre: 'Monitor Dell UltraSharp U2723QE 27" 4K',
    precio: 1599.90,
    categoria: 'monitores',
    subcategoria: '4k',
    imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    descripcion:
      'Monitor profesional 4K UHD (3840×2160) con panel IPS Black de 27". Cobertura de color 100% sRGB, 98% DCI-P3, hub USB-C con 90W de carga y certificación Eye Comfort 3.0.',
    destacado: true,
    stock: 4,
    marca: 'Dell',
  },

  /* --- AUDIO / MICRÓFONOS --- */
  {
    id: 16,
    nombre: 'Micrófono Blue Yeti X USB Profesional',
    precio: 519.90,
    categoria: 'audio',
    subcategoria: 'microfonos',
    imagen: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&q=80',
    descripcion:
      'Micrófono de condensador USB con 4 patrones polares (cardioide, bidireccional, omnidireccional, estéreo). LED VU meter en tiempo real, resolución de 24 bits / 48 kHz y software Blue Sherpa incluido.',
    destacado: false,
    stock: 11,
    marca: 'Blue',
  },
];

// USUARIOS MOCK — autenticación simulada
export const usuariosMock = [
  { id: 1, nombre: 'Admin J&P',    correo: 'admin@jyp.com',    contrasena: 'admin123', rol: 'admin',   activo: true, fechaRegistro: '2025-01-01' },
  { id: 2, nombre: 'Cliente Demo', correo: 'cliente@demo.com', contrasena: 'demo123',  rol: 'cliente', activo: true, fechaRegistro: '2025-03-10' },
  { id: 3, nombre: 'María López',  correo: 'maria@demo.com',   contrasena: 'maria123', rol: 'cliente', activo: true, fechaRegistro: '2025-06-15' },
  { id: 4, nombre: 'Carlos Ríos',  correo: 'carlos@demo.com',  contrasena: 'carlos123',rol: 'cliente', activo: false,fechaRegistro: '2025-07-22' },
]

// BANNERS MOCK — carrusel de la tienda
export const bannersMock = [
  { id: 1, titulo: 'Lo mejor en periféricos gaming',  subtitulo: 'Teclados, mouses y headsets de alta gama',        imagen: 'https://images.unsplash.com/photo-1593640408182-31c228c8b0da?w=1200&q=80', enlace: '/products?categoria=perifericos',    activo: true  },
  { id: 2, titulo: 'Monitores para cada necesidad',   subtitulo: '4K, curvo, gaming y oficina',                    imagen: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&q=80', enlace: '/products?categoria=monitores',      activo: true  },
  { id: 3, titulo: 'Almacenamiento ultrarrápido',     subtitulo: 'SSD NVMe con velocidades de hasta 7300 MB/s',    imagen: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&q=80',enlace: '/products?categoria=almacenamiento', activo: true  },
  { id: 4, titulo: 'Audio profesional y gaming',      subtitulo: 'Auriculares, parlantes y micrófonos de calidad', imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80', enlace: '/products?categoria=audio',          activo: false },
]

// VENTAS MOCK — historial de ventas
export const ventasMock = [
  { id: 'ORD-001', cliente: 'Cliente Demo', correo: 'cliente@demo.com', fecha: '2026-03-01', total: 509.80,  estado: 'entregado', items: [{ nombre:'Mouse Gaming Razer DeathAdder V3', cantidad: 1, precio: 219.90 }, { nombre:'Alfombrilla Razer Strider XL', cantidad: 1, precio: 149.90 }, { nombre:'Hub USB-C Anker 7 en 1', cantidad: 1, precio: 189.90 }] },
  { id: 'ORD-002', cliente: 'María López',  correo: 'maria@demo.com',   fecha: '2026-03-05', total: 899.90,  estado: 'entregado', items: [{ nombre:'Monitor LG UltraGear 27GP850-B 27"', cantidad: 1, precio: 899.90 }] },
  { id: 'ORD-003', cliente: 'Cliente Demo', correo: 'cliente@demo.com', fecha: '2026-03-10', total: 289.90,  estado: 'enviado',   items: [{ nombre:'Teclado Mecánico HyperX Alloy Origins', cantidad: 1, precio: 289.90 }] },
  { id: 'ORD-004', cliente: 'Carlos Ríos',  correo: 'carlos@demo.com',  fecha: '2026-03-14', total: 1099.90, estado: 'procesando',items: [{ nombre:'Sony WH-1000XM5 Inalámbrico ANC', cantidad: 1, precio: 1099.90 }] },
  { id: 'ORD-005', cliente: 'María López',  correo: 'maria@demo.com',   fecha: '2026-03-18', total: 489.90,  estado: 'entregado', items: [{ nombre:'SSD Western Digital SN850X 1TB NVMe', cantidad: 1, precio: 489.90 }] },
  { id: 'ORD-006', cliente: 'Cliente Demo', correo: 'cliente@demo.com', fecha: '2026-03-22', total: 449.90,  estado: 'pendiente', items: [{ nombre:'Headset HyperX Cloud II Wireless', cantidad: 1, precio: 449.90 }] },
]

// CUPONES MOCK — descuentos aplicables al checkout
export const cuponesMock = [
  { id: 1, codigo: 'VERANO20',  tipo: 'porcentaje', valor: 20, activo: true,  expira: '2026-06-30', descripcion: '20% de descuento en toda la tienda' },
  { id: 2, codigo: 'BIENVENIDO',tipo: 'porcentaje', valor: 10, activo: true,  expira: '2026-12-31', descripcion: '10% para nuevos clientes' },
  { id: 3, codigo: 'ENVIOGRATIS',tipo: 'fijo',      valor: 15, activo: true,  expira: '2026-05-01', descripcion: 'S/. 15 de descuento en el envío' },
  { id: 4, codigo: 'BLACKFRI50', tipo: 'porcentaje', valor: 50, activo: false, expira: '2025-11-30', descripcion: '50% Black Friday (expirado)' },
]

