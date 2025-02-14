// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path'

export default defineNuxtConfig({
  app: {
    head: {
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }, { charset: 'utf-8' }],
      script: [],
      link: [],
      style: [],
      noscript: [],
    },
  },

  // Directory of your source files
  srcDir: 'src-nuxt',

  ssr: process.env.NUXT_SSR === 'true',
  devtools: { enabled: true },
  telemetry: false,
  components: true,

  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils/module',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@flapi/cms-designsystem',
    'nuxt-seo-utils',
  ],

  plugins: [{ src: '~/plugins/vee-validate.ts', mode: 'client' }],

  vite: {
    resolve: {
      alias: {
        '#adonisjs/api': path.resolve(__dirname, 'tuyau-adonisjs/api.ts'),
        '#adonisjs/index': path.resolve(__dirname, 'tuyau-adonisjs/index.ts'),
      },
    },
  },

  pinia: {
    storesDirs: ['./src-nuxt/stores/**'],
  },

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // Chemin vers le fichier CSS de Tailwind
    cssPath: 'src-nuxt/assets/css/tailwind.css',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  googleFonts: {
    families: {
      Poppins: true,
    },
  },

  image: {
    // Options
  },

  compatibilityDate: '2025-02-07',
})
