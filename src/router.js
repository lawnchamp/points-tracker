import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Points from '@/components/Points.vue'
import firebase from '@/firebase.js'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/points',
      name: 'Points',
      component: Points,
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let onAuthPage = to.name.match(/(Login)|(Register)/)

  if (currentUser && onAuthPage) next('points')
  else next()
})

export default router
