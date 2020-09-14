import Vue from 'vue'
import VueRouter from 'vue-router'
import vuex from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false },
        beforeEnter: (to, from, next) => {
          if (vuex.state.app.token == "") {
            next({ path: "/login" })
          } else {
            next()
          }
        },
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/home/cart'),
        meta: { title: '购物车', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '用户', keepAlive: false }
      },
      {
        path: '/classify',
        name: 'Classify',
        component: () => import('@/views/home/classify'),
        meta: { title: '关于我', keepAlive: false }
      },


    ]
  },
  {
    path: '/Details',
    name: 'Details',
    component: () => import('@/views/details/Details'),
    meta: { title: '关于我', keepAlive: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Logins'),
    meta: { title: '关于我', keepAlive: false },
    beforeEnter: (to, from, next) => {
      if (vuex.state.app.token == "") {
        next()
      } else {
        next("/")
      }
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/home/Search'),
    meta: { title: '关于我', keepAlive: false }
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: () => import('@/components/confirm/Confirm'),
    meta: { title: '关于我', keepAlive: false }
  },
  {
    path: '/changeLocation',
    name: 'ChangeLocation',
    component: () => import('@/components/location/changeLocation'),
    meta: { title: '关于我', keepAlive: false }
  },
  {
    path: '/AddLocation',
    name: 'AddLocation',
    component: () => import('@/components/location/AddLocation'),
    meta: { title: '关于我', keepAlive: false }
  },
  {
    path: '/Pay',
    name: 'Pay',
    component: () => import('@/components/pay/Pay'),
    meta: { title: '关于我', keepAlive: false }
  },
  {
    path: '/Zhifubao',
    name: 'Zhifubao',
    component: () => import('@/components/pay/Zhifubao'),
    meta: { title: '关于我', keepAlive: false }
  },
  {
    path: '/OrderNum',
    name: 'OrderNum',
    component: () => import('@/components/pay/OrderNum'),
    meta: { title: '关于我', keepAlive: false }
  },

]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
