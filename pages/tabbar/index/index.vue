<template>
	<view>
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<!-- 滚动tab -->
		<scroll-tab :list="labelList"></scroll-tab>
		<view v-for="item in 100">{{item}}内容数据</view>
	</view>
</template>

<script>
	// easycom @/components/组件名/组件名.vue 局部引入
	// import navbar from '@/components/navbar/navbar.vue'
	export default {
		// components: {
		// 	navbar
		// },
		data() {
			return {
				labelList: []
			}
		},
		onLoad() {
			this.getLabelData()
		},
		methods: {
			getLabelData() {
				// uniCloud.callFunction({
				// 	name: 'getLabel',
				// 	success(res) {
				// 		console.log(res)
				// 	},
				// 	fail(err) {
				// 		console.log(err)
				// 	}
				// })
				
				// 调用云函数
				uniCloud.callFunction({
					name: 'getLabel'
				}).then((res) => {
					const { result } = res
					this.labelList = result.data
					console.log(this.labelList)
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>

</style>
