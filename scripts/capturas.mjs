/* Captura el hero con foto y los slides sin foto. */
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const URL = process.env.URL ?? 'http://localhost:4321/'
const OUT = 'C:\\Users\\sebastian.hernandez\\AppData\\Local\\Temp\\opencode'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'shell',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
})

const p = await browser.newPage()
await p.setViewport({ width: 1360, height: 760 })
await p.goto(URL, { waitUntil: 'networkidle0' })

// esperar a que la foto del hero esté cargada de verdad
await p.waitForFunction(
  () => {
    const i = document.querySelector('.slide__photo')
    return i && i.complete && i.naturalWidth > 0
  },
  { timeout: 15000 }
)
await new Promise((r) => setTimeout(r, 900))

const info = await p.evaluate(() => {
  const img = document.querySelector('.slide__photo')
  return {
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt'),
    natural: `${img.naturalWidth}x${img.naturalHeight}`,
    render: `${Math.round(img.getBoundingClientRect().width)}x${Math.round(img.getBoundingClientRect().height)}`,
    credit: document.querySelector('.slide__credit')?.textContent.trim(),
  }
})
console.log(JSON.stringify(info, null, 2))

await p.screenshot({ path: `${OUT}\\hero-foto.png`, clip: { x: 0, y: 0, width: 1360, height: 700 } })

// slide 2 (degradado, sin foto)
await p.click('[data-next]')
await new Promise((r) => setTimeout(r, 1000))
await p.screenshot({ path: `${OUT}\\hero-gradiente.png`, clip: { x: 0, y: 0, width: 1360, height: 700 } })

// móvil
const m = await browser.newPage()
await m.setViewport({ width: 390, height: 800, isMobile: true })
await m.goto(URL, { waitUntil: 'networkidle0' })
await m.waitForFunction(() => {
  const i = document.querySelector('.slide__photo')
  return i && i.complete && i.naturalWidth > 0
})
await new Promise((r) => setTimeout(r, 800))
await m.screenshot({ path: `${OUT}\\hero-movil.png` })

console.log('capturas listas')
await browser.close()
