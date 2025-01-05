import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  // 可以在这里添加更多路由
]

const router = new VueRouter({
  mode: 'history', // 使用 history 模式，去掉 URL 中的 #
  base: process.env.BASE_URL,
  routes
})

export default router 