<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<view class="navbar-search">
				<view class="navbar-search_icon"></view>
				<view class="navbar-search_text">uniapp、react</view>
			</view>
		</view>
		<view style="height: 45px;"></view>
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
	.navbar {
		.navbar-fixed {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 45px;
			padding: 0 15px;
			box-sizing: border-box;
			background-color: $gk-base-color;
			.navbar-search {
				display: flex;
				align-items: center;
				width: 100%;
				height: 30px;
				padding: 0 10px;
				background-color: #FFFFFF;
				border-radius: 30px;
				.navbar-search_icon {
					width: 10px;
					height: 10px;
					border: 1px solid red;
					margin-right: 10px;
				}
				.navbar-search_text {
					font-size: 14px;
					color: #666;
				}
			}
		}
	}
</style>
