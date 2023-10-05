import { createRouter, createWebHistory } from 'vue-router'

import MenuView from '../views/MenuView.vue'
import GameView from '../views/GameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    },
  ]
})

export default router
