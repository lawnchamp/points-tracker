import Vue from 'vue'
import Login from '@/views/Login.vue'
import PointsPage from '@/views/PointsPage.vue'
import Router from 'vue-router'
import Weights from '@/views/Weights.vue'
import {auth} from '@/firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/points',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/points',
      name: 'Points',
      component: PointsPage,
    },
    {
      path: '/weights',
      name: 'Weights',
      component: Weights,
      meta: {requiresAuth: true},
    },
  ],
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser

  const onAuthPage = to.name === 'Login'
  if (currentUser && onAuthPage) next('points')

  if (to.matched.some(record => record.meta.requiresAuth) && !currentUser) {
    next({
      path: '/login',
      query: {redirect: to.fullPath},
    })
  } else next()
})

export default router
