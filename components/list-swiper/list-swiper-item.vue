<template>
	<list-scroll class="listScroll" @loadmore="loadmore">
		<list-card :item="item" v-for="item in list" :key="item._id"></list-card>
		<!-- <list-card mode="column"></list-card>
		<list-card mode="bigPic"></list-card>
		<list-card mode="base"></list-card>
		<list-card mode="column"></list-card>
		<list-card mode="bigPic"></list-card> -->
		<uni-load-more iconType="snow" :status="load.loading" v-if="list.length > 4 || list.length === 0"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default() {
					return []
				}
			},
			load: {
				type: Object,
				default() {
					return {
						loading: 'loading'
					}
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			loadmore() {
				this.$emit('handleLoadMore')
			}
		}
	}
</script>

<style lang="scss">
	.listScroll {
		height: 100%;
	}
</style>
