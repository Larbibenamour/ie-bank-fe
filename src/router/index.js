import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue' // Import Home Component
import AppAccounts from '../components/AppAccounts.vue' // Account creation component

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // Route for Home Page
    name: 'Home',
    component: Home
  },
  {
    path: '/accounts',
    name: 'AppAccounts',
    component: AppAccounts
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
