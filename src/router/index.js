import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TravelView from '../views/TravelView.vue'
import MountingView from '../views/MountingView.vue'
import AccommodationView from '../views/AccommodationView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/travel',
      name: 'travel',
      component: TravelView
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
