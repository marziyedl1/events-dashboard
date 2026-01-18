
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      // Backend API base - using local Nuxt server API routes
      apiBase: process.env.BACKEND_URL || 'http://localhost:3000',
      // External statistics base
      statsBase: process.env.BACKEND_URL || 'https://codechallenge-statistics.azurewebsites.net'
    }
  },

}

)
