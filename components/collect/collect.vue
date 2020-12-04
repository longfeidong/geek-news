<template>
	<view class="icon-collect" @click.stop="handleCollect">
		<uni-icons class="collect" :type="collect ? 'heart-filled' : 'heart'" size="20" color="#c00"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				collect: false
			};
		},
		// computed: {
		// 	// isCollect() {
		// 	// 	console.log(1212, this.item.is_collect)
		// 	// 	this.collect = this.item.is_collect
		// 	// 	return this.collect ? 'heart-filled' : 'heart'
		// 	// }
		// 	item() {
		// 		console.log(1212, this.item.is_collect)
		// 		this.collect = this.item.is_collect
		// 		// return this.collect ? 'heart-filled' : 'heart'
		// 	}
		// },
		watch: {
			item(newVal) {
				this.collect = this.item.is_collect
			}
		},
		created() {
			// 在挂载阶段，this.item有可能还没有赋值，在 watch 中监控下
			this.collect = this.item.is_collect
		},
		methods: {
			handleCollect() {
				this.collect = !this.collect
				this.setUpdateCollect()
				console.log('收藏')
			},
			setUpdateCollect() {
				uni.showLoading()
				this.$api.updateCollect({
					user_id: '5fb37b3fde65bb0001ec3f54',
					article_id: this.item._id
				}).then((res) => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: this.collect ? '收藏成功' : '取消收藏',
						icon: 'nore'
					})
				}).catch((err) => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
.icon-collect {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
	width: 20px;
	height: 20px;
}
</style>
