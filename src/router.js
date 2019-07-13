import Vue from 'vue'
import Login from '@/views/Login.vue'
import PointsPage from '@/views/PointsPage.vue'
import Router from 'vue-router'
import UsersPage from '@/views/UsersPage.vue'
import store from './store'
import Weights from '@/views/WeightsPage.vue'
import {auth} from '@/firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'points',
      component: PointsPage,
    },
    {
      path: '/points',
      redirect: '/'
    },
    {
      path: '/users',
      name: 'users',
      component: UsersPage,
      meta: {requiresAuth: true},
    },
    {
      path: '/weights',
      name: 'weights',
      component: Weights,
      meta: {requiresAuth: true},
    },
  ],
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser
  const onAuthPage = to.name === 'login'
  if (currentUser && onAuthPage) next('points')

  if (to.matched.some(record => record.meta.requiresAuth) && !currentUser) {
    next({
      path: '/login',
      query: {redirect: to.fullPath},
    })
  } else next()
})

export default router
