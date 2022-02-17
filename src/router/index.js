import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Article List',
    component: () => import('../views/ArticleList.vue')
  },
  {
    path: '/article/detail/:id',
    name: 'Article',
    component: () => import('../views/ArticleDetail.vue')
  },
  {
    path: '/article/new',
    name: 'Edit Article',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/ArticleEdit.vue')
  },
  {
    path: '/article/edit/:id',
    name: 'Edit Article',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/ArticleEdit.vue')
  },
  {
    path: '/user/list',
    name: 'User List',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/UserList.vue')
  },
  {
    path: '/user/new',
    name: 'Edit User',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/user/edit/:id',
    name: 'Edit User',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/changePassword',
    name: 'Change Password',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/ChangePassword.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
