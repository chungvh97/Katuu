// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: '/katuu/',
  },
  build: {
    transpile: ['vuetify'],
  },
  css: [ '~/assets/css/index.css',],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    'nuxt-vuefire',
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: true
    },
    config: {
      apiKey: "AIzaSyD2B0zCpxtQcPNoyTAyVePabbZrsvMfvs4",
      authDomain: "nuxt-blog-4bf26.firebaseapp.com",
      databaseURL: "https://nuxt-blog-4bf26.firebaseio.com",
      projectId: "nuxt-blog-4bf26",
      storageBucket: "nuxt-blog-4bf26.appspot.com",
      messagingSenderId: "93634015500",
      appId: "1:93634015500:web:9cabc4347b0835340bd929",
      measurementId: "G-7WLZ5RDWE2"
      // there could be other properties depending on the project
    },
  },
})