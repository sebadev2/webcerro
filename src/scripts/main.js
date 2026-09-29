/* Interacciones de la portada. Vanilla JS, sin dependencias. */

const $ = (sel, ctx = document) => ctx.querySelector(sel)
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)]

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ----------------------------- header sticky ---------------------------- */

const header = $('[data-header]')
if (header) {
  const onScroll = () => {
    if (window.scrollY > 8) header.setAttribute('data-stuck', '')
    else header.removeAttribute('data-stuck')
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

/* ------------------------------ menú móvil ------------------------------ */

const nav = $('[data-nav]')
const menuToggle = $('[data-menu-toggle]')

if (nav && menuToggle) {
  const setMenu = (open) => {
    nav.toggleAttribute('data-open', open)
    menuToggle.setAttribute('aria-expanded', String(open))
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú')
    document.body.style.overflow = open ? 'hidden' : ''
  }

  menuToggle.addEventListener('click', () => setMenu(!nav.hasAttribute('data-open')))

  // En móvil el megamenú se despliega al pulsar el ítem
  $$('.nav__item.has-children > .nav__link').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 1080px)').matches) {
        e.preventDefault()
        const li = link.parentElement
        li.toggleAttribute('data-expanded')
        link.setAttribute('aria-expanded', String(li.hasAttribute('data-expanded')))
      }
    })
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.hasAttribute('data-open')) setMenu(false)
  })
}

/* ------------------------------ buscador -------------------------------- */

const searchToggle = $('[data-search-toggle]')
const searchbar = $('[data-searchbar]')

if (searchToggle && searchbar) {
  const setSearch = (open) => {
    searchbar.hidden = !open
    searchToggle.setAttribute('aria-expanded', String(open))
    if (open) searchbar.querySelector('input')?.focus()
  }

  searchToggle.addEventListener('click', () => setSearch(searchbar.hidden))

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !searchbar.hidden) setSearch(false)
    // Ctrl/Cmd + K enfoca la búsqueda del header
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      setSearch(true)
    }
  })
}

/* -------------------------------- slider -------------------------------- */

const hero = $('[data-hero]')
if (hero) {
  const slides = $$('[data-slide]', hero)
  const dots = $$('[data-dot]', hero)
  let index = 0
  let timer

  const show = (i) => {
    index = (i + slides.length) % slides.length
    slides.forEach((s, n) => s.classList.toggle('is-active', n === index))
    dots.forEach((d, n) => {
      d.classList.toggle('is-active', n === index)
      d.setAttribute('aria-selected', String(n === index))
    })
  }

  const play = () => {
    if (prefersReduced || slides.length < 2) return
    stop()
    timer = setInterval(() => show(index + 1), 6500)
  }

  const stop = () => clearInterval(timer)

  $('[data-next]', hero)?.addEventListener('click', () => {
    show(index + 1)
    play()
  })

  $('[data-prev]', hero)?.addEventListener('click', () => {
    show(index - 1)
    play()
  })

  dots.forEach((d, n) => d.addEventListener('click', () => {
    show(n)
    play()
  }))

  // Pausa al pasar el cursor o al usar el teclado dentro del hero
  hero.addEventListener('mouseenter', stop)
  hero.addEventListener('mouseleave', play)
  hero.addEventListener('focusin', stop)

  // Visible sólo en el primer slide
  const io = new IntersectionObserver(
    ([entry]) => entry.isIntersecting ? play() : stop(),
    { threshold: 0.25 }
  )
  io.observe(hero)

  play()
}

/* --------------------------- filtros de noticias ------------------------ */

const tabs = $('[data-tabs]')
const news = $('[data-news]')

if (tabs && news) {
  const cards = $$('[data-cat]', news)
  const empty = $('[data-news-empty]')

  tabs.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cat]')
    if (!btn) return

    $$('[data-cat]', tabs).forEach((t) => {
      t.classList.toggle('is-active', t === btn)
      t.setAttribute('aria-selected', String(t === btn))
    })

    const cat = btn.dataset.cat
    let visible = 0
    cards.forEach((card) => {
      const show = cat === 'Todas' || card.dataset.cat === cat
      card.hidden = !show
      if (show) visible++
    })

    if (empty) empty.hidden = visible > 0
  })
}

/* --------------------------- accesibilidad ------------------------------ */

const root = document.documentElement

$$('[data-font]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const size = btn.dataset.font
    const next = root.getAttribute('data-font') === size ? 'md' : size
    if (next === 'md') root.removeAttribute('data-font')
    else root.setAttribute('data-font', next)

    try {
      if (next === 'md') localStorage.removeItem('cn-font')
      else localStorage.setItem('cn-font', next)
    } catch {}

    $$('[data-font]').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.font === root.getAttribute('data-font')))
    )
  })
})

$$('[data-contrast]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const on = root.getAttribute('data-contrast') === 'high'
    if (on) root.removeAttribute('data-contrast')
    else root.setAttribute('data-contrast', 'high')

    btn.setAttribute('aria-pressed', String(!on))
    try {
      if (on) localStorage.removeItem('cn-contrast')
      else localStorage.setItem('cn-contrast', 'high')
    } catch {}
  })
})

$$('[data-theme]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') === 'dark'
    if (dark) root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', 'dark')

    btn.setAttribute('aria-pressed', String(!dark))
    try {
      if (dark) localStorage.removeItem('cn-theme')
      else localStorage.setItem('cn-theme', 'dark')
    } catch {}
  })
})

$$('[data-grayscale]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const on = root.getAttribute('data-grayscale') === 'on'
    if (on) root.removeAttribute('data-grayscale')
    else root.setAttribute('data-grayscale', 'on')

    btn.setAttribute('aria-pressed', String(!on))
    try {
      if (on) localStorage.removeItem('cn-grayscale')
      else localStorage.setItem('cn-grayscale', 'on')
    } catch {}
  })
})

// Refleja el estado inicial aplicado por el script inline del <head>
$$('[data-contrast]').forEach((b) =>
  b.setAttribute('aria-pressed', String(root.getAttribute('data-contrast') === 'high'))
)
$$('[data-font]').forEach((b) =>
  b.setAttribute('aria-pressed', String(root.getAttribute('data-font') === b.dataset.font))
)
$$('[data-theme]').forEach((b) =>
  b.setAttribute('aria-pressed', String(root.getAttribute('data-theme') === 'dark'))
)
$$('[data-grayscale]').forEach((b) =>
  b.setAttribute('aria-pressed', String(root.getAttribute('data-grayscale') === 'on'))
)
