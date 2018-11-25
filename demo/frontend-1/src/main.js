import Vue from 'vue'
import App from './App.vue'
import microfe from '../../../lib'

Vue.config.productionTip = false

const host = microfe.createHost()
const app = {
  path: '/demo1',
  render() {
    return new Vue({
      render: h => h(App),
    }).$mount('#app')
  }
}

// eslint-disable-next-line
console.log('process.env.HOST_APP: ', process.env.HOST_APP);

host.createApp(app)

// host.start()

export default app;