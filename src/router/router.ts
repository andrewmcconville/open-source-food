import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import GlossaryView from '../views/GlossaryView.vue'
import SettingsView from '../views/SettingsView.vue'
import p5Canvas from '../components/p5Canvas.vue'
import IngredientDetails from '../components/IngredientDetails.vue'
import EventDetails from '../components/EventDetails.vue'

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: HomeView
      },
      children: [
        {
          path: '',
          name: 'p5Canvas',
          components: {
            camera: p5Canvas
          },
        },
        {
          path: ':id',
          name: 'IngredientDetails',
          components: {
            camera: p5Canvas,
            timeline: IngredientDetails
          },
        },
        {
          path: ':id/:event',
          name: 'EventDetails',
          components: {
            camera: p5Canvas,
            timeline: IngredientDetails,
            details: EventDetails
          },
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      components: {
        default: AboutView
      }
    },
    {
      path: '/glossary',
      name: 'Glossary',
      components: {
        default: GlossaryView
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      components: {
        default: SettingsView
      }
    },
  ]
})

export default router
