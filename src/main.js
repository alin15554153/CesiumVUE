import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Index from './views/Index'
import widget from 'cesium/Widgets/widgets.css'
Vue.use(ElementUI);
Vue.use(iView);
Vue.config.productionTip = false
Cesium.Ion.defaultAccessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMDY0OGY2NS1iNjVkLTRiOGUtOTc1Ni0xMzBiYzEwOWVhYmEiLCJpZCI6NjE1Miwic2NvcGVzIjpbImFzbCIsImFzciIsImFzdyIsImdjIl0sImlhdCI6MTU2Mzc4MTAzOX0.nQcyfvrJ8CJXuyUQd0hCcjtjEZpOpcFlko4fo7KNEe0';

// debugger

let vm =new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default vm
