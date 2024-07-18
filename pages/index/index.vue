<template>
	<view class="row-around">
		<view class="left">
			<scroll-view scroll-y="true" style="height: 100vh;">
				<Operation></Operation>
			</scroll-view>	
		</view>
		<view class="right">
			<view class="serialport_container">
				<button @click="CONNECT">连接设备</button>
			</view>
			
			<!-- //右侧界面 -->
			<read-nfc></read-nfc>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
	import Operation from '@/pages/operation/operation.vue'
	import ReadNfc from '@/pages/readNFC/readNFC.vue'
	import {
		mapGetters
	} from 'vuex'
	import {
		debounce
	} from '@/utils/debounce.js'
	import {
		format
	} from '@/utils/format_HouseId.js'
	import {
		reqGetStatu
	} from '@/api/index.js'
	import mixin from '@/mixins/index.js'
	// 引入串口读取插件
	const serialPort = uni.requireNativePlugin('dodo-uniplugin-usbSerialPort')
	export default {
		mixins: [mixin],
		components: {
			Operation,
			ReadNfc
		},
		data() {
			return {
				nfcId: '',
				timer: null,
				debounceGetStatu: debounce(() => {
					this.getStatu()
				}, 200),
				// path: '/dev/bus/usb/001/003'
				path: '',
				// 判断连接成功与否
				connect: false
			}
		},
		async onLoad() {
			checkUpdate()
			this.$store.commit('SETOPERATION', 'CagenumberLay');
			// 加了这个
			// this.nfcId = '3EBBF5D5'
			this.nfcId='1149ad2e',
			setTimeout(async () => {
				// await this.serialPortStatus ();
				await this.initUsbSerialPort();
				// await this.Open();
			}, 3000)
		},
		onUnload() {
			this.Close();
		},
		onPullDownRefresh() {},
		computed: {
			...mapGetters(['operation'])
		},
		watch: {
			nfcId(newValue, oldValue) {
				if (newValue !== oldValue) {
					// console.log('监听到前后值不一样，发送请求')
					this.debounceGetStatu()
					this.getPR()
				}
			}
		},
		methods: {
			// 连接外接设备
			CONNECT() {
				this.initUsbSerialPort();
			},
			getPR() {
				if (uni.getStorageSync('siteId')) {
					// console.log('有site')
					const obj = {
						site_id: uni.getStorageSync('siteId')
					}
					this.$store.dispatch('getEWPR', obj)
				}
			},
			getStatu() {
				this.loading = true
				// this.$store.commit('SETLOADING', true);
				// 每次更改状态，把上次的状态保存起来
				this.$store.commit('SETLASTSTATU', this.cageStatu)
				// console.log('下一步发送请求')
				const obj = {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId
				}
				console.log(obj)
				reqGetStatu(obj).then(data => {
					if (data.code === 200) {
						this.$store.commit('GETSTATU', data.statu);
						// console.log('data', data)
						// console.log('cageStatu', data.statu)
						// 将转换成为x-xx格式
						// data.houseId
						
						const houseId = format(data.houseId, parseInt(uni.getStorageSync('siteId')))
						
						// console.log('转换为', houseId);
						this.$store.commit('SHOWNFC', houseId);
						// console.log('返回的houseId', data.houseId);
						this.$store.commit('SETLOADING', false)
					}
				}).catch(() => {
					uni.showToast({
						title: '失败了，请再试一次',
						icon: 'none',
						duration: 1500
					})
					// 避免网络断开时偶发本地留有状态的情况
					this.$store.commit('GETSTATU', [])
				}).finally(() => {
					this.loading = false;
					uni.stopPullDownRefresh();
				})
			},
			dispatch() {
				this.$store.dispatch('getDate', {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId,
					twoOrSix: 3
				})
				this.$store.dispatch('getStatu', {
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId
				})
				this.$store.dispatch('getEWPR', {
					site_id: uni.getStorageSync('siteId')
				})
			},
			 
			// 串口初始化
			initUsbSerialPort() {
				this.connect = false;
				serialPort.initSerialPort("usb", (res) => {
					if (res?.list.length) {
						console.log(res.list)
						if (this.path === res.list[0] && this.connect === true) {
							uni.showToast({
								title: '设备已连接',
								icon: 'none'
							})
							uni.stopPullDownRefresh()
						} else {
							this.path = res.list[0]
							this.Open()
						}
					} else {
						uni.showToast({
							title: '未插入设备',
							icon: 'none'
						})
						this.connect = false
						uni.stopPullDownRefresh()
					}
				})
			},
			// 关闭
			Close() {
				serialPort.serialPortCloseAll(res => {
					// console.log('close', res)
					this.open = false
				})
			},
			// 打开
			Open() {
				uni.showLoading({
					title: '正在连接NFC外接读取...',
					icon: 'none'
				})
				// let path = '/dev/bus/usb/001/003'
				let path = this.path
				serialPort.openSerialPort(path, res => {
					if (res.success) {
						setTimeout(() => {
							this.setSerialPort() //在打开串口后需要设置串口参数
						}, 1000)
					}
				})
			},
			// // 设置串口
			setSerialPort() {
				let params = {
					path: this.path,
					baudRate: '9600', // 波特率 
					parity: '0', // 校验位:：0(不校验)、1(奇校验)、2(偶校验)
					dataBits: '8', //  数据位:5，6，7，8
					stopBits: '1', // 停止位:1、2
					flowCon: '0', // 流控:0(不使用流控)、1(使用流控)
				}
				serialPort.setSerialPort(...Object.values(params), (res) => {
					if (res.success) {
						setTimeout(() => {
							this.onListenerHex() //设置串口成功后即可开始监听串口数据
							uni.showToast({
								title: '连接成功!',
								icon: 'success'
							})
							this.connect = true
						}, 500)
					}
				})
			},
			
			// // 监听 接收数据
			onListenerHex() {
				uni.hideLoading()
				// 以十六进制返回  onSerialPortDataListenerHex 
				// let path = '/dev/bus/usb/001/002'
				let path = this.path
				serialPort.onSerialPortDataListenerHex(path, receive => {
					//监听接收数据 
					// console.log('接收：' + receive);
					const nfcId = receive.toString();
					if (nfcId.substring(0, 6) === '000fff') {
						this.nfcId = nfcId.substring(6, nfcId.length);
						this.$store.commit('SETNFC', nfcId.substring(6, nfcId.length));
						this.show = false;
						// this.$store.commit('SETOPERATION', 'CagenumberLay');
					} else if (nfcId.substring(0, 6) === 'fff000' && this.operation === 'CagenumberLay') {
						// this.$refs.operation.$refs.operation.layEggs(Number(nfcId.substring(6,nfcId.length)))
						const cageId = Number(nfcId.substring(6, nfcId.length))
						if (cageId <= 6) {
							this.whipEggs(cageId).then(data => {
								// console.log('抽蛋res', data)
								// console.log('抽蛋rescode', data.code)
								if (data.code === 200) {
									this.dispatch()
									this.whip()
								}
								this.$refs.uToast.show({
									title: data.msg,
									type: data.type,
									duration: '800',
									position: 'top'
								})
							})
							// this.whip();
						}
						// if (cageId == 1) {

						// }
					} else if (nfcId.substring(0, 6) === 'ffff00' && this.operation === 'CagenumberLay') {
						const cageId = Number(nfcId.substring(nfcId.length - 1, nfcId.length))
						if (cageId <= 6) {
							this.liuwo(cageId).then(data => {
								if (data.code === 200) {
									this.dispatch()
									this.stay()
								}
								this.$refs.uToast.show({
									title: data.msg,
									type: data.type,
									duration: '800',
									position: 'top'
								})
							})
						}
					} else if (nfcId.substring(0, 6) === 'fffff0' && this.operation === 'CagenumberLay') {
						const cageId = Number(nfcId.substring(nfcId.length - 1, nfcId.length))
						if (cageId <= 6) {
							this.fallback(cageId).then(resp => {
								if(resp.code === 200){
									this.dispatch();
									this.withdraw()
								}
								this.$refs.uToast.show({
									title: resp.msg,
									type: resp.type,
									duration: '800',
									position: 'top'
								})
							})
						}
					}
				})
			},
			// // 获取串口信息
			getAllDeicesPath() {
				serialPort.getAllDeicesPath((res) => {
					this.res = res
					if (res?.list) {
						reactiveData.serialportList = res.list.map((iMap) => {
							let item = {}
							item.path = iMap
							item.baudRate = '9600' // 波特率
							item.parity = '0' // 校验位:：0(不校验)、1(奇校验)、2(偶校验)
							item.dataBits = '8' //  数据位:5，6，7，8
							item.stopBits = '1' // 停止位:1、2
							item.flowCon = '0' // 流控:0(不使用流控)、1(硬件流控RTS/CTS)、2(软件流控XON/XOFF)
							item.sendStr = '87654321'
							item.open = false //串口打开状态
							return item
						})
					}
				})
			},
			// // 查看串口状态
			serialPortStatus(path) {
				serialPort.serialPortState(path, (res) => {
					if (res?.success) {
						this.path = path
						uni.showToast({
							icon: 'none',
							title: `串口[${path}]已打开`,
							duration: 2000
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: `串口[${path}]未打开`,
							duration: 2000
						});
					}
				})
			},
			
			//创建音频实例
			createAudio(audioSrc){
				this.innerAudioContext = uni.createInnerAudioContext(); //创建播放器对象
				this.innerAudioContext.src = audioSrc;//生成的mp3音频文件地址
				this.innerAudioContext.play();//执行播放
				this.innerAudioContext.onEnded(() => {
					//播放结束
					this.innerAudioContext.destroy();
					this.innerAudioContext = null;
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
	page {
		background-color: #fff;
	}

	.left {
		width: 30%;
		height: 100vh;
		border-right: 1px solid #E8F2FC;
	}

	.right {
		width: 70%;
		height: 100vh;
		margin-top: 9.17rpx;

		.serialport_container {
			width: 100%;
			height: 45.87rpx;
			position: relative;

			button {
				width: 91.74rpx;
				height: 100%;
				position: absolute;
				right: 12.84rpx;
				color: #fff;
				font-size: 20.18rpx;
				line-height: 45.87rpx;
				background-color: #19be6b;
				font-weight: bold;
			}
		}
	}
</style>