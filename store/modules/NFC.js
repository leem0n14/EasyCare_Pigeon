const state = {
	// nfcId: '397FED6B',
	// nfcId: '6BBE79B9',
	// nfcId: 'D55E7778',
	// nfcId: 'D583CF78',
	nfcId: '1149ad2e',
	// nfcId: 'a9dcee6b',
	
	// nfcId:'',
	// nfcId: '4115772e',
	Control: '',
	isShow: '',
};
const mutations = {
	SETNFC(state, val) {
		state.nfcId = '';
		state.nfcId = val;
	},
	GETCONTROL(state, val) {
		state.Control = val;
	},
	SETISSHOW(state, val) {
		state.isShow = val;
	},
};

export default {
	state,
	mutations,
};
