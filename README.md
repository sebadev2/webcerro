# Cerro Navia — portada (Astro)

Maqueta de la **portada** de la Municipalidad de Cerro Navia: una propuesta de rediseño
que conserva la identidad del sitio actual y mejora la arquitectura de información,
la jerarquía visual y la usabilidad.

Sólo es la página principal. Las páginas interiores no están desarrolladas: todos los
enlaces apuntan a `#`.

## Arranque

```bash
npm install
npm run dev      # http://localhost:4321
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve la build |
| `npm run verificar:overflow` | Mide desbordes horizontales a 390/768/1024/1440 px |
| `npm run verificar:interacciones` | 15 comprobaciones de comportamiento (slider, filtros, menú, a11y) |
| `npm run capturas` | Genera capturas en la carpeta temporal del sistema |

Los tres scripts de verificación usan `puppeteer-core` con el Chrome ya instalado en el
equipo; requieren `npm run dev` levantado en otra terminal.

## Paleta

La base se extrajo de la identidad del sitio actual (`cerronavia.cl`), muestreando el
logotipo oficial y la hoja de estilos del theme. El acento de marca es el indicado por la
municipalidad.

| Token | Valor | Origen / uso |
| --- | --- | --- |
| `--navy-900` | `#00132f` | Azul marino del logotipo oficial (fondo principal) |
| `--navy-800` | `#05162d` | Barra de accesibilidad del sitio actual |
| `--green` | `#38baa6` | **Acento de marca** (verde azulado) |
| `--green-dark` | `#1c7266` | Estados hover y texto sobre fondo claro |
| `--green-light` | `#e7f5f3` | Fondos sutiles (píldoras, etiquetas) |
| `--teal` | `#2f9e8c` | Acento secundario, misma familia |
| `--grey-500` | `#6b7686` | Textos secundarios |

Están definidos como custom properties en `src/styles/global.css`. Para cambiar el acento
basta con modificar `--green`, `--green-dark` y `--green-light`.

El contraste de los pares de color se verifica con:

```bash
npm run verificar:contraste
```

Todos los pares de texto/fondo del sistema cumplen WCAG AA (≥ 4.5:1).

## Imágenes del carrusel

El primer slide usa una fotografía real de la municipalidad
(`public/img/hero-obras.jpg`): workers adjusting a valve on the storm-drainage
pipeline in Av. Las Torres. Los otros dos slides usan el degradado de marca.

```bash
powershell -ExecutionPolicy Bypass -File scripts/generar-imagenes-hero.ps1
```

El script descarga la imagen desde el sitio, la **recorta** y la guarda en
`public/img/`.

**Por qué hay que recortar:** revisé la biblioteca de medios del sitio y casi todo
el material reciente son *flyers* e infografías con el texto ya incrustado
("Sistema de evacuación…", "Taller de mapuzungun", "Libros de Navidad"), que
choca con el texto del hero. De la pieza de obras se usa únicamente la zona
fotográfica superior, sin texto.

De las fotografías reales que quedan en la biblioteca (5, todas del mismo
operativo de Fiscalización, con credit `Victor_Alegria_D`) **no se usó ninguna**:
son Habitadas a un desalojo y los chalecos fluorescentes rompen la paleta. Se
descartó también el único retrato de Autor, por la misma razón y por no ser un
tema adecuado para una cabecera institucional.

Cada slide acepta `imagen`, `alt` y `credito` en `src/data/site.ts`; si falta
`imagen`, se usa el degradado. Al añadir imágenes nuevas, conviene mantener el
crédito del autor.

## Logotipo

Se usa el **logotipo oficial** descargado del sitio actual:

| Archivo | Uso |
| --- | --- |
| `public/logo-cerro-navia.png` | Versión original (azul marino) → header, sobre fondo blanco |
| `public/logo-cerro-navia-blanco.png` | Versión en blanco → pie, sobre fondo azul marino |
| `public/favicon-municipal.png` | Favicon oficial |

El PNG original es azul marino sobre fondo **transparente**, por lo que funciona sobre
blanco pero desaparecería sobre el footer azul marino. La versión en blanco se genera
conservando el canal alfa del original:

```bash
powershell -ExecutionPolicy Bypass -File scripts/generar-logo-blanco.ps1
```

`Logo.astro` recibe `variant="dark"` (header) o `variant="light"` (footer) y calcula el
ancho a partir de la proporción original (185×95).

## Estructura

