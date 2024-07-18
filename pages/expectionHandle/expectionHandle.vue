<template>
	<view>
		<view class="circle">
			<view class="houseId row-center">
				{{show_nfcId ? '鸽舍号：'+ show_nfcId : '鸽舍号'}}
			</view>
			<view class="ul">
				<view class="li ycd_bg ycd_color_left" v-for="item in 6" :key="item">
					<view class="left">
						<span class="cageId">{{item}}</span>
						<button class="statu" :disabled="exp.length > 0 ? !exp[item - 1].length > 0 : false"
							:class="exp.length > 0 ? 'notDisabled' : 'disabled'"
							@click="submit(item)">一键处理</button>
					</view>
					<view class="right">
						<!-- <u-empty v-if="exp[item-1].length === 0" text="数据为空" mode="data"></u-empty> -->
						<view class="expection" v-for="(ite,index) in exp.length > 0 ? exp[item - 1] : []" :key="index">{{ite}}</view>
						<!-- <view class="expection" v-for="(ite,index) in " :key="index">{{ite}}</view> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		getNowDate
	} from '@/getTime.js'
	import {
		reqGetExp,
		reqExpection
	} from '@/api/index.js';
	import {
		mapGetters
	} from 'vuex'
	// import mixin from '@/mixins/index.js'
	export default {
		// mixins: [mixin],
		data() {
			return {
				formData: {
					siteId: uni.getStorageSync('siteId'),
					houseId: '',
					cageId: '',
					updateTime: '',
					oneOrAll: 1
				},
				exp: [],
				disabled: false,
				loading: false,
				test: ['']
			}
		},
		// 多了这个
		watch:{
			cageId(newValue, oldValue){
				if(newValue !== oldValue){
					this.CageDetail();
				}
			}
		},
		async mounted() {
			await this.getExp()
		},
		onShow() {
			let res = this.testNFC()
		},
		computed: {
			...mapGetters(['nfcId', 'show_nfcId'])
		},
		onPullDownRefresh() {
			this.getExp()
		},
		methods: {
			getExp() {
				const obj = {
					siteId: this.formData.siteId,
					houseId: this.nfcId
				}
				
				console.log('调用getExp')
				// 获取异常状态
				this.disabled = false
				reqGetExp(obj).then(data => {
					if (data.code === 200) {
						console.log('请求成功，data.code == 200')
						console.log('data', data)
						this.exp = data.abnormal
						console.log('data.abnormal', data.abnormal.length)
					} else if (data.code === 404) {
						console.log('data.code !== 200', data)
						console.log('请求成功，data.code !== 200')
						// 当返回数组为空时，无异常
						this.disabled = true
						this.$refs.uToast.show({
							title: data.msg,
							type: 'warning',
							duration: "800",
							position: "top"
						})
					}
				}).catch(() => {
					console.log('catch', data)
					console.log('req error')
					this.$refs.uToast.show({
						title: '网络连接失败',
						type: 'warning',
						duration: '1000',
						position: 'top'
					})
				})
				.finally(() => {
					this.loading = false
					uni.stopPullDownRefresh()
				})
			},
			submit(cageId) {
				this.$loading()
				this.formData.houseId = this.nfcId
				this.formData.cageId = cageId
				this.formData.updateTime = getNowDate()
				this.formData.refer=this.exp[cageId -1];
				reqExpection(this.formData).then(data => {
					if (data.code == 200) {
						this.getExp()
						this.$refs.uToast.show({
							title: data.msg,
							type: 'success',
							duration: '800',
							position: 'top',
						})
					} else {
						this.$refs.uToast.show({
							title: data.msg,
							type: 'warning',
							duration: '800',
							position:'top'
						})
					}
				}).catch(() => {
					this.$refs.uToast.show({
						title: data.msg,
						type: 'error',
						duration: '800',
						position:'top'
					})
				}).finally(() => {
					this.$hide()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'styles/builder.scss';

	.checked_border {
		background-color: #fff;
		color: lawngreen;
		border: 2px solid greenyellow;
	}

	.disabled {
		color: gray;
		background-color: darkgray;
	}

	.notDisabled {
		color: #fff;
		background-color: #4472c4;
	}

	.ycd_bg {
		background-color: #dbe2f1;
	}

	.ycd_color {
		color: #4472c4
	}

	.ycd_color_left {
		color: #7d9ad2;
		border-right: 2px solid #7c9bd2;
	}

	.ycd_button_right {
		color: #dbe2f1;
		background-color: #7c9bd2;
	}

	.other_bg {
		background-color: #7c9bd2;
	}

	.other_color_left {
		color: #dbe2f1;
		border-right: 2px solid #dbe2f1;
	}

	.other_button_right {
		color: #7c9bd2;
		background-color: #dbe2f1;
	}

	.houseId {
		width: 100%;
		margin: 10rpx auto;
		padding: 18.12rpx 18.12rpx;
		font-size: 39.86rpx;
		border-radius: 14.49rpx;
		color: #fff;
		background-color: #7d9ad2;
	}

	.circle {
		width: 100%;
		height: 100vh;

		h1 {
			text-align: center;
			font-weight: 700;
		}

		.ul {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-content: space-around;
			width: 100%;
			height: 70vh;
			flex-wrap: wrap;
			margin-top: 20rpx;

			.li {
				display: flex;
				justify-content: space-around;
				width: 36%;
				height: 30%;
				padding: 0 10rpx;
				text-align: center;
				align-items: center;
				border-radius: 20rpx;


				.left,
				.right {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 90%;
					font-weight: bold;
				}

				.left {
					width: 40%;
					justify-content: center;
					padding-right: 10rpx;
					box-sizing: border-box;
					border-right: 2px solid #4472c4;
					box-sizing: border-box;

					.cageId {
						font-size: 91.41rpx
					}

					.statu {

						font-size: 20rpx;
						font-weight: bold;
						border-radius: 10rpx;
						box-sizing: border-box;

					}
				}

				.right {
					width: 60%;
					display: flex;
					justify-content: space-around;
					align-content: space-around;
					flex-wrap: wrap;

					.expection {
						width: 100%;
						heigth: auto;
						overflow: hidden;
						// 超出部分省略号替换
						// text-overflow:ellipsis;
						word-wrap: break-word;
						font-size: 18.29rpx;
						font-weight: bold;
						border-radius: 10rpx;
						box-sizing: border-box;
						color: #4472c4
					}

					// .right_top {
					// 	width: 100%;
					// 	height: 70%;
					// 	display: flex;
					// 	flex-direction: column;
					// 	justify-content: space-around;

					// }
				}
			}
		}
	}

	.abnormal {
		@include flex(space-around, center, 'items') width: 70%;
		height: 120rpx;
		margin: 0 auto;
		padding: 20rpx 57.97rpx;
		font-size: 38.04rpx;
		font-weight: 700;
		color: #fff;
		box-shadow: 9px 4px 10px 0 #7d9ad2;
		background-color: #7d9ad2;
	}
</style>