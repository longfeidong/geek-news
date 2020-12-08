// vuex 状态管理

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 数据源
	state: {
		historyList: []
	},
	mutations: {
		// 修改数据源中的数据
		SET_HISTORY_LIST (state, history) {
			state.historyList = history
		}
	},
	actions: {
		// 页面中调用 set_histroy
		set_history ({commit, state}, history) {
			// 提交mutations中定义的方法
			let list = state.historyList
			list.unshift(history)
			commit('SET_HISTORY_LIST', list)
			// commit('SET_HISTORY_LIST', history)
		}
	}
})

export default store