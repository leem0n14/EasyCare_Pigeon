<template>
	<view class="region">
		<view class="title box-showdow w">
			<i>异常状态</i>
		</view>
		<view class="other_statu w">
			<u-button ripple="true" @click="sendDeath"  shape="square" size="medium" plain="true"
				class="u-button btn-showdow">死亡</u-button>
			<u-button ripple="true" v-for="(item,index) in buttons" :key="index" @click="sendAbnormal(item)"
				 shape="square" size="medium" class="u-button btn-showdow" plain="true">{{item.value}}</u-button>
		</view>
		<!-- 确认框 -->
		<u-modal v-model="show" :mask-close-able="true" @confirm="confirm" @cancel="cancel" ref="uModal"
			:show-cancel-button="true" :zoom="true" :content="content"></u-modal>
		<!-- 提示框 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		reqAbnormal
	} from '@/api/index.js'
	import {
		getNowDate
	} from '@/getTime.js'

	export default {

		data() {
			return {
				formData: {
					siteId: 1,
					houseId: '',
					cageId: '',
					refer: '',
					abnorTime: ''
				},
				buttons: [{
					value: '弃孵',
					type: 'warning'
				}, {
					value: '破损',
					type: 'error'
				}, {
					value: '无精',
					type: 'warning'
				}],
				handle: '',
				abnormal: '',
				show:false,
				content:'确认操作吗?',
				// 识别读取的是哪个按钮
				index:''
			}
		},
		mounted() {
			this.formData.houseId = this.$store.state.NFC.nfcId
			this.formData.cageId = uni.getStorageSync('cageId')
			this.formData.abnorTime = getNowDate()
		},
		methods: {
			sendReq(i) {
				this.formData.refer = i.value
				this.$loading()
				reqAbnormal(this.formData).then(data => {
					console.log('expection', data)
					// 该鸽笼已经有该异常状态时
					if (data.msg === '已存在') {
						this.$refs.uToast.show({
							title: `该鸽笼已是${i.value}状态`,
							type: 'warning',
							duration: '1500',
							position: 'top',
						})
						// 没有该异常状态时
					} else {
						if (data.code == 200) {
							this.$refs.uToast.show({
								title: data.msg,
								type: 'success',
								duration: '1500',
								position: 'top',
								callback: () => {
									uni.navigateBack()
								}
							})
						} else {
							this.$refs.uToast.show({
								title: data.msg,
								type: 'error',
								duration: '1500',
								position: 'top',
							})
						}
					}
					this.$hide()
				}).catch(() => {
					this.$hide()
					this.$refs.uToast.show({
						title: '加载失败，请重试',
						type: 'error',
						duration: '1500',
						position: 'top',
					})
				}).finally(() => {
					this.$hide()
				})
			},
			sendAbnormal(i) {
				this.show = true
				this.index = i
			},
			sendDeath() {
				uni.navigateTo({
					url: '/pages/death/death'
				})
			},
			// 点击确认框时
			confirm(){
				this.show = false
				// 发送异常
				this.sendReq(this.index)
			},
			// 点击取消框时
			cancel(){
				this.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.region{
		margin-top: 108.7rpx
	}
	.title {
		padding:18.12rpx 18.12rpx;
		font-size: 36rpx;
		font-weight: 700;
		margin-top: 20rpx;
		background: linear-gradient(45deg, #f8cc3b, #fedd80);
	}

	// 异常按钮区
	.other_statu {
		display: flex;
		justify-content: space-between;
		align-content: space-between;
		flex-wrap: wrap;
		width: 90%;
		height: 260rpx;
		margin-top: 30rpx;

		.u-button {
			width: 244.57rpx;
			height: 79.71rpx;
			font-weight: 700;
			border:0.5px solid #2979ff
		}
	}
	@media (min-width: 768px){
		.region{
			margin-top: 20rpx
		}
	}
</style>