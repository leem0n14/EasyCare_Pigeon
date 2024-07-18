<template>
	<view>
		<view class="card row-around">
			<u-loading class="loading" mode="circle" v-if="isLoading" size="36" color="blue"></u-loading>
			<view class="card_left column-around" v-else>
				<view class="card_title row-center">
					<uni-icons type="fire" color="#9EB8E3" size="60"></uni-icons>
					<view class="text">今日放仔笼数</view>
				</view>
				<view class="num row-center">
					{{putCount}}
				</view>
				<view class="contrast" v-if="required">
					<span>较昨日</span>
					<span v-if="diffPutCount === 0">无变化</span>
					<template v-else>
						<uni-icons v-if="diffPutCount > 0" type="arrow-up" size="25" color="#19be6b"></uni-icons>
						<uni-icons v-else type="arrow-down" size="60" color="#fa3534"></uni-icons>
						<span style="font-size: 32rpx;">{{Math.abs(diffPutCount)}}</span>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { reqGetStay } from '@/api/index.js'
	export default {
		props:{
			site_id:{
				type: Number,
				required: true
			}
		},
		data() {
			return {
				putCount: '--',
				diffPutCount: 0,
				isLoading: true,
				required: false
			};
		},
		mounted() {
			// console.log('放仔组件挂载了,site:',this.site_id)
			this.getStayNum()
		},
		watch:{
			site_id(newValue,oldValue){
				if(newValue !== oldValue){
					// console.log('site变化发请求,site',this.site_id)
					this.getStayNum()
				}
			}
		},
		methods:{
			refresh(){
				this.getStayNum()
			},
			getStayNum(){
				this.isLoading = true
				reqGetStay({site_id: this.site_id}).then(resp => {
					if(resp.code === 200){
						// console.log('放仔resp',resp)
						this.putCount = resp.putCount
						this.diffPutCount = resp.diffPutCount
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
			width: 60%;
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
			
			.proportion{
				font-weight: bold;
			}
		}
	}
</style>