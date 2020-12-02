<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<!-- 滚动tab -->
		<scroll-tab :list="labelList" :tabIndex="tabIndex" @handleTap="tabSwitch"></scroll-tab>
		<!-- <view v-for="item in 100">{{item}}内容数据</view> -->
		<!-- 滚动列表组件 -->
		
		<list-swiper :tabNum="labelList" :activeIndex="activeIndex" @changeSwiper="handleChange"></list-swiper>
		
		<!-- <list-scroll>
			<view v-for="item in 5">{{item}}内容数据</view>
			<list-card v-for="item in 5"></list-card>
			<list-card mode="base"></list-card>
			<list-card mode="column"></list-card>
			<list-card mode="bigPic"></list-card>
			<list-card mode="base"></list-card>
			<list-card mode="column"></list-card>
			<list-card mode="bigPic"></list-card>
		</list-scroll> -->
	</view>
</template>

<script>
	// easycom @/components/组件名/组件名.vue 局部引入
	// import listCard from '@/components/list-card/list-card.vue'
	export default {
		// components: {
		// 	listCard
		// },
		data() {
			return {
				labelList: [],
				tabIndex: 0,
				activeIndex: 0
			}
		},
		onLoad() {
			this.getLabelData()
		},
		methods: {
			tabSwitch({data, index}) {
				this.activeIndex = index
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
					// 添加 全部 Label
					data.unshift({
						name: '全部'
					})
					this.labelList = data
					console.log(this.labelList)
				})
				
				// this.$api.getList().then((res) => {
				// 	console.log(res);
				// })
			},
			handleChange(current) {
				this.tabIndex = current
				this.activeIndex = current
				// console.log('当前swiper的值：', current)
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		// border: 1px solid #CC0000;
		// 控制整体内容在可视区显示
		overflow: hidden;
	}
	
</style>
