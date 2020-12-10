<template>
	<view class="home">
		<navbar :isSearch="true" @input="handleChange" v-model="value"></navbar>
		<view class="search-histroy">
			<view class="label-box" v-if="is_history">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear">清空</text>
				</view>
				<view class="label-content" v-if="historyList.length > 0">
					<view class="label-content_item" v-for="item in historyList" @click="handleHistory(item)">{{item.name}}</view>
				</view>
				<view class="no-data" v-else>
					<view>没有搜索记录</view>
				</view>
			</view>
			<view class="search-result" v-else>
				<uni-load-more status="loading" iconType="snow" v-if="loading"></uni-load-more>
				<view v-if="searchList.length > 0">
					<list-scroll class="listScroll">
						<list-card :item="item" v-for="item in searchList" :key="item._id" @handleClick="setHistory"></list-card>
					</list-scroll>
				</view>
				<view class="no-data" v-if="searchList.length === 0 && !loading">没有搜索到相关数据</view>
			</view>
		</view>
		<!-- <button type="default" @click="testAdd">添加历史记录</button> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				// '后端开发', '前端开发', '运维', '设计'
				// historyList: []
				is_history: true,
				searchList: [],
				value: '',
				loading: false
				// mark: false
			}
		},
		computed: {
			...mapState(['historyList'])
		},
		onLoad() {
			// this.getSearch()
		},
		methods: {
			handleHistory(item) {
				this.value = item.name
				this.getSearch(this.value)
			},
			setHistory() {
				this.$store.dispatch('set_history', {
					name: this.value
				})
			},
			handleChange(value) {
				// this.value = value
				if (!value) {
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(value)
					return
				}
				
				if (!this.mark) {
					// clearTimeout(this.timer)
					this.mark = true
					this.timer = setTimeout(() => {
						this.mark = false
						console.log('接受的值：', value)
						this.getSearch(value)
					}, 1000)
				}
			},
			testAdd() {
				this.$store.dispatch('set_history', {
					name: '后端开发'
				})
			},
			getSearch(value) {
				this.loading = true
				if (!value) {
					// 没有搜索的话，置空搜索列表，显示搜索历史，并返回
					this.searchList = []
					this.is_history = true
					return
				}
				this.is_history = false
				this.$api.getSearch({
					value
				})
				.then((res) => {
					const { data } = res
					this.searchList = data
					console.log(res)
					this.loading = false
				}).catch(err => {
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		// border: 1px solid #c00;
		.search-histroy {
			background-color: #fff;
			margin-bottom: 20px;
			.label-box {
				// display: flex;
				// flex-direction: column;
				.label-header {
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					color: #666;
					padding: 10px 15px;
					border-bottom: 1px solid #e9e9e9;
					.label-title {
						color: $gk-base-color;
					}
					.label-clear {
						font-weight: bold;
						color: #4CD964;
					}
				}
				.label-content {
					display: flex;
					flex-wrap: wrap;
					padding: 0 15px 15px;
					.label-content_item {
						border: 1px solid #666;
						border-radius: 5px;
						color: #666;
						font-size: 14px;
						padding: 2px 8px;
						margin: 10px 10px 0 0;
					}
				}
			}
			.no-data {
				display: flex;
				height: 200px;
				justify-content: center;
				align-items: center;
				font-size: 14px;
				color: #666;
			}
		}
	}
</style>
