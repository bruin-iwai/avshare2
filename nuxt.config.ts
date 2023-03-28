// cf) https://codybontecou.com/how-to-use-vuetify-with-nuxt-3.html
//     https://zenn.dev/coedo/articles/nuxt3-vuetify3

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },

  css: ['vuetify/lib/styles/main.sass'],

  modules: ['@nuxtjs/eslint-module'],

  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:3000', // automatically set at runtime using process.env.NUXT_PUBLIC_BASE_URL
      apiKey: '', // automatically set at runtime using process.env.NUXT_PUBLIC_API_KEY
    },
  },

  ssr: true,

  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
});
