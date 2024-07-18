<template>
	<view>
		<scroll-view  scroll-y="true" class="circle">
			<view class="ul">
				<view class="li" v-for="item in 6" :key="item">
					<view class="left">
						<span class="cageId">{{item}}</span>
					</view>
					<view class="right" >
						<button :class="numListLength === 2 ? 'num1' : 'num'" 
						v-for="item_child in numList" :key="item_child"
						@click="chooseFn(numList,item,item_child)"  
						>{{item_child}}</button>
						
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 顶部提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		reqGetStatu,
		reqPutTips,
		reqStayNum
	} from '@/api/index.js'
	
	import {
		reqDeath
	} from '@/api/index.js'
	
	import {
		getNowDate
	} from '@/getTime.js'
	
	import {
		mapGetters
	} from 'vuex'
	
	import { format } from '@/utils/format_HouseId.js'
	export default {
		 props: {
			 numList:{
				 type:Array,
				 required:false
			 }
		 },
		data() {
			return {
				baseFormData: {
					siteId: uni.getStorageSync('siteId'),
					houseId: '',
					cageId: '',
					refer: '死亡',
					oldNum: 0,
					youngNum: 0,
					deathTime: null,
				},
				show: false,
				content: '确认操作吗？',
			};
		},
		onLoad() {
		
		},
		onShow() {
			// let res = this.testNFC()
			// if (this.baseFormData.houseId !== res.nfcId)
			// 	this.$back()
		},
		computed: {
			...mapGetters(['nfcId', 'show_nfcId', 'cageStatu', 'loading','whipCount','stayCount']),
			numListLength(){
				return this.numList.length;
			}
		},
		methods: {
			handleClick1(cageId,oldNum){
				this.baseFormData.siteId = uni.getStorageSync('siteId'); //获取仓号
				this.baseFormData.houseId = this.$store.state.NFC.nfcId; //读鸽舍
				this.baseFormData.cageId = cageId //读鸽笼
				this.baseFormData.oldNum = oldNum;  //种鸽死的数量
				this.baseFormData.deathTime = getNowDate() //读时间
				reqDeath(this.baseFormData).then(data => {
					if (data.code == 200) {
						console.log(data)
						this.$refs.uToast.show({
							title: data.msg,
							type: 'success',
							duration: '600',
							position: 'top',
							callback: () => {
								// uni.navigateBack()
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
			},
			handleClick2(cageId, youngNum){
				this.baseFormData.siteId = uni.getStorageSync('siteId'); //获取仓号
				// this.baseFormData.houseId = this.$store.state.NFC.nfcId //读鸽舍
				this.baseFormData.houseId = this.$store.state.NFC.nfcId; //读鸽舍
				this.baseFormData.cageId = cageId //读鸽笼
				this.baseFormData.youngNum = youngNum;  //仔死的数量
				this.baseFormData.deathTime = getNowDate() //读时间
				reqDeath(this.baseFormData).then(data => {
					if (data.code == 200) {
						console.log(data)
						this.$refs.uToast.show({
							title: data.msg,
							type: 'success',
							duration: '600',
							position: 'top',
							callback: () => {
								// uni.navigateBack()
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
			},
			
			chooseFn(numList,cage_id,deathnum){ //死种死仔分别调用不同的方法
			console.log('./././././././.',numList,cage_id,deathnum)
				if(numList.length==2){
					this.handleClick1(cage_id,deathnum)
				}else{
					this.handleClick2(cage_id,deathnum)
				}
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

	// .tip {
	// 	font-weight: bold;
	// 	padding-left: 10rpx;
	// 	color: darkgray;

	// 	span {
	// 		color: gray;
	// 		font-size: 36rpx
	// 	}
	// }

	.circle {
		width: 100%;
		height: 80vh;

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
			height: 80%;
			flex-wrap: wrap;
			margin-top: 20rpx;

			.li {
				display: flex;
				justify-content: space-around;
				width: 40%;
				height: 33%;
				text-align: center;
				align-items: center;
				border-radius: 20rpx;
				background-color: #dbe2f1;
				padding-bottom: 5rpx;
				// margin: 6rpx;
				

				.left,
				.right {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 90%;
					font-weight: bold;
					// margin: 5rpx;
				}

				.left {
					width: 35%;
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
					width: 100%;
					// height: 90%;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					align-content: space-around;
					flex-wrap: wrap;

					button {     //类选择器
						display: inline-block;
					}

					// $widthVariable:this.widthVariable;
					
					.num1 {
						@include flex(column, center, 'items') width: 70%;
						height: 30%;
						font-size: 41.16rpx;
						font-weight: bold;
						border-radius: 10rpx;
						box-sizing: border-box;
						border: 1px solid #7c9bd2;
						justify-content: space-around;
						padding: 10rpx;
						margin: 0;
						// background-color: #7c9bd2;
					}
					
					.num{
						@include flex(column, center, 'items') width: 42%;
						height: 30%;
						margin: 5rpx;
						font-size: 41.16rpx;
						font-weight: bold;
						border-radius: 10rpx;
						box-sizing: border-box;
						border: 1px solid #7c9bd2;
						justify-content: space-around;
						// background-color: #7c9bd2;
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