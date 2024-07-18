<template>
	<view>
		<component :is="operation" ref='operation'></component>
		<!-- <CagenumberLay v-if="operation === '查蛋'" :houseId="nfcId" ref="lay"></CagenumberLay>
		<CagenumberWhip v-else-if="operation === '抽蛋'" :houseId="nfcId" ref="whip"></CagenumberWhip>
		<CagenumberPut v-else-if="operation === '放仔'" :houseId="nfcId" ref="put"></CagenumberPut>
		<CagenumberFeed v-else-if="operation === '调仔'" :houseId="nfcId" ref="feed"></CagenumberFeed>
		<ExpectionHandle v-else-if="operation === '异常处理'" :houseId="nfcId" ref="handle"></ExpectionHandle> -->
	</view>
</template>

<script>
	import {
		reqHouseId,
		reqGetStatu,
		reqGetHouseId
	} from '@/api/index.js'
	import {
		mapGetters
	} from 'vuex'
	import {
		debounce
	} from '@/utils/debounce.js'
	import CagenumberLay from '@/pages/cagenumber-layEggs/cagenumber-layEggs.vue'
	import CagenumberWhip from '@/pages/cagenumber-whipEggs/cagenumber-whipEggs.vue'
	import CagenumberPut from '@/pages/cagenumber-putEggs/cagenumber-putEggs.vue'
	import CagenumberFeed from '@/pages/cagenumber-feedbirds/cagenumber-feedbirds.vue'
	import Expection from '@/pages/expection/expection.vue'
	import ExpectionHandle from '@/pages/expectionHandle/expectionHandle.vue'
	import AdHistory from '@/pages/ad-history/ad-history.vue'
	import AdDetail from '@/pages/ad-detail/ad-detail.vue'
	import Administrator from '../administrator/administrator.vue';
	import Warning from '@/pages/warning/warning.vue'
	import Putlist from '@/pages/putList/putList.vue'
	import Operation from '@/pages/index/index.vue'
	import HouseChange from '@/pages/house-change/house-change.vue'
	// import siteNumberAdd from '@/pages/siteNumberAdd/siteNumberAdd.vue'
	// import empNumberAdd from '@/pages/empNumberAdd/empNumberAdd.vue'
	
	// 引入串口读取插件
	// const serialPort = uni.requireNativePlugin('dodo-uniplugin-usbSerialPort')
	export default {
		components: {
			CagenumberLay,
			CagenumberWhip,
			CagenumberPut,
			CagenumberFeed,
			Expection,
			ExpectionHandle,
			AdHistory,
			AdDetail,
			Administrator,
			Warning,
			Putlist,
			HouseChange,
			// siteNumberAdd,
			// empNumberAdd
		},
		data() {
			return {
				formData: {
					siteId: '',
					houseId: ''
				},
				show: true,
				control: '',
				loading: true,
				debounceGetStatu: debounce(() => {
					this.getStatu()
				}, 200),
				debounceGetNFC: debounce(() => {
					this.nfcFn4()
				})
			}
		},
		async onLoad() {
			this.control = uni.getStorageSync('control')
			// if(this.open === false){
			// await this.initUsbSerialPort()
			// await this.Open()
			console.log('onLoad')
			// }
		},
		computed: {
			...mapGetters(['isShow', 'cageStatu', 'requests', 'open', 'operation','nfcId'])
		},
		methods: {
			// async nfcFn4() {
			// 	return new Promise((resolve, reject) => {
			// 		const success = (data) => {
			// 			console.log('success', data);
			// 			// this.testNFC(data)
			// 			resolve({
			// 				msg: 'success',
			// 				nfcId: data,
			// 				isShow: false
			// 			});
			// 			console.log('返回了promise')
			// 			// resolve(data)
			// 		};
			// 		const fail = (err) => {
			// 			console.log('fail', err);
			// 			reject({
			// 				msg: 'error',
			// 				errMsg: err,
			// 			});
			// 			// reject(err)
			// 		};
			// 		const complete = () => {
			// 			console.log('?');
			// 		};
			// 		nfc4.nfcGetId({
			// 			success,
			// 			fail,
			// 			complete,
			// 		});
			// 	});
			// },
			// async testNFC() {
			// 	const res = await this.nfcFn4();
			// 	console.log('res', res)
			// 	if (res.msg === 'success') {
			// 		this.show = res.isShow
			// 		console.log('一开始的nfcId', this.nfcId)
			// 		const nfcId = res.nfcId.toString();
			// 		this.nfcId = nfcId
			// 		this.$store.commit('SETNFC', nfcId);
			// 		console.log('setnfc传递的nfcId', nfcId);
			// 		console.log('setnfc之后的nfcId,从仓库获取', this.nfcId);
			// 		return new Promise(resolve => {
			// 			resolve({
			// 				msg: '读取成功',
			// 				nfcId: nfcId,
			// 				// 不显示nfc页面
			// 				// isShow: false
			// 			})
			// 		})
			// 	} else if (res.msg === 'error') {
			// 		uni.showToast({
			// 			title: `读取失败:${res.errMsg}`,
			// 			icon: 'none',
			// 		});
			// 	} else if (res.msg === 'complete') {}
			// }
		}
	}
</script>

<style lang="scss" scoped>
</style>