// vuex 状态管理

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 数据源
	state: {
		// historyList: []
		// 本地持久化储存数据源
		historyList: uni.getStorageSync('__HISTORY') || []
	},
	mutations: {
		// 修改数据源中的数据
		SET_HISTORY_LIST(state, history) {
			state.historyList = history
		},
		// 清空数据源
		CLEAR_HISTORY_LIST(state) {
			state.historyList = []
		}
	},
	actions: {
		// 页面中调用 set_histroy
		set_history({commit, state}, history) {
			// 提交mutations中定义的方法
			let list = state.historyList
			list.unshift(history)
			// 设置本地缓存
			uni.setStorageSync('__HISTORY', list)
			commit('SET_HISTORY_LIST', list)
			// commit('SET_HISTORY_LIST', history)
		},
		clear_history({commit}) {
			// uni.clearStorageSync('__HISTORY', [])
			uni.removeStorageSync('__HISTORY')
			commit('CLEAR_HISTORY_LIST')
		}
	}
})

export default store