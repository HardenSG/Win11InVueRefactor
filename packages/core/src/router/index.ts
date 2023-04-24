import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/views/Root/index.vue'),
      // components: {
      //   // The demo is a Nested Views config
      //   default: null,
      //   viewOne: null,
      //   viewTwo: null
      // },
      meta: {
        isKeepAlive: false,
      },
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Home/index.vue'),
      meta: {
        isKeepAlive: false,
      },
    },
  ],
})

export default router
