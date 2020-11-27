<template>
	<view>
		<!-- 基础模式 -->
		<view class="list-card" v-if="mode === 'base'">
			<view class="list-card-pic">
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>今天，国务院办公厅发布关于2021年部分节假日安排的通知。经国务院批准，2021年元旦、春节、清明节、劳动节、端午节、中秋节和国庆节放假调休日期的具体安排如下：</text>
				</view>
				<view class="list-card-content-desc">
					<view class="desc-label">
						<view class="label-item">前端</view>
					</view>
					<view class="desc-browse">152</view>
				</view>
			</view>
		</view>
		<!-- 多图模式 -->
		<view class="list-card mode-column" v-if="mode === 'column'">
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>今天，国务院办公厅发布关于2021年部分节假日安排的通知。经国务院批准，2021年元旦、春节、清明节、劳动节、端午节、中秋节和国庆节放假调休日期的具体安排如下：</text>
				</view>
				<view class="list-card-pic">
					<view class="list-card-pic-item" v-for="item in 3" :key="item">
						<image src="https://img1.sycdn.imooc.com/5db855c800013c6102680255.jpg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="list-card-content-desc">
					<view class="desc-label">
						<view class="label-item">前端</view>
					</view>
					<view class="desc-browse">152</view>
				</view>
			</view>
		</view>
		<!-- 大图模式 -->
		<view class="list-card mode-bigPic" v-if="mode === 'bigPic'">
			<view class="list-card-pic">
				<image src="https://img1.sycdn.imooc.com/5ccfac620001f8d405000344.jpg" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>今天，国务院办公厅发布关于2021年部分节假日安排的通知。经国务院批准，2021年元旦、春节、清明节、劳动节、端午节、中秋节和国庆节放假调休日期的具体安排如下：</text>
				</view>
				<view class="list-card-content-desc">
					<view class="desc-label">
						<view class="label-item">前端</view>
					</view>
					<view class="desc-browse">152</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			mode: {
				type: String,
				default: 'base'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	// 基础模式
	.list-card {
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: .1);
		box-sizing: border-box;
		.list-card-pic {
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;
			/* 
			项目的缩小比例，默认为0，空间不足就会缩小，
			设置为0，空间不足，也不会缩小
			*/
			flex-shrink: 0;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.list-card-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 100%;
			padding-left: 10px;
			.list-card-content-title {
				font-size: 14px;
				color: #333;
				font-weight: 400;
				line-height: 1.2;
				text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical
				}
			}
			.list-card-content-desc {
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				color: #666;
				.desc-label {
					display: flex;
					align-items: center;
					.label-item {
						padding: 0 5px;
						border-radius: 15px;
						border:  1px solid $gk-base-color;
						color: $gk-base-color;
						margin-right: 5px;
					}
					.desc-browse {
						color: #999;
						line-height: 1.5;
					}
				}
			}
		}
		// 多图模式
		&.mode-column {
			.list-card-content {
				padding-left: 0;
				width: 100%;
				.list-card-pic {
					display: flex;
					width: 100%;
					height: 70px;
					margin-top: 10px;
					.list-card-pic-item {
						// width: 100%;
						flex-grow: 1;
						border-radius: 5px;
						overflow: hidden;
						margin-left: 10px;
						&:first-child {
							margin-left: 0;
						}
					}
				}
				.list-card-content-desc {
					margin-top: 10px;
				}
			}
		}
		&.mode-bigPic {
			flex-direction: column;
			.list-card-pic {
				display: flex;
				width: 100%;
				height: 100px;
			}
			.list-card-content {
				padding-left: 0;
				.list-card-content-title {
					margin: 10px 0;
				}
			}
		}
	}
</style>
