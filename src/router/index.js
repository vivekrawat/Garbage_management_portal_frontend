import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { store } from '../store/store.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/items',
    name: 'Items',
    component: () => import(/* webpackChunkName: "feed" */ '../views/Items.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "feed" */ '../views/History.vue')
  },
  {
    path: '/purchases',
    name: 'Purchases',
    component: () => import(/* webpackChunkName: "feed" */ '../views/Purchases.vue')
  },
  {
    path: '/sold',
    name: 'Sold',
    component: () => import(/* webpackChunkName: "feed" */ '../views/Sold.vue')
  },
  {
    path: '/aboutus',
    name: 'Aboutus',
    component: () => import(/* webpackChunkName: "feed" */ '../views/Aboutus.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if ((to.path !== '/' && to.path !== '/aboutus') && store.state.user.id === -1) {
    next({ path: '/' })
  } else if (to.path === '/' && store.state.user.id !== -1) {
    next({ path: '/items' })
  } else {
    next()
  }
  next()
})
export default router
