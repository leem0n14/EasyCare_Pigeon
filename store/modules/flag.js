const state = {
	showFor: false,
	open: false,
};

const mutations = {
	SETSHOWFOR(state, val) {
		state.showFor = val;
	},
	SETOPEN(state, val) {
		state.open = val;
	},
};
export default {
	state,
	mutations,
};
