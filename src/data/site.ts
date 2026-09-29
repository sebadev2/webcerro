/* Contenido de la maqueta, basado en la estructura real de cerronavia.cl */

export const municipio = {
  nombre: 'Municipalidad de Cerro Navia',
  short: 'Cerro Navia',
  alcalde: 'Mauro Tamayo Rozas',
  direccion: 'Del Consistorial Nº 6645, Cerro Navia',
  ciudad: 'Santiago de Chile',
  telefono: '+56 2 2920 1100',
  email: 'contacto@cerronavia.cl',
  horario: 'Lunes a viernes, 08:30 a 14:00 horas',
  fundacion: '17 de marzo de 1981',
}

/* Barra superior: transparencia y acceso a la información */
export const legales = [
  { label: 'Transparencia Activa', href: '#' },
  { label: 'Ley de Transparencia', href: '#' },
  { label: 'Ley de Lobby', href: '#' },
  { label: 'OIRS', href: '#' },
  { label: 'Protección de datos', href: '#' },
]

export const redes = [
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'X', href: '#', icon: 'x' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
]

/* Navegación principal */
export const navegacion = [
  { label: 'Inicio', href: '#' },
  {
    label: 'Municipalidad',
    href: '#',
    children: [
      {
        titulo: 'Gobierno',
        items: [
          { label: 'Alcalde', href: '#' },
          { label: 'Concejo Municipal', href: '#' },
          { label: 'Sesiones del Concejo', href: '#' },
          { label: 'Organigrama Municipal', href: '#' },
        ],
      },
      {
        titulo: 'Direcciones',
        items: [
          { label: 'Secretaría Municipal', href: '#' },
          { label: 'Administración y Finanzas', href: '#' },
          { label: 'DIDECO', href: '#' },
          { label: 'Desarrollo Económico Local', href: '#' },
          { label: 'Dirección de Culturas', href: '#' },
          { label: 'Medio Ambiente', href: '#' },
          { label: 'Seguridad Pública', href: '#' },
          { label: 'Obras Municipales', href: '#' },
          { label: 'Salud', href: '#' },
          { label: 'OMIL', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'La Comuna',
    href: '#',
    children: [
      {
        titulo: 'Conocer Cerro Navia',
        items: [
          { label: 'Historia de la comuna', href: '#' },
          { label: 'Cerro Navia en cifras', href: '#' },
          { label: 'Hijas e hijos ilustres', href: '#' },
          { label: 'Los 17 cerros', href: '#' },
        ],
      },
      {
        titulo: 'Territorio y planificación',
        items: [
          { label: 'Unidades vecinales', href: '#' },
          { label: 'Plan de Gobierno 2024-2028', href: '#' },
          { label: 'PLADECO 2023-2030', href: '#' },
          { label: 'Plan Regulador vigente', href: '#' },
          { label: 'Plan de Gestión de Riesgos', href: '#' },
        ],
      },
    ],
  },
  { label: 'Trámites', href: '#tramites' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Diálogos ciudadanos', href: '#' },
]

/* Slides del hero.
   `imagen` es opcional: cuando falta, el slide usa el degradado de marca.
   Las imágenes provienen del sitio de la municipalidad y se recortan para
   quitar el texto incrustado (ver scripts/generar-imagenes-hero.ps1). */
export interface Slide {
  kicker: string
  titulo: string
  texto: string
  cta: string
  href: string
  tono: 'navy' | 'verde' | 'teal'
  imagen?: string
  alt?: string
  credito?: string
}

export const slides: Slide[] = [
  {
    kicker: 'Obras municipales',
    titulo: 'El sistema de lluvias en Las Torres',
    texto:
      'Construcción del sistema de evacuación y drenaje de aguas lluvias en Av. Las Torres.',
    cta: 'Ver el proyecto',
    href: '#',
    tono: 'navy',
    imagen: '/img/hero-obras.jpg',
    alt: 'Trabajadores con guantes ajustando una válvula sobre una tubería azul de PVC.',
    credito: 'Municipalidad de Cerro Navia',
  },
  {
    kicker: 'Plan de Gobierno',
    titulo: 'Una Cerro Navia que cuidamos juntos',
    texto:
      'El plan 2024-2028 reúne las promesas de campaña en obras, programas y participación concretos para cada barrio de la comuna.',
    cta: 'Ver plan de gobierno',
    href: '#',
    tono: 'verde',
    imagen: '/img/hero-gobierno.jpg',
    alt: 'Vecinos reunidos en una asamblea comunitaria participando en la toma de decisiones.',
    credito: 'Unsplash',
  },
  {
    kicker: 'Cuentas públicas',
    titulo: 'Rendición de cuentas 2025',
    texto:
      'Consulta el informe y la presentación de la Cuenta Pública 2025, con la ejecución de cada programa municipal.',
    cta: 'Ver cuenta pública',
    href: '#',
    tono: 'teal',
    imagen: '/img/hero-cuentas.jpg',
    alt: 'Documentos oficiales y gráficos de rendición de cuentas sobre un escritorio.',
    credito: 'Unsplash',
  },
]

/* Atajos de trámites */
export const tramites = [
  { label: 'Permisos de circulación', icon: 'car' },
  { label: 'Licencias de conducir', icon: 'license' },
  { label: 'Patentes comerciales', icon: 'store' },
  { label: 'Pagar en línea', icon: 'card' },
  { label: 'Derechos de basura', icon: 'trash' },
  { label: 'Reclamos y solicitudes', icon: 'headset' },
  { label: 'Denuncias de basurales', icon: 'alert' },
  { label: 'Formularios y documentos', icon: 'document' },
  { label: 'Fiscalía Popular', icon: 'scale' },
  { label: 'Todos los trámites', icon: 'grid' },
]

/* Noticias */
export const noticias = [
  {
    fecha: { dia: '08', mes: 'SEP', anio: '2026' },
    categoria: 'Comunidad',
    titulo: 'Cerro Navia abre los diálogos ciudadanos con las unidades vecinales',
    resumen: 'La comuna inicia la etapa territorial para el segundo semestre en los diez territorios.',
    imagen: '/img/noticia-1.jpg',
    alt: 'Vecinos reunidos en una asamblea comunitaria participando en la toma de decisiones.',
  },
  {
    fecha: { dia: '02', mes: 'SEP', anio: '2026' },
    categoria: 'Obras',
    titulo: 'La bacheadora municipal trabaja en doce calles de la comuna',
    resumen: 'Intervenciones en sectores de alta circulación y mayor pendiente.',
    imagen: '/img/noticia-2.jpg',
    alt: 'Trabajadores de construcción reparando calles y veredas de la comuna.',
  },
  {
    fecha: { dia: '28', mes: 'AGO', anio: '2026' },
    categoria: 'Cultura',
    titulo: 'Casa de la Cultura Violeta Parra lanza nuevo programa de talleres',
    resumen: 'Inscripciones abiertas para vecinos de todas las edades.',
    imagen: '/img/noticia-3.jpg',
    alt: 'Personas participando en talleres culturales y actividades artísticas.',
  },
  {
    fecha: { dia: '21', mes: 'AGO', anio: '2026' },
    categoria: 'Salud',
    titulo: 'El Cesfam móvil llega a las unidades vecinales del territorio 5',
    resumen: 'Atención preventiva y controles de salud directamente en terreno.',
    imagen: '/img/noticia-4.jpg',
    alt: 'Equipo de salud atendiendo a vecinos en un cesfam móvil.',
  },
  {
    fecha: { dia: '14', mes: 'AGO', anio: '2026' },
    categoria: 'Deporte',
    titulo: 'Complejo Ellis develó nuevas canchas para el barrio',
    resumen: 'Espacios disponibles para vecinos del sector poniente.',
    imagen: '/img/noticia-5.jpg',
    alt: 'Nuevas canchas deportivas disponibles para los vecinos del barrio.',
  },
  {
    fecha: { dia: '05', mes: 'AGO', anio: '2026' },
    categoria: 'Seguridad',
    titulo: 'Puesta en marcha del plan de seguridad pública comunal',
    resumen: 'Más presencia en plazas, fiscalización y apoyo a la prevención.',
    imagen: '/img/noticia-6.jpg',
    alt: 'Plan de seguridad pública con más presencia en plazas y fiscalización.',
  },
]

export const categorias = ['Todas', 'Comunidad', 'Obras', 'Cultura', 'Salud', 'Deporte', 'Seguridad']

/* Calendario de eventos */
export const eventos = [
  {
    fecha: { dia: '27', mes: 'SEP', anio: '2026' },
    titulo: '2a Corrida Familiar Team Chile',
    descripcion: 'Ya están abiertas las inscripciones para 3K y 5k.',
    hora: '08:00 hrs',
    lugar: 'Av. Las Torres',
  },
  {
    fecha: { dia: '03', mes: 'OCT', anio: '2026' },
    titulo: 'Encuentro empresarial: Empresas que aprenden',
    descripcion: '¿Tienes una empresa y quieres conocer experiencias que puedan inspirar nuevas formas de hacer las cosas?',
    hora: '10:00 hrs',
    lugar: 'Casa de la Cultura',
  },
  {
    fecha: { dia: '10', mes: 'OCT', anio: '2026' },
    titulo: 'Musical: Charlie y la fábrica de chocolate',
    descripcion: 'Sé parte de la magia dentro de la fábrica de Wonka.',
    hora: '19:00 hrs',
    lugar: 'Teatro Municipal',
  },
  {
    fecha: { dia: '17', mes: 'OCT', anio: '2026' },
    titulo: 'Operativo Programa Más Salud',
    descripcion: '¡Te esperamos para seguir cuidando tu salud!',
    hora: '09:00 hrs',
    lugar: 'Cesfam Móvil',
  },
  {
    fecha: { dia: '21', mes: 'NOV', anio: '2026' },
    titulo: 'Operativo Programa Más Salud',
    descripcion: '¡Te esperamos para seguir cuidando tu salud!',
    hora: '09:00 hrs',
    lugar: 'Cesfam Móvil',
  },
]

/* La comuna en cifras */
export const cifras = [
  { valor: '11,06', unidad: 'km²', label: 'Superficie total de la comuna' },
  { valor: '137.777', label: 'Habitantes (Censo 1982)' },
  { valor: '17', label: 'Cerros que forman la comuna' },
  { valor: '38', label: 'Unidades vecinales' },
  { valor: '10', label: 'Territorios de participación' },
  { valor: '1981', label: 'Año de creación de la comuna' },
]

/* Áreas municipales y accesos institucionales */
export const servicios = [
  { titulo: 'Organizaciones comunitarias', texto: 'Constitución y renovación de organizaciones.', icon: 'users' },
  { titulo: 'Registro Social de Hogares', texto: 'Postulación y actualización de datos.', icon: 'home' },
  { titulo: 'Sesiones del Concejo', texto: 'Actas, registros y transmisiones en vivo.', icon: 'video' },
  { titulo: 'Oficina de la Mujer', texto: 'Equidad de género y atención.', icon: 'heart' },
  { titulo: 'Oficina de la Niñez', texto: 'Programas y protección infantil.', icon: 'child' },
  { titulo: 'Personas mayores', texto: 'Talleres, conectividad y apoyo.', icon: 'senior' },
  { titulo: 'Oficina de la Juventud', texto: 'Programas juveniles y bicentros.', icon: 'star' },
  { titulo: 'Oficina de Migrantes', texto: 'Asistencia y orientación.', icon: 'globe' },
  { titulo: 'Pueblos Originarios', texto: 'Atención y trabajo territorial.', icon: 'sun' },
  { titulo: 'SENDA Previene', texto: 'Prevención del consumo de sustancias.', icon: 'shield' },
  { titulo: 'Fiscalía Popular', texto: 'Asistencia jurídica gratuita.', icon: 'scale' },
  { titulo: 'Empleo y capacitación', texto: 'Oficina Municipal de Intermediación Laboral.', icon: 'briefcase' },
]

/* Programas y beneficios */
export const beneficios = [
  {
    titulo: 'Beca Educación Superior 2026',
    texto: 'Apoyo para estudiantes de educación superior con buen rendimiento académico.',
    meta: 'Postulación abierta',
    tono: 'verde',
  },
  {
    titulo: 'Beca Pueblos Originarios 2026',
    texto: 'Beca para estudiantes de comunidades indígenas de la comuna.',
    meta: 'Postulación abierta',
    tono: 'navy',
  },
  {
    titulo: 'Subsidios y fondos',
    texto: 'Postulación a subsidios, fondos y apoyos para familias vulnerables.',
    meta: 'Concursos vigentes',
    tono: 'teal',
  },
  {
    titulo: 'Farmacia Popular',
    texto: 'Medicamentos a precio especial para adultos mayores y familias.',
    meta: 'Horario L-V',
    tono: 'navy',
  },
  {
    titulo: 'Óptica Popular',
    texto: 'Atención y venta de lentes a precios solidarios.',
    meta: 'Atención semanal',
    tono: 'verde',
  },
  {
    titulo: 'Banco de Alimentos',
    texto: 'Reparto de alimentos para familias del registro social de hogares.',
    meta: 'Entregas mensuales',
    tono: 'teal',
  },
]

/* Documentos oficiales */
export const documentos = [
  { label: 'Cuenta Pública 2025', tipo: 'Informe', icon: 'document' },
  { label: 'Plan de Gobierno 2024-2028', tipo: 'Plan', icon: 'map' },
  { label: 'PLADECO 2023-2030', tipo: 'Instrumento', icon: 'map' },
  { label: 'Presupuesto municipal 2026', tipo: 'Documento', icon: 'card' },
  { label: 'Cuentas públicas 2021-2025', tipo: 'Historial', icon: 'document' },
  { label: 'Actas del Concejo Municipal', tipo: 'Transparencia', icon: 'video' },
]

/* Teléfonos útiles */
export const utiles = [
  { entidad: 'Carabineros de Chile', detalle: '54ª Comisaría Cerro Navia', telefono: '133' },
  { entidad: 'Bomberos', detalle: '2ª Compañía', telefono: '132' },
  { entidad: 'Ambulancia', detalle: 'SAMU Región Metropolitana', telefono: '131' },
  { entidad: 'Central de alarmas', detalle: 'Emergencias', telefono: '133' },
  { entidad: 'Municipalidad', detalle: 'Oficina de partes', telefono: '+56 2 2920 1100' },
  { entidad: 'OIRS', detalle: 'Reclamos y solicitudes', telefono: '+56 2 2920 1106' },
]

/* Programas destacados */
export const programas = [
  { titulo: 'Ludoteca de Cerro Navia', icon: 'child' },
  { titulo: 'Biblioteca Municipal', icon: 'book' },
  { titulo: 'Clínica Veterinaria', icon: 'heart' },
  { titulo: 'Médico en tu Barrio', icon: 'users' },
  { titulo: 'Hora Fácil', icon: 'clock' },
  { titulo: 'Cerroletras', icon: 'star' },
]
