<template>
	<list-scroll class="listScroll">
		<list-card :item="item" v-for="item in list" :key="item._id"></list-card>
		<!-- <list-card mode="column"></list-card>
		<list-card mode="bigPic"></list-card>
		<list-card mode="base"></list-card>
		<list-card mode="column"></list-card>
		<list-card mode="bigPic"></list-card> -->
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
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.listScroll {
		height: 100%;
	}
</style>
