
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const rootDir = dirname(fileURLToPath(import.meta.url))
const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:5295'
const statsUrl ='https://codechallenge-statistics.azurewebsites.net'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxt/test-utils/module'],
    css: ['~/assets/css/main.css'],

  alias: {
    '@': rootDir,
    '@/app': resolve(rootDir, 'app'),
    '@/stores': resolve(rootDir, 'stores'),
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [{ code: 'en', name: 'English' }]
  },
  vite: {
    server: {
      proxy: {
        '/events': { target: backendUrl, changeOrigin: true, secure: false },
        '/api/online-statistics': { target: statsUrl, changeOrigin: true },
        '/api/onsite-statistics': { target: statsUrl, changeOrigin: true }
      }
    }
  },
  routeRules: {
    '/events/**': { proxy: `${backendUrl}/**` },
    '/api/online-statistics/**': { proxy: `${statsUrl}/**` },
    '/api/onsite-statistics/**': { proxy: `${statsUrl}/**` }
  },
  nitro: {
    devProxy: {
      '/events': {
        target: backendUrl,
        changeOrigin: true,
        secure: false
      },
      '/events/': {
        target: backendUrl,
        changeOrigin: true,
        secure: false
      },
      '/api/online-statistics': {
        target: statsUrl,
        changeOrigin: true
      },
      '/api/online-statistics/': {
        target: statsUrl,
        changeOrigin: true
      },
      '/api/onsite-statistics': {
        target: statsUrl,
        changeOrigin: true
      },
      '/api/onsite-statistics/': {
        target: statsUrl,
        changeOrigin: true
      }
    }
  },

})
