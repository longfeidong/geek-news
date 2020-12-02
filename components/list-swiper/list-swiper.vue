<template>
	<view class="swiper-box">
		<swiper class="home-swiper" :current="activeIndex" @change="handleChange">
			<swiper-item class="swiper-item" v-for="(item, index) in tabNum" :key="index">
				<!-- <text>{{ index }}</text> -->
				<!-- <list-swiper-item :list="list"></list-swiper-item> -->
				<list-swiper-item :list="listCacheData[index]" :load="load[index]" @handleLoadMore="loadmore"></list-swiper-item>
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
				// page: 1, // 当前页数
				load: {},
				pageSize: 5
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
			loadmore() {
				console.log('上拉刷新')
				// this.page++
				if (this.load[this.activeIndex].loading === 'noMore') return
				this.load[this.activeIndex].page++
				this.getListInfo(this.activeIndex)
			},
			handleChange(e) {
				// console.log(e);
				const { current } = e.detail
				// console.log(this.tabNum[current].name)
				// const name = this.tabNum[current].name
				// this.getListInfo(name)
				
				// 当数据不存在 或 长度为0时 才请求
				if (!this.listCacheData[current] || this.listCacheData.length === 0) {
					this.getListInfo(current)
				}
				this.$emit('changeSwiper', current)
			},
			getListInfo(current) {
				if (!this.load[current]) {
					this.load[current] = {
						page: 1, // 当前第1页显示
						loading: 'loading'
					}
				}
				
				this.$api.getList({
					name: this.tabNum[current].name,
					// page: this.page,
					page: this.load[current].page,
					pageSize: this.pageSize
				})
				.then((res) => {
					const { data } = res
					// this.list = data
					console.log('请求', data)
					if (data.length === 0) {
						// data.length为0，说明已经没有数据了
						let oldLoad = {
							loading: 'noMore',
							page: this.load[current].page
						}
						this.$set(this.load, current, oldLoad)
						// 强制刷新页面
						this.$forceUpdate()
						return
					}
					
					console.log(this.listCacheData)
					// this.listCacheData[current] = data
					// this.listCacheData.push(data)
					let oldList = this.listCacheData[current] || []
					oldList.push(...data)
					this.$set(this.listCacheData, current, oldList)
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
