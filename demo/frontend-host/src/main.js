import Vue from 'vue'
import App from './App.vue'
import app1 from '../../frontend-1/src/main'
import app2 from '../../frontend-2/src/main'
import microfe from '../../../lib'

Vue.config.productionTip = false


// eslint-disable-next-line
console.log(microfe);

const host = microfe.createHost()

host.createApp({
  path: '/',
  // component: './src/views/app1',
  render() {
    return new Vue({
      render: h => h(App),
    }).$mount('#app')
  }
})

host.createApp(app1)
host.createApp(app2)


// eslint-disable-next-line
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
// eslint-disable-next-line
console.log('process.env: ', process.env);

host.start()

export default host