<template>
	<view>
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<!-- 滚动tab -->
		<scroll-tab :list="labelList" @handleTap="tabSwitch"></scroll-tab>
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
			tabSwitch({data, index}) {
				console.log('接收到的数据', data, index)
			},
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
				// uniCloud.callFunction({
				// 	name: 'getLabel'
				// }).then((res) => {
				// 	const { result } = res
				// 	this.labelList = result.data
				// 	console.log(this.labelList)
				// }).catch((err) => {
				// 	console.log(err)
				// })
				
				console.log(this.$api)
				this.$api.getLabel().then((res) => {
					console.log(res)
					const { data } = res
					this.labelList = data
					console.log(this.labelList)
				})
				
				// this.$api.getList().then((res) => {
				// 	console.log(res);
				// })
			}
		}
	}
</script>

<style>

</style>
