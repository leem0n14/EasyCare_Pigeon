<template>
	<view>
		<view v-if = "exp !== '死种' && exp !== '死仔'">
		<view class="ul">
			<view v-for="index in list" :key="index" class="li" @click="sendAbnormal(index,statu)"
				:style="{backgroundColor: bgColor}">{{index}}
			</view>
		</view>
		</view>
		<view v-else-if = "exp === '死种' || exp === '死仔'">
			<cageNumber2 />
		</view>
		<!-- 提示框 -->
		<u-toast ref="uToast" />
	</view>

</template>

<script>
	import {
		reqAbnormal,
		reqRecordOut
	} from '@/api/index.js'
	import {
		getNowDate
	} from '@/getTime.js'
	import {
		mapGetters
	} from 'vuex'
	import cageNumber2 from '@/pages/cagenumber/cagenumber2'
	export default {
		components:{
			cageNumber2
		},
		props: {
			bgColor: {
				type: String,
				required: true
			},
			exp: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				list: [1, 4, 2, 5, 3, 6],
				formData: {
					siteId: uni.getStorageSync('siteId'),
					houseId: '',
					cageId: '',
					refer: ''
				},
				handle: '',
				abnormal: '',
				show: false,
				content: '确认操作吗?',
				// 识别读取的是哪个按钮
				index: ''
			}
		},
		onLoad() {},
		computed: {
			...mapGetters(['nfcId'])
		},
		methods: {
			sendReq(exp) {
				this.formData.houseId = this.$store.state.NFC.nfcId
				this.formData.refer = exp
				this.$loading()
				if (exp === '淘汰') {
					this.outTime = getNowDate();
					reqRecordOut(this.formData).then(resp => {
						if (resp.msg === '已存在') {
							this.$refs.uToast.show({
								title: `该鸽笼已是${exp}状态`,
								type: 'warning',
								duration: '800',
								position: 'top'
							})
						} else {
							const obj1 = {
								siteId: uni.getStorageSync('siteId'),
								houseId: this.nfcId
							}
							this.$store.dispatch('getStatu', obj1);
							const obj2 = {
								siteId: uni.getStorageSync('siteId'),
								houseId: this.nfcId,
								twoOrSix: 3
							}
							this.$store.dispatch('getDate', obj2);
							this.$refs.uToast.show({
								title: `已记录${exp}异常`,
								type: 'success',
								duration: '800',
								position: 'top',
							})
						}
					}).finally(()=>{
						this.$hide()
					})
				} else {
					this.formData.abnorTime = getNowDate()
					reqAbnormal(this.formData).then(data => {
						console.log('expection', data)
						// 该鸽笼已经有该异常状态时
						if (data.msg === '已存在') {
							this.$refs.uToast.show({
								title: `该鸽笼已是${exp}状态`,
								type: 'warning',
								duration: '800',
								position: 'top',
							})
							// 没有该异常状态时
						} else {
							if (data.code === 200) {
								const obj1 = {
									siteId: uni.getStorageSync('siteId'),
									houseId: this.nfcId
								}
								this.$store.dispatch('getStatu', obj1);
								const obj2= {
									siteId: uni.getStorageSync('siteId'),
									houseId: this.nfcId,
									twoOrSix: 3
								}
								this.$store.dispatch('getDate', obj2);
								this.$refs.uToast.show({
									title: `已记录${exp}异常`,
									type: 'success',
									duration: '800',
									position: 'top',
								})
							} else {
								this.$refs.uToast.show({
									title: data.msg,
									type: 'error',
									duration: '800',
									position: 'top',
								})
							}
						}
					}).catch(() => {
						this.$hide()
						this.$refs.uToast.show({
							title: data.msg,
							type: 'error',
							duration: '800',
							position: 'top',
						})
					}).finally(() => {
						this.$hide()
					})
				}

			},
			sendAbnormal(i, exp) {
				exp = this.exp
				if (exp === '死亡') {
					uni.navigateTo({
						url: `/pages/death/death`,
					})
					uni.setStorageSync('cageId', i)
				} else {
					this.formData.cageId = i
					// 发送异常
					this.sendReq(this.exp)
					// this.show = true
				}
			},
			sendDeath() {
				uni.navigateTo({
					url: '/pages/death/death'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ul {
		display: flex;
		justify-content: space-around;
		align-content: space-around;
		width: 100%;
		height: 100%;
		flex-wrap: wrap;
		margin-top: 36.23rpx;

		.li {
			display: flex;
			flex-direction: column;
			margin: 32.91rpx 32.91rpx;
			text-align: center;
			align-items: center;
			width: 137.11rpx;
			height: 137.11rpx;
			line-height: 149.91rpx;
			font-size: 102.38rpx;
			font-weight: 700;
			list-style: none;
			border-radius: 36.23rpx;
			color: #fff;
			font-family: 'ExpectionNumber';
		}
	}
</style>