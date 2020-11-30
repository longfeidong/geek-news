<template>
	<view class="swiper-box">
		<swiper class="home-swiper" :current="activeIndex" @change="handleChange">
			<swiper-item class="swiper-item" v-for="(item, index) in tabNum" :key="index">
				<!-- <text>{{ index }}</text> -->
				<list-swiper-item :list="list"></list-swiper-item>
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
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		components: {
			listSwiperItem
		},
		data() {
			return {
				list: []
			};
		},
		created() {
			this.getListInfo()
		},
		methods: {
			handleChange(e) {
				// console.log(e);
				const { current } = e.detail
				this.$emit('changeSwiper', current)
			},
			getListInfo() {
				this.$api.getList().then((res) => {
					const { data } = res
					this.list = data
					console.log(res)
				})
			}
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
