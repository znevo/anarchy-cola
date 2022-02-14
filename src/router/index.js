import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Anarchists from '../views/Anarchists.vue'
import Authoritarians from '../views/Authoritarians.vue'

Vue.use(VueRouter)

const metamask = (to, from, next) => {
  window.metamask.ready('rinkeby') ? next() : next('/');
}

const guest = (to, from, next) => {
  window.metamask.ready('rinkeby') ? next('/anarchists') : next();
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: guest,
  },
  {
    path: '/anarchists',
    name: 'Anarchists',
    component: Anarchists,
    beforeEnter: metamask,
  },
  {
    path: '/authoritarians',
    name: 'Authoritarians',
    component: Authoritarians,
    beforeEnter: metamask,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
