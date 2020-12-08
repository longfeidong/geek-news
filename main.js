import Vue from 'vue'
import App from './App'
import api from './common/api'
// 引入vuex
import store from './store'

Vue.config.productionTip = false
// 把 api 挂载到 Vue 的原型上
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
