<template>
	<view>
	    <view class="login-content">
			<view class="houseId row-center">
				{{show_nfcId ? '鸽舍号：'+ show_nfcId : '鸽舍号'}}
			</view>
	    	<!-- <view class="add-title">
	    		更改鸽舍卡片
	    	</view> -->
			<view class="" style="display: flex;flex-direction: column;width: 70%;margin: auto;">
				
				<view class="" style="">
					<input type="text" maxlength="10" placeholder="请靠近nfc卡读取id" v-model="newWarehouseNumber" @input="clearInput" />
					<uni-icons type="closeempty" color="#808080" size="36" v-if="showClearIcon" @click="clearIcon"></uni-icons>
				</view>
				
				<view class="" style="display:flex;justify-content: space-between;">
					<view class="" style="border: 1rpx solid black;">
						<picker :value="array[this.chooseSiteId - 1]" :range="this.array" @change="pickerChange">
							<view>{{array[this.chooseSiteId - 1]}}</view>
						</picker>
					</view>
					
					<span>
						仓-
					</span>
					<input type="number" maxlength="2" placeholder="排号" v-model="newWarehouseNumber" @input="clearInput" />
					<input type="number" maxlength="2" placeholder="舍号" v-model="newWarehouseNumber" @input="clearInput" />
				</view>
				
				
			</view>
			
							
	    	<!-- <view class="add-btn" @click="add()">更改</view> -->
			<button class="add-btn">更改</button>
	    	<!-- 顶部提示 -->
	    	<u-toast ref="uToast" />
	    </view>
		
	   
	</view>	
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
import colorGradient from '../../components/uview-ui/libs/function/colorGradient'
	
	export default {
		data() {
			return {
				siteId:'',
				newWarehouseNumber: '',
				adminPassword: '',
				successMessage: '',
				showClearIcon: false, //是否显示清除按钮
				array:['1','2','3'],
				chooseSiteId:'1',
			}
		},
		computed: {
			...mapGetters(['show_nfcId', 'nfcId',])
		},
		mounted() {
			// console.log(this.siteId)
			this.currentSiteId()
		},
		watch:{
			 
		},
		methods: {
			//
			pickerChange(event) {
				
				this.chooseSiteId = event.detail.value + 1;
				console.log(this.chooseSiteId);
			},
			
			currentSiteId(){
				this.siteId = uni.getStorageSync('siteId');
			},
			
			// 判断是否显示清除按钮
			clearInput: function(event) {
				this.newWarehouseNumber = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			// 清除内容/隐藏按钮
			clearIcon: function() {
				this.newWarehouseNumber = '';
				this.showClearIcon = false;
			},
			add(){
				let that = this
				//当仓号为空时
				if (!that.newWarehouseNumber) {
					uni.showToast({
						title: '请输入要添加的仓号',
						icon: 'none',
					})
					return false
				}
				// // 当未输入密码时
				// if (!that.adminPassword) {
				// 	uni.showToast({
				// 		title: '请输入密码',
				// 		icon: 'none'
				// 	})
				// 	return false
				// }
				this.$loading()
				const params = {
					newWarehouseNumber: that.newWarehouseNumber,
					// adminPassword: that.adminPassword
				}
				reqLogin(params).then((resp) => {
					console.log('resp', resp)
					this.$hide()
					Cookie.set('ROLE', resp.data.role)
					Cookie.set('user_id', resp.data.id)
					Cookie.set('siteId',resp.siteId)
					this.$store.commit('SET_TOKEN', resp.data.role)
					this.$store.commit('SET_TRUETOKEN',resp.token)
					uni.showToast({
						title: '登录成功',
						icon: 'none'
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
		}
	}
</script>

<style lang="scss" scoped>
	// .login-content uni-input[data-v-2117ab26]{
	// 	height: 10rpx !important;
	// }
	
	.uni-picker-item{
		width: 20rpx !important;
	}
	
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
