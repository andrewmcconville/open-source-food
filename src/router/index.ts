import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/:param?',
      name: 'home',
      component: HomeView,
      props: route => ({ param: route.params.param })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
