<template>
	<view class="detail">
		<view class="detail-title">
			{{ formData.title }}
		</view>
		<view class="detail-header">
			<view class="detail-header__logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header__content">
				<view class="detail-header__content-title">{{ formData.author.author_name }}</view>
				<view class="detail-header__content-info">
					<text>{{ formData.create_time }}</text>
					<text>{{ formData.browse_count }}浏览</text>
					<text>{{ formData.thumbs_up_count }}赞</text>
				</view>
			</view>
		</view>
		<view class="detail-content">
			<view class="detail-content-html">
				<uParse :content="formData.content" :nodata="nodata"></uParse>
				<!-- {{ formData.content }} -->
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom__input">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#c00"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box">
					<uni-icons type="chat" size="22" color="#c00"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons type="heart" size="22" color="#c00"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons type="hand-thumbsup" size="22" color="#c00"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	
	export default {
		components: {
			uParse
		},
		data() {
			return {
				formData: {},
				nodata: '<p style="text-align:center;color:#666">详情正在加载……</p>'
			}
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			console.log(query)
			this.getDetail()
		},
		methods: {
			getDetail() {
				this.$api.getDetail({
					article_id: this.formData._id
				}).then((res) => {
					const { data } = res
					this.formData = data
					console.log(data)
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
		.detail-title {
			padding: 0 15px;
			font-size: 18px;
			font-weight: bold;
			color: #333;
		}
		.detail-header {
			display: flex;
			align-items: center;
			padding: 0 15px;
			margin-top: 10px;
			.detail-header__logo {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;
				flex-shrink: 0;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.detail-header__content {
				width: 100%;
				padding-left: 10px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 12px;
				color: #666;
				.detail-header__content-title {
					font-size: 14px;
					color: #333;
				}
				.detail-header__content-info {
					color: #999;
					text {
						margin-right: 10px;
					}
				}
			}
		}
		.detail-content {
			min-height: 500px;
			// border: 1px solid #c00;
			margin-top: 20px;
			.detail-content-html {
				padding: 0 15px;
			}
		}
		.detail-bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			width: 100%;
			height: 44px;
			background-color: #fff;
			border-top: 1px solid #C0C0C0;
			box-sizing: border-box;
			.detail-bottom__input {
				display: flex;
				width: 100%;
				height: 30px;
				padding: 0 10px;
				justify-content: space-between;
				align-items: center;
				border: 1px solid #ddd;
				border-radius: 5px;
				margin-left: 10px;
				text {
					font-size: 14px;
					color: #999;
				}
			}
			.detail-bottom__icons {
				display: flex;
				flex-shrink: 0;
				padding: 0 10px;
				.detail-bottom__icons-box {
					display: flex;
					width: 44px;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>
