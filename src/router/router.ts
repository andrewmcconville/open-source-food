import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import GlossaryView from '../views/GlossaryView.vue'
import IngredientDetails from '../components/IngredientDetails.vue'

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        main: HomeView
      },
    },
    {
      path: '/:id',
      name: 'IngredientDetails',
      components: {
        main: HomeView,
        details: IngredientDetails
      },
    },
    {
      path: '/about',
      name: 'About',
      components: {
        main: AboutView
      }
    },
    {
      path: '/glossary',
      name: 'Glossary',
      components: {
        main: GlossaryView
      }
    },
  ]
})

export default router
