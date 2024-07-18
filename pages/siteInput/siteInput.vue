<template>
	<view class="page">
		<view class="container">
			<view class="login-wrapper">
				<view class="header">仓号</view>
				<view class="showSite" v-if="SiteId">当前仓号为: {{SiteId}}</view>
				<view class="form-wrapper">
					<input type="number" placeholder="请输入仓号" class="input-item" v-model="siteId">
					<!-- <input type="password" name="password" placeholder="password" class="input-item"> -->
					<view class="btn" @click="save">保存</view>
				</view>
			</view>
		</view>
		<!-- 顶部提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				siteId: '',
				SiteId: uni.getStorageSync('siteId')
			};
		},
		mounted(){
			if(uni.getStorageSync('siteId'))
			console.log('本地存有siteId,值为',uni.getStorageSync('siteId'))
		},
		methods: {
			save() {
				uni.setStorageSync('siteId', this.siteId)
				if(uni.getStorageSync('siteId') === this.siteId){
					uni.showToast({
						title:'保存成功',
						icon:'success',
						duration: 1000,
						success:()=>{
							this.siteId = ''
							uni.reLaunch({
								url:'/pages/index/index'
							})
						}
					})
				}
				else {
					this.$refs.uToast.show({
						title:'保存失败',
						type:'error',
						duration: '800',
						position: 'top'
					})
				}
				console.log(uni.getStorageSync('siteId'))
			}
		}
	}
</script>

<style lang="scss">
	// #ifdef H5
	::v-deep .home-bg {
		background: url(@/static/images/bg-home.png) no-repeat;
		background-size: 100% auto;
	}

	// #endif

	.page{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
	}
	.home-bg {
		background: url(@/static/images/bg-home.png) no-repeat;
		background-size: 100% auto;
	}

	.index {
		background-size: 100% auto;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-wrapper {
		background-color: #fff;
		width: 40vh;
		height: 80vh;
		border-radius: 15px;
		padding: 0 96.15rpx;
	}

	.header {
		font-size: 73.08rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 140rpx
		// line-height: 384.62rpx;
	}
	.showSite{
		text-align: center;
		margin-top: 10px;
		margin-bottom: 150rpx;
	}
	.input-item {
		display: block;
		width: 100%;
		border: 0;
		padding: 19.23rpx;
		border-bottom: 1px solid rgb(128, 125, 125);
		font-size: 38.46rpx;
		outline: none;
	}

	.input-item:placeholder {
		text-transform: uppercase;
	}

	.btn {
		text-align: center;
		padding: 28.85rpx;
		width: 100%;
		margin-top: 34vh;
		background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
		color: #fff;
		font-weight: bold;
		font-size: 34.62rpx;
		border-radius: 5px;
	}

	.msg {
		text-align: center;
		line-height: 169.23rpx;
	}

	a {
		text-decoration-line: none;
		color: #abc1ee;
	}
</style>
