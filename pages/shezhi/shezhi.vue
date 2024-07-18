<template>
	<view>
		<ul>
			<li><span class="left">修改仓号</span><span class="iconfont icon-qianwang"></span></li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			// changeSite() {
			// 	uni.navigateTo({
			// 		url: '/pages/siteInput/siteInput'
			// 	})
			// }
		}
	}
</script>

<style>
	page {
		background-color: #e2e2e2;
	}
</style>

<style lang="scss" scoped>
	ul {
		display: flex;
		flex-direction: column;
		padding: 0;
		margin-top: 5px;
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 20px;
			background-color: #fff;

			.left {
				font-size: 14px;
				// font-weight: bold;
				color: #4a4a4a
			}
		}
	}
</style>