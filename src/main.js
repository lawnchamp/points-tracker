import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import firebase from 'firebase'

Vue.config.productionTip = false

// firebase.initializeApp({
//   apiKey: 'AIzaSyDJGzhHLQp8oW794Egqm7j1UToE4CmHpPk',
//   authDomain: 'point-tracker18.firebaseapp.com',
//   databaseURL: 'https://point-tracker18.firebaseio.com',
//   projectId: 'point-tracker18',
//   storageBucket: 'point-tracker18.appspot.com',
//   messagingSenderId: '727305853236'
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
