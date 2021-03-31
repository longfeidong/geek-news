<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header__logo">
				<image :src="comments.author.author"></image>
			</view>
			<view class="comments-header__info">
				<view v-if="!comments.is_reply" class="comments-user">{{ comments.author.author_name }}</view>
				<view v-else class="comments-user">{{ comments.author.author_name }} <text class="reply-text">回复</text> {{ comments.to }}</view>
				<view class="comments-time">{{ comments.create_time }}</view>
			</view>
		</view>
		<view class="comments-content">
			<view>{{ comments.comment_content }}</view>
			<view class="comments_info">
				<view class="comments_button" @click="commentsReply({comments: comments, is_reply: reply})">回复</view>
			</view>
			<view class="comments_reply" v-for="item in comments.replys" :key="item.comment_id">
				<comments-box :reply="true" :comments="item" @reply="commentsReply"></comments-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentBox from '@/components/comments-box/comments-box.vue'
	export default {
		name: 'comments-box',
		components: {
			commentBox
		},
		props: {
			comments: {
				type: Object,
				default: () => {
					return {}
				}
			},
			// 用于区分是主回复还是子回复
			reply: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			commentsReply(comment) {
				// 用于区分是 主回复，还是 子回复
				if (comment.is_reply) {
					// 子回复id就是当前评论的id
					comment.comments.reply_id = comment.comments.comment_id
					// 评论的id应该是组件props中comments中的comment_id
					comment.comments.comment_id = this.comments.comment_id
				}
				// console.log(comment)
				this.$emit('reply', comment)
			}
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
				.reply-text {
					margin: 0 10px;
					font-weight: bold;
					color: #000;
				}
			}
		}
	}
	.comments-content {
		margin-top: 10px;
		font-size: 14px;
		color: #000;
		.comments_info {
			margin-top: 15px;
			display: flex;
			.comments_button {
				padding: 2px 10px;
				font-size: 12px;
				border-radius: 20px;
				color: #999;
				border: 1px solid #ccc;
			}
		}
		.comments_reply {
			display: flex;
			padding: 0 10px;
			margin: 15px 0;
			border: 1px solid #eee;
		}
	}
}
</style>
