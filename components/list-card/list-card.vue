<template>
	<view class="list-card">
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
	}
</style>
