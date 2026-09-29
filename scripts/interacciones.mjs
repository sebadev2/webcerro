/* Verifica el comportamiento interactivo de la portada. */
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const URL = process.env.URL ?? 'http://localhost:4321/'
const OUT = 'C:\\Users\\sebastian.hernandez\\AppData\\Local\\Temp\\opencode'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'shell',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
})

const errors = []
const check = (label, pass, extra = '') =>
  console.log(`  ${pass ? 'OK  ' : 'FALLA'}  ${label}${extra ? '  -> ' + extra : ''}`)

/* ----------------------------- escritorio ----------------------------- */
console.log('\n=== Escritorio 1280px ===')
const page = await browser.newPage()
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))
await page.setViewport({ width: 1280, height: 900 })
await page.goto(URL, { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 500))

// 1. slider
const s1 = await page.$eval('[data-slide].is-active h1, [data-slide].is-active h2', (el) => el.textContent.trim())
await page.click('[data-next]')
await new Promise((r) => setTimeout(r, 800))
const s2 = await page.$eval('[data-slide].is-active h1, [data-slide].is-active h2', (el) => el.textContent.trim())
check('slider avanza al pulsar siguiente', s1 !== s2, `"${s1}" -> "${s2}"`)

const dotActive = await page.$eval('[data-dot].is-active', (el) => el.getAttribute('data-dot'))
check('el punto activo sigue a la diapositiva', dotActive === '1', `dot=${dotActive}`)

// 1b. ningún slide puede quedar tapado por el panel de trámites
for (let i = 0; i < 3; i++) {
  const geo = await page.evaluate((idx) => {
    const slide = document.querySelectorAll('[data-slide]')[idx]
    const cta = slide.querySelector('.slide__cta')
    const quick = document.querySelector('.quick')
    if (!cta || !quick) return null
    const a = cta.getBoundingClientRect()
    const b = quick.getBoundingClientRect()
    return { ctaBottom: Math.round(a.bottom), quickTop: Math.round(b.top) }
  }, i)
  if (geo) {
    check(
      `slide ${i + 1}: el botón no queda tapado`,
      geo.ctaBottom <= geo.quickTop + 1,
      `cta=${geo.ctaBottom} panel=${geo.quickTop}`
    )
  }
}

// 1c. la foto del hero se carga de verdad
const foto = await page.evaluate(() => {
  const i = document.querySelector('.slide__photo')
  return i ? { ok: i.complete && i.naturalWidth > 0, nat: i.naturalWidth } : null
})
if (foto) {
  check('la foto del hero carga', foto.ok, `ancho natural=${foto.nat}`)
}

// 1d. los controles del carrusel no quedan pegados al borde inferior
const holgura = await page.evaluate(() => {
  const c = document.querySelector('.hero__controls')
  const s = document.querySelector('.hero__slides')
  if (!c || !s) return null
  return Math.round(s.getBoundingClientRect().bottom - c.getBoundingClientRect().bottom)
})
if (holgura !== null) {
  check('holgura bajo los controles del carrusel', holgura >= 32, `${holgura}px (min 32)`)
}

// 2. filtro de noticias
const total = await page.$$eval('[data-news] [data-cat]', (n) => n.length)
await page.click('[data-cat="Salud"]')
await new Promise((r) => setTimeout(r, 300))
const visible = await page.$$eval('[data-news] [data-cat]', (n) => n.filter((e) => !e.hidden).length)
check('filtro "Salud" reduce las tarjetas', visible > 0 && visible < total, `${visible} de ${total}`)

await page.click('[data-cat="Todas"]')
await new Promise((r) => setTimeout(r, 300))
const back = await page.$$eval('[data-news] [data-cat]', (n) => n.filter((e) => !e.hidden).length)
check('volver a "Todas" restaura todas', back === total, `${back} de ${total}`)

