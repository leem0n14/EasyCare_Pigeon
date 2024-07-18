const state = {
	operation: '',
};
const mutations = {
	SETOPERATION(state, val) {
		state.operation = val;
		console.log('operation', state.operation);
	},
};

export default {
	state,
	mutations,
};
