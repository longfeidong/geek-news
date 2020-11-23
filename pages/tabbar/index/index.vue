<template>
	<view>
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<!-- 滚动tab -->
		<scroll-tab></scroll-tab>
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
