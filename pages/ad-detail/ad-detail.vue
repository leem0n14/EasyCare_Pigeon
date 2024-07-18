 <template>
	<view class="page">
		<view class="houseId row-center">
			{{show_nfcId ? '鸽舍号：'+ show_nfcId : '鸽舍号'}}
		</view>
		<view class="w">
			<view class="content">
				<u-tabs-swiper ref="uTabs" name="cageText" :list="list_cage" @change="tabsChange"
					:is-scroll="false" active-color="#9EB8E3" inactive-color="#303133" :current="current"
					font-size="30"></u-tabs-swiper>
				<!-- 可能可以通过不同的宽度去适配不同的设备 -->
			</view>
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="height: 70vh;"
			>
				<swiper-item class="swiper-item" v-for="(i,index) in list_cage" :key="index">
					<StatuAbnormal :cageStatu="cageStatu" :abnormal="abnormal" :oldNum="oldNum" :youngNum="youndNum" >  <!-- 传入状态和异常 -->
					</StatuAbnormal>
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
	
	import {mapGetters} from 'vuex'
	import StatuAbnormal from '@/components/StatuAbnormal/StatuAbnormal.vue'
	import {reqGetStatuAbnormal,reqCageDetail,reqGetStatu,reqStayNum} from '@/api/index.js'
	import {statuAbnormal} from '@/utils/abnormalString.js'
	export default {
		data(){
			return {
				oldNum: 0,
				youndNum:0,
				cageId: 1,
				statu: '',
				// Canghao:0,
				abnormal: [],
				list_cage: [{
					cageText: '1号'
				},{
					cageText: '2号'
				},{
					cageText: '3号'
				},{
					cageText: '4号'
				},{
					cageText: '5号'
				},{
					cageText: '6号'
				}],
				cageStatu:'',
				// 全屏选型卡
				current: 0,
				swiperCurrent: 0,
			}
		},
		watch:{
			cageId(newValue, oldValue){
				if(newValue !== oldValue){
					this.getStatuAbnormal();
					this.CageDetail();
				}
			}
		},
		mounted() {
			this.getStatuAbnormal();
			this.CageDetail();
		},
		computed:{
			...mapGetters(['show_nfcId','nfcId'])
		},
		methods:{
			
			async CageDetail(){
				const params = {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId,
				};
				// console.log(params+"121");
				let result = await reqCageDetail(params);
				console.log('result',result);
				if(result.code === 200){
					// console.log('./././././'+result);
					this.oldNum = result.cages[this.cageId-1].number;
					this.youndNum = result.cages[this.cageId-1].cub_number;
					this.cageStatu = result.cages[this.cageId - 1].statu;
				}
			},
			// async CageDetail(){
			// 	const params = {
			// 	siteId: uni.getStorageSync('siteId'),
			// 	houseId: this.nfcId
			// 	}
			// 	let result = await reqStayNum(params);
			// 	console.log('result',result);
			// 	if(result.code === 200){
			// 		// console.log(result);
			// 		this.oldNum = result.cages[this.cageId-1].oldNum;
			// 		this.youndNum = result.cages[this.cageId-1].number;
			// 	}
			// },
			
			async getStatuAbnormal(){
				const params = {
					siteId: uni.getStorageSync('siteId'),
					houseId:this.nfcId,
					cageId: this.cageId,
					// Canghao:uni.getStorageSync('canghao'),
				};
				  try{
					  let results = await reqGetStatuAbnormal(params);
					  // console.log('啊啊啊啊',result);
					  
					  // console.log('result',result);
					 console.log('@@@@@@!!!!!!@',results)
					  if (results.code === 200) {

					    this.statu = results.statu;
					    this.abnormal = results.abnormals;
						console.log('................',abnormal);
					  
					    // 定义一个包含要删除的特定值的数组
					    // single：单蛋
					    // discard：弃孵
					    // abandon：弃仔
					    // spermatozonia：光蛋
					    // breakage：破损
					  //   const valuesToRemove = ['single', 'spermatozonia', 'discard', 'abandon', 'breakage',,'death_young4','death_young3','death_young2','death_young1'];
					  
					  //   // 计算明天的日期并设置定时器
					  //   const tomorrow = new Date();
					  //   tomorrow.setDate(tomorrow.getDate() + 1);
					  //   setTimeout(() => {
					  // 	// 遍历要删除的值的数组
					  // 	valuesToRemove.forEach((value) => {
					  // 	  if (this.abnormal.includes(value)) {
					  // 		// 使用 filter 方法从数组中删除特定值
					  // 		this.abnormal = this.abnormal.filter(abnormalItem => abnormalItem !== value);
					  // 	  }
					  // 	});
					  //   }, tomorrow.getTime() - Date.now()+1000)
					  }else{
						  console.error('!!!!!!!!', results.code);
					  }
				  }catch(error){
					  console.error('55555555.', error);
				  }
			},
			
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.cageId = index + 1;
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
			},
		}
	}
</script>
<style lang="scss" scoped>
	.houseId {
		width: 100%;
		margin: 10rpx auto;
		padding: 18.12rpx 18.12rpx;
		font-size: 39.86rpx;
		border-radius: 14.49rpx;
		color: #fff;
		background-color: #7d9ad2;
	}
</style>