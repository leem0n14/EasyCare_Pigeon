<template>
	<view>
		<view class="card row-around">
			<u-loading class="loading" mode="circle" v-if="isLoading" size="36" color="blue"></u-loading>
			<template v-else>
				<view class="card_left column-around">
					<view class="card_title row-center">
						<uni-icons type="fire" color="#9EB8E3" size="60"></uni-icons>
						<view class="text">今日抽蛋数</view>
					</view>
					<view class="num row-center">
						{{whippingCount}}
					</view>
					<template v-if="required">
						<view class="contrast">
							<span>较昨日</span>
							<span v-if="diffWhippingCount === 0">无变化</span>
							<template v-else>
								<uni-icons v-if="diffWhippingCount > 0" type="arrow-up" size="60"
									color="#19be6b"></uni-icons>
								<uni-icons v-else type="arrow-down" size="60" color="#fa3534"></uni-icons>
								<span style="font-size: 14.68rpx;">{{Math.abs(diffWhippingCount)}}</span>
							</template>
						</view>
						<view class="proportion">
							占比: {{saveTwoSmallNum(op1)}}%
						</view>
					</template>
				</view>
				<view class="card_right column-around">
					<view class="card_title row-center">
						<uni-icons type="fire" color="#9EB8E3" size="60"></uni-icons>
						<view class="text">今日留窝数</view>
					</view>
					<view class="num row-center">
						{{stayCount}}
					</view>
					<template v-if="required">
						<view class="contrast">
							<span>较昨日</span>
							<span v-if="diffStayCount === 0">无变化</span>
							<template v-else>
								<uni-icons v-if="diffStayCount > 0" type="arrow-up" size="60"
									color="#19be6b"></uni-icons>
								<uni-icons v-else type="arrow-down" size="60" color="#fa3534"></uni-icons>
								<span style="font-size: 14.68rpx;">{{Math.abs(diffStayCount)}}</span>
							</template>
						</view>
						<view class="proportion">
							占比: {{saveTwoSmallNum(op2)}}%
						</view>
					</template>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import {
		reqWhipStay
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
				whippingCount: 0,
				diffWhippingCount: 0,
				stayCount: 0,
				diffStayCount: 0,
				isLoading: true,
				required: false
			};
		},
		mounted() {
			// console.log('抽蛋留窝组件挂载了,site', this.site_id)
			this.getWhipStay()
		},
		watch: {
			site_id(newValue, oldValue) {
				if (newValue !== oldValue) {
					// console.log('site变化发请求,site', this.site_id)
					this.getWhipStay()
				}
			}
		},
		computed: {
			addValue() {
				return this.whippingCount + this.stayCount
			},
			op1() {
				return this.whippingCount / this.addValue * 100 || 0
			},
			op2() {
				return this.stayCount / this.addValue * 100 || 0
			}
		},
		methods: {
			refresh() {
				this.getWhipStay()
			},
			getWhipStay() {
				this.isLoading = true
				reqWhipStay({
					site_id: this.site_id
				}).then(resp => {
					// console.log('抽蛋resp', resp)
					if (resp.code === 200) {
						this.whippingCount = resp.whippingCount
						this.diffWhippingCount = resp.diffWhippingCount
						this.stayCount = resp.stayCount
						this.diffStayCount = resp.diffStayCount
						this.required = true
					}
				}).finally(() => {
					this.isLoading = false
					uni.stopPullDownRefresh()
				})
			},
			saveTwoSmallNum(number) {
				return number.toFixed(2)
			}
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #eeeeef;
		font-family: 'ExpectionNumber'
	}

	.card {
		width: 100%;
		height: 500rpx;
		background-color: #fff;
		

		.card_left,
		.card_right {
			width: 40%;
			height: 100%;
			.contrast{
				height: 59.63rpx;
				line-height: 59.63rpx;
			}
			.card_title {
				.text {
					font-size: 23.85rpx;
					font-weight: bold;
				}
			}

			.num {
				font-size: 120rpx;
				font-weight: bold;
			}

			.proportion {
				font-weight: bold;
			}
		}
	}
</style>