// 3. buscador desplegable
const hiddenBefore = await page.$eval('[data-searchbar]', (el) => el.hidden)
await page.click('[data-search-toggle]')
await new Promise((r) => setTimeout(r, 300))
const hiddenAfter = await page.$eval('[data-searchbar]', (el) => el.hidden)
check('el buscador se despliega', hiddenBefore && !hiddenAfter)

// 4. header con sombra al hacer scroll
await page.evaluate(() => window.scrollTo(0, 400))
await new Promise((r) => setTimeout(r, 300))
check('header marca estado "stuck" al scrollear', !!(await page.$('[data-header][data-stuck]')))
await page.evaluate(() => window.scrollTo(0, 0))

/* ------------------------------ accesibilidad ------------------------------ */
console.log('\n=== Accesibilidad ===')
await page.click('[data-contrast]')
await new Promise((r) => setTimeout(r, 300))
check(
  'alto contraste activa data-contrast',
  (await page.$eval('html', (el) => el.getAttribute('data-contrast'))) === 'high'
)
check(
  'alto contraste se persiste',
  (await page.evaluate(() => localStorage.getItem('cn-contrast'))) === 'high'
)

await page.click('[data-font="lg"]')
await new Promise((r) => setTimeout(r, 300))
check(
  'tamaño de texto A+ aplica data-font',
  (await page.$eval('html', (el) => el.getAttribute('data-font'))) === 'lg'
)

// recarga: la preferencia debe restaurarse sin parpadeo
await page.reload({ waitUntil: 'networkidle0' })
const persisted = await page.evaluate(() => ({
  contrast: document.documentElement.getAttribute('data-contrast'),
  font: document.documentElement.getAttribute('data-font'),
  pressed: document.querySelector('[data-contrast]')?.getAttribute('aria-pressed'),
}))
check(
  'preferencias sobreviven a la recarga',
  persisted.contrast === 'high' && persisted.font === 'lg',
  JSON.stringify(persisted)
)
check('botón refleja el estado con aria-pressed', persisted.pressed === 'true')

// reset
await page.click('[data-contrast]')
await page.click('[data-font="lg"]')

/* -------------------------------- móvil -------------------------------- */
console.log('\n=== Móvil 390px ===')
const m = await browser.newPage()
m.on('pageerror', (e) => errors.push(String(e)))
await m.setViewport({ width: 390, height: 800, isMobile: true })
await m.goto(URL, { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 500))

const navOpenBefore = await m.$eval('[data-nav]', (el) => el.hasAttribute('data-open'))
await m.click('[data-menu-toggle]')
await new Promise((r) => setTimeout(r, 500))
const navOpenAfter = await m.$eval('[data-nav]', (el) => el.hasAttribute('data-open'))
const expanded = await m.$eval('[data-menu-toggle]', (el) => el.getAttribute('aria-expanded'))
check('el menú móvil se abre', !navOpenBefore && navOpenAfter, `aria-expanded=${expanded}`)
await m.screenshot({ path: `${OUT}\\m-menu.png` })

// megamenú desplegable en móvil
await m.click('.nav__item.has-children > .nav__link')
await new Promise((r) => setTimeout(r, 300))
const megaVisible = await m.$eval('.nav__item.has-children .mega', (el) => getComputedStyle(el).display !== 'none')
check('el submenú se despliega en móvil', megaVisible)

await m.keyboard.press('Escape')
await new Promise((r) => setTimeout(r, 400))
check('Escape cierra el menú', !(await m.$eval('[data-nav]', (el) => el.hasAttribute('data-open'))))

// barra flotante compacta
const floatBox = await m.$eval('.float', (el) => {
  const r = el.getBoundingClientRect()
  return { right: Math.round(r.right), vw: document.documentElement.clientWidth }
})
check('la barra flotante no se sale del viewport', floatBox.right <= floatBox.vw, JSON.stringify(floatBox))

/* --------------------------------- fin --------------------------------- */
console.log(`\nErrores de consola: ${errors.length}`)
errors.slice(0, 5).forEach((e) => console.log('  ! ' + e))

await browser.close()
