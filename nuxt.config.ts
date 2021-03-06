import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Hackz Memo',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/repository/user.repository.inject.ts' },
    { src: '~/plugins/repository/post.repository.inject.ts' },
    { src: '~/plugins/vue-textarea-autosize.js' },
    { src: '~/plugins/inmemory-persistedstate', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ['~/components/shared', '~/components/layout'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://github.com/nuxt-community/composition-api
    '@nuxtjs/composition-api/module',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://www.npmjs.com/package/@nuxtjs/firebase
    '@nuxtjs/firebase',
    // https://www.npmjs.com/package/@nuxtjs/style-resources
    '@nuxtjs/style-resources',
  ],

  // Firebase setting
  firebase: {
    lazy: false,
    config: {
      apiKey: process.env.FIREBASE_API_KEY as string,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
      projectId: process.env.FIREBASE_PROJECT_ID as string,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
      appId: process.env.FIREBASE_APP_ID as string,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID as string,
    },
    onFirebaseHosting: true,
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChanged',
        },
      },
      firestore: {
        enablePersistence: {
          synchronizeTabs: true,
        },
      },
      analytics: true,
    },
  },

  // Global scss
  styleResources: {
    scss: ['~/assets/sass/variables.scss'],
  },

  // Generate Configuration
  generate: {
    fallback: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Enviroment
  env: {
    NODE_ENV: process.env.NODE_ENV as string,
  },
};

export default config;
