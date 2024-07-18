<template>
	<view>
		<view class="circle">
			<view class="houseId row-center">
				{{show_nfcId ? '鸽舍号：'+ show_nfcId : '鸽舍号'}}
			</view>
			<view class="tip" v-if="tip !== 0">下一个鸽舍为：<span>{{tip}}</span>号鸽舍</view>
			<view v-else class="tip">当前鸽笼已全部处理完成</view>
			<proportion :leftValue="stayCount" :rightValue="whipCount"></proportion>
			<view class="ul" v-if="cageStatu.length">
				<view class="li" v-for="item in cageStatu" :key="item.cage_id">
					<view class="left">
						<span class="cageId">{{item.cage_id}}</span>
						<span class="statu">{{item.statu}}</span>
					</view>
					<view class="right" v-if="stayNum.length > 0">
						<button class="num" v-for="item_child in numList" :key="item_child"
							@click="handleClick(item.cage_id,item_child)"
							:class="item_child === stayNum[item.cage_id-1].number ? 'ycd_button_right' : ''">{{item_child}}</button>
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
		reqPutEggs,
		reqGetStatu,
		reqPutTips,
		reqStayNum
	} from '@/api/index.js'
	import {
		getNowDate
	} from '@/getTime.js'
	import {
		mapGetters
	} from 'vuex'
	import {
		debounce
	} from '@/utils/debounce.js'
	import { format } from '@/utils/format_HouseId.js'
	export default {
		// props: ['houseId'],
		data() {
			return {
				baseFormData: {
					siteId: '',
					houseId: '',
					cageId: '',
					putNumber: 4,
					putTime: null,
					cageStatu: '带仔中'
				},
				numList:[1,2,3,4],
				stayNum:[],
				statu: [],
				flag: true,
				tip: '',
				cancelToken: {
					cancelToken: true
				},
				cancel: '',
				debounceGetTips: debounce(() => {
					this.getTips()
				}, 200)
			};
		},
		async mounted() {
			await this.debounceGetTips()
			await this.getStay()
		},
		watch: {
			async nfcId(newValue, oldValue) {
				if (newValue !== oldValue) {
					console.log('监听到前后值不一样，发送请求')
					await this.debounceGetTips()
					await this.getStay()
				}
			}
		},
		computed: {
			...mapGetters(['nfcId', 'show_nfcId', 'cageStatu', 'loading','whipCount','stayCount'])
		},
		methods: {
			debounce1(fn, delay) {
				let timer
				return function() {
					const _this = this
					if (timer) {
						clearTimeout(timer);
						console.log('清楚了定时器', timer)
					}
					timer = setTimeout(function() {
						// console.log(fn)
						console.log('this的值', this)
						// fn.apply(_this,arguments)
						fn()
					}, delay);
					timer = null
					console.log('创建了定时器', timer)
				};
			},
			handleClick(cageId, num) {
				this.baseFormData.siteId = uni.getStorageSync('siteId');
				this.baseFormData.houseId = this.$store.state.NFC.nfcId;
				this.baseFormData.putNumber = num;
				this.baseFormData.cageId = cageId;
				this.baseFormData.putTime = getNowDate();
				this.cancel = true;
				console.log(num);
				console.log(cageId);
				this.$loading();
				reqPutEggs(this.baseFormData).then(data => {
					console.log('this.baseFormData', this.baseFormData);
					if (data.code === 200) {
						this.cancel = false;
						console.log('data.code', data.code);
						console.log('data in putEggs of data.code === 200', data);
						// 操作之后更新鸽笼状态
						const {
							siteId,
							houseId
						} = this.baseFormData
						const obj = {
							siteId,
							houseId
						}
						this.$store.dispatch('getStatu', obj)
						// 再次获取操作
						this.getTips()
						// 更新带仔数量
						this.getStay()
						// 更新比例
						this.getPR()
						this.$refs.uToast.show({
							title: `成功放入${num}个仔`,
							type: 'success',
							duration: '600',
							position: 'top'
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
						title: data.msg,
						type: 'error',
						duration: '800',
						position: 'top'
					})
				}).finally(() => {
					this.$hide()
				})
			},
			getTips() {
				console.log('调用getTips成功')
				const ids = {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId
				}
				reqPutTips(ids).then(data => {
					console.log(data)
					if (data.code == 200) {
						console.log('tips in putEggs of getTips', data.stay)
						// const list = data.stay.house_id
						// this.tip = list
						this.tip = format(data.stay.house_id,uni.getStorageSync('siteId'))
					} else if (data.code === 404) {
						this.$refs.uToast.show({
							title: data.msg,
							type: 'error',
							duration: '800',
							position: 'top'
						})
						this.tip = list
					}
				}).catch(() => {
					this.$refs.uToast.show({
						title: data.msg,
						type: 'error',
						duration: '800',
						position: 'top'
					})
					console.log('this.tip', this.tip)
				}).finally(() => {
					uni.stopPullDownRefresh()
				})
			},
			async getStay(){
				const obj = {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId
				}
				let res = await reqStayNum(obj)
				if(res.code === 200){
					console.log(res)
					this.stayNum = res.cages
				}else this.$refs.uToast.show({
					title: '出错了！！！！',
					type: 'error',
					duration: '800',
					position: 'top'
				})
			},
			// 获取当天的留窝抽蛋比例
			getPR(){
				if(uni.getStorageSync('siteId')){
					console.log('有site')
					const obj = {
						site_id: uni.getStorageSync('siteId')
					}
					this.$store.dispatch('getEWPR',obj)
				}
			},
			toExp() {
				uni.navigateTo({
					url: '/pages/expection/expection'
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

	.tip {
		font-weight: bold;
		padding-left: 10rpx;
		color: darkgray;

		span {
			color: gray;
			font-size: 36rpx
		}
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
			height: 70%;
			flex-wrap: wrap;
			margin-top: 20rpx;

			.li {
				display: flex;
				justify-content: space-around;
				width: 36%;
				height: 30%;
				text-align: center;
				align-items: center;
				border-radius: 20rpx;
				background-color: #dbe2f1;

				.left,
				.right {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 90%;
					font-weight: bold;
				}

				.left {
					width: 33%;
					justify-content: center;
					// border-right:1px solid #7c9bd2;
					// color: #7d9ad2;
					border-right: 2px solid #7c9bd2;
					box-sizing: border-box;
					color: #4472c4;

					.cageId {
						font-size: 100rpx
					}

					.statu {
						font-size: 20rpx;
					}
				}

				.right {
					width: 66%;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					align-content: space-around;
					flex-wrap: wrap;

					button {
						display: inline-block;
					}

					.num {
						@include flex(center, center, 'items') width: 40%;
						height: 40%;
						font-size: 41.16rpx;
						font-weight: bold;
						border-radius: 10rpx;
						box-sizing: border-box;
						border: 1px solid #7c9bd2;
						// background-color: #7c9bd2;
					}

					.submit {
						width: 80%;
						font-size: 20rpx;
						font-weight: bold;
						border-radius: 10rpx;
					}
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

	@include responseTo('phone') {
		.circle .ul .li .left .statu {
			font-size: 36rpx;
		}
	}
</style>