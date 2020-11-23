<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view class="status-bar" :style="{height: statusBarHeight + 'px'}"></view>
			<!-- 搜索框 -->
			<view class="navbar-content" :style="{height: navBarHeight + 'px', width: navBarWidth + 'px'}">
				<view class="navbar-search">
					<view class="navbar-search_icon">
						<!-- iconfont -->
						<!-- <text class="iconfont icon-search"></text> -->
						<!-- 使用Icons插件 -->
						<uni-icons type="search" size="14" color="#666"></uni-icons>
					</view>
					<view class="navbar-search_text">uniapp、react</view>
				</view>
			</view>
		</view>
		<view :style="{height: placeHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 45,
				navBarWidth: 375,
				placeHeight: '' // 展位高度
			};
		},
		created() {
			// 获取手机系统信息
			const mInfo = uni.getSystemInfoSync()
			this.statusBarHeight = mInfo.statusBarHeight
			console.log(mInfo.statusBarHeight)
			// H5 APP Ali-pay navBar宽度
			this.navBarWidth = mInfo.windowWidth
			
			// H5 APP Ali-pay不支持这个API
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取微信小程序胶囊的位置信息
			const miniMenuButtonInfo = uni.getMenuButtonBoundingClientRect()
			console.log(miniMenuButtonInfo)
			const navHeight = (miniMenuButtonInfo.bottom - mInfo.statusBarHeight) + (miniMenuButtonInfo.top - mInfo.statusBarHeight)
			const navWidth = miniMenuButtonInfo.left
			this.navBarHeight = navHeight
			this.navBarWidth = navWidth
			console.log(navHeight, navWidth)
			this.placeHeight = this.statusBarHeight + this.navBarHeight;
			// #endif
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';
	.navbar {
		.navbar-fixed {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			width: 100%;
			background-color: $gk-base-color;
			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 45px;
				padding: 0 15px;
				box-sizing: border-box;
			}
			.navbar-search {
				display: flex;
				align-items: center;
				width: 100%;
				height: 30px;
				padding: 0 10px;
				background-color: #FFFFFF;
				border-radius: 30px;
				.navbar-search_icon {
					// width: 10px;
					// height: 10px;
					// border: 1px solid red;
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
