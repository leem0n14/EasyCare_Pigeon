<!-- =============================== -->
<!-- =============================== -->
<!-- ========调仔仔页面~============= -->
<!-- =============================== -->
<!-- =============================== -->
<template>
	<view>
		<view class="circle">
			<view class="houseId row-center">
				{{show_nfcId ? '鸽舍号：'+ show_nfcId : '鸽舍号'}}
			</view>
			<proportion :leftValue="stayCount" :rightValue="whipCount"></proportion>
			<view class="ul" v-if="cageStatu.length">
				<view class="li" v-for="item in cageStatu" :key="item.cage_id">
					<view class="left">
						<span class="cageId">{{item.cage_id}}</span>
						<span class="statu">{{item.statu}}</span>
					</view>
					<view class="right" v-if="stayNum.length > 0">
						<button class="number" v-for="item_child in num" :key="item_child"
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
		reqFeedBirds,
		reqGetStatu,
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
	export default {
		// props: ['houseId'],
		data() {
			return {
				
				baseFormData: {
					siteId:'',
					houseId:'',
					cageId: '',
					cubNumber: 0,
					cubTime: null
				},
				num: [1, 2, 3, 4, 0],
				stayNum:[]
			};
		},
		mounted(){
			this.getStay()
		},
		computed: {
			...mapGetters(['nfcId','show_nfcId','cageStatu','whipCount','stayCount'])
		},
		methods: {
			handleClick(cageId, number) {
				this.baseFormData.siteId = uni.getStorageSync('siteId')
				this.baseFormData.houseId = this.nfcId
				this.baseFormData.cubNumber = number
				this.baseFormData.cageId = cageId
				this.baseFormData.cubTime = getNowDate()
				console.log(number)
				console.log(cageId)
				this.$loading()
				reqFeedBirds(this.baseFormData).then(data => {
					console.log('this.baseFormData', this.baseFormData)
					if (data.code === 200) {
						const {
							siteId,
							houseId
						} = this.baseFormData
						const obj = {
							siteId,
							houseId
						}
						this.$store.dispatch('getStatu', obj)
						this.getStay()
						this.getPR()
						console.log('data.code', data.code)
						console.log('data in putEggs of data.code === 200', data)
						this.$refs.uToast.show({
							title: `成功调为${number}个仔`,
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

<style lang="scss">
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
					
					.number {
						@include flex(center, center, 'items') width: 40%;
						height: 30%;
						font-size: 41.16rpx;
						font-weight: bold;
						border-radius: 10rpx;
						box-sizing: border-box;
						border: 1px solid #7c9bd2;
						&:last-child{
							width: 80%;
							height: 24%;
						}
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
	@include responseTo('phone'){
		.circle .ul .li .left .statu{
			font-size: 36rpx;
		}
	}
</style>