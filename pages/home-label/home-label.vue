<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit">编辑</view>
			</view>
			<view class="label-content">
				<view class="label-content_item" v-for="item in 10">内容{{ item }}<uni-icons class="removeLabel" type="clear" size="20" color="#c00"></uni-icons></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;
			padding: 0 15px;
			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 0;
				color: #666;
				font-size: 14px;
				border-bottom: 1px solid #f5f5f5;
				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}
			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 0 0 15px;
				.label-content_item {
					padding: 2px 5px;
					margin: 10px 15px 0 0;
					border: 1px solid #666;
					border-radius: 5px;
					font-size: 14px;
					color: #666;
					position: relative;
					.removeLabel {
						background-color: #fff;
						border-radius: 50%;
						position: absolute;
						right: -8px;
						top: -8px;
					}
				}
			}
		}
	}
</style>
