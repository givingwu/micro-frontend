import Vue from "vue";
import App from "./App.vue";
import microfe from '../../../lib'

Vue.config.productionTip = false;

const host = microfe.createHost();
const app = {
  path: "/demo2",
  // component: './src/views/app1',
  render() {
    return new Vue({
      render: h => h(App)
    }).$mount("#app");
  }
};

host.createApp(app);
// host.start()

export default app;
