import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineNuxtConfig({
  css: [
    '~/assets/css/global.css',
  ],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    'nuxt-vue3-google-signin',
    '@vueuse/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    plugins: [nodePolyfills({})]
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },

  compatibilityDate: '2025-02-24',
})