import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
if (process.env.NODE_ENV !== 'production') {
  Vue.config.devtools = true; // 确保启用 devtools
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
