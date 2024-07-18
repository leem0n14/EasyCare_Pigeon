<template>
	<view class="login-content">
		<view class="login-title">
			登录
		</view>
		<view class="iphone">
			<input type="text" placeholder="请输入用户名" :value="username" @input="clearInput" />
			<uni-icons type="closeempty" color="#808080" size="36" v-if="showClearIcon" @click="clearIcon"></uni-icons>
		</view>
		<view class="password">
			<input placeholder="请输入密码" v-model="passwordValue" :password="showPassword" />
			<uni-icons type="eye-filled" color="#808080" size="36" @click="changePassword"></uni-icons>
		</view>
		<view class="login-btn" @click="Login()">登录</view>
		<!-- 顶部提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		reqLogin
	} from '@/api/index.js'
	import Cookie from '@/utils/cookie.js'
	export default {
		data() {
			return {
				username: '', //用户名
				passwordValue: '', //密码
				showPassword: true, //是否显示密码
				showClearIcon: false, //是否显示清除按钮
				token: ''
			}
		},
		methods: {
			// 显示隐藏密码
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			// 判断是否显示清除按钮
			clearInput: function(event) {
				this.username = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			// 清除内容/隐藏按钮
			clearIcon: function() {
				this.username = '';
				this.showClearIcon = false;
			},
			// 密码登录
			Login() {
				let that = this
				//当用户名为空时
				if (!that.username) {
					uni.showToast({
						title: '请输入用户名',
						icon: 'none'
					})
					return false
				}
				// 当未输入密码时
				if (!that.passwordValue) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return false
				}
				this.$loading()
				const params = {
					username: this.username,
					password: this.passwordValue
				}
				console.log('./././././././')
				reqLogin(params).then((resp) => {
					console.log('resp', resp)
					this.$hide()
					Cookie.set('ROLE', resp.data.role)
					Cookie.set('canghao', resp.data.canghao)
					Cookie.set('tureToken', resp.token)
					Cookie.set('siteId',resp.siteId)	
					this.$store.commit('SET_TOKEN', resp.data.role)
					this.$store.commit('SET_TRUETOKEN',resp.token)
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
					uni.reLaunch({
						url: '/pages/index/index'
					})
					// console.log(Cookie.get('ROLE'))
				}).catch((resp)=>{
					this.$refs.uToast.show({
						title: '用户名或密码错误',
						type: 'error',
						duration:'800',
						position: 'top'
					})
				})
			},
			// 下面是可以封装起来引入的部分
			// 判断是否是正确的手机号码
			isMobile(str) {
				let reg = /^1\d{10}$/;
				return reg.test(str)
			},
		}
	}
</script>

<style scoped>
	.login-content {
		width: 100%;
		padding: 140rpx 20rpx 70rpx;
		text-align: center;
		color: #333333;
	}

	.login-title {
		font-size: 52rpx;
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

	.login-btn {
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		width: 600rpx;
		height: 90rpx;
		background: #FF8B33;
		border-radius: 72rpx;
		color: #fff;
		font-size: 40rpx;
		text-align: center;
		line-height: 90rpx;
		position: fixed;
		bottom: 120rpx;
	}
</style>