<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{is_edit ? '完成' : '编辑'}}</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view class="label-content_item" v-for="(item, index) in myLabels" :key="item._id">{{ item.name }}<uni-icons v-if="is_edit" class="removeLabel" type="clear" size="20" color="#c00" @click="delLabel(index)"></uni-icons></view>
			</view>
			<view class="no-data" v-if="myLabels.length === 0 && !loading">
				没有标签数据
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view class="label-content_item" v-for="(item, index) in labelList" :key="item._id" @click="addLabel(index)">{{ item.name }}</view>
			</view>
			<view class="no-data" v-if="labelList.length === 0 && !loading">
				没有标签数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				myLabels: [],
				labelList: [],
				loading: true
			};
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			delLabel(index) {
				// console.log(this.myLabels.splice(index, 1))
				this.labelList.push(this.myLabels[index])
				this.myLabels.splice(index, 1)
			},
			addLabel(index) {
				if (!this.is_edit) return
				this.myLabels.push(this.labelList[index])
				this.labelList.splice(index, 1)
			},
			editLabel() {
				// this.is_edit = !this.is_edit
				if (this.is_edit) {
					this.is_edit = false
					this.setUpdateLabel(this.myLabels)
				} else {
					this.is_edit = true
				}
			},
			setUpdateLabel(label) {
				let newArrIds = []
				label.forEach(item => {
					newArrIds.push(item._id)
				})
				console.log(newArrIds)
				uni.showLoading({
					title: '正在更新'
				})
				this.$api.updateLabel({
					label: newArrIds
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: '更新完成',
						icon: 'none'
					})
					uni.$emit('labelChange')
				})
			},
			getLabel() {
				this.loading = true
				this.$api.getLabel({
					type: 'all'
				}).then((res) => {
					this.loading = false
					const {data} = res
					console.log(data)
					this.myLabels = data.filter(item => item.current)
					this.labelList = data.filter(item => !item.current)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;
			padding: 0 15px;
			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 0;
				color: #666;
				font-size: 14px;
				border-bottom: 1px solid #f5f5f5;
				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}
			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 0 0 15px;
				.label-content_item {
					padding: 2px 5px;
					margin: 10px 15px 0 0;
					border: 1px solid #666;
					border-radius: 5px;
					font-size: 14px;
					color: #666;
					position: relative;
					.removeLabel {
						background-color: #fff;
						border-radius: 50%;
						position: absolute;
						right: -8px;
						top: -8px;
					}
				}
			}
		}
		.no-data {
			width: 100%;
			padding: 50px 0;
			font-size: 14px;
			color: #666;
			text-align: center;
		}
	}
</style>
