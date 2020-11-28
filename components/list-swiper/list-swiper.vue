<template>
	<view class="swiper-box">
		<swiper class="home-swiper">
			<swiper-item class="swiper-item" v-for="(item, index) in tabNum" :key="index">
				<text>{{ index }}</text>
				<list-swiper-item></list-swiper-item>
			</swiper-item>
			<!-- <swiper-item class="swiper-item">
				<list-swiper-item></list-swiper-item>
			</swiper-item>
			<swiper-item class="swiper-item">
				<list-swiper-item></list-swiper-item>
			</swiper-item> -->
		</swiper>
	</view>
</template>

<script>
	import listSwiperItem from './list-swiper-item.vue'
	
	export default {
		props: {
			tabNum: {
				type: Array,
				default() {
					return []
				}
			}
		},
		components: {
			listSwiperItem
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.swiper-box {
		flex: 1;
		box-sizing: border-box;
	}
	.home-swiper {
		height: 100%;
		.swiper-item {
			// height: 100%;
			// overflow: hidden;
			// .listScroll {
			// 	height: 100%;
			// }
		}
	}
</style>
