import Vue from 'vue'
import App from './App.vue'
import microfe from 'm-fe'

Vue.config.productionTip = false

const host = microfe.createHost()
const app = {
  path: '/demo1',
  dev: process.env.NODE_ENV === 'development',
  render() {
    return new Vue({
      render: h => h(App),
    }).$mount('#app')
  }
}

host.createApp(app)
host.start()

export default app;