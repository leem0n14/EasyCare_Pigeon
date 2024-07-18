<!-- =============================== -->
<!-- =============================== -->
<!-- ===========查蛋界面============== -->
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
				<view class="box" v-for="(item,index) in cageStatu" :key="index">
					<view class="li">
						<template v-if="index < 3">
							<view class="list_left" @tap="submit(item)" @longpress="longPress(item)"
								@touchend="tounchend" :class="setStyle(item.statu) ? 'ycd' : 'other'">
								<view class="img">{{item.cage_id}}</view>
								<view class="statu">{{item.statu}}</view>
							</view>
							<view class="list_right1 column-around ml5">
								<span v-for="(ite,index1) in layTime.length > 0 ? layTime[index].time : []"
									:key="index1" :class="ite.statu">
									{{formatting(ite.egg_time)}}
									<template v-if="ite.statu === 'line-bottom'">留</template>
									<template v-if="ite.statu === 'single'">单</template>
									<template v-if="ite.statu === 'spermatozonia'">光</template>
									<template v-if="ite.statu === 'breakage'">破损</template>
									<template v-if="ite.statu === 'abandon'">弃仔</template>
									<template v-if="ite.statu === 'discard'">弃孵</template>
									<template v-if="ite.statu === 'death_old=1'">种鸽死亡1</template>
									<template v-if="ite.statu === 'death_old=2'">种鸽死亡2</template>
									<template v-if="ite.statu === 'death_young=1'">雏鸽死亡1</template>
									<template v-if="ite.statu === 'death_young=2'">雏鸽死亡2</template>
									<template v-if="ite.statu === 'death_young=3'">雏鸽死亡3</template>
									<template v-if="ite.statu === 'death_young=4'">雏鸽死亡4</template>
								</span>
							</view>
						</template>
						<template v-else>
							<view class="list_right2 column-around mr5">
								<span v-for="(ite,index) in layTime.length > 0 ? layTime[index].time : []" :key="index"
									:class="ite.statu">{{formatting(ite.egg_time)}}
									<template v-if="ite.statu === 'line-bottom'">留</template>
									<template v-if="ite.statu === 'single'">单</template>
									<template v-if="ite.statu === 'spermatozonia'">光</template>
									<template v-if="ite.statu === 'breakage'">破损</template>
									<template v-if="ite.statu === 'abandon'">弃仔</template>
									<template v-if="ite.statu === 'discard'">弃孵</template>
									<template v-if="ite.statu === 'death_old=1'">种鸽死亡1</template>
									<template v-if="ite.statu === 'death_old=2'">种鸽死亡2</template>
									<template v-if="ite.statu === 'death_young=1'">雏鸽死亡1</template>
									<template v-if="ite.statu === 'death_young=2'">雏鸽死亡2</template>
									<template v-if="ite.statu === 'death_young=3'">雏鸽死亡3</template>
									<template v-if="ite.statu === 'death_young=4'">雏鸽死亡4</template>
								</span>
							</view>
							<view class="list_left" @tap="submit(item)" @longpress="longPress(item)"
								@touchend="tounchend" :class="setStyle(item.statu) ? 'ycd' : 'other'">
								<view class="img">{{item.cage_id}}</view>
								<view class="statu">{{item.statu}}</view>
							</view>
						</template>
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
		mapGetters,
		mapActions
	} from 'vuex'
	import {
		reqLayeggs,
		reqWhipEggs,
		reqGetStatu,
		reqGetHouseId,
		reqLiuwo,
		reqDelInfo,
		reqDelStay
	} from '@/api/index.js'
	import {
		getNowDate
	} from '@/getTime.js'
	import {
		debounce
	} from '@/utils/debounce.js'
	export default {
		// props: ['houseId'],
		data() {
			return {
				tipList: [],
				num: [],
				baseFormData: {
					siteId: '',
					houseId: '',
					cageId: '',
					cageStatu: '预抽蛋',
					eggTime: ''
				},
				show: false,
				content: '确认操作吗？',
				// 判断用户是双击还是单击
				clickNum: '',
				lastTime: 0,
				msg: '',
				type: '',
				// 定时器
				timer: null,
				// 判断是长按还是单击
				islongPress: false,
				// 预抽蛋错误信息的id
				id: 0,
				// 留窝错误信息的id
				stayId: 0,
				eggId: 0,
				// cage_id:'',
				// 防抖留窝请求
				// decounceLiu:debounce(()=>{this.liuwo()},400),
				debounceFun: debounce(() => {
					this.getDate()
				}, 200)
			}
		},
		mounted() {
			this.getStatu()
			this.getDate()
		},
		onPullDownRefresh() {
			this.getDate()
		},
		computed: {
			...mapGetters(['nfcId', 'show_nfcId', 'cageStatu', 'loading', 'lastCageStatu', 'whipCount', 'stayCount',
				'cageId', 'layTime'
			])
		},
		watch: {
			// 监听当前的nfcId，一旦改变就重新获取鸽笼状态
			async nfcId(newValue, oldValue) {
				console.log('watch监听')
				if (oldValue !== newValue) {
					await this.debounceFun()
				}
			},

		},
		methods: {
			// 抽蛋或留窝样式
			setStyle(str) {
				if (str === '抽蛋' || str === '留窝') {
					return true;
				} else return false;
			},
			// 获取查蛋页面中的时间
			async getDate() {
				// 在请求未完成前不渲染相关页面
				this.showFor = true
				const obj = {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId,
					twoOrSix: 3
				}
				this.$store.dispatch('getDate', obj);
			},
			formatting(dateStr) {
				return dateStr.substring(5, 10);
			},
			// 获取鸽笼状态
			async getStatu() {
				console.log('旧的状态', this.cageStatu)
				// 获取新的状态之前先将之前的状态存储起来
				this.$store.commit('SETLASTSTATU', this.cageStatu)
				console.log('存储到仓库的状态', this.lastCageStatu)
				const obj = {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId,
				}
				console.log('获取鸽笼状态')
				this.$store.dispatch('getStatu', obj)
			},
			// 进行查蛋
			async layEggs(cageId) {
				console.log('单击')
				// 赋值给cageId
				this.baseFormData.siteId = uni.getStorageSync('siteId')
				this.baseFormData.houseId = this.nfcId
				this.baseFormData.cageId = cageId
				this.baseFormData.eggTime = getNowDate()
				this.$loading()
				console.log(this.baseFormData)
				await reqLayeggs(this.baseFormData).then((data) => {
					console.log('data in layEggs', data)
					if (data.code == 200) {
						this.$refs.uToast.show({
							title: '查蛋成功',
							type: 'success',
							duration: '800',
							position: 'top'
						})
						this.id = data.id
						this.getStatu()
						this.getDate()
						this.getPR()
					} else {
						this.$refs.uToast.show({
							title: data.msg,
							type: 'warning',
							duration: '900',
							position: 'top'
						})
					}
				}).catch(() => {
					this.$refs.uToast.show({
						title: data.msg,
						type: 'error',
						duration: '900',
						position: 'top'
					})
				}).finally(() => {
					this.$hide()
				})
			},
			// 进行留窝
			async liuwo(cageId) {
				console.log('双击')
				this.$loading()
				const obj = {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId,
					cageId,
					cageStatu: '留窝',
					stayTime: getNowDate()
				}
				let res = await reqLiuwo(obj)
				console.log('res', res)
				if (res.code === 200) {
					this.getStatu()
					this.getDate()
					this.getPR()
					this.stay()
					this.stayId = res.stayId
					this.eggId = res.eggId
				}
				this.$hide()
				this.$refs.uToast.show({
					title: res.msg,
					type: res.type,
					duration: '800',
					position: 'top'
				})
			},
			// 进行抽蛋
			async whipEggs(cageId) {
				console.log(uni.getStorageSync('siteId'))
				console.log('单击')
				// this.$loading()
				const obj = {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId,
					cageId,
					cageStatu: '抽蛋',
					whippingTime: getNowDate()
				}
				console.log(obj)
				let res = await reqWhipEggs(obj)
				// 请求成功则更新日期和状态
				if (res.code === 200) {
					this.getDate()
					this.getStatu()
					this.getPR()
					this.whip()
				}
				// this.$hide()
				// 最终请求结果展示
				this.$refs.uToast.show({
					title: res.msg,
					type: res.type,
					duration: '800',
					position: 'top'
				})
				// this.$hide()
			},
			// 取消预抽蛋操作
			async cancel(item) {
				let ite = this.lastCageStatu.filter(ite => ite.cage_id === item.cage_id)
				console.log('ite', ite)
				const obj = {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId,
					cageId: item.cage_id,
					cageStatu: ite[0].statu,
					id: this.id
				}
				console.log('obj', obj)
				let res = await reqDelInfo(obj)
				console.log('res in cancel', res)
				if (res.code === 200) {
					this.id = 0
					this.getStatu()
					this.getDate()
				}
				this.$refs.uToast.show({
					title: res.msg,
					type: res.type,
					duration: '800',
					position: 'top'
				})
			},
			// 取消留窝操作
			async cancelLiu(item) {
				let ite = this.lastCageStatu.filter(ite => ite.cage_id === item.cage_id)
				console.log('ite', ite)
				const obj = {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId,
					cageId: item.cage_id,
					cageStatu: ite[0].statu,
					eggId: this.eggId,
					stayId: this.stayId
				}
				let res = await reqDelStay(obj)
				if (res.code === 200) {
					this.eggId = 0
					this.stayId = 0
					this.getStatu()
					this.getDate()
					this.getPR()
					this.withdraw()
				}
				this.$refs.uToast.show({
					title: res.msg,
					type: res.type,
					duration: '800',
					position: 'top'
				})
			},
			
			
			// 长按鸽笼时
			longPress(item) {
				console.log('长按事件')
				this.islongPress = true
				if (item.statu === '预抽蛋')
					this.cancel(item)
				else if (item.statu === '留窝')
					this.cancelLiu(item)
			},
			// 点击结束后将islongPress置为false，等待下一次操作
			tounchend() {
				setTimeout(() => {
					this.islongPress = false
				}, 200)
			},
			// 单击或双击鸽笼时
			submit(item) {
				this.cage_id = item.cage_id
				if (this.islongPress === false) {
					let _this = this
					let curTime = new Date().getTime()
					let lastTime = this.lastTime
					_this.lastTime = curTime
					let diff = curTime - lastTime;
					console.log('diff', diff)
					// 双击
					if (diff < 300) {
						if (item.statu !== '留窝') {
							// this.decounceLiu()
							this.liuwo(item.cage_id)
							clearTimeout(_this.timer)
						} else {
							clearTimeout(_this.timer)
							this.$refs.uToast.show({
								title: '当前已是留窝状态',
								type: 'warning',
								duration: '800',
								position: 'top'
							})
						}
					} else {
						_this.timer = setTimeout(() => {
							this.whipEggs(item.cage_id)
						}, 300)
					}
				}

			},
			// 获取当天留窝抽蛋比例
			getPR() {
				if (uni.getStorageSync('siteId')) {
					console.log('有site')
					const obj = {
						site_id: uni.getStorageSync('siteId')
					}
					this.$store.dispatch('getEWPR', obj)
				}
			},
			toExp() {
				uni.navigateTo({
					url: '/pages/expection/expection'
				})
			},
			
			//创建音频实例
			createAudio(audioSrc){
				this.innerAudioContext = uni.createInnerAudioContext(); //创建播放器对象
				this.innerAudioContext.src = audioSrc;//生成的mp3音频文件地址
				this.innerAudioContext.play();//执行播放
				this.innerAudioContext.onEnded(() => {
					//播放结束
					this.innerAudioContext = null;
					this.innerAudioContext.destroy();
				});
				this.innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				})
			},
			
			//抽蛋音频播报
			whip(){
				this.createAudio('../../static/audio/whip.mp3');
			},
			//留窝音频播报
			stay(){
				this.createAudio('../../static/audio/stay.mp3');
			},
			// 撤回音频播报
			withdraw(){
				this.createAudio('../.././static/audio/withdraw.mp3');
			}
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	@import 'styles/builder.scss';

	.ycd {
		color: #dbe2f1;
		background-color: #89a5d6;

	}

	.other {
		color: #89a5d6;
		background-color: #dbe2f1;
	}

	.houseId {
		width: 100%;
		margin: 10rpx auto;
		padding: 18.12rpx 18.12rpx;
		font-size: 39.86rpx;
		// 删了下面这个
		// border-radius: 14.49rpx;
		color: #fff;
		background-color: #7d9ad2;

	}

	.control {
		width: 50%;
		margin: 0 auto;
		font-size: 39.86rpx;
		font-weight: 700;
		color: #2979ff;
		padding: 18.12rpx 18.12rpx;
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
			justify-content: center;
			align-content: center;
			width: 100%;
			height: 70%;
			flex-wrap: wrap;
			margin-top: 20rpx;
			font-family: 'ExpectionNumber';
			

			.box {
				display: flex;
				width: 40%;
				height: 30%;
				justify-content: space-between;
				align-items: center;
				margin: 0 5rpx;
			}
			.li {
				display: flex;
				// width: 90%;
				justify-content: space-around;
				// margin: 57.97rpx 90.58rpx;
				text-align: center;
				align-items: center;


				.list_left {
					position: relative;
					width: 125rpx;
					height: 125rpx;
					// box-shadow: 0 0 10rpx gray;
					list-style: none;
					// box-shadow: 10px 10px 20px 10px #d7dfef;
					box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
					// border-radius: 36.23rpx;
					border-radius: 20rpx;


					.img,
					.statu {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						// font-family: 'ShowcardGothic';
					}

					.img {
						height: 70%;
						top: -50%;
						font-size: 80rpx;
						font-weight: bold;
					}

					.statu {
						height: 30%;
						bottom: 20rpx;
						left: 50%;
						font-size: 20rpx;
						font-weight: 700;
					}
				}



				.list_right1,
				.list_right2 {
					width: 100rpx;
					height: 186.59rpx;
					

				}

				.list_right1 {
					align-items: flex-start;
				}

				.list_right2 {
					align-items: flex-end;
				}

				span {
					margin-top: 10rpx;
					font-weight: normal;
					color: #a8a8a7;
					font-size: 18rpx
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
	}

	@keyframes scale {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(0.75);
		}

		100% {
			transform: scale(1);
		}
	}


</style>