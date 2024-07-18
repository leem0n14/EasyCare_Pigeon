<template>
	<view class="page">
		<view class="w">
			<view class="header">异常状态-<span>{{show_nfcId}}</span>号</view>
			<view class="content">
				<u-tabs-swiper ref="uTabs" name="statu" :list="list" @change="tabsChange" :is-scroll="false"
					:show-bar="showBar" active-color="#f29100" inactive-color="#303133" :current="current"
					font-size="34"></u-tabs-swiper>
				<!-- 可能可以通过不同的宽度去适配不同的设备 -->
			</view>
			<view class="swiper">
				<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
					style="height: 70vh;">
					<swiper-item class="swiper-item" style="height: 100%;width: 100%;">
						<cage-number :bg-color="death_bgColor" :exp="'破损'"></cage-number>
					</swiper-item>
					<swiper-item class="swiper-item">
						<cage-number :bgColor="qifu_bgColor" :exp="'单蛋'"></cage-number>
					</swiper-item>
					<swiper-item class="swiper-item">
						<cage-number2 :numList="[1,2]"></cage-number2>   <!-- 死种 -->
					</swiper-item>
					<swiper-item class="swiper-item">
						<cage-number2 :numList="[1,2,3,4]"></cage-number2>    <!-- 死仔 -->
					</swiper-item>
					<swiper-item class="swiper-item">
						<cage-number :bgColor="broke_bgColor" :exp="'光蛋'"></cage-number>
					</swiper-item>
					<swiper-item class="swiper-item">
						<cage-number :bgColor="broke_bgColor" :exp="'弃仔'"></cage-number>
					</swiper-item>
					<swiper-item class="swiper-item">
						<cage-number :bgColor="aspermatism_bgColor" :exp="'弃孵'"></cage-number>
					</swiper-item>
					<swiper-item class="swiper-item">
						<cage-number :bgColor="abandon_bgColor" :exp="'淘汰'"></cage-number>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import cageNumber from '@/pages/cagenumber/cagenumber'
	import cageNumber2 from '@/pages/cagenumber/cagenumber2'
	export default {
		components: {
			cageNumber,
			cageNumber2
		},
		data() {
			return {
				list: [{
					statu: '破损'
				}, {
					statu: '单蛋'
				},{
					statu: '死种'
				},{
					statu: '死仔'
				},{
					statu: '光蛋'
				}, {
					statu: '弃仔'
				}, {
					statu: '弃孵'
				}, {
					statu: '淘汰'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				death_bgColor: '#de9793',
				qifu_bgColor: '#eee4a9',
				broke_bgColor: '#afd396',
				aspermatism_bgColor: '#43c6f9',
				qiyang_bgColor: '#e6e6e6',
				abandon_bgColor: '#e83632',
				lists: [1, 4, 2, 5, 3, 6],
				showBar: true
			}
		},
		onShow() {
			// 解决u-tabs滑块显示异常问题
			this.showBar = true
			this.$nextTick(() => {
				this.showBar = true
			})
		},
		computed: {
			...mapGetters(['nfcId','show_nfcId'])
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	}
</script>

<style lang="scss" scoped>

	.page {
		height: 100vh;
	}

	.home-bg {
		background: url(@/static/images/bg-home.png) no-repeat;
		background-size: 100% auto;
	}

	.index {
		background-size: 100% auto;
	}


	.header {
		width: 100%;
		padding: 10px 10px;
		// margin: 45px auto;
		text-align: center;
		font-size: 45.7rpx;
		font-weight: bold;
		span{
			font-size: 21.94rpx;
			color:deepskyblue
		}
	}
</style>