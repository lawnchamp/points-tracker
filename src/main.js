import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from '@/firebase.js'

Vue.config.productionTip = false

const unsubscribe = firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      router,
      firebaseUser,
      store,
      render: h => h(App),
      created () {
        // if (firebaseUser) {
        //   store.dispatch('autoSignIn', firebaseUser)
        // }
      }
    }).$mount('#app')
  })
// unsubscribe()
