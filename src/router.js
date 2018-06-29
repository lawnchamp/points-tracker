import Vue from 'vue'
import Login from '@/views/Login.vue'
import PointsPage from '@/views/PointsPage.vue'
import Register from '@/views/Register.vue'
import Router from 'vue-router'
import Weights from '@/views/Weights.vue'
import firebase from '@/firebase.js'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/points'
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
      component: PointsPage
    },
    {
      path: '/weights',
      name: 'Weights',
      component: Weights,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser

  let onAuthPage = to.name && to.name.match(/(Login)|(Register)/)
  if (currentUser && onAuthPage) next('points')

  if (to.matched.some(record => record.meta.requiresAuth) && !currentUser) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else next()
})

export default router
