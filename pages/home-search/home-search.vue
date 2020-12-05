<template>
	<view class="home">
		<navbar :isSearch="true"></navbar>
		<view class="search-histroy">
			<view class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear">清空</text>
				</view>
				<view class="label-content">
					<view class="label-content_item" v-for="item in 10">内容 {{item}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
		}
	}
</style>
