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
			<button class="detail-header__button" type="default" @click="follow(formData.author.id)">
			{{ formData.is_author_like ? '取消关注' : '关注'}}</button>
		</view>
		<view class="detail-content">
			<view class="detail-content-html">
				<!-- <uParse :content="formData.content" :noData="noData"></uParse> -->
				<!-- {{ formData.content }} -->
				详情内容
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in commentList" :key="item.id">
					<comments-box :comments="item" @reply="handleReply"></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openPopup">
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
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<view class="popup-header__item" @click="closePopup">取消</view>
					<view class="popup-header__item" @click="sendComment">发布</view>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentValue" placeholder="请输入评论内容" maxlength="200" fixed="true" />
					<view class="popup-count">{{ commentValue.length }}/200</view>
				</view>
			</view>
		</uni-popup>
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
				noData: '<p style="text-align:center;color:#666">详情正在加载……</p>',
				commentValue: '' ,// 评论框内容
				commentList: [] ,// 评论的列表内容
				replyFormData: {} // 回复相关的内容
			}
		},
		onReady() {
			// this.$refs.popup.open()
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			console.log(query)
			this.getDetail()
			// 加载评论数据
			this.getComments()
		},
		methods: {
			follow(author_id) {
				// console.log('关注')
				this.setUpdateAuthor(author_id)
			},
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			sendComment() {
				console.log('发送评论')
				// this.$refs.popup.close()
				if (!this.commentValue) {
					uni.showToast({
						'title': '请输入评论内容',
						'icon': 'none'
					})
					return
				}
				// this.setUpdateComment(this.commentValue)
				this.setUpdateComment({content: this.commentValue, ...this.replyFormData})
			},
			// 更新评论内容
			setUpdateComment(content) {
				uni.showLoading()
				// 包装评论内容对象
				const commentInfo = {
					article_id: this.formData._id,
					...content
				}
				// console.log(commentInfo)
				// return
				this.$api.updateComment(commentInfo).then((res) => {
					uni.hideLoading()
					uni.showToast({
						'title': '评论发布成功',
						'icon': 'none'
					})
					// 关闭评论框前，再次请求最新的评论数据
					this.getComments()
					this.closePopup()
					
					// 清空子回复相关的属性，comment_id，reply_id，防止最下方输入框评论时变成子回复
					this.replyFormData = {}
					// 清空评论内容
					this.commentValue = ''
				})
			},
			getDetail() {
				this.$api.getDetail({
					article_id: this.formData._id
				}).then((res) => {
					const { data } = res
					this.formData = data
					console.log(data)
				})
			},
			// 请求评论数据
			getComments() {
				this.$api.getComments({
					article_id: this.formData._id
				}).then((res) => {
					const { data } = res
					this.commentList = data
					// console.log(res)
				})
			},
			// 处理评论或回复
			handleReply(e) {
				this.replyFormData = {
					'comment_id': e.comments.comment_id,
					'is_reply': e.is_reply
				}
				if (e.comments.reply_id) {
					this.replyFormData.reply_id = e.comments.reply_id
				}
				// console.log(e)
				console.log(this.replyFormData)
				this.openPopup()
			},
			// 处理关注和取消关注
			setUpdateAuthor(author_id) {
				uni.showLoading()
				this.$api.updateAuthor({
					author_id
				}).then(res => {
					uni.hideLoading()
					// 切换关注和取消关注
					this.formData.is_author_like = !this.formData.is_author_like
					uni.showToast({
						title: this.formData.is_author_like ? '关注作者成功' : '取消关注作者',
						icon: 'none'
					})
					console.log(res)
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
			.detail-header__button {
				flex-shrink: 0;
				height: 30px;
				color: #fff;
				font-size: 12px;
				background-color: $gk-base-color;
			}
		}
		.detail-content {
			min-height: 500px;
			// border: 1px solid #c00;
			margin-top: 20px;
			.detail-content-html {
				padding: 0 15px;
			}
			.detail-comment {
				margin-top: 30px;
				.comment-title {
					padding: 10px 15px;
					font-size: 14px;
					color: #666;
					border-bottom: 1px solid #F5F5F5;
				}
				.comment-content {
					padding: 0 15px;
					border-top: 1px solid #eee;
				}
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
		.popup-wrap {
			background-color: #fff;
			.popup-header {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #F5F5F5;
				font-size: 14px;
				color: #666;
				.popup-header__item {
					height: 50px;
					line-height: 50px;
					padding: 0 15px;
				}
			}
			.popup-content {
				width: 100%;
				padding: 15px;
				box-sizing: border-box;
				.popup-textarea {
					width: 100%;
					height: 200px;
				}
				.popup-count {
					text-align: right;
					color: #666;
					font-size: 12px;
				}
			}
		}
	}
</style>
