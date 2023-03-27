import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  css: ['@/assets/main.scss'],

  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(vuetify());
      config.build!.rollupOptions!.external = ['vue-router'];
    },
  },

  modules: ['@nuxtjs/eslint-module'],

  runtimeConfig: {
    app: {
      baseURL: 'http://localhost:3000', // automatically set at runtime using process.env.NUXT_APP_BASE_URL
    },
    public: {
      apiKey: '', // automatically set at runtime using process.env.NUXT_PUBLIC_API_KEY
    },
  },

  ssr: false,

  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
});
