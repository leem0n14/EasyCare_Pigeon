import { reqWarnList,reqPostWarnList } from '@/api/index.js';
// import { reqPCWarnList } from '@/api/index.js';

const state = {
  egg_warn_list: [],
  total: '',
  isLoading: true,
};

const mutations = {
  GET_WARN_LIST(state, val) {
    state.egg_warn_list = val;
    state.isLoading = false;
  },
  GET_TOTAL(state, val) {
    state.total = val;
    state.isLoading = false;
  },
  SET_LOADING(state, val) {
    state.isLoading = val;
  },
};
const actions = {
	async getWarnList({ commit }, params) {
		commit('SET_LOADING', true);
		const res = await reqWarnList(params);
		if (res.code === 200) {
			commit('GET_WARN_LIST', res.warnEggs);
			commit('GET_TOTAL', res.totalCount);
			commit('SET_LOADING', false);
			console.log(res);
		}
	},
};

// const actions = {
// 	async getWarnList({ commit }, params) {
// 		commit('SET_LOADING', true);
// 		const res = await reqPCWarnList(params);
// 			commit('GET_WARN_LIST', res.warnEggs);
// 			// commit('GET_TOTAL', res.totalCount);
// 			commit('SET_LOADING', false);
// 			console.log('aaaaaaaa',res.warnEggs);
// 	},
// };

// async function getWarnList({ commit }, params) {
//   commit('SET_LOADING', true);
//   try {
//     const res = await reqPCWarnList(params);
//     if (res.code === 200) {
//       commit('GET_WARN_LIST', res.warnEggs);
//       // commit('GET_TOTAL', res.totalCount); // 如果需要获取总数，取消注释并确保后端返回这个数据
//       commit('SET_LOADING', false);
//       console.log('aaaaaaaa', res.warnEggs);
//     } else {
//       console.log('Error or unexpected response:', res);
//     }
//   } catch (error) {
//     console.error('Request failed:', error);
//   }
// };

export default {
  state,
  mutations,
  actions
  // actions: {
  //   getWarnList, // 引用上面定义的异步函数
  // },
};