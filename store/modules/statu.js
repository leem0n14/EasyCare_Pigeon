import {
	reqGetStatu,
} from '@/api/index.js';
const state = {
	cageStatu: [],
	isNet: '',
	show_nfcId: '',
	lastCageStatu: [],
};

const mutations = {
	GETSTATU(state, val) {
		state.cageStatu = val;
	},
	SETNET(state, val) {
		state.isNet = val;
	},
	SHOWNFC(state, val) {
		state.show_nfcId = val;
		console.log('val', val);
	},
	SETLASTSTATU(state, val) {
		console.log('保存上次的cageStatu');
		state.lastCageStatu = val;
	},
};

const actions = {
	async getStatu({
		commit,
	}, val) {
		const res = await reqGetStatu(val);
		console.log('获取状态的val', val);
		console.log(res.code);
		if (res.code === 200) {
			console.log('获取状态返回的数据', res);
			commit('GETSTATU', res.statu);
			// commit('SHOWNFC', res.houseId);
			// console.log('返回的houseId', res.houseId);
			commit('SETLOADING', false);
			console.log('statu in statu of store', res.statu);
			uni.stopPullDownRefresh();
		} else if (res.code === 404) {
			uni.showToast({
				title: res.msg,
				icon: 'none',
			});
		}
	},
};

const getters = {};


export default {
	state,
	mutations,
	actions,
	getters,
};
