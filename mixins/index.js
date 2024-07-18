import {
	reqDelCageHis,
	reqGetHouseId,
	reqLiuwo,
	reqWhipEggs,
} from '@/api/index.js';
import {
	mapGetters,
} from 'vuex';
import {
	getNowDate,
} from '@/getTime.js';
export default {
	computed: {
		...mapGetters(['cageStatu', 'layTime']),
	},
	methods: {
		loading: (title) => {
			uni.showLoading({
				title,
				mask: true,
			});
		},
		hideLoading: () => {
			uni.hideLoading();
		},
		whipEggs(cageId) {
			// console.log(uni.getStorageSync('siteId'));
			// console.log('单击');
			// this.$loading()
			const obj = {
				siteId: uni.getStorageSync('siteId'),
				houseId: this.nfcId,
				cageId,
				cageStatu: '抽蛋',
				whippingTime: getNowDate(),
			};
			return new Promise((resolve) => {
				reqWhipEggs(obj).then((resp) => {
					resolve(resp);
				});
			});
		},
		liuwo(cageId) {
			console.log('双击');
			this.$loading();
			const obj = {
				siteId: uni.getStorageSync('siteId'),
				houseId: this.nfcId,
				cageId,
				cageStatu: '留窝',
				stayTime: getNowDate(),
			};
			return new Promise((resolve) => {
				reqLiuwo(obj).then((resp) => {
					resolve(resp);
					this.hideLoading();
				});
			});
		},
		fallback(cageId) {
			const timeObj = this.findTime(cageId);
			if (!timeObj) {
				uni.showToast({
					title: '当前没有可删除的操作',
					icon: 'none',
				});
				return;
			}
			this.$loading();
			const params = {
				siteId: uni.getStorageSync('siteId'),
				houseId: this.nfcId,
				cageId,
				operation: this.findCageStatu(timeObj.statu),
				time: timeObj.egg_time,
			};
			return new Promise((resolve) => {
				reqDelCageHis(params).then((resp) => {
					resolve(resp);
					this.hideLoading();
				});
			});
		},
		findCageStatu(statuStr) {
			if (statuStr === 'line-bottom') {
				return 'stay';
			} else if (statuStr === 'line-through') {
				return 'whipping';
			}
		},
		findTime(cageId) {
			for (let i = 0; i < this.layTime.length; i++) {
				if (this.layTime[i].cage_id === cageId) {
					if (this.layTime[i].time.length > 0) {
						const timeArr = this.layTime[i].time;
						return timeArr[timeArr.length - 1];
					}
				}
			}
			return false;
		},
		getPR() {
			if (uni.getStorageSync('siteId')) {
				// console.log('有site');
				const obj = {
					site_id: uni.getStorageSync('siteId'),
				};
				this.$store.dispatch('getEWPR', obj);
			}
		},
		async getHouseId() {
			const houseId = {
				houseId: this.nfcId,
			};
			const result = await reqGetHouseId(houseId);
			if (result.code === 200) {
				uni.hideLoading();
				// console.log('code === 200');
				// 存储映射后的nfcId，用于页面展示
				
				this.$store.commit('SHOWNFC', result.houseId);
				// console.log('store', vm.$store.state.NFC.nfcId);
				// console.log('store.nfcId:', this.nfcId);
				return new Promise((resolve) => {
					resolve({
						msg: 'success',
						nfcId: this.nfcId,
					});
				});
			} else {
				uni.showToast({  
					title: result.msg,
					icon: 'none',
				});
				uni.hideLoading();
			}
		},
	},
};
