// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/reset.css';
import 'font-awesome/css/font-awesome.css'
import axios from 'axios';
import qs from 'qs';
import echarts from 'echarts';
import MyPlugin from './assets/global';

Vue.prototype.$echarts = echarts ;
Vue.prototype.$qs = qs;
Vue.prototype.$http = axios;
Vue.use(MyPlugin);
Vue.use(ElementUI);
Vue.config.productionTip = false

// this.$http.create({
//   headers: 'Content-Type: application/json'
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

