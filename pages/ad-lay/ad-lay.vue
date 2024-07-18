<template>
	<view>
		<view class="card row-around">
			<u-loading class="loading" mode="circle" v-if="isLoading" size="36" color="blue"></u-loading>
			<view class="card_left column-around" v-else>
				<view class="card_title row-center">
					<uni-icons type="fire" color="#9EB8E3" size="60"></uni-icons>
					<view class="text">今日产蛋数</view>
				</view>
				<view class="num row-center">
					{{eggCount}}
				</view>
				<view class="contrast" v-if="required">
					<span>较昨日</span>
					<span v-if="diffEggCount === 0">无变化</span>
					<template v-else>
						<uni-icons v-if="diffEggCount > 0" type="arrow-up" size="25" color="#19be6b"></uni-icons>
						<uni-icons v-else-if="diffEggCount < 0" type="arrow-down" size="60" color="#fa3534"></uni-icons>
						<span style="font-size: 14.68rpx;">{{Math.abs(diffEggCount)}}</span>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { reqGetLay } from '@/api/index.js'
	export default {
		props: {
			site_id: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				eggCount: '--',
				diffEggCount: '--',
				isLoading: true,
				required: false
			};
		},
		mounted() {
			// console.log('lay组件挂载了,site:',this.site_id)
			this.getLayNum()
		},
		watch: {
			site_id(newValue, oldValue) {
				if (newValue !== oldValue) {
					// console.log('site变化发请求,site',this.site_id)
					this.getLayNum()
				}
			}
		},
		methods:{
			refresh(){
				this.getLayNum()
			},
			getLayNum(){
				this.isLoading = true
				reqGetLay({site_id: this.site_id}).then(resp => {
					// console.log('产蛋resp',resp)
					if(resp.code === 200){
						this.eggCount = resp.eggCount
						this.diffEggCount = resp.diffEggCount
						this.required = true
					}
				}).finally(()=>{
					this.isLoading = false
					uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eeeeef;
	}

	.card {
		width: 100%;
		height: 500rpx;
		background-color: #fff;

		.card_left,
		.card_right {
			width: 80%;
			height: 100%;

			.card_title {
				.text {
					font-size: 33.03rpx;
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