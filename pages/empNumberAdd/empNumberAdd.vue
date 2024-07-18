<template>
	<view>
	    <view class="login-content">
			<view class="houseId row-center">
				{{siteId ? '当前仓号：'+ siteId : '当前仓号'}}
			</view>
	    	<view class="add-title">
	    		分配员工账号
	    	</view>
			<view class="iphone">
				<input type="text" maxlength="1" placeholder="请输入分配的仓号" v-model="assignSite" />
			</view>
	    	<view class="iphone">
	    		<input type="text" placeholder="请输入需要分配的员工账号" v-model="assignUsername" @input="clearInput" />
	    		<uni-icons type="closeempty" color="#808080" size="36" v-if="showClearIcon" @click="clearIcon"></uni-icons>
	    	</view>
			<view class="password">
				<input placeholder="请输入分配的员工密码" v-model="assignPasswore" :password="showPassword" />
				<uni-icons type="eye-filled" color="#808080" size="36" @click="changePassword"></uni-icons>
			</view>
			
	    	<view class="add-btn" @click="assign()">分配</view>
	    	<!-- 顶部提示 -->
	    	<u-toast ref="uToast" />
	    </view>
	</view>	
	   
</template>

<script>
	export default {
		data() {
			return {
				siteId:'',
				assignSite:'',
				assignUsername:'',
				assignPasswore:'',
				showPassword: true, //是否显示密码
				showClearIcon: false, //是否显示清除按钮
			}
		},
		mounted() {
			this.currentSiteId()
		},
		methods: {
			//获取当前的仓号
			currentSiteId(){
				this.siteId = uni.getStorageSync('siteId');
			},
			// 显示隐藏密码
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			// 判断是否显示清除按钮
			clearInput: function(event) {
				this.assignUsername = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			// 清除内容/隐藏按钮
			clearIcon: function() {
				this.assignUsername = '';
				this.showClearIcon = false;
			},
			//分配账号
			assign(){
				let that = this
				//当仓号为空时
				if (!that.assignSite) {
					uni.showToast({
						title: '请输入分配的仓号',
						icon: 'none',
					})
					return false
				}
				// 当未输入账号时
				else if (!that.assignUsername) {
					uni.showToast({
						title: '请输入账号',
						icon: 'none'
					})
					return false
				}
				// 当未输入密码时
				else if (!that.assignPasswore) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return false
				}
				this.$loading()
				const params = {
					newWarehouseNumber: that.newWarehouseNumber,
					// adminPassword: that.adminPassword
				}
				// reqLogin(params).then((resp) => {
				// 	console.log('resp', resp)
				// 	this.$hide()
				// 	Cookie.set('ROLE', resp.data.role)
				// 	Cookie.set('user_id', resp.data.id)
				// 	Cookie.set('siteId',resp.siteId)
				// 	this.$store.commit('SET_TOKEN', resp.data.role)
				// 	uni.showToast({
				// 		title: '登录成功',
				// 		icon: 'none'
				// 	})
				// 	// console.log(Cookie.get('ROLE'))
				// }).catch((resp)=>{
				// 	this.$refs.uToast.show({
				// 		title: '用户名或密码错误',
				// 		type: 'error',
				// 		duration:'800',
				// 		position: 'top'
				// 	})
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.houseId {
		width: 100%;
		margin: 10rpx auto;
		padding: 18.12rpx 18.12rpx;
		font-size: 39.86rpx;
		// 删了下面这个
		// border-radius: 14.49rpx;
		color: #fff;
		background-color: #7d9ad2;
	}
	
	.login-content {
			width: 100%;
			height: 80vh;
			text-align: center;
			color: #333333;
		}

		.add-title {
			padding-top: 15rpx;
			font-size: 40rpx;
			font-weight: bold;
			margin-bottom: 62rpx;
		}

		.login-content input {
			height: 100rpx;
			background: #F8F8F8;
			border-radius: 50rpx;
			text-align: left;
			padding: 30rpx;
			box-sizing: border-box;
			font-size: 30rpx;
		}

		.iphone,
		
		.password,
		
		.test {
			position: relative;
			margin-bottom: 60rpx;
		}

		.iphone .uni-icons,
		.password .uni-icons {
			position: absolute;
			top: 36rpx;
			right: 60rpx;
		}

		.test-btn,
		.password-btn {
			color: #ff8b33;
			font-size: 30rpx;
			text-align: right;
		}

		.get-test {
			color: #ff8b33;
			font-size: 30rpx;
			width: 244rpx;
			height: 100rpx;
			border: 1px solid #FF8B33;
			border-radius: 50rpx;
			line-height: 100rpx;
		}

		.test {
			display: flex;
			justify-content: space-between;
		}

		.add-btn {
			margin-top: 7vh;
			position: relative;
			left: 50%;
			transform: translate(-50%);
			width: 50vw;
			height: 90rpx;
			background: #FF8B33;
			border-radius: 72rpx;
			color: #fff;
			font-size: 40rpx;
			text-align: center;
			line-height: 90rpx;
		}
</style>

