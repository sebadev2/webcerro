/* Comprueba el contraste WCAG de los pares de color del sistema de diseño. */
const hex = (h) => {
  const s = h.replace('#', '')
  const n = parseInt(s.length === 3 ? s.split('').map((c) => c + c).join('') : s, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const lum = (rgb) => {
  const c = rgb.map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}

const ratio = (a, b) => {
  const [x, y] = [lum(hex(a)), lum(hex(b))].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

const T = {
  green: '#38baa6',
  greenDark: '#1c7266',
  greenLight: '#e7f5f3',
  teal: '#2f9e8c',
  navy: '#00132f',
  navy800: '#05162d',
  white: '#ffffff',
  grey900: '#1b2333',
  grey700: '#4a5468',
  grey500: '#6b7686',
}

const pares = [
  ['navy sobre green (botón primario)', T.navy, T.green, 4.5],
  ['blanco sobre green (hover botón)', T.white, T.greenDark, 4.5],
  ['greenDark sobre greenLight (badge)', T.greenDark, T.greenLight, 4.5],
  ['greenDark sobre blanco (títulos mega)', T.greenDark, T.white, 4.5],
  ['green sobre navy (cifras)', T.green, T.navy, 4.5],
  ['green sobre navy-800 (teléfonos)', T.green, T.navy800, 4.5],
  ['navy sobre greenLight (etiqueta fecha)', T.navy, T.greenLight, 4.5],
  ['teal sobre navy-800', T.teal, T.navy800, 4.5],
  ['grey500 sobre blanco (textos secundarios)', T.grey500, T.white, 4.5],
  ['grey700 sobre blanco', T.grey700, T.white, 4.5],
  ['grey900 sobre blanco (texto base)', T.grey900, T.white, 4.5],
  ['blanco sobre navy (hero)', T.white, T.navy, 4.5],
]

let fallos = 0
console.log('par                                        ratio   min   estado')
console.log('-'.repeat(70))
for (const [nombre, fg, bg, min] of pares) {
  const r = ratio(fg, bg)
  const ok = r >= min
  if (!ok) fallos++
  console.log(
    `${nombre.padEnd(44)} ${r.toFixed(2).padStart(5)}  ${String(min).padStart(4)}  ${ok ? 'OK' : 'FALLA'}`
  )
}

console.log('-'.repeat(70))
console.log(fallos === 0 ? 'Todos los pares cumplen WCAG AA' : `${fallos} par(es) por debajo`)
