import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const Rollbar = require('vue-rollbar')

Vue.config.productionTip = false

Vue.use(Rollbar, {
  accessToken: '992f5159e1344288b41709f4d4910de4',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: true,
  source_map_enabled: true,
  environment: process.env.NODE_ENV,
  payload: {
    client: {
      javascript: {
        code_version: '1.0',
      },
    },
  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
