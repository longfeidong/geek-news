<template>
	<view>
		<!-- 基础模式 -->
		<view class="list-card" v-if="item.mode === 'base'">
			<view class="list-card-pic">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>{{ item.title }}</text>
				</view>
				<view class="list-card-content-desc">
					<view class="desc-label">
						<view class="label-item">{{ item.classify }}</view>
					</view>
					<view class="desc-browse">{{ item.browse_count }}浏览</view>
				</view>
			</view>
		</view>
		<!-- 多图模式 -->
		<view class="list-card mode-column" v-if="item.mode === 'column'">
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>{{ item.title }}</text>
				</view>
				<view class="list-card-pic">
					<view class="list-card-pic-item" v-if="index < 3" v-for="(itemImg, index) in item.cover" :key="index">
						<image :src="itemImg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="list-card-content-desc">
					<view class="desc-label">
						<view class="label-item">{{ item.classify }}</view>
					</view>
					<view class="desc-browse">{{ item.browse_count }}浏览</view>
				</view>
			</view>
		</view>
		<!-- 大图模式 -->
		<view class="list-card mode-bigPic" v-if="item.mode === 'image'">
			<view class="list-card-pic">
				<image :src="item.cover[0]"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>{{ item.title }}</text>
				</view>
				<view class="list-card-content-desc">
					<view class="desc-label">
						<view class="label-item">{{ item.classify }}</view>
					</view>
					<view class="desc-browse">{{ item.browse_count }}浏览</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// mode: {
			// 	type: String,
			// 	default: 'base'
			// },
			item: {
				type: Object,
				default() {
					return {}
				}
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
