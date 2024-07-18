<template>
	<view>
		<view class="card">
			<view class="title" style="background-color: #9EB8E3;	">
				<view style="width: 40%;">异常种类</view>
				<view style="width: 30%;">数量</view>
				<view style="width: 30%;">占比(%)</view>
			</view>
			<u-loading class="loading" mode="circle" v-if="abnormalLoading" size="36" color="blue"></u-loading>
			<template v-else>
				<scroll-view scroll-y="true" style="height: 70vh;" v-if="required">
					<view class="title" style="background-color: #fff; color: #000">
						<view style="width: 40%;">光蛋</view>
						<view style="width: 30%;">{{spermatozoniaCount}}</view>
						<view style="width: 30%;">{{op1 === 0 ? op1 : saveTwoSmallNum(op1)}}</view>
					</view>
					<view class="title" style="background-color: #fff; color: #000">
						<view style="width: 40%;">破损</view>
						<view style="width: 30%;">{{breakageCount}}</view>
						<view style="width: 30%;">{{op2 === 0 ? op2 : saveTwoSmallNum(op2)}}</view>
					</view>
					<view class="title" style="background-color: #fff; color: #000">
						<view style="width: 40%;">弃仔</view>
						<view style="width: 30%;">{{abandonCount}}</view>
						<view style="width: 30%;">{{op3 === 0 ? op3 : saveTwoSmallNum(op3)}}</view>
					</view>
					<view class="title" style="background-color: #fff; color: #000">
						<view style="width: 40%;">单蛋</view>
						<view style="width: 30%;">{{singleCount}}</view>
						<view style="width: 30%;">{{op4 === 0 ? op4 : saveTwoSmallNum(op4)}}</view>
					</view>
					<view class="title" style="background-color: #fff; color: #000">
						<view style="width: 40%;">弃孵</view>
						<view style="width: 30%;">{{discardCount}}</view>
						<view style="width: 30%;">{{op5 === 0 ? op5 : saveTwoSmallNum(op5)}}</view>
					</view>
					<view class="title" style="background-color: #fff; color: #000">
						<view style="width: 40%;">种鸽死亡</view>
						<view style="width: 30%;">{{deathCount_old}}</view>
						<view style="width: 30%;">{{op6 === 0 ? op6 : saveTwoSmallNum(op6)}}</view>
					</view>
					<view class="title" style="background-color: #fff; color: #000">
						<view style="width: 40%;">雏鸽死亡</view>
						<view style="width: 30%;">{{deathCount_young}}</view>
						<view style="width: 30%;">{{op7 === 0 ? op7 : saveTwoSmallNum(op7)}}</view>
					</view>
					<!-- <view class="middle_bottom">再多可就不好了~</view> -->
				</scroll-view>
			</template>
		</view>
	</view>
</template>

<script>
	import {
		reqAbnormalList
	} from '@/api/index.js'
	export default {
		props: {
			site_id: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				abnormalLoading: true,
				spermatozoniaCount: 0,
				breakageCount: 0,
				abandonCount: 0,
				singleCount: 0,
				discardCount: 0,
				deathCount_old: 0,
				deathCount_young: 0,
				required: false
				// abnormal: [{
				// 	type: '蛋蛋',
				// 	num: 12,
				// 	op: 50
				// }, {
				// 	type: '蛋蛋',
				// 	num: 12,
				// 	op: 50
				// }, {
				// 	type: '蛋蛋',
				// 	num: 12,
				// 	op: 50
				// }, {
				// 	type: '蛋蛋',
				// 	num: 12,
				// 	op: 50
				// }, {
				// 	type: '蛋蛋',
				// 	num: 12,
				// 	op: 50
				// }, {
				// 	type: '蛋蛋',
				// 	num: 12,
				// 	op: 50
				// }, {
				// 	type: '蛋蛋',
				// 	num: 12,
				// 	op: 50
				// }, {
				// 	type: '蛋蛋',
				// 	num: 12,
				// 	op: 50
				// }, {
				// 	type: '蛋蛋',
				// 	num: 12,
				// 	op: 50
				// }, {
				// 	type: '蛋蛋',
				// 	num: 12,
				// 	op: 50
				// }]
			};
		},
		mounted() {
			this.getAbnormalList()
			// console.log('abnormal组件挂在了,site', this.site_id)
		},
		computed: {
			allValue() { 
				return this.spermatozoniaCount + this.breakageCount + this.abandonCount + this.singleCount + this
					.discardCount + this.deathCount_old + this.deathCount_young
			},
			op1() {
				// console.log(Math.ceil(this.spermatozoniaCount / this.allValue))
				return this.spermatozoniaCount / this.allValue * 100 || 0
			},
			op2() {
				return this.breakageCount / this.allValue * 100 || 0
			},
			op3() {
				return this.abandonCount / this.allValue * 100 || 0
			},
			op4() {
				return this.singleCount / this.allValue * 100 || 0
			},
			op5() {
				return this.discardCount / this.allValue * 100 || 0
			},
			op6() {
				return this.deathCount_old / this.allValue * 100 || 0
			},
			op7(){
				return this.deathCount_young / this.allValue * 100 || 0
			}
		},
		methods: {
			refresh(){
				this.getAbnormalList()
			},
			saveTwoSmallNum(number){
				return number.toFixed(2)
			},
			getAbnormalList() {
				this.abnormalLoading = true
				reqAbnormalList({
					site_id: this.site_id
				}).then(resp => {
					// console.log('异常resp',resp);
					if (resp.code === 200) {
						this.spermatozoniaCount = resp.spermatozoniaCount;
						this.breakageCount = resp.breakageCount;
						this.abandonCount = resp.abandonCount
						this.singleCount = resp.singleCount;
						this.discardCount = resp.discardCount;
						this.deathCount_old = resp.oldDeathCount;
						this.deathCount_young = resp.youngDeathCount;
						this.required = true
					}
				}).finally(() => {
					this.abnormalLoading = false
					uni.stopPullDownRefresh()
				})
			}
		},
		watch: {
			site_id(newValue, oldValue) {
				if (newValue !== oldValue) {
					// console.log('site变化发请求,site', this.site_id)
					this.getAbnormalList()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 基础样式重置 */
	* {
	  box-sizing: border-box; /* 确保所有元素的宽度和高度包括padding和border */
	  margin: 0;
	  padding: 0;
	}
	
	.card {
		width: 100%;
		height: 70vh;
		background-color: #fff;
		overflow: hidden;

		.title {
			display: flex;
			width: 100%;
			padding: 12.84rpx 4.59rpx;
			justify-content: flex-start;
			background-color: #9EB8E3;
			color: #fff;
			font-weight: bold;
			font-size: 20.18rpx;

			view {
				display: flex;
				justify-content: space-around;
				align-items: center;
			}

		}

		.middle_bottom {
			color: darkgray;
			text-align: center;
		}

		.loading {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>