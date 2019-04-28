import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {auth} from '@/firebase'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    store.dispatch('autoSignIn', firebaseUser)
  }
})
export default unsubscribe
