import { reqGetDate } from '@/api/index.js';
const state = {
	layTime: [],
};
const mutations = {
	GETDATE(state, val) {
		state.layTime = val;
	},
};
const actions = {
	async getDate({ commit }, val) {
		const res = await reqGetDate(val);
		if (res.code === 200) {
			commit('GETDATE', res.eggs);
			console.log('获取查蛋时间');
			uni.stopPullDownRefresh();
		}
	},
};

export default {
	state,
	mutations,
	actions,
};
