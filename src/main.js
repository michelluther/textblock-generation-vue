import Vue from 'vue'
import App from './App.vue'
// import ScrollLoader from 'vue-scroll-loader'

Vue.config.productionTip = false
// Vue.component('scroll-loader', ScrollLoader)

new Vue({
  render: h => h(App),
}).$mount('#app')
