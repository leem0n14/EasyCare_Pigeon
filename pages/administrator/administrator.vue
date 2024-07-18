<template>
	<view>
		<view class="tab">
			<span v-for="(item,index) in list_site" :key="index" @tap="choose(item)"
				:class="item.handle ? 'choose_bg' : 'bg'">{{item.text}}</span>
		</view>
		<view class="w">
			<view class="content">
				<u-tabs-swiper ref="uTabs" name="operation" :list="list_operation" @change="tabsChange"
					:is-scroll="false" active-color="#9EB8E3" inactive-color="#303133" :current="current"
					font-size="30"></u-tabs-swiper>
				<!-- 可能可以通过不同的宽度去适配不同的设备 -->
			</view>
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="height: 70vh;"
			>
				<swiper-item class="swiper-item" v-for="i in components" :key="i.id">
					<!-- <AdLay></AdLay> -->
					<!-- 动态挂载利用if判定 -->
						<component :is="i.name" v-if="i.choose" :site_id="site_id" :id="i.name"></component>
				</swiper-item>
			</swiper>
			<!-- 详细数据入口 -->
			<!-- <view class="more" @click="toReadNFC">
				详细数据
			</view> -->
		</view>
	</view>
</template>

<script>
	import AdWhipStay from '../ad-whipStay/ad-whipStay.vue'
	import AdLay from '../ad-lay/ad-lay.vue'
	import AdPut from '../ad-put/ad-put.vue'
	import AdAbnormal from '../ad-abnormal/ad-abnormal.vue'
	export default {
		components:{
			AdWhipStay,
			AdLay,
			AdPut,
			AdAbnormal
		},
		data() {
			return {
				components:[{
					id: 0,
					name: 'AdLay',
					choose: true,
				},{
					id: 1,
					name: 'AdWhipStay',
					choose: false
				},{
					id: 2,
					name: 'AdPut',
					choose: false
				},{
					id: 3,
					name: 'AdAbnormal',
					choose: false
				}],
				list_site: [{
					id: 1,
					text: '1仓',
					handle: true
				}, {
					id: 2,
					text: '2仓',
					handle: false
				}, {
					id: 3,
					text: '3仓',
					handle: false
				}],
				list_operation: [{
					operation: '产蛋',
				}, {
					operation: '抽蛋留窝',
				}, {
					operation: '放仔',
				}, {
					operation: '异常',
				}],
				site_id: 1,
				// 全屏选型卡
				current: 0,
				swiperCurrent: 0,
				// 当前页面显示的子组件
				currentComponent: 'AdLay'
			};
		},
		watch:{
			site_id(newValue,oldValue){
				// 除了当前组件的其他组件在点击时重新挂载
				this.components.filter(item => {
					if(item.id !== this.swiperCurrent){
						item.choose = false
						// console.log(item.name+'被false了')
					}
				})
			}
		},
		onPullDownRefresh() {
			this.refreshCurrentComponent()
		},
		methods: {
			// 刷新子组件
			refreshCurrentComponent(){
				switch (this.current){
					case 0:
						this.currentComponent = 'AdLay';
						break;
					case 1:
						this.currentComponent = 'AdWhipStay';
						break;
					case 2:
						this.currentComponent = 'AdPut';
						break;
					case 3:
						this.currentComponent = 'AdAbnormal';
						break;
					default:
						break;
				}
				// console.log('curr',this.currentComponent)
				this.selectComponent(`#${this.currentComponent}`).refresh()
			},
			changeTab(componentName){
				// console.log('change')
				this.currentComponent = componentName
			},
			choose(e) {
				for (let i in this.list_site) {
					// console.log(i)
					this.list_site[i].handle = false
				}
				this.list_site[e.id - 1].handle = true
				this.site_id = e.id
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.components[index].choose = true
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
				this.swiperCurrent = current  ;
				this.current = current;
				this.components[current].choose = true
			},
			// scroll-view到底部加载更多
			onreachBottom() {

			},
			toReadNFC(){
				uni.setStorageSync('control','历史操作')
				uni.navigateTo({
					url: '/pages/readNFC/readNFC'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		background-color: #E8F2FC;
	}

	.choose_bg {
		background-color: #9EB8E3;
	}

	.tab {
		display: flex;
		position: sticky;
		top: 0;
		justify-content: space-evenly;
		align-items: center;
		height: 10vh;
		background-color: #fff;

		span {
			width: 132rpx;
			height: 54rpx;
			text-align: center;
			line-height: 54rpx;
			border-radius: 10rpx;
			font-weight: bold;
			font-size: 32rpx
		}
	}
	
	.more{
		width: 50%;
		height: 80rpx;
		margin: 0 auto;
		text-align: center;
		line-height: 80rpx;
		font-size: 40rpx;
		// font-weight: bold;
		background-color: #FF8B33;
		color: #fff;
		position: fixed;
		bottom: 120rpx;
		left: 50%;
		transform: translate(-50%);
		border-radius: 26px;
	}
</style>