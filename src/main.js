import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const Rollbar = require('vue-rollbar')

if (process.env.NODE_ENV == 'production') {
  Vue.config.productionTip = false
  Vue.config.devtools = false
} else {
  Vue.config.productionTip = true
  Vue.config.devtools = true
  Vue.config.performance = true
}
Vue.config.silent = false
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  const stringError = `vue error handler - err:${err}, vm:${vm}, info:${info}`
  console.error(stringError)
  Vue.rollbar.error(stringError)
}

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
