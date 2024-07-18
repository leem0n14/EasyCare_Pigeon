<template>
	<view class="content">
		<view class="death_PB">
			<span class="title box-showdow">种鸽死亡数</span>
			<view class="btn">
				<span @click="decrement_1" class="left">-</span>
				<span class="middle">{{baseFormData.oldNum}}</span>
				<span @click="increament_1" class="right">+</span>
			</view>
		</view>
		<view class="death_nestling">
			<span class="title box-showdow">雏鸟死亡数</span>
			<view class="btn">
				<span @click="decrement_2" class="left">-</span>
				<span class="middle">{{baseFormData.youngNum}}</span>
				<span @click="increament_2" class="right">+</span>
			</view>
		</view>
		<button class="save bg-btn btn-showdow" @click="submit">保存</button>
		<!-- <u-modal v-model="show" :mask-close-able="true" @confirm="confirm" @cancel="cancel" ref="uModal"
			:show-cancel-button="true" :zoom="true" :content="content"></u-modal> -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		reqDeath
	} from '@/api/index.js'
	import {
		getNowDate
	} from '@/getTime.js'
	export default {
		data() {
			return {
				baseFormData: {
					siteId: uni.getStorageSync('siteId'),
					houseId: '',
					cageId: '',
					refer: '死亡',
					oldNum: 0,
					youngNum: 0,
					deathTime: null
				},
				show: false,
				content: '确认操作吗？'
			}
		},
		onLoad() {

		},
		onShow() {
			// let res = this.testNFC()
			// if (this.baseFormData.houseId !== res.nfcId)
			// 	this.$back()
		},
		methods: {
			decrement_1() {
				this.baseFormData.oldNum > 0 && this.baseFormData.oldNum--
			},
			decrement_2() {
				this.baseFormData.youngNum > 0 && this.baseFormData.youngNum--
			},
			increament_1() {
				this.baseFormData.oldNum < 2 && this.baseFormData.oldNum++
			},
			increament_2() {
				this.baseFormData.youngNum < 2 && this.baseFormData.youngNum++
			},
			submit() {
				if (this.baseFormData.oldNum === 0 && this.baseFormData.youngNum === 0)
					this.$refs.uToast.show({
						title: '死亡数不能同时为 0 ',
						type: 'error',
						duration: '1200',
						position: 'top'
					})
				else {
					this.baseFormData.houseId = this.$store.state.NFC.nfcId
					this.baseFormData.cageId = uni.getStorageSync('cageId')
					this.baseFormData.deathTime = getNowDate()
					reqDeath(this.baseFormData).then(data => {
						if (data.code == 200) {
							console.log(data)
							this.$refs.uToast.show({
								title: data.msg,
								type: 'success',
								duration: '600',
								position: 'top',
								callback: () => {
									uni.navigateBack()
								}
							})
						} else if (data.code === 404) {
							this.$refs.uToast.show({
								title: data.msg,
								type: 'warning',
								duration: '800',
								position: 'top'
							})
						}
					}).catch(() => {
						this.$refs.uToast.show({
							title: '网络连接失败',
							type: 'error',
							duration: '800',
							position: 'top'
						})
					}).finally(() => {
						this.show = false
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/styles/builder.scss';
	.content {
		margin-top: 140rpx;
		padding-top: 40rpx
	}

	.death_PB,
	.death_nestling {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;

		// background-color: pink;
		span {
			display: inline-block;
		}

		.title {
			width: 40%;
			height: 100rpx;
			line-height: 100rpx;
			font-weight: 700;
			font-size: 40rpx;
			margin: 0 auto;
			background-color: #fff;
		}

		.btn {
			display: flex;
			width: 100%;
			font-size: 48rpx;
			margin-top: 90rpx;
			justify-content: center;
		}

		.left,
		.right {
			width: 120rpx;
			height: 85rpx;
			text-align: center;
			line-height: 85rpx;
			margin: auto 0;
			background-color: #f0f3fa;
			box-shadow: 10px 10px 20px 8px #d7dfef;
		}

		.middle {
			width: 140rpx;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			font-weight: 700;
			margin: auto 20rpx;
			background-color: #f0f3fa;
			box-shadow: 10px 10px 20px 8px #d7dfef;
		}

	}

	.death_nestling {
		margin-top: 30rpx;
	}

	.save {
		width: 300rpx;
		height: 100rpx;
		margin: 0 auto;
		margin-top: 333rpx;
		color: white;
		font-size: 30rpx;
		line-height: 88rpx;
	}

	@include responseTo('pad'){
		.content{
			margin-top: 0;
		}
		.death_PB,.death_nestling{
			.title{
				height: 45.73rpx;
				line-height: 45.73rpx;
				font-size: 23.78rpx
			}
			.btn{
				font-size: 36.59rpx;
				.left,.right{
					width: 100.61rpx;
					height: 73.17rpx;
					line-height: 73.17rpx;
				}
				.middle{
					height: 68.6rpx;
					line-height: 68.6rpx;
				}
			}
		}
		.save{
			margin-top: 100.61rpx;
		}
	}
</style>