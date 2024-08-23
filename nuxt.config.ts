import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  srcDir: 'src',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    public: {},
    apiSecret: 'ejemplossss',
  },
  pinia: {
    storesDirs: ['./src/stores/**'],
  },
  imports: {
    dirs: [
      'services',
    ],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error vuetify ignore
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/supabase',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
