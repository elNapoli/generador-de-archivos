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
      'services/*.ts', 'models/*.ts',
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

  alias: {
    '@type': `${__dirname}/src/type`,
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  compatibilityDate: '2024-08-24',
})
