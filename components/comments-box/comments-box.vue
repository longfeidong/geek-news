<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header__logo">
				<image src="../../static/logo.png"></image>
			</view>
			<view class="comments-header__info">
				<view class="comments-user">longfei</view>
				<view class="comments-time">2021-01-03 10:18:22</view>
			</view>
		</view>
		<view class="comments-content">
			<view>uni-app跨端解决方案很不错</view>
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
.comments-box {
	margin: 15px 0;
	.comments-header {
		display: flex;
		.comments-header__logo {
			flex-shrink: 1;
			width: 30px;
			height: 30px;
			border-radius: 5px;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.comments-header__info {
			display: flex;
			flex-direction: column;
			padding-left: 15px;
			font-size: 12px;
			color: #999;
			line-height: 1;
			.comments-user {
				color: #333;
				font-size: 14px;
				margin-bottom: 10px;
			}
		}
	}
	.comments-content {
		margin-top: 10px;
		font-size: 14px;
		color: #000;
	}
}
</style>
