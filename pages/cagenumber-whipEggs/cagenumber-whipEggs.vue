<template>
	<view>
		<!-- <loading v-if="loading"></loading> -->
		<view class="circle">
			<view class="houseId row-center">
				{{show_nfcId ? '鸽舍号：'+ show_nfcId : '鸽舍号'}}
			</view>
			<view class="tip" v-if="tip !== 0">下一个鸽舍为：<span>{{tip}}</span>号鸽舍</view>
			<view v-else class="tip">当前鸽舍已全部处理完成</view>
			<proportion :leftValue="stayCount" :rightValue="whipCount"></proportion>
			<view class="ul" v-if="cageStatu.length">
				
				
				<view class="li" v-for="(item,index) in cageStatu" :key="index"
					:class="setStyle(item.statu) ? 'ycd_bg' : 'other_bg'">
					<view class="left" :class="setStyle(item.statu) ? 'ycd_color_left' : 'other_color_left'">
						<span class="cageId">{{item.cage_id}}</span>
						<span class="statu" :class="setStyle(item.statu) ? 'ycd_color' : ''">{{item.statu}}</span>
					</view>
					<view class="middle" :class="setStyle(item.statu) ? 'ycd_color_middle' : 'other_color_middle'">
						<span
							class="date" 
							v-for="(ite,ind) in eggTime.length>0 ? eggTime[index].time : []" 
							:key="ind"
							:class="ite.statu">
							{{formatting(ite.egg_time)}}
							<template
								v-if="ite.statu === 'line-bottom'">
								留
								</template>
							</span>
						</view>
					<view class="right">
						<button @click="sendStatu(item.cage_id,'抽蛋')"
							:class="setStyle(item.statu) ? 'ycd_button_right' : 'other_button_right'">抽</button>
						<button @click="sendStatu(item.cage_id,'留窝')"
							:class="setStyle(item.statu) ? 'ycd_button_right' : 'other_button_right'">留</button>
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
		reqWhipEggs,
		reqGetDate,
		reqGetStatu,
		reqWhipTips
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
	import {format} from '@/utils/format_HouseId.js'
	export default {
		// mixins: [mixin],
		// props: ['houseId'],
		data() {
			return {
				baseFormData: {
					houseId: '',
					cageId: '',
					siteId: '',
					cageStatu: '',
					whippingTime: ''
				},
				eggTime: [],
				show: false,
				content: '确认操作吗？',
				// 获取鸽笼状态的数组
				statu: [],
				isDisabled: false,
				tip: '',
				debounceGetWhip: debounce(()=>{this.getWhipTime()},200),
				debounceGetTips: debounce(()=>{this.getTips()},200)
			}
		},
		mounted() {
			this.baseFormData.whippingTime = getNowDate()
			console.log('保存到本地的cageId', uni.getStorageSync('cageId'))
			this.getWhipTime()
			this.getTips()
			this.getPR()
		},
		watch: {
			nfcId(newValue, oldValue) {
				if (newValue !== oldValue) {
					console.log('监听到前后值不一样，发送请求')
					this.debounceGetWhip()
					this.debounceGetTips()
				}
			}
		},
		onPullDownRefresh() {
			console.log('调用了刷新')
		},
		computed: {
			...mapGetters(['nfcId', 'show_nfcId', 'cageStatu','whipCount','stayCount'])
		},
		methods: {
			setStyle(str){
				if(str === '抽蛋' || str === '留窝'){
					return true;
				}else return false;
			},
			debounce(fn, delay) {
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
			formatting(date) {
				let d = date.split('-')
				return d[1] + '-' + d[2]
			},
			
			
			// 获取查蛋时间
			async getWhipTime() {
				this.showFor = false
				const obj = {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId,
					twoOrSix: 6
				}
				await reqGetDate(obj).then(data => {
					console.log('data查蛋时间', data)
					if (data.code === 200) {
						this.eggTime = data.eggs
						this.showFor = true
						console.log('this.eggTime', this.eggTime)
					} else {
						console.log('获取时间 req success but data.code !== 200')
						this.$refs.uToast.show({
							title: data.msg,
							type: "warning",
							duration: '800',
							position: 'top'
						})
					}
				}).catch(() => {
					console.log('获取时间 req error')
					this.$refs.uToast.show({
						title: '获取时间失败',
						type: "warning",
						duration: '800',
						position: 'top'
					})
				}).finally(() => {
					console.log('关闭了刷新')
					uni.stopPullDownRefresh()
				})
			},
			
			
			// 发送鸽笼状态,进行抽蛋或留窝
			async sendStatu(cageId, str) {
				// this.$loading()
				this.baseFormData.siteId = uni.getStorageSync('siteId')
				this.baseFormData.houseId = this.nfcId
				this.baseFormData.cageId = cageId
				this.baseFormData.cageStatu = str
				let res = await reqWhipEggs(this.baseFormData)
				if (res.code === 200) {
					const {
						siteId,
						houseId
					} = this.baseFormData
					const obj = {
						siteId,
						houseId
					}
					this.$store.dispatch('getStatu', obj)
					this.getWhipTime()
					this.getTips()
					this.getPR()
				}
				console.log('data',res)
				console.log('data.msg,data.type',res.msg,res.type)
				this.$refs.uToast.show({
					title: res.msg,
					type: res.type,
					duration: '800',
					position: 'top'
				})

			},
			toExp() {
				uni.navigateTo({
					url: '/pages/expection/expection'
				})
			},
			// 提示，获取鸽笼下一步要操作抽蛋的鸽舍和鸽笼
			async getTips() {
				console.log('调用getTips成功')
				const ids = {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId,
					oneOrAll: 0
				}
				await reqWhipTips(ids).then(data => {
					console.log(data)
					if (data.code == 200) {
						this.tip = format(data.eggs.house_id,uni.getStorageSync('siteId'))
						console.log('data.stay.house_id', data.eggs.house_id)
					} 
				}).finally(() => {
					console.log('关闭了刷新')
					uni.stopPullDownRefresh()
				})
			},
			// 获取当天留窝抽蛋比例
			getPR(){
				if(uni.getStorageSync('siteId')){
					console.log('有site')
					const obj = {
						site_id: uni.getStorageSync('siteId')
					}
					this.$store.dispatch('getEWPR',obj)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'styles/builder.scss';

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

	.ycd_color_middle {
		color: #4472c4
	}

	.ycd_button_right {
		color: #fdfefe;
		background-color: #4472c4;
	}

	.other_bg {
		background-color: #7c9bd2;
	}

	.other_color_left {
		color: #dbe2f1;
		border-right: 2px solid #dbe2f1;
	}

	.other_color_middle {
		color: #dbe2f1;
	}

	.other_button_right {
		color: #4472c4;
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
				width: 40%;
				height: 30%;
				text-align: center;
				align-items: center;
				border-radius: 20rpx;


				.left,
				.middle,
				.right {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					width: 33%;
					height: 90%;
					font-weight: bold;
				}

				.left {
					justify-content: flex-start;
					// border-right:1px solid #7c9bd2;

					box-sizing: border-box;

					.cageId {
						font-size: 126rpx
					}

					.statu {
						font-size: 20rpx;
					}
				}

				.middle {
					span {
						display: inline-block;
						font-size: 20rpx;
					}

				}

				.right {
					button {
						width: 78rpx;
						height: 78rpx;
						line-height: 78rpx;
						font-size: 34rpx;
						font-weight: bold;

						border: 2px solid #fff;
						border-radius: 20rpx;
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
		.circle .ul .li .left {
			justify-content: center;

			.statu {
				font-size: 36rpx;
			}
		}
	}
</style>