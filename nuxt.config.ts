import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineNuxtConfig({
  //...
  css: [
    '~/assets/css/global.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    [
      'nuxt-openapi-docs-module',
      {
        folder: './docs',
        name: 'APIs doc',
        files: function() {
          return { 
            'tts': 'Text to speech'
          }
        },
        debug: true,
        list: true,
        locales: ['en'],
        footer: '© 2024 TUANTT. All rights reserved.'
      }
    ]
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
})
