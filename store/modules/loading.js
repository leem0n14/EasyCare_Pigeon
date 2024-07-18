const state = {
	loading: true,
};

const mutations = {
	SETLOADING(state, val) {
		state.loading = val;
	},
};

export default {
	state,
	mutations,
};
