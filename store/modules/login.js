import Cookie from '@/utils/cookie.js';

const state = {
	token: Cookie.get('ROLE') || null,
	siteId: Cookie.get('siteId') || null,
	tureToken:Cookie.get('trueToken') || null,
};
const mutations = {
	SET_TRUETOKEN(state, val) {
		state.tureToken = val;
	},
	SET_TOKEN(state, val) {
		state.token = val;
	},
	SET_SITE(state, val) {
		state.siteId = val;
	},
	REMOVE_TOKEN(state) {
		state.token = null;
	},
	REMOVE_SITE(state) {
		state.siteId = null;
	},
};
const actions = {};

export default {
	state,
	mutations,
	actions,
};



