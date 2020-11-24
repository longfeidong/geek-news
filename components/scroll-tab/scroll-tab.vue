<template>
	<view class="scroll-tab">
		<scroll-view class="tab-scroll" scroll-x="true" >
			<view class="tab-scroll_box">
				<!-- <view class="tab-scroll_item" v-for="item in tabList" :key="item.id">
					{{ item.name }}
				</view> -->
				<view class="tab-scroll_item" v-for="item in list" :key="item._id">
					{{ item.name }}
				</view>
			</view>
		</scroll-view>
		<view class="tab-scroll_options">
			<uni-icons type="gear" size="20"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				tabList: [
					{
						id: 1001,
						name: 'Java'
					},
					{
						id: 1002,
						name: 'Python'
					},
					{
						id: 1003,
						name: 'Uniapp'
					},
					{
						id: 1004,
						name: 'JavaScript'
					},
					{
						id: 1005,
						name: 'Vue'
					},
					{
						id: 1006,
						name: 'React'
					},
					{
						id: 1007,
						name: 'PHP'
					},
					{
						id: 1008,
						name: '前端'
					},
					{
						id: 1009,
						name: '后台'
					},
					{
						id: 1010,
						name: '云开发'
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	.scroll-tab {
		display: flex;
		width: 100%;
		background-color: #fff;
		box-sizing: border-box;
		border-bottom: 1px solid #C0C0C0;
		.tab-scroll {
			// flex: 1,tab-scroll占满剩余空间，超出部分隐藏
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			.tab-scroll_box {
				display: flex;
				height: 45px;
				align-items: center;
				flex-wrap: nowrap;
				box-sizing: border-box;
				.tab-scroll_item {
					flex-shrink: 0;
					padding: 0 10px;
					font-size: 14px;
					color: #333;
				}
			}
		}
		.tab-scroll_options {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;
			position: relative;
			&::after {
				content: '';
				width: 1px;
				background-color: #C0C0C0;
				position: absolute;
				left: 6px;
				top: 12px;
				bottom: 12px;
			}
		}
	}
</style>
