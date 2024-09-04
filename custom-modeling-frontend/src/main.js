import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon

import axios from 'axios'
axios.defaults.baseURL=process.env.NODE_ENV === 'development'?'http://localhost:3000':'http://50.120.96.108:3000';
Vue.prototype.$axios = axios

  

import '@/assets/iconfont/iconfont.css';

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)

Vue.config.productionTip = false

import {installCmps} from '@/components'
installCmps(Vue)

import vueDraggable from 'vuedraggable'
Vue.component('vueDraggable', vueDraggable)

import VueContextMenu from 'vue-contextmenu'
Vue.use(VueContextMenu)

import Bus from '@/bus/bus.js'
Vue.prototype.$bus = Bus;

import '@/utils/categories.js'


import ECharts from 'vue-echarts'



import 'echarts'


Vue.component('v-chart', ECharts)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
