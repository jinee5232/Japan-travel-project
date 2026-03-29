import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlacesView from '../views/PlacesView.vue'
import ShoppingView from '../views/ShoppingView.vue'
import MountingView from '../views/MountingView.vue'
import AccommodationView from '../views/AccommodationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/places',
      name: 'places',
      component: PlacesView
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: ShoppingView
    },
    {
      path: '/mounting',
      name: 'mounting',
      component: MountingView
    },
    {
      path: '/accommodation',
      name: 'accommodation',
      component: AccommodationView
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