```
src/
├── components/
│   ├── TopBar.astro        barra legal + accesibilidad + redes
│   ├── Header.astro        header sticky, megamenú, buscador desplegable
│   ├── Hero.astro          slider + panel de acceso rápido a trámites
│   ├── Noticias.astro      tarjetas con fecha y filtros por categoría
│   ├── Cifras.astro        la comuna en cifras
│   ├── Servicios.astro     oficinas municipales + programas destacados
│   ├── Beneficios.astro    becas, subsidios y programas sociales
│   ├── Comunidad.astro     concejo en vivo, documentos y teléfonos útiles
│   ├── Footer.astro
│   ├── FloatBar.astro      barra flotante de acceso rápido
│   ├── Icon.astro          set de iconos SVG en línea
│   ├── Logo.astro
│   └── Placeholder.astro   imagen decorativa de reemplazo
├── data/site.ts            todo el contenido en un solo archivo
├── layouts/BaseLayout.astro
├── pages/index.astro       la portada
├── scripts/main.js         interacciones (vanilla JS)
└── styles/global.css       tokens, reset y utilidades
```

Todo el contenido editable está en **`src/data/site.ts`**: navegación, noticias, trámites,
cifras, beneficios y teléfonos. No hace falta tocar los componentes para cambiar textos.

## Decisiones de diseño

**Atajos de trámites bajo el hero.** Es el patrón de mayor valor de Las Condes: los diez
trámites más usados a un scroll de distancia, con buscador en el mismo panel. Reduce la
búsquera de un trámite desde "menú → sección → submenú" a un clic.

**Transparencia arriba del todo.** Ley de Transparencia, Ley de Lobby y OIRS están en la
barra superior, visibles sin scrollear, en vez de enterradas en el pie.

**Fechas visibles en las noticias.** Las de Las Condes no muestran fecha, lo que es un
problema en un sitio cívico. Aquí se usa el bloque de fecha sobredimensionado de
Huechuraba (día / mes / año) y los filtros por categoría tienen estado activo real.

**Teléfonos útiles como sección propia.** Tomado de Huechuraba: Carabineros, Bomberos,
SAMU y la muni con su número, en un bloque permanente y clickeable (`tel:`).

**"Cerro Navia en cifras".** Ninguno de los dos sitios de referencia lo tiene. Para una
comuna es información que el vecino busca con frecuencia (población, superficie, número
de cerros, unidades vecinales).

**Transmisión del Concejo.** Módulo de la sesión en vivo, presente en Huechuraba,
integrado como bloque propio en lugar de un enlace suelto.

**Barra flotante con etiquetas.** Como en Las Condes: WhatsApp, Trámites y Soy vecino con
texto visible, no un círculo de icono suelto. En móvil queda sólo WhatsApp para no tapar
el botón "Buscar".

**Fotografías simuladas.** `Placeholder.astro` genera bloques con degradado y silueta de
cerros, para que la maqueta se lea bien sin assets externos. Se reemplazan por imágenes
reales al integrar contenido.

## Accesibilidad

- Botón de **alto contraste** y de **tamaño de texto (A / A+)** en la barra superior, con
  preferencia guardada en `localStorage` y aplicada antes del primer pintado para evitar
  parpadeos.
- Contraste alto implementado con un único atributo `data-contrast` en `<html>`, en vez de
  una clase por elemento (el problema que tiene el sitio de Huechuraba).
- Navegación por teclado en todo: `Escape` cierra menú y buscador, `Ctrl/Cmd + K` enfoca
  la búsqueda, foco visible en verde.
- Enlace de salto al contenido, `aria-expanded` en los controles, `aria-pressed` en los
  toggles, un solo `<h1>` en la página.
- `prefers-reduced-motion` desactiva el autoplay del slider y las animaciones.

## Pendiente para producción

- **Fotografías propias para los slides 2 y 3** del carrusel: el sitio no tiene
  material fotográfico apto (ver la sección anterior). Es lo primero que
  solicitaría a la municipalidad.
- Fotografías para las tarjetas de noticias (siguen usando bloques de degradado).
- Enlaces reales de trámites, noticias y documentos.
- Backend o CMS para la carga de noticias y documentos.
- Versión del logo en SVG (hoy se usa el PNG oficial de 185×95, que se ve algo
  pequeño en pantallas de alta densidad) y confirmación de los usos de marca
  aprobados para el nuevo diseño.
- Datos de contacto verificados (los teléfonos son de ejemplo).
