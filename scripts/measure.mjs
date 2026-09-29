/* Medir overflow horizontal y capturar la portada en anchos reales. */
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const URL = process.env.URL ?? 'http://localhost:4321/'
const OUT = 'C:\\Users\\sebastian.hernandez\\AppData\\Local\\Temp\\opencode'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'shell',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
})

const widths = [390, 768, 1024, 1440]

for (const width of widths) {
  const page = await browser.newPage()
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1, isMobile: width < 900 })
  await page.goto(URL, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 800))

  const report = await page.evaluate(() => {
    const doc = document.documentElement
    const vw = doc.clientWidth
    const offenders = []

    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0) continue
      // Elementos que sobresalen por la derecha del viewport
      if (r.right > vw + 1) {
        offenders.push({
          sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string'
            ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.')
            : ''),
          right: Math.round(r.right),
          width: Math.round(r.width),
        })
      }
    }

    // Nos quedamos con losContainers más externos que desbordan
    return {
      vw,
      scrollWidth: doc.scrollWidth,
      overflow: doc.scrollWidth - vw,
      hasBodyOverflowX: getComputedStyle(document.body).overflowX,
      offenders: offenders.slice(0, 12),
    }
  })

  console.log(`\n=== ${width}px ===`)
  console.log(`  viewport=${report.vw}  scrollWidth=${report.scrollWidth}  overflow=${report.overflow}px`)
  if (report.offenders.length) {
    for (const o of report.offenders) console.log(`   - ${o.sel}  right=${o.right} w=${o.width}`)
  } else {
    console.log('   sin elementos desbordados')
  }

  await page.screenshot({ path: `${OUT}\\m-${width}.png`, fullPage: width < 900 })
  await page.close()
}

await browser.close()
