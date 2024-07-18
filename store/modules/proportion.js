import { reqEggAndWhipPR } from '@/api/index.js';
const state = {
	whipCount: 0,
	stayCount: 0,
};

const mutations = {
	SETWHIPCOUNT(state, val) {
		state.whipCount = val;
		console.log(state.whipCount);
	},
	SETSTAYCOUNT(state, val) {
		state.stayCount = val;
		console.log(state.stayCount);
	},
};

const actions = {
	async getEWPR({ commit }, siteId) {
		const res = await reqEggAndWhipPR(siteId);
		console.log('请求比例数据');
		// if (res.code === 200) {
			console.log('比例数据返回200');
			commit('SETWHIPCOUNT', res.whippingCount);
			commit('SETSTAYCOUNT', res.stayCount);
		// }
	},
};
export default {
	state,
	mutations,
	actions,
};
