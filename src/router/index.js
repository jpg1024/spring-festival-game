import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: '春节小游戏'
    }
  },
  {
    path: '/riddle',
    name: 'Riddle',
    component: () => import('../views/RiddleGame.vue'),
    meta: {
      title: '猜灯谜'
    }
  },
  {
    path: '/brain-teaser',
    name: 'BrainTeaser',
    component: () => import('../views/BrainTeaserGame.vue'),
    meta: {
      title: '脑筋急转弯'
    }
  },
  {
    path: '/lottery',
    name: 'Lottery',
    component: () => import('../views/LotteryGame.vue'),
    meta: {
      title: '幸运大转盘'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '春节小游戏'
  next()
})

export default router