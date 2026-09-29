// @ts-check
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.cerronavia.cl',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
})
