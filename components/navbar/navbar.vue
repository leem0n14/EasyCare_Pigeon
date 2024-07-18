<template>
	<view class="index home-bg">
		<!-- #ifdef H5 -->
		<download-nav v-if="isShowDownload"></download-nav>
		<!-- #endif -->
		<u-sticky offset-top="0" h5-nav-height="0" bg-color="transparent" :enable="enable">
			<u-navbar title="首页" title-color="white" :border-bottom="false" :is-fixed="true" custom-class="home-bg" 
				:is-back="false" background="@/static/images/bg_hometop.png">
	
			</u-navbar>
		</u-sticky>
	</view>
</template>

<script>
	export default {
		props:{
			type:String
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang='scss' scoped>
	// #ifdef H5
	::v-deep .home-bg {
		background: url(@/static/images/bg_hometop.png) no-repeat;
		background-size: 100% auto;
	}
	
	// #endif
	
	
	.home-bg {
		background: url(@/static/images/bg_hometop.png) no-repeat;
		background-size: 100% auto;
	}
	
	.index {
		background-size: 100% auto;
	}
</style>
