export default {
  telemetry: false,
  ssr: false,
  /*
   ** Headers of the page
   */
  generate: {
    fallback: 'index.html'
  },
  router: {
    middleware: 'check-auth'
  },
  head: {
    titleTemplate: 'Readify | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32',href: '/favicons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16',href: '/favicons/favicon-16x16.png' },
      { rel: 'manifest', type: 'image/x-icon', href: '/favicons/site.webmanifest' }
    ],
    script: []
  },
  loading: { color: '#fff' },
  css: [
    '~/assets/css/main.scss'
  ],
  plugins: [
    '~/plugins/vuex-persist.client.js',
    '~/plugins/filters.js'
  ],
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/vuetify',
    '@nuxtjs/toast',
    'vue-scrollto/nuxt'
  ],
  axios: {},
  toast: {
    position: 'bottom-left',
    theme: 'toasted-primary',
    duration: 3000,
    iconPack: 'mdi',
    register: [
      {
        name: 'api_success',
        message: (payload) => {
          // if there is no message passed, show default message
          if (!payload.message) {
            return 'Operation successful';
          }
          // if there is a message, show it
          return payload.message;
        },
        options: {
          type: 'success',
          keepOnHover: true,
          action: {
            icon: 'close',
            onClick: (e, toastObject) => {
              toastObject.goAway(200);
            }
          }
        }
      },
      {
        name: 'api_error',
        message: (payload) => {
          // if there is no message passed show default message
          if (!payload || !payload.message) {
            return 'Oops...Something went wrong. Please try again later';
          }
          // if there is a message show it with the message
          return payload.message;
        },
        options: {
          type: 'error',
          keepOnHover: true,
          action: {
            icon: 'close',
            onClick: (e, toastObject) => {
              toastObject.goAway(200);
            }
          }
        }
      }
    ]
  },
  vuetify: {
    theme: {
      dark: true
    }
  },
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-optional-chaining', { proposal: 'minimal' }],
        ['@babel/plugin-syntax-optional-chaining', { proposal: 'minimal' }]
      ]
    }
  }
};
