import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Highcharts from 'highcharts'
// 引入过滤器
import '@/filter/'
// 全局组件
import '@/components/global/globalComponent.js'
// 动画库
import '@/style/css/animate.css'
// 网络请求
import apis from '@/http/apis'
// 引入 antd
import '@/plugins/antd'
// 引入 moment
import '@/plugins/moment'
// 样式需要在最后面
// 引入 antd 样式
import 'ant-design-vue/dist/antd.less'
import '@/style/antdRest.less'

// 样式需要在最后面
// 自动生成样式库
import '@/style/css/auto.css'
// 样式重写
import '@/style/css/reset.css'

// 路由登录拦截
import '@/permission.js'
import {
  cantUse
} from '@/utils'

Vue.config.productionTip = false

// 原型链挂载
Vue.prototype.$apis = apis
Vue.prototype.$hasPermission = cantUse
Vue.prototype.$highcharts = Highcharts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
