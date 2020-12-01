<template>
	<view class="swiper-box">
		<swiper class="home-swiper" :current="activeIndex" @change="handleChange">
			<swiper-item class="swiper-item" v-for="(item, index) in tabNum" :key="index">
				<!-- <text>{{ index }}</text> -->
				<!-- <list-swiper-item :list="list"></list-swiper-item> -->
				<list-swiper-item :list="listCacheData[index]"></list-swiper-item>
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
				list: [],
				// listCacheData: []
				listCacheData: {},
				// listCacheData {
				// 	0: {},
				// 	1: {}
				// }
			};
		},
		watch: {
			tabNum(newVal) {
				if (newVal.length === 0) return
				this.getListInfo(this.activeIndex)
			}
		},
		created() {
			// this.getListInfo(0)
		},
		methods: {
			handleChange(e) {
				// console.log(e);
				const { current } = e.detail
				// console.log(this.tabNum[current].name)
				// const name = this.tabNum[current].name
				// this.getListInfo(name)
				
				this.getListInfo(current)
				this.$emit('changeSwiper', current)
			},
			getListInfo(current) {
				this.$api.getList({
					name: this.tabNum[current].name
				})
				.then((res) => {
					const { data } = res
					// this.list = data
					console.log(this.listCacheData)
					// this.listCacheData[current] = data
					// this.listCacheData.push(data)
					this.$set(this.listCacheData, current, data)
					console.log('请求数据：', data)
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
